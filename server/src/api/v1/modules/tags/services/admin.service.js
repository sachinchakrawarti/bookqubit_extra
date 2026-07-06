// src/api/v1/modules/tags/services/admin.service.js

import adminRepository from "../repositories/admin.repository.js";

class AdminService {
    async createTag(data) {
        return await adminRepository.createTag(data);
    }

    async updateTag(id, data) {
        return await adminRepository.updateTag(id, data);
    }

    async deleteTag(id) {
        return await adminRepository.deleteTag(id);
    }

    async getTag(id) {
        return await adminRepository.getTag(id);
    }

    async listTags() {
        return await adminRepository.listTags();
    }

    // -----------------------------
    // Translation
    // -----------------------------

    async createTranslation(data) {
        return await adminRepository.createTranslation(data);
    }

    async updateTranslation(tagId, languageId, data) {
        return await adminRepository.updateTranslation(
            tagId,
            languageId,
            data
        );
    }

    async deleteTranslation(tagId, languageId) {
        return await adminRepository.deleteTranslation(
            tagId,
            languageId
        );
    }

    async listTranslations(tagId) {
        return await adminRepository.listTranslations(tagId);
    }

    async getTranslation(tagId, languageId) {
        return await adminRepository.getTranslation(
            tagId,
            languageId
        );
    }
}

export default new AdminService();