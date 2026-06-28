"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  FaTimes,
  FaBookOpen,
  FaCheck,
  FaClock,
  FaStar,
  FaHeart,
  FaBook,
  FaFire,
  FaGift,
  FaUser,
  FaCalendarAlt,
  FaLanguage,
  FaTag,
  FaInfoCircle,
  FaChartBar,
  FaEye,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaThumbsUp,
  FaList,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/themes/useTheme";
import "./Summary_BottomSheet_Mobile.css";

const Summary_BottomSheet_Mobile = ({
  isOpen,
  onClose,
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  launchYear = "1925",
  bookCover = null,
  bookRating = 4.5,
  totalReviews = 128,
  pageCount = 180,
  language = "English",
  genres = ["Fiction", "Classic", "Literary"],
  description = "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  summary = "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan. The novel explores themes of decadence, idealism, social upheaval, and excess, creating a portrait of the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.",
  likeCount = 42,
  shareCount = 12,
  isBookmarked = false,
  onBookmarkToggle,
  onLike,
  onShare,
  onAddToLibrary,
  className = "",
}) => {
  const { theme, themeName } = useTheme();
  const [activeTab, setActiveTab] = useState("summary");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const contentRef = useRef(null);

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Handle like
  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    onLike?.();
  }, [isLiked, onLike]);

  // Drag to close functionality
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0) {
        setCurrentY(deltaY);
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${deltaY}px)`;
          contentRef.current.style.opacity = 1 - deltaY / 500;
        }
      }
    },
    [isDragging, startY],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (currentY > 150) {
      onClose();
    }
    if (contentRef.current) {
      contentRef.current.style.transform = "translateY(0)";
      contentRef.current.style.opacity = "1";
    }
    setCurrentY(0);
  }, [currentY, onClose]);

  // Get theme-based colors
  const getBgColor = () =>
    theme.background?.card || (isDarkMode ? "#1F2937" : "#FFFFFF");
  const getTextColor = () =>
    theme.textColors?.primary || (isDarkMode ? "#F9FAFB" : "#111827");
  const getSecondaryTextColor = () =>
    theme.textColors?.secondary || (isDarkMode ? "#9CA3AF" : "#6B7280");
  const getBorderColor = () =>
    theme.border?.default || (isDarkMode ? "#374151" : "#E5E7EB");
  const getSectionBg = () =>
    theme.background?.section || (isDarkMode ? "#111827" : "#F9FAFB");

  // Render stars
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const rating = bookRating || 0;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  // Details items
  const detailsItems = [
    { label: "Author", value: authorName, icon: <FaUser /> },
    { label: "Published", value: launchYear, icon: <FaCalendarAlt /> },
    { label: "Pages", value: pageCount, icon: <FaBook /> },
    { label: "Language", value: language, icon: <FaLanguage /> },
    { label: "Genres", value: genres.join(", "), icon: <FaTag /> },
    { label: "ISBN", value: "978-0-7432-7356-5", icon: <FaInfoCircle /> },
  ];

  // Reading stats
  const readingStats = [
    { label: "Reading", count: 234, color: "#3B82F6" },
    { label: "Marked Read", count: 156, color: "#10B981" },
    { label: "Currently Reading", count: 89, color: "#F59E0B" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`summary-bottomsheet-backdrop ${isDarkMode ? "dark" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={contentRef}
            className={`summary-bottomsheet ${isDarkMode ? "dark" : ""}`}
            style={{
              background: getBgColor(),
              borderColor: getBorderColor(),
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 35,
              stiffness: 300,
              mass: 0.8,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag Handle */}
            <div className="summary-bottomsheet-handle">
              <div className="handle-bar" />
            </div>

            {/* Header */}
            <div className="summary-bottomsheet-header">
              <div className="header-top">
                <button
                  className={`header-close-btn ${isDarkMode ? "dark" : ""}`}
                  onClick={onClose}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="summary-bottomsheet-content">
              {/* Book Cover & Title */}
              <div className="book-header">
                <div className="book-cover-wrapper">
                  <div className="book-cover">
                    {bookCover ? (
                      <img
                        src={bookCover}
                        alt={bookName}
                        className="book-cover-image"
                      />
                    ) : (
                      <div className="book-cover-placeholder">
                        <FaBookOpen />
                      </div>
                    )}
                  </div>
                </div>
                <div className="book-info">
                  <h1 className={`book-title ${isDarkMode ? "dark" : ""}`}>
                    {bookName}
                  </h1>
                  <p className={`book-author ${isDarkMode ? "dark" : ""}`}>
                    by {authorName}
                  </p>
                  <div className="book-rating">
                    <div className="stars">{renderStars()}</div>
                    <span className={`rating-text ${isDarkMode ? "dark" : ""}`}>
                      {bookRating.toFixed(1)} ({totalReviews})
                    </span>
                  </div>
                  <div className="book-meta-tags">
                    {genres.slice(0, 3).map((genre, index) => (
                      <span
                        key={index}
                        className={`meta-tag ${isDarkMode ? "dark" : ""}`}
                      >
                        {genre}
                      </span>
                    ))}
                    <span className={`meta-tag ${isDarkMode ? "dark" : ""}`}>
                      {pageCount} pgs
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button
                  className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                  onClick={handleLike}
                >
                  <FaHeart className={isLiked ? "liked" : ""} />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>
                <button
                  className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                  onClick={onBookmarkToggle}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>
                <button
                  className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                  onClick={onShare}
                >
                  <FaShare />
                  <span>Share</span>
                </button>
                <button
                  className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                  onClick={onAddToLibrary}
                >
                  <FaBook />
                  <span>Library</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="summary-tabs">
                <button
                  className={`tab-btn ${activeTab === "summary" ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  <FaQuoteLeft className="tab-icon" />
                  Summary
                </button>
                <button
                  className={`tab-btn ${activeTab === "details" ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  <FaInfoCircle className="tab-icon" />
                  Details
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <motion.div
                    className="summary-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="summary-text-wrapper">
                      <FaQuoteLeft className="quote-icon quote-left" />
                      <p
                        className={`summary-text ${isDarkMode ? "dark" : ""} ${isExpanded ? "expanded" : ""}`}
                      >
                        {summary || description}
                      </p>
                      <FaQuoteRight className="quote-icon quote-right" />
                    </div>
                    {(summary?.length > 300 || description?.length > 300) && (
                      <button
                        className={`read-more-btn ${isDarkMode ? "dark" : ""}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    )}

                    {/* Key Themes */}
                    <div className="key-themes">
                      <h4
                        className={`themes-title ${isDarkMode ? "dark" : ""}`}
                      >
                        Key Themes
                      </h4>
                      <div className="themes-list">
                        {[
                          "Decadence",
                          "Idealism",
                          "Social Upheaval",
                          "Excess",
                          "The American Dream",
                        ].map((theme, index) => (
                          <span
                            key={index}
                            className={`theme-tag ${isDarkMode ? "dark" : ""}`}
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                  <motion.div
                    className="details-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Book Details */}
                    <div className="details-grid">
                      {detailsItems.map((item, index) => (
                        <div
                          key={index}
                          className={`detail-item ${isDarkMode ? "dark" : ""}`}
                        >
                          <span className="detail-icon">{item.icon}</span>
                          <div className="detail-info">
                            <span
                              className={`detail-label ${isDarkMode ? "dark" : ""}`}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`detail-value ${isDarkMode ? "dark" : ""}`}
                            >
                              {item.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reading Stats */}
                    <div className="reading-stats">
                      <h4 className={`stats-title ${isDarkMode ? "dark" : ""}`}>
                        <FaChartBar className="stats-icon" />
                        Reading Stats
                      </h4>
                      <div className="stats-grid">
                        {readingStats.map((stat, index) => (
                          <div
                            key={index}
                            className={`stat-card ${isDarkMode ? "dark" : ""}`}
                          >
                            <div
                              className="stat-circle"
                              style={{
                                borderColor: stat.color,
                                color: stat.color,
                              }}
                            >
                              <span className="stat-number">{stat.count}</span>
                            </div>
                            <span
                              className={`stat-label ${isDarkMode ? "dark" : ""}`}
                            >
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="book-description">
                      <h4
                        className={`description-title ${isDarkMode ? "dark" : ""}`}
                      >
                        <FaBookOpen className="description-icon" />
                        Description
                      </h4>
                      <p
                        className={`description-text ${isDarkMode ? "dark" : ""}`}
                      >
                        {description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="summary-bottomsheet-footer">
              <button
                className={`footer-btn cancel-btn ${isDarkMode ? "dark" : ""}`}
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="footer-btn action-btn"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors?.primary || "#6366F1"}, ${theme.colors?.secondary || "#8B5CF6"})`,
                }}
                onClick={() => {
                  onAddToLibrary?.();
                }}
              >
                <FaBook className="footer-icon" />
                Add to Library
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Summary_BottomSheet_Mobile;
