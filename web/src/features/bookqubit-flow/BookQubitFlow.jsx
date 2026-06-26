// src/features/bookqubit-flow/components/BookQubitFlow.jsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import FeedHeader from "./common/FeedHeader";
import LoadingState from "./common/LoadingState";
import ErrorState from "./common/ErrorState";
import EndOfFeed from "./common/EndOfFeed";
import FeaturedCard from "./feed-types/FeaturedCard";
import TrendingCard from "./feed-types/TrendingCard";
import CommentCard from "./feed-types/CommentCard";
import NewsCard from "./feed-types/NewsCard";
import BlogCard from "./feed-types/BlogCard";
import ReviewCard from "./feed-types/ReviewCard";
import { useInfiniteFeed } from "./hooks/useInfiniteFeed";
import "./BookQubitFlow.css";

export default function BookQubitFlow() {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [activeFilter, setActiveFilter] = useState("all");

  const {
    items,
    loading,
    hasMore,
    error,
    loadMore,
    handleLike,
    handleShare,
    refresh,
  } = useInfiniteFeed();

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Font style
  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  // Filter items
  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.type === activeFilter);

  // Render feed item based on type
  const renderFeedItem = (item) => {
    const props = {
      key: item.id,
      item,
      onLike: handleLike,
      onShare: handleShare,
      theme,
      isDarkMode,
    };

    switch (item.type) {
      case "featured":
        return <FeaturedCard {...props} />;
      case "trending":
        return <TrendingCard {...props} />;
      case "comment":
        return <CommentCard {...props} />;
      case "news":
        return <NewsCard {...props} />;
      case "blog":
        return <BlogCard {...props} />;
      case "review":
        return <ReviewCard {...props} />;
      default:
        return null;
    }
  };

  return (
    <section
      className={`
        bookqubit-flow
        ${theme.background?.section || "bg-gray-50 dark:bg-gray-950"}
        ${theme.layout?.sectionPadding || "py-8 px-4 sm:px-6 lg:px-8"}
        min-h-screen
      `}
      style={fontStyle}
    >
      <div className={`${theme.layout?.containerWidth || "max-w-4xl"} mx-auto`}>
        {/* Header */}
        <FeedHeader
          title="📚 BookQubit Feed"
          subtitle="Discover featured books, trending stories, reviews, and more"
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onRefresh={refresh}
          theme={theme}
        />

        {/* Feed Items */}
        <div className="feed-container">
          {filteredItems.map((item) => renderFeedItem(item))}
        </div>

        {/* Loading & Error States */}
        {loading && <LoadingState theme={theme} />}

        {error && <ErrorState error={error} onRetry={loadMore} theme={theme} />}

        {/* Intersection Observer Target */}
        <div id="feed-loader" className="loader-observer" />

        {/* End of feed */}
        {!hasMore && filteredItems.length > 0 && <EndOfFeed theme={theme} />}

        {/* Empty state */}
        {!loading && filteredItems.length === 0 && !error && (
          <div
            className={`
              text-center py-20
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            `}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium mb-2">No items found</h3>
            <p>Try selecting a different filter</p>
          </div>
        )}
      </div>
    </section>
  );
}
