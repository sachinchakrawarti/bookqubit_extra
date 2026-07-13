/**
 * Main Configuration
 * Loads and exports all configuration
 */

const path = require('path');
const dotenv = require('dotenv');
const database = require('./database');
const paths = require('./paths');
const schemas = require('./schemas');
const defaults = require('./defaults');

// Load environment variables
dotenv.config();

// Merge configurations
const config = {
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  paths,
  database,
  schemas,
  defaults,
  
  version: require('../../package.json').version,
  name: 'BookQbit Database Engine'
};

module.exports = config;