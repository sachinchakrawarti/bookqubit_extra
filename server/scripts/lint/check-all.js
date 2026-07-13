#!/usr/bin/env node

/**
 * Check All Script
 * Run all checks without fixing
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔍 Running all checks...\n'));

const checks = [
  {
    name: 'ESLint Check',
    cmd: 'npm run lint:check',
    error: 'ESLint check failed'
  },
  {
    name: 'Prettier Check',
    cmd: 'npm run format:check',
    error: 'Prettier check failed'
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
  }
}

if (failed) {
  console.error(chalk.red('\n❌ Some checks failed!'));
  console.log(chalk.yellow('\n💡 Try running: npm run fix:all'));
  process.exit(1);
}

console.log(chalk.green('\n✅ All checks passed!'));