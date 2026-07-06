// ======================================================
// Module: Tags
// File: tags.middleware.js
// Description: Validation & middleware for Tags API
// ======================================================

import { LIMITS, MESSAGE } from "../constants/tags.constants.js";

// ======================================================
// Validate Create Tag
// ======================================================

export const validateCreateTag = (req, res, next) => {
    const {
        tag_code,
        slug,
        icon,
        color,
        sort_order,
        is_system,
        is_featured,
        is_active,
    } = req.body;

    // -----------------------------------------
    // Required Fields
    // -----------------------------------------

    if (!tag_code || !tag_code.trim()) {
        return res.status(400).json({
            success: false,
            message: "Tag code is required.",
        });
    }

    if (!slug || !slug.trim()) {
        return res.status(400).json({
            success: false,
            message: "Slug is required.",
        });
    }

    // -----------------------------------------
    // Length Validation
    // -----------------------------------------

    if (tag_code.length > LIMITS.TAG_CODE_MAX_LENGTH) {
        return res.status(400).json({
            success: false,
            message: `Tag code must be less than ${LIMITS.TAG_CODE_MAX_LENGTH} characters.`,
        });
    }

    if (slug.length > LIMITS.SLUG_MAX_LENGTH) {
        return res.status(400).json({
            success: false,
            message: `Slug must be less than ${LIMITS.SLUG_MAX_LENGTH} characters.`,
        });
    }

    // -----------------------------------------
    // Optional Fields
    // -----------------------------------------

    if (icon && typeof icon !== "string") {
        return res.status(400).json({
            success: false,
            message: "Icon must be a string.",
        });
    }

    if (color && typeof color !== "string") {
        return res.status(400).json({
            success: false,
            message: "Color must be a string.",
        });
    }

    if (sort_order !== undefined && isNaN(sort_order)) {
        return res.status(400).json({
            success: false,
            message: "Sort order must be numeric.",
        });
    }

    if (is_system !== undefined && ![0, 1, true, false].includes(is_system)) {
        return res.status(400).json({
            success: false,
            message: "Invalid is_system value.",
        });
    }

    if (is_featured !== undefined && ![0, 1, true, false].includes(is_featured)) {
        return res.status(400).json({
            success: false,
            message: "Invalid is_featured value.",
        });
    }

    if (is_active !== undefined && ![0, 1, true, false].includes(is_active)) {
        return res.status(400).json({
            success: false,
            message: "Invalid is_active value.",
        });
    }

    next();
};

// ======================================================
// Validate Update Tag
// ======================================================

export const validateUpdateTag = (req, res, next) => {
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Tag ID.",
        });
    }

    next();
};

// ======================================================
// Validate ID Parameter
// ======================================================

export const validateTagId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Tag ID.",
        });
    }

    next();
};

// ======================================================
// Validate Pagination
// ======================================================

export const validatePagination = (req, res, next) => {
    let { page = 1, limit = 20 } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (page < 1) page = 1;

    if (limit < 1) limit = 20;

    if (limit > 100) limit = 100;

    req.pagination = {
        page,
        limit,
        offset: (page - 1) * limit,
    };

    next();
};

// ======================================================
// Validate Search
// ======================================================

export const validateSearch = (req, res, next) => {
    if (req.query.search) {
        req.query.search = req.query.search.trim();
    }

    next();
};

// ======================================================
// Request Logger
// ======================================================

export const logRequest = (req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
};

// ======================================================
// Default Export
// ======================================================

export default {
    validateCreateTag,
    validateUpdateTag,
    validateTagId,
    validatePagination,
    validateSearch,
    logRequest,
};