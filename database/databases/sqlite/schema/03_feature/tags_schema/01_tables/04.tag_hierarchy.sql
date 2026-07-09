-- =============================================
-- Table: tag_hierarchy
-- Description: Parent-child relationships for hierarchical tags
-- Dependencies: tags
-- =============================================

CREATE TABLE IF NOT EXISTS tag_hierarchy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    level INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(parent_id, child_id)
);

-- Indexes for tag_hierarchy table
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_id ON tag_hierarchy(parent_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_child_id ON tag_hierarchy(child_id);
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_level ON tag_hierarchy(level);