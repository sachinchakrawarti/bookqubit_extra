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

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className={`star-icon ${theme.iconColors?.starFilled || "text-amber-400"}`}
          >
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span
            key="half"
            className={`star-icon ${theme.iconColors?.starFilled || "text-amber-400"}`}
          >
            ½
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className={`star-icon ${theme.iconColors?.starEmpty || "text-gray-300"}`}
          >
            ★
          </span>
        ))}
        <span
          className={`rating-value ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}`}
        >
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Format published year
  const formatPublishedYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.getFullYear().toString();
  };

  // Helper to ensure category is always an array
  const getCategoryArray = () => {
    if (!book.category) return [];
    return Array.isArray(book.category) ? book.category : [book.category];
  };

  // Helper to ensure tags is always an array
  const getTagsArray = () => {
    if (!book.tags) return [];
    return Array.isArray(book.tags) ? book.tags : [book.tags];
  };

  // Helper to ensure subjects is always an array
  const getSubjectsArray = () => {
    if (!book.subjects) return [];
    return Array.isArray(book.subjects) ? book.subjects : [book.subjects];
  };

  // ButtonInline handlers
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

  // Apply font family inline style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  // Get year for display
  const displayYear = book.published ? formatPublishedYear(book.published) : "";

  return (
    <div
      dir={direction}
      style={fontStyle}
      className={`book-rectangle-card flex flex-col md:flex-row h-auto md:h-[520px] mx-auto w-full md:w-[85%] max-w-6xl 
      ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
      ${theme.shadow?.book || "shadow-2xl"} 
      ${theme.background?.section || "bg-white dark:bg-gray-800"}
      overflow-hidden rounded-xl relative ${direction === "rtl" ? "rtl" : ""}`}
    >
      {/* Image section - Full width on mobile, 35% on desktop */}
      <div
        className={`w-full md:w-[35%] h-[200px] md:h-full 
        ${theme.background?.bookCoverSide || "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"} 
        flex items-center justify-center p-4 md:p-5 flex-shrink-0 relative group`}
      >
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/default-book-cover.jpg";
          }}
          loading="lazy"
        />
      </div>

      {/* Details section - Full width on mobile, 65% on desktop */}
      <div className="w-full md:w-[65%] p-3 md:p-5 flex flex-col h-full">
        <div className="book-card-content flex-1 overflow-y-auto pr-2">
          {/* Title */}
          <h2
            className={`text-lg md:text-2xl font-bold ${theme.textColors?.primary || "text-gray-900 dark:text-white"} mb-1 md:mb-2 line-clamp-2 ${textAlign}`}
          >
            {book.title}
          </h2>

          {/* Author and year - Year in parentheses */}
          <div
            className={`flex flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-3 text-xs md:text-sm ${flexDirection}`}
          >
            <span
              className={
                theme.textColors?.secondary ||
                "text-gray-600 dark:text-gray-400"
              }
            >
              {t("book.by")}
            </span>
            {book.authorId ? (
              <Link
                href={`/authors/${book.authorId}`}
                className={`font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} hover:underline text-xs md:text-sm`}
              >
                {book.author}
              </Link>
            ) : (
              <span
                className={`font-semibold ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} text-xs md:text-sm`}
              >
                {book.author}
              </span>
            )}
            {displayYear && (
              <span
                className={`text-[10px] md:text-[11px] ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
              >
                ({displayYear})
              </span>
            )}
          </div>

          {/* Rating */}
          {book.rating && (
            <div className="mb-2 md:mb-3">{renderStars(book.rating)}</div>
          )}

          {/* Description - Show on mobile too */}
          <p
            className={`text-xs md:text-sm ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed ${textAlign}`}
          >
            {book.description}
          </p>

          {/* Tags - Show on mobile too */}
          <div className="space-y-1.5 md:space-y-2">
            {/* Category */}
            {book.category && getCategoryArray().length > 0 && (
              <div
                className={`flex flex-wrap items-start gap-1 md:gap-2 ${direction === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`metadata-label ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} ${textAlign === "text-right" ? "text-right" : "text-left"}`}
                >
                  {t("book.category")}:
                </span>
                <div className={`flex flex-wrap gap-1 ${flexDirection}`}>
                  {getCategoryArray().slice(0, 3).map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(cat)}
                      className={`metadata-tag ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"} ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}`}
                    >
                      {cat}
                    </button>
                  ))}
                  {getCategoryArray().length > 3 && (
                    <span className="metadata-tag-more">
                      +{getCategoryArray().length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags - Always visible */}
            {book.tags && getTagsArray().length > 0 && (
              <div
                className={`flex flex-wrap items-start gap-1 md:gap-2 ${direction === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`metadata-label ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} ${textAlign === "text-right" ? "text-right" : "text-left"}`}
                >
                  {t("book.tags")}:
                </span>
                <div className={`flex flex-wrap gap-1 ${flexDirection}`}>
                  {getTagsArray().slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(tag)}
                      className={`metadata-tag ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"} ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}`}
                    >
                      {tag}
                    </button>
                  ))}
                  {getTagsArray().length > 3 && (
                    <span className="metadata-tag-more">
                      +{getTagsArray().length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Subjects - Show on mobile too */}
            {book.subjects && getSubjectsArray().length > 0 && (
              <div
                className={`flex flex-wrap items-start gap-1 md:gap-2 ${direction === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`metadata-label ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"} ${textAlign === "text-right" ? "text-right" : "text-left"}`}
                >
                  {t("book.subjects")}:
                </span>
                <div className={`flex flex-wrap gap-1 ${flexDirection}`}>
                  {getSubjectsArray().slice(0, 3).map((subject, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick && onTagClick(subject)}
                      className={`metadata-tag ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-700"} ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"} hover:${theme.background?.bookCoverSide || "bg-gray-200 dark:bg-gray-600"}`}
                    >
                      {subject}
                    </button>
                  ))}
                  {getSubjectsArray().length > 3 && (
                    <span className="metadata-tag-more">
                      +{getSubjectsArray().length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ButtonInline - Mobile and Desktop */}
        {book?.id && (
          <div className="mt-2 md:mt-4 w-full">
            <ButtonInline
              bookId={book.id}
              bookSlug={book.slug}
              bookName={book.title || "Book"}
              authorName={book.author || "Unknown Author"}
              launchYear={book.publicationYear || book.year || "N/A"}
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
              navigateToBookOnShare={true}
              className="w-full"
              variant="auto"
            />
          </div>
        )}

        {/* Buttons - View Details and Get Book (Mobile & Desktop) */}
        <div
          className={`flex flex-col gap-2 pt-2 md:pt-3 mt-2 md:mt-3 border-t ${theme.border?.default || "border-gray-200 dark:border-gray-700"}`}
        >
          <div className={`flex flex-wrap gap-2 ${flexDirection}`}>
            {/* View Details - Using BookButtons */}
            <BookButtons.ViewDetails
              slug={book.slug || book.id}
              size="md"
              label={t("book.view_details") || "View Details"}
              className="flex-1 min-w-[120px] book-action-button book-action-button-primary"
            />

            {/* Get Book - Using BookButtons */}
            {book.buttons?.getBook && (
              <BookButtons.GetBook
                url={book.buttons.getBook}
                size="md"
                label={t("book.get_book") || "Get Book"}
                className="flex-1 min-w-[120px] book-action-button book-action-button-secondary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRectangleCard;