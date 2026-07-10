// scripts/testing/test-runner.js
#!/usr/bin/env node
/**
 * Test Runner with interactive menu
 */

import { execSync } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(chalk.blue.bold('\n🧪 Test Runner\n'));

const tests = [
  { name: 'All Tests', cmd: 'npm test' },
  { name: 'Unit Tests', cmd: 'npm run test:unit' },
  { name: 'Integration Tests', cmd: 'npm run test:integration' },
  { name: 'E2E Tests', cmd: 'npm run test:e2e' },
  { name: 'Coverage Report', cmd: 'npm run test:coverage' },
  { name: 'Watch Mode', cmd: 'npm run test:watch' },
  { name: 'CI Tests', cmd: 'npm run test:ci' },
];

const menu = tests.map((test, index) => {
  return `  ${chalk.green(`${index + 1}.`)} ${test.name}`;
}).join('\n');

console.log(menu);
console.log(chalk.yellow(`\n  ${chalk.green('0.')} Exit`));

async function main() {
  const choice = await question('\nSelect a test to run: ');

  if (choice === '0') {
    console.log(chalk.yellow('👋 Goodbye!'));
    rl.close();
    return;
  }

  const selected = tests[parseInt(choice) - 1];
  
  if (!selected) {
    console.log(chalk.red('❌ Invalid option'));
    rl.close();
    return;
  }

  console.log(chalk.blue(`\n🚀 Running: ${selected.name}\n`));

  try {
    execSync(selected.cmd, { stdio: 'inherit' });
    console.log(chalk.green('\n✅ Tests completed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Tests failed!'));
  }

  rl.close();
}

main().catch(console.error);