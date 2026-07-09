-- =============================================
-- Procedures for: Geography Cleanup
-- Description: Cleanup and maintenance operations
-- =============================================

-- =============================================
-- 1. CLEANUP PROCEDURES
-- =============================================

-- 1.1 Cleanup inactive records
CREATE PROCEDURE cleanup_inactive_records()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Delete inactive states older than 1 year
    DELETE FROM states
    WHERE is_active = 0 
    AND updated_at < date('now', '-365 days');
    
    SET v_deleted_count = v_deleted_count + CHANGES();
    
    -- Delete inactive countries older than 1 year
    DELETE FROM countries
    WHERE is_active = 0 
    AND updated_at < date('now', '-365 days');
    
    SET v_deleted_count = v_deleted_count + CHANGES();
    
    -- Delete inactive continents older than 1 year
    DELETE FROM continents
    WHERE is_active = 0 
    AND updated_at < date('now', '-365 days');
    
    SET v_deleted_count = v_deleted_count + CHANGES();
    
    SELECT v_deleted_count AS records_deleted;
END;

-- 1.2 Cleanup orphaned translations
CREATE PROCEDURE cleanup_orphaned_translations()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Delete translations without entity
    DELETE FROM geo_translations
    WHERE NOT EXISTS (
        SELECT 1 FROM continents WHERE id = entity_id AND entity_type = 'continent'
    ) AND NOT EXISTS (
        SELECT 1 FROM countries WHERE id = entity_id AND entity_type = 'country'
    ) AND NOT EXISTS (
        SELECT 1 FROM states WHERE id = entity_id AND entity_type = 'state'
    ) AND NOT EXISTS (
        SELECT 1 FROM regions WHERE id = entity_id AND entity_type = 'region'
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_deleted_count AS orphaned_translations_deleted;
END;

-- 1.3 Cleanup duplicate records
CREATE PROCEDURE cleanup_duplicate_countries()
BEGIN
    DECLARE v_deleted_count INTEGER DEFAULT 0;
    
    -- Find and delete duplicate countries
    DELETE FROM countries
    WHERE id IN (
        SELECT id FROM countries
        WHERE code IN (
            SELECT code FROM countries
            GROUP BY code
            HAVING COUNT(*) > 1
        )
        AND id NOT IN (
            SELECT MIN(id) FROM countries
            GROUP BY code
            HAVING COUNT(*) > 1
        )
    );
    
    SET v_deleted_count = CHANGES();
    
    SELECT v_deleted_count AS duplicate_countries_deleted;
END;

-- 1.4 Full cleanup
CREATE PROCEDURE full_cleanup()
BEGIN
    CALL cleanup_inactive_records();
    CALL cleanup_orphaned_translations();
    CALL cleanup_duplicate_countries();
    CALL sync_all_populations();
    
    SELECT 'Full cleanup completed successfully' AS status;
END;

-- =============================================
-- 2. ARCHIVE PROCEDURES
-- =============================================

-- 2.1 Archive old data
CREATE PROCEDURE archive_old_data(
    p_days_old INTEGER DEFAULT 365
)
BEGIN
    DECLARE v_archived_count INTEGER DEFAULT 0;
    
    -- Create archive table if not exists
    CREATE TABLE IF NOT EXISTS archive_geography (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_type VARCHAR(20),
        entity_id INTEGER,
        data TEXT,
        archived_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Archive old states
    INSERT INTO archive_geography (entity_type, entity_id, data)
    SELECT 'state', id, json_object(
        'code', code,
        'name', name,
        'name_native', name_native,
        'country_id', country_id,
        'population', population,
        'area_sq_km', area_sq_km,
        'deleted_at', CURRENT_TIMESTAMP
    )
    FROM states
    WHERE is_active = 0 
    AND updated_at < date('now', '-' || p_days_old || ' days');
    
    SET v_archived_count = CHANGES();
    
    -- Delete archived states
    DELETE FROM states
    WHERE is_active = 0 
    AND updated_at < date('now', '-' || p_days_old || ' days');
    
    -- Archive old countries
    INSERT INTO archive_geography (entity_type, entity_id, data)
    SELECT 'country', id, json_object(
        'code', code,
        'code3', code3,
        'name', name,
        'name_native', name_native,
        'capital', capital,
        'continent_id', continent_id,
        'population', population,
        'area_sq_km', area_sq_km,
        'deleted_at', CURRENT_TIMESTAMP
    )
    FROM countries
    WHERE is_active = 0 
    AND updated_at < date('now', '-' || p_days_old || ' days');
    
    SET v_archived_count = v_archived_count + CHANGES();
    
    -- Delete archived countries
    DELETE FROM countries
    WHERE is_active = 0 
    AND updated_at < date('now', '-' || p_days_old || ' days');
    
    SELECT v_archived_count AS records_archived;
END;

-- =============================================
-- 3. COMPRESSION AND OPTIMIZATION
-- =============================================

-- 3.1 Vacuum database
CREATE PROCEDURE vacuum_database()
BEGIN
    VACUUM;
    SELECT 'Database vacuumed successfully' AS status;
END;

-- 3.2 Analyze tables
CREATE PROCEDURE analyze_tables()
BEGIN
    ANALYZE continents;
    ANALYZE countries;
    ANALYZE states;
    ANALYZE regions;
    ANALYZE geo_translations;
    
    SELECT 'Tables analyzed successfully' AS status;
END;

-- =============================================
-- 4. REPORTING PROCEDURES
-- =============================================

-- 4.1 Generate geography report
CREATE PROCEDURE generate_geography_report()
BEGIN
    SELECT 
        '--- GEOGRAPHY REPORT ---' AS report,
        datetime('now') AS generated_at;
    
    -- Continent statistics
    SELECT 'Continents' AS category,
        COUNT(*) AS total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive
    FROM continents;
    
    -- Country statistics
    SELECT 'Countries' AS category,
        COUNT(*) AS total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive
    FROM countries;
    
    -- State statistics
    SELECT 'States' AS category,
        COUNT(*) AS total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive
    FROM states;
    
    -- Region statistics
    SELECT 'Regions' AS category,
        COUNT(*) AS total,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive
    FROM regions;
    
    -- Translation statistics
    SELECT 'Translations' AS category,
        COUNT(*) AS total
    FROM geo_translations;
END;

-- 4.2 Generate clean data report
CREATE PROCEDURE generate_cleanup_report()
BEGIN
    SELECT '--- CLEANUP REPORT ---' AS report,
        datetime('now') AS generated_at;
    
    -- Orphaned records
    SELECT 'Orphaned countries' AS check_type,
        COUNT(*) AS count
    FROM countries
    WHERE continent_id IS NOT NULL 
    AND NOT EXISTS (SELECT 1 FROM continents WHERE id = continent_id)
    UNION ALL
    SELECT 'Orphaned states',
        COUNT(*)
    FROM states
    WHERE NOT EXISTS (SELECT 1 FROM countries WHERE id = country_id)
    UNION ALL
    SELECT 'Orphaned translations',
        COUNT(*)
    FROM geo_translations
    WHERE NOT EXISTS (
        SELECT 1 FROM continents WHERE id = entity_id AND entity_type = 'continent'
    ) AND NOT EXISTS (
        SELECT 1 FROM countries WHERE id = entity_id AND entity_type = 'country'
    ) AND NOT EXISTS (
        SELECT 1 FROM states WHERE id = entity_id AND entity_type = 'state'
    ) AND NOT EXISTS (
        SELECT 1 FROM regions WHERE id = entity_id AND entity_type = 'region'
    );
    
    -- Duplicates
    SELECT 'Duplicate country codes' AS check_type,
        code,
        COUNT(*) AS count
    FROM countries
    GROUP BY code
    HAVING COUNT(*) > 1;
    
    -- Inactive data
    SELECT 'Inactive states' AS check_type,
        COUNT(*) AS count
    FROM states
    WHERE is_active = 0
    UNION ALL
    SELECT 'Inactive countries',
        COUNT(*)
    FROM countries
    WHERE is_active = 0
    UNION ALL
    SELECT 'Inactive continents',
        COUNT(*)
    FROM continents
    WHERE is_active = 0;
END;