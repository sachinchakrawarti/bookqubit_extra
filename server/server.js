// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to resolve paths
const resolvePath = (relativePath) => {
  const resolved = path.join(__dirname, relativePath);
  return `file:///${resolved.replace(/\\/g, '/')}`;
};

// Import modules using resolved paths
const apiV1Module = await import(resolvePath('src/api/v1/centralv1api/centralv1api.js'));
const dbModule = await import(resolvePath('database/connection.js'));
const loggerModule = await import(resolvePath('src/utils/logger.js'));

const apiV1 = apiV1Module.default || apiV1Module;
const { connectDatabase } = dbModule;
const logger = loggerModule.default || loggerModule;

const app = express();

// Try ports from 3000 to 3010
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = app.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(compression());

app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'BookQubit API is running.',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api/v1', apiV1);

app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: 'Route not found.',
    path: req.url
  });
});

app.use((err, _req, res, _next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

async function startServer() {
  try {
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Find available port
    const PORT = await findAvailablePort(process.env.PORT || 3000);
    
    app.listen(PORT, () => {
      logger.info(`🚀 BookQubit API listening on port ${PORT}`);
      logger.info(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();