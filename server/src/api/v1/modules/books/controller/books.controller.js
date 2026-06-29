// src/api/v1/modules/books/controller/books.controller.js
const { BooksService } = require('../services/books.service');
const { logger } = require('../../../../../utils/logger');

class BooksController {
  constructor() {
    this.booksService = new BooksService();
  }

  /**
   * Get all books with optional language filter
   */
  getAllBooks = async (req, res, next) => {
    try {
      const { lang = 'english', page = 1, limit = 10, search, category } = req.query;
      
      const result = await this.booksService.getAllBooks({
        lang,
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        category
      });

      res.status(200).json({
        status: 'success',
        data: result.books || [],
        pagination: {
          page: result.page || 1,
          limit: result.limit || 10,
          total: result.total || 0,
          totalPages: result.totalPages || 0
        },
        metadata: {
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getAllBooks: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get book by ID
   */
  getBookById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { lang = 'english' } = req.query;

      const book = await this.booksService.getBookById(id, lang);

      if (!book) {
        return res.status(404).json({
          status: 'error',
          message: 'Book not found',
          code: 'BOOK_NOT_FOUND'
        });
      }

      res.status(200).json({
        status: 'success',
        data: book,
        metadata: {
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getBookById: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get book by slug
   */
  getBookBySlug = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { lang = 'english' } = req.query;

      const book = await this.booksService.getBookBySlug(slug, lang);

      if (!book) {
        return res.status(404).json({
          status: 'error',
          message: 'Book not found',
          code: 'BOOK_NOT_FOUND'
        });
      }

      res.status(200).json({
        status: 'success',
        data: book,
        metadata: {
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getBookBySlug: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get books by category
   */
  getBooksByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const { lang = 'english', page = 1, limit = 10 } = req.query;

      const result = await this.booksService.getBooksByCategory(category, {
        lang,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.status(200).json({
        status: 'success',
        data: result.books || [],
        pagination: {
          page: result.page || 1,
          limit: result.limit || 10,
          total: result.total || 0,
          totalPages: result.totalPages || 0
        },
        metadata: {
          category,
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getBooksByCategory: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get books by author
   */
  getBooksByAuthor = async (req, res, next) => {
    try {
      const { author } = req.params;
      const { lang = 'english', page = 1, limit = 10 } = req.query;

      const result = await this.booksService.getBooksByAuthor(author, {
        lang,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.status(200).json({
        status: 'success',
        data: result.books || [],
        pagination: {
          page: result.page || 1,
          limit: result.limit || 10,
          total: result.total || 0,
          totalPages: result.totalPages || 0
        },
        metadata: {
          author,
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getBooksByAuthor: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get featured books
   */
  getFeaturedBooks = async (req, res, next) => {
    try {
      const { lang = 'english', limit = 5 } = req.query;

      const books = await this.booksService.getFeaturedBooks({
        lang,
        limit: parseInt(limit)
      });

      res.status(200).json({
        status: 'success',
        data: books || [],
        metadata: {
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getFeaturedBooks: ${error.message}`);
      next(error);
    }
  };

  /**
   * Search books
   */
  searchBooks = async (req, res, next) => {
    try {
      const { q, lang = 'english', page = 1, limit = 10 } = req.query;

      if (!q) {
        return res.status(400).json({
          status: 'error',
          message: 'Search query is required',
          code: 'SEARCH_QUERY_REQUIRED'
        });
      }

      const result = await this.booksService.searchBooks(q, {
        lang,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.status(200).json({
        status: 'success',
        data: result.books || [],
        pagination: {
          page: result.page || 1,
          limit: result.limit || 10,
          total: result.total || 0,
          totalPages: result.totalPages || 0
        },
        metadata: {
          searchQuery: q,
          language: lang,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in searchBooks: ${error.message}`);
      next(error);
    }
  };

  /**
   * Get book statistics
   */
  getBookStats = async (req, res, next) => {
    try {
      const stats = await this.booksService.getBookStats();

      res.status(200).json({
        status: 'success',
        data: stats,
        metadata: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in getBookStats: ${error.message}`);
      next(error);
    }
  };

  /**
   * Create new book (Admin only)
   */
  createBook = async (req, res, next) => {
    try {
      const bookData = req.body;
      
      if (!bookData.title || !bookData.author || !bookData.isbn) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required fields: title, author, isbn',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      const newBook = await this.booksService.createBook(bookData);

      res.status(201).json({
        status: 'success',
        data: newBook,
        message: 'Book created successfully',
        metadata: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in createBook: ${error.message}`);
      next(error);
    }
  };

  /**
   * Update book (Admin only)
   */
  updateBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedBook = await this.booksService.updateBook(id, updateData);

      if (!updatedBook) {
        return res.status(404).json({
          status: 'error',
          message: 'Book not found',
          code: 'BOOK_NOT_FOUND'
        });
      }

      res.status(200).json({
        status: 'success',
        data: updatedBook,
        message: 'Book updated successfully',
        metadata: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in updateBook: ${error.message}`);
      next(error);
    }
  };

  /**
   * Delete book (Admin only)
   */
  deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleted = await this.booksService.deleteBook(id);

      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: 'Book not found',
          code: 'BOOK_NOT_FOUND'
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Book deleted successfully',
        metadata: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error(`Error in deleteBook: ${error.message}`);
      next(error);
    }
  };
}

module.exports = { BooksController };