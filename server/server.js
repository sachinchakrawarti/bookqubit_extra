// ============================================
// BOOKQUBIT AUTHOR API SERVER
// SIMPLIFIED WORKING VERSION
// ============================================

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// TEST ROUTE - Check if server is working
// ============================================
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'BookQubit Author API is running!',
        endpoints: {
            authors: '/api/authors',
            health: '/health'
        }
    });
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// AUTHORS ROUTE - Test with mock data
// ============================================
app.get('/api/authors', (req, res) => {
    const lang = req.query.lang || 'en';
    
    const mockAuthors = [
        {
            id: 1,
            name: 'Bhagat Singh',
            translated_name: lang === 'hi' ? 'भगत सिंह' : null,
            nationality: 'Indian',
            rating: 4.8,
            total_books: 5,
            language: 'english'
        },
        {
            id: 2,
            name: 'Yuval Noah Harari',
            translated_name: lang === 'hi' ? 'युवाल नोआ हरारी' : null,
            nationality: 'Israeli',
            rating: 4.7,
            total_books: 8,
            language: 'english'
        },
        {
            id: 3,
            name: 'B.R. Ambedkar',
            translated_name: lang === 'hi' ? 'डॉ. भीमराव आंबेडकर' : null,
            nationality: 'Indian',
            rating: 4.9,
            total_books: 12,
            language: 'english'
        },
        {
            id: 4,
            name: 'Osho',
            translated_name: lang === 'hi' ? 'ओशो' : null,
            nationality: 'Indian',
            rating: 4.6,
            total_books: 20,
            language: 'english'
        },
        {
            id: 5,
            name: 'Jared Diamond',
            translated_name: lang === 'hi' ? 'जेरेड डायमंड' : null,
            nationality: 'American',
            rating: 4.7,
            total_books: 6,
            language: 'english'
        }
    ];

    const message = lang === 'hi' ? 'सफलता' : 'Success';
    
    res.json({
        status: 'success',
        message: message,
        data: {
            authors: mockAuthors,
            pagination: {
                page: 1,
                limit: 10,
                total: mockAuthors.length,
                totalPages: 1
            }
        },
        lang: lang,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// AUTHOR BY ID
// ============================================
app.get('/api/authors/:id', (req, res) => {
    const lang = req.query.lang || 'en';
    const { id } = req.params;
    
    // Mock data for single author
    const author = {
        id: parseInt(id),
        name: 'Bhagat Singh',
        translated_name: lang === 'hi' ? 'भगत सिंह' : null,
        nationality: 'Indian',
        rating: 4.8,
        total_books: 5,
        language: 'english',
        bio: lang === 'hi' 
            ? 'भारतीय क्रांतिकारी और स्वतंत्रता सेनानी। "मैं नास्तिक क्यों हूँ" के लेखक।'
            : 'Indian revolutionary and freedom fighter. Author of "Why I Am an Atheist".'
    };
    
    res.json({
        status: 'success',
        message: lang === 'hi' ? 'सफलता' : 'Success',
        data: author,
        lang: lang,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
    const lang = req.query.lang || 'en';
    const message = lang === 'hi' ? 'मार्ग नहीं मिला' : 'Route not found';
    res.status(404).json({
        status: 'error',
        message: message,
        code: 'ROUTE_NOT_FOUND',
        lang: lang,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`\n🚀 BookQubit Author API running on http://localhost:${PORT}`);
    console.log(`📖 Test: http://localhost:${PORT}/api/authors`);
    console.log(`🇮🇳 Hindi: http://localhost:${PORT}/api/authors?lang=hi`);
    console.log(`✅ Server ready!\n`);
});