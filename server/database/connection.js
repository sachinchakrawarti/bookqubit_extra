// server/src/database/connection.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(
  __dirname,
  '../../database/databases/sqlite/db/bookqubit_database.db'
);

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

await db.exec('PRAGMA foreign_keys = ON;');

export default db;