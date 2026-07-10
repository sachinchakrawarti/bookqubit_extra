// config/env.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbPath: process.env.DB_PATH || './database/books.db',
  logLevel: process.env.LOG_LEVEL || 'info',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

export default config;