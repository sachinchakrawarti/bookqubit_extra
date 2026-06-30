// src/api/v1/modules/books/models/language.model.js

/**
 * Language Model
 * Represents a language entity
 */

class Language {
    constructor(data) {
        // Core identity
        this.id = data.id || null;
        this.code = data.code || '';
        this.name = data.name || '';
        this.native_name = data.native_name || '';
        
        // Visual
        this.flag_emoji = data.flag_emoji || '';
        this.flag_url = data.flag_url || '';
        
        // Properties
        this.direction = data.direction || 'ltr'; // ltr, rtl
        this.script = data.script || '';
        this.region = data.region || '';
        
        // Statistics
        this.total_books = data.total_books || 0;
        this.total_authors = data.total_authors || 0;
        this.total_categories = data.total_categories || 0;
        
        // Status
        this.is_active = data.is_active !== undefined ? data.is_active : true;
        this.is_primary = data.is_primary || false;
        
        // Timestamps
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
    }

    // ============================================
    // BUSINESS LOGIC METHODS
    // ============================================

    /**
     * Check if language is active
     * @returns {boolean}
     */
    isActive() {
        return this.is_active;
    }

    /**
     * Check if language is primary
     * @returns {boolean}
     */
    isPrimary() {
        return this.is_primary;
    }

    /**
     * Check if RTL language
     * @returns {boolean}
     */
    isRTL() {
        return this.direction === 'rtl';
    }

    /**
     * Check if LTR language
     * @returns {boolean}
     */
    isLTR() {
        return this.direction === 'ltr';
    }

    /**
     * Get display name
     * @param {boolean} showNative - Show native name
     * @returns {string}
     */
    getDisplayName(showNative = true) {
        return showNative ? `${this.name} (${this.native_name})` : this.name;
    }

    /**
     * Get full display name with flag
     * @returns {string}
     */
    getFullDisplayName() {
        return `${this.flag_emoji} ${this.name} (${this.native_name})`;
    }

    /**
     * Check if language has books
     * @returns {boolean}
     */
    hasBooks() {
        return this.total_books > 0;
    }

    /**
     * Check if language has authors
     * @returns {boolean}
     */
    hasAuthors() {
        return this.total_authors > 0;
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    /**
     * Validate language data
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.code || this.code.trim().length === 0) {
            errors.push('Language code is required');
        }

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Language name is required');
        }

        if (this.code && this.code.length > 20) {
            errors.push('Language code must be less than 20 characters');
        }

        if (this.name && this.name.length > 100) {
            errors.push('Language name must be less than 100 characters');
        }

        if (this.direction && !['ltr', 'rtl'].includes(this.direction)) {
            errors.push('Direction must be either "ltr" or "rtl"');
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
            code: this.code,
            name: this.name,
            native_name: this.native_name,
            flag_emoji: this.flag_emoji,
            flag_url: this.flag_url,
            direction: this.direction,
            script: this.script,
            region: this.region,
            total_books: this.total_books,
            total_authors: this.total_authors,
            total_categories: this.total_categories,
            is_active: this.is_active,
            is_primary: this.is_primary,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    /**
     * Convert to summary
     * @returns {Object}
     */
    toSummary() {
        return {
            code: this.code,
            name: this.name,
            native_name: this.native_name,
            flag_emoji: this.flag_emoji,
            direction: this.direction,
            total_books: this.total_books
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
     * @returns {Language}
     */
    static fromDatabase(data) {
        return new Language(data);
    }

    /**
     * Create from request
     * @param {Object} data - Request data
     * @returns {Language}
     */
    static fromRequest(data) {
        return new Language(data);
    }
}

export default Language;