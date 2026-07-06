// src/api/v1/modules/tags/models/book-tag-translation.model.js

export default class BookTagTranslation {
    constructor(data = {}) {
        this.translationId = data.translation_id ?? null;

        this.tagId = data.tag_id ?? null;
        this.languageId = data.language_id ?? null;

        this.tagName = data.tag_name ?? "";
        this.shortName = data.short_name ?? "";
        this.description = data.description ?? "";

        this.seoTitle = data.seo_title ?? "";
        this.seoDescription = data.seo_description ?? "";

        this.createdAt = data.created_at ?? null;
        this.updatedAt = data.updated_at ?? null;
    }

    toJSON() {
        return {
            translation_id: this.translationId,
            tag_id: this.tagId,
            language_id: this.languageId,
            tag_name: this.tagName,
            short_name: this.shortName,
            description: this.description,
            seo_title: this.seoTitle,
            seo_description: this.seoDescription,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}