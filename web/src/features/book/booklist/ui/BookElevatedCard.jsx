// src/features/book/booklist/ui/BookElevatedCard.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { BookButtons } from "@/shared/buttons";
import { ButtonInline } from "@/shared/buttoninline";
import "./BookElevatedCard.css";

const BookElevatedCard = ({ book, onTagClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

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

  const handleLike = (liked) => {
    console.log(`${liked ? "Liked" : "Unliked"}:`, book?.title);
  };

  const handleAddToLibrary = (shelf) => {
    console.log(`Added to library shelf "${shelf}":`, book?.title);
  };

  const handleShare = () => {
    console.log("Share triggered for:", book?.title);
  };

  const handleReport = () => {
    console.log("Report book:", book?.title);
  };

  const handleAskAI = () => {
    console.log("Ask AI about:", book?.title);
  };

  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  const displayYear = book.published ? formatPublishedYear(book.published) : "";
  const isNew = book.isNew || false;
  const isBestseller = book.isBestseller || false;

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`book-elevated-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"} 
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
        ${theme.shadow?.book || "shadow-xl"} 
        rounded-xl overflow-hidden
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
        ${direction === "rtl" ? "rtl" : ""}
      `}
    >
      {/* Hero Image Section - Smaller on desktop, fits mobile */}
      <div className="elevated-hero-section relative">
        <img
          src={book.imageUrl || "/placeholder-book.jpg"}
          alt={book.title}
          className="elevated-hero-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-book.jpg";
          }}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="elevated-hero-overlay" />

        {/* Badge - Smaller on mobile */}
        {(isNew || isBestseller) && (
          <div
            className={`elevated-badge ${isNew ? "badge-new" : "badge-bestseller"}`}
          >
            {isNew
              ? t("book.new") || "NEW"
              : t("book.bestseller") || "BESTSELLER"}
          </div>
        )}

        {/* Title Overlay on Image - Always visible */}
        <div className="elevated-title-overlay">
          <h2 className="elevated-hero-title">{book.title}</h2>
          <div className="elevated-hero-meta">
            <span>
              {t("book.by")} {book.author}
            </span>
            {displayYear && (
              <span className="elevated-year">({displayYear})</span>
            )}
          </div>
          {/* Rating in Hero */}
          {book.rating && (
            <div className="elevated-hero-rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`elevated-star ${
                    i < Math.floor(book.rating)
                      ? "text-amber-400"
                      : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="elevated-rating-text">
                {book.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section - Compact */}
      <div className="elevated-content">
        {/* Description - Only show on desktop */}
        {book.description && (
          <p className="elevated-description">{book.description}</p>
        )}

        {/* Tags - Compact */}
        <div className="elevated-tags">
          {getCategoryArray()
            .slice(0, 2)
            .map((cat, idx) => (
              <button
                key={`cat-${idx}`}
                onClick={() => onTagClick && onTagClick(cat)}
                className="elevated-tag"
              >
                {cat}
              </button>
            ))}
          {getTagsArray()
            .slice(0, 2)
            .map((tag, idx) => (
              <button
                key={`tag-${idx}`}
                onClick={() => onTagClick && onTagClick(tag)}
                className="elevated-tag"
              >
                {tag}
              </button>
            ))}
          {getCategoryArray().length + getTagsArray().length > 4 && (
            <span className="elevated-tag-more">
              +{getCategoryArray().length + getTagsArray().length - 4}
            </span>
          )}
        </div>

        {/* ButtonInline */}
        {book?.id && (
          <div className="elevated-actions">
            <ButtonInline
              bookId={book.id}
              bookSlug={book.slug}
              bookName={book.title || "Book"}
              authorName={book.author || "Unknown Author"}
              launchYear={
                book.publicationYear || book.year || displayYear || "N/A"
              }
              bookCover={book.imageUrl || null}
              bookRating={book.rating || 4.5}
              totalReviews={book.reviews || 128}
              pageCount={book.pages || 180}
              language={book.language || "English"}
              genres={getCategoryArray()}
              description={book.description || ""}
              summary={book.summary || ""}
              initialLiked={book.userLiked || false}
              initialInLibrary={book.userInLibrary || false}
              onLike={handleLike}
              onAddToLibrary={handleAddToLibrary}
              onShare={handleShare}
              onReport={handleReport}
              onAskAI={handleAskAI}
              className="w-full"
              variant="auto"
            />
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="elevated-bottom-buttons">
          <BookButtons.ViewDetails
            slug={book.slug || book.id}
            size="sm"
            label={t("book.read_more") || "Read More"}
            className="elevated-btn elevated-btn-primary"
          />
          {book.buttons?.getBook && (
            <BookButtons.GetBook
              url={book.buttons.getBook}
              size="sm"
              label={t("book.get_book") || "Get Book"}
              className="elevated-btn elevated-btn-secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookElevatedCard;
