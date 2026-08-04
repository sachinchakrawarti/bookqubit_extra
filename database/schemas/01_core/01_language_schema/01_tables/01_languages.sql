CREATE TABLE languages (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    code            VARCHAR(10) NOT NULL UNIQUE,
    name            VARCHAR(100) NOT NULL,
    native_name     VARCHAR(100) NOT NULL,
    script          VARCHAR(50) NOT NULL,
    direction       VARCHAR(3) NOT NULL CHECK (direction IN ('LTR', 'RTL')),
    locale          VARCHAR(20) NOT NULL UNIQUE,
    enabled         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);