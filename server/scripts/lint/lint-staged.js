#!/usr/bin/env node

/**
 * Lint Staged Script
 * Run linting on staged files only
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔍 Running lint-staged...\n'));

try {
  execSync('npx lint-staged', {
    stdio: 'inherit'
  });
  console.log(chalk.green('\n✅ Lint-staged completed successfully!'));
} catch (error) {
  console.error(chalk.red('\n❌ Lint-staged failed!'));
  console.error(chalk.red(error.message));
  process.exit(1);
}