// src/api/v1/modules/tags/services/tags.service.js

import tagsRepository from "../repositories/tags.repository.js";

class TagsService {
    async listTags() {
        return await tagsRepository.listTags();
    }

    async getTag(id) {
        return await tagsRepository.getTag(id);
    }

    async searchTags(keyword) {
        return await tagsRepository.searchTags(keyword);
    }

    async popularTags() {
        return await tagsRepository.popularTags();
    }

    async tagUsage() {
        return await tagsRepository.tagUsage();
    }
}

export default new TagsService();