// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookBlog.jsx

"use client";

import React, { useState } from "react";
import {
  FaBlog,
  FaUser,
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
  FaEye,
  FaThumbsUp,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookBlog.css";

const BookBlog = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock blog data - in production, fetch from API
  const blogPosts = book.blog || [
    {
      id: 1,
      title: "10 Life Lessons from the Book",
      author: "Sarah Mitchell",
      avatar: "SM",
      date: "2024-06-15",
      readTime: "8 min read",
      excerpt:
        "This book offers profound insights about life, love, and the choices we make. Here are 10 lessons that will stay with you long after you finish reading.",
      category: "Analysis",
      tags: ["Life Lessons", "Self-Help", "Philosophy"],
      image: "/api/placeholder/120/120",
      likes: 234,
      comments: 45,
      views: 1234,
      featured: true,
      url: "#",
    },
    {
      id: 2,
      title: "Character Deep Dive: The Protagonist's Journey",
      author: "Michael Chen",
      avatar: "MC",
      date: "2024-06-10",
      readTime: "6 min read",
      excerpt:
        "A detailed analysis of the main character's transformation throughout the story, exploring their motivations, conflicts, and growth.",
      category: "Character Analysis",
      tags: ["Character Study", "Literary Analysis"],
      image: "/api/placeholder/120/120",
      likes: 167,
      comments: 32,
      views: 876,
      featured: false,
      url: "#",
    },
    {
      id: 3,
      title: "The Hidden Symbolism You Missed",
      author: "Emma Thompson",
      avatar: "ET",
      date: "2024-06-05",
      readTime: "10 min read",
      excerpt:
        "This book is rich with symbolism and hidden meanings. Discover the deeper layers that add incredible depth to the narrative.",
      category: "Literary Analysis",
      tags: ["Symbolism", "Deep Dive", "Literary Analysis"],
      image: "/api/placeholder/120/120",
      likes: 312,
      comments: 67,
      views: 1456,
      featured: true,
      url: "#",
    },
    {
      id: 4,
      title: "Behind the Scenes: Author Interview",
      author: "David Wilson",
      avatar: "DW",
      date: "2024-05-28",
      readTime: "5 min read",
      excerpt:
        "An exclusive interview with the author discussing the inspiration behind the book, their writing process, and what's next.",
      category: "Interview",
      tags: ["Author", "Interview", "Behind the Scenes"],
      image: "/api/placeholder/120/120",
      likes: 89,
      comments: 23,
      views: 567,
      featured: false,
      url: "#",
    },
    {
      id: 5,
      title: "Why This Book is a Must-Read",
      author: "Lisa Thompson",
      avatar: "LT",
      date: "2024-05-20",
      readTime: "4 min read",
      excerpt:
        "A passionate review explaining why this book deserves a place on everyone's reading list and why it's the talk of the town.",
      category: "Review",
      tags: ["Review", "Recommendation"],
      image: "/api/placeholder/120/120",
      likes: 156,
      comments: 34,
      views: 789,
      featured: false,
      url: "#",
    },
  ];

  // Filter blogs
  const getFilteredBlogs = () => {
    if (filter === "all") return blogPosts;
    return blogPosts.filter(
      (post) => post.category.toLowerCase() === filter.toLowerCase(),
    );
  };

  const filteredBlogs = getFilteredBlogs();
  const displayBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, 3);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(blogPosts.map((post) => post.category.toLowerCase())),
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
    setSavedBlogs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle like
  const handleLike = (id) => {
    setLikedBlogs((prev) => {
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
      analysis:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "character analysis":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      "literary analysis":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      interview:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      review:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    };
    return (
      colors[category.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  return (
    <div className="book-blog-container">
      {/* Header */}
      <div className="book-blog-header">
        <div className="book-blog-title-wrapper">
          <span className="book-blog-icon">✍️</span>
          <h3
            className={`
            book-blog-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.blog") || "Blog"}
          </h3>
          <span
            className={`
            book-blog-count
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {blogPosts.length}
          </span>
        </div>
      </div>

      {/* Filter */}
      {categories.length > 1 && (
        <div className="book-blog-filter">
          <FaFilter className="w-4 h-4 text-gray-400" />
          <div className="book-blog-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  book-blog-filter-tab
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

      {/* Blog List */}
      <div className="book-blog-list">
        {displayBlogs.map((post) => {
          const isSaved = savedBlogs.includes(post.id);
          const isLiked = likedBlogs.includes(post.id);

          return (
            <div
              key={post.id}
              className={`
                book-blog-post
                ${post.featured ? "book-blog-post-featured" : ""}
                ${theme.background?.section || "bg-white dark:bg-gray-900"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                rounded-xl
                overflow-hidden
                transition-all duration-200 hover:shadow-md hover:scale-[1.01]
              `}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="book-blog-featured-badge">
                  <span>⭐</span>
                  {t("book.featured") || "Featured"}
                </div>
              )}

              <div className="book-blog-post-content">
                {/* Image */}
                {post.image && (
                  <div className="book-blog-post-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Text Content */}
                <div className="book-blog-post-text">
                  {/* Author & Date */}
                  <div className="book-blog-post-meta">
                    <div className="book-blog-post-author">
                      <span className="book-blog-post-avatar">
                        {post.avatar || <FaUser />}
                      </span>
                      <span className="book-blog-post-author-name">
                        {post.author}
                      </span>
                    </div>
                    <span
                      className={`
                      book-blog-post-date
                      ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    `}
                    >
                      <FaClock className="w-3 h-3 inline mr-1" />
                      {formatDate(post.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`
                    book-blog-post-title
                    ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  `}
                  >
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <div className="book-blog-post-excerpt-wrapper">
                    <FaQuoteLeft
                      className={`
                      book-blog-post-quote
                      ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                    `}
                    />
                    <p
                      className={`
                      book-blog-post-excerpt
                      ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                    `}
                    >
                      {post.excerpt}
                    </p>
                    <FaQuoteRight
                      className={`
                      book-blog-post-quote book-blog-post-quote-right
                      ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                    `}
                    />
                  </div>

                  {/* Tags & Read Time */}
                  <div className="book-blog-post-tags">
                    {post.tags &&
                      post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`
                          book-blog-post-tag
                          ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                          ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                        `}
                        >
                          <FaTag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    <span
                      className={`
                      book-blog-post-readtime
                      ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    `}
                    >
                      <FaClock className="w-3 h-3 inline mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Category & Actions */}
                  <div className="book-blog-post-footer">
                    <span
                      className={`
                      book-blog-post-category
                      ${getCategoryColor(post.category)}
                      px-2 py-0.5 rounded-full text-xs font-medium
                    `}
                    >
                      {post.category}
                    </span>

                    <div className="book-blog-post-actions">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`
                          book-blog-post-action
                          ${isLiked ? "text-rose-500" : "text-gray-400 dark:text-gray-500"}
                          hover:text-rose-500 transition-all duration-200 hover:scale-110
                        `}
                      >
                        <FaHeart
                          className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500" : ""}`}
                        />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button className="book-blog-post-action">
                        <FaComment className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="book-blog-post-action">
                        <FaEye className="w-3.5 h-3.5" />
                        <span>{post.views}</span>
                      </button>
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`
                          book-blog-post-action
                          ${isSaved ? "text-sky-500" : "text-gray-400 dark:text-gray-500"}
                          hover:text-sky-500 transition-all duration-200 hover:scale-110
                        `}
                      >
                        <FaBookmark
                          className={`w-3.5 h-3.5 ${isSaved ? "fill-sky-500" : ""}`}
                        />
                      </button>
                      <button className="book-blog-post-action hover:text-emerald-500 transition-all duration-200 hover:scale-110">
                        <FaShare className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="book-blog-post-action hover:text-sky-500 transition-all duration-200 hover:scale-110"
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
      {filteredBlogs.length === 0 && (
        <div
          className={`
          book-blog-empty
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          text-center py-8
        `}
        >
          <FaBlog className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{t("book.no_blog") || "No blog posts found for this book."}</p>
        </div>
      )}

      {/* Show More/Less */}
      {filteredBlogs.length > 3 && (
        <button
          onClick={toggleShowAll}
          className={`
            book-blog-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          {showAll
            ? t("book.show_less") || "Show Less"
            : t("book.show_all_blogs") ||
              `Show All ${filteredBlogs.length} Blogs`}
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

export default BookBlog;
