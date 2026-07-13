/**
 * Central v1 API
 * Main entry point for all v1 routes
 */

import { Router } from 'express';
import geographyModule from '../modules/geography/index.js';

const router = Router();

// ==========================================
// Health Check
// ==========================================

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API v1 is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// ==========================================
// Geography Module Routes
// ==========================================

// Mount all geography routes
router.use('/geography', geographyModule.routes);

// ==========================================
// Module Health Check
// ==========================================

router.get('/geography/health', async (req, res, next) => {
  try {
    const health = await geographyModule.getModuleHealth();
    res.status(200).json(health);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 404 Handler
// ==========================================

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Error Handler
// ==========================================

router.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Handle Geography specific errors
  if (err.name === 'GeographyError' || err.name === 'NotFoundError' || 
      err.name === 'ValidationError' || err.name === 'DuplicateError') {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
      code: err.code,
      errors: err.errors,
      timestamp: err.timestamp || new Date().toISOString()
    });
  }

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      })),
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      })),
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Foreign key constraint violation',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.details.map(d => ({
        field: d.path.join('.'),
        message: d.message
      })),
      timestamp: new Date().toISOString()
    });
  }

  // Default error response
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});

export default router;