// src/features/bookqubit-readers/collective-library/index.js

// Export main components
export { default as CollectiveLibrary } from "./components/CollectiveLibrary";
export { default as CollectiveLibraryPage } from "./CollectiveLibraryPage";
export { default as CreateLibrary } from "./components/CreateLibrary";
export { default as LibraryActions } from "./components/LibraryActions";
export { default as LibraryCard } from "./components/LibraryCard";
export { default as LibraryDetail } from "./components/LibraryDetail";
export { default as LibraryStats } from "./components/LibraryStats";

// Export data and utilities
export {
  mockLibraries,
  getFeaturedLibraries,
  getTrendingLibraries,
  getLibrariesByCategory,
  getLibraryById,
  getCategories,
} from "./data/mockLibraries";