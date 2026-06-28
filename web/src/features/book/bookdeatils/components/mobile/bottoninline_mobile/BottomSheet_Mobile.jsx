"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaHeart,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaRobot,
  FaFlag,
  FaInfoCircle,
  FaLink,
  FaCopy,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaEye,
  FaClock,
  FaChartBar,
  FaThumbsUp,
  FaBookOpen,
  FaUsers,
  FaTag,
  FaLanguage,
  FaList,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BottomSheet_Mobile.css";

const BottomSheet_Mobile = ({
  isOpen,
  onClose,
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  launchYear = "1925",
  likeCount = 42,
  shareCount = 12,
  isBookmarked = false,
  readingStats = [],
  bottomSheetActions = [],
  bookRating = 4.5,
  totalReviews = 128,
  pageCount = 180,
  language = "English",
  genres = ["Fiction", "Classic", "Literary"],
  description = "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  onBookmarkToggle,
  onShare,
  onLike,
  onRating,
  className = "",
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [rating, setRating] = useState(bookRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Define sections
  const sectionData = [
    { id: "overview", label: "Overview", icon: <FaInfoCircle /> },
    { id: "details", label: "Details", icon: <FaBook /> },
    { id: "stats", label: "Stats", icon: <FaChartBar /> },
    { id: "actions", label: "Actions", icon: <FaList /> },
  ];

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveSection("overview");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Get theme-based colors
  const getBgColor = () =>
    theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white");
  const getBorderColor = () =>
    theme.border?.default ||
    (isDarkMode ? "border-gray-700" : "border-gray-200");
  const getTextColor = () =>
    theme.textColors?.secondary ||
    (isDarkMode ? "text-gray-400" : "text-gray-600");
  const getPrimaryTextColor = () =>
    theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const getSectionBg = () =>
    theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white");

  const bottomSheetBg = getSectionBg();
  const bottomSheetBorder = getBorderColor();

  // Reading progress (mock data)
  const readingProgress = 65;

  // Rating component
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const currentRating = hoverRating || rating;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(currentRating)) {
        stars.push(
          <FaStar
            key={i}
            className="star filled"
            onClick={() => handleRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />,
        );
      } else if (i === Math.ceil(currentRating) && currentRating % 1 !== 0) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="star half-filled"
            onClick={() => handleRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />,
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="star empty"
            onClick={() => handleRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />,
        );
      }
    }
    return stars;
  };

  const handleRating = (value) => {
    setRating(value);
    onRating?.(value);
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const ref = sectionRefs.current[sectionId];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Default reading stats if not provided
  const defaultReadingStats = [
    {
      id: "reading",
      icon: <FaBookOpen />,
      label: "Reading",
      count: 234,
      color: "#3B82F6",
    },
    {
      id: "marked-read",
      icon: <FaCheckCircle />,
      label: "Marked Read",
      count: 156,
      color: "#10B981",
    },
    {
      id: "currently-reading",
      icon: <FaUsers />,
      label: "Currently Reading",
      count: 89,
      color: "#F59E0B",
    },
  ];

  const displayStats =
    readingStats.length > 0 ? readingStats : defaultReadingStats;

  // Default actions if not provided
  const defaultActions = [
    {
      id: "ask-ai",
      icon: <FaRobot />,
      label: "Ask AI",
      description: "Get AI-powered insights about this book",
      color: "#8B5CF6",
      onClick: () => {},
    },
    {
      id: "report",
      icon: <FaFlag />,
      label: "Report",
      description: "Report inappropriate content",
      color: "#EF4444",
      onClick: () => {},
    },
  ];

  const displayActions =
    bottomSheetActions.length > 0 ? bottomSheetActions : defaultActions;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`bottom-sheet-mobile-backdrop ${isDarkMode ? "dark" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={contentRef}
            className={`bottom-sheet-mobile ${bottomSheetBg} ${bottomSheetBorder} ${className}`}
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
            <div
              className={`bottom-sheet-mobile-handle ${isDarkMode ? "dark" : ""}`}
            >
              <div className="handle-bar" />
            </div>

            {/* Section Navigator */}
            <div className={`bottom-sheet-mobile-nav ${bottomSheetBorder}`}>
              <div className="nav-scroll">
                {sectionData.map((section) => (
                  <button
                    key={section.id}
                    className={`nav-item ${activeSection === section.id ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span className="nav-icon">{section.icon}</span>
                    <span className="nav-label">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="bottom-sheet-mobile-content">
              {/* Section 1: Overview */}
              <div
                ref={(el) => {
                  sectionRefs.current.overview = el;
                }}
                className="bottom-sheet-mobile-section"
                id="section-overview"
              >
                <div className="section-header">
                  <h3 className={`section-title ${getPrimaryTextColor()}`}>
                    <FaInfoCircle className="section-icon" />
                    Overview
                  </h3>
                </div>

                {/* Header */}
                <div
                  className={`bottom-sheet-mobile-header ${bottomSheetBorder}`}
                >
                  <div className="bottom-sheet-mobile-header-content">
                    <h2 className={`book-title ${getPrimaryTextColor()}`}>
                      {bookName}
                    </h2>
                    <div className="book-meta">
                      <span className={`author ${getTextColor()}`}>
                        <FaUser className="meta-icon" />
                        {authorName}
                      </span>
                      <span className={`year ${getTextColor()}`}>
                        <FaCalendarAlt className="meta-icon" />
                        {launchYear}
                      </span>
                      <span className={`language ${getTextColor()}`}>
                        <FaLanguage className="meta-icon" />
                        {language}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`close-btn ${isDarkMode ? "dark" : ""}`}
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Rating Section */}
                <div className="bottom-sheet-mobile-rating">
                  <div className="rating-stars">{renderStars()}</div>
                  <div className="rating-info">
                    <span className={`rating-value ${getPrimaryTextColor()}`}>
                      {rating.toFixed(1)}
                    </span>
                    <span className={`rating-count ${getTextColor()}`}>
                      ({totalReviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div className="bottom-sheet-mobile-genres">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className={`genre-tag ${isDarkMode ? "dark" : ""}`}
                    >
                      <FaTag className="genre-icon" />
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div
                  className={`bottom-sheet-mobile-description ${isExpanded ? "expanded" : ""}`}
                >
                  <p className={`${getTextColor()}`}>{description}</p>
                  {description.length > 150 && (
                    <button
                      className={`read-more-btn ${getTextColor()}`}
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>

              {/* Section 2: Details */}
              <div
                ref={(el) => {
                  sectionRefs.current.details = el;
                }}
                className="bottom-sheet-mobile-section"
                id="section-details"
              >
                <div className="section-header">
                  <h3 className={`section-title ${getPrimaryTextColor()}`}>
                    <FaBook className="section-icon" />
                    Book Details
                  </h3>
                </div>

                <div className="details-grid">
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      Author
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      {authorName}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      Published
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      {launchYear}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      Pages
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      {pageCount}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      Language
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      {language}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      ISBN
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      978-0-7432-7356-5
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className={`detail-label ${getTextColor()}`}>
                      Genre
                    </span>
                    <span className={`detail-value ${getPrimaryTextColor()}`}>
                      {genres.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Reading Progress */}
                <div className="bottom-sheet-mobile-progress">
                  <div className="progress-header">
                    <span className={`progress-label ${getTextColor()}`}>
                      <FaBookOpen className="progress-icon" />
                      Reading Progress
                    </span>
                    <span
                      className={`progress-percentage ${getPrimaryTextColor()}`}
                    >
                      {readingProgress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${readingProgress}%`,
                        background: `linear-gradient(90deg, ${theme.colors?.primary || "#6366F1"}, ${theme.colors?.secondary || "#8B5CF6"})`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Stats */}
              <div
                ref={(el) => {
                  sectionRefs.current.stats = el;
                }}
                className="bottom-sheet-mobile-section"
                id="section-stats"
              >
                <div className="section-header">
                  <h3 className={`section-title ${getPrimaryTextColor()}`}>
                    <FaChartBar className="section-icon" />
                    Statistics
                  </h3>
                </div>

                {/* Reading Stats */}
                <div className="bottom-sheet-mobile-stats-grid">
                  {displayStats.map((stat) => (
                    <div key={stat.id} className="stat-card">
                      <div
                        className="stat-icon-wrapper"
                        style={{
                          backgroundColor: isDarkMode
                            ? `${stat.color}33`
                            : `${stat.color}15`,
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div className="stat-info">
                        <span
                          className={`stat-number ${getPrimaryTextColor()}`}
                        >
                          {stat.count}
                        </span>
                        <span className={`stat-label ${getTextColor()}`}>
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div
                  className={`bottom-sheet-mobile-stats ${bottomSheetBorder}`}
                >
                  <div className="stat-item">
                    <FaHeart
                      className="stat-icon"
                      style={{ color: "#EF4444" }}
                    />
                    <span className={`stat-value ${getPrimaryTextColor()}`}>
                      {likeCount}
                    </span>
                    <span className={`stat-label ${getTextColor()}`}>
                      Likes
                    </span>
                  </div>
                  <div className={`stat-divider ${isDarkMode ? "dark" : ""}`} />
                  <div className="stat-item">
                    <FaShare
                      className="stat-icon"
                      style={{ color: "#3B82F6" }}
                    />
                    <span className={`stat-value ${getPrimaryTextColor()}`}>
                      {shareCount}
                    </span>
                    <span className={`stat-label ${getTextColor()}`}>
                      Shares
                    </span>
                  </div>
                  <div className={`stat-divider ${isDarkMode ? "dark" : ""}`} />
                  <div className="stat-item">
                    <FaEye className="stat-icon" style={{ color: "#8B5CF6" }} />
                    <span className={`stat-value ${getPrimaryTextColor()}`}>
                      {totalReviews * 10}
                    </span>
                    <span className={`stat-label ${getTextColor()}`}>
                      Views
                    </span>
                  </div>
                  <div className={`stat-divider ${isDarkMode ? "dark" : ""}`} />
                  <div className="stat-item">
                    <FaClock
                      className="stat-icon"
                      style={{ color: "#F59E0B" }}
                    />
                    <span className={`stat-value ${getPrimaryTextColor()}`}>
                      {pageCount}
                    </span>
                    <span className={`stat-label ${getTextColor()}`}>
                      Pages
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Actions */}
              <div
                ref={(el) => {
                  sectionRefs.current.actions = el;
                }}
                className="bottom-sheet-mobile-section"
                id="section-actions"
              >
                <div className="section-header">
                  <h3 className={`section-title ${getPrimaryTextColor()}`}>
                    <FaList className="section-icon" />
                    Actions
                  </h3>
                </div>

                <div className="bottom-sheet-mobile-actions">
                  {displayActions.map((action) => (
                    <button
                      key={action.id}
                      className={`bottom-sheet-mobile-action ${isDarkMode ? "dark" : ""}`}
                      onClick={action.onClick}
                      style={{ "--action-color": action.color }}
                    >
                      <div
                        className={`action-icon-wrapper ${isDarkMode ? "dark" : ""}`}
                        style={{
                          backgroundColor: isDarkMode
                            ? `${action.color}33`
                            : `${action.color}15`,
                          color: action.color,
                        }}
                      >
                        {action.icon}
                      </div>
                      <div className="action-content">
                        <span
                          className={`action-label ${getPrimaryTextColor()}`}
                        >
                          {action.label}
                        </span>
                        <span
                          className={`action-description ${getTextColor()}`}
                        >
                          {action.description}
                        </span>
                      </div>
                      <span
                        className={`action-arrow ${isDarkMode ? "dark" : ""}`}
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bottom-sheet-mobile-quick-actions">
                  <button
                    className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                    onClick={() => {
                      onBookmarkToggle?.();
                    }}
                  >
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </button>
                  <button
                    className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                    onClick={() => {
                      onLike?.();
                    }}
                  >
                    <FaHeart />
                    <span>Like</span>
                  </button>
                  <button
                    className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                    onClick={() => {
                      // Add to reading list
                    }}
                  >
                    <FaBookOpen />
                    <span>Read</span>
                  </button>
                  <button
                    className={`quick-action-btn ${isDarkMode ? "dark" : ""}`}
                    onClick={() => {
                      // Add to wishlist
                    }}
                  >
                    <FaStar />
                    <span>Wishlist</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bottom-sheet-mobile-footer">
              <button
                className={`footer-btn close-footer-btn ${isDarkMode ? "dark" : ""}`}
                onClick={onClose}
              >
                Close
              </button>
              <button
                className={`footer-btn action-footer-btn`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors?.primary || "#6366F1"}, ${theme.colors?.secondary || "#8B5CF6"})`,
                }}
                onClick={() => {
                  onClose();
                }}
              >
                View Full Details
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper component for check circle icon
const FaCheckCircle = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default BottomSheet_Mobile;
