#!/usr/bin/env node

/**
 * Fix All Script
 * Run all fixers automatically
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔧 Running all fixers...\n'));

const fixers = [
  {
    name: 'ESLint Fix',
    cmd: 'npm run lint:fix',
    error: 'ESLint fix failed'
  },
  {
    name: 'Prettier Format',
    cmd: 'npm run format:fix',
    error: 'Prettier format failed'
  }
];

let failed = false;

for (const fixer of fixers) {
  console.log(chalk.gray(`\n📋 Running ${fixer.name}...`));
  try {
    execSync(fixer.cmd, {
      stdio: 'inherit',
      shell: true
    });
    console.log(chalk.green(`✅ ${fixer.name} completed`));
  } catch (error) {
    console.error(chalk.red(`❌ ${fixer.name} failed`));
    console.error(chalk.red(fixer.error));
    failed = true;
  }
}

if (failed) {
  console.error(chalk.red('\n❌ Some fixers failed!'));
  process.exit(1);
}

console.log(chalk.green('\n✅ All fixers completed successfully!'));