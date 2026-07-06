// src/api/v1/modules/author/models/author_translation.model.js

/**
 * Author Translation Model
 * Represents author names and bios in different languages
 */

export class AuthorTranslation {
    constructor(data = {}) {
        this.id = data.id || null;
        this.author_id = data.author_id || null;
        this.language_code = data.language_code || '';
        this.name = data.name || '';
        this.bio = data.bio || '';
        this.nationality = data.nationality || '';
        this.is_primary = data.is_primary || false;
        this.is_auto_translated = data.is_auto_translated || false;
        this.translation_source = data.translation_source || 'manual';
        this.translation_quality = data.translation_quality || 0;
        this.reviewed_by = data.reviewed_by || null;
        this.reviewed_at = data.reviewed_at || null;
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
    }

    /**
     * Validate translation data
     */
    validate() {
        const errors = [];

        if (!this.author_id) {
            errors.push('Author ID is required');
        }

        if (!this.language_code) {
            errors.push('Language code is required');
        }

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Translated name is required');
        }

        if (this.translation_quality && (this.translation_quality < 0 || this.translation_quality > 10)) {
            errors.push('Translation quality must be between 0 and 10');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Check if translation is primary
     */
    isPrimary() {
        return this.is_primary;
    }

    /**
     * Check if translation is auto-translated
     */
    isAutoTranslated() {
        return this.is_auto_translated;
    }

    /**
     * Get translation quality label
     */
    getQualityLabel() {
        if (this.translation_quality >= 8) return 'Excellent';
        if (this.translation_quality >= 6) return 'Good';
        if (this.translation_quality >= 4) return 'Average';
        return 'Poor';
    }

    /**
     * Mark as reviewed
     */
    markReviewed(userId) {
        this.reviewed_by = userId;
        this.reviewed_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
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
     * Convert to JSON
     */
    toJSON() {
        return {
            id: this.id,
            author_id: this.author_id,
            language_code: this.language_code,
            name: this.name,
            bio: this.bio,
            nationality: this.nationality,
            is_primary: this.is_primary,
            is_auto_translated: this.is_auto_translated,
            translation_source: this.translation_source,
            translation_quality: this.translation_quality,
            reviewed_by: this.reviewed_by,
            reviewed_at: this.reviewed_at,
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
            name: this.name,
            is_primary: this.is_primary
        };
    }

    /**
     * Create from database
     */
    static fromDatabase(data) {
        return new AuthorTranslation(data);
    }

    /**
     * Create from request
     */
    static fromRequest(data) {
        return new AuthorTranslation(data);
    }
}

export default AuthorTranslation;