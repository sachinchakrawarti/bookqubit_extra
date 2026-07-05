// src/api/v1/modules/author/controllers/author.controller.js

/**
 * Author Controller
 * Handles HTTP requests for author CRUD operations
 */

import authorService from '../services/author.service.js';
import { formatResponse, formatError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { HTTP_STATUS, ERROR_CODES } from '../config/constants.js';

export class AuthorController {
    /**
     * Get all authors with pagination and filters
     * GET /api/v1/authors
     */
    async getAllAuthors(req, res) {
        try {
            const {
                page = 1,
                limit = 10,
                search,
                nationality,
                language_code,
                sortBy,
                sortOrder,
                is_featured,
                is_verified,
                minRating
            } = req.query;
            const lang = req.query.lang || 'en';

            const result = await authorService.getAllAuthors({
                page,
                limit,
                search,
                nationality,
                language_code,
                sortBy,
                sortOrder,
                is_featured: is_featured === 'true',
                is_verified: is_verified === 'true',
                minRating: minRating ? parseFloat(minRating) : undefined
            });

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAllAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch authors', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author by ID
     * GET /api/v1/authors/:id
     */
    async getAuthorById(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const author = await authorService.getAuthorById(id);

            if (!author) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorById:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author by slug
     * GET /api/v1/authors/slug/:slug
     */
    async getAuthorBySlug(req, res) {
        try {
            const { slug } = req.params;
            const lang = req.query.lang || 'en';

            const author = await authorService.getAuthorBySlug(slug);

            if (!author) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorBySlug:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author with full details including translations, aliases, languages
     * GET /api/v1/authors/:id/full
     */
    async getAuthorFull(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const author = await authorService.getAuthorFull(id);

            if (!author) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorFull:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch author details', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Create a new author
     * POST /api/v1/authors
     */
    async createAuthor(req, res) {
        try {
            const lang = req.query.lang || 'en';

            // Validate required fields
            if (!req.body.name) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Name is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const author = await authorService.createAuthor(req.body);

            res.status(HTTP_STATUS.CREATED).json(
                formatResponse(author, 'Author created successfully', HTTP_STATUS.CREATED, lang)
            );
        } catch (error) {
            logger.error('Error in createAuthor:', error);
            
            if (error.message === 'Author already exists') {
                return res.status(HTTP_STATUS.CONFLICT).json(
                    formatError('Author already exists', ERROR_CODES.DUPLICATE_AUTHOR, HTTP_STATUS.CONFLICT)
                );
            }

            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to create author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Update an author
     * PUT /api/v1/authors/:id
     */
    async updateAuthor(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            // Check if author exists
            const existing = await authorService.getAuthorById(id);
            if (!existing) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            const author = await authorService.updateAuthor(id, req.body);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'Author updated successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in updateAuthor:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to update author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Delete an author (soft delete)
     * DELETE /api/v1/authors/:id
     */
    async deleteAuthor(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const deleted = await authorService.deleteAuthor(id);

            if (!deleted) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(null, 'Author deleted successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in deleteAuthor:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to delete author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Restore a deleted author
     * POST /api/v1/authors/:id/restore
     */
    async restoreAuthor(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const restored = await authorService.restoreAuthor(id);

            if (!restored) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(restored, 'Author restored successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in restoreAuthor:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to restore author', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author statistics
     * GET /api/v1/authors/stats
     */
    async getAuthorStats(req, res) {
        try {
            const lang = req.query.lang || 'en';
            const stats = await authorService.getStats();

            res.status(HTTP_STATUS.OK).json(
                formatResponse(stats, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorStats:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch statistics', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author translations
     * GET /api/v1/authors/:id/translations
     */
    async getAuthorTranslations(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const translations = await authorService.getAuthorTranslations(id);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(translations, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorTranslations:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch translations', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Add author translation
     * POST /api/v1/authors/:id/translations
     */
    async addAuthorTranslation(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';
            const { language_code, name, bio, nationality, is_primary } = req.body;

            if (!language_code || !name) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Language code and name are required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const translation = await authorService.addAuthorTranslation(id, {
                language_code,
                name,
                bio,
                nationality,
                is_primary
            });

            res.status(HTTP_STATUS.CREATED).json(
                formatResponse(translation, 'Translation added successfully', HTTP_STATUS.CREATED, lang)
            );
        } catch (error) {
            logger.error('Error in addAuthorTranslation:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to add translation', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author aliases
     * GET /api/v1/authors/:id/aliases
     */
    async getAuthorAliases(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const aliases = await authorService.getAuthorAliases(id);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(aliases, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorAliases:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch aliases', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Add author alias
     * POST /api/v1/authors/:id/aliases
     */
    async addAuthorAlias(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';
            const { alias_name, alias_type, language_code, is_primary, notes } = req.body;

            if (!alias_name) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Alias name is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const alias = await authorService.addAuthorAlias(id, {
                alias_name,
                alias_type,
                language_code,
                is_primary,
                notes
            });

            res.status(HTTP_STATUS.CREATED).json(
                formatResponse(alias, 'Alias added successfully', HTTP_STATUS.CREATED, lang)
            );
        } catch (error) {
            logger.error('Error in addAuthorAlias:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to add alias', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Get author languages
     * GET /api/v1/authors/:id/languages
     */
    async getAuthorLanguages(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const languages = await authorService.getAuthorLanguages(id);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(languages, 'success', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in getAuthorLanguages:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to fetch languages', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Add author language
     * POST /api/v1/authors/:id/languages
     */
    async addAuthorLanguage(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';
            const { language_code, language_type, proficiency_level, is_primary, notes } = req.body;

            if (!language_code) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Language code is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const language = await authorService.addAuthorLanguage(id, {
                language_code,
                language_type,
                proficiency_level,
                is_primary,
                notes
            });

            res.status(HTTP_STATUS.CREATED).json(
                formatResponse(language, 'Language added successfully', HTTP_STATUS.CREATED, lang)
            );
        } catch (error) {
            logger.error('Error in addAuthorLanguage:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to add language', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Toggle author featured status
     * PATCH /api/v1/authors/:id/featured
     */
    async toggleFeatured(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const author = await authorService.toggleFeatured(id);

            if (!author) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'Featured status updated', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in toggleFeatured:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to update featured status', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Toggle author verified status
     * PATCH /api/v1/authors/:id/verify
     */
    async toggleVerified(req, res) {
        try {
            const { id } = req.params;
            const lang = req.query.lang || 'en';

            const author = await authorService.toggleVerified(id);

            if (!author) {
                return res.status(HTTP_STATUS.NOT_FOUND).json(
                    formatError('Author not found', ERROR_CODES.AUTHOR_NOT_FOUND, HTTP_STATUS.NOT_FOUND, lang)
                );
            }

            res.status(HTTP_STATUS.OK).json(
                formatResponse(author, 'Verification status updated', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in toggleVerified:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to update verification status', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }
}

export default new AuthorController();