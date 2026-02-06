#!/usr/bin/env node

/**
 * Branch Protection Setup Script for GuessIt
 *
 * Configures branch protection rules for the master branch:
 * - Require PR reviews (1 approval)
 * - Require status checks (lint, typecheck, test, security-scan, dependency-review)
 * - Block force pushes and deletions
 * - Allow @balgaly to bypass rules
 *
 * Prerequisites:
 * - GitHub CLI (gh) must be installed and authenticated
 * - Repository must be public or you must have admin access
 *
 * Usage:
 *   node scripts/setup-branch-protection.js
 */

const { execSync } = require('child_process');

console.log('🔒 Configuring branch protection for master branch...\n');

// Check prerequisites
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: GitHub CLI (gh) is not installed.');
  console.error('   Please install it from: https://cli.github.com/');
  process.exit(1);
}

try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: Not authenticated with GitHub CLI.');
  console.error('   Please run: gh auth login');
  process.exit(1);
}

// Branch protection configuration
// Note: Status checks are added separately after workflows have run
// Note: bypass_pull_request_allowances only works for org repos, not personal repos
const protection = {
  required_status_checks: null, // Will be added after first workflow run
  enforce_admins: false, // Allow repo admins (you) to bypass rules
  required_pull_request_reviews: {
    dismiss_stale_reviews: true,
    require_code_owner_reviews: false,
    required_approving_review_count: 1,
    require_last_push_approval: false
  },
  restrictions: null,
  required_linear_history: false,
  allow_force_pushes: false,
  allow_deletions: false,
  block_creations: false,
  required_conversation_resolution: true,
  lock_branch: false,
  allow_fork_syncing: true
};

console.log('📋 Configuration:');
console.log('   Branch: master');
console.log('   Required approvals: 1');
console.log('   Status checks: Will be added after first workflow run');
console.log('   Force pushes: Blocked');
console.log('   Admin bypass: Enabled (you can bypass as repo owner)');
console.log('');

try {
  // Write config to temp file
  const fs = require('fs');
  const configFile = 'branch-protection-config.json';
  fs.writeFileSync(configFile, JSON.stringify(protection, null, 2));

  console.log('🚀 Applying branch protection rules...');

  // Apply protection using GitHub API
  // Note: No leading slash to avoid Windows Git Bash path rewriting
  const command = `gh api -X PUT repos/balgaly/guessit/branches/master/protection --input ${configFile}`;
  execSync(command, { stdio: 'pipe' });

  // Clean up temp file
  fs.unlinkSync(configFile);

  console.log('✅ Branch protection configured successfully!\n');

  // Verify configuration
  console.log('🔍 Verifying configuration...');
  const result = execSync('gh api repos/balgaly/guessit/branches/master/protection', { encoding: 'utf-8' });
  const config = JSON.parse(result);

  console.log('✅ Verification successful:');
  if (config.required_status_checks && config.required_status_checks.contexts) {
    console.log(`   - Required status checks: ${config.required_status_checks.contexts.length}`);
  } else {
    console.log(`   - Required status checks: Not yet configured (will add after first workflow)`);
  }
  console.log(`   - Required reviews: ${config.required_pull_request_reviews.required_approving_review_count}`);
  console.log(`   - Force pushes blocked: ${!config.allow_force_pushes.enabled}`);
  console.log(`   - Deletions blocked: ${!config.allow_deletions.enabled}`);

  console.log('\n📝 Next step: Create a test PR to generate status checks');
  console.log('   Then run: node scripts/add-status-checks.js\n');

  console.log('🎉 Branch protection configured! (Status checks pending first workflow run)\n');

} catch (error) {
  console.error('❌ Error configuring branch protection:');
  console.error(error.message);

  // Check if it's a status check issue
  if (error.message.includes('contexts')) {
    console.error('\n💡 Tip: Status checks might not exist yet.');
    console.error('   Create a test PR first to generate status checks, then re-run this script.');
  }

  process.exit(1);
}
