-- Admin users and sessions for aipedia admin UI.

CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
    created_at    TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);

-- Default admin: armin / dopadopa123 (bcrypt). Insert only when missing.
INSERT INTO users (username, password_hash, role)
SELECT 'armin', '$2a$10$A5YA5wI3D3DQWG0ZPLa7eOO42sQnlzgBYygP4SlbEuiyvVG1sShca', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'armin' COLLATE NOCASE);

INSERT INTO schema_meta (key, value)
VALUES ('users_schema', '003')
ON CONFLICT (key) DO UPDATE SET value = excluded.value;
