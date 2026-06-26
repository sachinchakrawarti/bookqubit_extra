// src/features/book/bookdeatils/components/BookSectionNavigator.jsx

"use client";

import { useRef, useState, useEffect } from "react";
import {
  FaStar,
  FaBook,
  FaInfoCircle,
  FaList,
  FaComment,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import BookBottomSheet from "./BookBottomSheet";

const BookSectionNavigator = ({ sections, activeSection, onSectionClick }) => {
  const { theme, themeName } = useTheme();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        return <FaStar className="w-3.5 h-3.5" />;
      case "subjects":
        return <FaBook className="w-3.5 h-3.5" />;
      case "publication":
        return <FaInfoCircle className="w-3.5 h-3.5" />;
      case "about":
        return <FaFileAlt className="w-3.5 h-3.5" />;
      case "summary":
        return <FaList className="w-3.5 h-3.5" />;
      case "comments":
        return <FaComment className="w-3.5 h-3.5" />;
      case "related":
        return <FaBook className="w-3.5 h-3.5" />;
      default:
        return <FaTag className="w-3.5 h-3.5" />;
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
      comments: "Comments",
      related: "Related",
    };
    return names[id] || id;
  };

  // Check scroll position for arrows
  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Scroll function
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Handle sticky effect with header offset
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

  // Check scroll on mount and resize
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleSectionClick = (sectionId) => {
    onSectionClick(sectionId);
    setIsDropdownOpen(false);
  };

  if (!sections || sections.length === 0) return null;

  return (
    <>
      {/* Placeholder to maintain spacing when sticky */}
      {isSticky && <div className="h-[52px] md:h-[56px]" />}

      <div
        ref={navigatorRef}
        className={`
          w-full rounded-xl
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          shadow-sm
          overflow-visible
          transition-all duration-300
          ${isSticky ? "fixed left-0 right-0 z-40 rounded-none shadow-lg" : ""}
        `}
        style={{
          maxWidth: isSticky ? "100%" : "100%",
          margin: isSticky ? "0" : "0 auto",
          top: isSticky ? `${headerHeight}px` : "auto",
          left: isSticky ? "0" : "auto",
          right: isSticky ? "0" : "auto",
        }}
      >
        <div className="relative flex items-center px-2 py-2 max-w-full">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className={`
                absolute left-0 z-10
                flex items-center justify-center
                w-8 h-8 rounded-full
                ${theme.background?.section || "bg-white dark:bg-gray-900"}
                ${theme.shadow?.container || "shadow-md"}
                transition-all duration-200 hover:scale-110
                ml-1
              `}
              style={{
                left: "4px",
                border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
              }}
            >
              <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}

          {/* Scrollable Section Tags */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1 mx-6 flex-1"
            style={{
              scrollBehavior: "smooth",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    text-xs font-medium whitespace-nowrap
                    transition-all duration-200
                    ${
                      isActive
                        ? `
                        ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                        ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                        shadow-md scale-105
                      `
                        : `
                        ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                        ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                        hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
                      `
                    }
                  `}
                >
                  <span className={isActive ? "text-white" : ""}>
                    {getSectionIcon(section.id)}
                  </span>
                  <span>{getSectionDisplayName(section.id)}</span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className={`
                absolute right-12 z-10
                flex items-center justify-center
                w-8 h-8 rounded-full
                ${theme.background?.section || "bg-white dark:bg-gray-900"}
                ${theme.shadow?.container || "shadow-md"}
                transition-all duration-200 hover:scale-110
                mr-1
              `}
              style={{
                right: "44px",
                border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
              }}
            >
              <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}

          {/* Menu Button - Opens Bottom Sheet */}
          <button
            onClick={() => setIsDropdownOpen(true)}
            className={`
              absolute right-0 z-10
              flex items-center justify-center
              w-8 h-8 rounded-full
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.container || "shadow-md"}
              transition-all duration-200 hover:scale-110
              mr-1
              hover:bg-sky-50 dark:hover:bg-sky-900/20
            `}
            style={{
              right: "4px",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            }}
            aria-label="Open menu"
          >
            <FaBars className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BookBottomSheet
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        title="Jump to Section"
      />
    </>
  );
};

export default BookSectionNavigator;
