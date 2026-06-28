// src/features/bookqubit-discovery/books/bookdeatils/components/desktop/DesktopBookCover.jsx

"use client";

import React, { useState } from "react";
import {
  FaHeart,
  FaBookmark,
  FaShare,
  FaExpand,
  FaTimes,
  FaDownload,
  FaPrint,
  FaFlag,
  FaEllipsisV,
  FaStar,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./DesktopBookCover.css";

const DesktopBookCover = ({
  book,
  theme: propTheme,
  onSave,
  onShare,
  onFavorite,
  onDownload,
  onPrint,
  onReport,
  className = "",
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock images - in production use actual images
  const images = book.images || [book.imageUrl || "/api/placeholder/400/600"];

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

  // Toggle full screen
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Toggle zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < Math.floor(rating || 0)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-300 dark:text-gray-600"
        } w-3 h-3`}
      />
    ));
  };

  return (
    <>
      <div className={`desktop-book-cover-container ${className}`}>
        {/* Main Cover */}
        <div className="desktop-book-cover-wrapper">
          <div
            className={`
              desktop-book-cover-image-wrapper
              ${isZoomed ? "zoomed" : ""}
            `}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={images[0]}
              alt={`${t("book.cover_of") || "Cover of"} ${book.title}`}
              className="desktop-book-cover-image"
              loading="lazy"
            />

            {/* Zoom Overlay */}
            {isZoomed && (
              <div className="desktop-book-cover-zoom-overlay">
                <button
                  onClick={toggleFullScreen}
                  className="desktop-book-cover-zoom-btn"
                >
                  <FaExpand className="w-5 h-5" />
                  <span>{t("book.expand") || "Expand"}</span>
                </button>
              </div>
            )}

            {/* Status Badge */}
            {book.status && (
              <div
                className={`
                desktop-book-cover-badge
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

            {/* Quick Action Buttons */}
            <div className="desktop-book-cover-quick-actions">
              <button
                onClick={handleLike}
                className={`
                  desktop-book-cover-quick-action
                  ${isLiked ? "active" : ""}
                  ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
                  backdrop-blur-sm
                  hover:scale-110
                `}
                title={
                  isLiked
                    ? t("book.unlike") || "Unlike"
                    : t("book.like") || "Like"
                }
              >
                <FaHeart
                  className={isLiked ? "text-rose-500 fill-rose-500" : ""}
                />
              </button>

              <button
                onClick={handleSave}
                className={`
                  desktop-book-cover-quick-action
                  ${isSaved ? "active" : ""}
                  ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
                  backdrop-blur-sm
                  hover:scale-110
                `}
                title={
                  isSaved
                    ? t("book.unsave") || "Unsave"
                    : t("book.save") || "Save"
                }
              >
                <FaBookmark
                  className={isSaved ? "text-sky-500 fill-sky-500" : ""}
                />
              </button>

              <button
                onClick={handleShare}
                className={`
                  desktop-book-cover-quick-action
                  ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
                  backdrop-blur-sm
                  hover:scale-110
                `}
                title={t("book.share") || "Share"}
              >
                <FaShare />
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`
                  desktop-book-cover-quick-action
                  ${showMenu ? "active" : ""}
                  ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
                  backdrop-blur-sm
                  hover:scale-110
                `}
                title={t("book.more") || "More"}
              >
                <FaEllipsisV />
              </button>
            </div>

            {/* Progress Bar */}
            {book.progress !== undefined &&
              book.progress > 0 &&
              book.progress < 100 && (
                <div className="desktop-book-cover-progress">
                  <div
                    className="desktop-book-cover-progress-fill"
                    style={{ width: `${book.progress}%` }}
                  />
                  <span className="desktop-book-cover-progress-text">
                    {book.progress}%
                  </span>
                </div>
              )}
          </div>

          {/* Book Info Panel */}
          <div
            className={`
            desktop-book-cover-info
            ${theme.background?.section || "bg-white dark:bg-gray-900"}
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
            rounded-lg
            p-4
          `}
          >
            <h4
              className={`
              desktop-book-cover-info-title
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              font-semibold
              truncate
            `}
            >
              {book.title}
            </h4>

            <p
              className={`
              desktop-book-cover-info-author
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              text-sm
              truncate
            `}
            >
              <FaUser className="inline mr-1 w-3 h-3" />
              {book.author}
            </p>

            <div className="desktop-book-cover-info-rating">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
                <span
                  className={`
                  text-xs ml-1
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  ({book.rating?.toFixed(1) || "0"})
                </span>
              </div>
            </div>

            <div className="desktop-book-cover-info-meta">
              {book.pageCount && (
                <span
                  className={`
                  desktop-book-cover-info-meta-item
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  <FaClock className="w-3 h-3" />
                  {book.pageCount} {t("book.pages") || "pages"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* More Menu */}
        {showMenu && (
          <div
            className={`
            desktop-book-cover-menu
            ${theme.background?.section || "bg-white dark:bg-gray-900"}
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
            ${theme.shadow?.container || "shadow-lg"}
            rounded-lg
            overflow-hidden
            z-20
          `}
          >
            <button
              onClick={handleFavorite}
              className="desktop-book-cover-menu-item"
            >
              <FaHeart className="w-4 h-4" />
              {t("book.favorite") || "Add to Favorites"}
            </button>
            <button
              onClick={handleDownload}
              className="desktop-book-cover-menu-item"
            >
              <FaDownload className="w-4 h-4" />
              {t("book.download") || "Download"}
            </button>
            <button
              onClick={handlePrint}
              className="desktop-book-cover-menu-item"
            >
              <FaPrint className="w-4 h-4" />
              {t("book.print") || "Print"}
            </button>
            <button
              onClick={handleReport}
              className="desktop-book-cover-menu-item text-red-500"
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
          className="desktop-book-cover-fullscreen"
          onClick={toggleFullScreen}
        >
          <button
            onClick={toggleFullScreen}
            className="desktop-book-cover-fullscreen-close"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <img
            src={images[0]}
            alt={`${t("book.cover_of") || "Cover of"} ${book.title}`}
            className="desktop-book-cover-fullscreen-image"
          />

          <div className="desktop-book-cover-fullscreen-info">
            <h3 className="text-white font-semibold">{book.title}</h3>
            <p className="text-gray-300 text-sm">{book.author}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DesktopBookCover;
