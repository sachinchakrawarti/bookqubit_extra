#!/usr/bin/env node

/**
 * Format Script
 * Run Prettier with various options
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'check';

const colors = {
  green: chalk.green,
  red: chalk.red,
  yellow: chalk.yellow,
  blue: chalk.blue,
  gray: chalk.gray,
  bold: chalk.bold
};

console.log(colors.blue('🎨 Running Prettier...\n'));

try {
  let cmd = '';
  
  switch (command) {
    case 'check':
      cmd = 'prettier --check .';
      console.log(colors.gray('📋 Checking formatting...'));
      break;
      
    case 'fix':
    case 'write':
      cmd = 'prettier --write .';
      console.log(colors.yellow('🔧 Formatting files...'));
      break;
      
    case 'file':
      const filePath = args[1];
      if (!filePath) {
        console.error(colors.red('❌ Please specify a file path'));
        console.log(colors.gray('Usage: npm run format:file src/file.js'));
        process.exit(1);
      }
      cmd = `prettier --write ${filePath}`;
      console.log(colors.yellow(`🔧 Formatting ${filePath}...`));
      break;
      
    default:
      console.error(colors.red(`❌ Unknown command: ${command}`));
      console.log(colors.gray('Available commands: check, fix, write, file'));
      process.exit(1);
  }

  execSync(cmd, {
    cwd: rootDir,
    stdio: 'inherit'
  });

  console.log(colors.green('\n✅ Format completed successfully!'));
} catch (error) {
  console.error(colors.red('\n❌ Format failed!'));
  console.error(colors.red(error.message));
  process.exit(1);
}