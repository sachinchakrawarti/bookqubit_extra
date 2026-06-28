// src/features/bookqubit-discovery/books/bookdeatils/components/desktop/DesktopSectionsGrid.jsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaStar,
  FaBook,
  FaInfoCircle,
  FaList,
  FaComment,
  FaTag,
  FaFileAlt,
  FaNewspaper,
  FaBlog,
  FaChartBar,
  FaChevronRight,
  FaChevronLeft,
  FaExpand,
  FaCompress,
  FaEye,
  FaHeart,
  FaShare,
  FaBookmark,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./DesktopSectionsGrid.css";

const DesktopSectionsGrid = ({
  book,
  sections,
  activeSection,
  onSectionClick,
  theme: propTheme,
  columns = 3,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expandedSections, setExpandedSections] = useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const gridRef = useRef(null);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get section icon
  const getSectionIcon = (id) => {
    switch (id) {
      case "highlights":
        return <FaStar className="section-grid-icon" />;
      case "subjects":
        return <FaBook className="section-grid-icon" />;
      case "publication":
        return <FaInfoCircle className="section-grid-icon" />;
      case "about":
        return <FaFileAlt className="section-grid-icon" />;
      case "summary":
        return <FaList className="section-grid-icon" />;
      case "reviews":
        return <FaComment className="section-grid-icon" />;
      case "news":
        return <FaNewspaper className="section-grid-icon" />;
      case "blog":
        return <FaBlog className="section-grid-icon" />;
      case "related":
        return <FaBook className="section-grid-icon" />;
      case "analytics":
        return <FaChartBar className="section-grid-icon" />;
      case "tags":
        return <FaTag className="section-grid-icon" />;
      default:
        return <FaTag className="section-grid-icon" />;
    }
  };

  // Get section display name
  const getSectionDisplayName = (id) => {
    const names = {
      highlights: "Highlights",
      subjects: "Subjects",
      publication: "Publication",
      about: "About",
      summary: "Summary",
      reviews: "Reviews",
      news: "News",
      blog: "Blog",
      related: "Related",
      analytics: "Analytics",
      tags: "Tags",
    };
    return names[id] || id;
  };

  // Get section description
  const getSectionDescription = (id) => {
    const descriptions = {
      highlights: "Key highlights of the book",
      subjects: "Subjects covered in the book",
      publication: "Publication details",
      about: "About this book",
      summary: "Book summary",
      reviews: "User reviews and ratings",
      news: "Latest news about the book",
      blog: "Blog posts related to the book",
      related: "Related books you might enjoy",
      analytics: "Reading analytics and stats",
      tags: "Tags and keywords",
    };
    return descriptions[id] || "";
  };

  // Get section color
  const getSectionColor = (id) => {
    const colors = {
      highlights:
        "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10",
      subjects:
        "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10",
      publication:
        "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10",
      about:
        "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10",
      summary:
        "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10",
      reviews:
        "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/10",
      news: "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/10",
      blog: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10",
      related:
        "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/10",
      analytics:
        "border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/10",
      tags: "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50",
    };
    return (
      colors[id] ||
      "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
    );
  };

  // Get icon color
  const getIconColor = (id) => {
    const colors = {
      highlights: "text-amber-500",
      subjects: "text-blue-500",
      publication: "text-purple-500",
      about: "text-emerald-500",
      summary: "text-indigo-500",
      reviews: "text-rose-500",
      news: "text-sky-500",
      blog: "text-orange-500",
      related: "text-teal-500",
      analytics: "text-pink-500",
      tags: "text-gray-500",
    };
    return colors[id] || "text-gray-500";
  };

  // Get section progress (mock)
  const getSectionProgress = (id) => {
    const progress = {
      highlights: 100,
      subjects: 80,
      publication: 60,
      about: 40,
      summary: 20,
      reviews: 0,
      news: 0,
      blog: 0,
      related: 0,
      analytics: 0,
      tags: 0,
    };
    return progress[id] || 0;
  };

  // Toggle section expand
  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Handle section click
  const handleSectionClick = (id) => {
    onSectionClick(id);
  };

  // Toggle full width
  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
  };

  // Get grid columns class
  const getGridColumns = () => {
    if (isFullWidth) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  // Get reading status
  const getReadingStatus = (progress) => {
    if (progress === 100) return "completed";
    if (progress > 0) return "reading";
    return "not_started";
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return t("book.completed") || "Completed";
      case "reading":
        return t("book.in_progress") || "In Progress";
      default:
        return t("book.not_started") || "Not Started";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
      case "reading":
        return "text-sky-500 bg-sky-50 dark:bg-sky-900/20";
      default:
        return "text-gray-400 bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <div
      className={`desktop-sections-grid-container ${isFullWidth ? "full-width" : ""}`}
    >
      {/* Header */}
      <div className="desktop-sections-grid-header">
        <div className="desktop-sections-grid-title-wrapper">
          <h3
            className={`
            desktop-sections-grid-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            📚 {t("book.sections") || "Sections"}
          </h3>
          <span
            className={`
            desktop-sections-grid-count
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            {sections.length} {t("book.items") || "items"}
          </span>
        </div>

        <div className="desktop-sections-grid-actions">
          <button
            onClick={toggleFullWidth}
            className={`
              desktop-sections-grid-action
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              transition-all duration-200 hover:scale-105
            `}
            title={
              isFullWidth
                ? t("book.collapse") || "Collapse"
                : t("book.expand") || "Expand"
            }
          >
            {isFullWidth ? (
              <FaCompress className="w-4 h-4" />
            ) : (
              <FaExpand className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Sections Grid */}
      <div className={`desktop-sections-grid ${getGridColumns()}`}>
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isExpanded = expandedSections.includes(section.id);
          const progress = getSectionProgress(section.id);
          const status = getReadingStatus(progress);
          const isHovered = hoveredSection === section.id;

          return (
            <div
              key={section.id}
              className={`
                desktop-sections-grid-item
                ${isActive ? "active" : ""}
                ${isHovered ? "hovered" : ""}
                ${getSectionColor(section.id)}
                border
                rounded-xl
                transition-all duration-200
              `}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Section Header */}
              <div
                className="desktop-sections-grid-item-header"
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="desktop-sections-grid-item-left">
                  <div
                    className={`
                    desktop-sections-grid-item-icon
                    ${getIconColor(section.id)}
                  `}
                  >
                    {getSectionIcon(section.id)}
                  </div>
                  <div className="desktop-sections-grid-item-info">
                    <span
                      className={`
                      desktop-sections-grid-item-name
                      ${
                        isActive
                          ? theme.textColors?.primary ||
                            "text-gray-900 dark:text-white"
                          : theme.textColors?.secondary ||
                            "text-gray-600 dark:text-gray-400"
                      }
                      font-medium
                    `}
                    >
                      {getSectionDisplayName(section.id)}
                    </span>
                    <span
                      className={`
                      desktop-sections-grid-item-description
                      ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      text-xs
                    `}
                    >
                      {getSectionDescription(section.id)}
                    </span>
                  </div>
                </div>

                <div className="desktop-sections-grid-item-right">
                  {/* Status Badge */}
                  <span
                    className={`
                    desktop-sections-grid-item-status
                    ${getStatusColor(status)}
                    text-xs px-2 py-0.5 rounded-full
                  `}
                  >
                    {getStatusLabel(status)}
                  </span>

                  {/* Progress Indicator */}
                  {progress > 0 && progress < 100 && (
                    <div className="desktop-sections-grid-item-progress">
                      <div
                        className="desktop-sections-grid-item-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <span className="desktop-sections-grid-item-active-dot">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    </span>
                  )}

                  {/* Expand Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(section.id);
                    }}
                    className={`
                      desktop-sections-grid-item-expand
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:${theme.textColors?.primary || "hover:text-gray-700 dark:hover:text-gray-300"}
                      transition-all duration-200
                    `}
                  >
                    <FaChevronRight
                      className={`
                      w-4 h-4
                      transition-transform duration-200
                      ${isExpanded ? "rotate-90" : ""}
                    `}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="desktop-sections-grid-item-content">
                  <div
                    className={`
                    desktop-sections-grid-item-preview
                    ${theme.background?.navigationDots || "bg-white/50 dark:bg-gray-800/50"}
                    rounded-lg
                    p-3
                  `}
                  >
                    {/* Section Preview Content */}
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`
                        ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      `}
                      >
                        {t("book.preview") ||
                          "Preview content will appear here"}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="desktop-sections-grid-item-quick-actions">
                      <button className="desktop-sections-grid-item-quick-action">
                        <FaEye className="w-3.5 h-3.5" />
                        <span>{t("book.view") || "View"}</span>
                      </button>
                      <button className="desktop-sections-grid-item-quick-action">
                        <FaHeart className="w-3.5 h-3.5" />
                        <span>{t("book.save") || "Save"}</span>
                      </button>
                      <button className="desktop-sections-grid-item-quick-action">
                        <FaShare className="w-3.5 h-3.5" />
                        <span>{t("book.share") || "Share"}</span>
                      </button>
                      <button className="desktop-sections-grid-item-quick-action">
                        <FaBookmark className="w-3.5 h-3.5" />
                        <span>{t("book.bookmark") || "Bookmark"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className={`
        desktop-sections-grid-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaClock
          className={`
          w-4 h-4
          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
        `}
        />
        <span
          className={`
          text-xs
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.sections_footer") || "Navigate through book sections"}
        </span>
        <span className="desktop-sections-grid-footer-divider">•</span>
        <span
          className={`
          text-xs
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {sections.length} {t("book.sections") || "sections"}
        </span>
      </div>
    </div>
  );
};

export default DesktopSectionsGrid;
