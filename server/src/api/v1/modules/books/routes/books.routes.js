// src/api/v1/modules/books/routes/books.routes.js

import express from 'express';
import BooksController from '../controller/books.controller.js';
import { 
  validateBookQuery, 
  validateBookCreation, 
  validateBookUpdate 
} from '../validations/books.validation.js';

const router = express.Router();

// Create controller instance
const booksController = new BooksController();

// ============================================
// PUBLIC ROUTES
// ============================================

// Get all books with filters and pagination
router.get('/', validateBookQuery, booksController.getAllBooks.bind(booksController));

// Search books
router.get('/search', booksController.searchBooks.bind(booksController));

// Get featured books
router.get('/featured', booksController.getFeaturedBooks.bind(booksController));

// Get book statistics
router.get('/stats', booksController.getBookStats.bind(booksController));

// Get books by language
router.get('/language/:language', booksController.getBooksByLanguage.bind(booksController));

// Get books by author
router.get('/author/:author', booksController.getBooksByAuthor.bind(booksController));

// Get books by category
router.get('/category/:category', booksController.getBooksByCategory.bind(booksController));

// Get books by genre
router.get('/genre/:genre', booksController.getBooksByGenre.bind(booksController));

// Get books by tag
router.get('/tag/:tag', booksController.getBooksByTag.bind(booksController));

// Get book by slug
router.get('/slug/:slug', booksController.getBookBySlug.bind(booksController));

// Get book by ID
router.get('/:id', booksController.getBookById.bind(booksController));

// Get related books
router.get('/:id/related', booksController.getRelatedBooks.bind(booksController));

// ============================================
// PROTECTED ROUTES (Admin only)
// ============================================

// Create new book
router.post('/', validateBookCreation, booksController.createBook.bind(booksController));

// Update book
router.put('/:id', validateBookUpdate, booksController.updateBook.bind(booksController));

// Delete book
router.delete('/:id', booksController.deleteBook.bind(booksController));

export default router;