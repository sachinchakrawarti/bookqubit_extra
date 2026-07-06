// src/api/v1/modules/author/models/author_language.model.js

/**
 * Author Language Model
 * Represents languages spoken/written by author
 */

export class AuthorLanguage {
    constructor(data = {}) {
        this.id = data.id || null;
        this.author_id = data.author_id || null;
        this.language_code = data.language_code || '';
        this.language_type = data.language_type || 'native'; // native, fluent, conversational, basic, writing
        this.proficiency_level = data.proficiency_level || 0; // 0-10 scale
        this.is_primary = data.is_primary || false;
        this.is_verified = data.is_verified || false;
        this.notes = data.notes || '';
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
    }

    /**
     * Validate language data
     */
    validate() {
        const errors = [];

        if (!this.author_id) {
            errors.push('Author ID is required');
        }

        if (!this.language_code) {
            errors.push('Language code is required');
        }

        if (this.proficiency_level && (this.proficiency_level < 0 || this.proficiency_level > 10)) {
            errors.push('Proficiency level must be between 0 and 10');
        }

        if (this.language_type && !['native', 'fluent', 'conversational', 'basic', 'writing'].includes(this.language_type)) {
            errors.push('Invalid language type');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Get proficiency label
     */
    getProficiencyLabel() {
        if (this.proficiency_level >= 9) return 'Native/Expert';
        if (this.proficiency_level >= 7) return 'Fluent';
        if (this.proficiency_level >= 5) return 'Conversational';
        if (this.proficiency_level >= 3) return 'Basic';
        return 'Beginner';
    }

    /**
     * Get language type label
     */
    getTypeLabel() {
        const labels = {
            native: 'Native',
            fluent: 'Fluent',
            conversational: 'Conversational',
            basic: 'Basic',
            writing: 'Writing'
        };
        return labels[this.language_type] || this.language_type;
    }

    /**
     * Check if language is primary
     */
    isPrimary() {
        return this.is_primary;
    }

    /**
     * Check if language is verified
     */
    isVerified() {
        return this.is_verified;
    }

    /**
     * Set as primary
     */
    setPrimary() {
        this.is_primary = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Unset as primary
     */
    unsetPrimary() {
        this.is_primary = false;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Verify language
     */
    verify() {
        this.is_verified = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Update proficiency
     */
    updateProficiency(level) {
        if (level >= 0 && level <= 10) {
            this.proficiency_level = level;
            this.updated_at = new Date().toISOString();
        }
    }

    /**
     * Convert to JSON
     */
    toJSON() {
        return {
            id: this.id,
            author_id: this.author_id,
            language_code: this.language_code,
            language_type: this.language_type,
            proficiency_level: this.proficiency_level,
            proficiency_label: this.getProficiencyLabel(),
            is_primary: this.is_primary,
            is_verified: this.is_verified,
            notes: this.notes,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    /**
     * Convert to compact
     */
    toCompact() {
        return {
            language_code: this.language_code,
            language_type: this.language_type,
            proficiency_level: this.proficiency_level,
            is_primary: this.is_primary
        };
    }

    /**
     * Create from database
     */
    static fromDatabase(data) {
        return new AuthorLanguage(data);
    }

    /**
     * Create from request
     */
    static fromRequest(data) {
        return new AuthorLanguage(data);
    }
}

export default AuthorLanguage;