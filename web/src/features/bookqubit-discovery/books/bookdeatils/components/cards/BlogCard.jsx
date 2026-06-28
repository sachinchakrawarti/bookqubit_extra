// src/features/bookqubit-discovery/books/bookdeatils/components/cards/BlogCard.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBlog,
  FaUser,
  FaClock,
  FaShare,
  FaBookmark,
  FaHeart,
  FaComment,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTag,
  FaQuoteLeft,
  FaQuoteRight,
  FaEye,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BlogCard.css";

const BlogCard = ({
  blog,
  theme: propTheme,
  language = "en",
  onShare,
  onSave,
  onLike,
  onComment,
  onReadMore,
  className = "",
  size = "medium", // small, medium, large
  showActions = true,
  showImage = true,
  showCategory = true,
  showAuthor = true,
  showDate = true,
  showReadTime = true,
  showExcerpt = true,
  isFeatured = false,
  isCompact = false,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!theme || !blog) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          wrapper: "p-3",
          image: "w-20 h-20",
          title: "text-sm",
          excerpt: "text-xs",
          meta: "text-xs",
          actions: "gap-1",
          actionBtn: "w-6 h-6 text-xs",
        };
      case "large":
        return {
          wrapper: "p-5",
          image: "w-32 h-32",
          title: "text-lg",
          excerpt: "text-sm",
          meta: "text-sm",
          actions: "gap-2",
          actionBtn: "w-8 h-8 text-sm",
        };
      default: // medium
        return {
          wrapper: "p-4",
          image: "w-24 h-24",
          title: "text-base",
          excerpt: "text-sm",
          meta: "text-xs",
          actions: "gap-1.5",
          actionBtn: "w-7 h-7 text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t("book.just_now") || "Just now";
    if (minutes < 60) return `${minutes}m ${t("book.ago") || "ago"}`;
    if (hours < 24) return `${hours}h ${t("book.ago") || "ago"}`;
    if (days < 7) return `${days}d ${t("book.ago") || "ago"}`;
    if (days < 30) return `${Math.floor(days / 7)}w ${t("book.ago") || "ago"}`;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get category color
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
      opinion:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
      tutorial: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400",
      news: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
      personal:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    };
    return (
      colors[category?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      analysis: "🔍",
      "character analysis": "👤",
      "literary analysis": "📖",
      interview: "🎙️",
      review: "⭐",
      opinion: "💭",
      tutorial: "📚",
      news: "📰",
      personal: "✍️",
    };
    return icons[category?.toLowerCase()] || "📝";
  };

  // Handle like
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(blog);
    }
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(blog);
    }
  };

  // Handle share
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(blog);
    }
  };

  // Handle comment
  const handleComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onComment) {
      onComment(blog);
    }
  };

  // Handle read more
  const handleReadMore = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
    if (onReadMore) {
      onReadMore(blog);
    }
  };

  // Get excerpt
  const getExcerpt = () => {
    if (!blog.excerpt) return "";
    if (isExpanded || size === "large") {
      return blog.excerpt;
    }
    if (size === "small") {
      return blog.excerpt.slice(0, 60) + "...";
    }
    return blog.excerpt.slice(0, 100) + "...";
  };

  // Check if should show expand button
  const shouldShowExpand = blog.excerpt && blog.excerpt.length > 100;

  // Get author initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      className={`
        blog-card
        ${isFeatured ? "featured" : ""}
        ${isCompact ? "compact" : ""}
        ${className}
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        overflow-hidden
        transition-all duration-300
        hover:shadow-md hover:scale-[1.01]
      `}
    >
      <div className={`blog-card-content ${sizeClasses.wrapper}`}>
        {/* Featured Badge */}
        {isFeatured && (
          <div className="blog-card-featured-badge">
            <span>⭐</span>
            {t("book.featured") || "Featured"}
          </div>
        )}

        <div className="blog-card-inner">
          {/* Image */}
          {showImage && blog.image && (
            <div
              className={`blog-card-image ${sizeClasses.image} flex-shrink-0`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div className="blog-card-body flex-1 min-w-0">
            {/* Meta */}
            <div className="blog-card-meta">
              {showAuthor && blog.author && (
                <div className="blog-card-author">
                  <div className="blog-card-author-avatar">
                    {blog.avatar || getInitials(blog.author)}
                  </div>
                  <span className="blog-card-author-name">{blog.author}</span>
                </div>
              )}
              {showDate && blog.date && (
                <span
                  className={`
                  blog-card-date
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  <FaClock className="w-3 h-3" />
                  {formatDate(blog.date)}
                </span>
              )}
              {showReadTime && blog.readTime && (
                <span
                  className={`
                  blog-card-read-time
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  <FaClock className="w-3 h-3" />
                  {blog.readTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h4
              className={`
              blog-card-title
              ${sizeClasses.title}
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              font-semibold
              line-clamp-2
            `}
            >
              {blog.title}
            </h4>

            {/* Excerpt with Quote Icons */}
            {showExcerpt && blog.excerpt && (
              <div className="blog-card-excerpt-wrapper">
                <FaQuoteLeft
                  className={`
                  blog-card-quote-icon
                  ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                `}
                />
                <p
                  className={`
                  blog-card-excerpt
                  ${sizeClasses.excerpt}
                  ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                  mt-1
                  ${isExpanded ? "line-clamp-none" : "line-clamp-2"}
                `}
                >
                  {getExcerpt()}
                </p>
                <FaQuoteRight
                  className={`
                  blog-card-quote-icon blog-card-quote-icon-right
                  ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                `}
                />
              </div>
            )}

            {/* Read More */}
            {shouldShowExpand && (
              <button
                onClick={handleReadMore}
                className={`
                  blog-card-read-more
                  ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
                  text-xs font-medium mt-1
                  hover:underline
                  transition-colors duration-200
                  bg-transparent border-none cursor-pointer
                `}
              >
                {isExpanded
                  ? t("book.read_less") || "Read Less"
                  : t("book.read_more") || "Read More"}
              </button>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-card-tags">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className={`
                      blog-card-tag
                      ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                      ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                      text-xs px-2 py-0.5 rounded-full
                    `}
                  >
                    <FaTag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 3 && (
                  <span
                    className={`
                    blog-card-tag-more
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    text-xs
                  `}
                  >
                    +{blog.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="blog-card-footer mt-2">
              <div className="blog-card-footer-left">
                {showCategory && blog.category && (
                  <span
                    className={`
                    blog-card-category
                    ${getCategoryColor(blog.category)}
                    text-xs font-medium px-2 py-0.5 rounded-full
                  `}
                  >
                    {getCategoryIcon(blog.category)} {blog.category}
                  </span>
                )}
              </div>

              {showActions && (
                <div className={`blog-card-actions ${sizeClasses.actions}`}>
                  <button
                    onClick={handleLike}
                    className={`
                      blog-card-action
                      ${sizeClasses.actionBtn}
                      ${isLiked ? "active" : ""}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-rose-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.like") || "Like"}
                  >
                    <FaHeart
                      className={`${isLiked ? "text-rose-500 fill-rose-500" : ""}`}
                    />
                    {blog.likes && (
                      <span className="text-xs">
                        {blog.likes + (isLiked ? 1 : 0)}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleComment}
                    className={`
                      blog-card-action
                      ${sizeClasses.actionBtn}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-sky-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.comment") || "Comment"}
                  >
                    <FaComment className="w-3.5 h-3.5" />
                    {blog.comments && (
                      <span className="text-xs">{blog.comments}</span>
                    )}
                  </button>

                  <button
                    onClick={handleSave}
                    className={`
                      blog-card-action
                      ${sizeClasses.actionBtn}
                      ${isSaved ? "active" : ""}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-sky-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.save") || "Save"}
                  >
                    <FaBookmark
                      className={`${isSaved ? "text-sky-500 fill-sky-500" : ""}`}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className={`
                      blog-card-action
                      ${sizeClasses.actionBtn}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-emerald-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.share") || "Share"}
                  >
                    <FaShare className="w-3.5 h-3.5" />
                  </button>

                  {blog.views && (
                    <span
                      className={`
                      blog-card-views
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      text-xs flex items-center gap-0.5
                    `}
                    >
                      <FaEye className="w-3 h-3" />
                      {blog.views}
                    </span>
                  )}

                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        blog-card-action
                        ${sizeClasses.actionBtn}
                        ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                        hover:text-sky-500
                        transition-all duration-200 hover:scale-110
                      `}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={t("book.open_link") || "Open link"}
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
