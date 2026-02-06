#!/usr/bin/env node

/**
 * Add Status Checks to Branch Protection
 *
 * After workflows have run at least once, this script adds them as required
 * status checks to the master branch protection rules.
 *
 * Prerequisites:
 * - Branch protection already configured (via setup-branch-protection.js)
 * - At least one PR with workflow runs (so checks exist)
 *
 * Usage:
 *   node scripts/add-status-checks.js
 */

const { execSync } = require('child_process');

console.log('🔒 Adding required status checks to branch protection...\n');

// Check prerequisites
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: GitHub CLI (gh) is not installed.');
  process.exit(1);
}

try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: Not authenticated with GitHub CLI.');
  process.exit(1);
}

console.log('📋 Fetching current branch protection configuration...');

let currentConfig;
try {
  const result = execSync('gh api repos/balgaly/guessit/branches/master/protection', { encoding: 'utf-8' });
  currentConfig = JSON.parse(result);
  console.log('✅ Current configuration retrieved\n');
} catch (error) {
  console.error('❌ Error: Could not fetch branch protection config.');
  console.error('   Make sure branch protection is configured first.');
  console.error('   Run: node scripts/setup-branch-protection.js');
  process.exit(1);
}

// Define required status checks
const requiredChecks = [
  'lint',
  'typecheck',
  'test',
  'security-scan',
  'dependency-review'
];

console.log('📝 Required status checks:');
requiredChecks.forEach(check => console.log(`   - ${check}`));
console.log('');

// Update configuration with status checks
const updatedConfig = {
  ...currentConfig,
  required_status_checks: {
    strict: true,
    contexts: requiredChecks,
    checks: requiredChecks.map(check => ({
      context: check
    }))
  }
};

// Remove fields that shouldn't be in PUT request
delete updatedConfig.url;
delete updatedConfig.required_signatures;
delete updatedConfig.required_pull_request_reviews.url;
delete updatedConfig.enforce_admins.url;
delete updatedConfig.enforce_admins.enabled;

// Simplify to just enforce_admins boolean
updatedConfig.enforce_admins = false;

try {
  // Write config to temp file
  const fs = require('fs');
  const configFile = 'status-checks-config.json';
  fs.writeFileSync(configFile, JSON.stringify(updatedConfig, null, 2));

  console.log('🚀 Applying updated branch protection with status checks...');

  const command = `gh api -X PUT repos/balgaly/guessit/branches/master/protection --input ${configFile}`;
  execSync(command, { stdio: 'pipe' });

  // Clean up temp file
  fs.unlinkSync(configFile);

  console.log('✅ Status checks added successfully!\n');

  // Verify
  console.log('🔍 Verifying configuration...');
  const verifyResult = execSync('gh api repos/balgaly/guessit/branches/master/protection', { encoding: 'utf-8' });
  const verifiedConfig = JSON.parse(verifyResult);

  if (verifiedConfig.required_status_checks && verifiedConfig.required_status_checks.contexts) {
    console.log('✅ Verification successful:');
    console.log(`   Status checks configured: ${verifiedConfig.required_status_checks.contexts.length}`);
    verifiedConfig.required_status_checks.contexts.forEach(check => {
      console.log(`   - ${check}`);
    });
  }

  console.log('\n🎉 Branch protection is now fully configured!');
  console.log('   All PRs will require these status checks to pass before merging.\n');

} catch (error) {
  console.error('❌ Error adding status checks:');
  console.error(error.message);

  if (error.message.includes('contexts')) {
    console.error('\n💡 Possible issues:');
    console.error('   1. Workflows haven\'t run yet - create a PR first');
    console.error('   2. Check names don\'t match workflow job names');
    console.error('   3. Repository doesn\'t have workflow runs yet');
  }

  process.exit(1);
}
