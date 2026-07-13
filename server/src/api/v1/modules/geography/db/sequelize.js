// src/api/v1/modules/geography/db/sequelize.js
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define config directly (simplest working solution)
const env = process.env.NODE_ENV || 'development';

// Get project root path
const projectRoot = path.resolve(__dirname, '../../../../../..');

const config = {
  development: {
    dialect: 'sqlite',
    storage: path.join(projectRoot, 'database', 'books.db'),
    logging: console.log,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
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
    storage: path.join(projectRoot, 'database', 'books.db'),
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
};

// Use the config for current environment
const dbConfig = config[env] || config.development;

// Create Sequelize instance
const sequelize = new Sequelize(dbConfig);

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connection established successfully.');
    console.log(`📊 Database file: ${dbConfig.storage}`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to SQLite database:', error.message);
    return false;
  }
}

// Sync database function
async function syncDatabase(options = {}) {
  try {
    await sequelize.sync(options);
    console.log('✅ Database synchronized successfully.');
    return true;
  } catch (error) {
    console.error('❌ Database synchronization failed:', error.message);
    return false;
  }
}

// Close connection function
async function closeConnection() {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
    return true;
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
    return false;
  }
}

// Export
export {
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection
};

export default sequelize;