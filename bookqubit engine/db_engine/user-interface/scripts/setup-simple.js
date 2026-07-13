#!/usr/bin/env node

/**
 * Simple Setup Script
 * Creates basic structure without external dependencies
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 BookQbit Engine Setup (Simple)\n');

// Create required directories
const dirs = [
  'logs',
  'cache',
  'tests/unit',
  'tests/integration',
  'tests/fixtures'
];

console.log('📁 Creating directories...');
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  ✅ Created: ${dir}`);
  } else {
    console.log(`  ⏭️  Already exists: ${dir}`);
  }
});

// Create .gitkeep files
console.log('\n📄 Creating .gitkeep files...');
const keepDirs = ['logs', 'cache', 'tests/unit', 'tests/integration', 'tests/fixtures'];
keepDirs.forEach(dir => {
  const keepPath = path.join(__dirname, dir, '.gitkeep');
  if (!fs.existsSync(keepPath)) {
    fs.writeFileSync(keepPath, '');
    console.log(`  ✅ Created: ${dir}/.gitkeep`);
  }
});

console.log('\n✅ Setup completed successfully!');
console.log('\n📝 Next steps:');
console.log('  1. node engine/install.js  - Install dependencies');
console.log('  2. node engine/cli.js --help  - See available commands\n');