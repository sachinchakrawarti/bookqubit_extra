const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = 3000;

// Database path
const DB_PATH = path.join(__dirname, '../data/comic.db');

console.log(`📁 Database path: ${DB_PATH}`);

// Check if database exists
if (!fs.existsSync(DB_PATH)) {
    console.warn('⚠️ Database not found!');
}

// Serve static files from web folder
app.use(express.static(path.join(__dirname, '../web')));
app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Helper function to get database connection
function getDb() {
    return new sqlite3.Database(DB_PATH);
}

// Health check
app.get('/api/health', (req, res) => {
    const dbExists = fs.existsSync(DB_PATH);
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: {
            path: DB_PATH,
            exists: dbExists
        }
    });
});

// Get all comics
app.get('/api/comics', async (req, res) => {
    let db = null;
    try {
        console.log('📚 Fetching comics...');
        db = getDb();
        
        const comics = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM comics ORDER BY scraped_at DESC', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Found ${comics.length} comics`);
        res.json(comics);
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch comics',
            details: error.message 
        });
    } finally {
        if (db) db.close();
    }
});

// Search comics
app.get('/api/search', async (req, res) => {
    let db = null;
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]);
        }
        
        console.log(`🔍 Searching: "${query}"`);
        db = getDb();
        
        const comics = await new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM comics 
                 WHERE title LIKE ? 
                 OR publisher LIKE ? 
                 OR series LIKE ? 
                 OR description LIKE ?
                 ORDER BY scraped_at DESC`,
                [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        console.log(`✅ Found ${comics.length} results`);
        res.json(comics);
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: 'Failed to search' });
    } finally {
        if (db) db.close();
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    let db = null;
    try {
        db = getDb();
        
        const stats = await new Promise((resolve, reject) => {
            db.get(`
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
        
        res.json(stats);
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: 'Failed to get stats' });
    } finally {
        if (db) db.close();
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ Server running at http://localhost:${PORT}`);
    console.log(`📊 View comics at http://localhost:${PORT}`);
    console.log(`📁 Database: ${DB_PATH}\n`);
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    process.exit(0);
});