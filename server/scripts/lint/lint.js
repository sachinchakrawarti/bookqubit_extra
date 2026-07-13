#!/usr/bin/env node

/**
 * Lint Script
 * Run ESLint with various options
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..'); // server directory

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

console.log(colors.blue('🔍 Running ESLint...\n'));

// Look for config in multiple locations
const configPaths = [
  path.join(rootDir, '.eslintrc.json'),
  path.join(rootDir, '.eslintrc.js'),
  path.join(rootDir, '.eslintrc'),
  path.join(rootDir, '..', '.eslintrc.json'), // parent directory
];

let configPath = null;
for (const p of configPaths) {
  if (fs.existsSync(p)) {
    configPath = p;
    break;
  }
}

if (!configPath) {
  console.error(colors.red('❌ ESLint config not found'));
  console.log(colors.yellow(`💡 Please create .eslintrc.json in: ${rootDir}`));
  process.exit(1);
}

console.log(colors.gray(`📄 Using config: ${configPath}`));

try {
  let cmd = '';
  const eslintCmd = 'npx eslint';
  
  switch (command) {
    case 'check':
      cmd = `${eslintCmd} . --config "${configPath}" --ext .js,.mjs,.cjs`;
      console.log(colors.gray('📋 Checking for linting errors...'));
      break;
      
    case 'fix':
      cmd = `${eslintCmd} . --fix --config "${configPath}" --ext .js,.mjs,.cjs`;
      console.log(colors.yellow('🔧 Fixing linting errors...'));
      break;
      
    case 'file':
      const filePath = args[1];
      if (!filePath) {
        console.error(colors.red('❌ Please specify a file path'));
        console.log(colors.gray('Usage: npm run lint:file src/file.js'));
        process.exit(1);
      }
      cmd = `${eslintCmd} ${filePath} --fix --config "${configPath}"`;
      console.log(colors.yellow(`🔧 Fixing ${filePath}...`));
      break;
      
    case 'watch':
      // Install eslint-watch if needed
      cmd = `npx eslint-watch . --config "${configPath}" --ext .js,.mjs,.cjs`;
      console.log(colors.blue('👁️  Watching for changes...'));
      break;
      
    default:
      console.error(colors.red(`❌ Unknown command: ${command}`));
      console.log(colors.gray('Available commands: check, fix, file, watch'));
      process.exit(1);
  }

  console.log(colors.gray(`▶️  ${cmd}\n`));

  execSync(cmd, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log(colors.green('\n✅ Lint completed successfully!'));
} catch (error) {
  console.error(colors.red('\n❌ Lint failed!'));
  console.error(colors.red(error.message));
  process.exit(1);
}