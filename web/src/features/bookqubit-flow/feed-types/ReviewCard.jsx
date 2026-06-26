// src/features/bookqubit-flow/components/feed-types/ReviewCard.jsx

"use client";

import { useState } from "react";
import { FaUser, FaStar } from "react-icons/fa";
import FeedActions from "../common/FeedActions";

export default function ReviewCard({
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
        feed-item review-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm hover:shadow-lg"}
        transition-all duration-300 hover:-translate-y-1
      `}
    >
      <div className="review-header">
        <div className="review-avatar">
          <FaUser />
        </div>
        <div className="review-user-info">
          <h4 className="review-user">{item.user}</h4>
          <div className="review-rating">{renderStars(item.rating)}</div>
        </div>
        <span className="review-book">on "{item.book}"</span>
      </div>

      <p className="review-text">{item.text}</p>

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
  );
}
