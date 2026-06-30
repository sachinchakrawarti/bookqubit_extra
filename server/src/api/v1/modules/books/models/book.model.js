// src/api/v1/modules/books/models/book.model.js

/**
 * Book Model
 * Represents a book entity
 */

import { generateSlug } from '../utils/helpers.js';
import { BOOK_STATUS } from '../config/constants.js';

class Book {
    constructor(data) {
        // Core identity
        this.id = data.id || null;
        this.title = data.title || '';
        this.slug = data.slug || generateSlug(data.title);
        this.subtitle = data.subtitle || '';
        
        // Authorship
        this.author = data.author || '';
        this.author_id = data.author_id || null;
        
        // Categorization
        this.category = data.category || '';
        this.category_id = data.category_id || null;
        this.language_code = data.language_code || 'english';
        this.original_language_code = data.original_language_code || '';
        
        // Description
        this.description = data.description || '';
        this.summary = data.summary || '';
        this.excerpt = data.excerpt || '';
        
        // Pricing
        this.price = data.price || 0;
        this.currency = data.currency || 'USD';
        
        // Publication
        this.publisher = data.publisher || '';
        this.publication_id = data.publication_id || null;
        this.published_date = data.published_date || null;
        this.edition = data.edition || '';
        this.format = data.format || '';
        this.page_count = data.page_count || 0;
        
        // Identifiers
        this.isbn = data.isbn || '';
        this.isbn13 = data.isbn13 || '';
        this.oclc = data.oclc || '';
        this.lccn = data.lccn || '';
        
        // Media
        this.image_url = data.image_url || '';
        this.cover_image = data.cover_image || '';
        this.images = data.images || [];
        
        // Content
        this.table_of_contents = data.table_of_contents || [];
        this.tags = data.tags || [];
        this.genres = data.genres || [];
        this.subjects = data.subjects || [];
        this.key_points = data.key_points || [];
        
        // Interactive
        this.buttons = data.buttons || {
            knowMore: '',
            getBook: '',
            readSummary: '',
            listenAudiobook: ''
        };
        
        // Geographic
        this.geography = data.geography || {
            country: '',
            continent: '',
            subRegion: ''
        };
        
        // Ratings & Reviews
        this.rating = data.rating || 0;
        this.total_reviews = data.total_reviews || 0;
        this.reviews = data.reviews || [];
        
        // Statistics
        this.views = data.views || 0;
        this.downloads = data.downloads || 0;
        this.favorites = data.favorites || 0;
        this.shares = data.shares || 0;
        
        // Status
        this.status = data.status || BOOK_STATUS.PUBLISHED;
        this.is_featured = data.is_featured || false;
        this.is_bestseller = data.is_bestseller || false;
        this.is_new_release = data.is_new_release || false;
        
        // Timestamps
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
        this.deleted_at = data.deleted_at || null;
    }

    // ============================================
    // BUSINESS LOGIC METHODS
    // ============================================

    /**
     * Check if book is published
     * @returns {boolean}
     */
    isPublished() {
        return this.status === BOOK_STATUS.PUBLISHED;
    }

    /**
     * Check if book is available
     * @returns {boolean}
     */
    isAvailable() {
        return this.status === BOOK_STATUS.PUBLISHED || this.status === BOOK_STATUS.DRAFT;
    }

    /**
     * Check if book is deleted
     * @returns {boolean}
     */
    isDeleted() {
        return this.status === BOOK_STATUS.DELETED;
    }

    /**
     * Check if book has ISBN
     * @returns {boolean}
     */
    hasISBN() {
        return !!(this.isbn || this.isbn13);
    }

    /**
     * Get formatted price
     * @returns {string}
     */
    getFormattedPrice() {
        return `${this.currency} ${this.price.toFixed(2)}`;
    }

    /**
     * Get rating percentage
     * @returns {number}
     */
    getRatingPercentage() {
        if (this.rating === 0) return 0;
        return (this.rating / 5) * 100;
    }

    /**
     * Get full title with subtitle
     * @returns {string}
     */
    getFullTitle() {
        return this.subtitle ? `${this.title}: ${this.subtitle}` : this.title;
    }

    /**
     * Get author full name
     * @returns {string}
     */
    getAuthorFullName() {
        return this.author;
    }

    /**
     * Get age of book in years
     * @returns {number}
     */
    getAgeInYears() {
        if (!this.published_date) return 0;
        const publishDate = new Date(this.published_date);
        const now = new Date();
        return now.getFullYear() - publishDate.getFullYear();
    }

    /**
     * Check if book is recent (within last 2 years)
     * @returns {boolean}
     */
    isRecent() {
        return this.getAgeInYears() <= 2;
    }

    /**
     * Get estimated reading time in minutes (200 words per minute)
     * @returns {number}
     */
    getReadingTime() {
        if (!this.page_count) return 0;
        return Math.ceil((this.page_count * 200) / 200);
    }

    /**
     * Get engagement score
     * @returns {number}
     */
    getEngagementScore() {
        return (this.views || 0) + (this.downloads || 0) + (this.favorites || 0) + (this.shares || 0) + (this.rating || 0) * 10;
    }

    /**
     * Add review
     * @param {Object} review - Review object
     */
    addReview(review) {
        if (!this.reviews) this.reviews = [];
        this.reviews.push(review);
        this.total_reviews = this.reviews.length;
        this.updateRating();
    }

    /**
     * Update rating based on reviews
     */
    updateRating() {
        if (!this.reviews || this.reviews.length === 0) {
            this.rating = 0;
            return;
        }
        const sum = this.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
    }

    /**
     * Increment views
     */
    incrementViews() {
        this.views += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Increment downloads
     */
    incrementDownloads() {
        this.downloads += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Increment favorites
     */
    incrementFavorites() {
        this.favorites += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Increment shares
     */
    incrementShares() {
        this.shares += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Toggle featured
     */
    toggleFeatured() {
        this.is_featured = !this.is_featured;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Toggle bestseller
     */
    toggleBestseller() {
        this.is_bestseller = !this.is_bestseller;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Soft delete
     */
    softDelete() {
        this.status = BOOK_STATUS.DELETED;
        this.deleted_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    /**
     * Restore from soft delete
     */
    restore() {
        this.status = BOOK_STATUS.PUBLISHED;
        this.deleted_at = null;
        this.updated_at = new Date().toISOString();
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    /**
     * Validate book data
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.title || this.title.trim().length === 0) {
            errors.push('Title is required');
        }

        if (!this.author || this.author.trim().length === 0) {
            errors.push('Author is required');
        }

        if (!this.language_code) {
            errors.push('Language is required');
        }

        if (this.price && (this.price < 0 || isNaN(this.price))) {
            errors.push('Price must be a positive number');
        }

        if (this.page_count && (this.page_count < 0 || isNaN(this.page_count))) {
            errors.push('Page count must be a positive integer');
        }

        if (this.rating && (this.rating < 0 || this.rating > 5)) {
            errors.push('Rating must be between 0 and 5');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate ISBN
     * @returns {boolean}
     */
    validateISBN() {
        if (!this.isbn && !this.isbn13) return true;
        
        const isbn10Regex = /^(?:\d{9}[\dXx])$/;
        const isbn13Regex = /^(?:\d{13})$/;
        
        if (this.isbn && !isbn10Regex.test(this.isbn.replace(/[-\s]/g, ''))) {
            return false;
        }
        
        if (this.isbn13 && !isbn13Regex.test(this.isbn13.replace(/[-\s]/g, ''))) {
            return false;
        }
        
        return true;
    }

    // ============================================
    // CONVERSION METHODS
    // ============================================

    /**
     * Convert to JSON
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            slug: this.slug,
            subtitle: this.subtitle,
            author: this.author,
            author_id: this.author_id,
            category: this.category,
            category_id: this.category_id,
            language_code: this.language_code,
            original_language_code: this.original_language_code,
            description: this.description,
            summary: this.summary,
            excerpt: this.excerpt,
            price: this.price,
            currency: this.currency,
            publisher: this.publisher,
            publication_id: this.publication_id,
            published_date: this.published_date,
            edition: this.edition,
            format: this.format,
            page_count: this.page_count,
            isbn: this.isbn,
            isbn13: this.isbn13,
            oclc: this.oclc,
            lccn: this.lccn,
            image_url: this.image_url,
            cover_image: this.cover_image,
            images: this.images,
            table_of_contents: this.table_of_contents,
            tags: this.tags,
            genres: this.genres,
            subjects: this.subjects,
            key_points: this.key_points,
            buttons: this.buttons,
            geography: this.geography,
            rating: this.rating,
            total_reviews: this.total_reviews,
            views: this.views,
            downloads: this.downloads,
            favorites: this.favorites,
            shares: this.shares,
            status: this.status,
            is_featured: this.is_featured,
            is_bestseller: this.is_bestseller,
            is_new_release: this.is_new_release,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at
        };
    }

    /**
     * Convert to summary
     * @returns {Object}
     */
    toSummary() {
        return {
            id: this.id,
            title: this.title,
            slug: this.slug,
            author: this.author,
            category: this.category,
            price: this.price,
            currency: this.currency,
            image_url: this.image_url,
            rating: this.rating,
            language_code: this.language_code,
            published_date: this.published_date,
            tags: this.tags.slice(0, 3),
            is_featured: this.is_featured,
            is_bestseller: this.is_bestseller
        };
    }

    /**
     * Convert to DTO
     * @returns {Object}
     */
    toDTO() {
        return this.toJSON();
    }

    /**
     * Create from database
     * @param {Object} data - Database data
     * @returns {Book}
     */
    static fromDatabase(data) {
        return new Book(data);
    }

    /**
     * Create from request
     * @param {Object} data - Request data
     * @returns {Book}
     */
    static fromRequest(data) {
        return new Book(data);
    }
}

export default Book;