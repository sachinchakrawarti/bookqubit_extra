/**
 * Logger Service
 * Centralized logging for the geography module
 * Uses Winston for structured logging
 */

import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Log Levels
// ==========================================

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  trace: 'gray'
};

winston.addColors(colors);

// ==========================================
// Log Format
// ==========================================

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(({ level, message, timestamp, module, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    const moduleStr = module ? ` [${module}]` : '';
    return `[${timestamp}]${moduleStr} ${level}: ${message}${metaStr}`;
  })
);

// ==========================================
// Create Logger
// ==========================================

const logger = winston.createLogger({
  levels,
  format: logFormat,
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: consoleFormat
    }),
    // File transport for errors
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/geography-error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/geography-combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  // Don't exit on error
  exitOnError: false
});

// ==========================================
// Logger Service Class
// ==========================================

export class LoggerService {
  constructor(moduleName = 'geography') {
    this.moduleName = moduleName;
    this.logger = logger.child({ module: moduleName });
  }

  // ==========================================
  // Basic Logging Methods
  // ==========================================

  error(message, meta = {}) {
    this.logger.error(message, { ...meta, module: this.moduleName });
  }

  warn(message, meta = {}) {
    this.logger.warn(message, { ...meta, module: this.moduleName });
  }

  info(message, meta = {}) {
    this.logger.info(message, { ...meta, module: this.moduleName });
  }

  debug(message, meta = {}) {
    this.logger.debug(message, { ...meta, module: this.moduleName });
  }

  trace(message, meta = {}) {
    this.logger.trace(message, { ...meta, module: this.moduleName });
  }

  // ==========================================
  // API Request/Response Logging
  // ==========================================

  /**
   * Log API request
   */
  apiRequest(req, res, next) {
    this.info(`API Request: ${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      query: req.query,
      body: this.sanitizeBody(req.body),
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('user-agent'),
      correlationId: req.correlationId
    });
    next();
  }

  /**
   * Log API response
   */
  apiResponse(req, res, data = null) {
    this.info(`API Response: ${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      dataSize: data ? JSON.stringify(data).length : 0,
      correlationId: req.correlationId
    });
  }

  /**
   * Log API error
   */
  apiError(req, res, error) {
    this.error(`API Error: ${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode || 500,
      error: error.message,
      stack: error.stack,
      correlationId: req.correlationId
    });
  }

  // ==========================================
  // Database Logging
  // ==========================================

  databaseOperation(operation, table, data = {}) {
    this.debug(`Database: ${operation} on ${table}`, {
      operation,
      table,
      ...data
    });
  }

  databaseQuery(sql, params = []) {
    this.trace(`Database Query: ${sql}`, {
      sql: sql.substring(0, 500),
      params: params.length > 10 ? `${params.length} params` : params
    });
  }

  databaseError(error, operation, table) {
    this.error(`Database Error: ${operation} on ${table}`, {
      operation,
      table,
      error: error.message,
      stack: error.stack
    });
  }

  // ==========================================
  // Service Logging
  // ==========================================

  serviceOperation(service, method, data = {}) {
    this.debug(`Service: ${service}.${method}`, {
      service,
      method,
      ...data
    });
  }

  serviceError(service, method, error) {
    this.error(`Service Error: ${service}.${method}`, {
      service,
      method,
      error: error.message,
      stack: error.stack
    });
  }

  // ==========================================
  // Validation Logging
  // ==========================================

  validationError(errors, context = {}) {
    this.warn('Validation Error', {
      errors,
      ...context
    });
  }

  validationSuccess(data, context = {}) {
    this.debug('Validation Success', {
      data,
      ...context
    });
  }

  // ==========================================
  // Cache Logging
  // ==========================================

  cacheHit(key) {
    this.trace(`Cache Hit: ${key}`);
  }

  cacheMiss(key) {
    this.trace(`Cache Miss: ${key}`);
  }

  cacheSet(key, ttl) {
    this.debug(`Cache Set: ${key}`, { ttl });
  }

  cacheDelete(key) {
    this.debug(`Cache Delete: ${key}`);
  }

  // ==========================================
  // Error Logging
  // ==========================================

  logError(error, context = {}) {
    this.error(error.message, {
      error: error.stack,
      ...context
    });
  }

  logWarning(message, context = {}) {
    this.warn(message, context);
  }

  logInfo(message, context = {}) {
    this.info(message, context);
  }

  logDebug(message, context = {}) {
    this.debug(message, context);
  }

  // ==========================================
  // Performance Logging
  // ==========================================

  performance(operation, duration, context = {}) {
    this.debug(`Performance: ${operation}`, {
      operation,
      duration: `${duration}ms`,
      ...context
    });
  }

  // ==========================================
  // Security Logging
  // ==========================================

  securityEvent(event, context = {}) {
    this.info(`Security: ${event}`, {
      event,
      ...context
    });
  }

  // ==========================================
  // Helper Methods
  // ==========================================

  /**
   * Sanitize request body for logging (remove sensitive data)
   */
  sanitizeBody(body) {
    if (!body) return body;
    
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'secret', 'authorization', 'apiKey'];
    
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    }
    
    return sanitized;
  }

  /**
   * Create a child logger for a specific service
   */
  child(serviceName) {
    return new LoggerService(`${this.moduleName}:${serviceName}`);
  }

  /**
   * Get log level
   */
  getLevel() {
    return this.logger.level;
  }

  /**
   * Set log level
   */
  setLevel(level) {
    this.logger.level = level;
  }
}

// ==========================================
// Export Default Logger Instance
// ==========================================

export default new LoggerService('geography');

// ==========================================
// Convenience Methods
// ==========================================

export const log = {
  error: (message, meta = {}) => logger.error(message, meta),
  warn: (message, meta = {}) => logger.warn(message, meta),
  info: (message, meta = {}) => logger.info(message, meta),
  debug: (message, meta = {}) => logger.debug(message, meta),
  trace: (message, meta = {}) => logger.trace(message, meta)
};

export const createModuleLogger = (moduleName) => {
  return new LoggerService(moduleName);
};