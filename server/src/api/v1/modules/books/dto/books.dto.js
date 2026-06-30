// src/api/v1/modules/books/dto/books.dto.js

/**
 * Books DTO
 * Data Transfer Objects for book operations
 */

// ============================================
// REQUEST DTOS
// ============================================

/**
 * Create Book Request DTO
 */
export class CreateBookRequestDTO {
    constructor(data) {
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.author = data.author;
        this.author_id = data.author_id;
        this.category = data.category;
        this.category_id = data.category_id;
        this.language_code = data.language_code || 'english';
        this.original_language_code = data.original_language_code;
        this.description = data.description;
        this.summary = data.summary;
        this.excerpt = data.excerpt;
        this.price = data.price || 0;
        this.currency = data.currency || 'USD';
        this.publisher = data.publisher;
        this.publication_id = data.publication_id;
        this.published_date = data.published_date;
        this.edition = data.edition;
        this.format = data.format;
        this.page_count = data.page_count || 0;
        this.isbn = data.isbn;
        this.isbn13 = data.isbn13;
        this.oclc = data.oclc;
        this.lccn = data.lccn;
        this.image_url = data.image_url;
        this.cover_image = data.cover_image;
        this.images = data.images || [];
        this.table_of_contents = data.table_of_contents || [];
        this.tags = data.tags || [];
        this.genres = data.genres || [];
        this.subjects = data.subjects || [];
        this.key_points = data.key_points || [];
        this.buttons = data.buttons || {};
        this.geography = data.geography || {};
        this.status = data.status || 'published';
        this.is_featured = data.is_featured || false;
        this.is_bestseller = data.is_bestseller || false;
        this.is_new_release = data.is_new_release || false;
    }

    /**
     * Validate create book request
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

        return {
            valid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            title: this.title,
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
            status: this.status,
            is_featured: this.is_featured,
            is_bestseller: this.is_bestseller,
            is_new_release: this.is_new_release
        };
    }
}

/**
 * Update Book Request DTO
 */
export class UpdateBookRequestDTO {
    constructor(data) {
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.author = data.author;
        this.author_id = data.author_id;
        this.category = data.category;
        this.category_id = data.category_id;
        this.language_code = data.language_code;
        this.original_language_code = data.original_language_code;
        this.description = data.description;
        this.summary = data.summary;
        this.excerpt = data.excerpt;
        this.price = data.price;
        this.currency = data.currency;
        this.publisher = data.publisher;
        this.publication_id = data.publication_id;
        this.published_date = data.published_date;
        this.edition = data.edition;
        this.format = data.format;
        this.page_count = data.page_count;
        this.isbn = data.isbn;
        this.isbn13 = data.isbn13;
        this.oclc = data.oclc;
        this.lccn = data.lccn;
        this.image_url = data.image_url;
        this.cover_image = data.cover_image;
        this.images = data.images;
        this.table_of_contents = data.table_of_contents;
        this.tags = data.tags;
        this.genres = data.genres;
        this.subjects = data.subjects;
        this.key_points = data.key_points;
        this.buttons = data.buttons;
        this.geography = data.geography;
        this.status = data.status;
        this.is_featured = data.is_featured;
        this.is_bestseller = data.is_bestseller;
        this.is_new_release = data.is_new_release;

        // Remove undefined fields
        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
                delete this[key];
            }
        });
    }

    /**
     * Validate update book request
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (this.price !== undefined && (this.price < 0 || isNaN(this.price))) {
            errors.push('Price must be a positive number');
        }

        if (this.page_count !== undefined && (this.page_count < 0 || isNaN(this.page_count))) {
            errors.push('Page count must be a positive integer');
        }

        if (this.status !== undefined && !['draft', 'published', 'archived', 'deleted'].includes(this.status)) {
            errors.push('Invalid status value');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        const result = {};
        Object.keys(this).forEach(key => {
            if (this[key] !== undefined) {
                result[key] = this[key];
            }
        });
        return result;
    }
}

/**
 * Book Query DTO
 */
export class BookQueryDTO {
    constructor(query) {
        this.page = parseInt(query.page) || 1;
        this.limit = parseInt(query.limit) || 10;
        this.language = query.language || query.lang;
        this.author = query.author;
        this.category = query.category;
        this.genre = query.genre;
        this.tag = query.tag;
        this.minRating = query.minRating ? parseFloat(query.minRating) : undefined;
        this.maxRating = query.maxRating ? parseFloat(query.maxRating) : undefined;
        this.minPrice = query.minPrice ? parseFloat(query.minPrice) : undefined;
        this.maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : undefined;
        this.search = query.search || query.q;
        this.status = query.status || 'published';
        this.isFeatured = query.isFeatured === 'true' ? true : query.isFeatured === 'false' ? false : undefined;
        this.isBestseller = query.isBestseller === 'true' ? true : query.isBestseller === 'false' ? false : undefined;
        this.sortBy = query.sortBy || 'created_at';
        this.sortOrder = query.sortOrder || 'desc';
        this.startDate = query.startDate;
        this.endDate = query.endDate;
    }

    /**
     * Validate query parameters
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validate() {
        const errors = [];

        if (this.page < 1) errors.push('Page must be greater than 0');
        if (this.limit < 1 || this.limit > 100) errors.push('Limit must be between 1 and 100');
        if (this.minRating !== undefined && (this.minRating < 0 || this.minRating > 5)) {
            errors.push('minRating must be between 0 and 5');
        }
        if (this.maxRating !== undefined && (this.maxRating < 0 || this.maxRating > 5)) {
            errors.push('maxRating must be between 0 and 5');
        }
        if (this.minPrice !== undefined && this.minPrice < 0) {
            errors.push('minPrice must be greater than 0');
        }
        if (this.maxPrice !== undefined && this.maxPrice < 0) {
            errors.push('maxPrice must be greater than 0');
        }
        if (this.minPrice !== undefined && this.maxPrice !== undefined && this.minPrice > this.maxPrice) {
            errors.push('minPrice cannot be greater than maxPrice');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            page: this.page,
            limit: this.limit,
            language: this.language,
            author: this.author,
            category: this.category,
            genre: this.genre,
            tag: this.tag,
            minRating: this.minRating,
            maxRating: this.maxRating,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            search: this.search,
            status: this.status,
            isFeatured: this.isFeatured,
            isBestseller: this.isBestseller,
            sortBy: this.sortBy,
            sortOrder: this.sortOrder,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}

/**
 * Bulk Create Request DTO
 */
export class BulkCreateRequestDTO {
    constructor(data) {
        this.books = data.books || [];
        this.overwrite = data.overwrite || false;
        this.skipDuplicates = data.skipDuplicates !== undefined ? data.skipDuplicates : true;
        this.validateOnly = data.validateOnly || false;
    }

    validate() {
        const errors = [];

        if (!this.books || !Array.isArray(this.books) || this.books.length === 0) {
            errors.push('Books array is required');
        }

        if (this.books && this.books.length > 50) {
            errors.push('Maximum 50 books allowed per bulk operation');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    toJSON() {
        return {
            books: this.books,
            overwrite: this.overwrite,
            skipDuplicates: this.skipDuplicates,
            validateOnly: this.validateOnly
        };
    }
}

// ============================================
// RESPONSE DTOS
// ============================================

/**
 * Book Response DTO
 */
export class BookResponseDTO {
    constructor(book) {
        this.id = book.id;
        this.title = book.title;
        this.slug = book.slug;
        this.subtitle = book.subtitle;
        this.author = book.author;
        this.author_id = book.author_id;
        this.category = book.category;
        this.category_id = book.category_id;
        this.language_code = book.language_code;
        this.original_language_code = book.original_language_code;
        this.description = book.description;
        this.summary = book.summary;
        this.excerpt = book.excerpt;
        this.price = book.price;
        this.currency = book.currency;
        this.publisher = book.publisher;
        this.publication_id = book.publication_id;
        this.published_date = book.published_date;
        this.edition = book.edition;
        this.format = book.format;
        this.page_count = book.page_count;
        this.isbn = book.isbn;
        this.isbn13 = book.isbn13;
        this.oclc = book.oclc;
        this.lccn = book.lccn;
        this.image_url = book.image_url;
        this.cover_image = book.cover_image;
        this.images = book.images;
        this.table_of_contents = book.table_of_contents;
        this.tags = book.tags;
        this.genres = book.genres;
        this.subjects = book.subjects;
        this.key_points = book.key_points;
        this.buttons = book.buttons;
        this.geography = book.geography;
        this.rating = book.rating;
        this.total_reviews = book.total_reviews;
        this.views = book.views;
        this.downloads = book.downloads;
        this.favorites = book.favorites;
        this.shares = book.shares;
        this.status = book.status;
        this.is_featured = book.is_featured;
        this.is_bestseller = book.is_bestseller;
        this.is_new_release = book.is_new_release;
        this.created_at = book.created_at;
        this.updated_at = book.updated_at;
    }

    /**
     * Convert to summary (for list views)
     */
    static toSummary(book) {
        return {
            id: book.id,
            title: book.title,
            slug: book.slug,
            author: book.author,
            category: book.category,
            price: book.price,
            currency: book.currency,
            image_url: book.image_url,
            rating: book.rating,
            language_code: book.language_code,
            published_date: book.published_date,
            tags: (book.tags || []).slice(0, 3),
            is_featured: book.is_featured,
            is_bestseller: book.is_bestseller,
            created_at: book.created_at
        };
    }

    /**
     * Convert to detail (for single view)
     */
    static toDetail(book) {
        return new BookResponseDTO(book);
    }

    /**
     * Convert to paginated response
     */
    static toPaginated(books, pagination, metadata = {}) {
        return {
            data: books.map(book => this.toSummary(book)),
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total: pagination.total,
                totalPages: pagination.totalPages
            },
            metadata: {
                timestamp: new Date().toISOString(),
                ...metadata
            }
        };
    }
}

/**
 * Error Response DTO
 */
export class ErrorResponseDTO {
    constructor(message, code, status = 400, details = null) {
        this.success = false;
        this.message = message;
        this.code = code;
        this.status = status;
        this.timestamp = new Date().toISOString();
        if (details) this.details = details;
    }
}

/**
 * Success Response DTO
 */
export class SuccessResponseDTO {
    constructor(data, message = 'Success', status = 200) {
        this.success = true;
        this.message = message;
        this.status = status;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}