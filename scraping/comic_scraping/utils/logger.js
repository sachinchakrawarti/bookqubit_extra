const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Load config with fallback
let config;
try {
    config = require('../config/config');
} catch (error) {
    console.error('Error loading config:', error.message);
    // Fallback config
    config = {
        logging: {
            level: 'info',
            file: path.join(__dirname, '../logs/app.log')
        }
    };
}

// Ensure config.logging exists
if (!config.logging) {
    config.logging = {
        level: 'info',
        file: path.join(__dirname, '../logs/app.log')
    };
}

const logDir = path.dirname(config.logging.file);

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir, { recursive: true });
    } catch (error) {
        console.error('Error creating log directory:', error.message);
    }
}

// Create logger
const logger = winston.createLogger({
    level: config.logging.level || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'comic-scraper' },
    transports: [
        new winston.transports.File({
            filename: config.logging.file,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

module.exports = logger;