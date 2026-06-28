// src/features/bookqubit-discovery/books/bookdeatils/components/cards/ReviewCard.jsx

"use client";

import React, { useState } from "react";
import {
  FaStar,
  FaUser,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaFlag,
  FaReply,
  FaCalendarAlt,
  FaCheckCircle,
  FaQuoteLeft,
  FaQuoteRight,
  FaEllipsisV,
  FaHeart,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./ReviewCard.css";

const ReviewCard = ({
  review,
  theme: propTheme,
  onLike,
  onDislike,
  onReply,
  onShare,
  onReport,
  onHelpful,
  className = "",
  size = "medium", // small, medium, large
  showActions = true,
  showReplies = true,
  showDate = true,
  showVerified = true,
  isCompact = false,
  isExpanded = false,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [showFullText, setShowFullText] = useState(isExpanded);
  const [showMenu, setShowMenu] = useState(false);

  if (!theme || !review) return null;

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
          avatar: "w-8 h-8",
          name: "text-sm",
          text: "text-sm",
          actions: "gap-1",
          actionBtn: "text-xs",
        };
      case "large":
        return {
          wrapper: "p-5",
          avatar: "w-12 h-12",
          name: "text-base",
          text: "text-base",
          actions: "gap-2",
          actionBtn: "text-sm",
        };
      default: // medium
        return {
          wrapper: "p-4",
          avatar: "w-10 h-10",
          name: "text-sm",
          text: "text-sm",
          actions: "gap-1.5",
          actionBtn: "text-xs",
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

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="text-amber-400 fill-amber-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStar key={i} className="text-amber-400 fill-amber-400" />,
        );
      } else {
        stars.push(
          <FaStar key={i} className="text-gray-300 dark:text-gray-600" />,
        );
      }
    }
    return stars;
  };

  // Get user initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Handle like
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
    if (onLike) {
      onLike(review);
    }
  };

  // Handle dislike
  const handleDislike = (e) => {
    e.stopPropagation();
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
    if (onDislike) {
      onDislike(review);
    }
  };

  // Handle helpful
  const handleHelpful = (e) => {
    e.stopPropagation();
    setIsHelpful(!isHelpful);
    if (onHelpful) {
      onHelpful(review);
    }
  };

  // Handle reply
  const handleReply = (e) => {
    e.stopPropagation();
    if (onReply) {
      onReply(review);
    }
  };

  // Handle share
  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(review);
    }
  };

  // Handle report
  const handleReport = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onReport) {
      onReport(review);
    }
  };

  // Toggle read more
  const toggleReadMore = (e) => {
    e.stopPropagation();
    setShowFullText(!showFullText);
  };

  // Get text display
  const getDisplayText = () => {
    if (!review.content) return "";
    if (showFullText || size === "large") {
      return review.content;
    }
    if (size === "small") {
      return review.content.slice(0, 80) + "...";
    }
    return review.content.slice(0, 120) + "...";
  };

  // Check if should show read more
  const shouldShowReadMore = review.content && review.content.length > 120;

  return (
    <div
      className={`
        review-card
        ${isCompact ? "compact" : ""}
        ${className}
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        overflow-hidden
        transition-all duration-300
        hover:shadow-md
      `}
    >
      <div className={`review-card-content ${sizeClasses.wrapper}`}>
        {/* Header */}
        <div className="review-card-header">
          <div className="review-card-user">
            <div className={`review-card-avatar ${sizeClasses.avatar}`}>
              {review.avatar || getInitials(review.user)}
            </div>
            <div className="review-card-user-info">
              <div className="review-card-user-name-wrapper">
                <span
                  className={`
                  review-card-user-name
                  ${sizeClasses.name}
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  font-medium
                `}
                >
                  {review.user}
                </span>
                {showVerified && review.verified && (
                  <span className="review-card-verified">
                    <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    {t("book.verified") || "Verified"}
                  </span>
                )}
              </div>
              <div className="review-card-rating">
                <div className="review-card-stars">
                  {renderStars(review.rating)}
                </div>
                {showDate && review.date && (
                  <span
                    className={`
                    review-card-date
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  `}
                  >
                    <FaCalendarAlt className="w-3 h-3" />
                    {formatDate(review.date)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className={`
              review-card-menu-btn
              ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
              hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
              transition-all duration-200
            `}
          >
            <FaEllipsisV className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              className={`
              review-card-dropdown
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
              ${theme.shadow?.container || "shadow-lg"}
              rounded-lg
              overflow-hidden
              z-20
            `}
            >
              <button
                onClick={handleReport}
                className={`
                  review-card-dropdown-item
                  text-red-500
                  hover:bg-red-50 dark:hover:bg-red-900/20
                `}
              >
                <FaFlag className="w-4 h-4" />
                {t("book.report") || "Report"}
              </button>
              <button
                onClick={handleShare}
                className={`
                  review-card-dropdown-item
                  ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                  hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                `}
              >
                <FaShare className="w-4 h-4" />
                {t("book.share") || "Share"}
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        {review.title && (
          <h4
            className={`
            review-card-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            font-semibold
            text-sm
            mt-1
          `}
          >
            {review.title}
          </h4>
        )}

        {/* Content */}
        <div className="review-card-text-wrapper">
          <FaQuoteLeft
            className={`
            review-card-quote-icon
            ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
          `}
          />
          <p
            className={`
            review-card-text
            ${sizeClasses.text}
            ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
            leading-relaxed
          `}
          >
            {getDisplayText()}
          </p>
          <FaQuoteRight
            className={`
            review-card-quote-icon review-card-quote-icon-right
            ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
          `}
          />
        </div>

        {/* Read More */}
        {shouldShowReadMore && (
          <button
            onClick={toggleReadMore}
            className={`
              review-card-read-more
              ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
              text-xs font-medium mt-1
              hover:underline
              transition-colors duration-200
              bg-transparent border-none cursor-pointer
            `}
          >
            {showFullText
              ? t("book.read_less") || "Read Less"
              : t("book.read_more") || "Read More"}
          </button>
        )}

        {/* Actions */}
        {showActions && (
          <div className={`review-card-actions ${sizeClasses.actions}`}>
            <button
              onClick={handleLike}
              className={`
                review-card-action
                ${isLiked ? "active" : ""}
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                hover:text-rose-500
                transition-all duration-200 hover:scale-110
              `}
            >
              <FaHeart
                className={`w-3.5 h-3.5 ${isLiked ? "text-rose-500 fill-rose-500" : ""}`}
              />
              <span>{review.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`
                review-card-action
                ${isDisliked ? "active" : ""}
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                hover:text-red-500
                transition-all duration-200 hover:scale-110
              `}
            >
              <FaThumbsDown className="w-3.5 h-3.5" />
              <span>{review.dislikes + (isDisliked ? 1 : 0)}</span>
            </button>

            <button
              onClick={handleReply}
              className={`
                review-card-action
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                hover:text-sky-500
                transition-all duration-200 hover:scale-110
              `}
            >
              <FaReply className="w-3.5 h-3.5" />
              <span>
                {review.replies || 0} {t("book.replies") || "replies"}
              </span>
            </button>

            <button
              onClick={handleHelpful}
              className={`
                review-card-action
                ${isHelpful ? "active" : ""}
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                hover:text-emerald-500
                transition-all duration-200 hover:scale-110
              `}
            >
              <FaThumbsUp className="w-3.5 h-3.5" />
              <span>{t("book.helpful") || "Helpful"}</span>
            </button>

            <button
              onClick={handleShare}
              className={`
                review-card-action
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                hover:text-emerald-500
                transition-all duration-200 hover:scale-110
              `}
            >
              <FaShare className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Replies */}
        {showReplies && review.replies && review.replies > 0 && (
          <div
            className={`
            review-card-replies
            ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
          `}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onReply) onReply(review);
              }}
              className={`
                review-card-replies-btn
                ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
                text-xs font-medium
                hover:underline
                transition-colors duration-200
              `}
            >
              {t("book.view_replies") || "View"} {review.replies}{" "}
              {t("book.replies") || "replies"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
