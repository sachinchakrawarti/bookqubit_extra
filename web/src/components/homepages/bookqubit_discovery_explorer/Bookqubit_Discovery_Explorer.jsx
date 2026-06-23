"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight, 
  FiBook, 
  FiCompass, 
  FiSearch,
  FiBookOpen,
  FiGlobe,
  FiAward,
  FiStar,
  FiTrendingUp,
  FiUsers
} from "react-icons/fi";
import { 
  FaGraduationCap, 
  FaSuperpowers, 
  FaRocket,
  FaMagic,
  FaBrain,
  FaLightbulb
} from "react-icons/fa";
import { getDiscoveryTranslation } from "@/translations/bookqubit_discovery_explorer_translations"; 
import "./Bookqubit_Discovery_Explorer.css";

const BookqubitDiscoveryExplorer = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1280);

  // Get translations for current language
  const translations = useMemo(() => {
    return getDiscoveryTranslation(language);
  }, [language]);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Dynamic icon mapping based on category
  const getCategoryIcon = (iconName, size = 24) => {
    const iconMap = {
      'books': <FiBook size={size} />,
      'comics': <FiCompass size={size} />,
      'academic': <FaGraduationCap size={size} />,
      'search': <FiSearch size={size} />,
      'book': <FiBookOpen size={size} />,
      'globe': <FiGlobe size={size} />,
      'award': <FiAward size={size} />,
      'star': <FiStar size={size} />,
      'trending': <FiTrendingUp size={size} />,
      'users': <FiUsers size={size} />,
      'superpowers': <FaSuperpowers size={size} />,
      'rocket': <FaRocket size={size} />,
      'magic': <FaMagic size={size} />,
      'brain': <FaBrain size={size} />,
      'lightbulb': <FaLightbulb size={size} />
    };
    return iconMap[iconName] || <FiBook size={size} />;
  };

  // Discovery Categories with translations
  const categories = useMemo(() => [
    {
      id: "books",
      title: translations.categories.books,
      icon: "books",
      description: translations.categories.booksDesc,
      color: "#3b82f6",
      count: "1,200+",
      slug: "/books",
    },
    {
      id: "comics",
      title: translations.categories.comics,
      icon: "superpowers",
      description: translations.categories.comicsDesc,
      color: "#ef4444",
      count: "450+",
      slug: "/comics",
    },
    {
      id: "academic",
      title: translations.categories.academic,
      icon: "academic",
      description: translations.categories.academicDesc,
      color: "#10b981",
      count: "850+",
      slug: "/academicbooks",
    },
  ], [translations]);

  if (!mounted || !theme) {
    return null;
  }

  const isMobile = windowWidth <= 768;

  return (
    <section
      className={`bookqubit-discovery-section ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="discovery-container">
        {/* Header with React Icons */}
        <div className="discovery-header">
          <div className="discovery-header-icon-wrapper">
            <FiSearch className="discovery-header-icon" size={40} />
          </div>
          <h2
            className={`discovery-header-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
          >
            BookQubit <span className={`highlight ${theme.textColors?.highlight || 'text-sky-600'}`}>
              {translations.title}
            </span>
          </h2>
          <p
            className={`discovery-header-subtitle ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
          >
            {translations.subtitle}
          </p>
          <div className={`discovery-header-divider ${theme.background?.highlight || 'bg-sky-600'}`}></div>
        </div>

        {/* Categories Grid with React Icons */}
        <div className="discovery-categories-grid">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/${language}${cat.slug}`}
              className="discovery-category-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`discovery-category-card-inner ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'}`}
                style={{
                  backgroundColor: isDarkMode
                    ? `${cat.color}15`
                    : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                <div
                  className="discovery-category-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.color}25, transparent 70%)`,
                  }}
                />
                <div 
                  className="discovery-category-icon"
                  style={{ color: cat.color }}
                >
                  {getCategoryIcon(cat.icon, isMobile ? 28 : 36)}
                </div>
                <h3
                  className={`discovery-category-title ${theme.textColors?.primary || 'text-gray-900 dark:text-white'}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                <p
                  className={`discovery-category-desc ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}
                >
                  {cat.description}
                </p>
                <span
                  className="discovery-category-count"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                  }}
                >
                  {cat.count}
                </span>
                <div
                  className="discovery-category-arrow"
                  style={{ color: cat.color }}
                >
                  <FiArrowRight size={isMobile ? 16 : 20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section with React Icons */}
        <div className="discovery-cta">
          <Link href={`/${language}/discovery`} className="discovery-cta-button">
            <span className={`discovery-cta-button-bg ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'}`}></span>
            <span className="discovery-cta-button-shine">
              <span className="discovery-cta-button-shine-inner"></span>
            </span>
            <span className={`discovery-cta-button-content ${theme.buttonColors?.primaryButton?.textColor || 'text-white'}`}>
              <FiSearch className="discovery-cta-icon" size={20} />
              <span>{translations.exploreAll}</span>
              <FiArrowRight className="discovery-cta-button-arrow" size={20} />
            </span>
          </Link>
          <p
            className={`discovery-cta-subtext ${theme.textColors?.secondary || 'text-gray-500 dark:text-gray-400'}`}
          >
            {translations.ctaText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitDiscoveryExplorer;