-- google_tokens.sql
-- Stores Google OAuth 2.0 tokens (encrypted)

CREATE TABLE IF NOT EXISTS google_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_account_id INTEGER NOT NULL,
    
    -- Tokens (encrypted in application layer)
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    id_token TEXT,
    
    -- Token metadata
    token_type VARCHAR(50) DEFAULT 'Bearer',
    expires_at DATETIME NOT NULL,
    scope TEXT,
    
    -- For token rotation
    token_version INTEGER DEFAULT 1,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at DATETIME,
    revoked_reason VARCHAR(100),
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (google_account_id) REFERENCES google_accounts(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_google_tokens_account_id ON google_tokens(google_account_id);
CREATE INDEX idx_google_tokens_access_token ON google_tokens(access_token);
CREATE INDEX idx_google_tokens_refresh_token ON google_tokens(refresh_token);
CREATE INDEX idx_google_tokens_expires_at ON google_tokens(expires_at);
CREATE INDEX idx_google_tokens_is_revoked ON google_tokens(is_revoked);

-- Triggers
CREATE TRIGGER update_google_tokens_timestamp 
AFTER UPDATE ON google_tokens
BEGIN
    UPDATE google_tokens SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Create composite index for token validation
CREATE INDEX idx_google_tokens_account_valid ON google_tokens(google_account_id, is_revoked, expires_at);

-- Index for cleanup of expired tokens
CREATE INDEX idx_google_tokens_expired ON google_tokens(expires_at, is_revoked);

-- Analyze table
ANALYZE google_tokens;