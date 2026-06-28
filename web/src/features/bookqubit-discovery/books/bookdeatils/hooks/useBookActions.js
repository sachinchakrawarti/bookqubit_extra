// src/features/bookqubit-discovery/books/bookdeatils/hooks/useBookActions.js

"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Custom hook for book actions (wishlist, save, share, etc.)
 * @param {Object} options - Configuration options
 * @param {Object} options.book - Current book object
 * @param {string} options.language - Current language
 * @param {Function} options.onAction - Callback for actions
 * @param {Function} options.onError - Callback for errors
 * @returns {Object} Action functions and state
 */
export const useBookActions = ({
  book = null,
  language = "en",
  onAction = null,
  onError = null,
}) => {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCollection, setIsInCollection] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookStatus, setBookStatus] = useState("unread");
  const [error, setError] = useState(null);
  const [actionHistory, setActionHistory] = useState([]);

  // Load initial states from localStorage or API
  useEffect(() => {
    if (!book) return;

    const loadStates = async () => {
      try {
        // Check if book is in wishlist
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsInWishlist(wishlist.includes(book.id));

        // Check if book is in collection
        const collection = JSON.parse(localStorage.getItem("collection") || "[]");
        setIsInCollection(collection.includes(book.id));

        // Check if book is saved
        const saved = JSON.parse(localStorage.getItem("savedBooks") || "[]");
        setIsSaved(saved.includes(book.id));

        // Check if book is liked
        const liked = JSON.parse(localStorage.getItem("likedBooks") || "[]");
        setIsLiked(liked.includes(book.id));

        // Get book status
        const status = localStorage.getItem(`bookStatus_${book.id}`) || "unread";
        setBookStatus(status);
      } catch (err) {
        console.warn("Failed to load book states:", err);
      }
    };

    loadStates();
  }, [book]);

  // Handle action with error handling
  const handleAction = useCallback(
    async (action, payload) => {
      if (!book) return;

      setIsLoading(true);
      setError(null);

      try {
        // Call the action
        let result = null;

        switch (action) {
          case "wishlist":
            result = await toggleWishlist(payload);
            break;
          case "collection":
            result = await toggleCollection(payload);
            break;
          case "save":
            result = await toggleSave(payload);
            break;
          case "like":
            result = await toggleLike(payload);
            break;
          case "status":
            result = await updateStatus(payload);
            break;
          default:
            throw new Error(`Unknown action: ${action}`);
        }

        // Add to history
        setActionHistory((prev) => [
          ...prev,
          { action, payload, timestamp: new Date().toISOString() },
        ]);

        // Call onAction callback
        if (onAction) {
          onAction(action, payload, result);
        }

        return result;
      } catch (err) {
        setError(err.message);
        if (onError) {
          onError(err);
        }
        console.error(`Error executing ${action}:`, err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [book, onAction, onError]
  );

  // Toggle wishlist
  const toggleWishlist = useCallback(
    async (bookId) => {
      if (!book) return;

      const newState = !isInWishlist;
      setIsInWishlist(newState);

      try {
        // Save to localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (newState) {
          if (!wishlist.includes(bookId)) {
            wishlist.push(bookId);
          }
        } else {
          const index = wishlist.indexOf(bookId);
          if (index > -1) {
            wishlist.splice(index, 1);
          }
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // In a real app, you would call an API
        // await fetch(`/api/books/${bookId}/wishlist`, { method: newState ? 'POST' : 'DELETE' });

        return { bookId, isInWishlist: newState };
      } catch (err) {
        // Revert on error
        setIsInWishlist(!newState);
        throw err;
      }
    },
    [book, isInWishlist]
  );

  // Toggle collection
  const toggleCollection = useCallback(
    async (bookId) => {
      if (!book) return;

      const newState = !isInCollection;
      setIsInCollection(newState);

      try {
        const collection = JSON.parse(localStorage.getItem("collection") || "[]");
        if (newState) {
          if (!collection.includes(bookId)) {
            collection.push(bookId);
          }
        } else {
          const index = collection.indexOf(bookId);
          if (index > -1) {
            collection.splice(index, 1);
          }
        }
        localStorage.setItem("collection", JSON.stringify(collection));

        return { bookId, isInCollection: newState };
      } catch (err) {
        setIsInCollection(!newState);
        throw err;
      }
    },
    [book, isInCollection]
  );

  // Toggle save
  const toggleSave = useCallback(
    async (bookId) => {
      if (!book) return;

      const newState = !isSaved;
      setIsSaved(newState);

      try {
        const saved = JSON.parse(localStorage.getItem("savedBooks") || "[]");
        if (newState) {
          if (!saved.includes(bookId)) {
            saved.push(bookId);
          }
        } else {
          const index = saved.indexOf(bookId);
          if (index > -1) {
            saved.splice(index, 1);
          }
        }
        localStorage.setItem("savedBooks", JSON.stringify(saved));

        return { bookId, isSaved: newState };
      } catch (err) {
        setIsSaved(!newState);
        throw err;
      }
    },
    [book, isSaved]
  );

  // Toggle like
  const toggleLike = useCallback(
    async (bookId) => {
      if (!book) return;

      const newState = !isLiked;
      setIsLiked(newState);

      try {
        const liked = JSON.parse(localStorage.getItem("likedBooks") || "[]");
        if (newState) {
          if (!liked.includes(bookId)) {
            liked.push(bookId);
          }
        } else {
          const index = liked.indexOf(bookId);
          if (index > -1) {
            liked.splice(index, 1);
          }
        }
        localStorage.setItem("likedBooks", JSON.stringify(liked));

        return { bookId, isLiked: newState };
      } catch (err) {
        setIsLiked(!newState);
        throw err;
      }
    },
    [book, isLiked]
  );

  // Update reading status
  const updateStatus = useCallback(
    async (status) => {
      if (!book) return;

      setBookStatus(status);

      try {
        localStorage.setItem(`bookStatus_${book.id}`, status);

        // In a real app, you would call an API
        // await fetch(`/api/books/${book.id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });

        return { bookId: book.id, status };
      } catch (err) {
        // Revert on error
        const oldStatus = localStorage.getItem(`bookStatus_${book.id}`) || "unread";
        setBookStatus(oldStatus);
        throw err;
      }
    },
    [book]
  );

  // Share book
  const handleShare = useCallback(async () => {
    if (!book) return;

    const shareData = {
      title: book.title,
      text: `Check out "${book.title}" by ${book.author}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Show success message
        return { shared: true, method: "clipboard" };
      }
      return { shared: true, method: "native" };
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
        throw err;
      }
      return { shared: false, cancelled: true };
    }
  }, [book]);

  // Get book
  const handleGetBook = useCallback(() => {
    if (!book) return;

    if (book.buttons?.getBook) {
      window.open(book.buttons.getBook, "_blank");
      return { opened: true };
    }
    return { opened: false };
  }, [book]);

  // Listen to audiobook
  const handleListenAudiobook = useCallback(() => {
    if (!book) return;

    if (book.buttons?.listenAudiobook) {
      window.open(book.buttons.listenAudiobook, "_blank");
      return { opened: true };
    }
    return { opened: false };
  }, [book]);

  // Read summary
  const handleReadSummary = useCallback(() => {
    if (!book) return;

    if (book.buttons?.readSummary) {
      window.open(book.buttons.readSummary, "_blank");
      return { opened: true };
    }
    return { opened: false };
  }, [book]);

  // Download book
  const handleDownload = useCallback(async () => {
    if (!book) return;

    setIsLoading(true);
    try {
      // Simulate download
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would trigger a download
      // const response = await fetch(`/api/books/${book.id}/download`);
      // const blob = await response.blob();
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${book.title}.pdf`;
      // a.click();

      return { downloaded: true };
    } catch (err) {
      console.error("Error downloading:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [book]);

  // Print book
  const handlePrint = useCallback(() => {
    if (!book) return;
    window.print();
    return { printed: true };
  }, [book]);

  // Report book
  const handleReport = useCallback(
    async (reason) => {
      if (!book) return;

      try {
        // In a real app, you would call an API
        // await fetch(`/api/books/${book.id}/report`, { method: 'POST', body: JSON.stringify({ reason }) });

        return { reported: true, reason };
      } catch (err) {
        console.error("Error reporting:", err);
        throw err;
      }
    },
    [book]
  );

  // Clear action history
  const clearHistory = useCallback(() => {
    setActionHistory([]);
  }, []);

  // Reset all states
  const reset = useCallback(() => {
    setIsInWishlist(false);
    setIsInCollection(false);
    setIsSaved(false);
    setIsLiked(false);
    setBookStatus("unread");
    setError(null);
    setActionHistory([]);
  }, []);

  return {
    // States
    isInWishlist,
    isInCollection,
    isSaved,
    isLiked,
    isLoading,
    bookStatus,
    error,
    actionHistory,

    // Action functions
    toggleWishlist,
    toggleCollection,
    toggleSave,
    toggleLike,
    updateStatus,
    handleShare,
    handleGetBook,
    handleListenAudiobook,
    handleReadSummary,
    handleDownload,
    handlePrint,
    handleReport,

    // Utility functions
    handleAction,
    clearHistory,
    reset,
  };
};

export default useBookActions;