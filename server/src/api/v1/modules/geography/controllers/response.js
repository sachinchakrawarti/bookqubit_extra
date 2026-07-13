/**
 * Response Handler
 * Standardized response utilities for all controllers
 */

// ==========================================
// Success Responses
// ==========================================

export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendCreated = (res, data, message = 'Resource created successfully') => {
  return sendSuccess(res, data, message, 201);
};

export const sendUpdated = (res, data, message = 'Resource updated successfully') => {
  return sendSuccess(res, data, message, 200);
};

export const sendDeleted = (res, data = null, message = 'Resource deleted successfully') => {
  return sendSuccess(res, data, message, 200);
};

export const sendPaginated = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 0,
      hasNext: pagination.hasNext || false,
      hasPrev: pagination.hasPrev || false
    },
    timestamp: new Date().toISOString()
  });
};

// ==========================================
// Error Responses
// ==========================================

export const sendError = (res, error, statusCode = 500) => {
  const message = error.message || 'Internal server error';
  const errors = error.errors || null;
  
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
};

export const sendBadRequest = (res, message = 'Bad request', errors = null) => {
  return sendError(res, { message, errors }, 400);
};

export const sendUnauthorized = (res, message = 'Unauthorized') => {
  return sendError(res, { message }, 401);
};

export const sendForbidden = (res, message = 'Forbidden') => {
  return sendError(res, { message }, 403);
};

export const sendNotFound = (res, message = 'Resource not found') => {
  return sendError(res, { message }, 404);
};

export const sendConflict = (res, message = 'Resource conflict') => {
  return sendError(res, { message }, 409);
};

export const sendValidationError = (res, errors, message = 'Validation error') => {
  return sendError(res, { message, errors }, 422);
};

export const sendInternalError = (res, message = 'Internal server error', error = null) => {
  const errors = error ? { stack: error.stack, ...error } : null;
  return sendError(res, { message, errors }, 500);
};

// ==========================================
// Response Handler Object
// ==========================================

export const responseHandler = {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  sendError,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendConflict,
  sendValidationError,
  sendInternalError
};

// ==========================================
// Default Export
// ==========================================

export default responseHandler;