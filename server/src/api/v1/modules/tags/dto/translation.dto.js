// src/api/v1/modules/tags/dto/translation.dto.js

export default class TranslationDTO {
    constructor(data = {}) {
        this.translationId = data.translationId ?? null;

        this.tagId = data.tagId;
        this.languageId = data.languageId;

        this.tagName = data.tagName?.trim();
        this.shortName = data.shortName?.trim() ?? "";

        this.description = data.description?.trim() ?? "";

        this.seoTitle = data.seoTitle?.trim() ?? "";
        this.seoDescription = data.seoDescription?.trim() ?? "";
    }

    toDatabase() {
        return {
            translation_id: this.translationId,
            tag_id: this.tagId,
            language_id: this.languageId,
            tag_name: this.tagName,
            short_name: this.shortName,
            description: this.description,
            seo_title: this.seoTitle,
            seo_description: this.seoDescription
        };
    }
}