// src/api/v1/modules/books/repository/analytics.repository.js

/**
 * Analytics Repository
 * Analytics-specific data access operations
 */

import * as bookData from '../data/index.js';
import { logger } from '../../../../../utils/logger.js';

class AnalyticsRepository {
    constructor() {
        this.booksData = bookData;
    }

    // ============================================
    // BOOK STATISTICS
    // ============================================

    /**
     * Get book statistics
     * @param {Object} filters - Filters for statistics
     * @returns {Object} Statistics
     */
    async getBookStats(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            // Apply filters
            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }
            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const totalBooks = books.length;
            const totalReviews = books.reduce((sum, b) => sum + (b.total_reviews || 0), 0);
            const totalViews = books.reduce((sum, b) => sum + (b.views || 0), 0);
            const totalDownloads = books.reduce((sum, b) => sum + (b.downloads || 0), 0);
            const totalFavorites = books.reduce((sum, b) => sum + (b.favorites || 0), 0);
            const totalShares = books.reduce((sum, b) => sum + (b.shares || 0), 0);
            
            const avgRating = totalBooks > 0 
                ? books.reduce((sum, b) => sum + (b.rating || 0), 0) / totalBooks 
                : 0;

            const languages = [...new Set(books.map(b => b.language))];
            const categories = [...new Set(books.map(b => b.category).filter(Boolean))];
            const authors = [...new Set(books.map(b => b.author).filter(Boolean))];

            return {
                totalBooks,
                totalReviews,
                totalViews,
                totalDownloads,
                totalFavorites,
                totalShares,
                averageRating: Math.round(avgRating * 10) / 10,
                languages,
                categories,
                authors,
                languageCount: languages.length,
                categoryCount: categories.length,
                authorCount: authors.length
            };
        } catch (error) {
            logger.error(`Error in getBookStats: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get top rated books
     * @param {number} limit - Number of books
     * @param {Object} filters - Additional filters
     * @returns {Array} Top rated books
     */
    async getTopRated(limit = 10, filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }

            return books
                .filter(b => b.rating && b.rating > 0)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, limit);
        } catch (error) {
            logger.error(`Error in getTopRated: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get most viewed books
     * @param {number} limit - Number of books
     * @param {Object} filters - Additional filters
     * @returns {Array} Most viewed books
     */
    async getMostViewed(limit = 10, filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }

            return books
                .filter(b => b.views && b.views > 0)
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, limit);
        } catch (error) {
            logger.error(`Error in getMostViewed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get most downloaded books
     * @param {number} limit - Number of books
     * @param {Object} filters - Additional filters
     * @returns {Array} Most downloaded books
     */
    async getMostDownloaded(limit = 10, filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }

            return books
                .filter(b => b.downloads && b.downloads > 0)
                .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
                .slice(0, limit);
        } catch (error) {
            logger.error(`Error in getMostDownloaded: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get trending books
     * @param {number} limit - Number of books
     * @param {Object} filters - Additional filters
     * @returns {Array} Trending books
     */
    async getTrending(limit = 10, filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }

            return books
                .filter(b => b.status === 'published')
                .map(b => ({
                    ...b,
                    score: (b.views || 0) + (b.downloads || 0) + (b.favorites || 0) + (b.rating || 0) * 10
                }))
                .sort((a, b) => b.score - a.score)
                .slice(0, limit);
        } catch (error) {
            logger.error(`Error in getTrending: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // LANGUAGE STATISTICS
    // ============================================

    /**
     * Get language distribution
     * @param {Object} filters - Additional filters
     * @returns {Object} Language distribution
     */
    async getLanguageDistribution(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const distribution = {};
            books.forEach(book => {
                const lang = book.language || 'unknown';
                distribution[lang] = (distribution[lang] || 0) + 1;
            });

            return distribution;
        } catch (error) {
            logger.error(`Error in getLanguageDistribution: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get category distribution
     * @param {Object} filters - Additional filters
     * @returns {Object} Category distribution
     */
    async getCategoryDistribution(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const distribution = {};
            books.forEach(book => {
                const category = book.category || 'uncategorized';
                distribution[category] = (distribution[category] || 0) + 1;
            });

            return distribution;
        } catch (error) {
            logger.error(`Error in getCategoryDistribution: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get rating distribution
     * @param {Object} filters - Additional filters
     * @returns {Object} Rating distribution
     */
    async getRatingDistribution(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const distribution = {};
            books.forEach(book => {
                const rating = Math.round(book.rating || 0);
                distribution[rating] = (distribution[rating] || 0) + 1;
            });

            return distribution;
        } catch (error) {
            logger.error(`Error in getRatingDistribution: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // AUTHOR STATISTICS
    // ============================================

    /**
     * Get author statistics
     * @param {Object} filters - Additional filters
     * @returns {Object} Author statistics
     */
    async getAuthorStats(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const authorStats = {};
            books.forEach(book => {
                const author = book.author || 'unknown';
                if (!authorStats[author]) {
                    authorStats[author] = {
                        name: author,
                        totalBooks: 0,
                        totalReviews: 0,
                        totalViews: 0,
                        totalDownloads: 0,
                        totalFavorites: 0,
                        totalShares: 0,
                        averageRating: 0,
                        books: []
                    };
                }
                authorStats[author].totalBooks++;
                authorStats[author].totalReviews += book.total_reviews || 0;
                authorStats[author].totalViews += book.views || 0;
                authorStats[author].totalDownloads += book.downloads || 0;
                authorStats[author].totalFavorites += book.favorites || 0;
                authorStats[author].totalShares += book.shares || 0;
                authorStats[author].averageRating = (authorStats[author].averageRating + (book.rating || 0)) / authorStats[author].totalBooks;
                authorStats[author].books.push(book.title);
            });

            return Object.values(authorStats)
                .sort((a, b) => b.totalBooks - a.totalBooks);
        } catch (error) {
            logger.error(`Error in getAuthorStats: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get top authors by book count
     * @param {number} limit - Number of authors
     * @param {Object} filters - Additional filters
     * @returns {Array} Top authors
     */
    async getTopAuthors(limit = 10, filters = {}) {
        try {
            const stats = await this.getAuthorStats(filters);
            return stats.slice(0, limit);
        } catch (error) {
            logger.error(`Error in getTopAuthors: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // TIME-BASED STATISTICS
    // ============================================

    /**
     * Get books by date range
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @param {Object} filters - Additional filters
     * @returns {Array} Books in date range
     */
    async getBooksByDateRange(startDate, endDate, filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }
            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }

            return books.filter(book => {
                const publishDate = book.published || book.published_date;
                if (!publishDate) return false;
                return publishDate >= startDate && publishDate <= endDate;
            });
        } catch (error) {
            logger.error(`Error in getBooksByDateRange: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get new releases
     * @param {number} days - Number of days to look back
     * @param {Object} filters - Additional filters
     * @returns {Array} New releases
     */
    async getNewReleases(days = 30, filters = {}) {
        try {
            const date = new Date();
            date.setDate(date.getDate() - days);
            const startDate = date.toISOString().split('T')[0];
            const endDate = new Date().toISOString().split('T')[0];

            return await this.getBooksByDateRange(startDate, endDate, {
                ...filters,
                status: 'published'
            });
        } catch (error) {
            logger.error(`Error in getNewReleases: ${error.message}`);
            throw error;
        }
    }

    // ============================================
    // ENGAGEMENT STATISTICS
    // ============================================

    /**
     * Get engagement metrics
     * @param {Object} filters - Additional filters
     * @returns {Object} Engagement metrics
     */
    async getEngagementMetrics(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.language) {
                books = books.filter(b => b.language === filters.language);
            }
            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const totalBooks = books.length;
            const withReviews = books.filter(b => b.total_reviews && b.total_reviews > 0).length;
            const withRating = books.filter(b => b.rating && b.rating > 0).length;
            
            const totalEngagement = books.reduce((sum, b) => {
                return sum + (b.views || 0) + (b.downloads || 0) + (b.favorites || 0) + (b.shares || 0);
            }, 0);

            return {
                totalBooks,
                withReviews,
                withRating,
                reviewPercentage: totalBooks > 0 ? Math.round((withReviews / totalBooks) * 100) : 0,
                ratingPercentage: totalBooks > 0 ? Math.round((withRating / totalBooks) * 100) : 0,
                totalEngagement,
                averageEngagement: totalBooks > 0 ? Math.round(totalEngagement / totalBooks) : 0,
                averageViews: totalBooks > 0 ? Math.round(books.reduce((s, b) => s + (b.views || 0), 0) / totalBooks) : 0,
                averageDownloads: totalBooks > 0 ? Math.round(books.reduce((s, b) => s + (b.downloads || 0), 0) / totalBooks) : 0,
                averageFavorites: totalBooks > 0 ? Math.round(books.reduce((s, b) => s + (b.favorites || 0), 0) / totalBooks) : 0
            };
        } catch (error) {
            logger.error(`Error in getEngagementMetrics: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get engagement by language
     * @param {Object} filters - Additional filters
     * @returns {Object} Engagement by language
     */
    async getEngagementByLanguage(filters = {}) {
        try {
            const allBooks = this.booksData.getAllBooks();
            let books = allBooks;

            if (filters.status) {
                books = books.filter(b => b.status === filters.status);
            }

            const languages = [...new Set(books.map(b => b.language).filter(Boolean))];
            const result = {};

            languages.forEach(lang => {
                const langBooks = books.filter(b => b.language === lang);
                const total = langBooks.length;
                
                result[lang] = {
                    totalBooks: total,
                    averageRating: total > 0 ? Math.round((langBooks.reduce((s, b) => s + (b.rating || 0), 0) / total) * 10) / 10 : 0,
                    totalViews: langBooks.reduce((s, b) => s + (b.views || 0), 0),
                    totalDownloads: langBooks.reduce((s, b) => s + (b.downloads || 0), 0),
                    totalFavorites: langBooks.reduce((s, b) => s + (b.favorites || 0), 0),
                    totalReviews: langBooks.reduce((s, b) => s + (b.total_reviews || 0), 0)
                };
            });

            return result;
        } catch (error) {
            logger.error(`Error in getEngagementByLanguage: ${error.message}`);
            throw error;
        }
    }
}

export default new AnalyticsRepository();