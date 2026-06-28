// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookAbout.jsx

"use client";

import React, { useState } from "react";
import {
  FaBook,
  FaUser,
  FaQuoteLeft,
  FaQuoteRight,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaShare,
  FaBookmark,
  FaRegClock,
  FaRegStar,
  FaTag,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookAbout.css";

const BookAbout = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get about text from book data
  const aboutText = book.about || book.description || book.synopsis || "";

  // If no about text, show a message
  if (!aboutText || aboutText.length === 0) {
    return (
      <div
        className={`
        book-about-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaBook className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_about") || "No description available for this book."}
        </p>
      </div>
    );
  }

  // Get word count
  const wordCount = aboutText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
  const isLongText = wordCount > 100;

  // Get display text
  const displayText =
    expanded || !isLongText ? aboutText : aboutText.slice(0, 300) + "...";
  const shouldShowToggle = isLongText;

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Toggle like
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Get book themes from book data
  const themes = book.themes || book.tags || [];

  return (
    <div className="book-about-container">
      {/* Header */}
      <div className="book-about-header">
        <div className="book-about-title-wrapper">
          <span className="book-about-icon">📖</span>
          <h3
            className={`
            book-about-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.about_this_book") || "About This Book"}
          </h3>
        </div>
        <div className="book-about-meta">
          <span
            className={`
            book-about-meta-item
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <FaRegClock className="w-3 h-3" />
            {readingTime} {t("book.min_read") || "min read"}
          </span>
          <span
            className={`
            book-about-meta-item
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <FaRegStar className="w-3 h-3" />
            {wordCount} {t("book.words") || "words"}
          </span>
        </div>
      </div>

      {/* Author Info */}
      {book.author && (
        <div
          className={`
          book-about-author
          ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          rounded-xl
          p-4
        `}
        >
          <div className="book-about-author-content">
            <div className="book-about-author-avatar">
              <FaUser className="w-6 h-6" />
            </div>
            <div className="book-about-author-info">
              <span
                className={`
                book-about-author-name
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              `}
              >
                {book.author}
              </span>
              <span
                className={`
                book-about-author-label
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
              >
                {t("book.author") || "Author"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* About Text */}
      <div className="book-about-text-wrapper">
        <FaQuoteLeft
          className={`
          book-about-quote-icon
          ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
        `}
        />

        <div className="book-about-text">
          <p
            className={`
            book-about-paragraph
            ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
            leading-relaxed
          `}
          >
            {displayText}
          </p>
        </div>

        <FaQuoteRight
          className={`
          book-about-quote-icon book-about-quote-icon-right
          ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
        `}
        />
      </div>

      {/* Show More/Less Button */}
      {shouldShowToggle && (
        <button
          onClick={toggleExpand}
          className={`
            book-about-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.read_less") || "Read Less"
              : t("book.read_more") || "Read More"}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* Themes/Tags */}
      {themes.length > 0 && (
        <div className="book-about-themes">
          <span
            className={`
            book-about-themes-label
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <FaTag className="w-3 h-3" />
            {t("book.themes") || "Themes"}:
          </span>
          <div className="book-about-themes-list">
            {themes.slice(0, 8).map((theme, index) => (
              <span
                key={index}
                className={`
                  book-about-theme-tag
                  ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                  ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                `}
              >
                #{theme}
              </span>
            ))}
            {themes.length > 8 && (
              <span
                className={`
                book-about-theme-tag
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              `}
              >
                +{themes.length - 8} {t("book.more") || "more"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="book-about-actions">
        <button
          onClick={handleLike}
          className={`
            book-about-action-btn
            ${isLiked ? "text-rose-500" : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
            transition-all duration-200 hover:scale-110
          `}
        >
          <FaHeart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
          {isLiked ? t("book.liked") || "Liked" : t("book.like") || "Like"}
        </button>
        <button
          className={`
            book-about-action-btn
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
            transition-all duration-200 hover:scale-110
          `}
        >
          <FaBookmark className="w-4 h-4" />
          {t("book.save") || "Save"}
        </button>
        <button
          className={`
            book-about-action-btn
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
            transition-all duration-200 hover:scale-110
          `}
        >
          <FaShare className="w-4 h-4" />
          {t("book.share") || "Share"}
        </button>
      </div>

      {/* Footer */}
      <div
        className={`
        book-about-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaBook
          className={`
          w-4 h-4
          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
        `}
        />
        <span
          className={`
          text-xs
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.about_footer") || "Learn more about this book"}
        </span>
      </div>
    </div>
  );
};

export default BookAbout;
