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
  bookSlug = null,
  navigateToBookOnShare = false,
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

  // Use ONLY the slug - no ID fallback
  const bookSlugValue = bookSlug;

  // Generate share text with book details and bookqubit branding
  const generateShareText = useCallback(() => {
    const bookTitle = bookName || "this book";
    const author = authorName || "an amazing author";
    
    // Only use slug, never ID
    const shareUrl = bookSlugValue 
      ? `${window.location.origin}/books/${bookSlugValue}`
      : window.location.href;
    
    return `📚 Check out "${bookTitle}" by ${author} on BookQubit! 🚀\n\n` +
           `Discover this amazing book and explore more at BookQubit - Your ultimate reading companion! 📖✨\n\n` +
           `🔗 ${shareUrl}`;
  }, [bookName, authorName, bookSlugValue]);

  // Generate share data for social media
  const getShareData = useCallback(() => {
    const shareText = generateShareText();
    const shareUrl = bookSlugValue 
      ? `${window.location.origin}/books/${bookSlugValue}`
      : window.location.href;
    
    return {
      title: `📚 ${bookName} by ${authorName} on BookQubit`,
      text: shareText,
      url: shareUrl,
    };
  }, [bookName, authorName, bookSlugValue, generateShareText]);

  const handleShareClick = useCallback(async () => {
    const shareData = getShareData();
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        handleShare();
        
        if (navigateToBookOnShare && bookSlugValue) {
          window.location.href = `/books/${bookSlugValue}`;
        }
      } else {
        await navigator.clipboard.writeText(shareData.text);
        handleTooltip("copied");
        handleShare();
        
        if (navigateToBookOnShare && bookSlugValue) {
          setTimeout(() => {
            window.location.href = `/books/${bookSlugValue}`;
          }, 500);
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
        try {
          await navigator.clipboard.writeText(shareData.text);
          handleTooltip("copied");
        } catch (copyError) {
          console.error("Copy failed:", copyError);
        }
      }
    }
  }, [getShareData, bookSlugValue, navigateToBookOnShare, handleShare, handleTooltip]);

  // Open sheet with book data
  const handleOpenSheet = (type) => {
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
        bookId={bookId}
        bookSlug={bookSlugValue}
        bookTitle={bookName}
        bookAuthor={authorName}
        navigateToBook={navigateToBookOnShare}
        variant="icon"
        ariaLabel={t("book.share") || "Share this book on BookQubit"}
        shareData={getShareData()}
        onShareSuccess={(data) => {
          console.log("Book shared successfully on BookQubit:", data);
          handleShare();
        }}
        onShareError={(error) => {
          console.error("Share failed on BookQubit:", error);
        }}
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