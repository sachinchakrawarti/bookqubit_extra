/**
 * Main Setup Orchestrator
 */

const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const createStructure = require('./create-structure');
const installDeps = require('./install-deps');
const createConfig = require('./create-config');
const createTemplates = require('./create-templates');
const createSchemas = require('./create-schemas');
const createSeeds = require('./create-seeds');
const createDocs = require('./create-docs');
const createScripts = require('./create-scripts');
const verifySetup = require('./verify-setup');
const logger = require('../utils/logger');

async function setup(options = {}) {
  const { quick = false, full = false } = options;
  
  console.log(chalk.bold.cyan('\n🚀 BookQbit Database Setup\n'));
  
  // Get user choices
  let choices = [];
  if (!quick && !full) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'setupType',
        message: 'Choose setup type:',
        choices: [
          { name: 'Full Setup (Recommended)', value: 'full' },
          { name: 'Quick Setup', value: 'quick' },
          { name: 'Custom Setup', value: 'custom' }
        ]
      }
    ]);
    
    if (answers.setupType === 'custom') {
      const customAnswers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'components',
          message: 'Select components to install:',
          choices: [
            { name: 'Directory Structure', value: 'structure', checked: true },
            { name: 'Dependencies', value: 'deps', checked: true },
            { name: 'Configuration', value: 'config', checked: true },
            { name: 'Templates', value: 'templates', checked: true },
            { name: 'Schemas', value: 'schemas', checked: true },
            { name: 'Seed Data', value: 'seeds', checked: true },
            { name: 'Documentation', value: 'docs', checked: true },
            { name: 'Scripts', value: 'scripts', checked: true }
          ]
        }
      ]);
      choices = customAnswers.components;
    } else {
      choices = ['structure', 'deps', 'config', 'templates', 'schemas', 'seeds', 'docs', 'scripts'];
    }
  } else {
    choices = quick ? ['structure', 'config', 'templates', 'schemas'] : 
                     ['structure', 'deps', 'config', 'templates', 'schemas', 'seeds', 'docs', 'scripts'];
  }
  
  const spinner = ora('Starting setup...').start();
  const steps = [];
  const errors = [];
  
  try {
    // Step 1: Create structure
    if (choices.includes('structure')) {
      spinner.text = 'Creating directory structure...';
      await createStructure();
      steps.push('✅ Directory structure created');
    }
    
    // Step 2: Install dependencies
    if (choices.includes('deps')) {
      spinner.text = 'Installing dependencies...';
      await installDeps();
      steps.push('✅ Dependencies installed');
    }
    
    // Step 3: Create configuration
    if (choices.includes('config')) {
      spinner.text = 'Creating configuration files...';
      await createConfig();
      steps.push('✅ Configuration created');
    }
    
    // Step 4: Create templates
    if (choices.includes('templates')) {
      spinner.text = 'Creating templates...';
      await createTemplates();
      steps.push('✅ Templates created');
    }
    
    // Step 5: Create schemas
    if (choices.includes('schemas')) {
      spinner.text = 'Creating schemas...';
      await createSchemas();
      steps.push('✅ Schemas created');
    }
    
    // Step 6: Create seeds
    if (choices.includes('seeds')) {
      spinner.text = 'Creating seed data...';
      await createSeeds();
      steps.push('✅ Seed data created');
    }
    
    // Step 7: Create documentation
    if (choices.includes('docs')) {
      spinner.text = 'Creating documentation...';
      await createDocs();
      steps.push('✅ Documentation created');
    }
    
    // Step 8: Create scripts
    if (choices.includes('scripts')) {
      spinner.text = 'Creating scripts...';
      await createScripts();
      steps.push('✅ Scripts created');
    }
    
    // Step 9: Verify setup
    spinner.text = 'Verifying setup...';
    const verification = await verifySetup();
    steps.push(`✅ Verification complete: ${verification.passed} passed, ${verification.failed} failed`);
    
    spinner.succeed(chalk.green('✅ Setup completed successfully!'));
    
    // Print summary
    printSummary(steps, errors);
    
  } catch (error) {
    spinner.fail(chalk.red(`❌ Setup failed: ${error.message}`));
    logger.error('Setup failed:', error);
    errors.push(error.message);
    
    // Rollback if full setup failed
    if (full) {
      await rollbackSetup();
    }
    
    throw error;
  }
}

function printSummary(steps, errors) {
  console.log(chalk.bold.cyan('\n📊 Setup Summary\n'));
  console.log(chalk.gray('═'.repeat(50)));
  
  if (steps.length > 0) {
    console.log(chalk.green('\n✅ Completed Steps:'));
    steps.forEach(step => console.log(chalk.gray(`  ${step}`)));
  }
  
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ Errors:'));
    errors.forEach(error => console.log(chalk.red(`  ${error}`)));
  }
  
  console.log(chalk.gray('\n' + '═'.repeat(50)));
  console.log(chalk.cyan(`\n📊 Status: ${errors.length === 0 ? '✅ Success' : '⚠️  Partial Success'}`));
  console.log();
}

module.exports = setup;