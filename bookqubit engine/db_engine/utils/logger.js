/**
 * Logger Utility
 */

const winston = require('winston');
const path = require('path');
const config = require('../config');

// Ensure logs directory exists
const fs = require('fs-extra');
fs.ensureDirSync(config.paths.logs);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'bookqubit-engine' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        })
      )
    }),
    // File transports
    new winston.transports.File({
      filename: path.join(config.paths.logs, 'engine.log'),
      maxsize: 100 * 1024 * 1024, // 100MB
      maxFiles: 5,
      tailable: true
    }),
    new winston.transports.File({
      filename: path.join(config.paths.logs, 'error.log'),
      level: 'error',
      maxsize: 100 * 1024 * 1024, // 100MB
      maxFiles: 5,
      tailable: true
    })
  ]
});

// Add methods for different log levels
logger.debug = (message, meta = {}) => logger.log('debug', message, meta);
logger.info = (message, meta = {}) => logger.log('info', message, meta);
logger.warn = (message, meta = {}) => logger.log('warn', message, meta);
logger.error = (message, meta = {}) => logger.log('error', message, meta);

module.exports = logger;