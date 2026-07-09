-- =============================================
-- Indexes for: academic_authors table
-- Description: Performance optimization for academic author queries
-- =============================================

-- =============================================
-- 1. PRIMARY KEY & UNIQUE INDEXES
-- =============================================

-- Primary key is automatically indexed
-- PRIMARY KEY (id)

-- Unique index on ORCID (most important identifier)
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_authors_orcid ON academic_authors(orcid);

-- Unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_authors_email ON academic_authors(email);

-- =============================================
-- 2. BASIC SEARCH INDEXES
-- =============================================

-- Author name search (most common query)
CREATE INDEX IF NOT EXISTS idx_academic_authors_name ON academic_authors(name);

-- Native name search
CREATE INDEX IF NOT EXISTS idx_academic_authors_name_native ON academic_authors(name_native);

-- =============================================
-- 3. INSTITUTION & DEPARTMENT INDEXES
-- =============================================

-- Institution lookups
CREATE INDEX IF NOT EXISTS idx_academic_authors_institution ON academic_authors(institution);

-- Department lookups
CREATE INDEX IF NOT EXISTS idx_academic_authors_department ON academic_authors(department);

-- Position lookups
CREATE INDEX IF NOT EXISTS idx_academic_authors_position ON academic_authors(position);

-- =============================================
-- 4. STATUS & FILTER INDEXES
-- =============================================

-- Active status filtering
CREATE INDEX IF NOT EXISTS idx_academic_authors_is_active ON academic_authors(is_active);

-- Sort order for listing
CREATE INDEX IF NOT EXISTS idx_academic_authors_sort_order ON academic_authors(sort_order);

-- =============================================
-- 5. COMPOSITE INDEXES
-- =============================================

-- Combined institution + active for filtering
CREATE INDEX IF NOT EXISTS idx_academic_authors_inst_active ON academic_authors(institution, is_active);

-- Combined active + name for listing
CREATE INDEX IF NOT EXISTS idx_academic_authors_active_name ON academic_authors(is_active, name);

-- Combined institution + department for internal queries
CREATE INDEX IF NOT EXISTS idx_academic_authors_inst_dept ON academic_authors(institution, department);

-- =============================================
-- 6. FULL-TEXT SEARCH INDEXES (FTS)
-- =============================================

-- Full-text search for academic authors
CREATE VIRTUAL TABLE IF NOT EXISTS academic_authors_fts USING fts5(
    name,
    name_native,
    biography,
    research_interests,
    content='academic_authors',
    content_rowid='id'
);

-- =============================================
-- 7. FTS SYNC TRIGGERS
-- =============================================

CREATE TRIGGER IF NOT EXISTS tr_academic_authors_fts_insert AFTER INSERT ON academic_authors
BEGIN
    INSERT INTO academic_authors_fts(rowid, name, name_native, biography, research_interests)
    VALUES (new.id, new.name, new.name_native, new.biography, new.research_interests);
END;

CREATE TRIGGER IF NOT EXISTS tr_academic_authors_fts_update AFTER UPDATE ON academic_authors
BEGIN
    UPDATE academic_authors_fts
    SET name = new.name,
        name_native = new.name_native,
        biography = new.biography,
        research_interests = new.research_interests
    WHERE rowid = new.id;
END;

CREATE TRIGGER IF NOT EXISTS tr_academic_authors_fts_delete AFTER DELETE ON academic_authors
BEGIN
    DELETE FROM academic_authors_fts WHERE rowid = old.id;
END;