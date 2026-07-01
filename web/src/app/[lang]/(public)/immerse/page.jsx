// src/app/[lang]/(public)/bookqubit-immerse/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import BookQubitImmerse from "@/features/bookqubit-immerse/bookqubit-immerse";
import "./page.css";

const BookQubitImmersePage = () => {
  const params = useParams();
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { t, language: contextLanguage } = useLanguage();
  const { currentFont } = useFont();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = 
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get current language from URL
  const getCurrentLanguage = () => {
    const segments = window?.location?.pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    const supportedLanguages = [
      "en", "es", "fr", "de", "ja", "zh", "hi", "ar", 
      "ur", "bn", "pt", "ru", "it", "ko", "nl", "tr", 
      "vi", "th", "pl", "sv", "ta", "te", "ml", "kn", "mr"
    ];
    if (firstSegment && supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    return params?.lang || contextLanguage || "en";
  };

  const currentLanguage = getCurrentLanguage();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  const fontStyle = currentFont?.family ? { fontFamily: currentFont.family } : {};

  // Loading skeleton
  if (isLoading) {
    return (
      <div 
        className={`bookqubit-immerse-page loading ${isDarkMode ? "dark-mode" : "light-mode"}`}
        style={fontStyle}
      >
        <div className="loading-container">
          <div className="loading-header">
            <div className="loading-skeleton skeleton-title"></div>
            <div className="loading-skeleton skeleton-subtitle"></div>
          </div>
          <div className="loading-tabs">
            <div className="loading-skeleton skeleton-tab"></div>
            <div className="loading-skeleton skeleton-tab"></div>
            <div className="loading-skeleton skeleton-tab"></div>
            <div className="loading-skeleton skeleton-tab"></div>
          </div>
          <div className="loading-featured">
            <div className="loading-skeleton skeleton-featured"></div>
          </div>
          <div className="loading-grid">
            <div className="loading-skeleton skeleton-grid-item"></div>
            <div className="loading-skeleton skeleton-grid-item"></div>
            <div className="loading-skeleton skeleton-grid-item"></div>
            <div className="loading-skeleton skeleton-grid-item"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bookqubit-immerse-page ${isDarkMode ? "dark-mode" : "light-mode"}`}
      style={fontStyle}
    >
      {/* Language Indicator */}
      <div className="language-indicator">
        <span className="language-badge">
          <svg className="language-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          {currentLanguage.toUpperCase()}
        </span>
      </div>

      {/* Main Immerse Component */}
      <BookQubitImmerse />
    </div>
  );
};

export default BookQubitImmersePage;