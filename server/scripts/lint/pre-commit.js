#!/usr/bin/env node

/**
 * Pre-commit Hook Script
 * Run linting and tests before commit
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔍 Running pre-commit checks...\n'));

const checks = [
  {
    name: 'Lint Staged',
    cmd: 'npx lint-staged',
    error: 'Linting failed. Please fix the errors and try again.'
  },
  {
    name: 'Unit Tests',
    cmd: 'npm run test:unit',
    error: 'Unit tests failed. Please fix the tests and try again.'
  }
];

let failed = false;

for (const check of checks) {
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
  console.error(chalk.red('\n❌ Pre-commit checks failed!'));
  process.exit(1);
}

console.log(chalk.green('\n✅ All pre-commit checks passed!'));