"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const LikeButton = ({
  isLiked = false,
  likeCount = 0,
  onClick,
  className = "",
  size = "md", // 'sm', 'md', 'lg'
  showCount = true,
  disabled = false,
  ariaLabel = "Like",
}) => {
  const { theme, themeName } = useTheme();

  // Check if dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Size variants
  const sizeClasses = {
    sm: {
      button: "btn-like-sm",
      icon: "icon-sm",
      count: "count-sm",
    },
    md: {
      button: "btn-like-md",
      icon: "icon-md",
      count: "count-md",
    },
    lg: {
      button: "btn-like-lg",
      icon: "icon-lg",
      count: "count-lg",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  // Handle click
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  // Get like color
  const getLikeColor = () => {
    if (isLiked) {
      return theme.iconColors?.like || "#EF4444";
    }
    return isDarkMode ? "#9CA3AF" : "#6B7280";
  };

  // Format count
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  return (
    <button
      className={`
        btn-like 
        ${selectedSize.button}
        ${isLiked ? "liked" : ""}
        ${disabled ? "disabled" : ""}
        ${isDarkMode ? "dark" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        color: getLikeColor(),
      }}
    >
      {isLiked ? (
        <FaHeart className={`icon ${selectedSize.icon}`} />
      ) : (
        <FaRegHeart className={`icon ${selectedSize.icon}`} />
      )}
      {showCount && likeCount > 0 && (
        <span className={`count ${selectedSize.count}`}>
          {formatCount(likeCount)}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
