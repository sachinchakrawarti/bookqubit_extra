// src/features/bookqubit-flow/components/feed-types/BlogCard.jsx

"use client";

import { useState } from "react";
import { FaBlog, FaUser, FaClock } from "react-icons/fa";
import FeedActions from "../common/FeedActions";

export default function BlogCard({ item, onLike, onShare, theme, isDarkMode }) {
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
        feed-item blog-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm hover:shadow-lg"}
        transition-all duration-300 hover:-translate-y-1
      `}
    >
      <div className="blog-badge">
        <FaBlog className="text-purple-500" />
        <span>Blog</span>
      </div>

      <div className="blog-content">
        <h3 className="blog-title">{item.title}</h3>
        <div className="blog-meta">
          <span className="blog-author">
            <FaUser className="inline mr-1" />
            {item.author}
          </span>
          <span className="blog-read-time">
            <FaClock className="inline mr-1" />
            {item.readTime}
          </span>
        </div>
        <p className="blog-excerpt">{item.excerpt}</p>

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
