// src/features/bookqubit-immerse/components/audiobook/components/AudioBookCard.jsx
"use client";

import React from "react";
import "./AudioBookCard.css";

const AudioBookCard = ({
  book,
  isPlaying = false,
  progress = 0,
  onSelect,
  onPlayToggle,
  onBookmark,
  isBookmarked = false,
}) => {
  const progressPercent = Math.min(progress, 100);
  const isCompleted = progressPercent >= 100;

  // Format duration
  const formatDuration = (duration) => {
    if (!duration) return "0h 0m";
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Truncate text
  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="audiobook-card" onClick={onSelect}>
      {/* Cover Image */}
      <div className="audiobook-cover">
        <div className="cover-image-wrapper">
          {book.cover ? (
            <img 
              src={book.cover} 
              alt={book.title} 
              className="cover-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-book.jpg";
              }}
            />
          ) : (
            <div className="cover-placeholder">
              <svg className="placeholder-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}
        </div>

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="playing-indicator">
            <span className="playing-dot"></span>
            <span className="playing-dot"></span>
            <span className="playing-dot"></span>
          </div>
        )}

        {/* Play Overlay */}
        <div className="play-overlay">
          <button 
            className="play-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onPlayToggle();
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </button>
        </div>

        {/* Progress Badge */}
        {progressPercent > 0 && progressPercent < 100 && (
          <div className="progress-badge">
            <svg className="badge-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {Math.round(progressPercent)}%
          </div>
        )}

        {/* Completed Badge */}
        {isCompleted && (
          <div className="completed-badge">
            <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </div>
        )}

        {/* Duration Badge */}
        {book.durationSeconds && (
          <div className="duration-badge">
            <svg className="duration-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {formatDuration(book.durationSeconds)}
          </div>
        )}

        {/* Bookmark Button */}
        {onBookmark && (
          <button 
            className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(book.id);
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <svg className="bookmark-icon" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className="audiobook-info">
        <div className="info-header">
          <h3 className="audiobook-title" title={book.title}>
            {truncateText(book.title, 40)}
          </h3>
          {book.rating && (
            <span className="rating-badge">
              <svg className="rating-star" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {book.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="audiobook-author" title={book.author}>
          {book.author}
        </p>

        <div className="audiobook-meta">
          <span className="meta-item">
            <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {book.duration || formatDuration(book.durationSeconds)}
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-item">
            <svg className="meta-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
            </svg>
            {book.chapters} ch
          </span>
          {book.publishYear && (
            <>
              <span className="meta-separator">•</span>
              <span className="meta-item">{book.publishYear}</span>
            </>
          )}
        </div>

        <span className="audiobook-narrator">
          <svg className="narrator-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          {book.narrator}
        </span>

        {/* Description (visible on hover or expanded) */}
        {book.description && (
          <p className="audiobook-description">
            {truncateText(book.description, 80)}
          </p>
        )}

        {/* Progress Bar */}
        <div className="audiobook-progress">
          <div className="progress-bar">
            <div 
              className={`progress-fill ${isCompleted ? "completed" : ""}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Category Tag */}
        {book.category && (
          <div className="category-tag">
            <span className="category-label">{book.category}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioBookCard;