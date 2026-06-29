// src/api/v1/modules/books/services/books.service.js
const { BooksRepository } = require('../repository/books.repository');
const { logger } = require('../../../../../utils/logger');

class BooksService {
  constructor() {
    this.repository = new BooksRepository();
  }

  async getAllBooks(options = {}) {
    try {
      const { lang = 'english', page = 1, limit = 10, search, category } = options;
      const result = await this.repository.findAll({
        lang,
        page,
        limit,
        search,
        category
      });
      return result;
    } catch (error) {
      logger.error(`Error in getAllBooks: ${error.message}`);
      throw error;
    }
  }

  async getBookById(id, lang = 'english') {
    try {
      const book = await this.repository.findById(id, lang);
      if (!book) {
        logger.warn(`Book with ID ${id} not found in ${lang}`);
        return null;
      }
      return book;
    } catch (error) {
      logger.error(`Error in getBookById: ${error.message}`);
      throw error;
    }
  }

  async getBookBySlug(slug, lang = 'english') {
    try {
      const book = await this.repository.findBySlug(slug, lang);
      if (!book) {
        logger.warn(`Book with slug ${slug} not found in ${lang}`);
        return null;
      }
      return book;
    } catch (error) {
      logger.error(`Error in getBookBySlug: ${error.message}`);
      throw error;
    }
  }

  async getBooksByCategory(category, options = {}) {
    try {
      const result = await this.repository.findByCategory(category, options);
      return result;
    } catch (error) {
      logger.error(`Error in getBooksByCategory: ${error.message}`);
      throw error;
    }
  }

  async getBooksByAuthor(author, options = {}) {
    try {
      const result = await this.repository.findByAuthor(author, options);
      return result;
    } catch (error) {
      logger.error(`Error in getBooksByAuthor: ${error.message}`);
      throw error;
    }
  }

  async getFeaturedBooks(options = {}) {
    try {
      const featured = await this.repository.findFeatured(options);
      return featured;
    } catch (error) {
      logger.error(`Error in getFeaturedBooks: ${error.message}`);
      throw error;
    }
  }

  async searchBooks(query, options = {}) {
    try {
      const result = await this.repository.search(query, options);
      return result;
    } catch (error) {
      logger.error(`Error in searchBooks: ${error.message}`);
      throw error;
    }
  }

  async getBookStats() {
    try {
      const stats = await this.repository.getStats();
      return stats;
    } catch (error) {
      logger.error(`Error in getBookStats: ${error.message}`);
      throw error;
    }
  }

  async createBook(bookData) {
    try {
      const newBook = await this.repository.create(bookData);
      return newBook;
    } catch (error) {
      logger.error(`Error in createBook: ${error.message}`);
      throw error;
    }
  }

  async updateBook(id, updateData) {
    try {
      const existingBook = await this.repository.findById(id);
      if (!existingBook) {
        return null;
      }
      const updatedBook = await this.repository.update(id, updateData);
      return updatedBook;
    } catch (error) {
      logger.error(`Error in updateBook: ${error.message}`);
      throw error;
    }
  }

  async deleteBook(id) {
    try {
      const existingBook = await this.repository.findById(id);
      if (!existingBook) {
        return false;
      }
      const deleted = await this.repository.delete(id);
      return deleted;
    } catch (error) {
      logger.error(`Error in deleteBook: ${error.message}`);
      throw error;
    }
  }
}

module.exports = { BooksService };