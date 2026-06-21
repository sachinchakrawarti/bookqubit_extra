"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import SectionSlider from "./SectionSlider";
import { getUpdatesData } from "../data/updatesData";
import { FiArrowRight } from "react-icons/fi";
import "../bookqubitupdates.css";

export default function BookqubitUpdates() {
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
      id: "announcements",
      title: "📢 Announcements",
      icon: "📢",
      color: "#8b5cf6",
      viewAll: "/updates/announcements",
    },
    {
      id: "upcoming",
      title: "📅 Upcoming",
      icon: "📅",
      color: "#3b82f6",
      viewAll: "/updates/upcoming",
    },
    {
      id: "launchedWeek",
      title: "🎉 Launched This Week",
      icon: "🎉",
      color: "#10b981",
      viewAll: "/updates/launched-week",
    },
    {
      id: "launchedMonth",
      title: "📚 Launched This Month",
      icon: "📚",
      color: "#f59e0b",
      viewAll: "/updates/launched-month",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const updatesData = getUpdatesData();
    setData(updatesData);
  }, []);

  if (!mounted || !data) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`bookqubit-updates ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <div className="updates-header">
        <div className="updates-header-content">
          <h1 className="updates-title">📢 BookQubit Updates</h1>
          <p className="updates-subtitle">Stay updated with the latest books</p>
        </div>
      </div>

      {/* Sections */}
      <div className="updates-sections">
        {sections.map((section) => (
          <div key={section.id} className="updates-section">
            <div className="updates-section-header">
              <h2 className="updates-section-title">{section.title}</h2>
              <Link href={section.viewAll} className="updates-section-link">
                View All <FiArrowRight />
              </Link>
            </div>
            <SectionSlider
              section={section.id}
              data={data[section.id] || []}
              color={section.color}
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="updates-cta">
        <Link href="/updates" className="updates-cta-button">
          <span className="updates-cta-button-bg"></span>
          <span className="updates-cta-button-shine">
            <span className="updates-cta-button-shine-inner"></span>
          </span>
          <span className="updates-cta-button-content">
            <span>📚</span>
            <span>Explore All Updates</span>
            <FiArrowRight className="updates-cta-button-arrow" />
          </span>
        </Link>
        <p className="updates-cta-subtext">
          Discover all the latest book news and releases
        </p>
      </div>
    </div>
  );
}
