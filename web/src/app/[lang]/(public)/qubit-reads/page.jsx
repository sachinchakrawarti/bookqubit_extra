"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight, 
  FiBook, 
  FiBookOpen, 
  FiSmartphone,
  FiCloud,
  FiDownload,
  FiBookmark,
  FiStar,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiHeadphones,
  FiEye,
  FiSearch,
  FiChevronRight
} from "react-icons/fi";
import "./QubitReads.css";

const QubitReadsPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Features
  const features = [
    {
      icon: <FiSmartphone />,
      title: "Read Anywhere",
      description: "Access your library on any device - phone, tablet, or computer",
      color: "#3b82f6",
    },
    {
      icon: <FiCloud />,
      title: "Cloud Sync",
      description: "Your books and progress sync automatically across all devices",
      color: "#8b5cf6",
    },
    {
      icon: <FiBookmark />,
      title: "Smart Bookmarks",
      description: "Never lose your place with intelligent bookmarking",
      color: "#10b981",
    },
    {
      icon: <FiDownload />,
      title: "Offline Reading",
      description: "Download books and read even without internet connection",
      color: "#f59e0b",
    },
  ];

  // Reading Stats
  const stats = [
    { label: "Books Available", value: "50,000+", icon: <FiBook /> },
    { label: "Active Readers", value: "10,000+", icon: <FiUsers /> },
    { label: "Reading Hours", value: "2M+", icon: <FiClock /> },
    { label: "5-Star Reviews", value: "4.8/5", icon: <FiStar /> },
  ];

  // Popular Categories
  const categories = [
    { name: "Fiction", icon: "📖", color: "#3b82f6", count: "12,000+" },
    { name: "Non-Fiction", icon: "📚", color: "#10b981", count: "8,500+" },
    { name: "Comics", icon: "🦸", color: "#ef4444", count: "4,200+" },
    { name: "Academic", icon: "🎓", color: "#8b5cf6", count: "6,800+" },
    { name: "Self-Help", icon: "🧠", color: "#f59e0b", count: "3,500+" },
    { name: "Science Fiction", icon: "🚀", color: "#ec4899", count: "2,900+" },
  ];

  // Trending Books
  const trendingBooks = [
    { title: "The Digital Future", author: "Sarah Chen", readers: "12.5K", image: "📱" },
    { title: "Quantum Dreams", author: "Dr. Raj Patel", readers: "9.8K", image: "🔬" },
    { title: "Stories of Tomorrow", author: "Maria Garcia", readers: "8.2K", image: "🌅" },
    { title: "The Art of Reading", author: "James Wilson", readers: "7.6K", image: "🎨" },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Student",
      comment: "QubitReads has completely transformed how I read. The offline feature is a lifesaver!",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      role: "Book Enthusiast",
      comment: "Finally a reading platform that feels like a real library. Love the cloud sync!",
      rating: 5,
    },
    {
      name: "Dr. Sarah Lee",
      role: "Professor",
      comment: "The academic collection is impressive. My students love using QubitReads.",
      rating: 5,
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
      className={`qubit-reads-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Hero Section */}
      <section className="reads-hero">
        <div className="reads-hero-container">
          <div className="reads-hero-content">
            <span className="reads-hero-badge">
              📚 QubitReads by BookQubit
            </span>
            <h1
              className={`reads-hero-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
            >
              Your Digital{" "}
              <span className="reads-hero-highlight">Reading Companion</span>
            </h1>
            <p
              className={`reads-hero-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              Read thousands of books, comics, and academic resources anywhere, anytime. 
              Experience the future of digital reading.
            </p>
            <div className="reads-hero-buttons">
              <Link
                href={`/${language}/qubit-reads/library`}
                className="reads-hero-btn-primary"
              >
                Start Reading
                <FiArrowRight />
              </Link>
              <Link
                href={`/${language}/qubit-reads/explore`}
                className="reads-hero-btn-secondary"
              >
                Explore Library
              </Link>
            </div>
            <div className="reads-hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="reads-hero-stat">
                  <span className="reads-hero-stat-icon">{stat.icon}</span>
                  <div>
                    <div className="reads-hero-stat-value">{stat.value}</div>
                    <div className="reads-hero-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reads-hero-image">
            <div className="reads-hero-book-animation">
              <div className="reads-hero-book-cover">
                <span>📖</span>
                <div className="reads-hero-book-pages">
                  <span>📄</span>
                  <span>📄</span>
                  <span>📄</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="reads-features">
        <div className="reads-features-header">
          <h2
            className={`reads-features-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            Why Choose <span className="reads-features-highlight">QubitReads</span>
          </h2>
          <p
            className={`reads-features-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Everything you need for an amazing reading experience
          </p>
        </div>
        <div className="reads-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`reads-feature-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
              style={{ borderColor: `${feature.color}30` }}
            >
              <div
                className="reads-feature-icon"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3
                className={`reads-feature-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                {feature.title}
              </h3>
              <p
                className={`reads-feature-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="reads-categories">
        <div className="reads-categories-header">
          <h2
            className={`reads-categories-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            Explore <span className="reads-categories-highlight">Categories</span>
          </h2>
          <Link
            href={`/${language}/qubit-reads/categories`}
            className="reads-categories-view-all"
          >
            View All <FiChevronRight />
          </Link>
        </div>
        <div className="reads-categories-grid">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/${language}/qubit-reads/category/${cat.name.toLowerCase()}`}
              className="reads-category-card"
            >
              <div
                className="reads-category-card-inner"
                style={{
                  backgroundColor: isDarkMode ? `${cat.color}15` : `${cat.color}10`,
                  borderColor: `${cat.color}25`,
                }}
              >
                <div className="reads-category-icon">{cat.icon}</div>
                <h3
                  className="reads-category-name"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </h3>
                <span
                  className="reads-category-count"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Books */}
      <section className="reads-trending">
        <div className="reads-trending-header">
          <h2
            className={`reads-trending-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            🔥 <span className="reads-trending-highlight">Trending Now</span>
          </h2>
          <p
            className={`reads-trending-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Most popular books this week
          </p>
        </div>
        <div className="reads-trending-grid">
          {trendingBooks.map((book, index) => (
            <div
              key={index}
              className={`reads-trending-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            >
              <div className="reads-trending-book-image">{book.image}</div>
              <h4
                className={`reads-trending-book-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                {book.title}
              </h4>
              <p
                className={`reads-trending-book-author ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
              >
                by {book.author}
              </p>
              <div className="reads-trending-book-meta">
                <span className="reads-trending-book-readers">
                  <FiUsers /> {book.readers} readers
                </span>
                <Link
                  href={`/${language}/qubit-reads/book/${book.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="reads-trending-book-btn"
                >
                  Read Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="reads-testimonials">
        <div className="reads-testimonials-header">
          <h2
            className={`reads-testimonials-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            What <span className="reads-testimonials-highlight">Readers Say</span>
          </h2>
        </div>
        <div className="reads-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`reads-testimonial-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            >
              <div className="reads-testimonial-rating">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p
                className={`reads-testimonial-comment ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                "{testimonial.comment}"
              </p>
              <div className="reads-testimonial-author">
                <div className="reads-testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="reads-testimonial-name">{testimonial.name}</div>
                  <div
                    className={`reads-testimonial-role ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="reads-cta">
        <div
          className="reads-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="reads-cta-content">
            <h2 className="reads-cta-title">
              Start Your Reading Journey Today
            </h2>
            <p className="reads-cta-desc">
              Join thousands of readers and access a world of books at your fingertips
            </p>
            <div className="reads-cta-buttons">
              <Link
                href={`/${language}/qubit-reads/signup`}
                className="reads-cta-btn-primary"
              >
                Get Started Free
                <FiArrowRight />
              </Link>
              <Link
                href={`/${language}/qubit-reads/demo`}
                className="reads-cta-btn-secondary"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QubitReadsPage;