-- =============================================
-- Indexes for: academic_subjects table
-- Description: Performance optimization for subject queries
-- =============================================

-- =============================================
-- 1. PRIMARY KEY & UNIQUE INDEXES
-- =============================================

-- Primary key is automatically indexed
-- PRIMARY KEY (id)

-- Unique index on code
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_subjects_code ON academic_subjects(code);

-- =============================================
-- 2. BASIC SEARCH INDEXES
-- =============================================

-- Subject name search
CREATE INDEX IF NOT EXISTS idx_academic_subjects_name ON academic_subjects(name);

-- =============================================
-- 3. HIERARCHY INDEXES
-- =============================================

-- Parent-child relationships
CREATE INDEX IF NOT EXISTS idx_academic_subjects_parent_id ON academic_subjects(parent_id);

-- Hierarchy level queries
CREATE INDEX IF NOT EXISTS idx_academic_subjects_level ON academic_subjects(level);

-- =============================================
-- 4. STATUS & FILTER INDEXES
-- =============================================

-- Active status filtering
CREATE INDEX IF NOT EXISTS idx_academic_subjects_is_active ON academic_subjects(is_active);

-- Sort order for listing
CREATE INDEX IF NOT EXISTS idx_academic_subjects_sort_order ON academic_subjects(sort_order);

-- =============================================
-- 5. COMPOSITE INDEXES
-- =============================================

-- Combined active + parent for hierarchy queries
CREATE INDEX IF NOT EXISTS idx_academic_subjects_active_parent ON academic_subjects(is_active, parent_id);

-- Combined active + level for level filtering
CREATE INDEX IF NOT EXISTS idx_academic_subjects_active_level ON academic_subjects(is_active, level);

-- Combined active + name for listing
CREATE INDEX IF NOT EXISTS idx_academic_subjects_active_name ON academic_subjects(is_active, name);