// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookAnalytics.jsx

"use client";

import React, { useState } from "react";
import {
  FaChartBar,
  FaUsers,
  FaStar,
  FaBookOpen,
  FaClock,
  FaFire,
  FaHeart,
  FaShare,
  FaComment,
  FaEye,
  FaDownload,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookAnalytics.css";

const BookAnalytics = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock analytics data - in production, fetch from API
  const analytics = book.analytics || {
    totalReaders: 12453,
    averageRating: 4.7,
    totalReviews: 342,
    totalRatings: 2156,
    readingTime: "4.5 hours",
    completionRate: 78,
    popularChapters: [1, 3, 5, 7],
    dailyReaders: 342,
    weeklyReaders: 2134,
    monthlyReaders: 8765,
    engagement: {
      likes: 2341,
      shares: 876,
      comments: 543,
      bookmarks: 1234,
      views: 45678,
    },
    trending: {
      direction: "up",
      percentage: 23,
    },
    ratings: {
      5: 45,
      4: 30,
      3: 15,
      2: 7,
      1: 3,
    },
  };

  // Calculate rating distribution percentages
  const totalRatings = Object.values(analytics.ratings).reduce(
    (a, b) => a + b,
    0,
  );

  // Format number
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Get trend icon
  const getTrendIcon = (direction) => {
    switch (direction) {
      case "up":
        return <FaArrowUp className="text-emerald-500" />;
      case "down":
        return <FaArrowDown className="text-red-500" />;
      default:
        return <FaMinus className="text-gray-400" />;
    }
  };

  // Stat cards
  const statCards = [
    {
      id: "readers",
      icon: <FaUsers className="w-5 h-5" />,
      label: t("book.total_readers") || "Total Readers",
      value: formatNumber(analytics.totalReaders),
      color: "text-sky-500",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
    },
    {
      id: "rating",
      icon: <FaStar className="w-5 h-5" />,
      label: t("book.average_rating") || "Average Rating",
      value: analytics.averageRating.toFixed(1),
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      id: "reviews",
      icon: <FaComment className="w-5 h-5" />,
      label: t("book.total_reviews") || "Total Reviews",
      value: formatNumber(analytics.totalReviews),
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: "completion",
      icon: <FaBookOpen className="w-5 h-5" />,
      label: t("book.completion_rate") || "Completion Rate",
      value: `${analytics.completionRate}%`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  // Engagement metrics
  const engagementMetrics = [
    {
      icon: <FaHeart />,
      label: t("book.likes") || "Likes",
      value: formatNumber(analytics.engagement.likes),
    },
    {
      icon: <FaShare />,
      label: t("book.shares") || "Shares",
      value: formatNumber(analytics.engagement.shares),
    },
    {
      icon: <FaComment />,
      label: t("book.comments") || "Comments",
      value: formatNumber(analytics.engagement.comments),
    },
    {
      icon: <FaBookmark />,
      label: t("book.bookmarks") || "Bookmarks",
      value: formatNumber(analytics.engagement.bookmarks),
    },
    {
      icon: <FaEye />,
      label: t("book.views") || "Views",
      value: formatNumber(analytics.engagement.views),
    },
  ];

  // Reader trends
  const readerTrends = [
    {
      label: t("book.daily_readers") || "Daily Readers",
      value: formatNumber(analytics.dailyReaders),
    },
    {
      label: t("book.weekly_readers") || "Weekly Readers",
      value: formatNumber(analytics.weeklyReaders),
    },
    {
      label: t("book.monthly_readers") || "Monthly Readers",
      value: formatNumber(analytics.monthlyReaders),
    },
  ];

  return (
    <div className="book-analytics-container">
      {/* Header */}
      <div className="book-analytics-header">
        <div className="book-analytics-title-wrapper">
          <span className="book-analytics-icon">📊</span>
          <h3
            className={`
            book-analytics-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.analytics") || "Analytics"}
          </h3>
        </div>
        <div className="book-analytics-trend">
          {getTrendIcon(analytics.trending.direction)}
          <span
            className={`
            text-sm font-medium
            ${
              analytics.trending.direction === "up"
                ? "text-emerald-500"
                : analytics.trending.direction === "down"
                  ? "text-red-500"
                  : "text-gray-400"
            }
          `}
          >
            {analytics.trending.percentage}%
          </span>
          <span
            className={`
            text-xs
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            {t("book.this_month") || "this month"}
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="book-analytics-stats">
        {statCards.map((stat) => (
          <div
            key={stat.id}
            className={`
              book-analytics-stat-card
              ${stat.bgColor}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
              rounded-xl
              p-4
              transition-all duration-200 hover:shadow-md hover:scale-[1.02]
            `}
          >
            <div className="book-analytics-stat-icon">
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div className="book-analytics-stat-info">
              <span
                className={`
                book-analytics-stat-value
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                text-xl font-bold
              `}
              >
                {stat.value}
              </span>
              <span
                className={`
                book-analytics-stat-label
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                text-xs
              `}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div
        className={`
        book-analytics-ratings
        ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        p-4
      `}
      >
        <h4
          className={`
          book-analytics-subtitle
          ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          text-sm font-semibold mb-3
        `}
        >
          {t("book.rating_distribution") || "Rating Distribution"}
        </h4>
        <div className="book-analytics-rating-bars">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = analytics.ratings[star] || 0;
            const percentage =
              totalRatings > 0 ? (count / totalRatings) * 100 : 0;
            return (
              <div key={star} className="book-analytics-rating-bar">
                <span className="book-analytics-rating-bar-label">
                  {star} ★
                </span>
                <div className="book-analytics-rating-bar-track">
                  <div
                    className="book-analytics-rating-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="book-analytics-rating-bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reader Trends */}
      <div
        className={`
        book-analytics-trends
        ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        p-4
      `}
      >
        <h4
          className={`
          book-analytics-subtitle
          ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          text-sm font-semibold mb-3
        `}
        >
          {t("book.reader_trends") || "Reader Trends"}
        </h4>
        <div className="book-analytics-trends-grid">
          {readerTrends.map((trend, index) => (
            <div key={index} className="book-analytics-trend-item">
              <span
                className={`
                book-analytics-trend-value
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                text-lg font-bold
              `}
              >
                {trend.value}
              </span>
              <span
                className={`
                book-analytics-trend-label
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                text-xs
              `}
              >
                {trend.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Metrics */}
      <div
        className={`
        book-analytics-engagement
        ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl
        p-4
      `}
      >
        <h4
          className={`
          book-analytics-subtitle
          ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          text-sm font-semibold mb-3
        `}
        >
          {t("book.engagement_metrics") || "Engagement Metrics"}
        </h4>
        <div className="book-analytics-engagement-grid">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="book-analytics-engagement-item">
              <div className="book-analytics-engagement-icon">
                {metric.icon}
              </div>
              <div>
                <span
                  className={`
                  book-analytics-engagement-value
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  text-sm font-semibold
                `}
                >
                  {metric.value}
                </span>
                <span
                  className={`
                  book-analytics-engagement-label
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  text-xs block
                `}
                >
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Chapters */}
      {analytics.popularChapters && analytics.popularChapters.length > 0 && (
        <div
          className={`
          book-analytics-chapters
          ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          rounded-xl
          p-4
        `}
        >
          <h4
            className={`
            book-analytics-subtitle
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            text-sm font-semibold mb-3
          `}
          >
            {t("book.popular_chapters") || "Popular Chapters"}
          </h4>
          <div className="book-analytics-chapters-list">
            {analytics.popularChapters.map((chapter, index) => (
              <div
                key={index}
                className={`
                  book-analytics-chapter-item
                  ${theme.background?.section || "bg-white dark:bg-gray-900"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  rounded-lg
                  p-2
                  transition-all duration-200 hover:scale-[1.02]
                `}
              >
                <span
                  className={`
                  book-analytics-chapter-number
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  font-medium
                `}
                >
                  {t("book.chapter") || "Chapter"} {chapter}
                </span>
                <span
                  className={`
                  book-analytics-chapter-fire
                  text-amber-500
                `}
                >
                  <FaFire className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className={`
        book-analytics-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaChartBar
          className={`
          w-4 h-4
          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
        `}
        />
        <span
          className={`
          text-xs
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.analytics_footer") || "Data updated in real-time"}
        </span>
      </div>
    </div>
  );
};

export default BookAnalytics;
