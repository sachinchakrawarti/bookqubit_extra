"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiTrendingUp,
  FiBookOpen,
  FiStar,
  FiMessageSquare,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";
import { getLensTranslation } from "@/translations/bookqubit_lens_translations";
import "./Bookqubit_Lens_Explorer.css";

const BookqubitLensExplorer = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1280);

  // Get translations for current language
  const translations = useMemo(() => {
    const result = getLensTranslation(language);
    console.log(`📚 Lens translations loaded for: ${language}`, result);
    return result;
  }, [language]);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Categories data with translations
  const categories = useMemo(() => [
    {
      id: "news",
      title: translations?.categories?.news || "News",
      icon: <FiTrendingUp />,
      description: translations?.categories?.newsDesc || "Latest book news & updates",
      color: "#3b82f6",
      count: "124+",
      slug: "news",
    },
    {
      id: "blogs",
      title: translations?.categories?.blogs || "Blogs",
      icon: <FiBookOpen />,
      description: translations?.categories?.blogsDesc || "In-depth book articles",
      color: "#8b5cf6",
      count: "86+",
      slug: "blogs",
    },
    {
      id: "reviews",
      title: translations?.categories?.reviews || "Reviews",
      icon: <FiStar />,
      description: translations?.categories?.reviewsDesc || "Honest book reviews",
      color: "#f59e0b",
      count: "67+",
      slug: "reviews",
    },
    {
      id: "quotes",
      title: translations?.categories?.quotes || "Quotes",
      icon: <FiMessageSquare />,
      description: translations?.categories?.quotesDesc || "Inspiring book quotes",
      color: "#10b981",
      count: "45+",
      slug: "quotes",
    },
    {
      id: "opinions",
      title: translations?.categories?.opinions || "Opinions",
      icon: <FiUser />,
      description: translations?.categories?.opinionsDesc || "Reader perspectives",
      color: "#ec4899",
      count: "34+",
      slug: "opinions",
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

  // Debug: Log when language changes
  useEffect(() => {
    console.log(`🔄 Lens component - Language changed to: ${language}`);
  }, [language]);

  if (!mounted || !theme) {
    return null;
  }

  const isMobile = windowWidth <= 768;

  return (
    <section
      className={`bookqubit-lens-explorer ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="lens-explorer-container">
        {/* Header */}
        <div className="lens-explorer-header">
          <div className="lens-explorer-header-icon">🔍</div>
          <h2
            className={`lens-explorer-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
          >
            BookQubit <span className={`highlight ${theme.textColors?.highlight || 'text-blue-600'}`}>
              {translations?.title || "Lens"}
            </span>
          </h2>
          <p
            className={`lens-explorer-subtitle ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
          >
            {translations?.subtitle || "Discover news, blogs, reviews, quotes & opinions about books"}
          </p>
          <div className={`lens-explorer-divider ${theme.background?.highlight || 'bg-blue-600'}`}></div>
        </div>

        {/* Categories Grid */}
        <div className="lens-explorer-categories">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/${language}/bookqubit-lens/${cat.slug}`}
              className="lens-explorer-category-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`lens-explorer-category-inner ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'}`}
                style={{
                  backgroundColor: isDarkMode
                    ? `${cat.color}15`
                    : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className="lens-explorer-category-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.color}25, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="lens-explorer-category-icon"
                  style={{ color: cat.color }}
                >
                  {cat.icon}
                </div>

                {/* Title */}
                <h3
                  className={`lens-explorer-category-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className={`lens-explorer-category-desc ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
                >
                  {cat.description}
                </p>

                {/* Count Badge */}
                <span
                  className="lens-explorer-category-count"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                  }}
                >
                  {cat.count} {translations?.items || "items"}
                </span>

                {/* Arrow */}
                <div
                  className={`lens-explorer-category-arrow ${isRTL ? 'rotate-180' : ''}`}
                  style={{ color: cat.color }}
                >
                  <FiArrowRight size={isMobile ? 16 : 20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="lens-explorer-cta">
          <Link href={`/${language}/bookqubit-lens`} className="lens-explorer-cta-button">
            <span className={`lens-explorer-cta-button-bg ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-blue-600 to-purple-500'}`}></span>
            <span className="lens-explorer-cta-button-shine">
              <span className="lens-explorer-cta-button-shine-inner"></span>
            </span>
            <span className={`lens-explorer-cta-button-content ${theme.buttonColors?.primaryButton?.textColor || 'text-white'}`}>
              <span>🔍</span>
              <span>{translations?.exploreAll || "Explore All Content"}</span>
              <FiArrowRight className={`lens-explorer-cta-button-arrow ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </Link>

          <p
            className={`lens-explorer-cta-subtext ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}
          >
            {translations?.ctaText || "Discover news, blogs, reviews, quotes & opinions"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitLensExplorer;