#!/usr/bin/env node

/**
 * Simple Dependency Installer
 * This will install all required dependencies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n📦 Installing BookQbit Engine Dependencies\n');

// Check if package.json exists
const packagePath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packagePath)) {
  console.error('❌ package.json not found in engine folder!');
  process.exit(1);
}

console.log('📁 Installing dependencies...\n');

try {
  // Install dependencies
  execSync('npm install', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  
  console.log('\n✅ Dependencies installed successfully!\n');
  console.log('📦 Installed packages:');
  console.log('  • chalk - Colorful console output');
  console.log('  • commander - CLI interface');
  console.log('  • inquirer - Interactive prompts');
  console.log('  • ora - Spinner animations');
  console.log('  • fs-extra - Enhanced file system');
  console.log('  • handlebars - Template engine');
  console.log('  • winston - Logging');
  console.log('  • sqlite3 - SQLite database');
  console.log('  • knex - SQL query builder');
  console.log('  • dayjs - Date utilities');
  console.log('  • uuid - Unique IDs');
  console.log('  • glob - File matching');
  console.log('  • lodash - Utility functions\n');
  
  console.log('🚀 You can now run: node engine/cli.js --help\n');
  
} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
}