// src/features/bookqubit-discovery/books/bookdeatils/components/modals/BookShareModal.jsx

"use client";

import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaShare,
  FaCopy,
  FaCheck,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaEnvelope,
  FaLink,
  FaQrcode,
  FaDownload,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./BookShareModal.css";

const BookShareModal = ({
  isOpen,
  onClose,
  book,
  theme: propTheme,
  shareUrl,
  shareTitle,
  shareText,
}) => {
  const { theme: hookTheme, themeName } = useTheme();
  const { t } = useLanguage();
  const theme = propTheme || hookTheme;
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  // Get share URL
  const getShareUrl = () => {
    if (shareUrl) return shareUrl;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  // Get share title
  const getShareTitle = () => {
    if (shareTitle) return shareTitle;
    if (book) return `"${book.title}" by ${book.author}`;
    return "Check out this book!";
  };

  // Get share text
  const getShareText = () => {
    if (shareText) return shareText;
    if (book)
      return `I'm reading "${book.title}" by ${book.author}. Check it out!`;
    return "Check out this book!";
  };

  // Share platforms
  const sharePlatforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <FaFacebook />,
      color: "#1877F2",
      bgColor: "bg-[#1877F2]",
      getUrl: () => {
        const url = getShareUrl();
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      },
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <FaTwitter />,
      color: "#000000",
      bgColor: "bg-[#000000]",
      getUrl: () => {
        const url = getShareUrl();
        const text = getShareText();
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      },
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      color: "#25D366",
      bgColor: "bg-[#25D366]",
      getUrl: () => {
        const url = getShareUrl();
        const text = getShareText();
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
      },
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: <FaTelegram />,
      color: "#0088cc",
      bgColor: "bg-[#0088cc]",
      getUrl: () => {
        const url = getShareUrl();
        const text = getShareText();
        return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      },
    },
    {
      id: "email",
      name: "Email",
      icon: <FaEnvelope />,
      color: "#EA4335",
      bgColor: "bg-[#EA4335]",
      getUrl: () => {
        const url = getShareUrl();
        const subject = getShareTitle();
        const body = getShareText() + "\n\n" + url;
        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      },
    },
  ];

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Native share
  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: getShareTitle(),
          text: getShareText(),
          url: getShareUrl(),
        });
        onClose();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  // Handle platform share
  const handlePlatformShare = (platform) => {
    const url = platform.getUrl();
    window.open(url, "_blank", "width=600,height=400");
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="book-share-modal-backdrop" onClick={onClose} />
      )}

      {/* Modal */}
      <div
        className={`
          book-share-modal
          ${isOpen ? "open" : ""}
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
          shadow-2xl
        `}
      >
        {/* Header */}
        <div className="book-share-modal-header">
          <h3
            className={`
            book-share-modal-title
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            <FaShare className="w-5 h-5" />
            {t("book.share_book") || "Share Book"}
          </h3>
          <button
            onClick={onClose}
            className={`
              book-share-modal-close
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Book Preview */}
        {book && (
          <div className="book-share-modal-preview">
            <div className="book-share-modal-preview-image">
              <img
                src={book.imageUrl || "/api/placeholder/60/80"}
                alt={book.title}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
            <div className="book-share-modal-preview-info">
              <h4
                className={`
                book-share-modal-preview-title
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                font-semibold
              `}
              >
                {book.title}
              </h4>
              <p
                className={`
                book-share-modal-preview-author
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                text-sm
              `}
              >
                {book.author}
              </p>
            </div>
          </div>
        )}

        {/* Share URL */}
        <div className="book-share-modal-url">
          <input
            type="text"
            value={getShareUrl()}
            readOnly
            className={`
              book-share-modal-url-input
              ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
              ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            `}
          />
          <button
            onClick={handleCopyLink}
            className={`
              book-share-modal-url-copy
              ${copied ? "bg-emerald-500" : "bg-sky-500"}
              text-white
              hover:scale-105
              transition-all duration-200
            `}
          >
            {copied ? (
              <FaCheck className="w-4 h-4" />
            ) : (
              <FaCopy className="w-4 h-4" />
            )}
            <span>
              {copied
                ? t("book.copied") || "Copied!"
                : t("book.copy") || "Copy"}
            </span>
          </button>
        </div>

        {/* QR Code */}
        <div className="book-share-modal-qr">
          <button className="book-share-modal-qr-btn">
            <FaQrcode className="w-4 h-4" />
            {t("book.show_qr") || "Show QR Code"}
          </button>
          <button className="book-share-modal-download-btn">
            <FaDownload className="w-4 h-4" />
            {t("book.download_qr") || "Download QR"}
          </button>
        </div>

        {/* Share Platforms */}
        <div className="book-share-modal-platforms">
          <p
            className={`
            book-share-modal-platforms-label
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            text-sm
          `}
          >
            {t("book.share_via") || "Share via"}
          </p>
          <div className="book-share-modal-platforms-grid">
            {sharePlatforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformShare(platform)}
                className={`
                  book-share-modal-platform
                  ${platform.bgColor}
                  text-white
                  hover:scale-105
                  transition-all duration-200
                `}
              >
                {platform.icon}
                <span className="text-xs">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Native Share (Mobile) */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className={`
              book-share-modal-native
              ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
              ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
              ${theme.shadow?.button || "shadow-md"}
              hover:scale-105
              transition-all duration-200
            `}
          >
            <FaShare className="w-4 h-4" />
            {t("book.share_native") || "Share"}
          </button>
        )}
      </div>
    </>
  );
};

export default BookShareModal;
