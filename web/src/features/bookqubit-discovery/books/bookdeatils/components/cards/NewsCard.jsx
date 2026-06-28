// src/features/bookqubit-discovery/books/bookdeatils/components/cards/NewsCard.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaNewspaper,
  FaClock,
  FaShare,
  FaBookmark,
  FaHeart,
  FaComment,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTag,
  FaUser,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./NewsCard.css";

const NewsCard = ({
  news,
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
  showSource = true,
  showDate = true,
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

  if (!theme || !news) return null;

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
      interviews:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      reviews:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      announcements:
        "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400",
    };
    return (
      colors[category?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      awards: "🏆",
      events: "📅",
      adaptations: "🎬",
      releases: "📚",
      "book clubs": "📖",
      interviews: "🎙️",
      reviews: "⭐",
      announcements: "📢",
    };
    return icons[category?.toLowerCase()] || "📰";
  };

  // Handle like
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(news);
    }
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(news);
    }
  };

  // Handle share
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(news);
    }
  };

  // Handle comment
  const handleComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onComment) {
      onComment(news);
    }
  };

  // Handle read more
  const handleReadMore = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
    if (onReadMore) {
      onReadMore(news);
    }
  };

  // Get excerpt
  const getExcerpt = () => {
    if (!news.excerpt) return "";
    if (isExpanded || size === "large") {
      return news.excerpt;
    }
    if (size === "small") {
      return news.excerpt.slice(0, 60) + "...";
    }
    return news.excerpt.slice(0, 100) + "...";
  };

  // Check if should show expand button
  const shouldShowExpand = news.excerpt && news.excerpt.length > 100;

  return (
    <div
      className={`
        news-card
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
      <div className={`news-card-content ${sizeClasses.wrapper}`}>
        {/* Featured Badge */}
        {isFeatured && (
          <div className="news-card-featured-badge">
            <span>⭐</span>
            {t("book.featured") || "Featured"}
          </div>
        )}

        <div className="news-card-inner">
          {/* Image */}
          {showImage && news.image && (
            <div
              className={`news-card-image ${sizeClasses.image} flex-shrink-0`}
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div className="news-card-body flex-1 min-w-0">
            {/* Meta */}
            <div className="news-card-meta">
              {showSource && news.source && (
                <span className="news-card-source">
                  <FaNewspaper className="w-3 h-3" />
                  {news.source}
                </span>
              )}
              {showDate && news.date && (
                <span
                  className={`
                  news-card-date
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  <FaClock className="w-3 h-3" />
                  {formatDate(news.date)}
                </span>
              )}
            </div>

            {/* Title */}
            <h4
              className={`
              news-card-title
              ${sizeClasses.title}
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              font-semibold
              line-clamp-2
            `}
            >
              {news.title}
            </h4>

            {/* Excerpt */}
            {showExcerpt && news.excerpt && (
              <p
                className={`
                news-card-excerpt
                ${sizeClasses.excerpt}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                mt-1
                ${isExpanded ? "line-clamp-none" : "line-clamp-2"}
              `}
              >
                {getExcerpt()}
              </p>
            )}

            {/* Read More */}
            {shouldShowExpand && (
              <button
                onClick={handleReadMore}
                className={`
                  news-card-read-more
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

            {/* Category & Actions */}
            <div className="news-card-footer mt-2">
              <div className="news-card-footer-left">
                {showCategory && news.category && (
                  <span
                    className={`
                    news-card-category
                    ${getCategoryColor(news.category)}
                    text-xs font-medium px-2 py-0.5 rounded-full
                  `}
                  >
                    {getCategoryIcon(news.category)} {news.category}
                  </span>
                )}
              </div>

              {showActions && (
                <div className={`news-card-actions ${sizeClasses.actions}`}>
                  <button
                    onClick={handleLike}
                    className={`
                      news-card-action
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
                    {news.likes && (
                      <span className="text-xs">
                        {news.likes + (isLiked ? 1 : 0)}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleComment}
                    className={`
                      news-card-action
                      ${sizeClasses.actionBtn}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-sky-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.comment") || "Comment"}
                  >
                    <FaComment className="w-3.5 h-3.5" />
                    {news.comments && (
                      <span className="text-xs">{news.comments}</span>
                    )}
                  </button>

                  <button
                    onClick={handleSave}
                    className={`
                      news-card-action
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
                      news-card-action
                      ${sizeClasses.actionBtn}
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                      hover:text-emerald-500
                      transition-all duration-200 hover:scale-110
                    `}
                    aria-label={t("book.share") || "Share"}
                  >
                    <FaShare className="w-3.5 h-3.5" />
                  </button>

                  {news.url && (
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        news-card-action
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

export default NewsCard;
