// src/features/bookqubit-discovery/books/bookdeatils/hooks/useBookData.js

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom hook to fetch and manage book data
 * @param {Object} options - Configuration options
 * @param {string} options.initialSlug - Initial book slug
 * @param {Object} options.initialBook - Initial book data (for SSR)
 * @param {string} options.language - Current language
 * @param {Function} options.fetchBooks - Function to fetch books
 * @returns {Object} Book data state and functions
 */
export const useBookData = ({
  initialSlug,
  initialBook,
  language = "en",
  fetchBooks,
}) => {
  const pathname = usePathname();
  const [book, setBook] = useState(initialBook || null);
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  // Get language from URL
  const getLanguageFromURL = useCallback(() => {
    const segments = pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    const supportedLanguages = [
      "en",
      "es",
      "fr",
      "de",
      "ja",
      "zh",
      "hi",
      "ar",
      "ur",
      "bn",
      "pt",
      "ru",
      "it",
      "ko",
      "nl",
      "tr",
      "vi",
      "th",
      "pl",
      "sv",
      "ta",
      "te",
      "ml",
      "kn",
      "mr",
    ];
    if (firstSegment && supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    return language || "en";
  }, [pathname, language]);

  const currentLanguage = getLanguageFromURL();

  // Load books based on language
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const loadBooks = async () => {
      try {
        let books = [];
        if (fetchBooks) {
          books = await fetchBooks(currentLanguage);
        } else {
          // If no fetch function provided, try to import dynamically
          try {
            const { getBooksByLanguage } = await import("@/data/books");
            books = getBooksByLanguage(currentLanguage);
          } catch (importError) {
            console.warn("Failed to import books data:", importError);
            // Fallback to initialBook if available
            if (initialBook) {
              books = [initialBook];
            }
          }
        }
        setBooksData(books || []);
      } catch (err) {
        setError(err.message || "Failed to load books");
        console.error("Error loading books:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [currentLanguage, fetchBooks, initialBook]);

  // Find book by slug
  const findBookBySlug = useCallback(
    (slug, books) => {
      if (!slug || !books || books.length === 0) return null;

      const urlSlug = slug?.toLowerCase().trim();

      return (
        books.find((book) => {
          // Check regular slug
          const bookSlug = book.slug?.toLowerCase().trim();
          if (bookSlug === urlSlug) return true;

          // Check language-specific slug
          const langSlug = book[`${currentLanguage}Slug`]?.toLowerCase().trim();
          if (langSlug && langSlug === urlSlug) return true;

          // Check if slug matches ID
          if (!isNaN(slug) && book.id === parseInt(slug)) return true;

          // Generate slug from title as fallback
          const generatedSlug = book.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return generatedSlug === urlSlug;
        }) || null
      );
    },
    [currentLanguage]
  );

  // Find book when slug or booksData changes
  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
      setIsLoading(false);
      return;
    }

    if (initialSlug && booksData.length > 0 && !isRedirecting && !isLoading) {
      const foundBook = findBookBySlug(initialSlug, booksData);
      setBook(foundBook);
      if (!foundBook) {
        setError("Book not found");
      }
    }
  }, [initialSlug, booksData, isRedirecting, isLoading, initialBook, findBookBySlug]);

  // Find related books
  useEffect(() => {
    if (!book || booksData.length === 0) {
      setRelatedBooks([]);
      return;
    }

    // Find books by same author
    const byAuthor = booksData
      .filter(
        (b) =>
          b.author === book.author &&
          b.id !== book.id &&
          b.slug !== book.slug
      )
      .slice(0, 4);

    // Find books by same category
    const byCategory = booksData
      .filter(
        (b) =>
          b.category === book.category &&
          b.id !== book.id &&
          b.slug !== book.slug
      )
      .slice(0, 4);

    // Combine and remove duplicates
    const allRelated = [...byAuthor, ...byCategory];
    const uniqueBooks = new Map();
    allRelated.forEach((b) => {
      if (!uniqueBooks.has(b.id)) {
        uniqueBooks.set(b.id, b);
      }
    });

    setRelatedBooks(Array.from(uniqueBooks.values()).slice(0, 4));
  }, [book, booksData]);

  // Reset book when language changes
  useEffect(() => {
    if (!initialBook) {
      setBook(null);
      setIsRedirecting(false);
    }
  }, [currentLanguage, initialBook]);

  // Handle redirect from ID to slug URL
  useEffect(() => {
    if (
      !initialBook &&
      book &&
      book.slug &&
      !isNaN(initialSlug) &&
      !isRedirecting
    ) {
      setIsRedirecting(true);
      const targetSlug =
        currentLanguage === "hi" && book.hindiSlug ? book.hindiSlug : book.slug;
      return targetSlug;
    }
  }, [book, initialSlug, isRedirecting, initialBook, currentLanguage]);

  // Refetch book data
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let books = [];
      if (fetchBooks) {
        books = await fetchBooks(currentLanguage);
      } else {
        try {
          const { getBooksByLanguage } = await import("@/data/books");
          books = getBooksByLanguage(currentLanguage);
        } catch (importError) {
          console.warn("Failed to import books data:", importError);
          if (initialBook) {
            books = [initialBook];
          }
        }
      }
      setBooksData(books || []);
      if (initialSlug) {
        const foundBook = findBookBySlug(initialSlug, books);
        setBook(foundBook);
        if (!foundBook) {
          setError("Book not found");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to refetch books");
      console.error("Error refetching books:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, fetchBooks, initialBook, initialSlug, findBookBySlug]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setBook(initialBook || null);
    setBooksData([]);
    setIsLoading(true);
    setIsRedirecting(false);
    setError(null);
    setRelatedBooks([]);
  }, [initialBook]);

  return {
    book,
    booksData,
    relatedBooks,
    isLoading,
    isRedirecting,
    error,
    currentLanguage,
    refetch,
    clearError,
    reset,
    findBookBySlug,
  };
};

export default useBookData;