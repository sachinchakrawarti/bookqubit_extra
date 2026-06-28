"use client";

import React from "react";
import { FaBook, FaBookOpen, FaCheck, FaHeart } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserInteractions } from "@/shared/buttons";

const BookActions = ({
  book,
  bookStatus = "unread",
  isInWishlist = false,
  isInCollection = false,
  isLiked = false,
  onGetBook,
  onScrollToSummary,
  onWishlist,
  onShare,
  onAddToLibrary,
  onReadStatus,
  onLike,
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  // Get user interactions
  const {
    markAsRead,
    isMarkedRead,
    addToCurrentlyReading,
    isCurrentlyReading,
    addToWantToRead,
    isWantToRead,
    toggleLike,
    isLiked: isBookLiked,
    toggleWishlist,
    isWishlisted: isBookWishlisted,
    toggleLibrary,
    isInLibrary,
    getCounts,
  } = useUserInteractions();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Get real-time status from localStorage
  const isRead = isMarkedRead(book?.id);
  const isReading = isCurrentlyReading(book?.id);
  const isWanted = isWantToRead(book?.id);
  const liked = isBookLiked(book?.id);
  const wishlisted = isBookWishlisted(book?.id);
  const inLibrary = isInLibrary(book?.id);

  // Determine book status from localStorage
  const getBookStatus = () => {
    if (isRead) return "read";
    if (isReading) return "currently_reading";
    if (isWanted) return "want_to_read";
    return "unread";
  };

  const currentStatus = getBookStatus();

  // Handle Mark as Read toggle
  const handleMarkAsReadToggle = () => {
    if (isRead) {
      // If already read, unmark it
      markAsRead(book.id);
    } else {
      // Mark as read
      markAsRead(book.id);
      // Remove from other statuses if needed
      if (isReading) {
        // If it was in currently reading, you might want to keep it or remove
        // For now, we'll just mark as read
      }
    }
    // Force refresh
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  // Handle Currently Reading toggle
  const handleCurrentlyReadingToggle = () => {
    if (isReading) {
      // If already reading, unmark
      addToCurrentlyReading(book.id);
    } else {
      // Mark as currently reading
      addToCurrentlyReading(book.id);
      // Remove from read if it was marked read
      if (isRead) {
        markAsRead(book.id);
      }
    }
    window.dispatchEvent(new Event("storage"));
  };

  // Handle Want to Read toggle
  const handleWantToReadToggle = () => {
    addToWantToRead(book.id);
    window.dispatchEvent(new Event("storage"));
  };

  // Check if dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {/* Get Book Button */}
      {book?.buttons?.getBook && (
        <button
          onClick={() => window.open(book.buttons.getBook, "_blank")}
          className={`flex-1 min-w-[140px] px-4 py-3 
            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
            ${theme.buttonColors?.primaryButton?.hoverBackground || "hover:from-sky-700 hover:to-sky-600"}
            text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          `}
        >
          <FaBook className="inline mr-2" />
          {t("book.get_book") || "Get Book"}
        </button>
      )}

      {/* Mark as Read Button */}
      <button
        onClick={handleMarkAsReadToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isRead
              ? "bg-green-500 text-white hover:bg-green-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaCheck className="inline mr-2" />
        {isRead
          ? t("book.read") || "Read ✓"
          : t("book.mark_as_read") || "Mark as Read"}
      </button>

      {/* Currently Reading Button */}
      <button
        onClick={handleCurrentlyReadingToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isReading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaBookOpen className="inline mr-2" />
        {isReading
          ? t("book.reading_now") || "Reading Now"
          : t("book.currently_reading") || "Currently Reading"}
      </button>

      {/* Want to Read Button */}
      <button
        onClick={handleWantToReadToggle}
        className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95
          ${
            isWanted
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : `${theme.buttonColors?.secondaryButton?.background || "border-2 border-sky-500 bg-transparent"} 
               ${theme.buttonColors?.secondaryButton?.textColor || "text-sky-600 dark:text-sky-400"}`
          }
        `}
      >
        <FaHeart className="inline mr-2" />
        {isWanted
          ? t("book.wanted") || "Wanted ✓"
          : t("book.want_to_read") || "Want to Read"}
      </button>
    </div>
  );
};

export default BookActions;
