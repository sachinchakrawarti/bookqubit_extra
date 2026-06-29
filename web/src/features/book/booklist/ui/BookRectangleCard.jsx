// src/features/book/booklist/ui/BookRectangleCard.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { BookButtons } from "@/shared/buttons";
import { ButtonInline } from "@/shared/buttoninline";
import "./BookRectangleCard.css";

const BookRectangleCard = ({ book, onTagClick }) => {
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

  const getSubjectsArray = () => {
    if (!book.subjects) return [];
    return Array.isArray(book.subjects) ? book.subjects : [book.subjects];
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

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`book-rectangle-card
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
        ${theme.shadow?.book || "shadow-lg"} 
        ${theme.background?.section || "bg-white dark:bg-gray-800"}
        rounded-xl overflow-hidden
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
        ${direction === "rtl" ? "rtl" : ""}
      `}
    >
      <div className="rectangle-card-inner">
        {/* Image Section - 40% width, full height */}
        <div className="rectangle-image-wrapper">
          <img
            src={book.imageUrl || "/placeholder-book.jpg"}
            alt={book.title}
            className="rectangle-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-book.jpg";
            }}
            loading="lazy"
          />
          {/* Badge overlay on image */}
          {(book.isNew || book.isBestseller) && (
            <div
              className={`rectangle-badge ${book.isNew ? "badge-new" : "badge-bestseller"}`}
            >
              {book.isNew ? "NEW" : "BESTSELLER"}
            </div>
          )}
        </div>

        {/* Content Section - 60% width */}
        <div className="rectangle-content-wrapper">
          <div className="rectangle-content">
            {/* Title */}
            <h2 className="rectangle-title">{book.title}</h2>

            {/* Author and Year */}
            <div className="rectangle-author-row">
              <span className="rectangle-author-prefix">{t("book.by")}</span>
              {book.authorId ? (
                <Link
                  href={`/authors/${book.authorId}`}
                  className="rectangle-author-link"
                >
                  {book.author}
                </Link>
              ) : (
                <span className="rectangle-author-name">{book.author}</span>
              )}
              {displayYear && (
                <span className="rectangle-year">({displayYear})</span>
              )}
            </div>

            {/* Rating */}
            {book.rating && (
              <div className="rectangle-rating">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`rectangle-star ${
                      i < Math.floor(book.rating)
                        ? "text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="rectangle-rating-text">
                  {book.rating.toFixed(1)}
                </span>
                <span className="rectangle-rating-count">
                  ({book.reviews || 0})
                </span>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <p className="rectangle-description">{book.description}</p>
            )}

            {/* Tags */}
            <div className="rectangle-tags">
              {getCategoryArray()
                .slice(0, 2)
                .map((cat, idx) => (
                  <button
                    key={`cat-${idx}`}
                    onClick={() => onTagClick && onTagClick(cat)}
                    className="rectangle-tag"
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
                    className="rectangle-tag"
                  >
                    {tag}
                  </button>
                ))}
              {getSubjectsArray()
                .slice(0, 1)
                .map((subject, idx) => (
                  <button
                    key={`subject-${idx}`}
                    onClick={() => onTagClick && onTagClick(subject)}
                    className="rectangle-tag"
                  >
                    {subject}
                  </button>
                ))}
              {getCategoryArray().length +
                getTagsArray().length +
                getSubjectsArray().length >
                5 && (
                <span className="rectangle-tag-more">
                  +
                  {getCategoryArray().length +
                    getTagsArray().length +
                    getSubjectsArray().length -
                    5}
                </span>
              )}
            </div>

            {/* ButtonInline */}
            {book?.id && (
              <div className="rectangle-actions">
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
            <div className="rectangle-bottom-buttons">
              <BookButtons.ViewDetails
                slug={book.slug || book.id}
                size="sm"
                label={t("book.view_details") || "View Details"}
                className="rectangle-btn rectangle-btn-primary"
              />
              {book.buttons?.getBook && (
                <BookButtons.GetBook
                  url={book.buttons.getBook}
                  size="sm"
                  label={t("book.get_book") || "Get Book"}
                  className="rectangle-btn rectangle-btn-secondary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRectangleCard;
