import tagsRepository from "../repositories/tags.repository.js";

class AnalyticsService {
    popularTags() {
        return tagsRepository.popularTags();
    }

    tagUsage() {
        return tagsRepository.tagUsage();
    }
}

export default new AnalyticsService();