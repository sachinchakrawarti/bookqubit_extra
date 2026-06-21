"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { FiArrowRight } from "react-icons/fi";
import "./Bookqubit_Updates_Explorer.css";

const BookqubitUpdatesExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Sections data
  const sections = [
    {
      id: "announcements",
      title: "Announcements",
      icon: "📢",
      description: "Latest book news & updates",
      color: "#8b5cf6",
      count: "12+",
      slug: "announcements",
    },
    {
      id: "upcoming",
      title: "Upcoming",
      icon: "📅",
      description: "Books releasing soon",
      color: "#3b82f6",
      count: "24+",
      slug: "upcoming",
    },
    {
      id: "launched-week",
      title: "Launched This Week",
      icon: "🎉",
      description: "Fresh releases this week",
      color: "#10b981",
      count: "8+",
      slug: "launched-week",
    },
    {
      id: "launched-month",
      title: "Launched This Month",
      icon: "📚",
      description: "New arrivals this month",
      color: "#f59e0b",
      count: "15+",
      slug: "launched-month",
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
      className={`bookqubit-updates-explorer ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="updates-explorer-container">
        {/* Header */}
        <div className="updates-explorer-header">
          <div className="updates-explorer-header-icon">📢</div>
          <h2
            className={`updates-explorer-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Updates</span>
          </h2>
          <p
            className={`updates-explorer-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Stay updated with the latest books
          </p>
          <div className="updates-explorer-divider"></div>
        </div>

        {/* Categories Grid */}
        <div className="updates-explorer-grid">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/updates/${section.slug}`}
              className="updates-explorer-card"
            >
              <div
                className="updates-explorer-card-inner"
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
                  className={`updates-explorer-card-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: section.color }}
                >
                  {section.title}
                </h3>

                {/* Description */}
                <p
                  className={`updates-explorer-card-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
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
                  {section.count} items
                </span>

                {/* Arrow */}
                <div
                  className="updates-explorer-arrow"
                  style={{ color: section.color }}
                >
                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="updates-explorer-cta">
          <Link href="/updates" className="updates-explorer-cta-button">
            <span className="updates-explorer-cta-button-bg"></span>
            <span className="updates-explorer-cta-button-shine">
              <span className="updates-explorer-cta-button-shine-inner"></span>
            </span>
            <span className="updates-explorer-cta-button-content">
              <span>📚</span>
              <span>Explore All Updates</span>
              <FiArrowRight className="updates-explorer-cta-button-arrow" />
            </span>
          </Link>

          <p
            className={`updates-explorer-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Discover all the latest book news and releases
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitUpdatesExplorer;
