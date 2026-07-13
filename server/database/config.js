/**
 * Database Configuration
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../db/bookqubit_database.db')
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../db/bookqubit_database.db')
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 20
    }
  }
};