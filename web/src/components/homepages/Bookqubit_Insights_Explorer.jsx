"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { FiArrowRight } from "react-icons/fi";
import "./Bookqubit_Insights_Explorer.css";

const BookqubitInsightsExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // 9 Insight Sections
  const sections = [
    {
      id: "trend-dashboard",
      title: "Trend Dashboard",
      icon: "📈",
      description: "What's trending in books right now",
      color: "#3b82f6",
      count: "12+",
      slug: "trends",
    },
    {
      id: "book-data",
      title: "BookQubit Data",
      icon: "📊",
      description: "Data science & book analytics",
      color: "#8b5cf6",
      count: "24+",
      slug: "data",
    },
    {
      id: "reading-insights",
      title: "Reading Insights",
      icon: "📚",
      description: "Reader behavior & patterns",
      color: "#10b981",
      count: "18+",
      slug: "reading",
    },
    {
      id: "performance-metrics",
      title: "Performance Metrics",
      icon: "🎯",
      description: "Platform performance analytics",
      color: "#f59e0b",
      count: "15+",
      slug: "performance",
    },
    {
      id: "book-performance",
      title: "Book Performance",
      icon: "📖",
      description: "Book-level analytics",
      color: "#ef4444",
      count: "20+",
      slug: "books",
    },
    {
      id: "community-insights",
      title: "Community Insights",
      icon: "👥",
      description: "Reader community analytics",
      color: "#ec4899",
      count: "14+",
      slug: "community",
    },
    {
      id: "book-categories",
      title: "Book Categories",
      icon: "🏷️",
      description: "Category & genre analytics",
      color: "#14b8a6",
      count: "10+",
      slug: "categories",
    },
    {
      id: "user-behavior",
      title: "User Behavior",
      icon: "🎯",
      description: "User journey analytics",
      color: "#6366f1",
      count: "16+",
      slug: "users",
    },
    {
      id: "data-export",
      title: "Data Export",
      icon: "📊",
      description: "Export & reports",
      color: "#eab308",
      count: "8+",
      slug: "export",
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
      className={`bookqubit-insights-explorer ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="insights-explorer-container">
        {/* Header */}
        <div className="insights-explorer-header">
          <div className="insights-explorer-header-icon">📊</div>
          <h2
            className={`insights-explorer-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Insights</span>
          </h2>
          <p
            className={`insights-explorer-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Data-driven insights for better reading
          </p>
          <div className="insights-explorer-divider"></div>
        </div>

        {/* 9 Categories Grid - 3 columns */}
        <div className="insights-explorer-grid">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/insights/${section.slug}`}
              className="insights-explorer-card"
            >
              <div
                className="insights-explorer-card-inner"
                style={{
                  backgroundColor: isDarkMode
                    ? `${section.color}15`
                    : `${section.color}10`,
                  borderColor: `${section.color}25`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className="insights-explorer-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${section.color}25, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="insights-explorer-icon"
                  style={{ color: section.color }}
                >
                  {section.icon}
                </div>

                {/* Title */}
                <h3
                  className={`insights-explorer-card-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: section.color }}
                >
                  {section.title}
                </h3>

                {/* Description */}
                <p
                  className={`insights-explorer-card-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  {section.description}
                </p>

                {/* Count Badge */}
                <span
                  className="insights-explorer-count"
                  style={{
                    backgroundColor: `${section.color}20`,
                    color: section.color,
                    borderColor: `${section.color}30`,
                  }}
                >
                  {section.count} insights
                </span>

                {/* Arrow */}
                <div
                  className="insights-explorer-arrow"
                  style={{ color: section.color }}
                >
                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="insights-explorer-cta">
          <Link href="/insights" className="insights-explorer-cta-button">
            <span className="insights-explorer-cta-button-bg"></span>
            <span className="insights-explorer-cta-button-shine">
              <span className="insights-explorer-cta-button-shine-inner"></span>
            </span>
            <span className="insights-explorer-cta-button-content">
              <span>📊</span>
              <span>Explore All Insights</span>
              <FiArrowRight className="insights-explorer-cta-button-arrow" />
            </span>
          </Link>

          <p
            className={`insights-explorer-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Discover data-driven insights about books and readers
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitInsightsExplorer;
