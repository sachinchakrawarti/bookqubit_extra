"use client";

import React, { useState, useEffect } from "react";
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
import "./Bookqubit_Lens_Explorer.css";

const BookqubitLensExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const categories = [
    {
      id: "news",
      title: "News",
      icon: <FiTrendingUp />,
      description: "Latest book news & updates",
      color: "#3b82f6",
      count: "124+",
      slug: "news",
    },
    {
      id: "blogs",
      title: "Blogs",
      icon: <FiBookOpen />,
      description: "In-depth book articles",
      color: "#8b5cf6",
      count: "86+",
      slug: "blogs",
    },
    {
      id: "reviews",
      title: "Reviews",
      icon: <FiStar />,
      description: "Honest book reviews",
      color: "#f59e0b",
      count: "67+",
      slug: "reviews",
    },
    {
      id: "quotes",
      title: "Quotes",
      icon: <FiMessageSquare />,
      description: "Inspiring book quotes",
      color: "#10b981",
      count: "45+",
      slug: "quotes",
    },
    {
      id: "opinions",
      title: "Opinions",
      icon: <FiUser />,
      description: "Reader perspectives",
      color: "#ec4899",
      count: "34+",
      slug: "opinions",
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
      className={`bookqubit-lens-explorer ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="lens-explorer-container">
        {/* Header */}
        <div className="lens-explorer-header">
          <div className="lens-explorer-header-icon">🔍</div>
          <h2
            className={`lens-explorer-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Lens</span>
          </h2>
          <p
            className={`lens-explorer-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Discover news, blogs, reviews, quotes & opinions about books
          </p>
          <div className="lens-explorer-divider"></div>
        </div>

        {/* Categories Grid */}
        <div className="lens-explorer-categories">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/bookqubit-lens/${cat.slug}`}
              className="lens-explorer-category-card"
            >
              <div
                className="lens-explorer-category-inner"
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
                  className={`lens-explorer-category-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>

                {/* Description */}
                <p
                  className={`lens-explorer-category-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
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
                  {cat.count} items
                </span>

                {/* Arrow */}
                <div
                  className="lens-explorer-category-arrow"
                  style={{ color: cat.color }}
                >
                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="lens-explorer-cta">
          <Link href="/bookqubit-lens" className="lens-explorer-cta-button">
            <span className="lens-explorer-cta-button-bg"></span>
            <span className="lens-explorer-cta-button-shine">
              <span className="lens-explorer-cta-button-shine-inner"></span>
            </span>
            <span className="lens-explorer-cta-button-content">
              <span>🔍</span>
              <span>Explore All Content</span>
              <FiArrowRight className="lens-explorer-cta-button-arrow" />
            </span>
          </Link>

          <p
            className={`lens-explorer-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Discover news, blogs, reviews, quotes & opinions
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitLensExplorer;
