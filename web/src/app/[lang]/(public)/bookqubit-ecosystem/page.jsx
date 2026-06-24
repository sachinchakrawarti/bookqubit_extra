"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight,
  FiSearch,
  FiShare2,
  FiGlobe,
  FiPenTool,
  FiBookOpen,
  FiMapPin,
  FiBook,
  FiUsers,
  FiStar,
  FiCloud,
  FiLock,
  FiSmartphone,
  FiGrid,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiDatabase
} from "react-icons/fi";
import "./bookqubit-ecosystem.css";

const BookqubitEcosystemPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Ecosystem Products
  const products = [
    {
      id: "discovery",
      name: "Discovery",
      icon: <FiSearch />,
      description: "Discover books, comics & academic resources",
      href: `/${language}/discovery`,
      color: "#3b82f6",
      category: "reading",
      features: ["Book Search", "Comics", "Academic", "Trending"],
      stats: "1M+ Books",
      badge: "Popular",
    },
    {
      id: "drift",
      name: "Drift",
      icon: <FiShare2 />,
      description: "Social media platform for book lovers",
      href: `/${language}/drift`,
      color: "#10b981",
      category: "social",
      features: ["Connect", "Share", "Reviews", "Groups"],
      stats: "50K+ Users",
      badge: "Social",
    },
    {
      id: "ethos",
      name: "Ethos Web 3.0",
      icon: <FiGlobe />,
      description: "Decentralized reading platform on blockchain",
      href: `/${language}/ethos`,
      color: "#8b5cf6",
      category: "web3",
      features: ["NFT Books", "DAO", "Community", "Rewards"],
      stats: "Web3 Native",
      badge: "Web3",
    },
    {
      id: "stationery",
      name: "Qubit Stationery",
      icon: <FiPenTool />,
      description: "Premium writing materials and office supplies",
      href: `/${language}/qubit-stationery`,
      color: "#f59e0b",
      category: "products",
      features: ["Pens", "Notebooks", "Art", "Office"],
      stats: "500+ Products",
      badge: "Shop",
    },
    {
      id: "reads",
      name: "Qubit Reads",
      icon: <FiBookOpen />,
      description: "Your digital reading platform anywhere",
      href: `/${language}/qubit-reads`,
      color: "#ec4899",
      category: "reading",
      features: ["E-books", "Library", "Offline", "Sync"],
      stats: "10K+ Readers",
      badge: "Read",
    },
    {
      id: "library",
      name: "Physical Library",
      icon: <FiMapPin />,
      description: "Find BookQubit libraries in every city",
      href: `/${language}/bookqubit-library`,
      color: "#06b6d4",
      category: "products",
      features: ["11 Cities", "50K Books", "Membership", "Events"],
      stats: "11+ Cities",
      badge: "Locations",
    },
  ];

  // Ecosystem Stats
  const stats = [
    { label: "Products", value: "6", icon: <FiGrid /> },
    { label: "Books Available", value: "1M+", icon: <FiBook /> },
    { label: "Active Users", value: "100K+", icon: <FiUsers /> },
    { label: "Satisfaction Rate", value: "98%", icon: <FiStar /> },
  ];

  // Features
  const features = [
    {
      icon: <FiCloud />,
      title: "Cloud Sync",
      description: "Your data syncs across all platforms seamlessly",
    },
    {
      icon: <FiUsers />,
      title: "Community First",
      description: "Built for readers, by readers - join the family",
    },
    {
      icon: <FiLock />,
      title: "Secure & Private",
      description: "Your data is always protected and private",
    },
    {
      icon: <FiSmartphone />,
      title: "Any Device",
      description: "Read on phone, tablet, or computer anytime",
    },
  ];

  // Filter products by category
  const getFilteredProducts = (category) => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  };

  const filteredProducts = getFilteredProducts(activeTab);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bookqubit-ecosystem-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Hero Section */}
      <section className="eco-hero">
        <div className="eco-hero-container">
          <div className="eco-hero-content">
            <span className="eco-hero-badge">🌐 BookQubit Ecosystem</span>
            <h1 className="eco-hero-title">
              One Platform.{" "}
              <span className="eco-hero-highlight">Endless Possibilities</span>
            </h1>
            <p className="eco-hero-desc">
              Discover the complete BookQubit ecosystem — from reading to writing,
              from digital to physical, from Web2 to Web3.
            </p>
            <div className="eco-hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="eco-hero-stat">
                  <span className="eco-hero-stat-icon">{stat.icon}</span>
                  <div>
                    <div className="eco-hero-stat-value">{stat.value}</div>
                    <div className="eco-hero-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="eco-hero-image">
            <div className="eco-hero-icon-large">📚</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="eco-tabs-section">
        <div className="eco-tabs-container">
          <div className="eco-tabs">
            <button
              className={`eco-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Products
            </button>
            <button
              className={`eco-tab ${activeTab === "reading" ? "active" : ""}`}
              onClick={() => setActiveTab("reading")}
            >
              <FiBookOpen /> Reading
            </button>
            <button
              className={`eco-tab ${activeTab === "social" ? "active" : ""}`}
              onClick={() => setActiveTab("social")}
            >
              <FiUsers /> Social
            </button>
            <button
              className={`eco-tab ${activeTab === "web3" ? "active" : ""}`}
              onClick={() => setActiveTab("web3")}
            >
              <FiGlobe /> Web 3.0
            </button>
            <button
              className={`eco-tab ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <FiGrid /> Products
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="eco-products">
        <div className="eco-products-container">
          <div className="eco-products-grid">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="eco-product-card"
              >
                <div
                  className={`eco-product-card-inner ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                  style={{ borderColor: `${product.color}30` }}
                >
                  {product.badge && (
                    <span
                      className="eco-product-badge"
                      style={{
                        backgroundColor: `${product.color}20`,
                        color: product.color,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div
                    className="eco-product-icon"
                    style={{
                      backgroundColor: `${product.color}15`,
                      color: product.color,
                    }}
                  >
                    {product.icon}
                  </div>
                  <h3
                    className="eco-product-name"
                    style={{ color: product.color }}
                  >
                    {product.name}
                  </h3>
                  <p className="eco-product-desc">{product.description}</p>
                  <div className="eco-product-features">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="eco-product-feature"
                        style={{
                          backgroundColor: `${product.color}15`,
                          color: product.color,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="eco-product-footer">
                    <span
                      className="eco-product-stats"
                      style={{ color: product.color }}
                    >
                      {product.stats}
                    </span>
                    <span
                      className="eco-product-arrow"
                      style={{ color: product.color }}
                    >
                      <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="eco-features">
        <div className="eco-features-container">
          <div className="eco-features-header">
            <h2 className="eco-features-title">
              Built for the <span className="eco-features-highlight">Future</span>
            </h2>
            <p className="eco-features-subtitle">
              Everything you need for an amazing reading experience
            </p>
          </div>
          <div className="eco-features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`eco-feature-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
              >
                <div className="eco-feature-icon">{feature.icon}</div>
                <h4 className="eco-feature-name">{feature.title}</h4>
                <p className="eco-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="eco-cta">
        <div
          className="eco-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="eco-cta-content">
            <h2 className="eco-cta-title">Join the BookQubit Ecosystem</h2>
            <p className="eco-cta-desc">
              Be part of a growing community of readers, writers, and book lovers.
              Start your journey today.
            </p>
            <div className="eco-cta-buttons">
              <Link
                href={`/${language}/discovery`}
                className="eco-cta-btn-primary"
              >
                Explore Now <FiArrowRight />
              </Link>
              <Link
                href={`/${language}/signup`}
                className="eco-cta-btn-secondary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookqubitEcosystemPage;