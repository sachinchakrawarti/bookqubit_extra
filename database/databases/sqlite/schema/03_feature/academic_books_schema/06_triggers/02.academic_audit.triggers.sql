-- =============================================
-- Triggers for: Academic Audit and Logging
-- Description: Audit trail and activity logging
-- =============================================

-- =============================================
-- 1. AUDIT LOG TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS academic_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_data TEXT,
    new_data TEXT,
    user_id INTEGER,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for audit log
CREATE INDEX IF NOT EXISTS idx_academic_audit_log_table_record ON academic_audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_academic_audit_log_created_at ON academic_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_academic_audit_log_action ON academic_audit_log(action);

-- =============================================
-- 2. ACADEMIC BOOKS AUDIT TRIGGERS
-- =============================================

-- 2.1 Audit book insert
CREATE TRIGGER IF NOT EXISTS tr_academic_books_audit_insert
AFTER INSERT ON academic_books
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'academic_books',
        NEW.id,
        'INSERT',
        json_object(
            'title', NEW.title,
            'subtitle', NEW.subtitle,
            'isbn', NEW.isbn,
            'doi', NEW.doi,
            'publication_year', NEW.publication_year,
            'publisher_id', NEW.publisher_id,
            'language_id', NEW.language_id,
            'pages', NEW.pages,
            'price', NEW.price
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 2.2 Audit book update
CREATE TRIGGER IF NOT EXISTS tr_academic_books_audit_update
AFTER UPDATE ON academic_books
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'academic_books',
        NEW.id,
        'UPDATE',
        json_object(
            'title', OLD.title,
            'subtitle', OLD.subtitle,
            'isbn', OLD.isbn,
            'doi', OLD.doi,
            'publication_year', OLD.publication_year,
            'publisher_id', OLD.publisher_id,
            'language_id', OLD.language_id,
            'pages', OLD.pages,
            'price', OLD.price
        ),
        json_object(
            'title', NEW.title,
            'subtitle', NEW.subtitle,
            'isbn', NEW.isbn,
            'doi', NEW.doi,
            'publication_year', NEW.publication_year,
            'publisher_id', NEW.publisher_id,
            'language_id', NEW.language_id,
            'pages', NEW.pages,
            'price', NEW.price
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 2.3 Audit book delete
CREATE TRIGGER IF NOT EXISTS tr_academic_books_audit_delete
AFTER DELETE ON academic_books
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'academic_books',
        OLD.id,
        'DELETE',
        json_object(
            'title', OLD.title,
            'subtitle', OLD.subtitle,
            'isbn', OLD.isbn,
            'doi', OLD.doi,
            'publication_year', OLD.publication_year,
            'publisher_id', OLD.publisher_id,
            'language_id', OLD.language_id
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 3. ACADEMIC SUBJECTS AUDIT TRIGGERS
-- =============================================

-- 3.1 Audit subject insert
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_audit_insert
AFTER INSERT ON academic_subjects
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'academic_subjects',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'parent_id', NEW.parent_id,
            'level', NEW.level
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 3.2 Audit subject update
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_audit_update
AFTER UPDATE ON academic_subjects
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'academic_subjects',
        NEW.id,
        'UPDATE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'parent_id', OLD.parent_id,
            'level', OLD.level
        ),
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'parent_id', NEW.parent_id,
            'level', NEW.level
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 3.3 Audit subject delete
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_audit_delete
AFTER DELETE ON academic_subjects
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'academic_subjects',
        OLD.id,
        'DELETE',
        json_object(
            'code', OLD.code,
            'name', OLD.name,
            'parent_id', OLD.parent_id,
            'level', OLD.level
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 4. ACADEMIC AUTHORS AUDIT TRIGGERS
-- =============================================

-- 4.1 Audit author insert
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_audit_insert
AFTER INSERT ON academic_authors
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        new_data,
        created_at
    ) VALUES (
        'academic_authors',
        NEW.id,
        'INSERT',
        json_object(
            'name', NEW.name,
            'orcid', NEW.orcid,
            'email', NEW.email,
            'institution', NEW.institution,
            'department', NEW.department,
            'position', NEW.position
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 4.2 Audit author update
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_audit_update
AFTER UPDATE ON academic_authors
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        created_at
    ) VALUES (
        'academic_authors',
        NEW.id,
        'UPDATE',
        json_object(
            'name', OLD.name,
            'orcid', OLD.orcid,
            'email', OLD.email,
            'institution', OLD.institution,
            'department', OLD.department,
            'position', OLD.position
        ),
        json_object(
            'name', NEW.name,
            'orcid', NEW.orcid,
            'email', NEW.email,
            'institution', NEW.institution,
            'department', NEW.department,
            'position', NEW.position
        ),
        CURRENT_TIMESTAMP
    );
END;

-- 4.3 Audit author delete
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_audit_delete
AFTER DELETE ON academic_authors
BEGIN
    INSERT INTO academic_audit_log (
        table_name,
        record_id,
        action,
        old_data,
        created_at
    ) VALUES (
        'academic_authors',
        OLD.id,
        'DELETE',
        json_object(
            'name', OLD.name,
            'orcid', OLD.orcid,
            'email', OLD.email,
            'institution', OLD.institution
        ),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 5. ACTIVITY LOGGING TRIGGERS
-- =============================================

-- 5.1 Log book status changes
CREATE TRIGGER IF NOT EXISTS tr_academic_books_status_change
AFTER UPDATE ON academic_books
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO academic_activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'academic_book',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- 5.2 Log subject status changes
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_status_change
AFTER UPDATE ON academic_subjects
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO academic_activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'academic_subject',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- 5.3 Log author status changes
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_status_change
AFTER UPDATE ON academic_authors
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO academic_activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'academic_author',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 6. CLEANUP TRIGGERS
-- =============================================

-- 6.1 Clean up audit logs when book is deleted
CREATE TRIGGER IF NOT EXISTS tr_academic_books_cleanup_audit
AFTER DELETE ON academic_books
BEGIN
    DELETE FROM academic_audit_log 
    WHERE table_name = 'academic_books' AND record_id = OLD.id;
END;

-- 6.2 Clean up audit logs when subject is deleted
CREATE TRIGGER IF NOT EXISTS tr_academic_subjects_cleanup_audit
AFTER DELETE ON academic_subjects
BEGIN
    DELETE FROM academic_audit_log 
    WHERE table_name = 'academic_subjects' AND record_id = OLD.id;
END;

-- 6.3 Clean up audit logs when author is deleted
CREATE TRIGGER IF NOT EXISTS tr_academic_authors_cleanup_audit
AFTER DELETE ON academic_authors
BEGIN
    DELETE FROM academic_audit_log 
    WHERE table_name = 'academic_authors' AND record_id = OLD.id;
END;