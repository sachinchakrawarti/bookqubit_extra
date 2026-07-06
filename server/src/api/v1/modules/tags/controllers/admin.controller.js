import * as tagsService from "../services/admin.service.js";
import { MESSAGE } from "../constants/tags.constants.js";

// ======================================================
// Get All Tags
// ======================================================

export const getAllTags = async (req, res, next) => {
    try {
        const tags = await tagsService.getAllTags();

        return res.status(200).json({
            success: true,
            message: MESSAGE.FETCH_SUCCESS,
            count: tags.length,
            data: tags,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Get Tag By ID
// ======================================================

export const getTagById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tag = await tagsService.getTagById(id);

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: MESSAGE.NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: MESSAGE.FETCH_ONE_SUCCESS,
            data: tag,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Create Tag
// ======================================================

export const createTag = async (req, res, next) => {
    try {
        const tag = await tagsService.createTag(req.body);

        return res.status(201).json({
            success: true,
            message: MESSAGE.CREATED,
            data: tag,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Update Tag
// ======================================================

export const updateTag = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updated = await tagsService.updateTag(id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: MESSAGE.NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: MESSAGE.UPDATED,
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Delete Tag
// ======================================================

export const deleteTag = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await tagsService.deleteTag(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: MESSAGE.NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: MESSAGE.DELETED,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Toggle Active Status
// ======================================================

export const toggleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tag = await tagsService.toggleStatus(id);

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: MESSAGE.NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag status updated successfully.",
            data: tag,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Toggle Featured Status
// ======================================================

export const toggleFeatured = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tag = await tagsService.toggleFeatured(id);

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: MESSAGE.NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag featured status updated successfully.",
            data: tag,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// Get Statistics
// ======================================================

export const getStatistics = async (req, res, next) => {
    try {
        const stats = await tagsService.getStatistics();

        return res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};