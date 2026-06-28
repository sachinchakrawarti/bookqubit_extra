// src/features/bookqubit-discovery/books/bookdeatils/components/sections/BookPublicationDetails.jsx

"use client";

import React, { useState } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaBook,
  FaHashtag,
  FaFileAlt,
  FaGlobe,
  FaLanguage,
  FaUsers,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookPublicationDetails.css";

const BookPublicationDetails = ({ book, theme: propTheme }) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!theme || !book) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Publication data
  const publicationData = {
    publisher: book.publisher || book.publication?.publisher || "N/A",
    publishedDate:
      book.publishedDate || book.publication?.date || book.published || "N/A",
    language: book.language || book.publication?.language || "N/A",
    isbn: book.isbn || book.publication?.isbn || "N/A",
    format: book.format || book.publication?.format || "N/A",
    pages: book.pageCount || book.pages || book.publication?.pages || "N/A",
    genre: book.genre || book.category || book.publication?.genre || "N/A",
    edition: book.edition || book.publication?.edition || "First Edition",
    country: book.country || book.publication?.country || "N/A",
    website: book.website || book.publication?.website || null,
  };

  // Check if we have any publication data
  const hasPublicationData = Object.values(publicationData).some(
    (value) => value !== "N/A" && value !== null && value !== undefined,
  );

  if (!hasPublicationData) {
    return (
      <div
        className={`
        book-publication-empty
        ${theme.background?.section || "bg-white dark:bg-gray-900"}
        ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
        rounded-xl p-6 text-center
      `}
      >
        <FaInfoCircle className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
        <p
          className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {t("book.no_publication_info") ||
            "No publication information available."}
        </p>
      </div>
    );
  }

  // Format date
  const formatDate = (date) => {
    if (!date || date === "N/A") return "N/A";
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Copy ISBN to clipboard
  const handleCopyISBN = () => {
    if (publicationData.isbn && publicationData.isbn !== "N/A") {
      navigator.clipboard.writeText(publicationData.isbn);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Toggle expand
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Publication fields with icons
  const fields = [
    {
      id: "publisher",
      icon: <FaBuilding className="field-icon" />,
      label: t("book.publisher") || "Publisher",
      value: publicationData.publisher,
      color: "text-sky-500",
    },
    {
      id: "publishedDate",
      icon: <FaCalendarAlt className="field-icon" />,
      label: t("book.published_date") || "Published Date",
      value: formatDate(publicationData.publishedDate),
      color: "text-amber-500",
    },
    {
      id: "language",
      icon: <FaLanguage className="field-icon" />,
      label: t("book.language") || "Language",
      value: publicationData.language,
      color: "text-emerald-500",
    },
    {
      id: "isbn",
      icon: <FaHashtag className="field-icon" />,
      label: t("book.isbn") || "ISBN",
      value: publicationData.isbn,
      color: "text-purple-500",
      copyable: true,
    },
    {
      id: "format",
      icon: <FaFileAlt className="field-icon" />,
      label: t("book.format") || "Format",
      value: publicationData.format,
      color: "text-rose-500",
    },
    {
      id: "pages",
      icon: <FaBook className="field-icon" />,
      label: t("book.pages") || "Pages",
      value: publicationData.pages,
      color: "text-indigo-500",
    },
    {
      id: "genre",
      icon: <FaBook className="field-icon" />,
      label: t("book.genre") || "Genre",
      value: publicationData.genre,
      color: "text-pink-500",
    },
    {
      id: "edition",
      icon: <FaCopy className="field-icon" />,
      label: t("book.edition") || "Edition",
      value: publicationData.edition,
      color: "text-teal-500",
    },
    {
      id: "country",
      icon: <FaGlobe className="field-icon" />,
      label: t("book.country") || "Country",
      value: publicationData.country,
      color: "text-orange-500",
    },
  ];

  // Filter out fields with "N/A" value
  const visibleFields = fields.filter(
    (field) =>
      field.value !== "N/A" &&
      field.value !== null &&
      field.value !== undefined,
  );
  const displayFields = expanded ? visibleFields : visibleFields.slice(0, 6);
  const hasMore = visibleFields.length > 6;

  return (
    <div className="book-publication-container">
      {/* Header */}
      <div className="book-publication-header">
        <div className="book-publication-title-wrapper">
          <span className="book-publication-icon">ℹ️</span>
          <h3
            className={`
            book-publication-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            {t("book.publication_details") || "Publication Details"}
          </h3>
        </div>
        <span
          className={`
          book-publication-count
          ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
        `}
        >
          {visibleFields.length} {t("book.details") || "details"}
        </span>
      </div>

      {/* Publication Grid */}
      <div className="book-publication-grid">
        {displayFields.map((field) => (
          <div
            key={field.id}
            className={`
              book-publication-field
              ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800/50"}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
              rounded-xl
              p-3
              transition-all duration-200
              hover:shadow-md
              hover:scale-[1.02]
            `}
          >
            <div className="book-publication-field-content">
              <div className="book-publication-field-icon">
                <span className={field.color}>{field.icon}</span>
              </div>
              <div className="book-publication-field-info">
                <span
                  className={`
                  book-publication-field-label
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  {field.label}
                </span>
                <div className="book-publication-field-value-wrapper">
                  <span
                    className={`
                    book-publication-field-value
                    ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  `}
                  >
                    {field.value}
                  </span>
                  {field.copyable && field.value !== "N/A" && (
                    <button
                      onClick={handleCopyISBN}
                      className={`
                        book-publication-field-copy
                        transition-all duration-200 hover:scale-110
                        ${copied ? "text-emerald-500" : "text-gray-400 hover:text-gray-600"}
                      `}
                      aria-label={t("book.copy_isbn") || "Copy ISBN"}
                    >
                      {copied ? (
                        <FaCheck className="w-3.5 h-3.5" />
                      ) : (
                        <FaCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <button
          onClick={toggleExpand}
          className={`
            book-publication-toggle
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            transition-all duration-200 hover:scale-105
          `}
        >
          <span>
            {expanded
              ? t("book.show_less") || "Show Less"
              : t("book.show_more") ||
                `Show All (${visibleFields.length - 6} more)`}
          </span>
          {expanded ? (
            <FaChevronUp className="w-3 h-3" />
          ) : (
            <FaChevronDown className="w-3 h-3" />
          )}
        </button>
      )}

      {/* Website Link */}
      {publicationData.website && (
        <div
          className={`
          book-publication-website
          ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
        `}
        >
          <a
            href={publicationData.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2
              text-sm
              ${theme.textColors?.highlight || "text-sky-600 dark:text-sky-400"}
              hover:underline
              transition-colors duration-200
            `}
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            {t("book.visit_publisher") || "Visit Publisher Website"}
          </a>
        </div>
      )}

      {/* Footer */}
      <div
        className={`
        book-publication-footer
        ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
      `}
      >
        <FaUsers
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
          {t("book.publication_footer") ||
            "Publication information for reference"}
        </span>
      </div>
    </div>
  );
};

export default BookPublicationDetails;
