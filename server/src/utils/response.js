/**
 * Response Utilities
 * Standardized API response handlers
 */

export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res, error, statusCode = 500) => {
  const message = error.message || 'Internal Server Error';
  const code = error.statusCode || statusCode;
  
  return res.status(code).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    timestamp: new Date().toISOString()
  });
};

export default {
  sendSuccess,
  sendError
};