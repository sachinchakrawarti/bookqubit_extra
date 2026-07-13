#!/usr/bin/env node

/**
 * Quick Install Entry Point
 */

const installDeps = require('./setup/install-deps');

// Run install with command line arguments
const args = process.argv.slice(2);
const options = {
  production: args.includes('--production'),
  development: args.includes('--development')
};

installDeps(options).catch(console.error);