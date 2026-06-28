// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookNews.jsx

"use client";

import React, { useState } from "react";
import {
  FaNewspaper,
  FaClock,
  FaShare,
  FaBookmark,
  FaHeart,
  FaComment,
  FaTag,
  FaExternalLinkAlt,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaUser,
  FaGlobe,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookNews.css";

const BookNews = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [savedNews, setSavedNews] = useState([]);
  const [likedNews, setLikedNews] = useState([]);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock news data - in production, fetch from API
  const newsItems = book.news || [
    {
      id: 1,
      title: "Book Award Nomination 2024",
      source: "Literary Times",
      sourceIcon: "📰",
      date: "2024-06-18",
      excerpt:
        "The book has been nominated for the prestigious Literary Award 2024, recognizing outstanding contributions to contemporary fiction.",
      category: "Awards",
      image: "/api/placeholder/120/80",
      likes: 234,
      comments: 45,
      shares: 89,
      url: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Author Announces Book Tour",
      source: "Book News Daily",
      sourceIcon: "📚",
      date: "2024-06-14",
      excerpt:
        "The author will be touring 15 cities across the country, with exclusive readings and book signings scheduled for next month.",
      category: "Events",
      image: "/api/placeholder/120/80",
      likes: 167,
      comments: 32,
      shares: 56,
      url: "#",
      featured: false,
    },
    {
      id: 3,
      title: "Book Adaptation in Development",
      source: "Entertainment Weekly",
      sourceIcon: "🎬",
      date: "2024-06-10",
      excerpt:
        "A major studio has acquired the rights for a film adaptation. The project is currently in early development with an acclaimed director attached.",
      category: "Adaptations",
      image: "/api/placeholder/120/80",
      likes: 412,
      comments: 78,
      shares: 234,
      url: "#",
      featured: true,
    },
    {
      id: 4,
      title: "International Edition Release",
      source: "Global Publishers",
      sourceIcon: "🌍",
      date: "2024-06-05",
      excerpt:
        "The book will be released in 25 countries with translations in 12 languages. International readers can expect the release later this year.",
      category: "Releases",
      image: "/api/placeholder/120/80",
      likes: 89,
      comments: 23,
      shares: 45,
      url: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Book Club Selection of the Month",
      source: "Reader's Digest",
      sourceIcon: "📖",
      date: "2024-05-28",
      excerpt:
        "The book has been chosen as the Book Club Selection for July, with discussion guides and author interview available for members.",
      category: "Book Clubs",
      image: "/api/placeholder/120/80",
      likes: 156,
      comments: 67,
      shares: 34,
      url: "#",
      featured: false,
    },
  ];

  // Filter news
  const getFilteredNews = () => {
    if (filter === "all") return newsItems;
    return newsItems.filter(
      (item) => item.category.toLowerCase() === filter.toLowerCase(),
    );
  };

  const filteredNews = getFilteredNews();
  const displayNews = showAll ? filteredNews : filteredNews.slice(0, 3);

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(newsItems.map((item) => item.category.toLowerCase())),
  ];

  // Format date
  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle save
  const handleSave = (id) => {
    setSavedNews((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle like
  const handleLike = (id) => {
    setLikedNews((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Toggle show all
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      awards:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      events:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      adaptations:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      releases:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      "book clubs":
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
    };
    return (
      colors[category.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  return (
    <div className="book-news-container">
      {/* Header */}
      <div className="book-news-header">
        <div className="book-news-title-wrapper">
          <span className="book-news-icon">📰</span>
          <h3
            className={`
            book-news-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.news") || "News"}
          </h3>
          <span
            className={`
            book-news-count
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {newsItems.length}
          </span>
        </div>
      </div>

      {/* Filter */}
      {categories.length > 1 && (
        <div className="book-news-filter">
          <FaFilter className="w-4 h-4 text-gray-400" />
          <div className="book-news-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  book-news-filter-tab
                  ${
                    filter === cat
                      ? `
                      ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                      ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                      shadow-md
                    `
                      : `
                      ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                      ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                      hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
                    `
                  }
                  transition-all duration-200
                `}
              >
                {cat === "all" ? t("book.all") || "All" : cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* News List */}
      <div className="book-news-list">
        {displayNews.map((item) => {
          const isSaved = savedNews.includes(item.id);
          const isLiked = likedNews.includes(item.id);

          return (
            <div
              key={item.id}
              className={`
                book-news-item
                ${item.featured ? "book-news-item-featured" : ""}
                ${theme.background?.section || "bg-white dark:bg-gray-900"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                rounded-xl
                overflow-hidden
                transition-all duration-200 hover:shadow-md hover:scale-[1.01]
              `}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="book-news-featured-badge">
                  <span>⭐</span>
                  {t("book.featured") || "Featured"}
                </div>
              )}

              <div className="book-news-item-content">
                {/* Image */}
                {item.image && (
                  <div className="book-news-item-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Text Content */}
                <div className="book-news-item-text">
                  {/* Source & Date */}
                  <div className="book-news-item-meta">
                    <span className="book-news-item-source">
                      {item.sourceIcon} {item.source}
                    </span>
                    <span
                      className={`
                      book-news-item-date
                      ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    `}
                    >
                      <FaClock className="w-3 h-3 inline mr-1" />
                      {formatDate(item.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`
                    book-news-item-title
                    ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  `}
                  >
                    {item.title}
                  </h4>

                  {/* Excerpt */}
                  <p
                    className={`
                    book-news-item-excerpt
                    ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                  `}
                  >
                    {item.excerpt}
                  </p>

                  {/* Category & Actions */}
                  <div className="book-news-item-footer">
                    <span
                      className={`
                      book-news-item-category
                      ${getCategoryColor(item.category)}
                      px-2 py-0.5 rounded-full text-xs font-medium
                    `}
                    >
                      {item.category}
                    </span>

                    <div className="book-news-item-actions">
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`
                          book-news-item-action
                          ${isLiked ? "text-rose-500" : "text-gray-400 dark:text-gray-500"}
                          hover:text-rose-500 transition-all duration-200 hover:scale-110
                        `}
                      >
                        <FaHeart
                          className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500" : ""}`}
                        />
                        <span>{item.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button className="book-news-item-action">
                        <FaComment className="w-3.5 h-3.5" />
                        <span>{item.comments}</span>
                      </button>
                      <button
                        onClick={() => handleSave(item.id)}
                        className={`
                          book-news-item-action
                          ${isSaved ? "text-sky-500" : "text-gray-400 dark:text-gray-500"}
                          hover:text-sky-500 transition-all duration-200 hover:scale-110
                        `}
                      >
                        <FaBookmark
                          className={`w-3.5 h-3.5 ${isSaved ? "fill-sky-500" : ""}`}
                        />
                      </button>
                      <button className="book-news-item-action hover:text-emerald-500 transition-all duration-200 hover:scale-110">
                        <FaShare className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="book-news-item-action hover:text-sky-500 transition-all duration-200 hover:scale-110"
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredNews.length === 0 && (
        <div
          className={`
          book-news-empty
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          text-center py-8
        `}
        >
          <FaNewspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{t("book.no_news") || "No news found for this book."}</p>
        </div>
      )}

      {/* Show More/Less */}
      {filteredNews.length > 3 && (
        <button
          onClick={toggleShowAll}
          className={`
            book-news-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          {showAll
            ? t("book.show_less") || "Show Less"
            : t("book.show_all_news") || `Show All ${filteredNews.length} News`}
          {showAll ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}
    </div>
  );
};

export default BookNews;
