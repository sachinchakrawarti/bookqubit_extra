// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookActions.jsx

"use client";

import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaBookOpen,
  FaShare,
  FaBookmark,
  FaHeadphones,
  FaDownload,
  FaPrint,
  FaEllipsisV,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookActions.css";

const BookActions = ({
  book,
  theme: propTheme,
  onGetBook,
  onWishlist,
  onShare,
  onSave,
  onRead,
  onListen,
  onDownload,
  onPrint,
  onMore,
  isInWishlist = false,
  isSaved = false,
  isReading = false,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [showMore, setShowMore] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Handle wishlist toggle
  const handleWishlist = () => {
    if (onWishlist) {
      onWishlist(book);
    }
  };

  // Handle save toggle
  const handleSave = () => {
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

  // Handle get book
  const handleGetBook = () => {
    if (onGetBook) {
      onGetBook(book);
    }
  };

  // Handle read
  const handleRead = () => {
    if (onRead) {
      onRead(book);
    }
  };

  // Handle listen
  const handleListen = () => {
    if (onListen) {
      onListen(book);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (onDownload) {
      onDownload(book);
    }
  };

  // Handle print
  const handlePrint = () => {
    if (onPrint) {
      onPrint(book);
    }
  };

  // Handle more
  const handleMore = () => {
    setShowMore(!showMore);
    if (onMore) {
      onMore(book);
    }
  };

  return (
    <div className="book-actions-container">
      {/* Primary Actions */}
      <div className="book-actions-primary">
        {/* Get Book Button */}
        <button
          onClick={handleGetBook}
          className={`
            book-action-btn book-action-primary
            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
            ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
            ${theme.shadow?.button || "shadow-md"}
            hover:scale-105
          `}
        >
          <FaShoppingCart className="btn-icon" />
          <span>{t("book.get_book") || "Get Book"}</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`
            book-action-btn book-action-secondary
            ${
              isInWishlist
                ? "bg-rose-50 border-rose-400 text-rose-600 dark:bg-rose-900/20 dark:border-rose-600 dark:text-rose-400"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }
            border
            hover:scale-105
          `}
        >
          <FaHeart
            className={`btn-icon ${isInWishlist ? "text-rose-600 dark:text-rose-400" : ""}`}
          />
          <span>
            {isInWishlist
              ? t("book.wishlisted") || "Wishlisted"
              : t("book.wishlist") || "Wishlist"}
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className={`
            book-action-btn book-action-secondary
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
            hover:scale-105
          `}
        >
          <FaShare className="btn-icon" />
          <span>{t("book.share") || "Share"}</span>
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="book-actions-secondary">
        {/* Read Button */}
        {onRead && (
          <button
            onClick={handleRead}
            className={`
              book-action-btn book-action-secondary
              border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-800
              hover:scale-105
            `}
          >
            <FaBookOpen className="btn-icon" />
            <span>{t("book.read") || "Read"}</span>
          </button>
        )}

        {/* Listen Button */}
        {onListen && (
          <button
            onClick={handleListen}
            className={`
              book-action-btn book-action-secondary
              border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-800
              hover:scale-105
            `}
          >
            <FaHeadphones className="btn-icon" />
            <span>{t("book.listen") || "Listen"}</span>
          </button>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`
            book-action-btn book-action-secondary
            ${
              isSaved
                ? "bg-sky-50 border-sky-400 text-sky-600 dark:bg-sky-900/20 dark:border-sky-600 dark:text-sky-400"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }
            border
            hover:scale-105
          `}
        >
          <FaBookmark
            className={`btn-icon ${isSaved ? "text-sky-600 dark:text-sky-400" : ""}`}
          />
          <span>
            {isSaved ? t("book.saved") || "Saved" : t("book.save") || "Save"}
          </span>
        </button>

        {/* More Button */}
        <button
          onClick={handleMore}
          className={`
            book-action-btn book-action-secondary
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
            hover:scale-105
            relative
          `}
        >
          <FaEllipsisV className="btn-icon" />
          <span>{t("book.more") || "More"}</span>

          {/* Dropdown Menu */}
          {showMore && (
            <div
              className={`
                absolute right-0 top-full mt-2
                min-w-[180px]
                ${theme.background?.section || "bg-white dark:bg-gray-800"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                ${theme.shadow?.container || "shadow-lg"}
                rounded-lg
                overflow-hidden
                z-50
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Download */}
              <button
                onClick={handleDownload}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm
                  ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                  hover:${theme.background?.hover || "hover:bg-gray-50 dark:hover:bg-gray-700"}
                  transition-colors duration-150
                `}
              >
                <FaDownload className="w-4 h-4" />
                {t("book.download") || "Download"}
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm
                  ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                  hover:${theme.background?.hover || "hover:bg-gray-50 dark:hover:bg-gray-700"}
                  transition-colors duration-150
                `}
              >
                <FaPrint className="w-4 h-4" />
                {t("book.print") || "Print"}
              </button>

              {/* Divider */}
              <div
                className={`
                h-px
                ${theme.border?.default || "bg-gray-200 dark:bg-gray-700"}
              `}
              />

              {/* Report */}
              <button
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm text-red-600 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors duration-150
                `}
              >
                <span>🚩</span>
                {t("book.report") || "Report"}
              </button>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Actions - Horizontal Scroll */}
      <div className="book-actions-mobile">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* Get Book */}
          <button
            onClick={handleGetBook}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap
              ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
              ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
              ${theme.shadow?.button || "shadow-md"}
              hover:scale-105 transition-all duration-200
            `}
          >
            <FaShoppingCart size={14} />
            {t("book.get_book") || "Get"}
          </button>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap
              ${
                isInWishlist
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }
              hover:scale-105 transition-all duration-200
            `}
          >
            <FaHeart
              className={isInWishlist ? "text-rose-600 dark:text-rose-400" : ""}
              size={14}
            />
            {isInWishlist
              ? t("book.wishlisted") || "Wishlisted"
              : t("book.wishlist") || "Wishlist"}
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap
              ${
                isSaved
                  ? "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }
              hover:scale-105 transition-all duration-200
            `}
          >
            <FaBookmark
              className={isSaved ? "text-sky-600 dark:text-sky-400" : ""}
              size={14}
            />
            {isSaved ? t("book.saved") || "Saved" : t("book.save") || "Save"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap
              bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300
              hover:scale-105 transition-all duration-200
            `}
          >
            <FaShare size={14} />
            {t("book.share") || "Share"}
          </button>

          {/* Read */}
          {onRead && (
            <button
              onClick={handleRead}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-sm font-medium whitespace-nowrap
                bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300
                hover:scale-105 transition-all duration-200
              `}
            >
              <FaBookOpen size={14} />
              {t("book.read") || "Read"}
            </button>
          )}

          {/* Listen */}
          {onListen && (
            <button
              onClick={handleListen}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-sm font-medium whitespace-nowrap
                bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300
                hover:scale-105 transition-all duration-200
              `}
            >
              <FaHeadphones size={14} />
              {t("book.listen") || "Listen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookActions;
