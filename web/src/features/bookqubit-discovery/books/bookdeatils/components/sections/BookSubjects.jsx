// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookSubjects.jsx

"use client";

import React, { useState } from "react";
import {
  FaTag,
  FaBook,
  FaGraduationCap,
  FaBrain,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookSubjects.css";

const BookSubjects = ({
  book,
  theme: propTheme,
  maxDisplay = 6,
  showAll = false,
  onSubjectClick,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(showAll);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get subjects from book data
  const subjects = book.subjects || book.topics || [];

  // If no subjects, show a message
  if (!subjects || subjects.length === 0) {
    return (
      <div
        className={`
        book-subjects-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaBook className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_subjects") || "No subjects listed for this book."}
        </p>
      </div>
    );
  }

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get subject icon based on category
  const getSubjectIcon = (subject) => {
    const icons = {
      fiction: <FaBook className="subject-icon" />,
      "non-fiction": <FaGraduationCap className="subject-icon" />,
      science: <FaBrain className="subject-icon" />,
      history: <FaBook className="subject-icon" />,
      philosophy: <FaBrain className="subject-icon" />,
      psychology: <FaBrain className="subject-icon" />,
      "self-help": <FaGraduationCap className="subject-icon" />,
      business: <FaGraduationCap className="subject-icon" />,
      technology: <FaBook className="subject-icon" />,
      art: <FaBook className="subject-icon" />,
    };

    const lowerSubject = subject.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowerSubject.includes(key)) {
        return icon;
      }
    }
    return <FaTag className="subject-icon" />;
  };

  // Get subject color based on category
  const getSubjectColor = (subject) => {
    const colors = {
      fiction:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "non-fiction":
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      science:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      history:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      philosophy:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      psychology:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      "self-help":
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800",
      business:
        "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 border-sky-200 dark:border-sky-800",
      technology:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
      art: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800",
    };

    const lowerSubject = subject.toLowerCase();
    for (const [key, color] of Object.entries(colors)) {
      if (lowerSubject.includes(key)) {
        return color;
      }
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
  };

  // Handle subject click
  const handleSubjectClick = (subject) => {
    setSelectedSubject(selectedSubject === subject ? null : subject);
    if (onSubjectClick) {
      onSubjectClick(subject);
    }
  };

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Get display subjects
  const displaySubjects = expanded
    ? filteredSubjects
    : filteredSubjects.slice(0, maxDisplay);
  const hasMore = filteredSubjects.length > maxDisplay;

  // Get subject count by category
  const getSubjectCategories = () => {
    const categories = {};
    subjects.forEach((subject) => {
      const lowerSubject = subject.toLowerCase();
      let category = "other";
      const categoryMap = {
        fiction: "Fiction",
        "non-fiction": "Non-Fiction",
        science: "Science",
        history: "History",
        philosophy: "Philosophy",
        psychology: "Psychology",
        "self-help": "Self-Help",
        business: "Business",
        technology: "Technology",
        art: "Art",
      };
      for (const [key, value] of Object.entries(categoryMap)) {
        if (lowerSubject.includes(key)) {
          category = value;
          break;
        }
      }
      categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
  };

  const categories = getSubjectCategories();

  return (
    <div className="book-subjects-container">
      {/* Header */}
      <div className="book-subjects-header">
        <div className="book-subjects-title-wrapper">
          <span className="book-subjects-icon">📚</span>
          <h3
            className={`
            book-subjects-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.subjects_covered") || "Subjects Covered"}
          </h3>
        </div>
        <span
          className={`
          book-subjects-count
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {subjects.length} {t("book.subjects") || "subjects"}
        </span>
      </div>

      {/* Category Quick View */}
      {Object.keys(categories).length > 0 && (
        <div className="book-subjects-categories">
          {Object.entries(categories).map(([category, count]) => (
            <span
              key={category}
              className={`
                book-subjects-category-tag
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              `}
            >
              {category} ({count})
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      {subjects.length > 5 && (
        <div className="book-subjects-search">
          <div className="book-subjects-search-wrapper">
            <FaSearch
              className={`
              book-subjects-search-icon
              ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
            `}
            />
            <input
              type="text"
              placeholder={t("book.search_subjects") || "Search subjects..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                book-subjects-search-input
                ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                focus:ring-2 focus:ring-sky-500
              `}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="book-subjects-search-clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="book-subjects-grid">
        {displaySubjects.map((subject, index) => {
          const isSelected = selectedSubject === subject;
          const colorClass = getSubjectColor(subject);

          return (
            <button
              key={index}
              onClick={() => handleSubjectClick(subject)}
              className={`
                book-subject-item
                ${colorClass}
                border
                rounded-xl
                p-3
                transition-all duration-200
                hover:scale-105
                ${isSelected ? "ring-2 ring-sky-500 shadow-md" : ""}
                ${isSelected ? "transform scale-105" : ""}
              `}
            >
              <div className="book-subject-content">
                <span className="book-subject-icon-wrapper">
                  {getSubjectIcon(subject)}
                </span>
                <span className="book-subject-name">{subject}</span>
                {isSelected && <span className="book-subject-selected">✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <button
          onClick={toggleExpand}
          className={`
            book-subjects-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.show_less") || "Show Less"
              : t("book.show_more") ||
                `Show All (${filteredSubjects.length - maxDisplay} more)`}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* No Results */}
      {filteredSubjects.length === 0 && searchTerm && (
        <div
          className={`
          book-subjects-no-results
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          <FaFilter className="w-5 h-5" />
          <span>
            {t("book.no_subjects_found") ||
              "No subjects found matching your search."}
          </span>
        </div>
      )}
    </div>
  );
};

export default BookSubjects;
