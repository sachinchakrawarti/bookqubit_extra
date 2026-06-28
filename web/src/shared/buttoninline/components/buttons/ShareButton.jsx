"use client";

import React, { useState, useEffect } from "react";
import { FaShare, FaCheck, FaCopy } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

const ShareButton = ({
  onClick,
  className = "",
  size = "md", // 'sm', 'md', 'lg'
  showTooltip = false,
  tooltipText = "Link copied!",
  tooltipDuration = 2000,
  disabled = false,
  ariaLabel = "Share",
  shareData = null,
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);
  const [showLocalTooltip, setShowLocalTooltip] = useState(false);

  // Check if dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Size variants
  const sizeClasses = {
    sm: {
      button: "btn-share-sm",
      icon: "icon-sm",
    },
    md: {
      button: "btn-share-md",
      icon: "icon-md",
    },
    lg: {
      button: "btn-share-lg",
      icon: "icon-lg",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  // Handle tooltip visibility
  useEffect(() => {
    if (showLocalTooltip) {
      const timer = setTimeout(() => {
        setShowLocalTooltip(false);
      }, tooltipDuration);
      return () => clearTimeout(timer);
    }
  }, [showLocalTooltip, tooltipDuration]);

  // Handle share click
  const handleClick = async (e) => {
    if (disabled) return;

    // If custom onClick provided, use it
    if (onClick) {
      await onClick(e);
      return;
    }

    // Default share behavior
    try {
      if (navigator.share && shareData) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const url = shareData?.url || window.location.href;
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setShowLocalTooltip(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  // Get color
  const getColor = () => {
    return isDarkMode ? "#9CA3AF" : "#6B7280";
  };

  // Tooltip text
  const displayTooltip = showTooltip || showLocalTooltip;
  const displayTooltipText = isCopied
    ? t("book.link_copied") || "Link copied!"
    : tooltipText;

  return (
    <button
      className={`
        btn-share 
        ${selectedSize.button}
        ${disabled ? "disabled" : ""}
        ${isDarkMode ? "dark" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        color: getColor(),
      }}
    >
      {isCopied ? (
        <FaCheck className={`icon ${selectedSize.icon}`} />
      ) : (
        <FaShare className={`icon ${selectedSize.icon}`} />
      )}

      {displayTooltip && (
        <span className={`tooltip ${isDarkMode ? "dark" : ""}`}>
          {displayTooltipText}
        </span>
      )}
    </button>
  );
};

export default ShareButton;
