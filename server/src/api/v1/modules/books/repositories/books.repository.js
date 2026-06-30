// src/api/v1/modules/books/repository/books.repository.js

/**
 * Books Repository
 * Data access layer for book operations
 */

import * as bookData from '../data/index.js';
import { 
    BOOK_STATUS, 
    DEFAULTS, 
    ERROR_CODES,
    SORT,
    FILTER 
} from '../config/constants.js';
import { normalizeLanguageCode } from '../config/languages.config.js';
import { logger } from '../../../../../utils/logger.js';

class BooksRepository {
    constructor() {
        this.booksData = bookData;
    }

    // ============================================
    // READ OPERATIONS
    // ============================================

    /**
     * Get all books with filters
     * @param {Object} filters - Filter options
     * @returns {Array} List of books
     */
    async findAll(filters = {}) {
        try {
            let books = this.booksData.getAllBooks();
            
            // Apply language filter
            if (filters.language) {
                const langKey = normalizeLanguageCode(filters.language);
                books = books.filter(book => {
                    const bookLang = book.language ? book.language.toLowerCase() : '';
                    return bookLang === langKey;
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
                    book.genres && Array.isArray(book.genres) && 
                    book.genres.some(g => g.toLowerCase().includes(filters.genre.toLowerCase()))
                );
            }
            
            // Apply tag filter
            if (filters.tag) {
                books = books.filter(book => 
                    book.tags && Array.isArray(book.tags) && 
                    book.tags.some(t => t.toLowerCase().includes(filters.tag.toLowerCase()))
                );
            }
            
            // Apply minRating filter
            if (filters.minRating) {
                books = books.filter(book => 
                    book.rating && book.rating >= parseFloat(filters.minRating)
                );
            }
            
            // Apply maxRating filter
            if (filters.maxRating) {
                books = books.filter(book => 
                    book.rating && book.rating <= parseFloat(filters.maxRating)
                );
            }
            
            // Apply price range filter
            if (filters.minPrice !== undefined) {
                books = books.filter(book => 
                    book.price && parseFloat(book.price) >= parseFloat(filters.minPrice)
                );
            }
            
            if (filters.maxPrice !== undefined) {
                books = books.filter(book => 
                    book.price && parseFloat(book.price) <= parseFloat(filters.maxPrice)
                );
            }
            
            // Apply status filter
            if (filters.status) {
                books = books.filter(book => 
                    book.status && book.status === filters.status
                );
            } else {
                // Default: exclude deleted books
                books = books.filter(book => 
                    book.status !== BOOK_STATUS.DELETED
                );
            }
            
            // Apply search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                books = books.filter(book => 
                    (book.title && book.title.toLowerCase().includes(searchTerm)) ||
                    (book.author && book.author.toLowerCase().includes(searchTerm)) ||
                    (book.description && book.description.toLowerCase().includes(searchTerm)) ||
                    (book.summary && book.summary.toLowerCase().includes(searchTerm)) ||
                    (book.category && book.category.toLowerCase().includes(searchTerm)) ||
                    (book.tags && Array.isArray(book.tags) && 
                        book.tags.some(t => t.toLowerCase().includes(searchTerm))) ||
                    (book.genres && Array.isArray(book.genres) && 
                        book.genres.some(g => g.toLowerCase().includes(searchTerm)))
                );
            }
            
            // Apply featured filter
            if (filters.isFeatured !== undefined) {
                books = books.filter(book => 
                    book.is_featured === (filters.isFeatured === true || filters.isFeatured === 'true')
                );
            }
            
            // Apply bestseller filter
            if (filters.isBestseller !== undefined) {
                books = books.filter(book => 
                    book.is_bestseller === (filters.isBestseller === true || filters.isBestseller === 'true')
                );
            }
            
            // Apply new release filter
            if (filters.isNewRelease !== undefined) {
                books = books.filter(book => 
                    book.is_new_release === (filters.isNewRelease === true || filters.isNewRelease === 'true')
                );
            }
            
            // Apply date range filter
            if (filters.startDate) {
                books = books.filter(book => 
                    book.published && book.published >= filters.startDate
                );
            }
            
            if (filters.endDate) {
                books = books.filter(book => 
                    book.published && book.published <= filters.endDate
                );
            }
            
            // Apply sort
            if (filters.sortBy) {
                const sortField = filters.sortBy;
                const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
                
                // Only sort if field exists
                if (SORT.FIELDS.includes(sortField) || sortField === 'created_at') {
                    books.sort((a, b) => {
                        const aVal = a[sortField] || 0;
                        const bVal = b[sortField] || 0;
                        return (aVal > bVal ? 1 : -1) * sortOrder;
                    });
                }
            } else {
                // Default sort by rating desc
                books.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            }
            
            return books;
        } catch (error) {
            logger.error(`Error in findAll: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find book by ID
     * @param {number|string} id - Book ID
     * @returns {Object|null} Book object
     */
    async findById(id) {
        try {
            const book = this.booksData.getBookById(id);
            if (book && book.status === BOOK_STATUS.DELETED) {
                return null;
            }
            return book || null;
        } catch (error) {
            logger.error(`Error in findById: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find book by slug
     * @param {string} slug - Book slug
     * @returns {Object|null} Book object
     */
    async findBySlug(slug) {
        try {
            const allBooks = this.booksData.getAllBooks();
            const book = allBooks.find(b => 
                b.slug === slug || 
                (b.hindiSlug && b.hindiSlug === slug) ||
                (b.urduSlug && b.urduSlug === slug) ||
                (b.arabicSlug && b.arabicSlug === slug)
            );
            
            if (book && book.status === BOOK_STATUS.DELETED) {
                return null;
            }
            return book || null;
        } catch (error) {
            logger.error(`Error in findBySlug: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find books by language
     * @param {string} language - Language code
     * @returns {Array} List of books
     */
    async findByLanguage(language) {
        try {
            const langKey = normalizeLanguageCode(language);
            const books = this.booksData.getBooksByLanguage(langKey);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in findByLanguage: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find books by author
     * @param {string} author - Author name
     * @returns {Array} List of books
     */
    async findByAuthor(author) {
        try {
            const books = this.booksData.getBooksByAuthor(author);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in findByAuthor: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find books by category
     * @param {string} category - Category name
     * @returns {Array} List of books
     */
    async findByCategory(category) {
        try {
            const books = this.booksData.getBooksByCategory(category);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in findByCategory: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find books by genre
     * @param {string} genre - Genre name
     * @returns {Array} List of books
     */
    async findByGenre(genre) {
        try {
            const books = this.booksData.getBooksByGenre(genre);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in findByGenre: ${error.message}`);
            throw error;
        }
    }

    /**
     * Find books by tag
     * @param {string} tag - Tag name
     * @returns {Array} List of books
     */
    async findByTag(tag) {
        try {
            const books = this.booksData.getBooksByTag(tag);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in findByTag: ${error.message}`);
            throw error;
        }
    }

    /**
     * Search books
     * @param {string} query - Search query
     * @returns {Array} List of books
     */
    async search(query) {
        try {
            const books = this.booksData.searchBooks(query);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in search: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get featured books
     * @param {number} limit - Number of books
     * @returns {Array} List of featured books
     */
    async getFeatured(limit = 10) {
        try {
            const books = this.booksData.getFeaturedBooks(limit);
            return books.filter(book => book.status !== BOOK_STATUS.DELETED);
        } catch (error) {
            logger.error(`Error in getFeatured: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get books by publication
     * @param {number|string} publicationId - Publication ID
     * @returns {Array} List of books
     */
    async findByPublication(publicationId) {
        try {
            const allBooks = this.booksData.getAllBooks();
            return allBooks.filter(book => 
                book.publication_id === parseInt(publicationId) && 
                book.status !== BOOK_STATUS.DELETED
            );
        } catch (error) {
            logger.error(`Error in findByPublication: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get books by ISBN
     * @param {string} isbn - ISBN number
     * @returns {Object|null} Book object
     */
    async findByIsbn(isbn) {
        try {
            const allBooks = this.booksData.getAllBooks();
            const cleanIsbn = isbn.replace(/[-\s]/g, '');
            const book = allBooks.find(b => 
                (b.isbn && b.isbn.replace(/[-\s]/g, '') === cleanIsbn) ||
                (b.isbn13 && b.isbn13.replace(/[-\s]/g, '') === cleanIsbn)
            );
            
            if (book && book.status === BOOK_STATUS.DELETED) {
                return null;
            }
            return book || null;
        } catch (error) {
            logger.error(`Error in findByIsbn: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get random books
     * @param {number} limit - Number of books
     * @returns {Array} List of random books
     */
    async getRandom(limit = 10) {
        try {
            const allBooks = this.booksData.getAllBooks();
            const shuffled = allBooks
                .filter(book => book.status !== BOOK_STATUS.DELETED)
                .sort(() => Math.random() - 0.5);
            return shuffled.slice(0, limit);
        } catch (error) {
            logger.error(`Error in getRandom: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get trending books
     * @param {number} limit - Number of books
     * @returns {Array} List of trending books
     */
    async getTrending(limit = 10) {
        try {
            const allBooks = this.booksData.getAllBooks();
            // Sort by views, downloads, favorites combined score
            const scored = allBooks
                .filter(book => book.status !== BOOK_STATUS.DELETED)
                .map(book => ({
                    ...book,
                    score: (book.views || 0) + (book.downloads || 0) + (book.favorites || 0) + (book.rating || 0) * 10
                }))
                .sort((a, b) => b.score - a.score);
            return scored.slice(0, limit);
        } catch (error) {
            logger.error(`Error in getTrending: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get book statistics
     * @returns {Object} Statistics
     */
    async getStats() {
        try {
            const allBooks = this.booksData.getStats();
            return allBooks;
        } catch (error) {
            logger.error(`Error in getStats: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // CREATE OPERATIONS
    // ============================================

    /**
     * Create a new book
     * @param {Object} bookData - Book data
     * @returns {Object} Created book
     */
    async create(bookData) {
        try {
            const newBook = {
                id: Date.now(),
                ...bookData,
                status: bookData.status || BOOK_STATUS.PUBLISHED,
                rating: bookData.rating || DEFAULTS.RATING,
                views: 0,
                downloads: 0,
                favorites: 0,
                shares: 0,
                total_reviews: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            // In production, this would save to database
            // For now, just return the new book
            return newBook;
        } catch (error) {
            logger.error(`Error in create: ${error.message}`);
            throw error;
        }
    }

    /**
     * Create multiple books (bulk)
     * @param {Array} booksData - Array of book data
     * @returns {Array} Created books
     */
    async createBulk(booksData) {
        try {
            const newBooks = booksData.map((book, index) => ({
                id: Date.now() + index,
                ...book,
                status: book.status || BOOK_STATUS.PUBLISHED,
                rating: book.rating || DEFAULTS.RATING,
                views: 0,
                downloads: 0,
                favorites: 0,
                shares: 0,
                total_reviews: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }));
            
            return newBooks;
        } catch (error) {
            logger.error(`Error in createBulk: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // UPDATE OPERATIONS
    // ============================================

    /**
     * Update a book
     * @param {number|string} id - Book ID
     * @param {Object} updateData - Data to update
     * @returns {Object|null} Updated book
     */
    async update(id, updateData) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                ...updateData,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in update: ${error.message}`);
            throw error;
        }
    }

    /**
     * Update book rating
     * @param {number|string} id - Book ID
     * @param {number} rating - New rating
     * @param {number} totalReviews - Total reviews count
     * @returns {Object|null} Updated book
     */
    async updateRating(id, rating, totalReviews) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                rating: rating || 0,
                total_reviews: totalReviews || 0,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in updateRating: ${error.message}`);
            throw error;
        }
    }

    /**
     * Increment book views
     * @param {number|string} id - Book ID
     * @returns {Object|null} Updated book
     */
    async incrementViews(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                views: (book.views || 0) + 1,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in incrementViews: ${error.message}`);
            throw error;
        }
    }

    /**
     * Increment book downloads
     * @param {number|string} id - Book ID
     * @returns {Object|null} Updated book
     */
    async incrementDownloads(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                downloads: (book.downloads || 0) + 1,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in incrementDownloads: ${error.message}`);
            throw error;
        }
    }

    /**
     * Increment book favorites
     * @param {number|string} id - Book ID
     * @returns {Object|null} Updated book
     */
    async incrementFavorites(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                favorites: (book.favorites || 0) + 1,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in incrementFavorites: ${error.message}`);
            throw error;
        }
    }

    /**
     * Increment book shares
     * @param {number|string} id - Book ID
     * @returns {Object|null} Updated book
     */
    async incrementShares(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                shares: (book.shares || 0) + 1,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in incrementShares: ${error.message}`);
            throw error;
        }
    }

    /**
     * Toggle featured status
     * @param {number|string} id - Book ID
     * @param {boolean} isFeatured - Featured status
     * @returns {Object|null} Updated book
     */
    async toggleFeatured(id, isFeatured) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                is_featured: isFeatured !== undefined ? isFeatured : !book.is_featured,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in toggleFeatured: ${error.message}`);
            throw error;
        }
    }

    /**
     * Toggle bestseller status
     * @param {number|string} id - Book ID
     * @param {boolean} isBestseller - Bestseller status
     * @returns {Object|null} Updated book
     */
    async toggleBestseller(id, isBestseller) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                is_bestseller: isBestseller !== undefined ? isBestseller : !book.is_bestseller,
                updated_at: new Date().toISOString()
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in toggleBestseller: ${error.message}`);
            throw error;
        }
    }

    /**
     * Update book status
     * @param {number|string} id - Book ID
     * @param {string} status - New status
     * @returns {Object|null} Updated book
     */
    async updateStatus(id, status) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const updatedBook = {
                ...book,
                status: status,
                updated_at: new Date().toISOString(),
                ...(status === BOOK_STATUS.DELETED && { deleted_at: new Date().toISOString() })
            };
            
            return updatedBook;
        } catch (error) {
            logger.error(`Error in updateStatus: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // DELETE OPERATIONS
    // ============================================

    /**
     * Delete a book (soft delete)
     * @param {number|string} id - Book ID
     * @returns {boolean} Success status
     */
    async delete(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return false;
            }
            
            // In production, this would soft delete in database
            return true;
        } catch (error) {
            logger.error(`Error in delete: ${error.message}`);
            throw error;
        }
    }

    /**
     * Permanently delete a book
     * @param {number|string} id - Book ID
     * @returns {boolean} Success status
     */
    async hardDelete(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return false;
            }
            
            // In production, this would hard delete from database
            return true;
        } catch (error) {
            logger.error(`Error in hardDelete: ${error.message}`);
            throw error;
        }
    }

    /**
     * Restore a deleted book
     * @param {number|string} id - Book ID
     * @returns {Object|null} Restored book
     */
    async restore(id) {
        try {
            const book = await this.findById(id);
            if (!book) {
                return null;
            }
            
            const restoredBook = {
                ...book,
                status: BOOK_STATUS.PUBLISHED,
                deleted_at: null,
                updated_at: new Date().toISOString()
            };
            
            return restoredBook;
        } catch (error) {
            logger.error(`Error in restore: ${error.message}`);
            throw error;
        }
    }
}

export default new BooksRepository();