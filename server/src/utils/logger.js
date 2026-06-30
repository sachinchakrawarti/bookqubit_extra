// src/utils/logger.js

import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Simple logger configuration
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'book-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
});

// Stream for morgan
const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// API logging helper
const log = {
  error: (message, meta = {}) => logger.error(message, meta),
  warn: (message, meta = {}) => logger.warn(message, meta),
  info: (message, meta = {}) => logger.info(message, meta),
  http: (message, meta = {}) => logger.http(message, meta),
  debug: (message, meta = {}) => logger.debug(message, meta),
  api: (req, res, responseTime) => {
    const message = `${req.method} ${req.url} - ${res.statusCode} - ${responseTime}ms`;
    if (res.statusCode >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  },
  // Add custom logging methods
  success: (message, meta = {}) => logger.info(`✅ ${message}`, meta),
  failure: (message, meta = {}) => logger.error(`❌ ${message}`, meta),
  start: (message, meta = {}) => logger.info(`🚀 ${message}`, meta),
  end: (message, meta = {}) => logger.info(`🏁 ${message}`, meta),
  database: (message, meta = {}) => logger.debug(`📊 ${message}`, meta),
  request: (req, meta = {}) => {
    const { method, url, params, query, body } = req;
    logger.info(`📨 ${method} ${url}`, { 
      ...meta, 
      params, 
      query, 
      body: body && Object.keys(body).length > 0 ? body : undefined 
    });
  },
  response: (res, meta = {}) => {
    const { statusCode, statusMessage } = res;
    logger.info(`📤 ${statusCode} - ${statusMessage || ''}`, meta);
  }
};

// Export all as named exports
export { logger, stream, log };

// Also export default for convenience
export default { logger, stream, log };