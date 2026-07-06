-- google_verifications.index.sql
-- Additional indexes for google_verifications table

-- For finding pending verifications
CREATE INDEX idx_google_verifications_pending ON google_verifications(verification_status, created_at);

-- For token lookup
CREATE INDEX idx_google_verifications_token_type ON google_verifications(verification_token, verification_type);

-- For user verification history
CREATE INDEX idx_google_verifications_user_history ON google_verifications(user_id, created_at);

-- For account verification status
CREATE INDEX idx_google_verifications_account_status ON google_verifications(google_account_id, verification_status);

-- Composite index for common queries
CREATE INDEX idx_google_verifications_user_account_status ON google_verifications(user_id, google_account_id, verification_status);

-- For cleanup jobs
CREATE INDEX idx_google_verifications_cleanup ON google_verifications(expires_at, verification_status);

-- For analytics
CREATE INDEX idx_google_verifications_type ON google_verifications(verification_type);
CREATE INDEX idx_google_verifications_verified_at ON google_verifications(verified_at);

-- Optimize for verification flow
CREATE INDEX idx_google_verifications_flow ON google_verifications(verification_token, verification_code, expires_at);

-- Analyze table
ANALYZE google_verifications;

-- Vacuum to optimize storage
VACUUM;
