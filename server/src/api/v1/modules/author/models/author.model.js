// src/api/v1/modules/author/models/author.model.js

/**
 * Author Model
 * Represents the main author entity
 */

import { generateSlug } from '../utils/slug.js';
import { AUTHOR_STATUS } from '../config/constants.js';

export class Author {
    constructor(data = {}) {
        // Core Identity
        this.id = data.id || null;
        this.uuid = data.uuid || this._generateUUID();
        this.name = data.name || '';
        this.slug = data.slug || generateSlug(data.name);
        
        // Personal Information
        this.bio = data.bio || '';
        this.birth_date = data.birth_date || null;
        this.death_date = data.death_date || null;
        this.nationality = data.nationality || '';
        this.gender = data.gender || '';
        
        // Language
        this.language_code = data.language_code || 'english';
        this.original_language_code = data.original_language_code || '';
        
        // Media
        this.image_url = data.image_url || '';
        this.cover_image = data.cover_image || '';
        this.images = data.images || [];
        
        // Online Presence
        this.website = data.website || '';
        this.wikipedia_url = data.wikipedia_url || '';
        this.social_links = data.social_links || {
            twitter: '',
            instagram: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            goodreads: ''
        };
        
        // Statistics
        this.total_books = data.total_books || 0;
        this.total_sales = data.total_sales || 0;
        this.total_reviews = data.total_reviews || 0;
        this.rating = data.rating || 0;
        this.views = data.views || 0;
        this.followers = data.followers || 0;
        this.favorites = data.favorites || 0;
        this.shares = data.shares || 0;
        
        // Awards & Recognition
        this.awards = data.awards || [];
        this.achievements = data.achievements || [];
        this.genres = data.genres || [];
        this.tags = data.tags || [];
        
        // Status
        this.status = data.status || AUTHOR_STATUS.ACTIVE;
        this.is_active = data.is_active !== undefined ? data.is_active : true;
        this.is_featured = data.is_featured || false;
        this.is_verified = data.is_verified || false;
        this.is_popular = data.is_popular || false;
        
        // Metadata
        this.metadata = data.metadata || {};
        this.notes = data.notes || '';
        
        // Timestamps
        this.created_at = data.created_at || new Date().toISOString();
        this.updated_at = data.updated_at || new Date().toISOString();
        this.deleted_at = data.deleted_at || null;
        
        // Relations (populated separately)
        this.translations = data.translations || [];
        this.aliases = data.aliases || [];
        this.languages = data.languages || [];
        this.publications = data.publications || [];
        this.books = data.books || [];
    }

    // ============================================
    // PRIVATE METHODS
    // ============================================

    _generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // ============================================
    // BUSINESS LOGIC METHODS
    // ============================================

    /**
     * Check if author is alive
     */
    isAlive() {
        return !this.death_date;
    }

    /**
     * Get author's age
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
     * Get author's full name
     */
    getFullName() {
        return this.name;
    }

    /**
     * Get author's display name
     */
    getDisplayName() {
        return this.name;
    }

    /**
     * Get author's initials
     */
    getInitials() {
        return this.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    /**
     * Check if author is featured
     */
    isFeatured() {
        return this.is_featured;
    }

    /**
     * Check if author is verified
     */
    isVerified() {
        return this.is_verified;
    }

    /**
     * Check if author has books
     */
    hasBooks() {
        return this.total_books > 0;
    }

    /**
     * Check if author is popular (based on followers or rating)
     */
    isPopular() {
        return this.is_popular || this.followers > 1000 || this.rating > 4.5;
    }

    /**
     * Get formatted rating
     */
    getFormattedRating() {
        return this.rating ? this.rating.toFixed(1) : '0.0';
    }

    /**
     * Get rating stars
     */
    getRatingStars() {
        const fullStars = Math.floor(this.rating);
        const halfStar = this.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '⭐'.repeat(fullStars) + (halfStar ? '✨' : '') + '☆'.repeat(emptyStars);
    }

    /**
     * Get engagement score
     */
    getEngagementScore() {
        return (this.views || 0) + 
               (this.followers || 0) * 2 + 
               (this.total_sales || 0) * 0.5 + 
               (this.rating || 0) * 10;
    }

    /**
     * Get author's main social links
     */
    getSocialLinks() {
        return Object.entries(this.social_links)
            .filter(([_, url]) => url && url.length > 0)
            .reduce((acc, [key, url]) => ({ ...acc, [key]: url }), {});
    }

    /**
     * Check if author has social media presence
     */
    hasSocialPresence() {
        return Object.values(this.social_links).some(url => url && url.length > 0);
    }

    /**
     * Get author's award count
     */
    getAwardCount() {
        return this.awards ? this.awards.length : 0;
    }

    // ============================================
    // STATISTICS METHODS
    // ============================================

    /**
     * Increment views
     */
    incrementViews() {
        this.views += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Increment followers
     */
    incrementFollowers() {
        this.followers += 1;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Decrement followers
     */
    decrementFollowers() {
        this.followers = Math.max(0, this.followers - 1);
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
     * Update rating based on reviews
     */
    updateRating(reviews) {
        if (!reviews || reviews.length === 0) {
            this.rating = 0;
            return;
        }
        const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        this.rating = Math.round((sum / reviews.length) * 10) / 10;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Add award
     */
    addAward(award) {
        if (!this.awards) this.awards = [];
        this.awards.push(award);
        this.updated_at = new Date().toISOString();
    }

    // ============================================
    // STATUS METHODS
    // ============================================

    /**
     * Mark as featured
     */
    setFeatured() {
        this.is_featured = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Unmark as featured
     */
    unsetFeatured() {
        this.is_featured = false;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Mark as verified
     */
    setVerified() {
        this.is_verified = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Mark as popular
     */
    setPopular() {
        this.is_popular = true;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Mark as inactive
     */
    setInactive() {
        this.is_active = false;
        this.updated_at = new Date().toISOString();
    }

    /**
     * Soft delete author
     */
    softDelete() {
        this.status = AUTHOR_STATUS.DELETED;
        this.is_active = false;
        this.deleted_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    /**
     * Restore author
     */
    restore() {
        this.status = AUTHOR_STATUS.ACTIVE;
        this.is_active = true;
        this.deleted_at = null;
        this.updated_at = new Date().toISOString();
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    /**
     * Validate author data
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

        if (this.status && !Object.values(AUTHOR_STATUS).includes(this.status)) {
            errors.push('Invalid status value');
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
     * Convert to JSON (full detail)
     */
    toJSON() {
        return {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            slug: this.slug,
            bio: this.bio,
            birth_date: this.birth_date,
            death_date: this.death_date,
            nationality: this.nationality,
            gender: this.gender,
            language_code: this.language_code,
            original_language_code: this.original_language_code,
            image_url: this.image_url,
            cover_image: this.cover_image,
            images: this.images,
            website: this.website,
            wikipedia_url: this.wikipedia_url,
            social_links: this.social_links,
            total_books: this.total_books,
            total_sales: this.total_sales,
            total_reviews: this.total_reviews,
            rating: this.rating,
            views: this.views,
            followers: this.followers,
            favorites: this.favorites,
            shares: this.shares,
            awards: this.awards,
            achievements: this.achievements,
            genres: this.genres,
            tags: this.tags,
            status: this.status,
            is_active: this.is_active,
            is_featured: this.is_featured,
            is_verified: this.is_verified,
            is_popular: this.is_popular,
            metadata: this.metadata,
            notes: this.notes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
            translations: this.translations,
            aliases: this.aliases,
            languages: this.languages,
            publications: this.publications,
            books: this.books
        };
    }

    /**
     * Convert to summary (for list views)
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
            is_featured: this.is_featured,
            is_verified: this.is_verified,
            created_at: this.created_at
        };
    }

    /**
     * Convert to compact (for cards)
     */
    toCompact() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            image_url: this.image_url,
            nationality: this.nationality,
            rating: this.rating,
            total_books: this.total_books,
            is_featured: this.is_featured
        };
    }

    /**
     * Convert to DTO
     */
    toDTO() {
        return this.toJSON();
    }

    /**
     * Convert to database format
     */
    toDatabase() {
        return {
            id: this.id,
            uuid: this.uuid,
            name: this.name,
            slug: this.slug,
            bio: this.bio,
            birth_date: this.birth_date,
            death_date: this.death_date,
            nationality: this.nationality,
            gender: this.gender,
            language_code: this.language_code,
            original_language_code: this.original_language_code,
            image_url: this.image_url,
            cover_image: this.cover_image,
            images: JSON.stringify(this.images),
            website: this.website,
            wikipedia_url: this.wikipedia_url,
            social_links: JSON.stringify(this.social_links),
            total_books: this.total_books,
            total_sales: this.total_sales,
            total_reviews: this.total_reviews,
            rating: this.rating,
            views: this.views,
            followers: this.followers,
            favorites: this.favorites,
            shares: this.shares,
            awards: JSON.stringify(this.awards),
            achievements: JSON.stringify(this.achievements),
            genres: JSON.stringify(this.genres),
            tags: JSON.stringify(this.tags),
            status: this.status,
            is_active: this.is_active,
            is_featured: this.is_featured,
            is_verified: this.is_verified,
            is_popular: this.is_popular,
            metadata: JSON.stringify(this.metadata),
            notes: this.notes,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at
        };
    }

    /**
     * Create from database
     */
    static fromDatabase(data) {
        return new Author({
            ...data,
            images: data.images ? JSON.parse(data.images) : [],
            social_links: data.social_links ? JSON.parse(data.social_links) : {},
            awards: data.awards ? JSON.parse(data.awards) : [],
            achievements: data.achievements ? JSON.parse(data.achievements) : [],
            genres: data.genres ? JSON.parse(data.genres) : [],
            tags: data.tags ? JSON.parse(data.tags) : [],
            metadata: data.metadata ? JSON.parse(data.metadata) : {}
        });
    }

    /**
     * Create from request
     */
    static fromRequest(data) {
        return new Author(data);
    }

    /**
     * Create from DTO
     */
    static fromDTO(dto) {
        return new Author(dto);
    }
}

export default Author;