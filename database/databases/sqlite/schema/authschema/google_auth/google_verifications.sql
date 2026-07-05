-- google_verifications.sql
-- Tracks Google account verifications and validation

CREATE TABLE IF NOT EXISTS google_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_account_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    -- Verification type
    verification_type VARCHAR(50) DEFAULT 'email', -- email, profile, phone, domain
    verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, failed, expired
    
    -- Verification data
    verification_data JSON, -- Stores verification details
    
    -- Tokens
    verification_token VARCHAR(255),
    verification_code VARCHAR(20),
    expires_at DATETIME,
    
    -- Attempts
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    
    -- Timestamps
    verified_at DATETIME,
    failed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (google_account_id) REFERENCES google_accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_google_verifications_account_id ON google_verifications(google_account_id);
CREATE INDEX idx_google_verifications_user_id ON google_verifications(user_id);
CREATE INDEX idx_google_verifications_token ON google_verifications(verification_token);
CREATE INDEX idx_google_verifications_status ON google_verifications(verification_status);
CREATE INDEX idx_google_verifications_expires_at ON google_verifications(expires_at);

-- Triggers
CREATE TRIGGER update_google_verifications_timestamp 
AFTER UPDATE ON google_verifications
BEGIN
    UPDATE google_verifications SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Index for finding expired verifications
CREATE INDEX idx_google_verifications_expired ON google_verifications(expires_at, verification_status);

-- Index for verification attempts
CREATE INDEX idx_google_verifications_attempts ON google_verifications(attempts, max_attempts);

-- Index for user verification lookup
CREATE INDEX idx_google_verifications_user_status ON google_verifications(user_id, verification_status);

-- Analyze table
ANALYZE google_verifications;