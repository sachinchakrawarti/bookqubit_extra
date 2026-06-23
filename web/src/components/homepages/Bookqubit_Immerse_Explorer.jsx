"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { getImmerseTranslation } from "@/translations/bookqubit_immerse_translations"; // ✅ Fixed: using @/translations path
import "./Bookqubit_Immerse_Explorer.css";

const BookqubitImmerseExplorer = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1280);

  // Get translations for current language
  const translations = useMemo(() => {
    return getImmerseTranslation(language);
  }, [language]);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Categories data with translations
  const categories = useMemo(() => [
    {
      id: "audiobooks",
      title: translations.categories.audiobooks,
      icon: "🎧",
      description: translations.categories.audiobooksDesc,
      gradient: "from-purple-500 to-pink-500",
      color: "#8b5cf6",
      count: "124+",
      slug: "audiobooks",
    },
    {
      id: "visualbooks",
      title: translations.categories.visualbooks,
      icon: "🎨",
      description: translations.categories.visualbooksDesc,
      color: "#3b82f6",
      count: "86+",
      slug: "visualbooks",
    },
    {
      id: "explainerbooks",
      title: translations.categories.explainerbooks,
      icon: "💡",
      description: translations.categories.explainerbooksDesc,
      color: "#f59e0b",
      count: "45+",
      slug: "explainerbooks",
    },
    {
      id: "summaries",
      title: translations.categories.summaries,
      icon: "📝",
      description: translations.categories.summariesDesc,
      color: "#ef4444",
      count: "67+",
      slug: "summaries",
    },
    {
      id: "interactive",
      title: translations.categories.interactive,
      icon: "🔗",
      description: translations.categories.interactiveDesc,
      color: "#ec4899",
      count: "34+",
      slug: "interactive",
    },
    {
      id: "podcasts",
      title: translations.categories.podcasts,
      icon: "🎙️",
      description: translations.categories.podcastsDesc,
      color: "#10b981",
      count: "28+",
      slug: "podcasts",
    },
  ], [translations]);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (!mounted || !theme) {
    return null;
  }

  const isMobile = windowWidth <= 768;

  return (
    <section
      className={`bookqubit-immerse-section ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="immerse-container">
        {/* Header */}
        <div className="immerse-header">
          <div className="immerse-header-icon">📖</div>
          <h2
            className={`immerse-header-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
          >
            BookQubit <span className={`highlight ${theme.textColors?.highlight || 'text-purple-600'}`}>
              {translations.title}
            </span>
          </h2>
          <p
            className={`immerse-header-subtitle ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
          >
            {translations.subtitle}
          </p>
          <div className={`immerse-header-divider ${theme.background?.highlight || 'bg-purple-600'}`}></div>
        </div>

        {/* Categories Grid */}
        <div className="immerse-categories-grid">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/${language}/bookqubit-immerse/${cat.slug}`}
              className="immerse-category-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`immerse-category-card-inner ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'}`}
                style={{
                  backgroundColor: isDarkMode
                    ? `${cat.color}15`
                    : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className="immerse-category-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.color}25, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div className="immerse-category-icon">{cat.icon}</div>

                {/* Title */}
                <h3
                  className={`immerse-category-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className={`immerse-category-desc ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
                >
                  {cat.description}
                </p>

                {/* Count Badge */}
                <span
                  className="immerse-category-count"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                  }}
                >
                  {cat.count} {translations.items}
                </span>

                {/* Arrow on hover */}
                <div
                  className={`immerse-category-arrow ${isRTL ? 'rotate-180' : ''}`}
                  style={{ color: cat.color }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="immerse-cta">
          <Link href={`/${language}/bookqubit-immerse`} className="immerse-cta-button">
            <span className={`immerse-cta-button-bg ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-purple-600 to-pink-500'}`}></span>
            <span className="immerse-cta-button-shine">
              <span className="immerse-cta-button-shine-inner"></span>
            </span>
            <span className={`immerse-cta-button-content ${theme.buttonColors?.primaryButton?.textColor || 'text-white'}`}>
              <span>🚀</span>
              <span>{translations.startExploring}</span>
              <svg
                className={`immerse-cta-button-arrow ${isRTL ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isRTL ? "M13 7l5 5m0 0l-5 5m5-5H6" : "M13 7l5 5m0 0l-5 5m5-5H6"}
                />
              </svg>
            </span>
          </Link>

          <p
            className={`immerse-cta-subtext ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}
          >
            {translations.ctaText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitImmerseExplorer;