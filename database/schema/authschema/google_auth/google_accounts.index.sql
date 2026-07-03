-- google_accounts.index.sql
-- Additional indexes for google_accounts table

-- Composite indexes for common queries
CREATE INDEX idx_google_accounts_email_connected ON google_accounts(email, is_connected);
CREATE INDEX idx_google_accounts_user_connected ON google_accounts(user_id, is_connected);
CREATE INDEX idx_google_accounts_google_verified ON google_accounts(google_id, is_verified);

-- For analytics and reporting
CREATE INDEX idx_google_accounts_created_at ON google_accounts(created_at);
CREATE INDEX idx_google_accounts_locale ON google_accounts(locale);
CREATE INDEX idx_google_accounts_hd ON google_accounts(hd);

-- For finding accounts to refresh
CREATE INDEX idx_google_accounts_last_refresh ON google_accounts(last_refresh_at);

-- For finding accounts by user email
CREATE INDEX idx_google_accounts_user_email ON google_accounts(user_id, email);

-- Optimize the most common query
CREATE INDEX idx_google_accounts_google_id_user ON google_accounts(google_id, user_id);

-- Analyze table for query optimization
ANALYZE google_accounts;

-- Vacuum to reclaim space
VACUUM;