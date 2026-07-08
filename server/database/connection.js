// database/connection.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export const connectDatabase = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const db = await open({
      filename: path.join(__dirname, 'books.db'),
      driver: sqlite3.Database
    });

    // Create views if they don't exist
    await createViews(db);
    
    logger.info('✅ Database connected successfully');
    dbInstance = db;
    return db;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

async function createViews(db) {
  try {
    // Check if languages table exists
    const tableCheck = await db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='languages'"
    );
    
    if (tableCheck) {
      // Check if view already exists
      const viewCheck = await db.get(
        "SELECT name FROM sqlite_master WHERE type='view' AND name='vw_active_languages'"
      );
      
      if (!viewCheck) {
        logger.info('Creating database views...');
        
        // Create view for active languages
        await db.exec(`
          CREATE VIEW vw_active_languages AS
          SELECT 
            id,
            code,
            name,
            native_name,
            is_active,
            created_at,
            updated_at
          FROM languages
          WHERE is_active = 1
        `);
        
        // Create view for language lookup
        await db.exec(`
          CREATE VIEW vw_language_lookup AS
          SELECT 
            id,
            code,
            name,
            native_name,
            is_active
          FROM languages
        `);
        
        // Create view for language search
        await db.exec(`
          CREATE VIEW vw_language_search AS
          SELECT 
            id,
            code,
            name,
            native_name,
            is_active
          FROM languages
        `);
        
        logger.info('✅ Database views created successfully');
      } else {
        logger.info('✅ Database views already exist');
      }
    } else {
      logger.warn('⚠️ Languages table does not exist. Creating it...');
      await createLanguagesTable(db);
    }
  } catch (error) {
    logger.error('Error creating views:', error);
  }
}

async function createLanguagesTable(db) {
  try {
    // Create languages table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS languages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code VARCHAR(10) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        native_name VARCHAR(100),
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample languages
    await db.exec(`
      INSERT OR IGNORE INTO languages (code, name, native_name) VALUES
      ('en', 'English', 'English'),
      ('es', 'Spanish', 'Español'),
      ('fr', 'French', 'Français'),
      ('de', 'German', 'Deutsch'),
      ('it', 'Italian', 'Italiano'),
      ('pt', 'Portuguese', 'Português'),
      ('ru', 'Russian', 'Русский'),
      ('zh', 'Chinese', '中文'),
      ('ja', 'Japanese', '日本語'),
      ('ar', 'Arabic', 'العربية'),
      ('hi', 'Hindi', 'हिन्दी'),
      ('bn', 'Bengali', 'বাংলা'),
      ('pa', 'Punjabi', 'ਪੰਜਾਬੀ'),
      ('te', 'Telugu', 'తెలుగు'),
      ('ta', 'Tamil', 'தமிழ்')
    `);
    
    logger.info('✅ Languages table created with sample data');
  } catch (error) {
    logger.error('Error creating languages table:', error);
  }
}

export const getDatabase = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call connectDatabase first.');
  }
  return dbInstance;
};

export const closeDatabase = async () => {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
    logger.info('Database connection closed');
  }
};

// Export default with helper methods
export default {
  all: async (sql, params = []) => {
    const db = getDatabase();
    return db.all(sql, params);
  },
  get: async (sql, params = []) => {
    const db = getDatabase();
    return db.get(sql, params);
  },
  run: async (sql, params = []) => {
    const db = getDatabase();
    return db.run(sql, params);
  },
  exec: async (sql) => {
    const db = getDatabase();
    return db.exec(sql);
  },
  connectDatabase,
  getDatabase,
  closeDatabase
};