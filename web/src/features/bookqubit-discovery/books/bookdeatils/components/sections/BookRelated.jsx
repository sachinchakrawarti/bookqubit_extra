// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookRelated.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBook,
  FaStar,
  FaUser,
  FaHeart,
  FaBookmark,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaClock,
  FaTag,
  FaArrowRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookRelated.css";

const BookRelated = ({
  book,
  relatedBooks = [],
  theme: propTheme,
  onBookClick,
  currentLang = "en",
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredBook, setHoveredBook] = useState(null);

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // If no related books, show a message
  if (!relatedBooks || relatedBooks.length === 0) {
    return (
      <div
        className={`
        book-related-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaBook className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_related") || "No related books found."}
        </p>
      </div>
    );
  }

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${
          i < Math.floor(rating || 0)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-300 dark:text-gray-600"
        } w-3 h-3`}
      />
    ));
  };

  // Handle scroll
  const scroll = (direction) => {
    const container = document.getElementById("related-books-scroll");
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Handle book click
  const handleBookClick = (book) => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Fiction:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Non-Fiction":
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Science Fiction":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Fantasy:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      Mystery:
        "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
      Romance:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      Thriller: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    );
  };

  return (
    <div className="book-related-container">
      {/* Header */}
      <div className="book-related-header">
        <div className="book-related-title-wrapper">
          <span className="book-related-icon">📚</span>
          <h3
            className={`
            book-related-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.related_books") || "Related Books"}
          </h3>
          <span
            className={`
            book-related-count
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
          `}
          >
            {relatedBooks.length}
          </span>
        </div>
        <Link
          href={`/${currentLang}/books`}
          className={`
            book-related-view-all
            ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
            hover:underline
            transition-all duration-200
          `}
        >
          {t("book.view_all") || "View All"}{" "}
          <FaArrowRight className="w-3 h-3 inline" />
        </Link>
      </div>

      {/* Scrollable Books */}
      <div className="book-related-scroll-wrapper">
        {/* Left Arrow */}
        {relatedBooks.length > 3 && (
          <button
            onClick={() => scroll("left")}
            className={`
              book-related-scroll-btn book-related-scroll-btn-left
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.container || "shadow-md"}
              hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
              transition-all duration-200 hover:scale-110
            `}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Books Container */}
        <div
          id="related-books-scroll"
          className="book-related-scroll"
          style={{
            scrollBehavior: "smooth",
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            gap: "1rem",
            padding: "0.5rem 0.25rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {relatedBooks.map((relatedBook) => {
            const isHovered = hoveredBook === relatedBook.id;

            return (
              <div
                key={relatedBook.id}
                className="book-related-item-wrapper"
                onMouseEnter={() => setHoveredBook(relatedBook.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <Link
                  href={`/${currentLang}/books/${relatedBook.slug}`}
                  onClick={() => handleBookClick(relatedBook)}
                  className={`
                    book-related-item
                    ${theme.background?.section || "bg-white dark:bg-gray-900"}
                    ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                    rounded-xl
                    overflow-hidden
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-2
                    ${isHovered ? "shadow-xl -translate-y-2" : ""}
                  `}
                >
                  {/* Book Image */}
                  <div className="book-related-item-image">
                    <img
                      src={relatedBook.imageUrl || "/api/placeholder/120/180"}
                      alt={relatedBook.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div
                      className={`
                      book-related-item-overlay
                      ${isHovered ? "opacity-100" : "opacity-0"}
                      transition-opacity duration-300
                    `}
                    >
                      <span className="book-related-item-overlay-text">
                        {t("book.view_details") || "View Details"}
                      </span>
                    </div>

                    {/* Category Badge */}
                    {relatedBook.category && (
                      <span
                        className={`
                        book-related-item-category
                        ${getCategoryColor(relatedBook.category)}
                        px-2 py-0.5 rounded-full text-xs font-medium
                      `}
                      >
                        {relatedBook.category}
                      </span>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="book-related-item-info">
                    <h4
                      className={`
                      book-related-item-title
                      ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                      text-sm font-semibold
                      truncate
                    `}
                    >
                      {relatedBook.title}
                    </h4>

                    <p
                      className={`
                      book-related-item-author
                      ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      text-xs
                      truncate
                    `}
                    >
                      <FaUser className="w-3 h-3 inline mr-1" />
                      {relatedBook.author}
                    </p>

                    <div className="book-related-item-rating">
                      <div className="flex items-center">
                        {renderStars(relatedBook.rating)}
                        <span
                          className={`
                          text-xs ml-1
                          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                        `}
                        >
                          ({relatedBook.rating?.toFixed(1) || "0"})
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="book-related-item-actions">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Add to wishlist:", relatedBook.title);
                        }}
                        className={`
                          book-related-item-action
                          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                          hover:text-rose-500
                          transition-colors duration-200
                        `}
                      >
                        <FaHeart className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Save:", relatedBook.title);
                        }}
                        className={`
                          book-related-item-action
                          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                          hover:text-sky-500
                          transition-colors duration-200
                        `}
                      >
                        <FaBookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Share:", relatedBook.title);
                        }}
                        className={`
                          book-related-item-action
                          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                          hover:text-emerald-500
                          transition-colors duration-200
                        `}
                      >
                        <FaShare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        {relatedBooks.length > 3 && (
          <button
            onClick={() => scroll("right")}
            className={`
              book-related-scroll-btn book-related-scroll-btn-right
              ${theme.background?.section || "bg-white dark:bg-gray-900"}
              ${theme.shadow?.container || "shadow-md"}
              hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
              transition-all duration-200 hover:scale-110
            `}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div
        className={`
        book-related-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaFire
          className={`
          w-4 h-4
          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
        `}
        />
        <span
          className={`
          text-xs
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.related_footer") || "Discover more books you might enjoy"}
        </span>
      </div>
    </div>
  );
};

export default BookRelated;
