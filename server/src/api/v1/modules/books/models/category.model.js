// src/api/v1/modules/books/models/category.model.js

/**
 * Category Model
 * Represents a book category
 */

import { generateSlug } from '../utils/helpers.js';

class Category {
    constructor(data) {
        // Core identity
        this.id = data.id || null;
        this.name = data.name || '';
        this.slug = data.slug || generateSlug(data.name);
        
        // Description
        this.description = data.description || '';
        
        // Visual
        this.icon = data.icon || '';
        this.color = data.color || '#000000';
        this.image_url = data.image_url || '';
        
        // Hierarchy
        this.parent_id = data.parent_id || null;
        this.parent_name = data.parent_name || '';
        
        // Language
        this.language_code = data.language_code || 'english';
        
        // Statistics
        this.total_books = data.total_books || 0;
        this.total_subcategories = data.total_subcategories || 0;
        
        // Status
        this.is_active = data.is_active !== undefined ? data.is_active : true;
        this.is_featured = data.is_featured || false;
        
        // Order
        this.display_order = data.display_order || 0;
        
        // Timestamps
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
        this.deleted_at = data.deleted_at || null;
    }

    // ============================================
    // BUSINESS LOGIC METHODS
    // ============================================

    /**
     * Check if category is active
     * @returns {boolean}
     */
    isActive() {
        return this.is_active;
    }

    /**
     * Check if category has parent
     * @returns {boolean}
     */
    hasParent() {
        return !!this.parent_id;
    }

    /**
     * Check if category is featured
     * @returns {boolean}
     */
    isFeatured() {
        return this.is_featured;
    }

    /**
     * Check if category has books
     * @returns {boolean}
     */
    hasBooks() {
        return this.total_books > 0;
    }

    /**
     * Check if category has subcategories
     * @returns {boolean}
     */
    hasSubcategories() {
        return this.total_subcategories > 0;
    }

    /**
     * Get full path (parent > child)
     * @param {Array} categories - All categories for lookup
     * @returns {string}
     */
    getFullPath(categories = []) {
        if (!this.parent_id) return this.name;
        
        const parent = categories.find(c => c.id === this.parent_id);
        if (parent) {
            return `${parent.getFullPath(categories)} > ${this.name}`;
        }
        return this.name;
    }

    /**
     * Get level in hierarchy
     * @param {Array} categories - All categories for lookup
     * @returns {number}
     */
    getLevel(categories = []) {
        if (!this.parent_id) return 0;
        
        const parent = categories.find(c => c.id === this.parent_id);
        if (parent) {
            return 1 + parent.getLevel(categories);
        }
        return 0;
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    /**
     * Validate category data
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Category name is required');
        }

        if (this.name && this.name.length > 100) {
            errors.push('Category name must be less than 100 characters');
        }

        if (this.description && this.description.length > 500) {
            errors.push('Description must be less than 500 characters');
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
            description: this.description,
            icon: this.icon,
            color: this.color,
            image_url: this.image_url,
            parent_id: this.parent_id,
            parent_name: this.parent_name,
            language_code: this.language_code,
            total_books: this.total_books,
            total_subcategories: this.total_subcategories,
            is_active: this.is_active,
            is_featured: this.is_featured,
            display_order: this.display_order,
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
            icon: this.icon,
            color: this.color,
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
     * @returns {Category}
     */
    static fromDatabase(data) {
        return new Category(data);
    }

    /**
     * Create from request
     * @param {Object} data - Request data
     * @returns {Category}
     */
    static fromRequest(data) {
        return new Category(data);
    }
}

export default Category;