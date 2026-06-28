"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGlobalSheet } from "./GlobalSheetManager";
import useButtonInline from "./hooks/useButtonInline";
import LikeButton from "./components/buttons/LikeButton";
import ShareButton from "./components/buttons/ShareButton";
import SummaryButton from "./components/buttons/SummaryButton";
import LibraryButton from "./components/buttons/LibraryButton";
import MenuButton from "./components/buttons/MenuButton";
import "./ButtonInline.css";

const ButtonInline = ({
  bookId,
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  launchYear = "1925",
  bookCover = null,
  bookRating = 4.5,
  totalReviews = 128,
  pageCount = 180,
  language = "English",
  genres = ["Fiction", "Classic", "Literary"],
  description = "A story of the mysteriously wealthy Jay Gatsby...",
  summary = "The Great Gatsby is a 1925 novel...",
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
  const isMounted = useRef(false);

  // Use global sheet
  const { sheetData, openSheet, closeSheet } = useGlobalSheet();

  // Simple isMobile check
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const {
    isLiked,
    isInLibrary,
    likeCount,
    shareCount,
    showTooltip,
    isLoading,
    handleLike,
    handleAddToLibrary,
    handleShare,
    handleTooltip,
  } = useButtonInline({
    bookId,
    initialLiked,
    initialInLibrary,
    onLike,
    onAddToLibrary,
    onShare,
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleShareClick = useCallback(async () => {
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
        handleTooltip("copied");
      }
      handleShare();
    } catch (error) {
      if (error.name !== "AbortError") console.error("Share failed:", error);
    }
  }, [bookName, authorName, handleShare, handleTooltip]);

  // Open sheet with book data
  const handleOpenSheet = (type) => {
    // If same sheet and same book is open, close it
    if (sheetData && sheetData.bookId === bookId && sheetData.type === type) {
      closeSheet();
      return;
    }
    openSheet({
      type,
      bookId,
      bookName,
      authorName,
      launchYear,
      bookCover,
      bookRating,
      totalReviews,
      pageCount,
      language,
      genres,
      description,
      summary,
      likeCount,
      shareCount,
      isInLibrary,
      handleLike,
      handleAddToLibrary,
      handleShareClick,
      isMobile,
      onClose: closeSheet,
      onBookmarkToggle: () => handleOpenSheet("library"),
      onAddToLibrary: () => handleOpenSheet("library"),
    });
  };

  if (!bookId || !isMounted.current) {
    return (
      <div className={`button-inline-skeleton ${className}`}>
        <div className="skeleton-bar"></div>
      </div>
    );
  }

  return (
    <div
      className={`button-inline ${isMobile ? "mobile" : "desktop"} ${isDarkMode ? "dark" : ""} ${className}`}
    >
      <LikeButton
        isLiked={isLiked}
        likeCount={likeCount}
        onClick={handleLike}
        size="md"
        disabled={isLoading}
      />
      <ShareButton
        onClick={handleShareClick}
        showTooltip={showTooltip === "copied"}
        tooltipText={t("book.link_copied") || "Link copied!"}
        size="md"
        disabled={isLoading}
      />
      <SummaryButton
        onClick={() => handleOpenSheet("summary")}
        label={t("book.summary") || "Summary"}
        size="md"
        disabled={isLoading}
      />
      <LibraryButton
        isInLibrary={isInLibrary}
        onClick={() => handleOpenSheet("library")}
        size="md"
        disabled={isLoading}
        iconOnly={true}
      />
      <MenuButton
        onClick={() => handleOpenSheet("info")}
        size="md"
        disabled={isLoading}
        isActive={sheetData?.type === "info" && sheetData?.bookId === bookId}
      />
    </div>
  );
};

export default ButtonInline;
