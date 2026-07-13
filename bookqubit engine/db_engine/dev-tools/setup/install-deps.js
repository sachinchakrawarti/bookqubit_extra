/**
 * Install Dependencies
 */

const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

async function installDeps(options = {}) {
  const { production = false, development = false } = options;
  
  const spinner = ora('Installing dependencies...').start();
  
  try {
    // Check Node.js version
    const nodeVersion = process.version;
    spinner.text = `Checking Node.js version (${nodeVersion})...`;
    
    // Check npm version
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    spinner.text = `Checking npm version (${npmVersion})...`;
    
    // Install production dependencies
    if (production || !development) {
      spinner.text = 'Installing production dependencies...';
      execSync('npm install --production', { stdio: 'inherit' });
    }
    
    // Install development dependencies
    if (development || !production) {
      spinner.text = 'Installing development dependencies...';
      execSync('npm install --save-dev', { stdio: 'inherit' });
    }
    
    // Install all dependencies
    if (!production && !development) {
      spinner.text = 'Installing all dependencies...';
      execSync('npm install', { stdio: 'inherit' });
    }
    
    spinner.succeed(chalk.green('✅ Dependencies installed successfully!'));
    
    // Print installed packages
    const packageJson = await fs.readJson(path.join(__dirname, '../../package.json'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    console.log(chalk.gray('\n📦 Installed Packages:'));
    Object.keys(deps).forEach(dep => {
      console.log(chalk.gray(`  • ${dep}@${deps[dep]}`));
    });
    console.log();
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Dependency installation failed: ${error.message}`));
    logger.error('Dependency installation failed:', error);
    throw error;
  }
}

module.exports = installDeps;