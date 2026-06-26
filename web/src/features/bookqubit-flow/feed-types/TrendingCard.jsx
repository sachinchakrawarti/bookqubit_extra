// src/features/bookqubit-flow/components/feed-types/TrendingCard.jsx

"use client";

import { useState } from "react";
import { FaRocket, FaUser, FaStar } from "react-icons/fa";
import FeedActions from "../common/FeedActions";

export default function TrendingCard({
  item,
  onLike,
  onShare,
  theme,
  isDarkMode,
}) {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);

  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    setLikeCount((prev) => (newState ? prev + 1 : prev - 1));
    onLike?.(item.id, newState);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < Math.floor(rating)
            ? "text-amber-400"
            : "text-gray-300 dark:text-gray-600"
        } w-3 h-3`}
      />
    ));
  };

  return (
    <div
      className={`
        feed-item trending-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm hover:shadow-lg"}
        transition-all duration-300 hover:-translate-y-1
      `}
    >
      <div className="trending-badge">
        <FaRocket className="text-rose-500" />
        <span>Trending #{item.trendScore}</span>
      </div>

      <div className="flex gap-4">
        <img
          src={item.image || "/api/placeholder/120/180"}
          alt={item.title}
          className="trending-image"
        />

        <div className="flex-1">
          <h3 className="trending-title">{item.title}</h3>
          <p className="trending-author">
            <FaUser className="inline mr-1" />
            {item.author}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="category-tag">{item.category}</span>
            <div className="flex items-center gap-1">
              {renderStars(item.rating)}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({item.rating})
              </span>
            </div>
          </div>

          <p className="trending-description">{item.description}</p>

          <FeedActions
            likeCount={likeCount}
            isLiked={isLiked}
            onLike={handleLike}
            commentCount={item.comments || 0}
            onShare={() => onShare?.(item.id)}
            timestamp={item.timestamp}
            theme={theme}
            extraBadge={`🔥 ${item.trendScore} points`}
          />
        </div>
      </div>
    </div>
  );
}
