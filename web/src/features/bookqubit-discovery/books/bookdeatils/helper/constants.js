// src/features/bookqubit-discovery/books/bookdeatils/helpers/constants.js

/**
 * Constants for book details feature
 */

// ============================================
// BOOK STATUS
// ============================================

export const BOOK_STATUS = {
  UNREAD: 'unread',
  READING: 'reading',
  COMPLETED: 'completed',
  WANT_TO_READ: 'want_to_read',
  ON_HOLD: 'on_hold',
  DROPPED: 'dropped',
};

export const BOOK_STATUS_LABELS = {
  [BOOK_STATUS.UNREAD]: 'Unread',
  [BOOK_STATUS.READING]: 'Currently Reading',
  [BOOK_STATUS.COMPLETED]: 'Completed',
  [BOOK_STATUS.WANT_TO_READ]: 'Want to Read',
  [BOOK_STATUS.ON_HOLD]: 'On Hold',
  [BOOK_STATUS.DROPPED]: 'Dropped',
};

export const BOOK_STATUS_COLORS = {
  [BOOK_STATUS.UNREAD]: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  },
  [BOOK_STATUS.READING]: {
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-200 dark:border-sky-800',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  },
  [BOOK_STATUS.COMPLETED]: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  [BOOK_STATUS.WANT_TO_READ]: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  [BOOK_STATUS.ON_HOLD]: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  },
  [BOOK_STATUS.DROPPED]: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
};

// ============================================
// BOOK CATEGORIES
// ============================================

export const BOOK_CATEGORIES = {
  FICTION: 'Fiction',
  NON_FICTION: 'Non-Fiction',
  SCIENCE_FICTION: 'Science Fiction',
  FANTASY: 'Fantasy',
  MYSTERY: 'Mystery',
  ROMANCE: 'Romance',
  THRILLER: 'Thriller',
  HORROR: 'Horror',
  SELF_HELP: 'Self-Help',
  BIOGRAPHY: 'Biography',
  HISTORY: 'History',
  PHILOSOPHY: 'Philosophy',
  POETRY: 'Poetry',
  DRAMA: 'Drama',
  CHILDREN: "Children's",
  YOUNG_ADULT: 'Young Adult',
  GRAPHIC_NOVEL: 'Graphic Novel',
  SCIENCE: 'Science',
  BUSINESS: 'Business',
  TECHNOLOGY: 'Technology',
  TRAVEL: 'Travel',
  COOKING: 'Cooking',
  ART: 'Art',
  MUSIC: 'Music',
  SPORTS: 'Sports',
  HEALTH: 'Health',
  PSYCHOLOGY: 'Psychology',
  RELIGION: 'Religion',
  EDUCATION: 'Education',
  REFERENCE: 'Reference',
};

export const BOOK_CATEGORY_COLORS = {
  [BOOK_CATEGORIES.FICTION]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  [BOOK_CATEGORIES.NON_FICTION]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [BOOK_CATEGORIES.SCIENCE_FICTION]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  [BOOK_CATEGORIES.FANTASY]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  [BOOK_CATEGORIES.MYSTERY]: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  [BOOK_CATEGORIES.ROMANCE]: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  [BOOK_CATEGORIES.THRILLER]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  [BOOK_CATEGORIES.HORROR]: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400',
  [BOOK_CATEGORIES.SELF_HELP]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  [BOOK_CATEGORIES.BIOGRAPHY]: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  [BOOK_CATEGORIES.HISTORY]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  [BOOK_CATEGORIES.PHILOSOPHY]: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
  [BOOK_CATEGORIES.POETRY]: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  [BOOK_CATEGORIES.DRAMA]: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
  [BOOK_CATEGORIES.CHILDREN]: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  [BOOK_CATEGORIES.YOUNG_ADULT]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  [BOOK_CATEGORIES.GRAPHIC_NOVEL]: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400',
  [BOOK_CATEGORIES.SCIENCE]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [BOOK_CATEGORIES.BUSINESS]: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400',
  [BOOK_CATEGORIES.TECHNOLOGY]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  [BOOK_CATEGORIES.TRAVEL]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  [BOOK_CATEGORIES.COOKING]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  [BOOK_CATEGORIES.ART]: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  [BOOK_CATEGORIES.MUSIC]: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
  [BOOK_CATEGORIES.SPORTS]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  [BOOK_CATEGORIES.HEALTH]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  [BOOK_CATEGORIES.PSYCHOLOGY]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  [BOOK_CATEGORIES.RELIGION]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  [BOOK_CATEGORIES.EDUCATION]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  [BOOK_CATEGORIES.REFERENCE]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
};

// ============================================
// BOOK FORMATS
// ============================================

export const BOOK_FORMATS = {
  HARDCOVER: 'Hardcover',
  PAPERBACK: 'Paperback',
  EBOOK: 'Ebook',
  AUDIOBOOK: 'Audiobook',
  KINDLE: 'Kindle Edition',
  EPUB: 'EPUB',
  PDF: 'PDF',
  MOBI: 'MOBI',
  SPIRAL_BOUND: 'Spiral Bound',
  BOARD_BOOK: 'Board Book',
  MASS_MARKET: 'Mass Market Paperback',
  LIBRARY_BINDING: 'Library Binding',
};

// ============================================
// BOOK LANGUAGES
// ============================================

export const BOOK_LANGUAGES = {
  ENGLISH: 'English',
  SPANISH: 'Spanish',
  FRENCH: 'French',
  GERMAN: 'German',
  CHINESE: 'Chinese',
  JAPANESE: 'Japanese',
  KOREAN: 'Korean',
  RUSSIAN: 'Russian',
  ARABIC: 'Arabic',
  HINDI: 'Hindi',
  BENGALI: 'Bengali',
  PORTUGUESE: 'Portuguese',
  ITALIAN: 'Italian',
  DUTCH: 'Dutch',
  POLISH: 'Polish',
  TURKISH: 'Turkish',
  VIETNAMESE: 'Vietnamese',
  THAI: 'Thai',
  INDONESIAN: 'Indonesian',
  SWEDISH: 'Swedish',
  NORWEGIAN: 'Norwegian',
  DANISH: 'Danish',
  FINNISH: 'Finnish',
  GREEK: 'Greek',
  HEBREW: 'Hebrew',
  PERSIAN: 'Persian',
  URDU: 'Urdu',
  TAMIL: 'Tamil',
  TELUGU: 'Telugu',
  MALAYALAM: 'Malayalam',
  KANNADA: 'Kannada',
  MARATHI: 'Marathi',
  GUJARATI: 'Gujarati',
  PUNJABI: 'Punjabi',
};

// ============================================
// READING LEVELS
// ============================================

export const READING_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
  CHILDREN: "Children's",
  YOUNG_ADULT: 'Young Adult',
  ADULT: 'Adult',
};

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536,
};

export const BREAKPOINT_LABELS = {
  [BREAKPOINTS.MOBILE]: 'mobile',
  [BREAKPOINTS.TABLET]: 'tablet',
  [BREAKPOINTS.DESKTOP]: 'desktop',
  [BREAKPOINTS.LARGE_DESKTOP]: 'large_desktop',
};

// ============================================
// ANIMATION DURATIONS
// ============================================

export const ANIMATION_DURATIONS = {
  FAST: 150,
  MEDIUM: 300,
  SLOW: 500,
  VERY_SLOW: 800,
  PAGE_TRANSITION: 400,
  MODAL: 300,
  TOAST: 300,
  TOOLTIP: 200,
};

// ============================================
// DEBOUNCE DELAYS
// ============================================

export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  RESIZE: 200,
  SCROLL: 100,
  TYPE: 500,
  SAVE: 500,
  AUTO_SAVE: 1000,
};

// ============================================
// PAGINATION
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  REVIEWS_PAGE_SIZE: 10,
  NEWS_PAGE_SIZE: 6,
  BLOG_PAGE_SIZE: 6,
  RELATED_BOOKS_LIMIT: 4,
  MAX_DISPLAY_HIGHLIGHTS: 4,
  MAX_DISPLAY_SUBJECTS: 6,
  MAX_DISPLAY_TAGS: 12,
};

// ============================================
// STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  WISHLIST: 'bookqubit_wishlist',
  COLLECTION: 'bookqubit_collection',
  SAVED_BOOKS: 'bookqubit_saved_books',
  LIKED_BOOKS: 'bookqubit_liked_books',
  BOOK_STATUS: (id) => `bookqubit_status_${id}`,
  BOOK_PROGRESS: (id) => `bookqubit_progress_${id}`,
  RECENTLY_VIEWED: 'bookqubit_recently_viewed',
  READING_HISTORY: 'bookqubit_reading_history',
  PREFERENCES: 'bookqubit_preferences',
  THEME: 'bookqubit_theme',
  LANGUAGE: 'bookqubit_language',
};

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  HOME: '/',
  BOOKS: '/books',
  BOOK_DETAILS: (slug) => `/books/${slug}`,
  SEARCH: '/search',
  CATEGORY: '/category',
  CATEGORY_DETAILS: (category) => `/category/${category}`,
  AUTHOR: '/authors',
  AUTHOR_DETAILS: (author) => `/authors/${author}`,
  COLLECTION: '/collection',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  NEWS: '/news',
};

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  BOOKS: '/api/books',
  BOOK_DETAILS: (id) => `/api/books/${id}`,
  RELATED_BOOKS: (id) => `/api/books/${id}/related`,
  REVIEWS: (id) => `/api/books/${id}/reviews`,
  NEWS: (id) => `/api/books/${id}/news`,
  BLOG: (id) => `/api/books/${id}/blog`,
  WISHLIST: '/api/wishlist',
  COLLECTION: '/api/collection',
  USER_STATUS: '/api/user/status',
  SEARCH: '/api/search',
  CATEGORIES: '/api/categories',
  AUTHORS: '/api/authors',
};

// ============================================
// MESSAGES
// ============================================

export const MESSAGES = {
  BOOK_ADDED_WISHLIST: 'Book added to wishlist',
  BOOK_REMOVED_WISHLIST: 'Book removed from wishlist',
  BOOK_ADDED_COLLECTION: 'Book added to collection',
  BOOK_REMOVED_COLLECTION: 'Book removed from collection',
  BOOK_SAVED: 'Book saved successfully',
  BOOK_UNSAVED: 'Book unsaved',
  BOOK_LIKED: 'Book liked',
  BOOK_UNLIKED: 'Book unliked',
  STATUS_UPDATED: 'Status updated successfully',
  SHARE_SUCCESS: 'Link copied to clipboard',
  SHARE_FAILED: 'Failed to share',
  REPORT_SUCCESS: 'Report submitted successfully',
  REPORT_FAILED: 'Failed to submit report',
  DOWNLOAD_SUCCESS: 'Download started',
  DOWNLOAD_FAILED: 'Download failed',
  PRINT_SUCCESS: 'Printing...',
  ERROR_GENERAL: 'Something went wrong. Please try again.',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  ERROR_SERVER: 'Server error. Please try again later.',
  ERROR_NOT_FOUND: 'Book not found',
};

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULTS = {
  BOOK_IMAGE: '/images/default-book-cover.jpg',
  AVATAR_IMAGE: '/images/default-avatar.png',
  BOOK_RATING: 0,
  BOOK_PAGES: 0,
  BOOK_PROGRESS: 0,
  REVIEWS_PER_PAGE: 10,
  NEWS_PER_PAGE: 6,
  BLOG_PER_PAGE: 6,
  RELATED_BOOKS_LIMIT: 4,
  SEARCH_DEBOUNCE: 300,
  AUTO_SAVE_DELAY: 1000,
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300,
};

// ============================================
// EXPORT ALL
// ============================================

const constants = {
  BOOK_STATUS,
  BOOK_STATUS_LABELS,
  BOOK_STATUS_COLORS,
  BOOK_CATEGORIES,
  BOOK_CATEGORY_COLORS,
  BOOK_FORMATS,
  BOOK_LANGUAGES,
  READING_LEVELS,
  BREAKPOINTS,
  BREAKPOINT_LABELS,
  ANIMATION_DURATIONS,
  DEBOUNCE_DELAYS,
  PAGINATION,
  STORAGE_KEYS,
  ROUTES,
  API_ENDPOINTS,
  MESSAGES,
  DEFAULTS,
};

export default constants;