"use client";

import React from "react";
import { FaBookOpen, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const BookPreview = ({
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  bookCover = null,
  bookRating = 4.5,
  totalReviews = 128,
  pageCount = 180,
  language = "English",
  genres = ["Fiction", "Classic", "Literary"],
  isDarkMode = false,
  className = "",
  showRating = true,
  showMeta = true,
  showGenres = true,
  compact = false,
  onBookClick = null,
}) => {
  const { theme } = useTheme();

  // Get colors
  const getTextColor = () =>
    theme.textColors?.primary || (isDarkMode ? "#F9FAFB" : "#111827");
  const getSecondaryTextColor = () =>
    theme.textColors?.secondary || (isDarkMode ? "#9CA3AF" : "#6B7280");

  // Render stars
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const rating = bookRating || 0;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  // Format count
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return (
    <div
      className={`book-preview ${compact ? "compact" : ""} ${isDarkMode ? "dark" : ""} ${className}`}
      onClick={onBookClick}
      style={{ cursor: onBookClick ? "pointer" : "default" }}
    >
      {/* Book Cover */}
      <div className="book-preview-cover-wrapper">
        <div className="book-preview-cover">
          {bookCover ? (
            <img
              src={bookCover}
              alt={bookName}
              className="book-cover-image"
              loading="lazy"
            />
          ) : (
            <div className="book-cover-placeholder">
              <FaBookOpen />
            </div>
          )}
        </div>
      </div>

      {/* Book Info */}
      <div className="book-preview-info">
        {/* Title */}
        <h3 className={`book-preview-title ${isDarkMode ? "dark" : ""}`}>
          {bookName}
        </h3>

        {/* Author */}
        <p className={`book-preview-author ${isDarkMode ? "dark" : ""}`}>
          by {authorName}
        </p>

        {/* Rating */}
        {showRating && bookRating > 0 && (
          <div className="book-preview-rating">
            <div className="rating-stars">{renderStars()}</div>
            <span className={`rating-text ${isDarkMode ? "dark" : ""}`}>
              {bookRating.toFixed(1)} ({formatCount(totalReviews)} reviews)
            </span>
          </div>
        )}

        {/* Meta Info */}
        {showMeta && (
          <div className="book-preview-meta">
            {pageCount > 0 && (
              <span className={`meta-item ${isDarkMode ? "dark" : ""}`}>
                <span className="meta-label">Pages:</span>
                <span className="meta-value">{pageCount}</span>
              </span>
            )}
            {language && (
              <span className={`meta-item ${isDarkMode ? "dark" : ""}`}>
                <span className="meta-label">Language:</span>
                <span className="meta-value">{language}</span>
              </span>
            )}
          </div>
        )}

        {/* Genres */}
        {showGenres && genres && genres.length > 0 && (
          <div className="book-preview-genres">
            {genres.slice(0, compact ? 2 : 3).map((genre, index) => (
              <span
                key={index}
                className={`genre-tag ${isDarkMode ? "dark" : ""}`}
              >
                {genre}
              </span>
            ))}
            {!compact && genres.length > 3 && (
              <span className={`genre-tag more ${isDarkMode ? "dark" : ""}`}>
                +{genres.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPreview;
