// src/api/v1/modules/books/validations/books.validation.js

// Validation middleware for books

export const validateBookQuery = (req, res, next) => {
  const { page, limit, language, author, category, genre, tag, minRating, search } = req.query;
  
  // Validate page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive integer'
    });
  }
  
  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be between 1 and 100'
    });
  }
  
  // Validate minRating
  if (minRating && (isNaN(minRating) || parseFloat(minRating) < 0 || parseFloat(minRating) > 5)) {
    return res.status(400).json({
      success: false,
      message: 'minRating must be between 0 and 5'
    });
  }
  
  // Validate language (optional - check if valid language)
  if (language) {
    const validLanguages = ['english', 'hindi', 'urdu', 'arabic', 'bangla', 'chinese', 'french', 'german', 'italian', 'japanese', 'kannada', 'korean', 'malayalam', 'marathi', 'pashto', 'persian', 'russian', 'spanish', 'tamil', 'telugu'];
    if (!validLanguages.includes(language.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language specified'
      });
    }
  }
  
  next();
};

export const validateBookCreation = (req, res, next) => {
  const { title, author, language, description, isbn, price, pageCount } = req.body;
  
  const errors = [];
  
  // Required fields
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!author || author.trim().length === 0) {
    errors.push('Author is required');
  }
  
  if (!language || language.trim().length === 0) {
    errors.push('Language is required');
  }
  
  // Optional field validations
  if (description && description.length > 5000) {
    errors.push('Description must be less than 5000 characters');
  }
  
  if (isbn && !/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(isbn)) {
    errors.push('Invalid ISBN format');
  }
  
  if (price && isNaN(parseFloat(price))) {
    errors.push('Price must be a valid number');
  }
  
  if (pageCount && (isNaN(parseInt(pageCount)) || parseInt(pageCount) < 1)) {
    errors.push('Page count must be a positive integer');
  }
  
  // Validate language
  if (language) {
    const validLanguages = ['english', 'hindi', 'urdu', 'arabic', 'bangla', 'chinese', 'french', 'german', 'italian', 'japanese', 'kannada', 'korean', 'malayalam', 'marathi', 'pashto', 'persian', 'russian', 'spanish', 'tamil', 'telugu'];
    if (!validLanguages.includes(language.toLowerCase())) {
      errors.push('Invalid language specified');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

export const validateBookUpdate = (req, res, next) => {
  const updateData = req.body;
  
  // At least one field should be provided for update
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update'
    });
  }
  
  const errors = [];
  
  // Validate title if provided
  if (updateData.title && updateData.title.trim().length === 0) {
    errors.push('Title cannot be empty');
  }
  
  // Validate author if provided
  if (updateData.author && updateData.author.trim().length === 0) {
    errors.push('Author cannot be empty');
  }
  
  // Validate price if provided
  if (updateData.price && isNaN(parseFloat(updateData.price))) {
    errors.push('Price must be a valid number');
  }
  
  // Validate rating if provided
  if (updateData.rating) {
    if (isNaN(parseFloat(updateData.rating)) || 
        parseFloat(updateData.rating) < 0 || 
        parseFloat(updateData.rating) > 5) {
      errors.push('Rating must be between 0 and 5');
    }
  }
  
  // Validate pageCount if provided
  if (updateData.pageCount && (isNaN(parseInt(updateData.pageCount)) || 
      parseInt(updateData.pageCount) < 1)) {
    errors.push('Page count must be a positive integer');
  }
  
  // Validate ISBN if provided
  if (updateData.isbn && !/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(updateData.isbn)) {
    errors.push('Invalid ISBN format');
  }
  
  // Validate language if provided
  if (updateData.language) {
    const validLanguages = ['english', 'hindi', 'urdu', 'arabic', 'bangla', 'chinese', 'french', 'german', 'italian', 'japanese', 'kannada', 'korean', 'malayalam', 'marathi', 'pashto', 'persian', 'russian', 'spanish', 'tamil', 'telugu'];
    if (!validLanguages.includes(updateData.language.toLowerCase())) {
      errors.push('Invalid language specified');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

// Sanitize search query
export const sanitizeSearchQuery = (req, res, next) => {
  if (req.query.search) {
    // Remove special characters that could be used for injection
    req.query.search = req.query.search.replace(/[^\w\s]/g, '');
    
    // Trim extra spaces
    req.query.search = req.query.search.trim();
    
    // Limit search length
    if (req.query.search.length > 100) {
      req.query.search = req.query.search.substring(0, 100);
    }
  }
  
  // Sanitize other query parameters
  if (req.query.author) {
    req.query.author = req.query.author.replace(/[^\w\s]/g, '').trim();
  }
  
  if (req.query.category) {
    req.query.category = req.query.category.replace(/[^\w\s]/g, '').trim();
  }
  
  if (req.query.genre) {
    req.query.genre = req.query.genre.replace(/[^\w\s]/g, '').trim();
  }
  
  if (req.query.tag) {
    req.query.tag = req.query.tag.replace(/[^\w\s]/g, '').trim();
  }
  
  next();
};

// Validate book ID parameter
export const validateBookId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || (isNaN(id) && typeof id !== 'string')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID'
    });
  }
  
  next();
};

// Validate slug parameter
export const validateSlug = (req, res, next) => {
  const { slug } = req.params;
  
  if (!slug || slug.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid slug'
    });
  }
  
  // Slug should only contain letters, numbers, and hyphens
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({
      success: false,
      message: 'Slug can only contain lowercase letters, numbers, and hyphens'
    });
  }
  
  next();
};

// Validate pagination parameters
export const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive integer'
    });
  }
  
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be between 1 and 100'
    });
  }
  
  next();
};

// Combine validations for different use cases
export const validateGetBooks = [
  validateBookQuery,
  sanitizeSearchQuery,
  validatePagination
];

export const validateCreateBook = [
  validateBookCreation
];

export const validateUpdateBook = [
  validateBookId,
  validateBookUpdate
];

export const validateDeleteBook = [
  validateBookId
];

export const validateGetBook = [
  validateBookId
];

export const validateGetBookBySlug = [
  validateSlug
];

// Default export for convenience
export default {
  validateBookQuery,
  validateBookCreation,
  validateBookUpdate,
  sanitizeSearchQuery,
  validateBookId,
  validateSlug,
  validatePagination,
  validateGetBooks,
  validateCreateBook,
  validateUpdateBook,
  validateDeleteBook,
  validateGetBook,
  validateGetBookBySlug
};