
---

## 1. tags Table

### Description
The core table that stores all tag definitions. Each tag represents a category or keyword that can be applied to books.

### Schema

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | - | Unique tag identifier |
| `name` | VARCHAR(100) | NOT NULL | - | Display name of the tag |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | - | URL-friendly identifier |
| `description` | TEXT | - | NULL | Detailed description of the tag |
| `parent_id` | INTEGER | FOREIGN KEY | NULL | Parent tag ID (for hierarchy) |
| `language_id` | INTEGER | FOREIGN KEY | NULL | Default language ID |
| `usage_count` | INTEGER | DEFAULT 0 | 0 | Number of books using this tag |
| `is_active` | BOOLEAN | DEFAULT 1 | 1 | Whether tag is active |
| `sort_order` | INTEGER | DEFAULT 0 | 0 | Display order |
| `created_by` | INTEGER | FOREIGN KEY | NULL | User who created the tag |
| `updated_by` | INTEGER | FOREIGN KEY | NULL | User who last updated the tag |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | CURRENT_TIMESTAMP | Last update timestamp |
| `meta_title` | VARCHAR(255) | - | NULL | SEO meta title |
| `meta_description` | VARCHAR(500) | - | NULL | SEO meta description |
| `meta_keywords` | TEXT | - | NULL | SEO meta keywords |
| `featured_image` | VARCHAR(500) | - | NULL | Featured image URL |
| `icon_class` | VARCHAR(100) | - | NULL | CSS icon class |
| `color_code` | VARCHAR(7) | - | NULL | Hex color code |
| `seo_friendly` | BOOLEAN | DEFAULT 0 | 0 | Whether tag is SEO optimized |
| `is_featured` | BOOLEAN | DEFAULT 0 | 0 | Whether tag is featured |
| `view_count` | INTEGER | DEFAULT 0 | 0 | Number of views |
| `last_viewed_at` | DATETIME | - | NULL | Last view timestamp |

### Indexes

| Index Name | Columns | Purpose |
|------------|---------|---------|
| `idx_tags_slug_unique` | slug (UNIQUE) | Fast slug lookups |
| `idx_tags_name` | name | Name searches |
| `idx_tags_parent_id` | parent_id | Hierarchy queries |
| `idx_tags_language_id` | language_id | Language filtering |
| `idx_tags_usage_count` | usage_count | Popularity sorting |
| `idx_tags_is_active` | is_active | Active filtering |
| `idx_tags_active_sort` | is_active, sort_order | Listing optimization |
| `idx_tags_parent_active` | parent_id, is_active | Hierarchy filtering |
| `idx_tags_created_at` | created_at | Time-based queries |
| `idx_tags_is_featured` | is_featured | Featured tag queries |
| `idx_tags_seo_friendly` | seo_friendly | SEO filtering |
| `idx_tags_view_count` | view_count | Popularity tracking |
| `idx_tags_color_code` | color_code | Color filtering |

### Foreign Keys

| Constraint | Columns | References | On Delete | On Update |
|------------|---------|------------|-----------|-----------|
| `fk_tags_parent_id` | parent_id | tags(id) | SET NULL | CASCADE |
| `fk_tags_language_id` | language_id | languages(id) | SET NULL | CASCADE |
| `fk_tags_created_by` | created_by | users(id) | SET NULL | CASCADE |
| `fk_tags_updated_by` | updated_by | users(id) | SET NULL | CASCADE |

### Constraints

| Constraint | Check | Purpose |
|------------|-------|---------|
| `ck_tags_name_not_null` | name IS NOT NULL | Name required |
| `ck_tags_slug_not_null` | slug IS NOT NULL | Slug required |
| `ck_tags_name_length` | LENGTH(name) >= 2 AND <= 100 | Name length validation |
| `ck_tags_slug_length` | LENGTH(slug) >= 2 AND <= 100 | Slug length validation |
| `ck_tags_slug_format` | slug GLOB '[a-z0-9-]*' | Slug format validation |
| `ck_tags_sort_order_non_negative` | sort_order >= 0 | Sort order validation |
| `ck_tags_usage_count_non_negative` | usage_count >= 0 | Usage count validation |
| `ck_tags_parent_not_self` | parent_id IS NULL OR parent_id != id | Prevent self-reference |

### Triggers

| Trigger | Timing | Purpose |
|---------|--------|---------|
| `tr_tags_update_timestamp` | AFTER UPDATE | Update updated_at timestamp |
| `tr_tags_update_usage_count_insert` | AFTER INSERT ON book_tags | Update usage count on insert |
| `tr_tags_update_usage_count_delete` | AFTER DELETE ON book_tags | Update usage count on delete |
| `tr_tags_validate_name_unique` | BEFORE INSERT | Validate name uniqueness |
| `tr_tags_validate_slug_unique` | BEFORE INSERT | Validate slug uniqueness |
| `tr_tags_prevent_self_reference` | BEFORE UPDATE | Prevent self-reference |
| `tr_tags_audit_insert` | AFTER INSERT | Audit log creation |
| `tr_tags_audit_update` | AFTER UPDATE | Audit log update |
| `tr_tags_audit_delete` | AFTER DELETE | Audit log deletion |
| `tr_tags_set_hierarchy_level` | AFTER INSERT ON tag_hierarchy | Set hierarchy level |
| `tr_tags_cleanup_translations` | BEFORE DELETE | Clean up translations |
| `tr_tags_cleanup_book_tags` | BEFORE DELETE | Clean up book_tags |
| `tr_tags_cleanup_hierarchy` | BEFORE DELETE | Clean up hierarchy |
| `tr_tags_update_children` | AFTER UPDATE | Update child tags |
| `tr_tags_prevent_delete_with_children` | BEFORE DELETE | Prevent orphaned children |
| `tr_tags_update_fts_insert` | AFTER INSERT | Update FTS index |
| `tr_tags_update_fts_update` | AFTER UPDATE | Update FTS index |
| `tr_tags_update_fts_delete` | AFTER DELETE | Update FTS index |
| `tr_hierarchy_prevent_descendant` | BEFORE UPDATE | Prevent descendant movement |

### Example Queries

```sql
-- Get all active tags
SELECT * FROM tags WHERE is_active = 1 ORDER BY sort_order, name;

-- Get tags with hierarchy
SELECT t.*, p.name AS parent_name
FROM tags t
LEFT JOIN tags p ON t.parent_id = p.id
WHERE t.is_active = 1;

-- Get featured tags
SELECT * FROM tags WHERE is_featured = 1 AND is_active = 1;

-- Get popular tags
SELECT * FROM tags WHERE is_active = 1 ORDER BY usage_count DESC LIMIT 10;

-- Get tags by language
SELECT * FROM tags WHERE language_id = 1 AND is_active = 1;

-- Get root tags (no parent)
SELECT * FROM tags WHERE parent_id IS NULL AND is_active = 1;

-- Get child tags of a specific parent
SELECT * FROM tags WHERE parent_id = 1 AND is_active = 1;