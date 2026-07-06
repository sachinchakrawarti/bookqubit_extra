import adminRepository from "../repositories/admin.repository.js";

class TranslationService {
    createTranslation(data) {
        return adminRepository.createTranslation(data);
    }

    updateTranslation(tagId, languageId, data) {
        return adminRepository.updateTranslation(
            tagId,
            languageId,
            data
        );
    }

    deleteTranslation(tagId, languageId) {
        return adminRepository.deleteTranslation(
            tagId,
            languageId
        );
    }

    getTranslation(tagId, languageId) {
        return adminRepository.getTranslation(
            tagId,
            languageId
        );
    }

    listTranslations(tagId) {
        return adminRepository.listTranslations(tagId);
    }

    searchTranslations(keyword) {
        return adminRepository.searchTranslations(keyword);
    }

    listLanguages(tagId) {
        return adminRepository.listLanguages(tagId);
    }
}

export default new TranslationService();