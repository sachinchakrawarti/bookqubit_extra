// src/features/bookqubit-discovery/books/bookdeatils/components/cards/RelatedBookCard.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaStar,
  FaUser,
  FaHeart,
  FaBookmark,
  FaShare,
  FaEye,
  FaClock,
  FaFire,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./RelatedBookCard.css";

const RelatedBookCard = ({
  book,
  theme: propTheme,
  language = "en",
  onWishlist,
  onSave,
  onShare,
  onView,
  className = "",
  size = "medium", // small, medium, large
  showActions = true,
  showProgress = true,
  showRating = true,
  showStatus = true,
  showCategory = true,
  isHoverable = true,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          wrapper: "w-[140px] md:w-[160px]",
          image: "h-[180px] md:h-[210px]",
          title: "text-sm",
          author: "text-xs",
          rating: "w-3 h-3",
          actions: "gap-1",
          actionBtn: "w-6 h-6 text-xs",
        };
      case "large":
        return {
          wrapper: "w-[220px] md:w-[260px]",
          image: "h-[280px] md:h-[330px]",
          title: "text-base",
          author: "text-sm",
          rating: "w-4 h-4",
          actions: "gap-2",
          actionBtn: "w-8 h-8 text-sm",
        };
      default: // medium
        return {
          wrapper: "w-[180px] md:w-[200px]",
          image: "h-[230px] md:h-[260px]",
          title: "text-sm md:text-base",
          author: "text-xs md:text-sm",
          rating: "w-3 h-3 md:w-3.5 h-3.5",
          actions: "gap-1.5",
          actionBtn: "w-7 h-7 text-xs md:text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "reading":
        return "bg-sky-500";
      case "completed":
        return "bg-emerald-500";
      case "want_to_read":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "reading":
        return t("book.reading") || "Reading";
      case "completed":
        return t("book.completed") || "Completed";
      case "want_to_read":
        return t("book.want_to_read") || "Want to Read";
      default:
        return t("book.unread") || "Unread";
    }
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < Math.floor(rating || 0)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-300 dark:text-gray-600"
        } ${sizeClasses.rating}`}
      />
    ));
  };

  // Handle wishlist
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onWishlist) {
      onWishlist(book);
    }
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(book);
    }
  };

  // Handle share
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(book);
    }
  };

  // Handle view
  const handleView = (e) => {
    if (onView) {
      onView(book);
    }
  };

  // Get book URL
  const getBookUrl = () => {
    const slug = book.slug || book.id;
    return `/${language}/books/${slug}`;
  };

  // Get category color
  const getCategoryColor = () => {
    const colors = {
      Fiction:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Non-Fiction":
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
      "Science Fiction":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Fantasy:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      Mystery:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
      Romance:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      Thriller: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      "Self-Help":
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      Biography:
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
      History:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    };
    return (
      colors[book.category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  return (
    <div
      className={`
        related-book-card
        ${sizeClasses.wrapper}
        ${className}
        ${isHoverable ? "hoverable" : ""}
        ${isHovered ? "hovered" : ""}
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        overflow-hidden
        transition-all duration-300
        group
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={getBookUrl()}
        onClick={handleView}
        className="related-book-card-link"
      >
        {/* Image Container */}
        <div className="related-book-card-image-wrapper">
          <img
            src={book.imageUrl || "/api/placeholder/200/280"}
            alt={book.title}
            className={`
              related-book-card-image
              ${sizeClasses.image}
              w-full
              object-cover
              transition-transform duration-300
              group-hover:scale-105
            `}
            loading="lazy"
          />

          {/* Status Badge */}
          {showStatus && book.status && (
            <div
              className={`
              related-book-card-status
              ${getStatusColor(book.status)}
              text-white
              text-xs font-medium
              px-2 py-0.5 rounded-full
              absolute top-2 left-2
              shadow-md
            `}
            >
              {getStatusLabel(book.status)}
            </div>
          )}

          {/* Progress Bar */}
          {showProgress &&
            book.progress !== undefined &&
            book.progress > 0 &&
            book.progress < 100 && (
              <div className="related-book-card-progress">
                <div
                  className="related-book-card-progress-fill"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            )}

          {/* Overlay on Hover */}
          {isHoverable && (
            <div
              className={`
              related-book-card-overlay
              ${isHovered ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300
            `}
            >
              <span className="related-book-card-overlay-text">
                {t("book.view_details") || "View Details"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="related-book-card-content p-3">
          {/* Category */}
          {showCategory && book.category && (
            <span
              className={`
              related-book-card-category
              ${getCategoryColor()}
              text-xs font-medium px-2 py-0.5 rounded-full
              inline-block mb-1.5
            `}
            >
              {book.category}
            </span>
          )}

          {/* Title */}
          <h4
            className={`
            related-book-card-title
            ${sizeClasses.title}
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            font-semibold
            truncate
          `}
          >
            {book.title}
          </h4>

          {/* Author */}
          <p
            className={`
            related-book-card-author
            ${sizeClasses.author}
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            truncate
          `}
          >
            <FaUser className="inline mr-1 w-3 h-3" />
            {book.author}
          </p>

          {/* Rating */}
          {showRating && book.rating && (
            <div className="related-book-card-rating mt-1">
              <div className="flex items-center">
                {renderStars(book.rating)}
                <span
                  className={`
                  text-xs ml-1
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  ({book.rating.toFixed(1)})
                </span>
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="related-book-card-meta mt-1.5">
            {book.pageCount && (
              <span
                className={`
                related-book-card-meta-item
                ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                text-xs
              `}
              >
                <FaClock className="inline mr-1 w-3 h-3" />
                {book.pageCount} {t("book.pages") || "pages"}
              </span>
            )}
            {book.published && (
              <span
                className={`
                related-book-card-meta-item
                ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                text-xs
              `}
              >
                {book.published}
              </span>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div
              className={`
              related-book-card-actions
              ${sizeClasses.actions}
              mt-2 pt-2
              border-t
              ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
              flex
            `}
            >
              <button
                onClick={handleWishlist}
                className={`
                  related-book-card-action
                  ${sizeClasses.actionBtn}
                  ${isLiked ? "active" : ""}
                  ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                  hover:text-rose-500
                  transition-all duration-200 hover:scale-110
                  flex items-center justify-center
                  rounded-full
                  bg-transparent
                  border-none
                  cursor-pointer
                `}
                aria-label={t("book.wishlist") || "Add to wishlist"}
              >
                <FaHeart
                  className={`${isLiked ? "text-rose-500 fill-rose-500" : ""}`}
                />
              </button>

              <button
                onClick={handleSave}
                className={`
                  related-book-card-action
                  ${sizeClasses.actionBtn}
                  ${isSaved ? "active" : ""}
                  ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                  hover:text-sky-500
                  transition-all duration-200 hover:scale-110
                  flex items-center justify-center
                  rounded-full
                  bg-transparent
                  border-none
                  cursor-pointer
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
                  related-book-card-action
                  ${sizeClasses.actionBtn}
                  ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                  hover:text-emerald-500
                  transition-all duration-200 hover:scale-110
                  flex items-center justify-center
                  rounded-full
                  bg-transparent
                  border-none
                  cursor-pointer
                `}
                aria-label={t("book.share") || "Share"}
              >
                <FaShare />
              </button>

              <button
                onClick={handleView}
                className={`
                  related-book-card-action
                  ${sizeClasses.actionBtn}
                  ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                  hover:text-sky-500
                  transition-all duration-200 hover:scale-110
                  flex items-center justify-center
                  rounded-full
                  bg-transparent
                  border-none
                  cursor-pointer
                  ml-auto
                `}
                aria-label={t("book.view") || "View"}
              >
                <FaEye />
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RelatedBookCard;
