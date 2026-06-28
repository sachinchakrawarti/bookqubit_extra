// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookKeyPoints.jsx

"use client";

import React, { useState } from "react";
import {
  FaStar,
  FaCheckCircle,
  FaLightbulb,
  FaQuoteRight,
  FaChevronDown,
  FaChevronUp,
  FaFire,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookKeyPoints.css";

const BookKeyPoints = ({
  book,
  theme: propTheme,
  maxDisplay = 4,
  showAll = false,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(showAll);
  const [likedHighlights, setLikedHighlights] = useState([]);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get highlights from book data
  const highlights = book.keyPoints || book.highlights || [];

  // If no highlights, show a message
  if (!highlights || highlights.length === 0) {
    return (
      <div
        className={`
        book-highlights-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaLightbulb className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_highlights") || "No highlights available for this book."}
        </p>
      </div>
    );
  }

  // Get highlight icon based on index
  const getHighlightIcon = (index) => {
    const icons = [
      <FaStar className="highlight-icon text-amber-500" />,
      <FaCheckCircle className="highlight-icon text-emerald-500" />,
      <FaLightbulb className="highlight-icon text-yellow-500" />,
      <FaFire className="highlight-icon text-red-500" />,
      <FaHeart className="highlight-icon text-rose-500" />,
      <FaBookmark className="highlight-icon text-sky-500" />,
    ];
    return icons[index % icons.length];
  };

  // Get highlight color based on index
  const getHighlightColor = (index) => {
    const colors = [
      "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10",
      "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10",
      "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10",
      "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10",
      "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/10",
      "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/10",
    ];
    return colors[index % colors.length];
  };

  // Toggle like on highlight
  const toggleLike = (index) => {
    setLikedHighlights((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Get display highlights
  const displayHighlights = expanded
    ? highlights
    : highlights.slice(0, maxDisplay);
  const hasMore = highlights.length > maxDisplay;

  return (
    <div className="book-keypoints-container">
      {/* Header */}
      <div className="book-keypoints-header">
        <div className="book-keypoints-title-wrapper">
          <span className="book-keypoints-icon">⭐</span>
          <h3
            className={`
            book-keypoints-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.key_highlights") || "Key Highlights"}
          </h3>
        </div>
        <span
          className={`
          book-keypoints-count
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {highlights.length} {t("book.highlights") || "highlights"}
        </span>
      </div>

      {/* Highlights List */}
      <div className="book-keypoints-list">
        {displayHighlights.map((highlight, index) => (
          <div
            key={index}
            className={`
              book-keypoint-item
              ${getHighlightColor(index)}
              border
              rounded-xl
              p-4
              transition-all duration-200
              hover:shadow-md
              hover:scale-[1.02]
            `}
          >
            <div className="book-keypoint-content">
              <div className="book-keypoint-icon-wrapper">
                {getHighlightIcon(index)}
              </div>
              <div className="book-keypoint-text-wrapper">
                <p
                  className={`
                  book-keypoint-text
                  ${theme.textColors?.primary || "text-gray-800 dark:text-gray-200"}
                `}
                >
                  {highlight}
                </p>
                <div className="book-keypoint-meta">
                  <span
                    className={`
                    book-keypoint-number
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  `}
                  >
                    #{index + 1}
                  </span>
                  <button
                    onClick={() => toggleLike(index)}
                    className={`
                      book-keypoint-like
                      transition-all duration-200 hover:scale-110
                      ${
                        likedHighlights.includes(index)
                          ? "text-rose-500"
                          : "text-gray-400 dark:text-gray-500 hover:text-rose-400"
                      }
                    `}
                  >
                    <FaHeart className="w-3 h-3" />
                    <span className="text-xs ml-1">
                      {likedHighlights.includes(index) ? 1 : 0}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <button
          onClick={toggleExpand}
          className={`
            book-keypoints-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.show_less") || "Show Less"
              : t("book.show_more") ||
                `Show All (${highlights.length - maxDisplay} more)`}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* Quote Footer */}
      {highlights.length > 0 && (
        <div
          className={`
          book-keypoints-footer
          ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
        `}
        >
          <FaQuoteRight
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
            {t("book.highlights_footer") || "Key insights from the book"}
          </span>
        </div>
      )}
    </div>
  );
};

export default BookKeyPoints;
