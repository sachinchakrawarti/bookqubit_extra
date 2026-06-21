"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import "./Bookqubit_Immerse_Explorer.css";

const BookqubitImmerseExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Categories data with beautiful colors and gradients
  const categories = [
    {
      id: "audiobooks",
      title: "Audiobooks",
      icon: "🎧",
      description: "Listen to narrated stories",
      gradient: "from-purple-500 to-pink-500",
      color: "#8b5cf6",
      count: "124+",
      slug: "audiobooks",
    },
    {
      id: "visualbooks",
      title: "Visual Books",
      icon: "🎨",
      description: "Illustrated visual stories",
      color: "#3b82f6",
      count: "86+",
      slug: "visualbooks",
    },
    {
      id: "explainerbooks",
      title: "Explainer Books",
      icon: "💡",
      description: "Learn concepts easily",
      color: "#f59e0b",
      count: "45+",
      slug: "explainerbooks",
    },
    {
      id: "summaries",
      title: "Book Summaries",
      icon: "📝",
      description: "Key insights in minutes",
      color: "#ef4444",
      count: "67+",
      slug: "summaries",
    },
    {
      id: "interactive",
      title: "Interactive",
      icon: "🔗",
      description: "Engage with stories",
      color: "#ec4899",
      count: "34+",
      slug: "interactive",
    },
    {
      id: "podcasts",
      title: "Podcasts",
      icon: "🎙️",
      description: "Author talks & discussions",
      color: "#10b981",
      count: "28+",
      slug: "podcasts",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section
      className={`bookqubit-immerse-section ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="immerse-container">
        {/* Header */}
        <div className="immerse-header">
          <div className="immerse-header-icon">📖</div>
          <h2
            className={`immerse-header-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Immerse</span>
          </h2>
          <p
            className={`immerse-header-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Dive into stories. Listen. Watch. Learn. Explore.
          </p>
          <div className="immerse-header-divider"></div>
        </div>

        {/* Categories Grid - Same Size Cards */}
        <div className="immerse-categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/bookqubit-immerse/${cat.slug}`}
              className="immerse-category-card"
            >
              <div
                className="immerse-category-card-inner"
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
                  className={`immerse-category-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className={`immerse-category-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
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
                  {cat.count} items
                </span>

                {/* Arrow on hover */}
                <div
                  className="immerse-category-arrow"
                  style={{ color: cat.color }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section with One Button */}
        <div className="immerse-cta">
          <Link href="/bookqubit-immerse" className="immerse-cta-button">
            <span className="immerse-cta-button-bg"></span>
            <span className="immerse-cta-button-shine">
              <span className="immerse-cta-button-shine-inner"></span>
            </span>
            <span className="immerse-cta-button-content">
              <span>🚀</span>
              <span>Start Exploring</span>
              <svg
                className="immerse-cta-button-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>

          <p
            className={`immerse-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Discover thousands of audiobooks, visual books, and more
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitImmerseExplorer;
