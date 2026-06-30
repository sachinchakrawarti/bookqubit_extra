// server.js - Fixed logger import

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Fix: Import logger correctly
import { logger, stream, log } from './src/utils/logger.js';

// Import Books Module
import booksModule from './src/api/v1/modules/books/index.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Compression middleware
app.use(compression());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware - use the stream from logger
app.use(morgan('combined', { stream }));

// ============================================
// STATIC FILES
// ============================================

app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// BOOKS API ROUTES
// ============================================

app.use('/api/v1/books', booksModule.routes || booksModule);

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Books API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Books API Server',
    version: '1.0.0',
    endpoints: {
      books: '/api/v1/books',
      bookById: '/api/v1/books/:id',
      booksByLanguage: '/api/v1/books/language/:language',
      booksByAuthor: '/api/v1/books/author/:author',
      booksByCategory: '/api/v1/books/category/:category',
      booksByGenre: '/api/v1/books/genre/:genre',
      booksByTag: '/api/v1/books/tag/:tag',
      search: '/api/v1/books/search',
      featured: '/api/v1/books/featured',
      related: '/api/v1/books/:id/related',
      stats: '/api/v1/books/stats',
      slug: '/api/v1/books/slug/:slug',
      health: '/health'
    }
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler - use log object for logging
app.use((err, req, res, next) => {
  log.error(`Error: ${err.message}`);
  log.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  log.info(`🚀 Books API Server running on port ${PORT}`);
  log.info(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  log.info(`📍 URL: http://localhost:${PORT}`);
  log.info(`📖 Books endpoint: http://localhost:${PORT}/api/v1/books`);
});

// Handle unhandled promise rejections - use log object
process.on('unhandledRejection', (err) => {
  log.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions - use log object
process.on('uncaughtException', (err) => {
  log.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

export default app;