// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookError.jsx

"use client";

import React from "react";
import {
  FaExclamationTriangle,
  FaSync,
  FaHome,
  FaSearch,
  FaBug,
  FaWifi,
  FaServer,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookError.css";

const BookError = ({
  error,
  type = "general", // "general" | "network" | "server" | "not_found"
  onRetry,
  onGoHome,
  onSearch,
  theme: propTheme,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Error configurations
  const errorConfigs = {
    general: {
      icon: <FaExclamationTriangle className="w-12 h-12" />,
      title: t("error.general_title") || "Something went wrong",
      description:
        t("error.general_description") ||
        "We encountered an unexpected error. Please try again.",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
    network: {
      icon: <FaWifi className="w-12 h-12" />,
      title: t("error.network_title") || "Network Error",
      description:
        t("error.network_description") ||
        "Unable to connect to the server. Please check your internet connection.",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
    },
    server: {
      icon: <FaServer className="w-12 h-12" />,
      title: t("error.server_title") || "Server Error",
      description:
        t("error.server_description") ||
        "The server is currently unavailable. Please try again later.",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
    },
    not_found: {
      icon: <FaBug className="w-12 h-12" />,
      title: t("error.not_found_title") || "Page Not Found",
      description:
        t("error.not_found_description") ||
        "The page you're looking for doesn't exist or has been moved.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
  };

  // Get error config based on type
  const config = errorConfigs[type] || errorConfigs.general;

  // Get error message
  const errorMessage = error?.message || error?.toString() || null;

  return (
    <div className="book-error-container">
      <div
        className={`
        book-error-content
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        ${theme.shadow?.container || "shadow-lg"}
      `}
      >
        {/* Icon */}
        <div
          className={`
          book-error-icon-wrapper
          ${config.bgColor}
          ${config.borderColor}
          border-2
        `}
        >
          <span className={config.color}>{config.icon}</span>
        </div>

        {/* Title */}
        <h2
          className={`
          book-error-title
          ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
        `}
        >
          {config.title}
        </h2>

        {/* Description */}
        <p
          className={`
          book-error-description
          ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
        `}
        >
          {config.description}
        </p>

        {/* Error Details */}
        {errorMessage && (
          <div
            className={`
            book-error-details
            ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          `}
          >
            <span
              className={`
              text-xs font-mono
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            `}
            >
              {errorMessage}
            </span>
          </div>
        )}

        {/* Error Code */}
        {error?.code && (
          <div
            className={`
            book-error-code
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            <span className="text-xs font-mono">
              {t("error.code") || "Error Code"}: {error.code}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="book-error-actions">
          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className={`
                book-error-btn book-error-btn-primary
                ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                ${theme.shadow?.button || "shadow-md"}
                hover:scale-105
              `}
            >
              <FaSync className="w-4 h-4" />
              {t("error.retry") || "Try Again"}
            </button>
          )}

          {/* Go Home Button */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className={`
                book-error-btn book-error-btn-secondary
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
                hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
            >
              <FaHome className="w-4 h-4" />
              {t("error.go_home") || "Go Home"}
            </button>
          )}

          {/* Search Button */}
          {onSearch && (
            <button
              onClick={onSearch}
              className={`
                book-error-btn book-error-btn-secondary
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
                hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
            >
              <FaSearch className="w-4 h-4" />
              {t("error.search") || "Search"}
            </button>
          )}
        </div>

        {/* Help Text */}
        <p
          className={`
          book-error-help
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("error.help_text") ||
            "If the problem persists, please contact support."}
        </p>
      </div>
    </div>
  );
};

export default BookError;
