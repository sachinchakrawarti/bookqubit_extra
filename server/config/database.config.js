// config/database.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment
const env = process.env.NODE_ENV || 'development';

// Database configuration for different environments
const databaseConfig = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database', 'books.db'),
    logging: console.log,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },
  production: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database', 'books.db'),
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Export configuration for current environment
export default databaseConfig;

// Export specific environment config
export const config = databaseConfig[env];