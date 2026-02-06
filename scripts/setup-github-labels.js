#!/usr/bin/env node

/**
 * GitHub Labels Setup Script for GuessIt
 *
 * Creates all necessary labels for the project including:
 * - Priority labels (critical, high, medium, low)
 * - Agent assignment labels (backend-lead, frontend-lead, etc.)
 * - Type labels (feature, bug, chore, docs, security)
 * - Status labels (in-progress, blocked, ready-for-review)
 * - Special labels (good-first-issue, help-wanted, dependencies, automated)
 *
 * Prerequisites:
 * - GitHub CLI (gh) must be installed and authenticated
 * - Run from the repository root
 *
 * Usage:
 *   node scripts/setup-github-labels.js
 *
 * Or with GitHub CLI directly:
 *   gh auth login
 *   node scripts/setup-github-labels.js
 */

const { execSync } = require('child_process');

// Color scheme follows GitHub's design guidelines and accessibility standards
const labels = [
  // Priority Labels
  {
    name: 'priority:critical',
    color: 'd73a4a',
    description: 'Blocking release or critical security issue - immediate attention required'
  },
  {
    name: 'priority:high',
    color: 'ff9800',
    description: 'Important feature or bug - high impact on users'
  },
  {
    name: 'priority:medium',
    color: 'ffc107',
    description: 'Standard feature or improvement - moderate priority'
  },
  {
    name: 'priority:low',
    color: '4caf50',
    description: 'Nice-to-have or minor enhancement - low urgency'
  },

  // Agent Assignment Labels
  {
    name: 'agent:backend-lead',
    color: '0075ca',
    description: 'API routes, Supabase queries, business logic, data migrations'
  },
  {
    name: 'agent:frontend-lead',
    color: '00bcd4',
    description: 'React components, Next.js pages, UI, Tailwind styling, RTL support'
  },
  {
    name: 'agent:devops-engineer',
    color: '795548',
    description: 'CI/CD pipelines, deployment, Vercel, Supabase management, monitoring'
  },
  {
    name: 'agent:security-engineer',
    color: 'd73a4a',
    description: 'Authentication, RLS policies, input validation, security audits'
  },
  {
    name: 'agent:qa-engineer',
    color: '9c27b0',
    description: 'Test strategy, test writing, coverage analysis, bug reproduction'
  },
  {
    name: 'agent:cto-architect',
    color: '673ab7',
    description: 'System design, database schema, API contracts, scalability decisions'
  },
  {
    name: 'agent:product-manager',
    color: 'e91e63',
    description: 'Product specs, user stories, acceptance criteria, sprint planning'
  },
  {
    name: 'agent:data-analyst',
    color: '009688',
    description: 'Analytics events, KPI tracking, metrics, user behavior analysis'
  },
  {
    name: 'agent:ux-designer',
    color: 'ff5722',
    description: 'User flows, accessibility, wireframes, mobile UX, design review'
  },

  // Type Labels
  {
    name: 'type:feature',
    color: 'a2eeef',
    description: 'New feature or enhancement'
  },
  {
    name: 'type:bug',
    color: 'd73a4a',
    description: 'Bug or error that needs fixing'
  },
  {
    name: 'type:chore',
    color: 'fef2c0',
    description: 'Maintenance, refactoring, tooling updates'
  },
  {
    name: 'type:docs',
    color: '0075ca',
    description: 'Documentation improvements or additions'
  },
  {
    name: 'type:security',
    color: 'd73a4a',
    description: 'Security issue, vulnerability, or security enhancement'
  },
  {
    name: 'type:test',
    color: '9c27b0',
    description: 'Testing-related changes (unit tests, E2E tests, test infrastructure)'
  },

  // Status Labels
  {
    name: 'status:in-progress',
    color: '0052cc',
    description: 'Currently being worked on'
  },
  {
    name: 'status:blocked',
    color: 'b60205',
    description: 'Blocked by dependencies or external factors'
  },
  {
    name: 'status:ready-for-review',
    color: '0e8a16',
    description: 'Ready for code review'
  },

  // Special Labels
  {
    name: 'good-first-issue',
    color: '7057ff',
    description: 'Good for newcomers - beginner-friendly task'
  },
  {
    name: 'help-wanted',
    color: '008672',
    description: 'Extra attention needed - community help welcome'
  },
  {
    name: 'dependencies',
    color: '0366d6',
    description: 'Dependency updates (Dependabot PRs)'
  },
  {
    name: 'automated',
    color: 'ededed',
    description: 'Automated PR or issue (bot-generated)'
  },
  {
    name: 'ci-cd',
    color: '795548',
    description: 'CI/CD related changes (GitHub Actions, workflows)'
  },
  {
    name: 'breaking-change',
    color: 'd73a4a',
    description: 'Breaking change that requires version bump or migration'
  }
];

console.log('🚀 Setting up GitHub labels for GuessIt...\n');

// Check if gh CLI is installed
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: GitHub CLI (gh) is not installed.');
  console.error('   Please install it from: https://cli.github.com/');
  process.exit(1);
}

// Check if user is authenticated
try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Error: Not authenticated with GitHub CLI.');
  console.error('   Please run: gh auth login');
  process.exit(1);
}

let created = 0;
let skipped = 0;
let errors = 0;

for (const label of labels) {
  try {
    // Escape special characters in description for shell
    const escapedDescription = label.description.replace(/"/g, '\\"');

    const command = `gh label create "${label.name}" --color ${label.color} --description "${escapedDescription}"`;

    execSync(command, { stdio: 'pipe' });
    console.log(`✅ Created: ${label.name}`);
    created++;
  } catch (error) {
    // Check if error is because label already exists
    if (error.message.includes('already exists')) {
      console.log(`⏭️  Skipped: ${label.name} (already exists)`);
      skipped++;
    } else {
      console.error(`❌ Error creating ${label.name}:`, error.message);
      errors++;
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log(`   Created: ${created}`);
console.log(`   Skipped: ${skipped} (already exist)`);
console.log(`   Errors:  ${errors}`);
console.log('='.repeat(60));

if (errors > 0) {
  console.log('\n⚠️  Some labels failed to create. Please check the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ All labels set up successfully!');
  console.log('\n🔗 View labels: gh repo view --web');
}
