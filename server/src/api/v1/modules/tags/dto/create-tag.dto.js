// src/api/v1/modules/tags/dto/create-tag.dto.js

export default class CreateTagDTO {
    constructor(data = {}) {
        this.tagCode = data.tagCode?.trim();
        this.slug = data.slug?.trim();
        this.icon = data.icon ?? "";
        this.color = data.color ?? "#000000";

        this.sortOrder = data.sortOrder ?? 0;

        this.isSystem = data.isSystem ?? false;
        this.isFeatured = data.isFeatured ?? false;
        this.isActive = data.isActive ?? true;
    }

    toDatabase() {
        return {
            tag_code: this.tagCode,
            slug: this.slug,
            icon: this.icon,
            color: this.color,
            sort_order: this.sortOrder,
            is_system: Number(this.isSystem),
            is_featured: Number(this.isFeatured),
            is_active: Number(this.isActive)
        };
    }
}