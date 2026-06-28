"use client";

import React from "react";
import { FaPlus, FaCheck, FaBook } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

const LibraryButton = ({
  isInLibrary = false,
  onClick,
  className = "",
  size = "md", // 'sm', 'md', 'lg'
  showLabel = false,
  label = "Library",
  addLabel = "Add",
  inLibraryLabel = "In Library",
  disabled = false,
  ariaLabel = "Add to Library",
  iconOnly = true,
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  // Check if dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Size variants
  const sizeClasses = {
    sm: {
      button: "btn-library-sm",
      icon: "icon-sm",
      label: "label-sm",
    },
    md: {
      button: "btn-library-md",
      icon: "icon-md",
      label: "label-md",
    },
    lg: {
      button: "btn-library-lg",
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

  // Get label text
  const getLabelText = () => {
    if (isInLibrary) {
      return t("book.in_library") || inLibraryLabel;
    }
    return t("book.add_to_library") || addLabel;
  };

  // Get aria label
  const getAriaLabel = () => {
    if (isInLibrary) {
      return t("book.remove_from_library") || "Remove from Library";
    }
    return t("book.add_to_library") || ariaLabel;
  };

  return (
    <button
      className={`
        btn-library 
        ${selectedSize.button}
        ${isInLibrary ? "in-library" : ""}
        ${disabled ? "disabled" : ""}
        ${isDarkMode ? "dark" : ""}
        ${iconOnly ? "icon-only" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      aria-label={getAriaLabel()}
      style={{
        color: isInLibrary
          ? getDefaultColor()
          : isDarkMode
            ? "#9CA3AF"
            : "#6B7280",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = isInLibrary
            ? getHoverColor()
            : isDarkMode
              ? "#D1D5DB"
              : "#374151";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = isInLibrary
            ? getDefaultColor()
            : isDarkMode
              ? "#9CA3AF"
              : "#6B7280";
        }
      }}
    >
      {isInLibrary ? (
        <FaCheck className={`icon ${selectedSize.icon}`} />
      ) : (
        <FaPlus className={`icon ${selectedSize.icon}`} />
      )}
      {showLabel && !iconOnly && (
        <span className={`label ${selectedSize.label}`}>{getLabelText()}</span>
      )}
    </button>
  );
};

export default LibraryButton;
