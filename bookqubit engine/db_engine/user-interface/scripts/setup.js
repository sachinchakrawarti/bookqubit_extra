#!/usr/bin/env node

/**
 * Quick Setup Entry Point
 */

const setup = require('./setup/setup');

// Run setup with command line arguments
const args = process.argv.slice(2);
const options = {
  quick: args.includes('--quick'),
  full: args.includes('--full')
};

setup(options).catch(console.error);