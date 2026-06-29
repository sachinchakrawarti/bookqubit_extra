"use client";

import React, { useState, useEffect } from "react";
import { FaShare, FaCheck, FaCopy } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import "./ShareButton.css";

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
  bookId = null,
  bookSlug = null,
  bookTitle = null,
  bookAuthor = null,
  navigateToBook = false,
  onShareSuccess = null,
  onShareError = null,
  variant = "icon", // 'icon', 'text', 'icon-text'
  label = "",
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [showLocalTooltip, setShowLocalTooltip] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

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
      text: "text-sm",
    },
    md: {
      button: "btn-share-md",
      icon: "icon-md",
      text: "text-md",
    },
    lg: {
      button: "btn-share-lg",
      icon: "icon-lg",
      text: "text-lg",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  // Variant classes
  const variantClasses = {
    icon: "btn-share-icon",
    text: "btn-share-text",
    "icon-text": "btn-share-icon-text",
  };

  // Handle tooltip visibility
  useEffect(() => {
    if (showLocalTooltip) {
      const timer = setTimeout(() => {
        setShowLocalTooltip(false);
      }, tooltipDuration);
      return () => clearTimeout(timer);
    }
  }, [showLocalTooltip, tooltipDuration]);

  // Generate share URL
  const getShareUrl = () => {
    if (shareData?.url) return shareData.url;
    
    // If bookId or bookSlug is provided, generate the detail page URL
    if (bookId || bookSlug) {
      const slug = bookSlug || bookId;
      return `${window.location.origin}/books/${slug}`;
    }
    
    return window.location.href;
  };

  // Generate share data
  const getShareData = () => {
    if (shareData) return shareData;
    
    const url = getShareUrl();
    const title = bookTitle 
      ? `Check out "${bookTitle}"${bookAuthor ? ` by ${bookAuthor}` : ''}`
      : "Check out this book!";
    
    return {
      title: shareData?.title || title,
      text: shareData?.text || title,
      url: url,
    };
  };

  // Handle share click
  const handleClick = async (e) => {
    if (disabled || isSharing) return;

    // If custom onClick provided, use it
    if (onClick) {
      try {
        await onClick(e);
      } catch (error) {
        console.error("Custom onClick failed:", error);
        if (onShareError) onShareError(error);
      }
      return;
    }

    setIsSharing(true);

    try {
      const data = getShareData();
      
      if (navigator.share) {
        // Use Web Share API
        await navigator.share(data);
        setIsCopied(false);
        setShowLocalTooltip(false);
        
        // Call success callback
        if (onShareSuccess) {
          await onShareSuccess(data);
        }
        
        // Navigate to book detail if requested
        if (navigateToBook && (bookId || bookSlug)) {
          const slug = bookSlug || bookId;
          router.push(`/books/${slug}`);
        }
      } else {
        // Fallback: copy to clipboard
        const url = data.url || window.location.href;
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setShowLocalTooltip(true);
        
        // Call success callback
        if (onShareSuccess) {
          await onShareSuccess({ ...data, url });
        }
        
        // Navigate to book detail after a short delay
        if (navigateToBook && (bookId || bookSlug)) {
          setTimeout(() => {
            const slug = bookSlug || bookId;
            router.push(`/books/${slug}`);
          }, 500);
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
        
        // Even if share fails, try to copy the link
        try {
          const url = getShareUrl();
          await navigator.clipboard.writeText(url);
          setIsCopied(true);
          setShowLocalTooltip(true);
          
          if (onShareSuccess) {
            await onShareSuccess({ url, copied: true });
          }
        } catch (copyError) {
          console.error("Copy failed:", copyError);
          if (onShareError) onShareError(copyError);
        }
      }
    } finally {
      setIsSharing(false);
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

  // Button label
  const buttonLabel = label || (variant === "text" ? (t("book.share") || "Share") : "");

  return (
    <button
      className={`
        btn-share 
        ${selectedSize.button}
        ${variantClasses[variant] || variantClasses.icon}
        ${disabled ? "disabled" : ""}
        ${isDarkMode ? "dark" : ""}
        ${isSharing ? "sharing" : ""}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || isSharing}
      aria-label={ariaLabel}
      style={{
        color: getColor(),
      }}
    >
      {isSharing ? (
        <span className="spinner">
          <svg className="animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      ) : isCopied ? (
        <FaCheck className={`icon ${selectedSize.icon}`} />
      ) : (
        <FaShare className={`icon ${selectedSize.icon}`} />
      )}

      {variant !== "icon" && buttonLabel && (
        <span className={`label ${selectedSize.text}`}>
          {buttonLabel}
        </span>
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