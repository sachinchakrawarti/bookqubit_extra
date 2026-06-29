// src/api/v1/modules/books/repository/books.repository.js
const { logger } = require('../../../../../utils/logger');

// Sample book data
const sampleBooks = [
  {
    id: 1,
    title: "Why I Am an Atheist",
    slug: "why-i-am-an-atheist",
    author: "Bhagat Singh",
    description: "A powerful and reasoned essay by Indian revolutionary Bhagat Singh defending his atheism.",
    category: "Atheism & Religion",
    price: "$9.99",
    imageUrl: "why_i_am_an_atheist.jpg",
    rating: 4.8,
    tags: ["Atheism", "Indian History", "Revolution"],
    isbn: "9788170288808",
    pageCount: 64,
    language: "English",
    summary: "Written from the confines of Lahore Central Jail in 1930."
  },
  {
    id: 2,
    title: "The God Delusion",
    slug: "the-god-delusion",
    author: "Richard Dawkins",
    description: "A groundbreaking argument against religion and the belief in God.",
    category: "Atheism & Science",
    price: "$14.99",
    imageUrl: "the_god_delusion.jpg",
    rating: 4.6,
    tags: ["Science", "Atheism", "Evolution"],
    isbn: "9780618918249",
    pageCount: 464,
    language: "English",
    summary: "A powerful argument against organized religion."
  }
];

class BooksRepository {
  constructor() {
    this.booksData = {
      english: sampleBooks,
      hindi: sampleBooks.map(book => ({
        ...book,
        title: book.title === "Why I Am an Atheist" ? "मैं नास्तिक क्यों हूँ" : book.title,
        language: "Hindi"
      }))
    };
    this.supportedLanguages = ['english', 'hindi', 'bengali', 'telugu', 'marathi', 'tamil'];
  }

  getBooksByLanguage(lang = 'english') {
    const normalizedLang = lang.toLowerCase();
    if (!this.supportedLanguages.includes(normalizedLang)) {
      logger.warn(`Language ${normalizedLang} not supported, falling back to English`);
      return this.booksData.english || [];
    }
    return this.booksData[normalizedLang] || this.booksData.english || [];
  }

  findAll(options = {}) {
    try {
      const { lang = 'english', page = 1, limit = 10, search = null, category = null } = options;
      let books = this.getBooksByLanguage(lang);

      if (category) {
        books = books.filter(book => 
          book.category && book.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        books = books.filter(book =>
          (book.title && book.title.toLowerCase().includes(searchLower)) ||
          (book.author && book.author.toLowerCase().includes(searchLower)) ||
          (book.description && book.description.toLowerCase().includes(searchLower))
        );
      }

      const total = books.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = books.slice(startIndex, endIndex);

      return { books: paginatedBooks, total, page, limit, totalPages, language: lang };
    } catch (error) {
      logger.error(`Error in findAll: ${error.message}`);
      throw error;
    }
  }

  findById(id, lang = 'english') {
    try {
      const books = this.getBooksByLanguage(lang);
      const book = books.find(b => b.id === parseInt(id) || b.id === id);
      return book ? { ...book, _language: lang } : null;
    } catch (error) {
      logger.error(`Error in findById: ${error.message}`);
      throw error;
    }
  }

  findBySlug(slug, lang = 'english') {
    try {
      const books = this.getBooksByLanguage(lang);
      const book = books.find(b => b.slug === slug);
      return book ? { ...book, _language: lang } : null;
    } catch (error) {
      logger.error(`Error in findBySlug: ${error.message}`);
      throw error;
    }
  }

  findByCategory(category, options = {}) {
    return this.findAll({ ...options, category });
  }

  findByAuthor(author, options = {}) {
    try {
      const { lang = 'english', page = 1, limit = 10 } = options;
      const books = this.getBooksByLanguage(lang);
      const filteredBooks = books.filter(book =>
        book.author && book.author.toLowerCase().includes(author.toLowerCase())
      );
      const total = filteredBooks.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return { books: filteredBooks.slice(startIndex, endIndex), total, page, limit, totalPages, language: lang };
    } catch (error) {
      logger.error(`Error in findByAuthor: ${error.message}`);
      throw error;
    }
  }

  findFeatured(options = {}) {
    try {
      const { lang = 'english', limit = 5 } = options;
      const books = this.getBooksByLanguage(lang);
      return books.filter(book => book.rating && book.rating >= 4.5).slice(0, limit);
    } catch (error) {
      logger.error(`Error in findFeatured: ${error.message}`);
      throw error;
    }
  }

  search(searchTerm, options = {}) {
    return this.findAll({ ...options, search: searchTerm });
  }

  getStats(lang = 'english') {
    try {
      const books = this.getBooksByLanguage(lang);
      return {
        totalBooks: books.length,
        categories: [...new Set(books.map(b => b.category).filter(Boolean))],
        authors: [...new Set(books.map(b => b.author).filter(Boolean))],
        totalPages: books.reduce((sum, b) => sum + (parseInt(b.pageCount) || 0), 0),
        averageRating: books.reduce((sum, b) => sum + (parseFloat(b.rating) || 0), 0) / books.length || 0,
        languages: this.supportedLanguages
      };
    } catch (error) {
      logger.error(`Error in getStats: ${error.message}`);
      throw error;
    }
  }

  create(bookData) {
    try {
      const newBook = { id: Date.now(), ...bookData, createdAt: new Date().toISOString() };
      logger.info(`Book created: ${newBook.title}`);
      return newBook;
    } catch (error) {
      logger.error(`Error in create: ${error.message}`);
      throw error;
    }
  }

  update(id, updateData) {
    try {
      const updatedBook = { id: parseInt(id), ...updateData, updatedAt: new Date().toISOString() };
      logger.info(`Book updated: ${id}`);
      return updatedBook;
    } catch (error) {
      logger.error(`Error in update: ${error.message}`);
      throw error;
    }
  }

  delete(id) {
    try {
      logger.info(`Book deleted: ${id}`);
      return true;
    } catch (error) {
      logger.error(`Error in delete: ${error.message}`);
      throw error;
    }
  }
}

module.exports = { BooksRepository };