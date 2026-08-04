const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('./config/config');
const logger = require('./utils/logger');

class Database {
    constructor() {
        this.dbPath = config.database.path;
        this.ensureDirectory();
        this.db = new sqlite3.Database(this.dbPath);
        this.initTable();
    }

    ensureDirectory() {
        const fs = require('fs');
        const dir = path.dirname(this.dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    initTable() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS comics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                issue_number TEXT,
                publisher TEXT,
                release_date TEXT,
                cover_url TEXT,
                description TEXT,
                writer TEXT,
                artist TEXT,
                series TEXT,
                url TEXT UNIQUE,
                price TEXT,
                rating TEXT,
                pages INTEGER,
                format TEXT,
                scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                logger.error('Error creating table:', err.message);
            } else {
                logger.info('Database table initialized');
            }
        });
    }

    insertComic(comic) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT OR REPLACE INTO comics 
                (title, issue_number, publisher, release_date, cover_url, 
                 description, writer, artist, series, url, price, rating, pages, format)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            this.db.run(sql, [
                comic.title,
                comic.issue_number,
                comic.publisher,
                comic.release_date,
                comic.cover_url,
                comic.description,
                comic.writer,
                comic.artist,
                comic.series,
                comic.url,
                comic.price,
                comic.rating,
                comic.pages,
                comic.format
            ], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    insertMany(comics) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`
                INSERT OR REPLACE INTO comics 
                (title, issue_number, publisher, release_date, cover_url, 
                 description, writer, artist, series, url, price, rating, pages, format)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            this.db.run('BEGIN TRANSACTION');
            try {
                for (const comic of comics) {
                    stmt.run([
                        comic.title,
                        comic.issue_number,
                        comic.publisher,
                        comic.release_date,
                        comic.cover_url,
                        comic.description,
                        comic.writer,
                        comic.artist,
                        comic.series,
                        comic.url,
                        comic.price,
                        comic.rating,
                        comic.pages,
                        comic.format
                    ]);
                }
                stmt.finalize();
                this.db.run('COMMIT', function(err) {
                    if (err) reject(err);
                    else resolve();
                });
            } catch (error) {
                this.db.run('ROLLBACK');
                reject(error);
            }
        });
    }

    getAllComics() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM comics ORDER BY scraped_at DESC', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getComicByTitle(title) {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM comics WHERE title LIKE ? ORDER BY scraped_at DESC',
                [`%${title}%`],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    getComicByPublisher(publisher) {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM comics WHERE publisher = ? ORDER BY release_date DESC',
                [publisher],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    getRecentComics(limit = 10) {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM comics ORDER BY scraped_at DESC LIMIT ?',
                [limit],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    getStats() {
        return new Promise((resolve, reject) => {
            this.db.get(`
                SELECT 
                    COUNT(*) as total,
                    COUNT(DISTINCT publisher) as publishers,
                    COUNT(DISTINCT series) as series,
                    MAX(scraped_at) as last_scrape
                FROM comics
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) logger.error('Error closing database:', err.message);
            else logger.info('Database closed');
        });
    }
}

module.exports = Database;