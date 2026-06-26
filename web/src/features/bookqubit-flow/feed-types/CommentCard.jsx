// src/features/bookqubit-flow/components/feed-types/CommentCard.jsx

"use client";

import { useState } from "react";
import { FaUser, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import FeedActions from "../common/FeedActions";

export default function CommentCard({
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

  return (
    <div
      className={`
        feed-item comment-card
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-sm hover:shadow-lg"}
        transition-all duration-300 hover:-translate-y-1
      `}
    >
      <div className="comment-header">
        <div className="comment-avatar">
          <FaUser />
        </div>
        <div className="comment-user-info">
          <h4 className="comment-user">{item.user}</h4>
          <span className="comment-book">on "{item.bookTitle}"</span>
        </div>
      </div>

      <div className="comment-body">
        <FaQuoteLeft className="quote-icon text-gray-300 dark:text-gray-600" />
        <p className="comment-text">{item.text}</p>
        <FaQuoteRight className="quote-icon text-gray-300 dark:text-gray-600 ml-auto" />
      </div>

      <FeedActions
        likeCount={likeCount}
        isLiked={isLiked}
        onLike={handleLike}
        commentCount={item.replies || 0}
        commentLabel="replies"
        onShare={() => onShare?.(item.id)}
        timestamp={item.timestamp}
        theme={theme}
      />
    </div>
  );
}
