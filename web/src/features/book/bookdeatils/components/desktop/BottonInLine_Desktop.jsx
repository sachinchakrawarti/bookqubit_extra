"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaShare,
  FaPlus,
  FaCheck,
  FaFileAlt,
} from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserInteractions } from "@/shared/buttons";
import Summary_SideSheet_Desktop from "./Summary_SideSheet_Desktop";
import Info_SideSheet_Desktop from "./Info_SideSheet_Desktop";
import MyLibrary_SideSheet_Desktop from "./MyLibrary_SideSheet_Desktop";
import "./BottonInLine_Desktop.css";

const BottonInLine_Desktop = ({
  bookId,
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  launchYear = "1925",
  initialLiked = false,
  initialInLibrary = false,
  onLike,
  onAddToLibrary,
  onShare,
  onReport,
  onAskAI,
  className = "",
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // State
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isInLibrary, setIsInLibrary] = useState(initialInLibrary);
  const [isSummarySheetOpen, setIsSummarySheetOpen] = useState(false);
  const [isInfoSheetOpen, setIsInfoSheetOpen] = useState(false);
  const [isMyLibraryOpen, setIsMyLibraryOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [likeCount, setLikeCount] = useState(42);
  const [shareCount, setShareCount] = useState(12);

  // Get user interactions - with error handling
  let userInteractions = null;
  try {
    userInteractions = useUserInteractions();
  } catch (error) {
    console.warn("User interactions not available:", error);
  }

  // Load reading stats with error handling
  useEffect(() => {
    const loadStats = () => {
      try {
        if (
          userInteractions &&
          typeof userInteractions.getCounts === "function"
        ) {
          const counts = userInteractions.getCounts();
          // Reading stats are handled inside Info_SideSheet_Desktop
        } else {
          // Reading stats are handled inside Info_SideSheet_Desktop
        }
      } catch (error) {
        console.warn("Failed to load reading stats:", error);
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
        handleStorageChange,
      );
    };
  }, [userInteractions]);

  // Handlers
  const handleLike = useCallback(() => {
    const newState = !isLiked;
    setIsLiked(newState);
    setLikeCount((prev) => (newState ? prev + 1 : prev - 1));
    onLike?.(newState);
  }, [isLiked, onLike]);

  const handleLibraryToggle = useCallback(() => {
    setIsMyLibraryOpen(true);
    setIsSummarySheetOpen(false);
    setIsInfoSheetOpen(false);
  }, []);

  const handleAddToLibrary = useCallback(
    (shelf) => {
      setIsInLibrary(true);
      onAddToLibrary?.(shelf);
      setIsMyLibraryOpen(false);
      setShowTooltip("added-to-library");
      setTimeout(() => setShowTooltip(null), 2000);
    },
    [onAddToLibrary],
  );

  const handleShare = useCallback(async () => {
    const shareData = {
      title: bookName,
      text: `Check out "${bookName}" by ${authorName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`,
        );
        setShowTooltip("copied");
        setTimeout(() => setShowTooltip(null), 2000);
      }
      setShareCount((prev) => prev + 1);
      onShare?.();
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  }, [bookName, authorName, onShare]);

  // If no bookId, don't render
  if (!bookId) {
    return null;
  }

  return (
    <>
      {/* Desktop Action Bar - Inside card */}
      <div className={`book-action-bar-desktop ${className}`}>
        {/* Like Button */}
        <button
          className={`action-btn-desktop like-btn-desktop ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          aria-label={
            isLiked ? t("book.unlike") || "Unlike" : t("book.like") || "Like"
          }
          style={isLiked ? { color: "#EF4444" } : {}}
        >
          {isLiked ? (
            <FaHeart className="icon" />
          ) : (
            <FaRegHeart className="icon" />
          )}
          <span
            className={`count ${isLiked ? "liked-text" : ""}`}
            style={isLiked ? { color: "#EF4444" } : {}}
          >
            {likeCount}
          </span>
        </button>

        {/* Share Button */}
        <button
          className="action-btn-desktop"
          onClick={handleShare}
          aria-label={t("book.share") || "Share"}
        >
          <FaShare className="icon" />
          {showTooltip === "copied" && (
            <span className={`tooltip-desktop ${isDarkMode ? "dark" : ""}`}>
              {t("book.link_copied") || "Link copied!"}
            </span>
          )}
        </button>

        {/* Summary Button - Opens Summary side sheet from right */}
        <button
          className="action-btn-desktop summary-btn-desktop"
          onClick={() => {
            setIsSummarySheetOpen(true);
            setIsInfoSheetOpen(false);
          }}
          aria-label={t("book.summary") || "View Summary"}
        >
          <FaFileAlt className="icon" />
          <span className="summary-label">
            {t("book.summary") || "Summary"}
          </span>
        </button>

        {/* My Library Button */}
        <button
          className={`action-btn-desktop library-btn-desktop ${isInLibrary ? "in-library" : ""}`}
          onClick={handleLibraryToggle}
          aria-label={
            isInLibrary
              ? t("book.in_library") || "In Library"
              : t("book.add_to_library") || "Add to Library"
          }
          style={isInLibrary ? { color: "#6366F1" } : {}}
        >
          {isInLibrary ? (
            <FaCheck className="icon" />
          ) : (
            <FaPlus className="icon" />
          )}
          {showTooltip === "added-to-library" && (
            <span className={`tooltip-desktop ${isDarkMode ? "dark" : ""}`}>
              {t("book.added_to_library") || "Added to library!"}
            </span>
          )}
        </button>

        {/* Menu Button - Opens Info side sheet from right */}
        <button
          className="action-btn-desktop menu-btn-desktop"
          onClick={() => {
            setIsInfoSheetOpen(true);
            setIsSummarySheetOpen(false);
          }}
          aria-label={t("book.more_options") || "More options"}
        >
          <RiMenuAddLine className="icon" />
        </button>
      </div>

      {/* Summary Side Sheet - Slides from RIGHT side of screen */}
      <Summary_SideSheet_Desktop
        isOpen={isSummarySheetOpen}
        onClose={() => setIsSummarySheetOpen(false)}
        bookName={bookName}
        authorName={authorName}
        launchYear={launchYear}
        bookCover={null}
        bookRating={4.5}
        totalReviews={128}
        pageCount={180}
        language="English"
        genres={["Fiction", "Classic", "Literary"]}
        description="A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
        summary="The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan. The novel explores themes of decadence, idealism, social upheaval, and excess, creating a portrait of the Roaring Twenties that has been described as a cautionary tale regarding the American Dream."
        likeCount={likeCount}
        shareCount={shareCount}
        isBookmarked={isInLibrary}
        onBookmarkToggle={handleLibraryToggle}
        onLike={handleLike}
        onShare={handleShare}
        onAddToLibrary={handleLibraryToggle}
      />

      {/* Info Side Sheet - Slides from RIGHT side of screen */}
      <Info_SideSheet_Desktop
        isOpen={isInfoSheetOpen}
        onClose={() => setIsInfoSheetOpen(false)}
        bookName={bookName}
        authorName={authorName}
        launchYear={launchYear}
        likeCount={likeCount}
        shareCount={shareCount}
        isBookmarked={isInLibrary}
        bookRating={4.5}
        totalReviews={128}
        pageCount={180}
        language="English"
        genres={["Fiction", "Classic", "Literary"]}
        description="A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
        onBookmarkToggle={handleLibraryToggle}
        onLike={handleLike}
      />

      {/* My Library Side Sheet - Slides from RIGHT side of screen */}
      <MyLibrary_SideSheet_Desktop
        isOpen={isMyLibraryOpen}
        onClose={() => setIsMyLibraryOpen(false)}
        bookName={bookName}
        authorName={authorName}
        onAddToLibrary={handleAddToLibrary}
      />
    </>
  );
};

export default BottonInLine_Desktop;
