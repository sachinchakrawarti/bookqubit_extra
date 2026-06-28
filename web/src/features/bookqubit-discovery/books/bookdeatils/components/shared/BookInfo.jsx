// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookInfo.jsx

"use client";

import React from "react";
import { FaStar, FaBookOpen, FaUsers, FaClock } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookInfo.css";

const BookInfo = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < Math.floor(rating || 0)
            ? theme.iconColors?.starFilled || "text-amber-400 fill-amber-400"
            : theme.iconColors?.starEmpty || "text-gray-300 dark:text-gray-600"
        } ${i > 0 ? "ml-1" : ""}`}
        size={16}
      />
    ));
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      Fiction:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Non-Fiction":
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Science Fiction":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Fantasy:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      Mystery:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
      Romance:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      Thriller: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      "Self-Help":
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      Biography:
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
      History:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="book-info-container">
      {/* Title and Author */}
      <div className="book-info-header">
        <h1
          className={`
            book-info-title
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-serif font-bold
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            leading-tight
          `}
        >
          {book.title}
        </h1>
        <p
          className={`
            book-info-author
            text-base sm:text-lg md:text-xl
            ${theme.textColors?.highlight || "text-sky-700 dark:text-sky-400"}
            font-medium
            mt-1
          `}
        >
          {t("book.by") || "by"} {book.author}
        </p>
      </div>

      {/* Meta Info */}
      <div className="book-info-meta">
        <span
          className={`
            book-info-category
            inline-block
            px-3 py-1 rounded-full
            text-xs sm:text-sm font-medium
            ${getCategoryColor(book.category)}
            ${theme.shadow?.button || "shadow-sm"}
          `}
        >
          {book.category || t("book.uncategorized") || "Uncategorized"}
        </span>

        <div className="book-info-rating flex items-center">
          <div className="flex mr-2">{renderStars(book.rating)}</div>
          <span
            className={`
              text-sm
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            `}
          >
            ({book.rating?.toFixed(1) || "0"}/5)
          </span>
          {book.reviewCount && (
            <span
              className={`
                text-sm ml-2
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
            >
              ({book.reviewCount} {t("book.reviews") || "reviews"})
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="book-info-stats">
        <div className="stat-item">
          <FaBookOpen className="stat-icon" />
          <div>
            <span
              className={`
                block text-xs
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
            >
              {t("book.pages") || "Pages"}
            </span>
            <span
              className={`
                font-medium
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              `}
            >
              {book.pageCount || "N/A"}
            </span>
          </div>
        </div>

        <div className="stat-item">
          <FaUsers className="stat-icon" />
          <div>
            <span
              className={`
                block text-xs
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
            >
              {t("book.language") || "Language"}
            </span>
            <span
              className={`
                font-medium
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              `}
            >
              {book.language || "N/A"}
            </span>
          </div>
        </div>

        <div className="stat-item">
          <FaClock className="stat-icon" />
          <div>
            <span
              className={`
                block text-xs
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
            >
              {t("book.published") || "Published"}
            </span>
            <span
              className={`
                font-medium
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              `}
            >
              {formatDate(book.publishedDate) || book.published || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {book.description && (
        <div className="book-info-description">
          <p
            className={`
              text-sm sm:text-base
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              leading-relaxed
            `}
          >
            {book.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
