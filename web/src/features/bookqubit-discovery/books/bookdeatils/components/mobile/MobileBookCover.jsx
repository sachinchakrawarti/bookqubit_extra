// src/features/bookqubit-discovery/books/bookdeatils/components/mobile/MobileBookCover.jsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaBookmark,
  FaShare,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaDownload,
  FaPrint,
  FaFlag,
  FaEllipsisV,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./MobileBookCover.css";

const MobileBookCover = ({
  book,
  theme: propTheme,
  onSave,
  onShare,
  onFavorite,
  onDownload,
  onPrint,
  onReport,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageRef = useRef(null);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock multiple images - in production, use actual images
  const images = book.images || [
    book.imageUrl || "/api/placeholder/400/600",
    book.imageUrl || "/api/placeholder/400/600",
    book.imageUrl || "/api/placeholder/400/600",
  ];

  // Handle swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next image
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right - previous image
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
    }
  };

  // Handle full screen
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Handle save
  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(book);
    }
  };

  // Handle share
  const handleShare = () => {
    if (onShare) {
      onShare(book);
    }
  };

  // Handle favorite
  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(book);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(book);
    }
    setShowMenu(false);
  };

  // Handle print
  const handlePrint = () => {
    if (onPrint) {
      onPrint(book);
    }
    setShowMenu(false);
  };

  // Handle report
  const handleReport = () => {
    if (onReport) {
      onReport(book);
    }
    setShowMenu(false);
  };

  // Keyboard escape for full screen
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isFullScreen) {
        toggleFullScreen();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isFullScreen]);

  return (
    <>
      {/* Main Cover */}
      <div className="mobile-book-cover-container">
        {/* Cover Image */}
        <div
          className="mobile-book-cover-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={toggleFullScreen}
        >
          <img
            ref={imageRef}
            src={images[currentImageIndex]}
            alt={`${t("book.cover_of") || "Cover of"} ${book.title}`}
            className="mobile-book-cover-image"
            loading="lazy"
          />

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="mobile-book-cover-counter">
              <span className="mobile-book-cover-counter-text">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Swipe Indicator */}
          {images.length > 1 && (
            <div className="mobile-book-cover-swipe-indicator">
              <FaChevronLeft className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-xs">
                {t("book.swipe") || "Swipe"}
              </span>
              <FaChevronRight className="w-4 h-4 text-white/50" />
            </div>
          )}

          {/* Status Badge */}
          {book.status && (
            <div
              className={`
              mobile-book-cover-badge
              ${book.status === "reading" ? "bg-sky-500" : ""}
              ${book.status === "completed" ? "bg-green-500" : ""}
              ${book.status === "want_to_read" ? "bg-amber-500" : ""}
            `}
            >
              {(book.status === "reading" && t("book.reading")) || "Reading"}
              {(book.status === "completed" && t("book.completed")) ||
                "Completed"}
              {(book.status === "want_to_read" && t("book.want_to_read")) ||
                "Want to Read"}
            </div>
          )}

          {/* Progress Bar */}
          {book.progress !== undefined &&
            book.progress > 0 &&
            book.progress < 100 && (
              <div className="mobile-book-cover-progress">
                <div
                  className="mobile-book-cover-progress-fill"
                  style={{ width: `${book.progress}%` }}
                />
                <span className="mobile-book-cover-progress-text">
                  {book.progress}%
                </span>
              </div>
            )}
        </div>

        {/* Action Buttons */}
        <div className="mobile-book-cover-actions">
          <button
            onClick={handleLike}
            className={`
              mobile-book-cover-action
              ${isLiked ? "active" : ""}
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.button || "shadow-md"}
            `}
          >
            <FaHeart className={isLiked ? "text-rose-500 fill-rose-500" : ""} />
            <span>
              {isLiked ? t("book.liked") || "Liked" : t("book.like") || "Like"}
            </span>
          </button>

          <button
            onClick={handleSave}
            className={`
              mobile-book-cover-action
              ${isSaved ? "active" : ""}
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.button || "shadow-md"}
            `}
          >
            <FaBookmark
              className={isSaved ? "text-sky-500 fill-sky-500" : ""}
            />
            <span>
              {isSaved ? t("book.saved") || "Saved" : t("book.save") || "Save"}
            </span>
          </button>

          <button
            onClick={handleShare}
            className={`
              mobile-book-cover-action
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.button || "shadow-md"}
            `}
          >
            <FaShare />
            <span>{t("book.share") || "Share"}</span>
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`
              mobile-book-cover-action
              ${showMenu ? "active" : ""}
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.button || "shadow-md"}
            `}
          >
            <FaEllipsisV />
            <span>{t("book.more") || "More"}</span>
          </button>
        </div>

        {/* More Menu */}
        {showMenu && (
          <div
            className={`
            mobile-book-cover-menu
            ${theme.background?.section || "bg-white dark:bg-gray-900"}
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
            ${theme.shadow?.container || "shadow-lg"}
          `}
          >
            <button
              onClick={handleFavorite}
              className="mobile-book-cover-menu-item"
            >
              <FaHeart className="w-4 h-4" />
              {t("book.favorite") || "Add to Favorites"}
            </button>
            <button
              onClick={handleDownload}
              className="mobile-book-cover-menu-item"
            >
              <FaDownload className="w-4 h-4" />
              {t("book.download") || "Download"}
            </button>
            <button
              onClick={handlePrint}
              className="mobile-book-cover-menu-item"
            >
              <FaPrint className="w-4 h-4" />
              {t("book.print") || "Print"}
            </button>
            <button
              onClick={handleReport}
              className="mobile-book-cover-menu-item text-red-500"
            >
              <FaFlag className="w-4 h-4" />
              {t("book.report") || "Report"}
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {isFullScreen && (
        <div
          className="mobile-book-cover-fullscreen"
          onClick={toggleFullScreen}
        >
          <button
            onClick={toggleFullScreen}
            className="mobile-book-cover-fullscreen-close"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <img
            src={images[currentImageIndex]}
            alt={`${t("book.cover_of") || "Cover of"} ${book.title}`}
            className="mobile-book-cover-fullscreen-image"
          />

          {images.length > 1 && (
            <div className="mobile-book-cover-fullscreen-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileBookCover;
