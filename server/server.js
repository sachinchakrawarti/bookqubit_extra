import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

// Import modules
import geographyModule from './src/api/v1/modules/geography/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ==========================================
// Health Check
// ==========================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==========================================
// Register Geography Routes
// ==========================================

// The routes are exported as a router, use it directly
const router = geographyModule.routes || geographyModule.geographyRoutes;

if (router && typeof router === 'function') {
  // If it's a function, it might be the router itself or a factory
  app.use('/api/v1/geography', router);
  console.log('✅ Geography routes registered (router function)');
} else if (router && typeof router === 'object' && router.stack) {
  // If it's an object with stack, it's a router
  app.use('/api/v1/geography', router);
  console.log('✅ Geography routes registered (router object)');
} else {
  console.log('⚠️ No valid router found, using initModule...');
  geographyModule.initModule(app, {
    prefix: '/api/v1/geography',
    adminPrefix: '/api/v1/admin/geography',
    analyticsPrefix: '/api/v1/geography/analytics'
  });
  console.log('✅ Geography module initialized via initModule');
}

// ==========================================
// Test Route
// ==========================================

app.get('/api/v1/geography/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Geography test route is working',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Error Handler
// ==========================================

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 BookQbit Server Started');
  console.log('========================================');
  console.log(`🌍 Server: http://localhost:${PORT}`);
  console.log(`📡 API v1: http://localhost:${PORT}/api/v1`);
  console.log(`🗺️  Geography: http://localhost:${PORT}/api/v1/geography/countries`);
  console.log(`🔐 Admin: http://localhost:${PORT}/api/v1/admin/geography`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
});

export default app;