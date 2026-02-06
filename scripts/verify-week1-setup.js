#!/usr/bin/env node

/**
 * Week 1 Setup Verification Script
 *
 * Checks if all Week 1 configuration is complete:
 * - Labels created
 * - Branch protection configured
 * - Repository settings enabled
 * - Workflows present
 */

const { execSync } = require('child_process');

console.log('🔍 Verifying Week 1 Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function runCheck(name, command, expectedContains, isWarning = false) {
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });

    if (expectedContains && !output.includes(expectedContains)) {
      if (isWarning) {
        console.log(`⚠️  ${name}: Found but may need attention`);
        checks.warnings++;
      } else {
        console.log(`❌ ${name}: Failed - ${expectedContains} not found`);
        checks.failed++;
      }
      return false;
    }

    console.log(`✅ ${name}`);
    checks.passed++;
    return true;
  } catch (error) {
    if (isWarning) {
      console.log(`⚠️  ${name}: ${error.message.split('\n')[0]}`);
      checks.warnings++;
    } else {
      console.log(`❌ ${name}: ${error.message.split('\n')[0]}`);
      checks.failed++;
    }
    return false;
  }
}

console.log('📋 Checking GitHub CLI authentication...');
runCheck('GitHub CLI installed', 'gh --version', 'gh version');
runCheck('GitHub CLI authenticated', 'gh auth status', 'Logged in');

console.log('\n🏷️  Checking labels...');
const labelCheck = runCheck('Labels created', 'gh label list', 'priority:critical');
if (labelCheck) {
  try {
    const labels = execSync('gh label list --limit 100', { encoding: 'utf-8' });
    const labelCount = labels.trim().split('\n').length - 1; // Subtract header
    console.log(`   Found ${labelCount} labels`);
    if (labelCount < 20) {
      console.log(`   ⚠️  Expected at least 26 labels, found ${labelCount}`);
      checks.warnings++;
    }
  } catch (error) {
    // Ignore
  }
}

console.log('\n🛡️  Checking branch protection...');
try {
  const protection = execSync('gh api /repos/balgaly/guessit/branches/master/protection', { encoding: 'utf-8' });
  const config = JSON.parse(protection);

  // Check required status checks
  if (config.required_status_checks && config.required_status_checks.contexts) {
    const contexts = config.required_status_checks.contexts;
    console.log(`✅ Branch protection enabled`);
    console.log(`   Status checks: ${contexts.length} configured`);
    checks.passed++;

    // Check specific required checks
    const required = ['lint', 'typecheck', 'test', 'security-scan', 'dependency-review'];
    const missing = required.filter(check => !contexts.includes(check));

    if (missing.length > 0) {
      console.log(`   ⚠️  Missing status checks: ${missing.join(', ')}`);
      console.log(`   Note: These will appear after first workflow run`);
      checks.warnings++;
    } else {
      console.log(`   ✅ All required status checks configured`);
    }
  } else {
    console.log(`⚠️  Branch protection enabled but no status checks configured`);
    checks.warnings++;
  }

  // Check PR reviews
  if (config.required_pull_request_reviews) {
    const reviews = config.required_pull_request_reviews.required_approving_review_count;
    console.log(`   ✅ Required reviews: ${reviews}`);
  } else {
    console.log(`   ⚠️  PR reviews not required`);
    checks.warnings++;
  }

  // Check force push protection
  if (config.allow_force_pushes && config.allow_force_pushes.enabled === false) {
    console.log(`   ✅ Force pushes blocked`);
  }

} catch (error) {
  console.log(`❌ Branch protection: Not configured or not accessible`);
  console.log(`   Run: gh api /repos/balgaly/guessit/branches/master/protection`);
  checks.failed++;
}

console.log('\n📁 Checking workflow files...');
const workflows = [
  'ci.yml',
  'codeql.yml',
  'dependency-review.yml',
  'pr-labeler.yml',
  'license-compliance.yml'
];

const fs = require('fs');
const path = require('path');

workflows.forEach(workflow => {
  const filePath = path.join(process.cwd(), '.github', 'workflows', workflow);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${workflow} exists`);
    checks.passed++;
  } else {
    console.log(`❌ ${workflow} missing`);
    checks.failed++;
  }
});

console.log('\n📝 Checking templates...');
const templates = [
  ['.github/ISSUE_TEMPLATE/feature.yml', 'Feature template'],
  ['.github/ISSUE_TEMPLATE/bug.yml', 'Bug template'],
  ['.github/PULL_REQUEST_TEMPLATE.md', 'PR template'],
  ['.github/CODEOWNERS', 'CODEOWNERS'],
  ['.github/dependabot.yml', 'Dependabot config']
];

templates.forEach(([file, name]) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${name}`);
    checks.passed++;
  } else {
    console.log(`❌ ${name} missing`);
    checks.failed++;
  }
});

console.log('\n⚙️  Checking repository settings...');
try {
  const repo = JSON.parse(execSync('gh repo view --json hasIssuesEnabled,hasProjectsEnabled,hasDiscussionsEnabled', { encoding: 'utf-8' }));

  if (repo.hasIssuesEnabled) {
    console.log(`✅ Issues enabled`);
    checks.passed++;
  } else {
    console.log(`❌ Issues not enabled`);
    checks.failed++;
  }

  if (repo.hasProjectsEnabled) {
    console.log(`✅ Projects enabled`);
    checks.passed++;
  } else {
    console.log(`⚠️  Projects not enabled (needed for Week 2)`);
    checks.warnings++;
  }

  if (repo.hasDiscussionsEnabled) {
    console.log(`✅ Discussions enabled`);
    checks.passed++;
  } else {
    console.log(`⚠️  Discussions not enabled (optional but recommended)`);
    checks.warnings++;
  }
} catch (error) {
  console.log(`⚠️  Could not check repository settings: ${error.message.split('\n')[0]}`);
  checks.warnings++;
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Verification Summary:');
console.log(`   ✅ Passed:   ${checks.passed}`);
console.log(`   ❌ Failed:   ${checks.failed}`);
console.log(`   ⚠️  Warnings: ${checks.warnings}`);
console.log('='.repeat(60));

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 Week 1 setup is complete! Ready to proceed to Week 2.\n');
  process.exit(0);
} else if (checks.failed === 0) {
  console.log('\n✅ Week 1 setup is mostly complete.');
  console.log('⚠️  Review warnings above - most are optional or will resolve after first workflow run.\n');
  console.log('You can proceed to Week 2, but consider addressing warnings first.\n');
  process.exit(0);
} else {
  console.log('\n❌ Week 1 setup incomplete. Please address failed checks above.\n');
  console.log('💡 Tips:');
  console.log('   - Run: node scripts/setup-github-labels.js');
  console.log('   - Configure branch protection: See docs/WEEK1-SETUP-INSTRUCTIONS.md');
  console.log('   - Enable repository features: Settings → General → Features\n');
  process.exit(1);
}
