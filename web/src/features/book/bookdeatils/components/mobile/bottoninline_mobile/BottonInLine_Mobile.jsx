"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaShare,
  FaBook,
  FaBookOpen,
  FaUsers,
  FaRobot,
  FaFlag,
  FaInfoCircle,
  FaLink,
  FaPlus,
  FaCheck,
  FaFileAlt,
  FaList,
} from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserInteractions } from "@/shared/buttons";
import BottomSheet_Mobile from "./BottomSheet_Mobile";
import Summary_BottomSheet_Mobile from "./Summary_BottomSheet_Mobile";
import MyLibrary_BottomSheet_Mobile from "./MyLibrary_BottomSheet_Mobile";
import "./BottonInLine_Mobile.css";

const BottonInLine_Mobile = ({
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSummarySheetOpen, setIsSummarySheetOpen] = useState(false);
  const [isMyLibraryOpen, setIsMyLibraryOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [likeCount, setLikeCount] = useState(42);
  const [shareCount, setShareCount] = useState(12);
  const [readingStats, setReadingStats] = useState({
    reading: 0,
    markedRead: 0,
    currentlyReading: 0,
  });

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
          setReadingStats({
            reading: counts?.reading || 0,
            markedRead: counts?.markedRead || 0,
            currentlyReading: counts?.currentlyReading || 0,
          });
        } else {
          setReadingStats({
            reading: 0,
            markedRead: 0,
            currentlyReading: 0,
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
    setIsBottomSheetOpen(false);
    setIsSummarySheetOpen(false);
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

  const handleAskAI = useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsSummarySheetOpen(false);
    onAskAI?.();
  }, [onAskAI]);

  const handleReport = useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsSummarySheetOpen(false);
    onReport?.();
  }, [onReport]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowTooltip("link-copied");
      setTimeout(() => setShowTooltip(null), 2000);
      setIsBottomSheetOpen(false);
      setIsSummarySheetOpen(false);
    } catch (error) {
      console.error("Copy link failed:", error);
    }
  }, []);

  // Bottom sheet actions (for the original bottom sheet)
  const bottomSheetActions = useMemo(
    () => [
      {
        id: "ask-ai",
        icon: <FaRobot />,
        label: t("book.ask_ai") || "Ask AI",
        description:
          t("book.ask_ai_description") ||
          "Get AI-powered insights about this book",
        color: theme.colors?.ai || "#8B5CF6",
        onClick: handleAskAI,
      },
      {
        id: "report",
        icon: <FaFlag />,
        label: t("book.report") || "Report",
        description:
          t("book.report_description") || "Report inappropriate content",
        color: theme.colors?.danger || "#EF4444",
        onClick: handleReport,
      },
      {
        id: "details",
        icon: <FaInfoCircle />,
        label: t("book.details") || "Book Details",
        description:
          t("book.details_description") || "View complete book information",
        color: theme.colors?.info || "#3B82F6",
        onClick: () => {
          setIsBottomSheetOpen(false);
        },
      },
      {
        id: "copy-link",
        icon: <FaLink />,
        label: t("book.copy_link") || "Copy Link",
        description:
          t("book.copy_link_description") || "Copy book URL to clipboard",
        color: theme.colors?.success || "#10B981",
        onClick: handleCopyLink,
      },
    ],
    [handleAskAI, handleReport, handleCopyLink, t, theme],
  );

  // Reading stats items for bottom sheet
  const readingStatItems = useMemo(
    () => [
      {
        id: "reading",
        icon: <FaBookOpen />,
        label: t("book.reading") || "Reading",
        count: readingStats.reading || 0,
        color: theme.colors?.info || "#3B82F6",
      },
      {
        id: "marked-read",
        icon: <FaBook />,
        label: t("book.marked_read") || "Marked Read",
        count: readingStats.markedRead || 0,
        color: theme.colors?.success || "#10B981",
      },
      {
        id: "currently-reading",
        icon: <FaUsers />,
        label: t("book.currently_reading") || "Currently Reading",
        count: readingStats.currentlyReading || 0,
        color: theme.colors?.warning || "#F59E0B",
      },
    ],
    [readingStats, theme, t],
  );

  // Get theme-based colors with fallbacks
  const getBgColor = () => {
    return theme.background?.card || (isDarkMode ? "#1F2937" : "#FFFFFF");
  };

  const getBorderColor = () => {
    return theme.border?.default || (isDarkMode ? "#374151" : "#E5E7EB");
  };

  const getTextColor = () => {
    return theme.textColors?.secondary || (isDarkMode ? "#9CA3AF" : "#6B7280");
  };

  const getHoverBg = () => {
    return theme.background?.hover || (isDarkMode ? "#374151" : "#F3F4F6");
  };

  const getLikeColor = () => {
    return theme.iconColors?.like || "#EF4444";
  };

  const getLibraryColor = () => {
    return theme.iconColors?.library || "#6366F1";
  };

  const getShadow = () => {
    return theme.shadow?.small || "0 4px 6px rgba(0,0,0,0.1)";
  };

  // If no bookId, don't render
  if (!bookId) {
    return null;
  }

  return (
    <>
      <div
        className={`book-action-bar-mobile ${className}`}
        style={{
          background: getBgColor(),
          borderColor: getBorderColor(),
          boxShadow: getShadow(),
        }}
      >
        {/* Like Button */}
        <button
          className={`action-btn-mobile like-btn-mobile ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          aria-label={
            isLiked ? t("book.unlike") || "Unlike" : t("book.like") || "Like"
          }
          style={isLiked ? { color: getLikeColor() } : {}}
        >
          {isLiked ? (
            <FaHeart className="icon" />
          ) : (
            <FaRegHeart className="icon" />
          )}
          <span
            className={`count ${isLiked ? "liked-text" : ""}`}
            style={isLiked ? { color: getLikeColor() } : {}}
          >
            {likeCount}
          </span>
        </button>

        {/* Share Button */}
        <button
          className="action-btn-mobile"
          onClick={handleShare}
          aria-label={t("book.share") || "Share"}
        >
          <FaShare className="icon" />
          {showTooltip === "copied" && (
            <span className={`tooltip ${isDarkMode ? "dark" : ""}`}>
              {t("book.link_copied") || "Link copied!"}
            </span>
          )}
        </button>

        {/* Summary Button */}
        <button
          className="action-btn-mobile summary-btn-mobile"
          onClick={() => setIsSummarySheetOpen(true)}
          aria-label={t("book.summary") || "View Summary"}
        >
          <FaFileAlt className="icon" />
          <span className="summary-label">
            {t("book.summary") || "Summary"}
          </span>
        </button>

        {/* My Library Button - Icon only */}
        <button
          className={`action-btn-mobile library-btn-mobile ${isInLibrary ? "in-library" : ""}`}
          onClick={handleLibraryToggle}
          aria-label={
            isInLibrary
              ? t("book.in_library") || "In Library"
              : t("book.add_to_library") || "Add to Library"
          }
          style={isInLibrary ? { color: getLibraryColor() } : {}}
        >
          {isInLibrary ? (
            <FaCheck className="icon" />
          ) : (
            <FaPlus className="icon" />
          )}
          {showTooltip === "added-to-library" && (
            <span className={`tooltip ${isDarkMode ? "dark" : ""}`}>
              {t("book.added_to_library") || "Added to library!"}
            </span>
          )}
        </button>

        {/* Menu Button */}
        <button
          className="action-btn-mobile menu-btn-mobile"
          onClick={() => setIsBottomSheetOpen(true)}
          aria-label={t("book.more_options") || "More options"}
        >
          <RiMenuAddLine className="icon" />
        </button>
      </div>

      {/* Original Bottom Sheet */}
      <BottomSheet_Mobile
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        bookName={bookName}
        authorName={authorName}
        launchYear={launchYear}
        likeCount={likeCount}
        shareCount={shareCount}
        isBookmarked={isInLibrary}
        readingStats={readingStatItems}
        bottomSheetActions={bottomSheetActions}
        bookRating={4.5}
        totalReviews={128}
        pageCount={180}
        language="English"
        genres={["Fiction", "Classic", "Literary"]}
        description="A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
        onBookmarkToggle={handleLibraryToggle}
        onLike={handleLike}
      />

      {/* Summary Bottom Sheet */}
      <Summary_BottomSheet_Mobile
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

      {/* My Library Bottom Sheet */}
      <MyLibrary_BottomSheet_Mobile
        isOpen={isMyLibraryOpen}
        onClose={() => setIsMyLibraryOpen(false)}
        bookName={bookName}
        authorName={authorName}
        onAddToLibrary={handleAddToLibrary}
      />
    </>
  );
};

export default BottonInLine_Mobile;
