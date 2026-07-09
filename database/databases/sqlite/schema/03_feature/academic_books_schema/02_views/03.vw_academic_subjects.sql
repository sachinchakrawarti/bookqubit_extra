-- =============================================
-- View: vw_academic_subjects
-- Description: Academic subjects with hierarchy and book counts
-- =============================================

CREATE VIEW IF NOT EXISTS vw_academic_subjects AS
WITH RECURSIVE subject_tree AS (
    -- Anchor: Get root subjects (no parent)
    SELECT 
        s.id,
        s.code,
        s.name,
        s.description,
        s.parent_id,
        0 AS level,
        s.name AS path,
        s.is_active,
        s.sort_order,
        s.created_at,
        s.updated_at
    FROM academic_subjects s
    WHERE s.parent_id IS NULL
    
    UNION ALL
    
    -- Recursive: Get child subjects
    SELECT 
        c.id,
        c.code,
        c.name,
        c.description,
        c.parent_id,
        st.level + 1 AS level,
        st.path || ' → ' || c.name AS path,
        c.is_active,
        c.sort_order,
        c.created_at,
        c.updated_at
    FROM academic_subjects c
    INNER JOIN subject_tree st ON c.parent_id = st.id
)
SELECT 
    st.id,
    st.code,
    st.name,
    st.description,
    st.parent_id,
    st.level,
    st.path,
    REPEAT('  ', st.level) || st.name AS indented_name,
    st.is_active,
    st.sort_order,
    st.created_at,
    st.updated_at,
    
    -- Book count for this subject
    (
        SELECT COUNT(DISTINCT bs.book_id)
        FROM academic_book_subjects bs
        WHERE bs.subject_id = st.id
    ) AS direct_book_count,
    
    -- Total book count including descendants
    (
        SELECT COUNT(DISTINCT bs.book_id)
        FROM academic_book_subjects bs
        WHERE bs.subject_id IN (
            WITH RECURSIVE descendants AS (
                SELECT id FROM academic_subjects WHERE id = st.id
                UNION ALL
                SELECT s.id FROM academic_subjects s
                INNER JOIN descendants d ON s.parent_id = d.id
            )
            SELECT id FROM descendants
        )
    ) AS total_book_count,
    
    -- Child count
    (
        SELECT COUNT(*) 
        FROM academic_subjects 
        WHERE parent_id = st.id AND is_active = 1
    ) AS child_count,
    
    -- Whether this subject has children
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM academic_subjects 
            WHERE parent_id = st.id AND is_active = 1
        ) THEN 1 
        ELSE 0 
    END AS has_children

FROM subject_tree st
WHERE st.is_active = 1
ORDER BY st.path;