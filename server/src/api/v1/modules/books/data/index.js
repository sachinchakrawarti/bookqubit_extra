// src/api/v1/modules/books/data/index.js

import BooksData_Arabic from './BooksData_Arabic.js';
import BooksData_Bangla from './BooksData_Bangla.js';
import BooksData_Chinese from './BooksData_Chinese.js';
import BooksData_English from './BooksData_English.js';
import BooksData_French from './BooksData_French.js';
import BooksData_German from './BooksData_German.js';
import BooksData_Hindi from './BooksData_Hindi.js';
import BooksData_Italian from './BooksData_Italian.js';
import BooksData_Japanese from './BooksData_Japanese.js';
import BooksData_Kannada from './BooksData_Kannada.js';
import BooksData_Korean from './BooksData_Korean.js';
import BooksData_Malayalam from './BooksData_Malayalam.js';
import BooksData_Marathi from './BooksData_Marathi.js';
import BooksData_Pashto from './BooksData_Pashto.js';
import BooksData_Persian from './BooksData_Persian.js';
import BooksData_Russian from './BooksData_Russian.js';
import BooksData_Spanish from './BooksData_Spanish.js';
import BooksData_Tamil from './BooksData_Tamil.js';
import BooksData_Telugu from './BooksData_Telugu.js';
import BooksData_Urdu from './BooksData_Urdu.js';
import Books_Cover_Data from './Books_Cover_Data.js';

// Language map - mapping language names to their data arrays
const languageMap = {
  'arabic': BooksData_Arabic,
  'bangla': BooksData_Bangla,
  'bengali': BooksData_Bangla,  // Alias for Bangla
  'chinese': BooksData_Chinese,
  'english': BooksData_English,
  'french': BooksData_French,
  'german': BooksData_German,
  'hindi': BooksData_Hindi,
  'italian': BooksData_Italian,
  'japanese': BooksData_Japanese,
  'kannada': BooksData_Kannada,
  'korean': BooksData_Korean,
  'malayalam': BooksData_Malayalam,
  'marathi': BooksData_Marathi,
  'pashto': BooksData_Pashto,
  'persian': BooksData_Persian,
  'russian': BooksData_Russian,
  'spanish': BooksData_Spanish,
  'tamil': BooksData_Tamil,
  'telugu': BooksData_Telugu,
  'urdu': BooksData_Urdu
};

// Get all books across all languages
const getAllBooks = () => {
  const allBooks = [];
  
  Object.keys(languageMap).forEach(lang => {
    const books = languageMap[lang];
    if (Array.isArray(books) && books.length > 0) {
      books.forEach(book => {
        // Ensure language is set properly
        allBooks.push({
          ...book,
          language: book.language || lang,  // Use book's language or fallback to map key
          imageUrl: Books_Cover_Data[book.imageUrl] || book.imageUrl
        });
      });
    }
  });
  
  return allBooks;
};

// Get books by language
const getBooksByLanguage = (language) => {
  const langKey = language.toLowerCase();
  const books = languageMap[langKey] || [];
  
  if (!Array.isArray(books) || books.length === 0) {
    return [];
  }
  
  return books.map(book => ({
    ...book,
    language: book.language || langKey,
    imageUrl: Books_Cover_Data[book.imageUrl] || book.imageUrl
  }));
};

// Get book by ID (search across all languages)
const getBookById = (id) => {
  const allBooks = getAllBooks();
  return allBooks.find(book => book.id === parseInt(id) || book.id === id);
};

// Get books by author
const getBooksByAuthor = (author) => {
  const allBooks = getAllBooks();
  return allBooks.filter(book => 
    book.author && book.author.toLowerCase().includes(author.toLowerCase())
  );
};

// Get books by category
const getBooksByCategory = (category) => {
  const allBooks = getAllBooks();
  return allBooks.filter(book => 
    book.category && book.category.toLowerCase().includes(category.toLowerCase())
  );
};

// Get books by genre
const getBooksByGenre = (genre) => {
  const allBooks = getAllBooks();
  return allBooks.filter(book => 
    book.genres && Array.isArray(book.genres) && book.genres.some(g => 
      g.toLowerCase().includes(genre.toLowerCase())
    )
  );
};

// Get books by tag
const getBooksByTag = (tag) => {
  const allBooks = getAllBooks();
  return allBooks.filter(book => 
    book.tags && Array.isArray(book.tags) && book.tags.some(t => 
      t.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

// Search books
const searchBooks = (query) => {
  if (!query) return [];
  
  const allBooks = getAllBooks();
  const searchTerm = query.toLowerCase();
  return allBooks.filter(book => 
    (book.title && book.title.toLowerCase().includes(searchTerm)) ||
    (book.author && book.author.toLowerCase().includes(searchTerm)) ||
    (book.description && book.description.toLowerCase().includes(searchTerm)) ||
    (book.summary && book.summary.toLowerCase().includes(searchTerm))
  );
};

// Get featured books (sorted by rating)
const getFeaturedBooks = (limit = 10) => {
  const allBooks = getAllBooks();
  return allBooks
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};

// Get book statistics
const getStats = () => {
  const allBooks = getAllBooks();
  const languages = {};
  const categories = {};
  
  allBooks.forEach(book => {
    const lang = book.language || 'unknown';
    languages[lang] = (languages[lang] || 0) + 1;
    
    if (book.category) {
      categories[book.category] = (categories[book.category] || 0) + 1;
    }
  });
  
  const totalBooks = allBooks.length;
  const avgRating = totalBooks > 0 
    ? allBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / totalBooks 
    : 0;
  
  return {
    totalBooks,
    languages: Object.keys(languages).length,
    categories: Object.keys(categories).length,
    averageRating: Math.round(avgRating * 10) / 10,
    languagesList: Object.keys(languages),
    categoriesList: Object.keys(categories),
    languageCount: languages,
    categoryCount: categories
  };
};

// Debug function to check loaded data
const debugData = () => {
  console.log('📚 Book Data Debug:');
  console.log('===================');
  
  Object.keys(languageMap).forEach(lang => {
    const books = languageMap[lang];
    const count = Array.isArray(books) ? books.length : 0;
    console.log(`  ${lang}: ${count} books`);
    if (count > 0 && books[0]) {
      console.log(`    Sample: ${books[0].title || 'No title'}`);
    }
  });
  
  const total = getAllBooks();
  console.log('===================');
  console.log(`Total books across all languages: ${total.length}`);
  console.log(`Total languages: ${Object.keys(languageMap).length}`);
  
  return {
    languages: Object.keys(languageMap).map(lang => ({
      name: lang,
      count: Array.isArray(languageMap[lang]) ? languageMap[lang].length : 0
    })),
    total: total.length
  };
};

// Export all functions
export {
  languageMap,
  getAllBooks,
  getBooksByLanguage,
  getBookById,
  getBooksByAuthor,
  getBooksByCategory,
  getBooksByGenre,
  getBooksByTag,
  searchBooks,
  getFeaturedBooks,
  getStats,
  debugData
};

// Default export
export default {
  languageMap,
  getAllBooks,
  getBooksByLanguage,
  getBookById,
  getBooksByAuthor,
  getBooksByCategory,
  getBooksByGenre,
  getBooksByTag,
  searchBooks,
  getFeaturedBooks,
  getStats,
  debugData
};