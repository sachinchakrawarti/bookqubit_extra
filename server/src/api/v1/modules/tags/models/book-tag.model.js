// src/api/v1/modules/tags/models/book-tag.model.js

export default class BookTag {
    constructor(data = {}) {
        this.tagId = data.tag_id ?? null;
        this.tagCode = data.tag_code ?? "";
        this.slug = data.slug ?? "";
        this.icon = data.icon ?? "";
        this.color = data.color ?? "#000000";

        this.sortOrder = data.sort_order ?? 0;

        this.isSystem = Boolean(data.is_system);
        this.isFeatured = Boolean(data.is_featured);
        this.isActive = Boolean(data.is_active);

        this.createdAt = data.created_at ?? null;
        this.updatedAt = data.updated_at ?? null;
    }

    toJSON() {
        return {
            tag_id: this.tagId,
            tag_code: this.tagCode,
            slug: this.slug,
            icon: this.icon,
            color: this.color,
            sort_order: this.sortOrder,
            is_system: this.isSystem,
            is_featured: this.isFeatured,
            is_active: this.isActive,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}