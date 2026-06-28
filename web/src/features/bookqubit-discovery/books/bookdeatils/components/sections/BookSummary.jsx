// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookSummary.jsx

"use client";

import React, { useState } from "react";
import {
  FaList,
  FaChevronDown,
  FaChevronUp,
  FaBookOpen,
  FaClock,
  FaStar,
  FaUser,
  FaQuoteLeft,
  FaQuoteRight,
  FaShare,
  FaBookmark,
  FaHeart,
  FaCheckCircle,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookSummary.css";

const BookSummary = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get summary from book data
  const summary = book.summary || book.synopsis || book.description || "";

  // If no summary, show a message
  if (!summary || summary.length === 0) {
    return (
      <div
        className={`
        book-summary-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaBookOpen className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_summary") || "No summary available for this book."}
        </p>
      </div>
    );
  }

  // Get word count
  const wordCount = summary.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const isLongText = wordCount > 150;

  // Get display text
  const displayText =
    expanded || !isLongText ? summary : summary.slice(0, 400) + "...";
  const shouldShowToggle = isLongText;

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Toggle like
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Toggle save
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Get key takeaways from book data or generate from summary
  const getKeyTakeaways = () => {
    if (book.keyTakeaways && book.keyTakeaways.length > 0) {
      return book.keyTakeaways;
    }
    // Generate from summary (first few sentences)
    const sentences = summary
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 20);
    return sentences.slice(0, 4).map((s) => s.trim());
  };

  const keyTakeaways = getKeyTakeaways();

  return (
    <div className="book-summary-container">
      {/* Header */}
      <div className="book-summary-header">
        <div className="book-summary-title-wrapper">
          <span className="book-summary-icon">📋</span>
          <h3
            className={`
            book-summary-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.summary") || "Summary"}
          </h3>
        </div>
        <div className="book-summary-meta">
          <span
            className={`
            book-summary-meta-item
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <FaClock className="w-3 h-3" />
            {readingTime} {t("book.min_read") || "min read"}
          </span>
          <span
            className={`
            book-summary-meta-item
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <FaBookOpen className="w-3 h-3" />
            {wordCount} {t("book.words") || "words"}
          </span>
        </div>
      </div>

      {/* Summary Text */}
      <div className="book-summary-text-wrapper">
        <FaQuoteLeft
          className={`
          book-summary-quote-icon
          ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
        `}
        />

        <div className="book-summary-text">
          <p
            className={`
            book-summary-paragraph
            ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
            leading-relaxed
          `}
          >
            {displayText}
          </p>
        </div>

        <FaQuoteRight
          className={`
          book-summary-quote-icon book-summary-quote-icon-right
          ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
        `}
        />
      </div>

      {/* Show More/Less Button */}
      {shouldShowToggle && (
        <button
          onClick={toggleExpand}
          className={`
            book-summary-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.show_less") || "Show Less"
              : t("book.read_full_summary") || "Read Full Summary"}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* Key Takeaways */}
      {keyTakeaways.length > 0 && (
        <div className="book-summary-takeaways">
          <div className="book-summary-takeaways-header">
            <FaLightbulb className="w-4 h-4 text-yellow-500" />
            <h4
              className={`
              book-summary-takeaways-title
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            `}
            >
              {t("book.key_takeaways") || "Key Takeaways"}
            </h4>
          </div>
          <ul className="book-summary-takeaways-list">
            {keyTakeaways
              .slice(0, expanded ? keyTakeaways.length : 3)
              .map((takeaway, index) => (
                <li
                  key={index}
                  className={`
                  book-summary-takeaway-item
                  ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  rounded-lg
                  p-3
                  transition-all duration-200 hover:scale-[1.02]
                `}
                >
                  <FaCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span
                    className={`
                  text-sm
                  ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                `}
                  >
                    {takeaway}
                  </span>
                </li>
              ))}
          </ul>
          {keyTakeaways.length > 3 && !expanded && (
            <button
              onClick={toggleExpand}
              className={`
                book-summary-takeaways-more
                ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
                hover:underline
                transition-all duration-200
              `}
            >
              {t("book.show_more_takeaways") || "Show more takeaways"}{" "}
              <FaArrowRight className="w-3 h-3 inline" />
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="book-summary-actions">
        <button
          onClick={handleLike}
          className={`
            book-summary-action-btn
            ${isLiked ? "text-rose-500" : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
            transition-all duration-200 hover:scale-110
          `}
        >
          <FaHeart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
          {isLiked ? t("book.liked") || "Liked" : t("book.like") || "Like"}
        </button>
        <button
          onClick={handleSave}
          className={`
            book-summary-action-btn
            ${isSaved ? "text-sky-500" : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
            transition-all duration-200 hover:scale-110
          `}
        >
          <FaBookmark className={`w-4 h-4 ${isSaved ? "fill-sky-500" : ""}`} />
          {isSaved ? t("book.saved") || "Saved" : t("book.save") || "Save"}
        </button>
        <button
          className={`
            book-summary-action-btn
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
        book-summary-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaUser
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
          {t("book.summary_footer") || "A brief overview of the book's content"}
        </span>
      </div>
    </div>
  );
};

export default BookSummary;
