// src/api/v1/modules/author/controllers/admin.controller.js

/**
 * Admin Controller
 * Handles administrative operations for authors
 */

import adminService from '../services/admin.service.js';
import { formatResponse, formatError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { HTTP_STATUS, ERROR_CODES } from '../config/constants.js';

export class AdminController {
    /**
     * Bulk create authors
     * POST /api/v1/authors/admin/bulk
     */
    async bulkCreateAuthors(req, res) {
        try {
            const { authors } = req.body;
            const lang = req.query.lang || 'en';

            if (!authors || !Array.isArray(authors) || authors.length === 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Authors array is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.bulkCreateAuthors(authors);

            res.status(HTTP_STATUS.CREATED).json(
                formatResponse(result, 'Authors created successfully', HTTP_STATUS.CREATED, lang)
            );
        } catch (error) {
            logger.error('Error in bulkCreateAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to create authors', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Bulk update authors
     * PUT /api/v1/authors/admin/bulk
     */
    async bulkUpdateAuthors(req, res) {
        try {
            const { updates } = req.body;
            const lang = req.query.lang || 'en';

            if (!updates || !Array.isArray(updates) || updates.length === 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Updates array is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.bulkUpdateAuthors(updates);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'Authors updated successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in bulkUpdateAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to update authors', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Bulk delete authors
     * DELETE /api/v1/authors/admin/bulk
     */
    async bulkDeleteAuthors(req, res) {
        try {
            const { ids } = req.body;
            const lang = req.query.lang || 'en';

            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('IDs array is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.bulkDeleteAuthors(ids);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'Authors deleted successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in bulkDeleteAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to delete authors', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Bulk restore authors
     * POST /api/v1/authors/admin/bulk/restore
     */
    async bulkRestoreAuthors(req, res) {
        try {
            const { ids } = req.body;
            const lang = req.query.lang || 'en';

            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('IDs array is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.bulkRestoreAuthors(ids);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'Authors restored successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in bulkRestoreAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to restore authors', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Import authors from file
     * POST /api/v1/authors/admin/import
     */
    async importAuthors(req, res) {
        try {
            const lang = req.query.lang || 'en';
            const { file, format = 'json' } = req.body;

            if (!file) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('File data is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.importAuthors(file, { format });

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'Authors imported successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in importAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to import authors', ERROR_CODES.IMPORT_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Export authors
     * GET /api/v1/authors/admin/export
     */
    async exportAuthors(req, res) {
        try {
            const lang = req.query.lang || 'en';
            const { format = 'json', filters = {} } = req.query;

            const data = await adminService.exportAuthors(filters, { format });

            res.status(HTTP_STATUS.OK).json(
                formatResponse(data, 'Authors exported successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in exportAuthors:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to export authors', ERROR_CODES.EXPORT_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Create backup of authors
     * POST /api/v1/authors/admin/backup
     */
    async createBackup(req, res) {
        try {
            const lang = req.query.lang || 'en';
            const backup = await adminService.createBackup();

            res.status(HTTP_STATUS.OK).json(
                formatResponse(backup, 'Backup created successfully', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in createBackup:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to create backup', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }

    /**
     * Restore authors from backup
     * POST /api/v1/authors/admin/restore-backup
     */
    async restoreFromBackup(req, res) {
        try {
            const lang = req.query.lang || 'en';
            const { backupData } = req.body;

            if (!backupData) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(
                    formatError('Backup data is required', ERROR_CODES.MISSING_REQUIRED_FIELDS, HTTP_STATUS.BAD_REQUEST, lang)
                );
            }

            const result = await adminService.restoreFromBackup(backupData);

            res.status(HTTP_STATUS.OK).json(
                formatResponse(result, 'Authors restored from backup', HTTP_STATUS.OK, lang)
            );
        } catch (error) {
            logger.error('Error in restoreFromBackup:', error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
                formatError('Failed to restore from backup', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            );
        }
    }
}

export default new AdminController();