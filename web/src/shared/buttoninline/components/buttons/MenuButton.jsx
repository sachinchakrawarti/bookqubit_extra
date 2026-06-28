"use client";

import React from "react";
import { RiMenuAddLine } from "react-icons/ri";
import { useTheme } from "@/themes/useTheme";

const MenuButton = ({
  onClick,
  className = "",
  size = "md", // 'sm', 'md', 'lg'
  label = "More",
  showLabel = false,
  disabled = false,
  ariaLabel = "More options",
  iconOnly = true,
  isActive = false,
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
      button: "btn-menu-sm",
      icon: "icon-sm",
      label: "label-sm",
    },
    md: {
      button: "btn-menu-md",
      icon: "icon-md",
      label: "label-md",
    },
    lg: {
      button: "btn-menu-lg",
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
    if (isActive) {
      return isDarkMode ? "#818CF8" : "#6366F1";
    }
    return isDarkMode ? "#9CA3AF" : "#6B7280";
  };

  const getHoverColor = () => {
    if (isActive) {
      return isDarkMode ? "#A5B4FC" : "#4F46E5";
    }
    return isDarkMode ? "#D1D5DB" : "#374151";
  };

  return (
    <button
      className={`
        btn-menu 
        ${selectedSize.button}
        ${isActive ? "active" : ""}
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
      <RiMenuAddLine className={`icon ${selectedSize.icon}`} />
      {showLabel && !iconOnly && (
        <span className={`label ${selectedSize.label}`}>{label}</span>
      )}
    </button>
  );
};

export default MenuButton;
