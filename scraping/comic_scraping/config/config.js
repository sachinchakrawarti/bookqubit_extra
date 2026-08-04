const path = require('path');
require('dotenv').config();

const config = {
    database: {
        path: process.env.DB_PATH || path.join(__dirname, '../data/comic.db')
    },
    scraping: {
        interval: parseInt(process.env.SCRAPE_INTERVAL) || 3600000,
        maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
        timeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
        userAgent: process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || path.join(__dirname, '../logs/app.log')
    },
    apis: {
        comicVine: {
            url: process.env.COMIC_VINE_API_URL || 'https://comicvine.gamespot.com/api',
            key: process.env.COMIC_VINE_API_KEY || ''
        },
        comicBookResources: {
            url: process.env.COMIC_BOOK_RESOURCES_URL || 'https://www.comicbookresources.com'
        }
    }
};

module.exports = config;