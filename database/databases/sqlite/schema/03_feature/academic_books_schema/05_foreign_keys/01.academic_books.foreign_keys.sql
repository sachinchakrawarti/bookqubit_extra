-- =============================================
-- Foreign Keys for: academic_books table and related tables
-- Description: Define relationships for academic books
-- =============================================

-- =============================================
-- 1. ACADEMIC BOOKS FOREIGN KEYS
-- =============================================

-- 1.1 Foreign key from academic_books to languages
ALTER TABLE academic_books ADD CONSTRAINT fk_academic_books_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- 1.2 Foreign key from academic_books to academic_publishers
ALTER TABLE academic_books ADD CONSTRAINT fk_academic_books_publisher_id 
    FOREIGN KEY (publisher_id) 
    REFERENCES academic_publishers(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE;

-- =============================================
-- 2. ACADEMIC BOOK SUBJECTS FOREIGN KEYS
-- =============================================

-- 2.1 Foreign key from academic_book_subjects to academic_books
ALTER TABLE academic_book_subjects ADD CONSTRAINT fk_academic_book_subjects_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 2.2 Foreign key from academic_book_subjects to academic_subjects
ALTER TABLE academic_book_subjects ADD CONSTRAINT fk_academic_book_subjects_subject_id 
    FOREIGN KEY (subject_id) 
    REFERENCES academic_subjects(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 3. ACADEMIC BOOK AUTHORS FOREIGN KEYS
-- =============================================

-- 3.1 Foreign key from academic_book_authors to academic_books
ALTER TABLE academic_book_authors ADD CONSTRAINT fk_academic_book_authors_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 3.2 Foreign key from academic_book_authors to academic_authors
ALTER TABLE academic_book_authors ADD CONSTRAINT fk_academic_book_authors_author_id 
    FOREIGN KEY (author_id) 
    REFERENCES academic_authors(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 4. ACADEMIC EDITIONS FOREIGN KEYS
-- =============================================

-- 4.1 Foreign key from academic_editions to academic_books
ALTER TABLE academic_editions ADD CONSTRAINT fk_academic_editions_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 5. ACADEMIC TRANSLATIONS FOREIGN KEYS
-- =============================================

-- 5.1 Foreign key from academic_translations to academic_books
ALTER TABLE academic_translations ADD CONSTRAINT fk_academic_translations_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 5.2 Foreign key from academic_translations to languages
ALTER TABLE academic_translations ADD CONSTRAINT fk_academic_translations_language_id 
    FOREIGN KEY (language_id) 
    REFERENCES languages(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 6. ACADEMIC CITATIONS FOREIGN KEYS
-- =============================================

-- 6.1 Foreign key from academic_citations to academic_books (citing)
ALTER TABLE academic_citations ADD CONSTRAINT fk_academic_citations_citing_book_id 
    FOREIGN KEY (citing_book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- 6.2 Foreign key from academic_citations to academic_books (cited)
ALTER TABLE academic_citations ADD CONSTRAINT fk_academic_citations_cited_book_id 
    FOREIGN KEY (cited_book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- =============================================
-- 7. ACADEMIC REVIEWS FOREIGN KEYS
-- =============================================

-- 7.1 Foreign key from academic_reviews to academic_books
ALTER TABLE academic_reviews ADD CONSTRAINT fk_academic_reviews_book_id 
    FOREIGN KEY (book_id) 
    REFERENCES academic_books(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;