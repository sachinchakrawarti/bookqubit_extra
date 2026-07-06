import Database from "better-sqlite3";
import dbConfig from "../config/database.config.js";

const db = new Database(dbConfig.sqlite.filename);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

console.log("✅ SQLite Connected");

export default db;