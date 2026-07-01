// src/features/book/booklist/ui/BookModernCard.jsx
"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import "./BookModernCard.css";

const getCollectionsAsArray = (collection) => {
  if (!collection) return [];
  return Array.isArray(collection) ? collection : [collection];
};

const formatPublishedYear = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.getFullYear().toString();
};

const BookModernCard = ({
  book,
  collections = [],
  showCollections = true,
  className = "",
  variant = "default",
  onBookAction,
}) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const [isHovered, setIsHovered] = useState(false);

  const isDarkMode = useMemo(() => 
    ["dark", "midnight", "cyberpunk"].includes(themeName),
    [themeName]
  );

  if (!theme) return null;

  const bookCollections = collections.length > 0
    ? collections
    : getCollectionsAsArray(book.collection);

  const fallbackImage = "/placeholder-book.jpg";
  const bookSlug = book?.slug || book?.id;
  const fontStyle = currentFont?.family ? { fontFamily: currentFont.family } : {};

  const handleCardClick = useCallback(() => {
    if (bookSlug) {
      router.push(`/books/${bookSlug}`);
      if (onBookAction) onBookAction('view', book);
    }
  }, [bookSlug, router, onBookAction, book]);

  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onBookAction) onBookAction('tag', { book, tag });
  }, [onBookAction, book]);

  const handleViewDetails = useCallback((e) => {
    e.stopPropagation();
    if (bookSlug) {
      router.push(`/books/${bookSlug}`);
      if (onBookAction) onBookAction('viewDetails', book);
    }
  }, [bookSlug, router, onBookAction, book]);

  // Generate star ratings based on book rating data or fallback safely
  const rating = book?.rating || 4; 

  return (
    <div
      dir={direction}
      style={fontStyle}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`book-modern-card
        ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${className}
        ${isHovered ? 'book-modern-card-hovered' : ''}
        ${direction === "rtl" ? "rtl" : ""}
      `}
    >
      {/* Top Section: Styled Container Header for Image */}
      <div className="book-modern-image-header">
        <div className="book-modern-image-wrapper">
          <img
            src={book.imageUrl || fallbackImage}
            alt={book.title}
            className="book-modern-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Section: Content Details */}
      <div className="book-modern-content">
        {/* Title */}
        <h3 className={`book-modern-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
          {book.title}
        </h3>

        {/* Author (with "by" format) */}
        <p className={`book-modern-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
          {direction === "rtl" ? "" : "by "}
          {book.author}
          {direction === "rtl" ? " بقلم" : ""}
        </p>

        {/* Star Ratings Row */}
        <div className="book-modern-rating">
          {[...Array(5)].map((_, index) => (
            <span 
              key={index} 
              className={`star ${index < Math.floor(rating) ? 'filled' : 'empty'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Description */}
        <p className={`book-modern-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}>
          {book.description || book.subtitle}
        </p>

        {/* Collections/Tags */}
        {showCollections && bookCollections.length > 0 && (
          <div className="book-modern-tags-wrapper">
            {bookCollections.slice(0, 1).map((collection, idx) => (
              <span
                key={`collection-${collection}-${idx}`}
                onClick={(e) => handleTagClick(e, collection)}
                className={`book-modern-tag ${
                  isDarkMode 
                    ? "bg-sky-950/40 text-sky-300 hover:bg-sky-900/60" 
                    : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                }`}
              >
                {collection}
              </span>
            ))}
            {bookCollections.length > 1 && (
              <span className={`book-modern-tag-more ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
                +{bookCollections.length - 1}
              </span>
            )}
          </div>
        )}

        {/* Full-width View Details Action Button */}
        <div className="book-modern-actions">
          <button
            onClick={handleViewDetails}
            className={`book-modern-btn-view-details`}
          >
            {t("book.view_details") || "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookModernCard);