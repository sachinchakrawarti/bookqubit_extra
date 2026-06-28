// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookNotFound.jsx

"use client";

import React from "react";
import Link from "next/link";
import { FaBook, FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookNotFound.css";

const BookNotFound = ({
  slug,
  language = "en",
  onGoBack,
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

  // Suggested books
  const suggestedBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      slug: "the-great-gatsby",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      slug: "to-kill-a-mockingbird",
    },
    { title: "1984", author: "George Orwell", slug: "1984" },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      slug: "pride-and-prejudice",
    },
  ];

  // Handle go back
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  // Handle search
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    } else {
      // Navigate to search page
      window.location.href = `/${language}/search`;
    }
  };

  return (
    <div className="book-not-found-container">
      <div className="book-not-found-content">
        {/* Icon */}
        <div className="book-not-found-icon-wrapper">
          <div
            className={`
            book-not-found-icon
            ${theme.background?.bookCoverSide || "bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30"}
          `}
          >
            <FaBook className="w-16 h-16 text-sky-500 dark:text-sky-400" />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`
          book-not-found-title
          ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
        `}
        >
          {t("book.not_found") || "Book Not Found"}
        </h1>

        {/* Description */}
        <p
          className={`
          book-not-found-description
          ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
        `}
        >
          {t("book.not_found_description") ||
            "We couldn't find the book you're looking for."}
        </p>

        {/* Slug Info */}
        {slug && (
          <div
            className={`
            book-not-found-slug
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            <span className="font-mono text-sm">
              {t("book.searched_for") || "Searched for"}:{" "}
              <strong>{slug}</strong>
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="book-not-found-actions">
          <button
            onClick={handleGoBack}
            className={`
              book-not-found-btn book-not-found-btn-secondary
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            <FaArrowLeft className="w-4 h-4" />
            {t("book.go_back") || "Go Back"}
          </button>

          <button
            onClick={handleSearch}
            className={`
              book-not-found-btn book-not-found-btn-primary
              ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
              ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
              ${theme.shadow?.button || "shadow-md"}
              hover:scale-105
            `}
          >
            <FaSearch className="w-4 h-4" />
            {t("book.search_books") || "Search Books"}
          </button>

          <Link
            href={`/${language}/homepages`}
            className={`
              book-not-found-btn book-not-found-btn-secondary
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            <FaHome className="w-4 h-4" />
            {t("book.go_home") || "Go Home"}
          </Link>
        </div>

        {/* Suggested Books */}
        <div className="book-not-found-suggestions">
          <h3
            className={`
            text-sm font-medium mb-3
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            {t("book.suggested_books") || "You might also like:"}
          </h3>
          <div className="book-not-found-suggestions-grid">
            {suggestedBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/${language}/books/${book.slug}`}
                className={`
                  book-not-found-suggestion
                  ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-700"}
                  transition-all duration-200 hover:scale-105
                `}
              >
                <span className="font-medium text-sm text-gray-900 dark:text-white">
                  {book.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {book.author}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNotFound;
