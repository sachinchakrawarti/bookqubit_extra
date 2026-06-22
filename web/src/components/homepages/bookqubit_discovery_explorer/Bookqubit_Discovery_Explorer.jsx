"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { FiArrowRight } from "react-icons/fi";
import "./Bookqubit_Discovery_Explorer.css";

const BookqubitDiscoveryExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Discovery Categories
  const categories = [
    {
      id: "books",
      title: "Books",
      icon: "📚",
      description: "Discover amazing books",
      color: "#3b82f6",
      count: "1,200+",
      slug: "/books",
    },
    {
      id: "comics",
      title: "Comics",
      icon: "🦸",
      description: "Explore comic books",
      color: "#ef4444",
      count: "450+",
      slug: "comics",
    },
    {
      id: "academic",
      title: "Academic Books",
      icon: "🎓",
      description: "Find academic resources",
      color: "#10b981",
      count: "850+",
      slug: "academic",
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
      className={`bookqubit-discovery-section ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="discovery-container">
        {/* Header */}
        <div className="discovery-header">
          <div className="discovery-header-icon">🔍</div>
          <h2
            className={`discovery-header-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Discovery</span>
          </h2>
          <p
            className={`discovery-header-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Discover books, comics & academic resources
          </p>
          <div className="discovery-header-divider"></div>
        </div>

        {/* Categories Grid - 3 Cards Only */}
        <div className="discovery-categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/discovery/${cat.slug}`}
              className="discovery-category-card"
            >
              <div
                className="discovery-category-card-inner"
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
                <div className="discovery-category-icon">{cat.icon}</div>
                <h3
                  className={`discovery-category-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                <p
                  className={`discovery-category-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
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
                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="discovery-cta">
          <Link href="/discovery" className="discovery-cta-button">
            <span className="discovery-cta-button-bg"></span>
            <span className="discovery-cta-button-shine">
              <span className="discovery-cta-button-shine-inner"></span>
            </span>
            <span className="discovery-cta-button-content">
              <span>🔍</span>
              <span>Explore All</span>
              <FiArrowRight className="discovery-cta-button-arrow" />
            </span>
          </Link>
          <p
            className={`discovery-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Discover thousands of books, comics, and academic resources
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitDiscoveryExplorer;
