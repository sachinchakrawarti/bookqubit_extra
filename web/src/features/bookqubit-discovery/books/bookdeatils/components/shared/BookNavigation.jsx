// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookNavigation.jsx

"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBook,
  FaSearch,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

const BookNavigation = ({
  currentLang,
  prevBook,
  nextBook,
  onPrev,
  onNext,
}) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const handleGoBack = () => {
    router.back();
  };

  return (
    <nav
      className={`
      book-navigation
      flex items-center justify-between
      flex-wrap gap-3
      mt-8 pt-4
      ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
    `}
    >
      {/* Left Section - Back */}
      <div className="book-navigation-left">
        <button
          onClick={handleGoBack}
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-lg
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>{t("book.go_back") || "Go Back"}</span>
        </button>
      </div>

      {/* Center Section - Home & Books */}
      <div className="book-navigation-center flex items-center gap-2">
        <Link
          href={`/${currentLang}/homepages`}
          className={`
            flex items-center gap-2
            px-3 py-2 rounded-lg
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <FaHome className="w-4 h-4" />
          <span className="hidden sm:inline">{t("nav.home") || "Home"}</span>
        </Link>

        <Link
          href={`/${currentLang}/books`}
          className={`
            flex items-center gap-2
            px-3 py-2 rounded-lg
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <FaBook className="w-4 h-4" />
          <span className="hidden sm:inline">{t("nav.books") || "Books"}</span>
        </Link>

        <Link
          href={`/${currentLang}/search`}
          className={`
            flex items-center gap-2
            px-3 py-2 rounded-lg
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <FaSearch className="w-4 h-4" />
          <span className="hidden sm:inline">
            {t("nav.search") || "Search"}
          </span>
        </Link>
      </div>

      {/* Right Section - Next/Prev Book */}
      <div className="book-navigation-right flex items-center gap-2">
        {prevBook && (
          <button
            onClick={onPrev}
            className={`
              flex items-center gap-2
              px-3 py-2 rounded-lg
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              transition-all duration-200 hover:scale-105
            `}
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t("book.prev") || "Prev"}</span>
          </button>
        )}

        {nextBook && (
          <button
            onClick={onNext}
            className={`
              flex items-center gap-2
              px-3 py-2 rounded-lg
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              transition-all duration-200 hover:scale-105
            `}
          >
            <span className="hidden sm:inline">{t("book.next") || "Next"}</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default BookNavigation;
