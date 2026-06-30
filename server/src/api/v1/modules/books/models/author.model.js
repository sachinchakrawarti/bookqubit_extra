// src/api/v1/modules/books/models/author.model.js

/**
 * Author Model
 * Represents an author entity
 */

import { generateSlug } from '../utils/helpers.js';

class Author {
    constructor(data) {
        // Core identity
        this.id = data.id || null;
        this.name = data.name || '';
        this.slug = data.slug || generateSlug(data.name);
        
        // Personal information
        this.bio = data.bio || '';
        this.birth_date = data.birth_date || null;
        this.death_date = data.death_date || null;
        this.nationality = data.nationality || '';
        this.gender = data.gender || '';
        
        // Language
        this.language_code = data.language_code || 'english';
        
        // Media
        this.image_url = data.image_url || '';
        this.cover_image = data.cover_image || '';
        
        // Online presence
        this.website = data.website || '';
        this.wikipedia_url = data.wikipedia_url || '';
        this.social_links = data.social_links || {
            twitter: '',
            instagram: '',
            facebook: '',
            linkedin: '',
            youtube: ''
        };
        
        // Statistics
        this.total_books = data.total_books || 0;
        this.total_sales = data.total_sales || 0;
        this.total_reviews = data.total_reviews || 0;
        this.rating = data.rating || 0;
        this.views = data.views || 0;
        this.followers = data.followers || 0;
        
        // Status
        this.is_active = data.is_active !== undefined ? data.is_active : true;
        this.is_featured = data.is_featured || false;
        
        // Timestamps
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
        this.deleted_at = data.deleted_at || null;
    }

    // ============================================
    // BUSINESS LOGIC METHODS
    // ============================================

    /**
     * Check if author is alive
     * @returns {boolean}
     */
    isAlive() {
        return !this.death_date;
    }

    /**
     * Get author age
     * @returns {number|null}
     */
    getAge() {
        if (!this.birth_date) return null;
        const birth = new Date(this.birth_date);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    /**
     * Get full name
     * @returns {string}
     */
    getFullName() {
        return this.name;
    }

    /**
     * Get display name
     * @returns {string}
     */
    getDisplayName() {
        return this.name;
    }

    /**
     * Check if author has books
     * @returns {boolean}
     */
    hasBooks() {
        return this.total_books > 0;
    }

    /**
     * Get formatted rating
     * @returns {string}
     */
    getFormattedRating() {
        return this.rating ? this.rating.toFixed(1) : '0.0';
    }

    /**
     * Get author initials
     * @returns {string}
     */
    getInitials() {
        return this.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    /**
     * Check if author is featured
     * @returns {boolean}
     */
    isFeatured() {
        return this.is_featured;
    }

    /**
     * Get reading time for author's works (estimated)
     * @param {number} avgPagesPerBook - Average pages per book
     * @returns {number}
     */
    getEstimatedReadingTime(avgPagesPerBook = 200) {
        return this.total_books * avgPagesPerBook;
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    /**
     * Validate author data
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Name is required');
        }

        if (this.name && this.name.length > 200) {
            errors.push('Name must be less than 200 characters');
        }

        if (this.bio && this.bio.length > 5000) {
            errors.push('Bio must be less than 5000 characters');
        }

        if (this.birth_date && this.death_date) {
            const birth = new Date(this.birth_date);
            const death = new Date(this.death_date);
            if (death < birth) {
                errors.push('Death date cannot be before birth date');
            }
        }

        if (this.rating && (this.rating < 0 || this.rating > 5)) {
            errors.push('Rating must be between 0 and 5');
        }

        return {
            valid: errors.length === 0,
            errors
        };
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
            name: this.name,
            slug: this.slug,
            bio: this.bio,
            birth_date: this.birth_date,
            death_date: this.death_date,
            nationality: this.nationality,
            gender: this.gender,
            language_code: this.language_code,
            image_url: this.image_url,
            cover_image: this.cover_image,
            website: this.website,
            wikipedia_url: this.wikipedia_url,
            social_links: this.social_links,
            total_books: this.total_books,
            total_sales: this.total_sales,
            total_reviews: this.total_reviews,
            rating: this.rating,
            views: this.views,
            followers: this.followers,
            is_active: this.is_active,
            is_featured: this.is_featured,
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
            name: this.name,
            slug: this.slug,
            nationality: this.nationality,
            image_url: this.image_url,
            rating: this.rating,
            total_books: this.total_books,
            is_featured: this.is_featured
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
     * @returns {Author}
     */
    static fromDatabase(data) {
        return new Author(data);
    }

    /**
     * Create from request
     * @param {Object} data - Request data
     * @returns {Author}
     */
    static fromRequest(data) {
        return new Author(data);
    }
}

export default Author;