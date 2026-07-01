// src/features/bookqubit-immerse/components/audiobook/components/ChapterList.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import "./ChapterList.css";

const ChapterList = ({
  chapters = [],
  currentChapter = 0,
  onSelectChapter,
  onClose,
  bookTitle = "",
  bookCover = null,
  totalDuration = 0,
  isPlaying = false,
  currentTime = 0,
  onPlayChapter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const listRef = useRef(null);
  const currentChapterRef = useRef(null);

  // Format time
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Filter chapters based on search
  const filteredChapters = chapters.filter((chapter, index) => {
    if (!searchTerm) return true;
    const chapterNum = (index + 1).toString();
    const chapterTitle = chapter.toLowerCase();
    const search = searchTerm.toLowerCase();
    return chapterNum.includes(search) || chapterTitle.includes(search);
  });

  // Scroll to current chapter
  useEffect(() => {
    if (currentChapterRef.current && listRef.current) {
      currentChapterRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentChapter]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Get chapter status
  const getChapterStatus = (index) => {
    if (index < currentChapter) return "completed";
    if (index === currentChapter && isPlaying) return "playing";
    if (index === currentChapter) return "current";
    return "upcoming";
  };

  // Get chapter icon
  const getChapterIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <svg className="status-icon completed" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "playing":
        return (
          <div className="playing-indicator-chapter">
            <span className="playing-dot-chapter"></span>
            <span className="playing-dot-chapter"></span>
            <span className="playing-dot-chapter"></span>
          </div>
        );
      case "current":
        return (
          <svg className="status-icon current" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <span className="chapter-number">{index + 1}</span>
        );
    }
  };

  // Handle chapter click
  const handleChapterClick = (index) => {
    if (onSelectChapter) {
      onSelectChapter(index);
    }
    if (onPlayChapter) {
      onPlayChapter(index);
    }
  };

  // Toggle expanded chapter
  const toggleExpanded = (index) => {
    setExpandedChapter(expandedChapter === index ? null : index);
  };

  // Get chapter progress
  const getChapterProgress = (index) => {
    if (index < currentChapter) return 100;
    if (index === currentChapter && totalDuration > 0) {
      return (currentTime / (totalDuration / chapters.length)) * 100;
    }
    return 0;
  };

  return (
    <div className="chapter-list-overlay" onClick={onClose}>
      <div className="chapter-list-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chapter-list-header">
          <div className="chapter-list-header-left">
            {bookCover && (
              <div className="chapter-book-cover">
                <img src={bookCover} alt={bookTitle} className="chapter-book-cover-image" />
              </div>
            )}
            <div className="chapter-list-title-wrapper">
              <h3 className="chapter-list-title">
                {bookTitle ? `Chapters - ${bookTitle}` : "Chapters"}
              </h3>
              <span className="chapter-count">
                {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}
              </span>
            </div>
          </div>
          <div className="chapter-list-header-right">
            <button 
              className="chapter-list-close"
              onClick={onClose}
              aria-label="Close chapter list"
              title="Close (ESC)"
            >
              <svg className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="chapter-search-wrapper">
          <div className="chapter-search">
            <svg className="chapter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="chapter-search-input"
            />
            {searchTerm && (
              <button 
                className="chapter-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <svg className="clear-icon-small" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        <div className="chapter-filters">
          <button 
            className={`chapter-filter-btn ${showCompleted ? "active" : ""}`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <svg className="filter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
          <span className="chapter-filter-count">
            {filteredChapters.length} shown
          </span>
        </div>

        {/* Chapter List */}
        <div className="chapter-list-content" ref={listRef}>
          {filteredChapters.length > 0 ? (
            <ul className="chapter-list">
              {filteredChapters.map((chapter, index) => {
                const actualIndex = chapters.indexOf(chapter);
                const status = getChapterStatus(actualIndex);
                const progress = getChapterProgress(actualIndex);
                const isExpanded = expandedChapter === actualIndex;

                // Skip completed if filter is off
                if (!showCompleted && status === "completed") return null;

                return (
                  <li
                    key={actualIndex}
                    ref={actualIndex === currentChapter ? currentChapterRef : null}
                    className={`chapter-item ${status} ${isExpanded ? "expanded" : ""}`}
                    onClick={() => handleChapterClick(actualIndex)}
                  >
                    <div className="chapter-item-content">
                      <div className="chapter-item-left">
                        <div className="chapter-status-icon">
                          {getChapterIcon(status)}
                        </div>
                        <div className="chapter-info">
                          <div className="chapter-name-wrapper">
                            <span className="chapter-name">
                              {chapter}
                            </span>
                            {status === "playing" && (
                              <span className="chapter-playing-label">● Playing</span>
                            )}
                            {status === "current" && (
                              <span className="chapter-current-label">● Current</span>
                            )}
                          </div>
                          <div className="chapter-meta">
                            <span className="chapter-number-label">
                              Chapter {actualIndex + 1}
                            </span>
                            {totalDuration > 0 && (
                              <>
                                <span className="chapter-meta-separator">•</span>
                                <span className="chapter-duration">
                                  {formatDuration(totalDuration / chapters.length)}
                                </span>
                              </>
                            )}
                            {progress > 0 && progress < 100 && (
                              <>
                                <span className="chapter-meta-separator">•</span>
                                <span className="chapter-progress-label">
                                  {Math.round(progress)}% complete
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="chapter-item-right">
                        {status === "completed" && (
                          <span className="chapter-completed-badge">
                            <svg className="check-icon-small" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Done
                          </span>
                        )}
                        {status === "playing" && (
                          <button 
                            className="chapter-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChapterClick(actualIndex);
                            }}
                          >
                            <svg className="play-icon-small" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}
                        {status === "upcoming" && (
                          <button 
                            className="chapter-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChapterClick(actualIndex);
                            }}
                          >
                            <svg className="play-icon-small" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}
                        <button 
                          className="chapter-expand-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(actualIndex);
                          }}
                        >
                          <svg className="expand-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar for current chapter */}
                    {status === "current" && progress > 0 && (
                      <div className="chapter-progress-bar">
                        <div 
                          className="chapter-progress-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="chapter-expanded-content">
                        <div className="chapter-description">
                          <p>Chapter {actualIndex + 1} - {chapter}</p>
                          {totalDuration > 0 && (
                            <p className="chapter-duration-info">
                              Duration: {formatDuration(totalDuration / chapters.length)}
                            </p>
                          )}
                        </div>
                        <div className="chapter-actions">
                          <button 
                            className="chapter-action-btn play-chapter-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChapterClick(actualIndex);
                            }}
                          >
                            <svg className="action-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            Play Chapter
                          </button>
                          <button 
                            className="chapter-action-btn bookmark-chapter-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle bookmark
                            }}
                          >
                            <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Bookmark
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="no-chapters">
              <svg className="no-chapters-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h4>No chapters found</h4>
              <p>{searchTerm ? "Try a different search term" : "No chapters available for this book"}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="chapter-list-footer">
          <div className="chapter-list-stats">
            <span className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{chapters.length} chapters</span>
            </span>
            {totalDuration > 0 && (
              <span className="stat-item">
                <span className="stat-label">Duration:</span>
                <span className="stat-value">{formatDuration(totalDuration)}</span>
              </span>
            )}
            <span className="stat-item">
              <span className="stat-label">Current:</span>
              <span className="stat-value">Chapter {currentChapter + 1}</span>
            </span>
          </div>
          <button 
            className="chapter-list-close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterList;