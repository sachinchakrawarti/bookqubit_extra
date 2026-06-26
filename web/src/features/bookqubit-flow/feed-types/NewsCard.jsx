// src/features/bookqubit-flow/components/feed-types/NewsCard.jsx

"use client";

import { useState } from "react";
import { FaNewspaper, FaUser } from "react-icons/fa";
import FeedActions from "../common/FeedActions";

export default function NewsCard({ item, onLike, onShare, theme, isDarkMode }) {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);

  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    setLikeCount((prev) => (newState ? prev + 1 : prev - 1));
    onLike?.(item.id, newState);
  };

  return (
    <div
      className={`
        feed-item news-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm hover:shadow-lg"}
        transition-all duration-300 hover:-translate-y-1
      `}
    >
      <div className="news-badge">
        <FaNewspaper className="text-sky-500" />
        <span>News</span>
      </div>

      <div className="news-content">
        <h3 className="news-title">{item.title}</h3>
        <div className="news-meta">
          <span className="news-source">{item.source}</span>
          <span className="news-time">{item.time}</span>
        </div>
        <p className="news-excerpt">{item.excerpt}</p>

        <FeedActions
          likeCount={likeCount}
          isLiked={isLiked}
          onLike={handleLike}
          commentCount={item.comments || 0}
          onShare={() => onShare?.(item.id)}
          timestamp={item.timestamp}
          theme={theme}
        />
      </div>
    </div>
  );
}
