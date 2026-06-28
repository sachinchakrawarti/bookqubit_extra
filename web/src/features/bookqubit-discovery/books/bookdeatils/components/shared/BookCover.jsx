// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookCover.jsx

"use client";

import React, { useState } from "react";
import { FaExpand, FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookCover.css";

const BookCover = ({
  book,
  theme: propTheme,
  onExpand,
  onSave,
  onShare,
  onFavorite,
}) => {
  // Use prop theme if provided, otherwise use hook
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Get fallback image
  const getFallbackImage = () => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23${isDarkMode ? "1f2937" : "f3f4f6"}'/%3E%3Ctext x='50' y='150' fill='%23${isDarkMode ? "6b7280" : "9ca3af"}' font-size='14' font-family='sans-serif'%3E${t("book.no_cover") || "No Cover"}%3C/text%3E%3C/svg%3E`;
  };

  // Get image source
  const getImageSrc = () => {
    if (imageError || !book.imageUrl) {
      return getFallbackImage();
    }
    return book.imageUrl;
  };

  // Handle expand click
  const handleExpand = () => {
    if (onExpand) {
      onExpand(book);
    }
  };

  // Handle save click
  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) {
      onSave(book);
    }
  };

  // Handle share click
  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(book);
    }
  };

  // Handle favorite click
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(book);
    }
  };

  return (
    <div
      className={`
        book-cover-container
        relative
        ${theme.background?.bookCoverSide || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        overflow-hidden
        group
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <div className="book-cover-image-wrapper">
        <img
          src={getImageSrc()}
          alt={`${t("book.cover_of") || "Cover of"} ${book.title}`}
          className="book-cover-image"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Overlay Gradient */}
        <div
          className={`
          book-cover-overlay
          absolute inset-0
          bg-gradient-to-t from-black/60 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
        />
      </div>

      {/* Quick Action Buttons - Visible on Hover */}
      <div
        className={`
        book-cover-actions
        absolute top-3 right-3
        flex flex-col gap-2
        opacity-0 group-hover:opacity-100
        transition-all duration-300
        ${isHovered ? "translate-x-0" : "translate-x-4"}
      `}
      >
        {/* Expand Button */}
        <button
          onClick={handleExpand}
          className={`
            p-2 rounded-lg
            ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-white dark:hover:bg-gray-700"}
            backdrop-blur-sm
            transition-all duration-200 hover:scale-110
            shadow-lg
          `}
          aria-label={t("book.expand") || "Expand cover"}
        >
          <FaExpand className="w-4 h-4" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`
            p-2 rounded-lg
            ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:bg-rose-50 dark:hover:bg-rose-900/20
            hover:text-rose-600 dark:hover:text-rose-400
            backdrop-blur-sm
            transition-all duration-200 hover:scale-110
            shadow-lg
          `}
          aria-label={t("book.favorite") || "Add to favorites"}
        >
          <FaHeart className="w-4 h-4" />
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`
            p-2 rounded-lg
            ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:bg-sky-50 dark:hover:bg-sky-900/20
            hover:text-sky-600 dark:hover:text-sky-400
            backdrop-blur-sm
            transition-all duration-200 hover:scale-110
            shadow-lg
          `}
          aria-label={t("book.save") || "Save to library"}
        >
          <FaBookmark className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className={`
            p-2 rounded-lg
            ${theme.background?.section || "bg-white/90 dark:bg-gray-800/90"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:bg-emerald-50 dark:hover:bg-emerald-900/20
            hover:text-emerald-600 dark:hover:text-emerald-400
            backdrop-blur-sm
            transition-all duration-200 hover:scale-110
            shadow-lg
          `}
          aria-label={t("book.share") || "Share"}
        >
          <FaShare className="w-4 h-4" />
        </button>
      </div>

      {/* Book Info Overlay - Bottom */}
      <div
        className={`
        book-cover-info
        absolute bottom-0 left-0 right-0
        p-4
        bg-gradient-to-t from-black/80 via-black/40 to-transparent
        transform translate-y-full group-hover:translate-y-0
        transition-transform duration-300
      `}
      >
        <h3 className="text-white text-sm font-medium truncate">
          {book.title}
        </h3>
        <p className="text-gray-300 text-xs truncate">{book.author}</p>
        {book.rating && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-white text-xs">{book.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Badge - Status */}
      {book.status && (
        <div
          className={`
          book-cover-badge
          absolute top-3 left-3
          px-2 py-1 rounded-lg
          text-xs font-medium
          ${book.status === "reading" ? "bg-sky-500 text-white" : ""}
          ${book.status === "completed" ? "bg-green-500 text-white" : ""}
          ${book.status === "want_to_read" ? "bg-amber-500 text-white" : ""}
          shadow-lg
        `}
        >
          {(book.status === "reading" && t("book.reading")) || "Reading"}
          {(book.status === "completed" && t("book.completed")) || "Completed"}
          {(book.status === "want_to_read" && t("book.want_to_read")) ||
            "Want to Read"}
        </div>
      )}

      {/* Progress Bar */}
      {book.progress !== undefined &&
        book.progress > 0 &&
        book.progress < 100 && (
          <div className="book-cover-progress absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-sky-600 transition-all duration-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        )}
    </div>
  );
};

export default BookCover;
