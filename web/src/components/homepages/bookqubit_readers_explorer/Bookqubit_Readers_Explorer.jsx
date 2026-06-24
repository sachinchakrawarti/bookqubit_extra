"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiArrowRight,
  FiUsers,
  FiBookOpen,
  FiHeart,
  FiUserPlus,
} from "react-icons/fi";
import "./bookqubit_readers_explorer.css";

const BookqubitReadersExplorer = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Categories
  const categories = [
    {
      id: "collectives",
      title: "Collective Library",
      icon: "📚",
      description: "Build and share book collections",
      color: "#3b82f6",
      count: "150+",
      slug: "collective",
    },
    {
      id: "readers",
      title: "Readers",
      icon: "👥",
      description: "Connect with fellow readers",
      color: "#8b5cf6",
      count: "2.5K+",
      slug: "readers",
    },
    {
      id: "bookclubs",
      title: "Book Clubs",
      icon: "🏛️",
      description: "Join reading communities",
      color: "#10b981",
      count: "85+",
      slug: "bookclubs",
    },
    {
      id: "challenges",
      title: "Reading Challenges",
      icon: "🎯",
      description: "Participate in reading goals",
      color: "#f59e0b",
      count: "45+",
      slug: "challenges",
    },
  ];

  // Featured Collective Libraries
  const featuredLibraries = [
    {
      id: 1,
      name: "Classic Literature Collective",
      owner: "Priya Sharma",
      cover:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
      books: 12,
      members: 45,
      likes: 342,
    },
    {
      id: 2,
      name: "Sci-Fi Universe Collective",
      owner: "Amit Patel",
      cover:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
      books: 8,
      members: 67,
      likes: 567,
    },
    {
      id: 3,
      name: "Fantasy World Collective",
      owner: "Sarah Williams",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      books: 15,
      members: 89,
      likes: 789,
    },
    {
      id: 4,
      name: "Mystery & Thriller Collective",
      owner: "Ishani Krishna",
      cover:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      books: 10,
      members: 56,
      likes: 456,
    },
  ];

  // Active Readers
  const activeReaders = [
    {
      id: 101,
      name: "Priya Sharma",
      username: "@priya_reads",
      avatar:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff",
      booksRead: 127,
      followers: 342,
    },
    {
      id: 102,
      name: "Amit Patel",
      username: "@amit_sci_fi",
      avatar:
        "https://ui-avatars.com/api/?name=Amit+Patel&background=3b82f6&color=fff",
      booksRead: 89,
      followers: 234,
    },
    {
      id: 103,
      name: "Sarah Williams",
      username: "@sarah_fantasy",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Williams&background=10b981&color=fff",
      booksRead: 156,
      followers: 567,
    },
    {
      id: 104,
      name: "Ishani Krishna",
      username: "@ishani_mystery",
      avatar:
        "https://ui-avatars.com/api/?name=Ishani+Krishna&background=ef4444&color=fff",
      booksRead: 98,
      followers: 289,
    },
    {
      id: 105,
      name: "Hania Amir",
      username: "@hania_romance",
      avatar:
        "https://ui-avatars.com/api/?name=Hania+Amir&background=ec4899&color=fff",
      booksRead: 112,
      followers: 423,
    },
    {
      id: 106,
      name: "Sachin Chakrawarti",
      username: "@sachin_selfhelp",
      avatar:
        "https://ui-avatars.com/api/?name=Sachin+Chakrawarti&background=1e293b&color=fff",
      booksRead: 67,
      followers: 178,
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
      className={`bookqubit-readers-explorer ${theme.background?.section || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="readers-container">
        {/* Header */}
        <div className="readers-header">
          <div className="readers-header-icon">👥</div>
          <h2
            className={`readers-header-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            BookQubit <span className="highlight">Readers</span>
          </h2>
          <p
            className={`readers-header-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Connect with readers, join collectives & share your reading journey
          </p>
          <div className="readers-header-divider"></div>
        </div>

        {/* Categories Grid */}
        <div className="readers-categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collective/${cat.slug}`}
              className="readers-category-card"
            >
              <div
                className="readers-category-card-inner"
                style={{
                  backgroundColor: isDarkMode
                    ? `${cat.color}15`
                    : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                <div
                  className="readers-category-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.color}25, transparent 70%)`,
                  }}
                />
                <div className="readers-category-icon">{cat.icon}</div>
                <h3
                  className={`readers-category-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                <p
                  className={`readers-category-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  {cat.description}
                </p>
                <span
                  className="readers-category-count"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                  }}
                >
                  {cat.count}
                </span>
                <div
                  className="readers-category-arrow"
                  style={{ color: cat.color }}
                >
                  <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Collectives - Links to /collective/[id] */}
        <div className="readers-featured">
          <div className="readers-section-header">
            <div className="readers-section-title-group">
              <span className="readers-section-icon">📚</span>
              <h3
                className={`readers-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Featured Collective Libraries
              </h3>
            </div>
            <Link href="/collective" className="readers-section-link">
              View All →
            </Link>
          </div>
          <div className="readers-featured-grid">
            {featuredLibraries.map((library) => (
              <Link
                key={library.id}
                href={`/collective/${library.id}`}
                className="readers-featured-card"
              >
                <div className="readers-featured-cover">
                  <img src={library.cover} alt={library.name} />
                  <span className="readers-featured-badge">⭐ Featured</span>
                </div>
                <div className="readers-featured-content">
                  <h4
                    className={`readers-featured-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  >
                    {library.name}
                  </h4>
                  <p
                    className={`readers-featured-owner ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                  >
                    by {library.owner}
                  </p>
                  <div className="readers-featured-stats">
                    <span>
                      <FiBookOpen /> {library.books}
                    </span>
                    <span>
                      <FiUsers /> {library.members}
                    </span>
                    <span>
                      <FiHeart /> {library.likes}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Readers */}
        <div className="readers-active">
          <div className="readers-section-header">
            <div className="readers-section-title-group">
              <span className="readers-section-icon">👥</span>
              <h3
                className={`readers-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Active Readers
              </h3>
            </div>
            <Link href="/readers" className="readers-section-link">
              View All →
            </Link>
          </div>
          <div className="readers-active-grid">
            {activeReaders.slice(0, 4).map((reader) => (
              <Link
                key={reader.id}
                href={`/profile/${reader.username}`}
                className="readers-active-card"
              >
                <div className="readers-active-avatar">
                  <img src={reader.avatar} alt={reader.name} />
                </div>
                <div className="readers-active-info">
                  <h4
                    className={`readers-active-name ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  >
                    {reader.name}
                  </h4>
                  <p
                    className={`readers-active-username ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                  >
                    {reader.username}
                  </p>
                  <div className="readers-active-stats">
                    <span>📚 {reader.booksRead}</span>
                    <span>👤 {reader.followers}</span>
                  </div>
                  <button className="readers-active-follow-btn">
                    <FiUserPlus /> Follow
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="readers-cta">
          <Link href="/collective" className="readers-cta-button">
            <span className="readers-cta-button-bg"></span>
            <span className="readers-cta-button-shine">
              <span className="readers-cta-button-shine-inner"></span>
            </span>
            <span className="readers-cta-button-content">
              <span>📚</span>
              <span>Explore Collective Library</span>
              <FiArrowRight className="readers-cta-button-arrow" />
            </span>
          </Link>
          <p
            className={`readers-cta-subtext ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}`}
          >
            Connect with readers, join collectives & share your reading journey
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookqubitReadersExplorer;
