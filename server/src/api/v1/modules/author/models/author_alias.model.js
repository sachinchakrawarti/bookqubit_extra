// src/api/v1/modules/author/models/author_alias.model.js

/**
 * Author Alias Model
 * Represents alternative names, pen names, and variations
 */

export class AuthorAlias {
    constructor(data = {}) {
        this.id = data.id || null;
        this.author_id = data.author_id || null;
        this.alias_name = data.alias_name || '';
        this.alias_type = data.alias_type || 'pen_name'; // pen_name, birth_name, nickname, other
        this.language_code = data.language_code || null;
        this.is_primary = data.is_primary || false;
        this.is_active = data.is_active !== undefined ? data.is_active : true;
        this.notes = data.notes || '';
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
    }

    /**
     * Validate alias data
     */
    validate() {
        const errors = [];

        if (!this.author_id) {
            errors.push('Author ID is required');
        }

        if (!this.alias_name || this.alias_name.trim().length === 0) {
            errors.push('Alias name is required');
        }

        if (this.alias_type && !['pen_name', 'birth_name', 'nickname', 'other'].includes(this.alias_type)) {
            errors.push('Invalid alias type');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Check if alias is primary
     */
    isPrimary() {
        return this.is_primary;
    }

    /**
     * Check if alias is active
     */
    isActive() {
        return this.is_active;
    }

    /**
     * Get alias type label
     */
    getTypeLabel() {
        const labels = {
            pen_name: 'Pen Name',
            birth_name: 'Birth Name',
            nickname: 'Nickname',
            other: 'Other'
        };
        return labels[this.alias_type] || this.alias_type;
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
     * Activate alias
     */
    activate() {
        this.is_active = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Deactivate alias
     */
    deactivate() {
        this.is_active = false;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Convert to JSON
     */
    toJSON() {
        return {
            id: this.id,
            author_id: this.author_id,
            alias_name: this.alias_name,
            alias_type: this.alias_type,
            language_code: this.language_code,
            is_primary: this.is_primary,
            is_active: this.is_active,
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
            alias_name: this.alias_name,
            alias_type: this.alias_type,
            language_code: this.language_code,
            is_primary: this.is_primary
        };
    }

    /**
     * Create from database
     */
    static fromDatabase(data) {
        return new AuthorAlias(data);
    }

    /**
     * Create from request
     */
    static fromRequest(data) {
        return new AuthorAlias(data);
    }
}

export default AuthorAlias;