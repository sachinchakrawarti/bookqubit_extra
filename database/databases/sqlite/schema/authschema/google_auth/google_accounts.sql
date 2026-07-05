-- google_accounts.sql
-- Stores Google OAuth 2.0 account information

CREATE TABLE IF NOT EXISTS google_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    google_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL,
    verified_email BOOLEAN DEFAULT FALSE,
    name VARCHAR(200),
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    picture_url TEXT,
    locale VARCHAR(20),
    hd VARCHAR(100), -- Hosted domain (for G Suite/Workspace)
    
    -- Account status
    is_connected BOOLEAN DEFAULT TRUE,
    is_primary BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Last activity
    last_login_at DATETIME,
    last_refresh_at DATETIME,
    
    -- Metadata
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_google_accounts_user_id ON google_accounts(user_id);
CREATE INDEX idx_google_accounts_google_id ON google_accounts(google_id);
CREATE INDEX idx_google_accounts_email ON google_accounts(email);
CREATE INDEX idx_google_accounts_is_connected ON google_accounts(is_connected);
CREATE INDEX idx_google_accounts_last_login ON google_accounts(last_login_at);

-- Triggers
CREATE TRIGGER update_google_accounts_timestamp 
AFTER UPDATE ON google_accounts
BEGIN
    UPDATE google_accounts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Enable WAL mode for better performance
PRAGMA journal_mode=WAL;