// src/features/book/booklist/ui/BookSpotlightCard.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { BookButtons } from "@/shared/buttons";
import "./BookMasonryCard.css";

const BookSpotlightCard = ({ book, onTagClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction } = useRTL();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const formatPublishedYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.getFullYear().toString();
  };

  const getCategoryArray = () => {
    if (!book.category) return [];
    return Array.isArray(book.category) ? book.category : [book.category];
  };

  const getTagsArray = () => {
    if (!book.tags) return [];
    return Array.isArray(book.tags) ? book.tags : [book.tags];
  };

  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  const displayYear = book.published ? formatPublishedYear(book.published) : "";

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`book-spotlight-card group
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.book || "shadow-2xl"}
        rounded-2xl overflow-hidden
        ${direction === "rtl" ? "rtl" : ""}
      `}
    >
      {/* Hero Image Section */}
      <div className="spotlight-hero">
        <img
          src={book.imageUrl || "/placeholder-book.jpg"}
          alt={book.title}
          className="spotlight-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-book.jpg";
          }}
          loading="lazy"
        />
        <div className="spotlight-overlay" />

        {/* Featured Badge */}
        <div className="spotlight-badge">
          <span className="spotlight-badge-icon">✦</span>
          {t("book.featured") || "Featured Book"}
        </div>

        {/* Content on Image */}
        <div className="spotlight-content">
          <h2 className="spotlight-title">{book.title}</h2>
          <div className="spotlight-meta">
            <span className="spotlight-author">
              {t("book.by")} {book.author}
            </span>
            {displayYear && (
              <span className="spotlight-year">• {displayYear}</span>
            )}
          </div>
          {book.rating && (
            <div className="spotlight-rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="spotlight-rating-text">
                {book.rating.toFixed(1)} ({book.reviews || 0})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="spotlight-footer">
        <p className="spotlight-description">{book.description}</p>

        <div className="spotlight-tags">
          {getCategoryArray()
            .slice(0, 3)
            .map((cat, idx) => (
              <button
                key={`cat-${idx}`}
                onClick={() => onTagClick && onTagClick(cat)}
                className="spotlight-tag"
              >
                #{cat}
              </button>
            ))}
          {getTagsArray()
            .slice(0, 2)
            .map((tag, idx) => (
              <button
                key={`tag-${idx}`}
                onClick={() => onTagClick && onTagClick(tag)}
                className="spotlight-tag"
              >
                #{tag}
              </button>
            ))}
        </div>

        <div className="spotlight-actions">
          <BookButtons.ViewDetails
            slug={book.slug || book.id}
            size="md"
            label={t("book.preview") || "Preview"}
            className="spotlight-btn spotlight-btn-primary"
          />
          {book.buttons?.getBook && (
            <BookButtons.GetBook
              url={book.buttons.getBook}
              size="md"
              label={t("book.get_book") || "Get Book"}
              className="spotlight-btn spotlight-btn-secondary"
            />
          )}
          <button
            className="spotlight-btn spotlight-btn-icon"
            aria-label="Like"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSpotlightCard;
