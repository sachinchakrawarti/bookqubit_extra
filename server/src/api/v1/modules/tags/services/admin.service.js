// ======================================================
// Module: Tags
// File: admin.service.js
// Description: Business logic for Tag Administration
// ======================================================

import * as repository from "../repositories/admin.repository.js";

// ======================================================
// Get All Tags
// ======================================================

export const getAllTags = async (options = {}) => {
    return await repository.findAll(options);
};

// ======================================================
// Get Tag By ID
// ======================================================

export const getTagById = async (id) => {
    return await repository.findById(id);
};

// ======================================================
// Create Tag
// ======================================================

export const createTag = async (data) => {

    // Check duplicate tag code
    const existingCode = await repository.findByCode(data.tag_code);

    if (existingCode) {
        throw new Error("Tag code already exists.");
    }

    // Check duplicate slug
    const existingSlug = await repository.findBySlug(data.slug);

    if (existingSlug) {
        throw new Error("Tag slug already exists.");
    }

    return await repository.create(data);
};

// ======================================================
// Update Tag
// ======================================================

export const updateTag = async (id, data) => {

    const tag = await repository.findById(id);

    if (!tag) {
        return null;
    }

    if (data.tag_code) {

        const existing = await repository.findByCode(data.tag_code);

        if (existing && existing.tag_id !== Number(id)) {
            throw new Error("Tag code already exists.");
        }
    }

    if (data.slug) {

        const existing = await repository.findBySlug(data.slug);

        if (existing && existing.tag_id !== Number(id)) {
            throw new Error("Tag slug already exists.");
        }
    }

    await repository.update(id, data);

    return await repository.findById(id);
};

// ======================================================
// Delete Tag
// ======================================================

export const deleteTag = async (id) => {

    const tag = await repository.findById(id);

    if (!tag) {
        return null;
    }

    await repository.remove(id);

    return true;
};

// ======================================================
// Change Active Status
// ======================================================

export const toggleStatus = async (id) => {

    const tag = await repository.findById(id);

    if (!tag) {
        return null;
    }

    const status = tag.is_active ? 0 : 1;

    await repository.updateStatus(id, status);

    return await repository.findById(id);
};

// ======================================================
// Change Featured Status
// ======================================================

export const toggleFeatured = async (id) => {

    const tag = await repository.findById(id);

    if (!tag) {
        return null;
    }

    const featured = tag.is_featured ? 0 : 1;

    await repository.updateFeatured(id, featured);

    return await repository.findById(id);
};

// ======================================================
// Change System Status
// ======================================================

export const toggleSystem = async (id) => {

    const tag = await repository.findById(id);

    if (!tag) {
        return null;
    }

    const system = tag.is_system ? 0 : 1;

    await repository.updateSystem(id, system);

    return await repository.findById(id);
};

// ======================================================
// Get Active Tags
// ======================================================

export const getActiveTags = async () => {
    return await repository.findActive();
};

// ======================================================
// Search Tags
// ======================================================

export const searchTags = async (keyword) => {
    return await repository.search(keyword);
};

// ======================================================
// Get Statistics
// ======================================================

export const getStatistics = async () => {

    const total = await repository.countAll();

    const active = await repository.countActive();

    const featured = await repository.countFeatured();

    const system = await repository.countSystem();

    return {
        total,
        active,
        featured,
        system,
    };
};

export default {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    toggleStatus,
    toggleFeatured,
    toggleSystem,
    getActiveTags,
    searchTags,
    getStatistics,
};