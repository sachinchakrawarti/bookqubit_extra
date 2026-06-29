// src/api/v1/centralv1api/centralv1api.js
const express = require('express');
const { booksRouter } = require('../modules/books/routes/books.routes');
const { logger } = require('../../../utils/logger');

const router = express.Router();

// IMPORTANT: Mount book routes
router.use('/books', booksRouter);

// Health check for API v1
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API v1 is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API info
router.get('/info', (req, res) => {
  res.status(200).json({
    name: 'BookQubit API',
    version: '1.0.0',
    description: 'Multi-language book API',
    endpoints: {
      books: '/api/v1/books',
      'books/search': '/api/v1/books/search',
      'books/featured': '/api/v1/books/featured',
      'books/stats': '/api/v1/books/stats',
      'books/category/:category': '/api/v1/books/category/:category',
      'books/author/:author': '/api/v1/books/author/:author',
      'books/slug/:slug': '/api/v1/books/slug/:slug',
      'books/:id': '/api/v1/books/:id'
    },
    supportedLanguages: [
      'english', 'hindi', 'bengali', 'telugu', 'marathi', 'tamil',
      'urdu', 'kannada', 'malayalam', 'arabic', 'persian', 'pashto',
      'spanish', 'french', 'german', 'italian', 'russian', 'chinese',
      'japanese', 'korean'
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 for any unmatched routes in v1 - FIXED: use router.use instead of router.use('*')
router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API v1 endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      '/api/v1/books',
      '/api/v1/books/search',
      '/api/v1/books/featured',
      '/api/v1/books/stats',
      '/api/v1/books/category/:category',
      '/api/v1/books/author/:author',
      '/api/v1/books/slug/:slug',
      '/api/v1/books/:id',
      '/api/v1/health',
      '/api/v1/info'
    ]
  });
});

module.exports = { apiRouter: router };