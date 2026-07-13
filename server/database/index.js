/**
 * Database Index
 * Exports database connection
 */

import knex from 'knex';
import config from './config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create connection
const connection = knex(dbConfig);

export default connection;