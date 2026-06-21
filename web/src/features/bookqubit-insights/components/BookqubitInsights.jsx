"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import InsightCard from "./InsightCard";
import { getInsightsData } from "../data/insightsData";
import { FiArrowRight } from "react-icons/fi";
import "../bookqubitinsights.css";

export default function BookqubitInsights() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const sections = [
    {
      id: "trendDashboard",
      title: "Trend Dashboard",
      icon: "📈",
      color: "#3b82f6",
    },
    { id: "bookData", title: "BookQubit Data", icon: "📊", color: "#8b5cf6" },
    {
      id: "readingInsights",
      title: "Reading Insights",
      icon: "📚",
      color: "#10b981",
    },
    {
      id: "performanceMetrics",
      title: "Performance Metrics",
      icon: "🎯",
      color: "#f59e0b",
    },
    {
      id: "bookPerformance",
      title: "Book Performance",
      icon: "📖",
      color: "#ef4444",
    },
    {
      id: "communityInsights",
      title: "Community Insights",
      icon: "👥",
      color: "#ec4899",
    },
    {
      id: "bookCategories",
      title: "Book Categories",
      icon: "🏷️",
      color: "#14b8a6",
    },
    {
      id: "userBehavior",
      title: "User Behavior",
      icon: "🎯",
      color: "#6366f1",
    },
    { id: "dataExport", title: "Data Export", icon: "📊", color: "#eab308" },
  ];

  useEffect(() => {
    setMounted(true);
    const insightsData = getInsightsData();
    setData(insightsData);
  }, []);

  if (!mounted || !data) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`bookqubit-insights ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <div className="insights-header">
        <div className="insights-header-content">
          <h1 className="insights-title">📊 BookQubit Insights</h1>
          <p className="insights-subtitle">
            Data-driven insights for better reading
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="insights-grid">
        {sections.map((section) => {
          const insightData = data[section.id];
          if (!insightData) return null;
          return <InsightCard key={section.id} insight={insightData} />;
        })}
      </div>

      {/* CTA */}
      <div className="insights-cta">
        <Link href="/insights" className="insights-cta-button">
          <span className="insights-cta-button-bg"></span>
          <span className="insights-cta-button-shine">
            <span className="insights-cta-button-shine-inner"></span>
          </span>
          <span className="insights-cta-button-content">
            <span>📊</span>
            <span>Explore All Insights</span>
            <FiArrowRight className="insights-cta-button-arrow" />
          </span>
        </Link>
        <p className="insights-cta-subtext">
          Discover data-driven insights about books and readers
        </p>
      </div>
    </div>
  );
}
