"use client";

import React from "react";
import { FaTimes, FaArrowLeft, FaBook } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const SheetHeader = ({
  title = "Book Details",
  subtitle = "",
  icon = null,
  onClose,
  showBackButton = false,
  onBack,
  isMobile = false,
  isDarkMode = false,
  className = "",
  children,
}) => {
  const { theme } = useTheme();

  // Get colors
  const getTextColor = () =>
    theme.textColors?.primary || (isDarkMode ? "#F9FAFB" : "#111827");
  const getSecondaryTextColor = () =>
    theme.textColors?.secondary || (isDarkMode ? "#9CA3AF" : "#6B7280");

  return (
    <div className={`sheet-header ${isDarkMode ? "dark" : ""} ${className}`}>
      {/* Header Top Row */}
      <div className="sheet-header-top">
        <div className="sheet-header-left">
          {showBackButton && (
            <button
              className={`header-btn header-back-btn ${isDarkMode ? "dark" : ""}`}
              onClick={onBack}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>

        <div className="sheet-header-right">
          <button
            className={`header-btn header-close-btn ${isDarkMode ? "dark" : ""}`}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Header Content */}
      <div className="sheet-header-content">
        {icon && <div className="header-icon-wrapper">{icon}</div>}

        <div className="header-text">
          <h2 className={`header-title ${isDarkMode ? "dark" : ""}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`header-subtitle ${isDarkMode ? "dark" : ""}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Custom Children */}
      {children && <div className="sheet-header-children">{children}</div>}
    </div>
  );
};

export default SheetHeader;
