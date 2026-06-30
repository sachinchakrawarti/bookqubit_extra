// src/api/v1/modules/books/repository/books.repository.js

import * as bookData from '../data/index.js';

class BooksRepository {
  constructor() {
    this.booksData = bookData;
  }

  // Get all books with optional filters
  async findAll(filters = {}) {
    try {
      let books = this.booksData.getAllBooks();
      
      // Apply language filter
      if (filters.language) {
        const langMap = {
          'english': 'english',
          'hindi': 'hindi',
          'urdu': 'urdu',
          'arabic': 'arabic',
          'bangla': 'bangla',
          'bengali': 'bangla',
          'chinese': 'chinese',
          'french': 'french',
          'german': 'german',
          'italian': 'italian',
          'japanese': 'japanese',
          'kannada': 'kannada',
          'korean': 'korean',
          'malayalam': 'malayalam',
          'marathi': 'marathi',
          'pashto': 'pashto',
          'persian': 'persian',
          'russian': 'russian',
          'spanish': 'spanish',
          'tamil': 'tamil',
          'telugu': 'telugu'
        };
        
        const langKey = filters.language.toLowerCase();
        const mappedLang = langMap[langKey] || langKey;
        
        books = books.filter(book => {
          const bookLang = book.language ? book.language.toLowerCase() : '';
          return bookLang === mappedLang || bookLang === langKey;
        });
      }
      
      // Apply author filter
      if (filters.author) {
        books = books.filter(book => 
          book.author && book.author.toLowerCase().includes(filters.author.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.category) {
        books = books.filter(book => 
          book.category && book.category.toLowerCase().includes(filters.category.toLowerCase())
        );
      }
      
      // Apply genre filter
      if (filters.genre) {
        books = books.filter(book => 
          book.genres && book.genres.some(g => 
            g.toLowerCase().includes(filters.genre.toLowerCase())
          )
        );
      }
      
      // Apply tag filter
      if (filters.tag) {
        books = books.filter(book => 
          book.tags && book.tags.some(t => 
            t.toLowerCase().includes(filters.tag.toLowerCase())
          )
        );
      }
      
      // Apply minRating filter
      if (filters.minRating) {
        books = books.filter(book => 
          book.rating && book.rating >= parseFloat(filters.minRating)
        );
      }
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        books = books.filter(book => 
          (book.title && book.title.toLowerCase().includes(searchTerm)) ||
          (book.author && book.author.toLowerCase().includes(searchTerm)) ||
          (book.description && book.description.toLowerCase().includes(searchTerm)) ||
          (book.summary && book.summary.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply sort
      if (filters.sortBy) {
        const sortField = filters.sortBy;
        const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
        books.sort((a, b) => {
          const aVal = a[sortField] || 0;
          const bVal = b[sortField] || 0;
          return (aVal > bVal ? 1 : -1) * sortOrder;
        });
      }
      
      return books;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  // Find book by ID
  async findById(id) {
    try {
      return this.booksData.getBookById(id);
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  // Find books by language
  async findByLanguage(language) {
    try {
      return this.booksData.getBooksByLanguage(language);
    } catch (error) {
      console.error('Error in findByLanguage:', error);
      throw error;
    }
  }

  // Find books by author
  async findByAuthor(author) {
    try {
      return this.booksData.getBooksByAuthor(author);
    } catch (error) {
      console.error('Error in findByAuthor:', error);
      throw error;
    }
  }

  // Find books by category
  async findByCategory(category) {
    try {
      return this.booksData.getBooksByCategory(category);
    } catch (error) {
      console.error('Error in findByCategory:', error);
      throw error;
    }
  }

  // Find books by genre
  async findByGenre(genre) {
    try {
      return this.booksData.getBooksByGenre(genre);
    } catch (error) {
      console.error('Error in findByGenre:', error);
      throw error;
    }
  }

  // Find books by tag
  async findByTag(tag) {
    try {
      return this.booksData.getBooksByTag(tag);
    } catch (error) {
      console.error('Error in findByTag:', error);
      throw error;
    }
  }

  // Search books
  async search(query) {
    try {
      return this.booksData.searchBooks(query);
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  }

  // Create new book (for static data, this is a mock)
  async create(bookData) {
    try {
      const newBook = {
        id: Date.now(),
        ...bookData,
        createdAt: new Date().toISOString()
      };
      return newBook;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  // Update book (for static data, this is a mock)
  async update(id, updateData) {
    try {
      const book = await this.findById(id);
      if (!book) {
        return null;
      }
      
      const updatedBook = {
        ...book,
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      return updatedBook;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  // Delete book (for static data, this is a mock)
  async delete(id) {
    try {
      const book = await this.findById(id);
      if (!book) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }

  // Get featured books
  async getFeatured(limit = 10) {
    try {
      return this.booksData.getFeaturedBooks(limit);
    } catch (error) {
      console.error('Error in getFeatured:', error);
      throw error;
    }
  }

  // Get book statistics
  async getStats() {
    try {
      const allBooks = this.booksData.getAllBooks();
      const languages = [...new Set(allBooks.map(book => book.language).filter(Boolean))];
      const categories = [...new Set(allBooks.map(book => book.category).filter(Boolean))];
      const totalBooks = allBooks.length;
      const avgRating = allBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / totalBooks;
      
      // Count books by language
      const languageCount = {};
      languages.forEach(lang => {
        languageCount[lang] = allBooks.filter(book => book.language === lang).length;
      });
      
      return {
        totalBooks,
        languages: languages.length,
        categories: categories.length,
        averageRating: Math.round(avgRating * 10) / 10,
        languagesList: languages,
        categoriesList: categories,
        languageCount: languageCount
      };
    } catch (error) {
      console.error('Error in getStats:', error);
      throw error;
    }
  }
}

// Export as default
export default new BooksRepository();

// Also export the class for testing or extension
export { BooksRepository };