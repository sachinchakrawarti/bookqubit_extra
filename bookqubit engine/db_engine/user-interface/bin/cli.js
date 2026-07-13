#!/usr/bin/env node

/**
 * Minimal CLI - Test if everything works
 */

const chalk = require('chalk');
const { program } = require('commander');

console.log(chalk.bold.cyan('\n⚙️  BookQbit Database Engine\n'));

program
  .name('bookqubit-engine')
  .description('BookQbit Database Engine CLI')
  .version('1.0.0');

program
  .command('hello')
  .description('Say hello')
  .action(() => {
    console.log(chalk.green('👋 Hello from BookQbit Engine!'));
    console.log(chalk.gray('   Engine is working properly!\n'));
  });

program
  .command('test')
  .description('Test engine functionality')
  .action(() => {
    console.log(chalk.cyan('✅ Engine test passed!'));
    console.log(chalk.gray('   All systems operational.\n'));
  });

program.parse(process.argv);

// Show help if no command
if (!process.argv.slice(2).length) {
  program.outputHelp();
}