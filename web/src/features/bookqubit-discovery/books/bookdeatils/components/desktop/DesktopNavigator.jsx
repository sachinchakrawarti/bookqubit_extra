// src/features/bookqubit-discovery/books/bookdeatils/components/desktop/DesktopNavigator.jsx

"use client";

import { useRef, useState, useEffect } from "react";
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
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./DesktopNavigator.css";

const DesktopNavigator = ({
  sections,
  activeSection,
  onSectionClick,
  onSearch,
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSections, setFilteredSections] = useState(sections);
  const navigatorRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get header height
  useEffect(() => {
    const getHeaderHeight = () => {
      const header =
        document.querySelector("header") || document.querySelector(".navbar");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      } else {
        setHeaderHeight(64);
      }
    };

    getHeaderHeight();
    window.addEventListener("resize", getHeaderHeight);
    return () => window.removeEventListener("resize", getHeaderHeight);
  }, []);

  // Get icon for section
  const getSectionIcon = (id) => {
    switch (id) {
      case "highlights":
        return <FaStar className="w-4 h-4" />;
      case "subjects":
        return <FaBook className="w-4 h-4" />;
      case "publication":
        return <FaInfoCircle className="w-4 h-4" />;
      case "about":
        return <FaFileAlt className="w-4 h-4" />;
      case "summary":
        return <FaList className="w-4 h-4" />;
      case "reviews":
        return <FaComment className="w-4 h-4" />;
      case "news":
        return <FaNewspaper className="w-4 h-4" />;
      case "blog":
        return <FaBlog className="w-4 h-4" />;
      case "related":
        return <FaBook className="w-4 h-4" />;
      case "analytics":
        return <FaChartBar className="w-4 h-4" />;
      case "tags":
        return <FaTag className="w-4 h-4" />;
      default:
        return <FaTag className="w-4 h-4" />;
    }
  };

  // Get display name for section
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

  // Get description for section
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

  // Filter sections based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSections(sections);
    } else {
      const filtered = sections.filter(
        (section) =>
          getSectionDisplayName(section.id)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          getSectionDescription(section.id)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
      setFilteredSections(filtered);
    }
  }, [searchTerm, sections]);

  // Handle sticky effect
  useEffect(() => {
    const handleScroll = () => {
      if (!navigatorRef.current) return;

      const rect = navigatorRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      const offsetTop = rect.top + scrollY;
      const threshold = offsetTop - headerHeight - 10;

      if (scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  const handleSectionClick = (sectionId) => {
    onSectionClick(sectionId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <>
      {/* Placeholder to maintain spacing when sticky */}
      {isSticky && <div className="desktop-navigator-placeholder" />}

      <div
        ref={navigatorRef}
        className={`
          desktop-navigator
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          ${theme.shadow?.container || "shadow-sm"}
          rounded-xl
          transition-all duration-300
          ${isSticky ? "fixed left-0 right-0 z-40 rounded-none shadow-lg" : ""}
        `}
        style={{
          top: isSticky ? `${headerHeight}px` : "auto",
          left: isSticky ? "0" : "auto",
          right: isSticky ? "0" : "auto",
        }}
      >
        <div className="desktop-navigator-inner">
          {/* Search Bar */}
          <div className="desktop-navigator-search">
            <form
              onSubmit={handleSearch}
              className="desktop-navigator-search-form"
            >
              <FaSearch className="desktop-navigator-search-icon" />
              <input
                type="text"
                placeholder={t("book.search_sections") || "Search sections..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  desktop-navigator-search-input
                  ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  focus:ring-2 focus:ring-sky-500
                `}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="desktop-navigator-search-clear"
                >
                  ✕
                </button>
              )}
            </form>
          </div>

          {/* Section Grid */}
          <div className="desktop-navigator-grid">
            {filteredSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`
                    desktop-navigator-item
                    ${isActive ? "active" : ""}
                    ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
                    ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                    transition-all duration-200
                    hover:scale-105
                  `}
                >
                  <div className="desktop-navigator-item-icon">
                    <span
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    >
                      {getSectionIcon(section.id)}
                    </span>
                  </div>
                  <div className="desktop-navigator-item-content">
                    <span
                      className={`
                      desktop-navigator-item-name
                      ${isActive ? "text-white" : theme.textColors?.primary || "text-gray-900 dark:text-white"}
                      font-medium
                    `}
                    >
                      {getSectionDisplayName(section.id)}
                    </span>
                    <span
                      className={`
                      desktop-navigator-item-description
                      ${isActive ? "text-white/80" : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      text-xs
                    `}
                    >
                      {getSectionDescription(section.id)}
                    </span>
                  </div>
                  {isActive && (
                    <span className="desktop-navigator-item-indicator" />
                  )}
                </button>
              );
            })}
          </div>

          {/* No Results */}
          {filteredSections.length === 0 && (
            <div
              className={`
              desktop-navigator-empty
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              text-center py-8
            `}
            >
              <FaFilter className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {t("book.no_sections_found") ||
                  "No sections found matching your search."}
              </p>
            </div>
          )}

          {/* Footer */}
          <div
            className={`
            desktop-navigator-footer
            ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
          `}
          >
            <span
              className={`
              text-xs
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            `}
            >
              {filteredSections.length} {t("book.sections") || "sections"} •{" "}
              {t("book.click_to_navigate") || "Click to navigate"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopNavigator;
