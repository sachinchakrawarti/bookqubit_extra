"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { BookButtons } from "@/shared/buttons";
import { ButtonInline } from "@/shared/buttoninline";
import "./BookSquareCard.css";

const BookSquareCard = ({ book, onTagClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  const [isMounted, setIsMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format published year
  const formatPublishedYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.getFullYear().toString();
  };

  // Handle image error
  const handleImageError = (e) => {
    const target = e.target;
    target.onerror = null;
    target.src = "/placeholder-book.jpg";
  };

  // Helper to ensure category is always an array
  const getCategoryArray = () => {
    if (!book.category) return [];
    return Array.isArray(book.category) ? book.category : [book.category];
  };

  // ButtonInline handlers
  const handleLike = (liked) => {
    console.log(`${liked ? "Liked" : "Unliked"}:`, book?.title);
  };

  const handleAddToLibrary = (shelf) => {
    console.log(`Added to library shelf "${shelf}":`, book?.title);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: book?.title || "Book",
          text: `Check out "${book?.title}" by ${book?.author}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.log("Error copying to clipboard:", err));
    }
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

  // Show loading skeleton until mounted
  if (!isMounted) {
    return (
      <div className="book-square-card loading">
        <div className="book-square-card-image">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
        <div className="book-square-card-content">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <article
      dir={direction}
      style={fontStyle}
      className={`
        book-square-card
        ${theme.background?.section || "bg-white dark:bg-gray-800"} 
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
        ${theme.shadow?.container || "shadow-lg"}
        rounded-xl 
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
        ${theme.ringEffect || ""}
        relative
      `}
    >
      {/* Image with badge */}
      <div className={`book-square-card-image ${isDarkMode ? "dark" : ""}`}>
        <img
          src={book?.imageUrl || "/placeholder-book.jpg"}
          alt={`${t("book.cover_of") || "Cover of"} ${book?.title || "Book"}`}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="book-square-card-overlay" />
        {book?.badge && (
          <span className="book-square-card-badge">{book.badge}</span>
        )}
      </div>

      {/* Content */}
      <div className="book-square-card-content">
        <div className="flex-grow">
          {/* Title */}
          <h3
            className={`book-square-card-title ${isDarkMode ? "dark" : ""}`}
            title={book?.title}
          >
            {book?.title || "Untitled"}
          </h3>

          {/* Author and Published Year */}
          <div className="book-square-card-author">
            <span className="by">{t("book.by")}</span>
            {book?.authorId ? (
              <Link
                href={`/authors/${book.authorId}`}
                className={`author-name ${isDarkMode ? "dark" : ""}`}
              >
                {book.author}
              </Link>
            ) : (
              <span className={`author-name ${isDarkMode ? "dark" : ""}`}>
                {book?.author || "Unknown Author"}
              </span>
            )}
            {book?.published && (
              <span className="year">
                ({formatPublishedYear(book.published)})
              </span>
            )}
          </div>

          {/* Description */}
          {book?.description && (
            <p
              className="book-square-card-description"
              title={book.description}
            >
              {book.description}
            </p>
          )}

          {/* Category */}
          {book?.category && getCategoryArray().length > 0 && (
            <div className="book-square-card-tags">
              <span className="tag-label">
                {t("book.category") || "Category"}
              </span>
              <div className="tag-list">
                {getCategoryArray().map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => onTagClick && onTagClick(cat)}
                    className="tag-item"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subjects */}
          {book?.subjects && book.subjects.length > 0 && (
            <div className="book-square-card-tags">
              <span className="tag-label">
                {t("book.subjects") || "Subjects"}
              </span>
              <div className="tag-list">
                {book.subjects.slice(0, 3).map((subject, i) => (
                  <button
                    key={i}
                    onClick={() => onTagClick && onTagClick(subject)}
                    className="tag-item"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {book?.tags && book.tags.length > 0 && (
            <div className="book-square-card-tags">
              <span className="tag-label">{t("book.tags") || "Tags"}</span>
              <div className="tag-list">
                {book.tags.slice(0, 3).map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => onTagClick && onTagClick(tag)}
                    className="tag-item"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ButtonInline - Unified Action Bar */}
        {book?.id && (
          <div className="book-square-card-actions">
            <ButtonInline
              bookId={book.id}
              bookName={book.title || "Book"}
              authorName={book.author || "Unknown Author"}
              launchYear={book.publicationYear || book.year || "N/A"}
              bookCover={book.imageUrl || null}
              bookRating={book.rating || 4.5}
              totalReviews={book.reviews || 128}
              pageCount={book.pages || 180}
              language={book.language || "English"}
              genres={book.genres || ["Fiction", "Classic"]}
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

        {/* Book Buttons */}
        <div className="book-square-card-buttons">
          <div className="button-row">
            <BookButtons.ViewDetails
              slug={book?.slug || book?.id}
              size="sm"
              label={t("book.know_more") || "Know More"}
              className="btn btn-secondary"
            />
            {book?.buttons?.readSummary && (
              <BookButtons.Summary
                slug={book.slug || book.id}
                size="sm"
                label={t("book.summary") || "Summary"}
                className="btn btn-secondary"
              />
            )}
          </div>

          {book?.buttons?.getBook && (
            <BookButtons.GetBook
              url={book.buttons.getBook}
              size="sm"
              label={t("book.get_book") || "Get Book"}
              className="btn btn-primary button-full"
            />
          )}

          {book?.buttons?.listenAudiobook && (
            <a
              href={book.buttons.listenAudiobook}
              className="block w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-audiobook">
                {t("book.audiobook") || "Audiobook"}
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="book-square-card-border" />
    </article>
  );
};

export default BookSquareCard;
