"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight, 
  FiPenTool, 
  FiBook, 
  FiEdit2, 
  FiScissors,
  FiClipboard,
  FiShoppingBag,
  FiTruck,
  FiStar,
  FiHeart,
  FiGrid,
  FiBox
} from "react-icons/fi";
import "./QubitStationery.css";

const QubitStationeryPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Stationery Categories
  const categories = [
    {
      id: "pens-pencils",
      title: "Pens & Pencils",
      icon: <FiPenTool />,
      description: "Premium writing instruments",
      color: "#3b82f6",
      count: "200+",
      slug: "pens-pencils",
    },
    {
      id: "notebooks",
      title: "Notebooks & Diaries",
      icon: <FiBook />,
      description: "Quality paper for your thoughts",
      color: "#10b981",
      count: "150+",
      slug: "notebooks",
    },
    {
      id: "markers-highlighters",
      title: "Markers & Highlighters",
      icon: <FiEdit2 />,
      description: "Color your studies",
      color: "#ef4444",
      count: "100+",
      slug: "markers-highlighters",
    },
    {
      id: "desk-accessories",
      title: "Desk Accessories",
      icon: <FiGrid />,
      description: "Organize your workspace",
      color: "#8b5cf6",
      count: "80+",
      slug: "desk-accessories",
    },
    {
      id: "art-supplies",
      title: "Art Supplies",
      icon: <FiScissors />,
      description: "For creative minds",
      color: "#f59e0b",
      count: "120+",
      slug: "art-supplies",
    },
    {
      id: "office-essentials",
      title: "Office Essentials",
      icon: <FiBox />,
      description: "Everything for your desk",
      color: "#ec4899",
      count: "90+",
      slug: "office-essentials",
    },
  ];

  // Features
  const features = [
    {
      icon: <FiTruck />,
      title: "Free Delivery",
      description: "On orders above ₹499",
    },
    {
      icon: <FiStar />,
      title: "Premium Quality",
      description: "Curated stationery brands",
    },
    {
      icon: <FiHeart />,
      title: "Loved by Students",
      description: "Trusted by 10,000+ customers",
    },
    {
      icon: <FiShoppingBag />,
      title: "Easy Returns",
      description: "7-day return policy",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`qubit-stationery-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Hero Section */}
      <section className="stationery-hero">
        <div className="stationery-hero-container">
          <div className="stationery-hero-content">
            <span className="stationery-hero-badge">
              ✨ QubitStationery by BookQubit
            </span>
            <h1
              className={`stationery-hero-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
            >
              Premium Stationery for{" "}
              <span className="stationery-hero-highlight">Every Need</span>
            </h1>
            <p
              className={`stationery-hero-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              Discover high-quality pens, notebooks, art supplies & more
            </p>
            <div className="stationery-hero-buttons">
              <Link
                href={`/${language}/qubit-stationery/shop`}
                className="stationery-hero-btn-primary"
              >
                Shop Now
                <FiArrowRight />
              </Link>
              <Link
                href={`/${language}/qubit-stationery/categories`}
                className="stationery-hero-btn-secondary"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="stationery-hero-image">
            <div className="stationery-hero-icon-large">
              ✏️📓🖊️
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="stationery-features">
        <div className="stationery-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`stationery-feature-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            >
              <div className="stationery-feature-icon">{feature.icon}</div>
              <h3
                className={`stationery-feature-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                {feature.title}
              </h3>
              <p
                className={`stationery-feature-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="stationery-categories">
        <div className="stationery-categories-header">
          <h2
            className={`stationery-categories-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            Explore Our <span className="stationery-categories-highlight">Collections</span>
          </h2>
          <p
            className={`stationery-categories-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Find the perfect stationery for your needs
          </p>
        </div>

        <div className="stationery-categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${language}/qubit-stationery/${cat.slug}`}
              className="stationery-category-card"
            >
              <div
                className="stationery-category-card-inner"
                style={{
                  backgroundColor: isDarkMode
                    ? `${cat.color}15`
                    : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                <div
                  className="stationery-category-icon"
                  style={{ color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3
                  className={`stationery-category-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                <p
                  className={`stationery-category-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  {cat.description}
                </p>
                <span
                  className="stationery-category-count"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                  }}
                >
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="stationery-cta">
        <div
          className="stationery-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="stationery-cta-content">
            <h2 className="stationery-cta-title">
              Register Your Stationery Shop
            </h2>
            <p className="stationery-cta-desc">
              Join QubitStationery and reach thousands of customers
            </p>
            <Link
              href={`/${language}/qubit-stationery/register`}
              className="stationery-cta-btn"
            >
              Register Now
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QubitStationeryPage;