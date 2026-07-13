/**
 * Response Utilities
 * Standardized API response handlers
 */

export const sendSuccess = (res, data, message = 'Success', statusCode = 200, pagination = null) => {
  const response = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
  
  if (pagination) {
    response.pagination = pagination;
  }
  
  return res.status(statusCode).json(response);
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

export const sendPaginated = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      pages: Math.ceil(pagination.total / pagination.limit)
    },
    timestamp: new Date().toISOString()
  });
};

export const sendCreated = (res, data, message = 'Resource created successfully') => {
  return sendSuccess(res, data, message, 201);
};

export const sendUpdated = (res, data, message = 'Resource updated successfully') => {
  return sendSuccess(res, data, message, 200);
};

export const sendDeleted = (res, message = 'Resource deleted successfully') => {
  return sendSuccess(res, null, message, 200);
};

export default {
  sendSuccess,
  sendError,
  sendPaginated,
  sendCreated,
  sendUpdated,
  sendDeleted
};