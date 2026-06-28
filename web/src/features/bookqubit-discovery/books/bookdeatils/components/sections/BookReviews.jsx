// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookReviews.jsx

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
  FaEllipsisV,
  FaRegStar,
  FaStarHalfAlt,
  FaCalendarAlt,
  FaQuoteLeft,
  FaQuoteRight,
  FaChartBar,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookReviews.css";

const BookReviews = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [sortBy, setSortBy] = useState("recent");
  const [showAll, setShowAll] = useState(false);
  const [likedReviews, setLikedReviews] = useState([]);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock reviews data - in production, fetch from API
  const reviews = book.reviews || [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      rating: 5,
      date: "2024-06-15",
      title: "A Masterpiece!",
      content:
        "This book completely changed my perspective on life. The writing is beautiful and the characters are so well-developed. I couldn't put it down!",
      likes: 42,
      dislikes: 3,
      replies: 5,
      verified: true,
      helpful: 38,
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "MC",
      rating: 4,
      date: "2024-06-10",
      title: "Great read, minor issues",
      content:
        "Really enjoyed this book. The plot is engaging and the themes are thought-provoking. However, I felt the ending was a bit rushed.",
      likes: 28,
      dislikes: 2,
      replies: 3,
      verified: false,
      helpful: 22,
    },
    {
      id: 3,
      user: "Emily Davis",
      avatar: "ED",
      rating: 5,
      date: "2024-06-05",
      title: "Absolutely loved it!",
      content:
        "One of the best books I've read this year. The author's writing style is captivating and the story stays with you long after you finish.",
      likes: 56,
      dislikes: 1,
      replies: 8,
      verified: true,
      helpful: 48,
    },
    {
      id: 4,
      user: "David Wilson",
      avatar: "DW",
      rating: 3,
      date: "2024-05-28",
      title: "Decent but overhyped",
      content:
        "It's a good book but I don't understand all the hype. Some parts felt slow and the characters were a bit one-dimensional.",
      likes: 15,
      dislikes: 12,
      replies: 6,
      verified: false,
      helpful: 10,
    },
    {
      id: 5,
      user: "Lisa Thompson",
      avatar: "LT",
      rating: 5,
      date: "2024-05-20",
      title: "Life-changing read!",
      content:
        "This book touched my soul. Every chapter had me reflecting on my own life and choices. Highly recommend to everyone.",
      likes: 73,
      dislikes: 0,
      replies: 12,
      verified: true,
      helpful: 62,
    },
  ];

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  // Sort reviews
  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "recent":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "helpful":
        return sorted.sort((a, b) => b.helpful - a.helpful);
      default:
        return sorted;
    }
  };

  const sortedReviews = getSortedReviews();
  const displayReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);

  // Render stars
  const renderStars = (rating, size = "small") => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starSize = size === "small" ? "w-3 h-3" : "w-4 h-4";

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <FaStar
                key={i}
                className={`${starSize} text-amber-400 fill-amber-400`}
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <FaStarHalfAlt
                key={i}
                className={`${starSize} text-amber-400 fill-amber-400`}
              />
            );
          } else {
            return (
              <FaRegStar
                key={i}
                className={`${starSize} text-gray-300 dark:text-gray-600`}
              />
            );
          }
        })}
      </div>
    );
  };

  // Format date
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle like review
  const handleLike = (reviewId) => {
    setLikedReviews((prev) => {
      if (prev.includes(reviewId)) {
        return prev.filter((id) => id !== reviewId);
      } else {
        return [...prev, reviewId];
      }
    });
  };

  // Toggle show all
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="book-reviews-container">
      {/* Header */}
      <div className="book-reviews-header">
        <div className="book-reviews-title-wrapper">
          <span className="book-reviews-icon">⭐</span>
          <h3
            className={`
            book-reviews-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.reviews") || "Reviews"}
          </h3>
          <span
            className={`
            book-reviews-count
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {totalReviews}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div
        className={`
        book-reviews-stats
        ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        p-4
      `}
      >
        <div className="book-reviews-stats-grid">
          {/* Average Rating */}
          <div className="book-reviews-stats-average">
            <span className="book-reviews-stats-number">
              {averageRating.toFixed(1)}
            </span>
            <div className="book-reviews-stats-stars">
              {renderStars(averageRating, "medium")}
            </div>
            <span
              className={`
              book-reviews-stats-label
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            `}
            >
              {totalReviews} {t("book.reviews") || "reviews"}
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="book-reviews-stats-distribution">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star] || 0;
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="book-reviews-stats-bar">
                  <span className="book-reviews-stats-bar-label">{star} ★</span>
                  <div className="book-reviews-stats-bar-track">
                    <div
                      className="book-reviews-stats-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="book-reviews-stats-bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="book-reviews-controls">
        <div className="book-reviews-sort">
          <FaFilter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`
              book-reviews-sort-select
              ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              focus:ring-2 focus:ring-sky-500
            `}
          >
            <option value="recent">
              {t("book.most_recent") || "Most Recent"}
            </option>
            <option value="oldest">{t("book.oldest") || "Oldest"}</option>
            <option value="highest">
              {t("book.highest_rated") || "Highest Rated"}
            </option>
            <option value="lowest">
              {t("book.lowest_rated") || "Lowest Rated"}
            </option>
            <option value="helpful">
              {t("book.most_helpful") || "Most Helpful"}
            </option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="book-reviews-list">
        {displayReviews.map((review) => {
          const isLiked = likedReviews.includes(review.id);

          return (
            <div
              key={review.id}
              className={`
                book-reviews-item
                ${theme.background?.section || "bg-white dark:bg-gray-900"}
                ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                rounded-xl
                p-4
                transition-all duration-200 hover:shadow-md
              `}
            >
              {/* Review Header */}
              <div className="book-reviews-item-header">
                <div className="book-reviews-item-user">
                  <div className="book-reviews-item-avatar">
                    {review.avatar || <FaUser />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                        book-reviews-item-name
                        ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                        font-medium
                      `}
                      >
                        {review.user}
                      </span>
                      {review.verified && (
                        <span className="text-emerald-500 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                          ✓ {t("book.verified") || "Verified"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span
                        className={`
                        text-xs
                        ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      `}
                      >
                        <FaCalendarAlt className="inline mr-1 w-3 h-3" />
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="book-reviews-item-content">
                <h4
                  className={`
                  book-reviews-item-title
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  font-semibold
                `}
                >
                  {review.title}
                </h4>
                <div className="book-reviews-item-text-wrapper">
                  <FaQuoteLeft
                    className={`
                    book-reviews-item-quote
                    ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                  `}
                  />
                  <p
                    className={`
                    book-reviews-item-text
                    ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
                  `}
                  >
                    {review.content}
                  </p>
                  <FaQuoteRight
                    className={`
                    book-reviews-item-quote book-reviews-item-quote-right
                    ${theme.textColors?.secondary || "text-gray-300 dark:text-gray-600"}
                  `}
                  />
                </div>
              </div>

              {/* Review Actions */}
              <div className="book-reviews-item-actions">
                <button
                  onClick={() => handleLike(review.id)}
                  className={`
                    book-reviews-item-action
                    ${isLiked ? "text-sky-500" : theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                    transition-all duration-200 hover:scale-110
                  `}
                >
                  <FaThumbsUp className="w-3.5 h-3.5" />
                  {review.likes + (isLiked ? 1 : 0)}
                </button>
                <button
                  className={`
                    book-reviews-item-action
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                    transition-all duration-200 hover:scale-110
                  `}
                >
                  <FaThumbsDown className="w-3.5 h-3.5" />
                  {review.dislikes}
                </button>
                <button
                  className={`
                    book-reviews-item-action
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                    transition-all duration-200 hover:scale-110
                  `}
                >
                  <FaReply className="w-3.5 h-3.5" />
                  {review.replies} {t("book.replies") || "replies"}
                </button>
                <button
                  className={`
                    book-reviews-item-action
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                    transition-all duration-200 hover:scale-110
                  `}
                >
                  <FaShare className="w-3.5 h-3.5" />
                </button>
                <button
                  className={`
                    book-reviews-item-action
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                    transition-all duration-200 hover:scale-110
                  `}
                >
                  <FaFlag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less */}
      {totalReviews > 3 && (
        <button
          onClick={toggleShowAll}
          className={`
            book-reviews-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          {showAll
            ? t("book.show_less_reviews") || "Show Less Reviews"
            : t("book.show_all_reviews") || `Show All ${totalReviews} Reviews`}
        </button>
      )}
    </div>
  );
};

export default BookReviews;
