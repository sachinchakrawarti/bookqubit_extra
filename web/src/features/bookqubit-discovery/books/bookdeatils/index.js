// src/features/bookqubit-discovery/books/bookdeatils/index.js

/**
 * Book Details Feature - Main Exports
 * Central export file for all book details components
 */

// Main Component
export { default as BookDetails } from './bookdeatils';

// Shared Components
export { default as BookHeader } from './components/shared/BookHeader';
export { default as BookCover } from './components/shared/BookCover';
export { default as BookActions } from './components/shared/BookActions';
export { default as BookNotFound } from './components/shared/BookNotFound';
export { default as BookLoading } from './components/shared/BookLoading';
export { default as BookError } from './components/shared/BookError';

// Section Components
export { default as BookHighlights } from './components/sections/BookHighlights';
export { default as BookSubjects } from './components/sections/BookSubjects';
export { default as BookPublication } from './components/sections/BookPublication';
export { default as BookAbout } from './components/sections/BookAbout';
export { default as BookSummary } from './components/sections/BookSummary';
export { default as BookReviews } from './components/sections/BookReviews';
export { default as BookNews } from './components/sections/BookNews';
export { default as BookBlog } from './components/sections/BookBlog';
export { default as BookRelated } from './components/sections/BookRelated';
export { default as BookAnalytics } from './components/sections/BookAnalytics';
export { default as BookTags } from './components/sections/BookTags';

// Mobile Components
export { default as MobileBookCover } from './components/mobile/MobileBookCover';
export { default as MobileNavigator } from './components/mobile/MobileNavigator';
export { default as MobileBottomSheet } from './components/mobile/MobileBottomSheet';
export { default as MobileSectionsList } from './components/mobile/MobileSectionsList';

// Desktop Components
export { default as DesktopBookCover } from './components/desktop/DesktopBookCover';
export { default as DesktopNavigator } from './components/desktop/DesktopNavigator';
export { default as DesktopSectionsGrid } from './components/desktop/DesktopSectionsGrid';

// Card Components
export { default as RelatedBookCard } from './components/cards/RelatedBookCard';
export { default as NewsCard } from './components/cards/NewsCard';
export { default as BlogCard } from './components/cards/BlogCard';
export { default as ReviewCard } from './components/cards/ReviewCard';

// Modal Components
export { default as BookShareModal } from './components/modals/BookShareModal';
export { default as BookReportModal } from './components/modals/BookReportModal';

// Hooks
export { default as useBookData } from './hooks/useBookData';
export { default as useBookNavigation } from './hooks/useBookNavigation';
export { default as useBookActions } from './hooks/useBookActions';
export { default as useSEO } from './hooks/useSEO';
export { default as useSectionObserver } from './hooks/useSectionObserver';
export { default as useMobileDetection } from './hooks/useMobileDetection';
export { default as useMediaQuery } from './hooks/useMediaQuery';

// Helpers
export * from './helpers/bookHelpers';
export * from './helpers/sectionConfig';
export * from './helpers/constants';
export * from './helpers/responsive';

// Data
export * from './data/mockData';

// Default export
export default BookDetails;