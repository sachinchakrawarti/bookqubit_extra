-- =============================================
-- Table: academic_subjects
-- Description: Academic subject categories with hierarchy
-- Dependencies: None
-- =============================================

CREATE TABLE IF NOT EXISTS academic_subjects (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Subject Information
    code VARCHAR(50) UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Hierarchy (self-referencing)
    parent_id INTEGER,
    level INTEGER DEFAULT 1,
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key (self-referencing)
    FOREIGN KEY (parent_id) REFERENCES academic_subjects(id) ON DELETE SET NULL
);

-- =============================================
-- Indexes for academic_subjects
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_subjects_code ON academic_subjects(code);
CREATE INDEX IF NOT EXISTS idx_academic_subjects_name ON academic_subjects(name);
CREATE INDEX IF NOT EXISTS idx_academic_subjects_parent_id ON academic_subjects(parent_id);
CREATE INDEX IF NOT EXISTS idx_academic_subjects_level ON academic_subjects(level);
CREATE INDEX IF NOT EXISTS idx_academic_subjects_is_active ON academic_subjects(is_active);