-- =============================================
-- Table: academic_citations
-- Description: Citation tracking between academic books
-- Dependencies: academic_books (self-referencing)
-- =============================================

CREATE TABLE IF NOT EXISTS academic_citations (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Foreign Keys
    citing_book_id INTEGER NOT NULL,
    cited_book_id INTEGER NOT NULL,
    
    -- Citation Metadata
    citation_type VARCHAR(50),
    context TEXT,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(citing_book_id, cited_book_id),
    
    -- Foreign Keys
    FOREIGN KEY (citing_book_id) REFERENCES academic_books(id) ON DELETE CASCADE,
    FOREIGN KEY (cited_book_id) REFERENCES academic_books(id) ON DELETE CASCADE
);

-- =============================================
-- Indexes for academic_citations
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_citations_citing_book_id ON academic_citations(citing_book_id);
CREATE INDEX IF NOT EXISTS idx_academic_citations_cited_book_id ON academic_citations(cited_book_id);
CREATE INDEX IF NOT EXISTS idx_academic_citations_citation_type ON academic_citations(citation_type);