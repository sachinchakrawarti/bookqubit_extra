-- google_tokens.index.sql
-- Additional indexes for google_tokens table

-- For finding active tokens by account
CREATE INDEX idx_google_tokens_account_active ON google_tokens(google_account_id, is_revoked);

-- For refreshing tokens
CREATE INDEX idx_google_tokens_refresh_active ON google_tokens(refresh_token, is_revoked);

-- For token validation
CREATE INDEX idx_google_tokens_access_valid ON google_tokens(access_token, is_revoked, expires_at);

-- For token cleanup jobs
CREATE INDEX idx_google_tokens_cleanup ON google_tokens(expires_at, is_revoked, created_at);

-- For analytics
CREATE INDEX idx_google_tokens_created ON google_tokens(created_at);
CREATE INDEX idx_google_tokens_token_version ON google_tokens(token_version);

-- Composite index for common queries
CREATE INDEX idx_google_tokens_account_token ON google_tokens(google_account_id, access_token, refresh_token);

-- Index for token revocation queries
CREATE INDEX idx_google_tokens_revoked ON google_tokens(is_revoked, revoked_at);

-- Optimize for token exchange
CREATE INDEX idx_google_tokens_exchange ON google_tokens(refresh_token, access_token, expires_at);

-- Analyze table
ANALYZE google_tokens;

-- Vacuum to optimize storage
VACUUM;