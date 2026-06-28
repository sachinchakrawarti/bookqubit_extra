"use client";

import { useState, useCallback, useEffect } from "react";
import { useUserInteractions } from "@/shared/buttons";

const useButtonInline = ({
  bookId,
  initialLiked = false,
  initialInLibrary = false,
  onLike,
  onAddToLibrary,
  onShare,
}) => {
  // ============================================================
  // STATE
  // ============================================================
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isInLibrary, setIsInLibrary] = useState(initialInLibrary);
  const [likeCount, setLikeCount] = useState(42);
  const [shareCount, setShareCount] = useState(12);
  const [showTooltip, setShowTooltip] = useState(null);
  const [readingStats, setReadingStats] = useState({
    reading: 0,
    markedRead: 0,
    currentlyReading: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================================================
  // USER INTERACTIONS
  // ============================================================
  let userInteractions = null;
  try {
    userInteractions = useUserInteractions();
  } catch (error) {
    console.warn("User interactions not available:", error);
  }

  // ============================================================
  // LOAD READING STATS
  // ============================================================
  useEffect(() => {
    const loadStats = () => {
      try {
        if (
          userInteractions &&
          typeof userInteractions.getCounts === "function"
        ) {
          const counts = userInteractions.getCounts();
          setReadingStats({
            reading: counts?.reading || 0,
            markedRead: counts?.markedRead || 0,
            currentlyReading: counts?.currentlyReading || 0,
          });
        }
      } catch (error) {
        console.warn("Failed to load reading stats:", error);
        setReadingStats({
          reading: 0,
          markedRead: 0,
          currentlyReading: 0,
        });
      }
    };

    loadStats();

    const handleStorageChange = () => {
      loadStats();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userInteractionsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "userInteractionsUpdated",
        handleStorageChange
      );
    };
  }, [userInteractions]);

  // ============================================================
  // HANDLERS
  // ============================================================

  // Handle Like
  const handleLike = useCallback(() => {
    try {
      setIsLoading(true);
      const newState = !isLiked;
      setIsLiked(newState);
      setLikeCount((prev) => (newState ? prev + 1 : prev - 1));
      
      // Call external handler
      onLike?.(newState);
      
      // Update user interactions if available
      if (userInteractions && typeof userInteractions.toggleLike === "function") {
        userInteractions.toggleLike(bookId);
      }
      
      setError(null);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setError(error.message);
      // Revert on error
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, bookId, onLike, userInteractions]);

  // Handle Add to Library
  const handleAddToLibrary = useCallback(
    (shelf) => {
      try {
        setIsLoading(true);
        setIsInLibrary(true);
        
        // Call external handler
        onAddToLibrary?.(shelf);
        
        // Update user interactions if available
        if (userInteractions && typeof userInteractions.toggleLibrary === "function") {
          userInteractions.toggleLibrary(bookId);
        }
        
        // Show success tooltip
        setShowTooltip("added-to-library");
        setTimeout(() => setShowTooltip(null), 2000);
        
        setError(null);
      } catch (error) {
        console.error("Failed to add to library:", error);
        setError(error.message);
        setIsInLibrary(false);
      } finally {
        setIsLoading(false);
      }
    },
    [bookId, onAddToLibrary, userInteractions]
  );

  // Handle Remove from Library
  const handleRemoveFromLibrary = useCallback(() => {
    try {
      setIsLoading(true);
      setIsInLibrary(false);
      
      // Update user interactions if available
      if (userInteractions && typeof userInteractions.toggleLibrary === "function") {
        userInteractions.toggleLibrary(bookId);
      }
      
      setError(null);
    } catch (error) {
      console.error("Failed to remove from library:", error);
      setError(error.message);
      setIsInLibrary(true);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, userInteractions]);

  // Handle Share
  const handleShare = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Call external handler
      onShare?.();
      
      setShareCount((prev) => prev + 1);
      setError(null);
    } catch (error) {
      console.error("Failed to share:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [onShare]);

  // Handle Tooltip
  const handleTooltip = useCallback((type, duration = 2000) => {
    setShowTooltip(type);
    setTimeout(() => setShowTooltip(null), duration);
  }, []);

  // Reset State
  const resetState = useCallback(() => {
    setIsLiked(initialLiked);
    setIsInLibrary(initialInLibrary);
    setLikeCount(42);
    setShareCount(12);
    setShowTooltip(null);
    setError(null);
    setIsLoading(false);
  }, [initialLiked, initialInLibrary]);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const isBookmarked = isInLibrary;
  const isLikedState = isLiked;

  // ============================================================
  // RETURN
  // ============================================================
  return {
    // State
    isLiked: isLikedState,
    isInLibrary,
    isBookmarked,
    likeCount,
    shareCount,
    showTooltip,
    readingStats,
    isLoading,
    error,
    
    // Handlers
    handleLike,
    handleAddToLibrary,
    handleRemoveFromLibrary,
    handleShare,
    handleTooltip,
    resetState,
    
    // Setters (for direct updates)
    setLikeCount,
    setShareCount,
    setShowTooltip,
    setReadingStats,
  };
};

export default useButtonInline;