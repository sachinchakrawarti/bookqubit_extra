"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { ButtonInline } from "@/shared/buttoninline";
import "./BookCompactCard.css";

const BookCompactCard = ({
  book,
  collections = [],
  showCollections = true,
  className = "",
}) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { currentFont } = useFont();
  const { direction, textAlign, flexDirection } = useRTL();

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const getCollectionsAsArray = (collection) => {
    if (!collection) return [];
    return Array.isArray(collection) ? collection : [collection];
  };

  const bookCollections =
    collections.length > 0
      ? collections
      : getCollectionsAsArray(book.collection);

  const fallbackImage = "/placeholder-book.jpg";

  const handleCardClick = () => {
    router.push(`/books/${book.slug || book.id}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    console.log("Tag clicked:", tag);
  };

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

  const handleGetBook = (e) => {
    e.stopPropagation();
    if (book?.buttons?.getBook) {
      window.open(book.buttons.getBook, "_blank");
    }
  };

  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  return (
    <div
      dir={direction}
      style={fontStyle}
      onClick={handleCardClick}
      className={`book-compact-card
        ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")} 
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
        ${className}
        ${direction === "rtl" ? "rtl" : ""}
      `}
    >
      <div className="p-4 w-full flex flex-col">
        {/* Top Section: Split layout for Image and Metadata Content */}
        <div className="flex gap-4 w-full">
          {/* Left Column: Image Area */}
          <div className="flex-shrink-0 w-[96px] mobile-left-col">
            <img
              src={book.imageUrl || fallbackImage}
              alt={book.title}
              className="book-compact-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              loading="lazy"
            />
          </div>

          {/* Right Column: Text Content Info */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h3
              className={`compact-title ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}
            >
              {book.title}
            </h3>

            <p
              className={`compact-author ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
            >
              {t("book.by")} {book.author}
            </p>

            <div className="flex items-center gap-2 mb-2">
              <div className="compact-stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`compact-star-icon ${
                      i < Math.floor(book.rating || 0)
                        ? "text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span
                className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
              >
                ({book.rating?.toFixed(1) || "0"})
              </span>
            </div>

            <p
              className={`compact-description ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600")}`}
            >
              {book.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {bookCollections.slice(0, 3).map((collection, idx) => (
                <span
                  key={idx}
                  onClick={(e) => handleTagClick(e, collection)}
                  className={`compact-tag ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                >
                  {collection}
                </span>
              ))}
              {book.tags &&
                book.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={(e) => handleTagClick(e, tag)}
                    className={`compact-tag ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Width Action Controls */}
        <div className="full-width-actions-panel mt-4 w-full flex flex-col gap-2">
          {/* Row 1: ButtonInline Component */}
          {book?.id && (
            <div className="book-compact-card-actions w-full">
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

          {/* Row 2: Action Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              onClick={handleGetBook}
              className={`action-btn get-book ${theme.buttonColors?.primaryButton?.background || "bg-emerald-600"} text-white`}
            >
              {t("book.get_book") || "Get Book"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/books/${book.slug || book.id}`);
              }}
              className={`action-btn view-details ${theme.buttonColors?.secondaryButton?.textColor || ""}`}
            >
              {t("book.view_details") || "View Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCompactCard;
