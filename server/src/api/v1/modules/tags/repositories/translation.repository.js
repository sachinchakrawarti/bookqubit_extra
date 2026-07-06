// src/api/v1/modules/tags/repositories/translation.repository.js

import db from "../../../../../../config/database.js";
import queries from "../queries/index.js";

class TranslationRepository {

    createTranslation(data) {
        return db.run(
            queries.translations.createTranslation,
            data
        );
    }

    updateTranslation(tagId, languageId, data) {
        return db.run(
            queries.translations.updateTranslation,
            {
                tagId,
                languageId,
                ...data
            }
        );
    }

    deleteTranslation(tagId, languageId) {
        return db.run(
            queries.translations.deleteTranslation,
            {
                tagId,
                languageId
            }
        );
    }

    getTranslation(tagId, languageId) {
        return db.get(
            queries.translations.getTranslation,
            {
                tagId,
                languageId
            }
        );
    }

    listTranslations(tagId) {
        return db.all(
            queries.translations.listTranslations,
            {
                tagId
            }
        );
    }

    searchTranslations(keyword) {
        return db.all(
            queries.translations.searchTranslations,
            {
                keyword: `%${keyword}%`
            }
        );
    }

    listLanguages(tagId) {
        return db.all(
            queries.translations.listLanguages,
            {
                tagId
            }
        );
    }

}

export default new TranslationRepository();