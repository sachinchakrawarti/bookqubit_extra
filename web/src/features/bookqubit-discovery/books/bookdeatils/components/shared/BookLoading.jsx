// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookLoading.jsx

"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookLoading.css";

const BookLoading = ({
  type = "full", // "full" | "skeleton" | "spinner"
  count = 1,
  theme: propTheme,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Full Page Loading
  if (type === "full") {
    return (
      <div className="book-loading-full">
        <div className="book-loading-content">
          {/* Spinner */}
          <div className="book-loading-spinner-wrapper">
            <div
              className={`
              book-loading-spinner
              ${theme.buttonColors?.primaryButton?.background || "border-sky-500"}
            `}
            />
          </div>

          {/* Text */}
          <p
            className={`
            book-loading-text
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {t("common.loading") || "Loading..."}
          </p>

          {/* Dots Animation */}
          <div className="book-loading-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>
    );
  }

  // Skeleton Loading
  if (type === "skeleton") {
    return (
      <div className="book-loading-skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`
              book-loading-skeleton
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
            `}
          >
            {/* Cover Skeleton */}
            <div className="book-loading-skeleton-cover" />

            {/* Content Skeleton */}
            <div className="book-loading-skeleton-content">
              {/* Title */}
              <div className="book-loading-skeleton-line book-loading-skeleton-line-lg" />
              <div className="book-loading-skeleton-line book-loading-skeleton-line-md" />

              {/* Rating */}
              <div className="book-loading-skeleton-rating">
                <div className="book-loading-skeleton-star" />
                <div className="book-loading-skeleton-star" />
                <div className="book-loading-skeleton-star" />
                <div className="book-loading-skeleton-star" />
                <div className="book-loading-skeleton-star" />
              </div>

              {/* Stats */}
              <div className="book-loading-skeleton-stats">
                <div className="book-loading-skeleton-line book-loading-skeleton-line-sm" />
                <div className="book-loading-skeleton-line book-loading-skeleton-line-sm" />
                <div className="book-loading-skeleton-line book-loading-skeleton-line-sm" />
              </div>

              {/* Actions */}
              <div className="book-loading-skeleton-actions">
                <div className="book-loading-skeleton-btn" />
                <div className="book-loading-skeleton-btn" />
                <div className="book-loading-skeleton-btn" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Spinner Only
  return (
    <div className="book-loading-spinner-only">
      <div
        className={`
        book-loading-spinner
        ${theme.buttonColors?.primaryButton?.background || "border-sky-500"}
      `}
      />
    </div>
  );
};

export default BookLoading;
