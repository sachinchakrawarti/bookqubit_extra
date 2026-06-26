// src/features/bookqubit-flow/components/common/FeedActions.jsx

"use client";

import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

export default function FeedActions({
  likeCount,
  isLiked,
  onLike,
  commentCount,
  commentLabel = "comments",
  onShare,
  timestamp,
  theme,
  extraBadge,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="feed-actions">
      <button onClick={onLike} className="action-btn">
        <FaHeart className={isLiked ? "text-rose-500" : ""} />
        <span>{likeCount}</span>
      </button>

      <button className="action-btn">
        <FaRegComment />
        <span>
          {commentCount} {commentLabel}
        </span>
      </button>

      <button onClick={onShare} className="action-btn">
        <FaShare />
        <span>Share</span>
      </button>

      {extraBadge && (
        <span className="extra-badge text-xs text-rose-500 font-medium">
          {extraBadge}
        </span>
      )}

      {timestamp && (
        <span
          className={`
            time-stamp text-xs
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
        >
          {formatDate(timestamp)}
        </span>
      )}
    </div>
  );
}
