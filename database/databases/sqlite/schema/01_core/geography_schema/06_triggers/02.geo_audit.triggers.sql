-- =============================================
-- Triggers for: Geography Audit and Logging
-- Description: Extended audit and logging functionality
-- =============================================

-- =============================================
-- 1. AUDIT LOG TABLE
-- =============================================

-- Create audit_log table if it doesn't exist
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_data TEXT,
    new_data TEXT,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- Index for audit log
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);

-- =============================================
-- 2. AUDIT TRIGGERS WITH USER CONTEXT
-- =============================================

-- 2.1 Audit trigger for continents with user tracking
CREATE TRIGGER IF NOT EXISTS tr_continents_audit_user_insert
AFTER INSERT ON continents
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'continents',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km,
            'is_active', NEW.is_active
        ),
        (SELECT current_user_id()),
        CURRENT_TIMESTAMP
    );
END;

-- 2.2 Audit trigger for countries with user tracking
CREATE TRIGGER IF NOT EXISTS tr_countries_audit_user_insert
AFTER INSERT ON countries
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'countries',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'code3', NEW.code3,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'capital', NEW.capital,
            'continent_id', NEW.continent_id,
            'region_id', NEW.region_id,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        (SELECT current_user_id()),
        CURRENT_TIMESTAMP
    );
END;

-- 2.3 Audit trigger for states with user tracking
CREATE TRIGGER IF NOT EXISTS tr_states_audit_user_insert
AFTER INSERT ON states
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'states',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'country_id', NEW.country_id,
            'region_id', NEW.region_id,
            'capital', NEW.capital,
            'population', NEW.population,
            'area_sq_km', NEW.area_sq_km
        ),
        (SELECT current_user_id()),
        CURRENT_TIMESTAMP
    );
END;

-- 2.4 Audit trigger for regions with user tracking
CREATE TRIGGER IF NOT EXISTS tr_regions_audit_user_insert
AFTER INSERT ON regions
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'regions',
        NEW.id,
        'INSERT',
        json_object(
            'code', NEW.code,
            'name', NEW.name,
            'name_native', NEW.name_native,
            'continent_id', NEW.continent_id,
            'description', NEW.description
        ),
        (SELECT current_user_id()),
        CURRENT_TIMESTAMP
    );
END;

-- 2.5 Audit trigger for geo_translations with user tracking
CREATE TRIGGER IF NOT EXISTS tr_geo_translations_audit_user_insert
AFTER INSERT ON geo_translations
BEGIN
    INSERT INTO audit_log (
        table_name,
        record_id,
        action,
        new_data,
        user_id,
        created_at
    ) VALUES (
        'geo_translations',
        NEW.id,
        'INSERT',
        json_object(
            'entity_type', NEW.entity_type,
            'entity_id', NEW.entity_id,
            'language_id', NEW.language_id,
            'name', NEW.name,
            'description', NEW.description
        ),
        (SELECT current_user_id()),
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 3. ACTIVITY LOGGING TRIGGERS
-- =============================================

-- 3.1 Log continent activity
CREATE TRIGGER IF NOT EXISTS tr_continents_activity
AFTER UPDATE ON continents
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'continent',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- 3.2 Log country activity
CREATE TRIGGER IF NOT EXISTS tr_countries_activity
AFTER UPDATE ON countries
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'country',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- 3.3 Log state activity
CREATE TRIGGER IF NOT EXISTS tr_states_activity
AFTER UPDATE ON states
WHEN NEW.is_active != OLD.is_active
BEGIN
    INSERT INTO activity_log (
        entity_type,
        entity_id,
        action,
        old_value,
        new_value,
        created_at
    ) VALUES (
        'state',
        NEW.id,
        'status_change',
        OLD.is_active,
        NEW.is_active,
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 4. CHANGE TRACKING TRIGGERS
-- =============================================

-- 4.1 Track continent name changes
CREATE TRIGGER IF NOT EXISTS tr_continents_name_change
AFTER UPDATE ON continents
WHEN NEW.name != OLD.name
BEGIN
    INSERT INTO name_change_log (
        entity_type,
        entity_id,
        old_name,
        new_name,
        changed_at
    ) VALUES (
        'continent',
        NEW.id,
        OLD.name,
        NEW.name,
        CURRENT_TIMESTAMP
    );
END;

-- 4.2 Track country name changes
CREATE TRIGGER IF NOT EXISTS tr_countries_name_change
AFTER UPDATE ON countries
WHEN NEW.name != OLD.name
BEGIN
    INSERT INTO name_change_log (
        entity_type,
        entity_id,
        old_name,
        new_name,
        changed_at
    ) VALUES (
        'country',
        NEW.id,
        OLD.name,
        NEW.name,
        CURRENT_TIMESTAMP
    );
END;

-- 4.3 Track state name changes
CREATE TRIGGER IF NOT EXISTS tr_states_name_change
AFTER UPDATE ON states
WHEN NEW.name != OLD.name
BEGIN
    INSERT INTO name_change_log (
        entity_type,
        entity_id,
        old_name,
        new_name,
        changed_at
    ) VALUES (
        'state',
        NEW.id,
        OLD.name,
        NEW.name,
        CURRENT_TIMESTAMP
    );
END;

-- =============================================
-- 5. CLEANUP TRIGGERS
-- =============================================

-- 5.1 Clean up audit logs when continent is deleted
CREATE TRIGGER IF NOT EXISTS tr_continents_cleanup_audit
AFTER DELETE ON continents
BEGIN
    DELETE FROM audit_log 
    WHERE table_name = 'continents' AND record_id = OLD.id;
END;

-- 5.2 Clean up audit logs when country is deleted
CREATE TRIGGER IF NOT EXISTS tr_countries_cleanup_audit
AFTER DELETE ON countries
BEGIN
    DELETE FROM audit_log 
    WHERE table_name = 'countries' AND record_id = OLD.id;
END;

-- 5.3 Clean up activity logs when continent is deleted
CREATE TRIGGER IF NOT EXISTS tr_continents_cleanup_activity
AFTER DELETE ON continents
BEGIN
    DELETE FROM activity_log 
    WHERE entity_type = 'continent' AND entity_id = OLD.id;
END;

-- =============================================
-- 6. SUMMARY STATISTICS TRIGGERS
-- =============================================

-- 6.1 Update continent statistics on country change
CREATE TRIGGER IF NOT EXISTS tr_continents_update_stats
AFTER INSERT ON countries
BEGIN
    UPDATE continents 
    SET population = (
        SELECT COALESCE(SUM(population), 0) 
        FROM countries 
        WHERE continent_id = continents.id AND is_active = 1
    )
    WHERE id = NEW.continent_id;
END;

-- 6.2 Update country statistics on state change
CREATE TRIGGER IF NOT EXISTS tr_countries_update_stats
AFTER INSERT ON states
BEGIN
    UPDATE countries 
    SET population = (
        SELECT COALESCE(SUM(population), 0) 
        FROM states 
        WHERE country_id = countries.id AND is_active = 1
    )
    WHERE id = NEW.country_id;
END;