// src/api/v1/modules/books/services/books.service.js

import bookRepository from '../repository/books.repository.js';
import { BookDTO } from '../dto/books.dto.js';

export class BooksService {
  // Get all books with filters and pagination
  async getAllBooks(filters = {}) {
    try {
      const { page = 1, limit = 10, language, search, category, ...queryFilters } = filters;
      
      // Get books from repository with language filter
      let books = await bookRepository.findAll({
        ...queryFilters,
        language: language || 'english' // Default to english if not specified
      });
      
      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      // Transform to DTOs
      const bookDTOs = paginatedBooks.map(book => BookDTO.toSummary(book));
      
      return {
        books: bookDTOs,
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getAllBooks:', error);
      throw error;
    }
  }

  // Get book by ID
  async getBookById(id, lang = 'english') {
    try {
      const book = await bookRepository.findById(id);
      if (!book) {
        return null;
      }
      return BookDTO.toDetail(book);
    } catch (error) {
      console.error('Error in getBookById:', error);
      throw error;
    }
  }

  // Get book by slug
  async getBookBySlug(slug, lang = 'english') {
    try {
      const allBooks = await bookRepository.findAll();
      const book = allBooks.find(b => 
        b.slug === slug || 
        (b.hindiSlug && b.hindiSlug === slug) ||
        (b.urduSlug && b.urduSlug === slug) ||
        (b.arabicSlug && b.arabicSlug === slug)
      );
      
      if (!book) {
        return null;
      }
      
      // If language is specified and not the book's language, try to find the same book in that language
      if (lang.toLowerCase() !== 'english' && book.language.toLowerCase() !== lang.toLowerCase()) {
        // Try to find the same book in the requested language
        const translatedBook = await this.getBookById(book.id);
        if (translatedBook) {
          return translatedBook;
        }
      }
      
      return BookDTO.toDetail(book);
    } catch (error) {
      console.error('Error in getBookBySlug:', error);
      throw error;
    }
  }

  // Get books by language
  async getBooksByLanguage(language, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      const books = await bookRepository.findByLanguage(language);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByLanguage:', error);
      throw error;
    }
  }

  // Get books by author
  async getBooksByAuthor(author, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      let books = await bookRepository.findByAuthor(author);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByAuthor:', error);
      throw error;
    }
  }

  // Get books by category
  async getBooksByCategory(category, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      let books = await bookRepository.findByCategory(category);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByCategory:', error);
      throw error;
    }
  }

  // Get books by genre
  async getBooksByGenre(genre, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      let books = await bookRepository.findByGenre(genre);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByGenre:', error);
      throw error;
    }
  }

  // Get books by tag
  async getBooksByTag(tag, options = {}) {
    try {
      const { page = 1, limit = 10 } = options;
      let books = await bookRepository.findByTag(tag);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByTag:', error);
      throw error;
    }
  }

  // Get featured books
  async getFeaturedBooks(options = {}) {
    try {
      const { limit = 5, language = 'english' } = options;
      
      // Get books filtered by language
      const books = await bookRepository.findAll({ language });
      
      // Sort by rating and get featured
      const featured = books
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, parseInt(limit));
      
      return featured.map(book => BookDTO.toSummary(book));
    } catch (error) {
      console.error('Error in getFeaturedBooks:', error);
      throw error;
    }
  }

  // Search books
  async searchBooks(query, options = {}) {
    try {
      const { page = 1, limit = 10, language = 'english' } = options;
      
      // Search with language filter
      const allBooks = await bookRepository.findAll({ 
        search: query,
        language 
      });
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = allBooks.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: allBooks.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(allBooks.length / limit)
      };
    } catch (error) {
      console.error('Error in searchBooks:', error);
      throw error;
    }
  }

  // Get book statistics
  async getBookStats() {
    try {
      const stats = await bookRepository.getStats();
      return stats;
    } catch (error) {
      console.error('Error in getBookStats:', error);
      throw error;
    }
  }

  // Create new book
  async createBook(bookData) {
    try {
      // Validate required fields
      if (!bookData.title || !bookData.author) {
        throw new Error('Title and author are required');
      }
      
      // Generate slug if not provided
      if (!bookData.slug) {
        bookData.slug = bookData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      
      const newBook = await bookRepository.create(bookData);
      return BookDTO.toDetail(newBook);
    } catch (error) {
      console.error('Error in createBook:', error);
      throw error;
    }
  }

  // Update book
  async updateBook(id, updateData) {
    try {
      const updatedBook = await bookRepository.update(id, updateData);
      if (!updatedBook) {
        return null;
      }
      return BookDTO.toDetail(updatedBook);
    } catch (error) {
      console.error('Error in updateBook:', error);
      throw error;
    }
  }

  // Delete book
  async deleteBook(id) {
    try {
      return await bookRepository.delete(id);
    } catch (error) {
      console.error('Error in deleteBook:', error);
      throw error;
    }
  }

  // Get related books
  async getRelatedBooks(bookId, options = {}) {
    try {
      const { limit = 5, language = 'english' } = options;
      
      const book = await bookRepository.findById(bookId);
      if (!book) {
        return [];
      }
      
      // Find books with similar tags, genres, or author in the same language
      const allBooks = await bookRepository.findAll({ language });
      const related = allBooks
        .filter(b => b.id !== parseInt(bookId))
        .map(b => {
          let score = 0;
          
          // Same author
          if (b.author && book.author && b.author === book.author) score += 3;
          
          // Same genre
          if (b.genres && book.genres && Array.isArray(b.genres) && Array.isArray(book.genres)) {
            const commonGenres = b.genres.filter(g => book.genres.includes(g));
            score += commonGenres.length * 2;
          }
          
          // Same tags
          if (b.tags && book.tags && Array.isArray(b.tags) && Array.isArray(book.tags)) {
            const commonTags = b.tags.filter(t => book.tags.includes(t));
            score += commonTags.length;
          }
          
          // Same category
          if (b.category && book.category && b.category === book.category) score += 1;
          
          return { ...b, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      
      return related.map(book => BookDTO.toSummary(book));
    } catch (error) {
      console.error('Error in getRelatedBooks:', error);
      throw error;
    }
  }

  // Get books by multiple filters
  async getBooksByFilters(filters = {}) {
    try {
      const { page = 1, limit = 10, language = 'english', ...queryFilters } = filters;
      
      let books = await bookRepository.findAll({
        ...queryFilters,
        language
      });
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedBooks = books.slice(startIndex, endIndex);
      
      return {
        books: paginatedBooks.map(book => BookDTO.toSummary(book)),
        total: books.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(books.length / limit)
      };
    } catch (error) {
      console.error('Error in getBooksByFilters:', error);
      throw error;
    }
  }
}

// Export the class
export default BooksService;

// Also export a singleton instance
const booksService = new BooksService();
export { booksService };