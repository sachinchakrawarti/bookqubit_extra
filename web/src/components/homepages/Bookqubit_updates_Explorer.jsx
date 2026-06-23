"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { FiArrowRight } from "react-icons/fi";
import { getUpdatesTranslation } from "@/translations/bookqubit_updates_translations";
import "./Bookqubit_Updates_Explorer.css";

const BookqubitUpdatesExplorer = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1280);

  // Get translations for current language
  const translations = useMemo(() => {
    const result = getUpdatesTranslation(language);
    console.log(`📚 Updates translations loaded for: ${language}`, result);
    return result;
  }, [language]);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Sections data with translations
  const sections = useMemo(() => [
    {
      id: "announcements",
      title: translations?.categories?.announcements || "Announcements",
      icon: "📢",
      description: translations?.categories?.announcementsDesc || "Latest book news & updates",
      color: "#8b5cf6",
      count: "12+",
      slug: "announcements",
    },
    {
      id: "upcoming",
      title: translations?.categories?.upcoming || "Upcoming",
      icon: "📅",
      description: translations?.categories?.upcomingDesc || "Books releasing soon",
      color: "#3b82f6",
      count: "24+",
      slug: "upcoming",
    },
    {
      id: "launched-week",
      title: translations?.categories?.launchedWeek || "Launched This Week",
      icon: "🎉",
      description: translations?.categories?.launchedWeekDesc || "Fresh releases this week",
      color: "#10b981",
      count: "8+",
      slug: "launched-week",
    },
    {
      id: "launched-month",
      title: translations?.categories?.launchedMonth || "Launched This Month",
      icon: "📚",
      description: translations?.categories?.launchedMonthDesc || "New arrivals this month",
      color: "#f59e0b",
      count: "15+",
      slug: "launched-month",
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
    console.log(`🔄 Updates component - Language changed to: ${language}`);
  }, [language]);

  if (!mounted || !theme) {
    return null;
  }

  const isMobile = windowWidth <= 768;

  return (
    <section
      className={`bookqubit-updates-explorer ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="updates-explorer-container">
        {/* Header */}
        <div className="updates-explorer-header">
          <div className="updates-explorer-header-icon">📢</div>
          <h2
            className={`updates-explorer-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
          >
            BookQubit <span className={`highlight ${theme.textColors?.highlight || 'text-purple-600'}`}>
              {translations?.title || "Updates"}
            </span>
          </h2>
          <p
            className={`updates-explorer-subtitle ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
          >
            {translations?.subtitle || "Stay updated with the latest books"}
          </p>
          <div className={`updates-explorer-divider ${theme.background?.highlight || 'bg-purple-600'}`}></div>
        </div>

        {/* Categories Grid */}
        <div className="updates-explorer-grid">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              href={`/${language}/updates/${section.slug}`}
              className="updates-explorer-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`updates-explorer-card-inner ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'}`}
                style={{
                  backgroundColor: isDarkMode
                    ? `${section.color}15`
                    : `${section.color}10`,
                  borderColor: `${section.color}25`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className="updates-explorer-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${section.color}25, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="updates-explorer-icon"
                  style={{ color: section.color }}
                >
                  {section.icon}
                </div>

                {/* Title */}
                <h3
                  className={`updates-explorer-card-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
                  style={{ color: section.color }}
                >
                  {section.title}
                </h3>

                {/* Description */}
                <p
                  className={`updates-explorer-card-desc ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
                >
                  {section.description}
                </p>

                {/* Count Badge */}
                <span
                  className="updates-explorer-count"
                  style={{
                    backgroundColor: `${section.color}20`,
                    color: section.color,
                    borderColor: `${section.color}30`,
                  }}
                >
                  {section.count} {translations?.items || "items"}
                </span>

                {/* Arrow */}
                <div
                  className={`updates-explorer-arrow ${isRTL ? 'rotate-180' : ''}`}
                  style={{ color: section.color }}
                >
                  <FiArrowRight size={isMobile ? 16 : 20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="updates-explorer-cta">
          <Link href={`/${language}/updates`} className="updates-explorer-cta-button">
            <span className={`updates-explorer-cta-button-bg ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-purple-600 to-blue-500'}`}></span>
            <span className="updates-explorer-cta-button-shine">
              <span className="updates-explorer-cta-button-shine-inner"></span>
            </span>
            <span className={`updates-explorer-cta-button-content ${theme.buttonColors?.primaryButton?.textColor || 'text-white'}`}>
              <span>📚</span>
              <span>{translations?.exploreAll || "Explore All Updates"}</span>
              <FiArrowRight className={`updates-explorer-cta-button-arrow ${isRTL ? 'rotate-180' : ''}`} />
            </span>
          </Link>

          <p
            className={`updates-explorer-cta-subtext ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}
          >
            {translations?.ctaText || "Discover all the latest book news and releases"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitUpdatesExplorer;