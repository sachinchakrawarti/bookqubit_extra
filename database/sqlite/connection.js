const Database = require("better-sqlite3");
const path = require("path");

// Database Path
const dbPath = path.join(__dirname, "bookqubit_database.db");

// Connect to SQLite
const db = new Database(dbPath);

// Enable Foreign Keys
db.pragma("foreign_keys = ON");

// Improve Performance
db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");
db.pragma("cache_size = -64000");
db.pragma("temp_store = MEMORY");

console.log("✅ SQLite Connected");
console.log(`📂 Database: ${dbPath}`);

module.exports = db;