// src/api/v1/modules/books/routes/books.routes.js
const express = require('express');
const { BooksController } = require('../controller/books.controller');

const router = express.Router();
const booksController = new BooksController();

// ==================== PUBLIC ROUTES ====================

// Search books - MUST come before /:id
router.get('/search', (req, res, next) => {
  booksController.searchBooks(req, res, next);
});

// Featured books
router.get('/featured', (req, res, next) => {
  booksController.getFeaturedBooks(req, res, next);
});

// Book statistics
router.get('/stats', (req, res, next) => {
  booksController.getBookStats(req, res, next);
});

// Get books by category
router.get('/category/:category', (req, res, next) => {
  booksController.getBooksByCategory(req, res, next);
});

// Get books by author
router.get('/author/:author', (req, res, next) => {
  booksController.getBooksByAuthor(req, res, next);
});

// Get book by slug - MUST come before /:id
router.get('/slug/:slug', (req, res, next) => {
  booksController.getBookBySlug(req, res, next);
});

// Get book by ID - This should come LAST
router.get('/:id', (req, res, next) => {
  booksController.getBookById(req, res, next);
});

// Get all books - This should be the base route
router.get('/', (req, res, next) => {
  booksController.getAllBooks(req, res, next);
});

// ==================== ADMIN ROUTES ====================

// Create new book (Admin only)
router.post('/', (req, res, next) => {
  booksController.createBook(req, res, next);
});

// Update book (Admin only)
router.put('/:id', (req, res, next) => {
  booksController.updateBook(req, res, next);
});

// Delete book (Admin only)
router.delete('/:id', (req, res, next) => {
  booksController.deleteBook(req, res, next);
});

module.exports = { booksRouter: router };