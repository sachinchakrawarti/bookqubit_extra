// src/features/bookqubit-discovery/books/bookdeatils/components/modals/BookReportModal.jsx

"use client";

import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaFlag,
  FaCheck,
  FaExclamationTriangle,
  FaUser,
  FaBook,
  FaComment,
  FaLink,
  FaUpload,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookReportModal.css";

const BookReportModal = ({
  isOpen,
  onClose,
  book,
  theme: propTheme,
  onSubmit,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Handle animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setSelectedReason("");
      setDescription("");
      setEmail("");
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  // Report reasons
  const reportReasons = [
    {
      id: "inappropriate",
      label: t("book.report_inappropriate") || "Inappropriate Content",
      icon: <FaExclamationTriangle className="w-4 h-4" />,
      description:
        t("book.report_inappropriate_desc") ||
        "Content that is offensive, abusive, or inappropriate",
    },
    {
      id: "spam",
      label: t("book.report_spam") || "Spam or Scam",
      icon: <FaFlag className="w-4 h-4" />,
      description:
        t("book.report_spam_desc") ||
        "Content that is spam, misleading, or fraudulent",
    },
    {
      id: "copyright",
      label: t("book.report_copyright") || "Copyright Infringement",
      icon: <FaBook className="w-4 h-4" />,
      description:
        t("book.report_copyright_desc") ||
        "Content that violates copyright or intellectual property",
    },
    {
      id: "wrong_info",
      label: t("book.report_wrong_info") || "Wrong Information",
      icon: <FaLink className="w-4 h-4" />,
      description:
        t("book.report_wrong_info_desc") ||
        "Content with incorrect or misleading information",
    },
    {
      id: "other",
      label: t("book.report_other") || "Other",
      icon: <FaComment className="w-4 h-4" />,
      description:
        t("book.report_other_desc") || "Other reasons not listed above",
    },
  ];

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!selectedReason)
      newErrors.reason =
        t("book.report_select_reason") || "Please select a reason";
    if (!description.trim())
      newErrors.description =
        t("book.report_enter_description") || "Please describe the issue";
    if (description.trim().length < 10)
      newErrors.description =
        t("book.report_description_length") ||
        "Please provide more detail (minimum 10 characters)";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email =
        t("book.report_invalid_email") || "Please enter a valid email address";
    }
    return newErrors;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSubmit) {
        await onSubmit({
          reason: selectedReason,
          description,
          email: email || undefined,
          bookId: book?.id,
          bookTitle: book?.title,
        });
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Report submission failed:", err);
      setErrors({ submit: err.message || "Failed to submit report" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="book-report-modal-backdrop" onClick={onClose} />
      )}

      {/* Modal */}
      <div
        className={`
          book-report-modal
          ${isOpen ? "open" : ""}
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          shadow-2xl
        `}
      >
        {/* Header */}
        <div className="book-report-modal-header">
          <h3
            className={`
            book-report-modal-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            <FaFlag className="w-5 h-5 text-red-500" />
            {t("book.report_book") || "Report Book"}
          </h3>
          <button
            onClick={onClose}
            className={`
              book-report-modal-close
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          // Success State
          <div className="book-report-modal-success">
            <div className="book-report-modal-success-icon">
              <FaCheck className="w-12 h-12 text-emerald-500" />
            </div>
            <h4
              className={`
              book-report-modal-success-title
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              text-xl font-semibold
            `}
            >
              {t("book.report_submitted") || "Report Submitted"}
            </h4>
            <p
              className={`
              book-report-modal-success-message
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            `}
            >
              {t("book.report_thanks") ||
                "Thank you for your report. We will review it and take appropriate action."}
            </p>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="book-report-modal-form">
            {/* Book Info */}
            {book && (
              <div className="book-report-modal-book">
                <div className="book-report-modal-book-image">
                  <img
                    src={book.imageUrl || "/api/placeholder/40/50"}
                    alt={book.title}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <div className="book-report-modal-book-info">
                  <h4
                    className={`
                    book-report-modal-book-title
                    ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                    font-medium
                  `}
                  >
                    {book.title}
                  </h4>
                  <p
                    className={`
                    book-report-modal-book-author
                    ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    text-sm
                  `}
                  >
                    {book.author}
                  </p>
                </div>
              </div>
            )}

            {/* Reason */}
            <div className="book-report-modal-field">
              <label
                className={`
                book-report-modal-label
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                font-medium
              `}
              >
                {t("book.report_reason") || "Reason for Reporting"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="book-report-modal-reasons">
                {reportReasons.map((reason) => (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => {
                      setSelectedReason(reason.id);
                      setErrors({ ...errors, reason: undefined });
                    }}
                    className={`
                      book-report-modal-reason
                      ${selectedReason === reason.id ? "active" : ""}
                      ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                      ${
                        selectedReason === reason.id
                          ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                          : ""
                      }
                      transition-all duration-200
                    `}
                  >
                    <span
                      className={
                        selectedReason === reason.id ? "text-sky-500" : ""
                      }
                    >
                      {reason.icon}
                    </span>
                    <div className="book-report-modal-reason-content">
                      <span className="font-medium text-sm">
                        {reason.label}
                      </span>
                      <span
                        className={`
                        text-xs
                        ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      `}
                      >
                        {reason.description}
                      </span>
                    </div>
                    {selectedReason === reason.id && (
                      <FaCheck className="w-4 h-4 text-sky-500" />
                    )}
                  </button>
                ))}
              </div>
              {errors.reason && (
                <p className="book-report-modal-error">{errors.reason}</p>
              )}
            </div>

            {/* Description */}
            <div className="book-report-modal-field">
              <label
                className={`
                book-report-modal-label
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                font-medium
              `}
              >
                {t("book.report_description") || "Description"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: undefined });
                }}
                placeholder={
                  t("book.report_description_placeholder") ||
                  "Please describe the issue in detail..."
                }
                className={`
                  book-report-modal-textarea
                  ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  focus:ring-2 focus:ring-sky-500
                  ${errors.description ? "border-red-500" : ""}
                `}
                rows="4"
              />
              {errors.description && (
                <p className="book-report-modal-error">{errors.description}</p>
              )}
            </div>

            {/* Email */}
            <div className="book-report-modal-field">
              <label
                className={`
                book-report-modal-label
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                font-medium
              `}
              >
                {t("book.report_email") || "Email (Optional)"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                }}
                placeholder={
                  t("book.report_email_placeholder") ||
                  "Enter your email for follow-up"
                }
                className={`
                  book-report-modal-input
                  ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                  ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  focus:ring-2 focus:ring-sky-500
                  ${errors.email ? "border-red-500" : ""}
                `}
              />
              {errors.email && (
                <p className="book-report-modal-error">{errors.email}</p>
              )}
            </div>

            {/* Attachments */}
            <div className="book-report-modal-field">
              <label
                className={`
                book-report-modal-label
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                font-medium
              `}
              >
                {t("book.report_attachments") || "Attachments (Optional)"}
              </label>
              <div
                className={`
                book-report-modal-attachment
                ${theme.border?.default || "border-2 border-dashed border-gray-300 dark:border-gray-700"}
              `}
              >
                <FaUpload className="w-8 h-8 text-gray-400" />
                <p
                  className={`
                  text-sm
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                `}
                >
                  {t("book.report_attachment_placeholder") ||
                    "Drag and drop files or click to upload"}
                </p>
                <input
                  type="file"
                  multiple
                  className="book-report-modal-attachment-input"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="book-report-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className={`
                  book-report-modal-cancel
                  ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                  ${theme.textColors?.secondary || "text-gray-700 dark:text-gray-300"}
                  hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
                `}
              >
                {t("book.cancel") || "Cancel"}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  book-report-modal-submit
                  ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                  ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                  ${theme.shadow?.button || "shadow-md"}
                  hover:scale-105
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="book-report-modal-spinner" />
                    {t("book.submitting") || "Submitting..."}
                  </>
                ) : (
                  <>
                    <FaFlag className="w-4 h-4" />
                    {t("book.submit_report") || "Submit Report"}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default BookReportModal;
