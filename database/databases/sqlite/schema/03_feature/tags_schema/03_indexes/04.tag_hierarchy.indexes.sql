-- =============================================
-- Indexes for: tag_hierarchy table
-- Purpose: Optimize tag hierarchy queries
-- =============================================

-- Primary key index (automatically created)
-- PRIMARY KEY (id)

-- 1. Unique composite index on parent_id + child_id (prevents duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_child ON tag_hierarchy(parent_id, child_id);

-- 2. Index on parent_id (for fetching children of a tag)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_id ON tag_hierarchy(parent_id);

-- 3. Index on child_id (for fetching parents of a tag)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_child_id ON tag_hierarchy(child_id);

-- 4. Index on level (for filtering by hierarchy depth)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_level ON tag_hierarchy(level);

-- 5. Composite index on parent_id + level (for efficient tree traversal)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_parent_level ON tag_hierarchy(parent_id, level);

-- 6. Composite index on child_id + level (for reverse tree traversal)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_child_level ON tag_hierarchy(child_id, level);

-- 7. Index on created_at (for time-based queries)
CREATE INDEX IF NOT EXISTS idx_tag_hierarchy_created_at ON tag_hierarchy(created_at);