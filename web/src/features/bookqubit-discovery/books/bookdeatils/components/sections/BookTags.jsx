// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookTags.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaTag,
  FaFire,
  FaStar,
  FaBookmark,
  FaHeart,
  FaHashtag,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaFilter,
  FaTimes,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookTags.css";

const BookTags = ({
  book,
  theme: propTheme,
  onTagClick,
  showAll = false,
  maxDisplay = 12,
  currentLang = "en",
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(showAll);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Extract tags from book data
  const tags = book.tags || book.keywords || [];

  // If no tags, show a message
  if (!tags || tags.length === 0) {
    return (
      <div
        className={`
        book-tags-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaTag className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_tags") || "No tags available for this book."}
        </p>
      </div>
    );
  }

  // Tag categories
  const tagCategories = {
    genre: [
      "Fiction",
      "Sci-Fi",
      "Fantasy",
      "Mystery",
      "Romance",
      "Thriller",
      "Horror",
      "Adventure",
    ],
    theme: [
      "Self-Discovery",
      "Mental Health",
      "Philosophy",
      "Love",
      "Friendship",
      "Courage",
    ],
    mood: [
      "Inspiring",
      "Heartwarming",
      "Thought-provoking",
      "Dark",
      "Humorous",
      "Emotional",
    ],
    style: [
      "Fast-paced",
      "Character-driven",
      "Plot-twist",
      "Descriptive",
      "Dialogue-heavy",
    ],
  };

  // Determine tag category
  const getTagCategory = (tag) => {
    for (const [category, items] of Object.entries(tagCategories)) {
      if (
        items.some(
          (item) =>
            tag.toLowerCase().includes(item.toLowerCase()) ||
            item.toLowerCase().includes(tag.toLowerCase()),
        )
      ) {
        return category;
      }
    }
    return "other";
  };

  // Get tag color based on category
  const getTagColor = (tag) => {
    const category = getTagCategory(tag);
    const colors = {
      genre:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      theme:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      mood: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      style:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      other:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    };
    return colors[category] || colors.other;
  };

  // Get tag icon
  const getTagIcon = (tag) => {
    const category = getTagCategory(tag);
    const icons = {
      genre: <FaBookmark className="w-3 h-3" />,
      theme: <FaHeart className="w-3 h-3" />,
      mood: <FaStar className="w-3 h-3" />,
      style: <FaFire className="w-3 h-3" />,
      other: <FaHashtag className="w-3 h-3" />,
    };
    return icons[category] || icons.other;
  };

  // Get tag size based on frequency (mock)
  const getTagSize = (tag) => {
    // Mock frequency - in production, use actual data
    const frequencies = {
      Fiction: "lg",
      "Sci-Fi": "md",
      Fantasy: "lg",
      Mystery: "sm",
      Romance: "md",
      Thriller: "sm",
      "Self-Discovery": "lg",
      "Mental Health": "md",
      Philosophy: "lg",
      Love: "sm",
      Friendship: "md",
      Courage: "sm",
      Inspiring: "lg",
      Heartwarming: "md",
      "Thought-provoking": "lg",
      "Fast-paced": "md",
      "Character-driven": "lg",
      "Plot-twist": "md",
    };
    return frequencies[tag] || "md";
  };

  // Filter tags
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort tags by frequency (mock)
  const sortedTags = [...filteredTags].sort((a, b) => {
    const sizeOrder = { lg: 3, md: 2, sm: 1 };
    return (sizeOrder[getTagSize(b)] || 0) - (sizeOrder[getTagSize(a)] || 0);
  });

  // Get display tags
  const displayTags = expanded ? sortedTags : sortedTags.slice(0, maxDisplay);
  const hasMore = sortedTags.length > maxDisplay;

  // Handle tag click
  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      genre: t("book.genre") || "Genre",
      theme: t("book.themes") || "Themes",
      mood: t("book.mood") || "Mood",
      style: t("book.style") || "Style",
      other: t("book.other") || "Other",
    };
    return labels[category] || category;
  };

  // Group tags by category
  const groupedTags = {};
  displayTags.forEach((tag) => {
    const category = getTagCategory(tag);
    if (!groupedTags[category]) {
      groupedTags[category] = [];
    }
    groupedTags[category].push(tag);
  });

  return (
    <div className="book-tags-container">
      {/* Header */}
      <div className="book-tags-header">
        <div className="book-tags-title-wrapper">
          <span className="book-tags-icon">🏷️</span>
          <h3
            className={`
            book-tags-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.tags") || "Tags"}
          </h3>
          <span
            className={`
            book-tags-count
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {tags.length}
          </span>
        </div>
        <Link
          href={`/${currentLang}/tags`}
          className={`
            book-tags-view-all
            ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
            hover:underline
            transition-all duration-200
          `}
        >
          {t("book.explore_tags") || "Explore All"}{" "}
          <FaArrowRight className="w-3 h-3 inline" />
        </Link>
      </div>

      {/* Search */}
      {tags.length > 10 && (
        <div className="book-tags-search">
          <div className="book-tags-search-wrapper">
            <FaSearch
              className={`
              book-tags-search-icon
              ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
            `}
            />
            <input
              type="text"
              placeholder={t("book.search_tags") || "Search tags..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                book-tags-search-input
                ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                focus:ring-2 focus:ring-sky-500
              `}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="book-tags-search-clear">
                <FaTimes className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tags by Category */}
      {!searchTerm && Object.keys(groupedTags).length > 0 && (
        <div className="book-tags-categories">
          {Object.entries(groupedTags).map(([category, categoryTags]) => (
            <div key={category} className="book-tags-category">
              <div className="book-tags-category-header">
                <FaFilter className="w-3 h-3" />
                <span
                  className={`
                  book-tags-category-label
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  text-xs font-semibold uppercase tracking-wider
                `}
                >
                  {getCategoryLabel(category)}
                </span>
                <span
                  className={`
                  book-tags-category-count
                  ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  text-xs px-1.5 py-0.5 rounded-full
                `}
                >
                  {categoryTags.length}
                </span>
              </div>
              <div className="book-tags-category-tags">
                {categoryTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  const size = getTagSize(tag);
                  const sizeClass =
                    size === "lg"
                      ? "text-sm px-3 py-1.5"
                      : size === "md"
                        ? "text-xs px-2.5 py-1"
                        : "text-xs px-2 py-0.5";

                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`
                        book-tags-tag
                        ${getTagColor(tag)}
                        ${sizeClass}
                        border
                        rounded-full
                        transition-all duration-200
                        hover:scale-110
                        ${isSelected ? "ring-2 ring-sky-500 shadow-md scale-110" : ""}
                      `}
                    >
                      <span className="book-tags-tag-icon">
                        {getTagIcon(tag)}
                      </span>
                      <span className="book-tags-tag-name">{tag}</span>
                      {isSelected && (
                        <span className="book-tags-tag-check">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flat Tags View (when searching) */}
      {searchTerm && (
        <div className="book-tags-flat">
          {filteredTags.length > 0 ? (
            <div className="book-tags-flat-list">
              {filteredTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`
                      book-tags-tag
                      ${getTagColor(tag)}
                      border
                      rounded-full
                      px-3 py-1.5 text-sm
                      transition-all duration-200
                      hover:scale-110
                      ${isSelected ? "ring-2 ring-sky-500 shadow-md scale-110" : ""}
                    `}
                  >
                    <span className="book-tags-tag-icon">
                      {getTagIcon(tag)}
                    </span>
                    <span className="book-tags-tag-name">{tag}</span>
                    {isSelected && (
                      <span className="book-tags-tag-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div
              className={`
              book-tags-no-results
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              text-center py-4
            `}
            >
              <FaSearch className="w-6 h-6 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {t("book.no_tags_found") ||
                  "No tags found matching your search."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Show More/Less */}
      {hasMore && !searchTerm && (
        <button
          onClick={toggleExpand}
          className={`
            book-tags-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.show_less") || "Show Less"
              : t("book.show_all_tags") || `Show All ${sortedTags.length} Tags`}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* Popular Tags Quick View */}
      {!searchTerm && !expanded && sortedTags.length > 0 && (
        <div
          className={`
          book-tags-popular
          ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
        `}
        >
          <span
            className={`
            book-tags-popular-label
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            text-xs
          `}
          >
            {t("book.popular_tags") || "Popular:"}
          </span>
          <div className="book-tags-popular-list">
            {sortedTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`
                  book-tags-popular-tag
                  ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
                  hover:underline
                  text-xs
                `}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTags;
