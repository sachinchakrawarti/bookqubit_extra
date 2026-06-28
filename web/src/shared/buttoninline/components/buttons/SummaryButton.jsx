"use client";

import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const SummaryButton = ({
  onClick,
  className = "",
  size = "md", // 'sm', 'md', 'lg'
  label = "Summary",
  showLabel = true,
  disabled = false,
  ariaLabel = "View Summary",
  iconOnly = false,
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
      button: "btn-summary-sm",
      icon: "icon-sm",
      label: "label-sm",
    },
    md: {
      button: "btn-summary-md",
      icon: "icon-md",
      label: "label-md",
    },
    lg: {
      button: "btn-summary-lg",
      icon: "icon-lg",
      label: "label-lg",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  // Handle click
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  // Get colors
  const getDefaultColor = () => {
    return isDarkMode ? "#818CF8" : "#6366F1";
  };

  const getHoverColor = () => {
    return isDarkMode ? "#A5B4FC" : "#4F46E5";
  };

  return (
    <button
      className={`
        btn-summary 
        ${selectedSize.button}
        ${disabled ? "disabled" : ""}
        ${isDarkMode ? "dark" : ""}
        ${iconOnly ? "icon-only" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        color: getDefaultColor(),
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = getHoverColor();
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = getDefaultColor();
        }
      }}
    >
      <FaFileAlt className={`icon ${selectedSize.icon}`} />
      {showLabel && !iconOnly && (
        <span className={`label ${selectedSize.label}`}>{label}</span>
      )}
    </button>
  );
};

export default SummaryButton;
