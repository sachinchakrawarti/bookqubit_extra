// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import the logger - with error handling
let logger, stream;
try {
  const loggerModule = require('./src/utils/logger');
  logger = loggerModule.logger;
  stream = loggerModule.stream;
} catch (error) {
  console.warn('Logger not found, using console fallback');
  logger = {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
    api: (req, res, time) => console.log(`${req.method} ${req.url} - ${res.statusCode} - ${time}ms`)
  };
  stream = { write: (message) => console.log(message.trim()) };
}

// Import API router with error handling
let apiRouter;
try {
  const routerModule = require('./src/api/v1/centralv1api/centralv1api');
  apiRouter = routerModule.apiRouter;
} catch (error) {
  console.error('Failed to load API router:', error.message);
  // Create a fallback router
  const fallbackRouter = express.Router();
  fallbackRouter.use((req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'API is running but router not loaded properly',
      path: req.originalUrl
    });
  });
  apiRouter = fallbackRouter;
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
if (stream) {
  app.use(morgan('combined', { stream }));
}
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', limiter);

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - start;
    if (logger && logger.api) {
      logger.api(req, res, responseTime);
    }
    return originalEnd.call(this, chunk, encoding);
  };
  next();
});

// API Routes
app.use('/api/v1', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'BookQubit API Server',
    version: '1.0.0',
    endpoints: {
      books: `http://localhost:${PORT}/api/v1/books`,
      health: `http://localhost:${PORT}/health`,
      apiInfo: `http://localhost:${PORT}/api/v1/info`
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`=======================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Books API: http://localhost:${PORT}/api/v1/books`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  API Info: http://localhost:${PORT}/api/v1/info`);
  console.log(`=======================================`);
});

module.exports = app;