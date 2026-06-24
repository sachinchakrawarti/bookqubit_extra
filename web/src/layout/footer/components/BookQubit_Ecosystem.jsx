"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FiArrowRight, 
  FiSearch, 
  FiShare2, 
  FiGlobe,
  FiPenTool,
  FiBookOpen,
  FiMapPin,
  FiShoppingCart,
  FiUser,
  FiHome
} from "react-icons/fi";
import "./BookQubit_Ecosystem.css";

const BookQubitEcosystem = () => {
  const { theme, themeName } = useTheme();
  const { language } = useLanguage();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const products = [
    {
      id: "discovery",
      name: "Discovery",
      icon: <FiSearch />,
      desc: "Books, Comics & Academic",
      href: `/${language}/discovery`,
      color: "#3b82f6",
    },
    {
      id: "drift",
      name: "Drift",
      icon: <FiShare2 />,
      desc: "Social Media for Readers",
      href: `/${language}/drift`,
      color: "#10b981",
    },
    {
      id: "ethos",
      name: "Ethos Web 3.0",
      icon: <FiGlobe />,
      desc: "Decentralized Reading",
      href: `/${language}/ethos`,
      color: "#8b5cf6",
    },
    {
      id: "stationery",
      name: "Qubit Stationery",
      icon: <FiPenTool />,
      desc: "Premium Writing Materials",
      href: `/${language}/qubit-stationery`,
      color: "#f59e0b",
    },
    {
      id: "reads",
      name: "Qubit Reads",
      icon: <FiBookOpen />,
      desc: "Digital Reading Platform",
      href: `/${language}/qubit-reads`,
      color: "#ec4899",
    },
    {
      id: "library",
      name: "Physical Library",
      icon: <FiMapPin />,
      desc: "Find Libraries in Every City",
      href: `/${language}/bookqubit-library`,
      color: "#06b6d4",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      icon: <FiShoppingCart />,
      desc: "Buy & Sell Books",
      href: `/${language}/bookqubit-marketplace`,
      color: "#f97316",
    },
    {
      id: "author-dashboard",
      name: "Author Dashboard",
      icon: <FiUser />,
      desc: "Manage Your Books & Sales",
      href: `/${language}/author-dashboard`,
      color: "#a855f7",
    },
    {
      id: "store",
      name: "Local Store",
      icon: <FiHome />,
      desc: "Find Bookstores Near You",
      href: `/${language}/bookqubit-store`,
      color: "#14b8a6",
    },
  ];

  return (
    <section className={`bookqubit-ecosystem ${isDarkMode ? 'dark' : ''}`}>
      <div className="bookqubit-ecosystem-container">
        {/* Header */}
        <div className="bookqubit-ecosystem-header">
          <span className="bookqubit-ecosystem-badge">🌐 BookQubit Ecosystem</span>
          <h2 className="bookqubit-ecosystem-title">
            One Platform. <span>Endless Possibilities</span>
          </h2>
          <p className="bookqubit-ecosystem-subtitle">
            Explore our complete ecosystem of reading, writing, and community tools
          </p>
        </div>

        {/* Grid */}
        <div className="bookqubit-ecosystem-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="bookqubit-ecosystem-card"
            >
              <div
                className="bookqubit-ecosystem-card-inner"
                style={{
                  borderColor: `${product.color}30`,
                  backgroundColor: isDarkMode ? `${product.color}10` : `${product.color}08`,
                }}
              >
                <div
                  className="bookqubit-ecosystem-card-icon"
                  style={{ color: product.color }}
                >
                  {product.icon}
                </div>
                <div className="bookqubit-ecosystem-card-content">
                  <h3 className="bookqubit-ecosystem-card-title" style={{ color: product.color }}>
                    {product.name}
                  </h3>
                  <p className="bookqubit-ecosystem-card-desc">{product.desc}</p>
                </div>
                <div className="bookqubit-ecosystem-card-arrow-wrapper">
                  <FiArrowRight className="bookqubit-ecosystem-card-arrow" style={{ color: product.color }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="bookqubit-ecosystem-stats">
          <div className="bookqubit-ecosystem-stat">
            <span className="bookqubit-ecosystem-stat-number">9+</span>
            <span className="bookqubit-ecosystem-stat-label">Products</span>
          </div>
          <div className="bookqubit-ecosystem-stat">
            <span className="bookqubit-ecosystem-stat-number">1M+</span>
            <span className="bookqubit-ecosystem-stat-label">Books</span>
          </div>
          <div className="bookqubit-ecosystem-stat">
            <span className="bookqubit-ecosystem-stat-number">100K+</span>
            <span className="bookqubit-ecosystem-stat-label">Users</span>
          </div>
          <div className="bookqubit-ecosystem-stat">
            <span className="bookqubit-ecosystem-stat-number">98%</span>
            <span className="bookqubit-ecosystem-stat-label">Satisfaction</span>
          </div>
        </div>

        {/* CTA */}
        <div className="bookqubit-ecosystem-cta">
          <Link
            href={`/${language}/bookqubit-ecosystem`}
            className="bookqubit-ecosystem-cta-btn"
            style={{
              background: isDarkMode
                ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            }}
          >
            Explore the Ecosystem <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookQubitEcosystem;