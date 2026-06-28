// src/features/bookqubit-discovery/books/bookdeatils/helpers/bookHelpers.js

/**
 * Book helper utilities for the book details feature
 */

/**
 * Format book title with proper casing
 * @param {string} title - Book title
 * @returns {string} Formatted title
 */
export const formatBookTitle = (title) => {
  if (!title) return '';
  return title
    .split(' ')
    .map(word => {
      const lowercase = word.toLowerCase();
      const exceptions = ['of', 'the', 'and', 'in', 'on', 'at', 'for', 'with', 'without'];
      if (exceptions.includes(lowercase)) {
        return lowercase;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Generate slug from title
 * @param {string} title - Book title
 * @returns {string} Generated slug
 */
export const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Format author name
 * @param {string} author - Author name
 * @returns {string} Formatted author name
 */
export const formatAuthorName = (author) => {
  if (!author) return 'Unknown Author';
  
  // Handle "Last, First" format
  if (author.includes(',')) {
    const parts = author.split(',');
    return `${parts[1].trim()} ${parts[0].trim()}`;
  }
  
  return author;
};

/**
 * Get author initials
 * @param {string} author - Author name
 * @returns {string} Author initials
 */
export const getAuthorInitials = (author) => {
  if (!author) return 'U';
  const names = author.split(' ');
  if (names.length >= 2) {
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
  }
  return author.charAt(0).toUpperCase();
};

/**
 * Format page count
 * @param {number} pages - Number of pages
 * @returns {string} Formatted page count
 */
export const formatPageCount = (pages) => {
  if (!pages) return 'N/A';
  if (pages >= 1000) {
    return `${(pages / 1000).toFixed(1)}K`;
  }
  return pages.toString();
};

/**
 * Format rating
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating (default: 5)
 * @returns {string} Formatted rating
 */
export const formatRating = (rating, maxRating = 5) => {
  if (!rating) return '0';
  return `${Math.min(Math.max(rating, 0), maxRating).toFixed(1)}/${maxRating}`;
};

/**
 * Get rating percentage
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating (default: 5)
 * @returns {number} Rating percentage
 */
export const getRatingPercentage = (rating, maxRating = 5) => {
  if (!rating) return 0;
  return Math.min(Math.max((rating / maxRating) * 100, 0), 100);
};

/**
 * Generate star rating display
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating (default: 5)
 * @returns {Array} Array of star types (filled, half, empty)
 */
export const getStarRating = (rating, maxRating = 5) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      stars.push('filled');
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  return stars;
};

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type (default: 'long')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'long') => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    case 'long':
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    case 'full':
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    case 'year':
      return d.getFullYear().toString();
    case 'relative':
      return getRelativeTime(d);
    default:
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
};

/**
 * Get relative time
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
};

/**
 * Format ISBN
 * @param {string} isbn - ISBN number
 * @returns {string} Formatted ISBN
 */
export const formatISBN = (isbn) => {
  if (!isbn) return 'N/A';
  const clean = isbn.replace(/[^0-9X]/g, '');
  if (clean.length === 10) {
    return clean.replace(/(\d{1})(\d{4})(\d{4})(\d{1})/, '$1-$2-$3-$4');
  }
  if (clean.length === 13) {
    return clean.replace(/(\d{3})(\d{1})(\d{4})(\d{4})(\d{1})/, '$1-$2-$3-$4-$5');
  }
  return isbn;
};

/**
 * Get book status label
 * @param {string} status - Book status
 * @returns {string} Status label
 */
export const getBookStatusLabel = (status) => {
  const statusMap = {
    'reading': 'Currently Reading',
    'completed': 'Completed',
    'want_to_read': 'Want to Read',
    'unread': 'Unread',
    'on_hold': 'On Hold',
    'dropped': 'Dropped',
  };
  return statusMap[status] || status || 'Unknown';
};

/**
 * Get book status color
 * @param {string} status - Book status
 * @returns {string} Status color class
 */
export const getBookStatusColor = (status) => {
  const colorMap = {
    'reading': 'text-sky-500 bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800',
    'completed': 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    'want_to_read': 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    'unread': 'text-gray-500 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    'on_hold': 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    'dropped': 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };
  return colorMap[status] || 'text-gray-500 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
};

/**
 * Get category color
 * @param {string} category - Book category
 * @returns {string} Category color class
 */
export const getCategoryColor = (category) => {
  const colorMap = {
    'Fiction': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Non-Fiction': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Science Fiction': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Fantasy': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Mystery': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    'Romance': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    'Thriller': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'Self-Help': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    'Biography': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    'History': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  };
  return colorMap[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 100)
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
};

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @param {number} count - Number of keywords to extract (default: 10)
 * @returns {Array} Array of keywords
 */
export const extractKeywords = (text, count = 10) => {
  if (!text) return [];
  
  // Remove punctuation and split
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/);
  
  // Count frequency
  const frequency = {};
  const stopwords = new Set(['the', 'a', 'an', 'of', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'in', 'as', 'is', 'was', 'were', 'be', 'been', 'being']);
  
  words.forEach(word => {
    if (!stopwords.has(word) && word.length > 2) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and take top N
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(entry => entry[0]);
};

/**
 * Get reading time in minutes
 * @param {number} wordCount - Number of words
 * @param {number} wpm - Words per minute (default: 200)
 * @returns {number} Reading time in minutes
 */
export const getReadingTime = (wordCount, wpm = 200) => {
  if (!wordCount || wordCount <= 0) return 0;
  return Math.ceil(wordCount / wpm);
};

/**
 * Format reading time
 * @param {number} minutes - Reading time in minutes
 * @returns {string} Formatted reading time
 */
export const formatReadingTime = (minutes) => {
  if (!minutes || minutes <= 0) return 'Less than 1 min';
  if (minutes < 60) return `${minutes} min read`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr read`;
  return `${hours} hr ${remainingMinutes} min read`;
};

/**
 * Calculate word count from text
 * @param {string} text - Text to count words from
 * @returns {number} Word count
 */
export const getWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

/**
 * Get book metadata
 * @param {Object} book - Book object
 * @returns {Object} Book metadata
 */
export const getBookMetadata = (book) => {
  if (!book) return {};
  
  return {
    title: book.title,
    author: book.author,
    slug: book.slug,
    category: book.category,
    genre: book.genre,
    rating: book.rating,
    reviewCount: book.reviewCount,
    pageCount: book.pageCount,
    language: book.language,
    publisher: book.publisher,
    publishedDate: book.publishedDate,
    isbn: book.isbn,
    imageUrl: book.imageUrl,
    description: book.description,
    status: book.status,
  };
};

/**
 * Check if book is in a specific status
 * @param {Object} book - Book object
 * @param {string} status - Status to check
 * @returns {boolean} True if book matches status
 */
export const isBookStatus = (book, status) => {
  if (!book) return false;
  return book.status === status;
};

/**
 * Check if book is completed
 * @param {Object} book - Book object
 * @returns {boolean} True if book is completed
 */
export const isBookCompleted = (book) => {
  return isBookStatus(book, 'completed');
};

/**
 * Check if book is currently reading
 * @param {Object} book - Book object
 * @returns {boolean} True if book is currently reading
 */
export const isBookReading = (book) => {
  return isBookStatus(book, 'reading');
};

/**
 * Check if book is in wishlist
 * @param {Object} book - Book object
 * @returns {boolean} True if book is in wishlist
 */
export const isBookInWishlist = (book) => {
  if (!book) return false;
  return book.isInWishlist || false;
};

/**
 * Check if book is in collection
 * @param {Object} book - Book object
 * @returns {boolean} True if book is in collection
 */
export const isBookInCollection = (book) => {
  if (!book) return false;
  return book.isInCollection || false;
};

/**
 * Get book progress percentage
 * @param {Object} book - Book object
 * @returns {number} Progress percentage
 */
export const getBookProgress = (book) => {
  if (!book) return 0;
  return Math.min(Math.max(book.progress || 0, 0), 100);
};

/**
 * Get book share URL
 * @param {Object} book - Book object
 * @param {string} language - Language code
 * @param {string} baseUrl - Base URL
 * @returns {string} Share URL
 */
export const getBookShareUrl = (book, language = 'en', baseUrl = '') => {
  if (!book) return '';
  const slug = book.slug || generateSlug(book.title);
  return `${baseUrl}/${language}/books/${slug}`;
};

/**
 * Get book share text
 * @param {Object} book - Book object
 * @param {string} language - Language code
 * @returns {string} Share text
 */
export const getBookShareText = (book, language = 'en') => {
  if (!book) return '';
  const title = book.title;
  const author = book.author;
  const url = getBookShareUrl(book, language);
  return `Check out "${title}" by ${author}\n\n${url}`;
};

// Export all functions as a group
const bookHelpers = {
  formatBookTitle,
  generateSlug,
  formatAuthorName,
  getAuthorInitials,
  formatPageCount,
  formatRating,
  getRatingPercentage,
  getStarRating,
  formatDate,
  getRelativeTime,
  formatISBN,
  getBookStatusLabel,
  getBookStatusColor,
  getCategoryColor,
  truncateText,
  extractKeywords,
  getReadingTime,
  formatReadingTime,
  getWordCount,
  getBookMetadata,
  isBookStatus,
  isBookCompleted,
  isBookReading,
  isBookInWishlist,
  isBookInCollection,
  getBookProgress,
  getBookShareUrl,
  getBookShareText,
};

export default bookHelpers;