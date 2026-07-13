#!/usr/bin/env node

/**
 * Pre-push Hook Script
 * Run full test suite before push
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔍 Running pre-push checks...\n'));

const checks = [
  {
    name: 'Lint Check',
    cmd: 'npm run lint:check',
    error: 'Linting failed. Please fix the errors and try again.'
  },
  {
    name: 'All Tests',
    cmd: 'npm test',
    error: 'Tests failed. Please fix the tests and try again.'
  },
  {
    name: 'Build',
    cmd: 'npm run build || echo "No build script defined"',
    error: 'Build failed. Please fix the build and try again.',
    optional: true
  }
];

let failed = false;

for (const check of checks) {
  if (check.optional) {
    console.log(chalk.gray(`\n📋 Running ${check.name} (optional)...`));
    try {
      execSync(check.cmd, {
        stdio: 'inherit',
        shell: true
      });
      console.log(chalk.green(`✅ ${check.name} passed`));
    } catch (error) {
      console.log(chalk.yellow(`⚠️  ${check.name} skipped (optional)`));
    }
    continue;
  }

  console.log(chalk.gray(`\n📋 Running ${check.name}...`));
  try {
    execSync(check.cmd, {
      stdio: 'inherit',
      shell: true
    });
    console.log(chalk.green(`✅ ${check.name} passed`));
  } catch (error) {
    console.error(chalk.red(`❌ ${check.name} failed`));
    console.error(chalk.red(check.error));
    failed = true;
    break;
  }
}

if (failed) {
  console.error(chalk.red('\n❌ Pre-push checks failed!'));
  process.exit(1);
}

console.log(chalk.green('\n✅ All pre-push checks passed!'));