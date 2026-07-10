// scripts/index.js
#!/usr/bin/env node
/**
 * Main Script Entry Point
 * Usage: npm run script
 */

import { execSync } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(chalk.blue.bold('\n🔧 Script Runner\n'));

const scripts = [
  { name: 'Generate Module', cmd: 'npm run gen:module' },
  { name: 'Generate Component', cmd: 'npm run gen:component' },
  { name: 'Generate SQL Query', cmd: 'npm run gen:query' },
  { name: 'Generate API Endpoint', cmd: 'npm run gen:api' },
  { name: 'Batch Generate Modules', cmd: 'npm run gen:batch' },
  { name: 'Run Tests', cmd: 'npm run test:runner' },
  { name: 'Health Check', cmd: 'npm run health' },
  { name: 'List Modules', cmd: 'npm run list' },
  { name: 'Clean Project', cmd: 'npm run clean' },
  { name: 'Registry CLI', cmd: 'npm run registry:cli' },
  { name: 'Deploy', cmd: 'npm run deploy' },
];

const menu = scripts.map((script, index) => {
  return `  ${chalk.green(`${index + 1}.`)} ${script.name}`;
}).join('\n');

console.log(menu);
console.log(chalk.yellow(`\n  ${chalk.green('0.')} Exit`));

async function main() {
  const choice = await question('\nSelect a script to run: ');

  if (choice === '0') {
    console.log(chalk.yellow('👋 Goodbye!'));
    rl.close();
    return;
  }

  const selected = scripts[parseInt(choice) - 1];
  
  if (!selected) {
    console.log(chalk.red('❌ Invalid option'));
    rl.close();
    return;
  }

  console.log(chalk.blue(`\n🚀 Running: ${selected.name}\n`));

  try {
    execSync(selected.cmd, { stdio: 'inherit' });
    console.log(chalk.green('\n✅ Script completed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Script failed!'));
  }

  rl.close();
}

main().catch(console.error);