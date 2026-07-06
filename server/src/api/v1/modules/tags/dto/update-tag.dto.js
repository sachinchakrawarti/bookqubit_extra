// src/api/v1/modules/tags/dto/update-tag.dto.js

export default class UpdateTagDTO {
    constructor(data = {}) {
        this.tagId = data.tagId;

        this.tagCode = data.tagCode?.trim();
        this.slug = data.slug?.trim();
        this.icon = data.icon;
        this.color = data.color;

        this.sortOrder = data.sortOrder;

        this.isSystem = data.isSystem;
        this.isFeatured = data.isFeatured;
        this.isActive = data.isActive;
    }

    toDatabase() {
        return {
            tag_id: this.tagId,
            tag_code: this.tagCode,
            slug: this.slug,
            icon: this.icon,
            color: this.color,
            sort_order: this.sortOrder,
            is_system: this.isSystem === undefined ? undefined : Number(this.isSystem),
            is_featured: this.isFeatured === undefined ? undefined : Number(this.isFeatured),
            is_active: this.isActive === undefined ? undefined : Number(this.isActive)
        };
    }
}