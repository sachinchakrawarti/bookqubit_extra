"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";

export default function BookQubitImmersePage() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock data for categories
  const categories = [
    {
      id: "audiobooks",
      title: "Audiobooks",
      icon: "🎧",
      description: "Listen to narrated books",
      color: "#8b5cf6",
      count: 124,
    },
    {
      id: "visualbooks",
      title: "Visual Books",
      icon: "🎨",
      description: "Illustrated & visual stories",
      color: "#3b82f6",
      count: 86,
    },
    {
      id: "explainerbooks",
      title: "Explainer Books",
      icon: "💡",
      description: "Learn concepts easily",
      color: "#f59e0b",
      count: 45,
    },
    {
      id: "summaries",
      title: "Book Summaries",
      icon: "📝",
      description: "Key insights in minutes",
      color: "#ef4444",
      count: 67,
    },
    {
      id: "interactive",
      title: "Interactive Books",
      icon: "🔗",
      description: "Engage with stories",
      color: "#ec4899",
      count: 34,
    },
    {
      id: "podcasts",
      title: "Podcasts",
      icon: "🎙️",
      description: "Author talks & discussions",
      color: "#10b981",
      count: 28,
    },
  ];

  // Mock featured content
  const featuredContent = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      type: "audiobook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.8,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      type: "audiobook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.9,
    },
    {
      id: 3,
      title: "The Art of Storytelling",
      author: "Maya Angelou",
      type: "visualbook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Dune",
      author: "Frank Herbert",
      type: "audiobook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.8,
    },
    {
      id: 5,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      type: "visualbook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.9,
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      type: "audiobook",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      rating: 4.7,
    },
  ];

  // Stats
  const stats = [
    { label: "Total Books", value: "12,450", icon: "📚" },
    { label: "Active Listeners", value: "8,234", icon: "👥" },
    { label: "Hours of Content", value: "45,230", icon: "⏱️" },
    { label: "Languages", value: "12+", icon: "🌍" },
  ];

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`bookqubit-immerse-page ${isDarkMode ? "dark" : ""}`}
    >
      {/* Hero Section */}
      <section className="immerse-hero">
        <div className="immerse-hero-content">
          <h1 className="immerse-hero-title">📖 BookQubit Immerse</h1>
          <p className="immerse-hero-subtitle">
            Dive into stories. Listen. Watch. Learn. Explore.
          </p>
          <div className="immerse-hero-search">
            <input
              type="text"
              placeholder="Search audiobooks, visual books, summaries..."
              className="immerse-search-input"
            />
            <button className="immerse-search-btn">Search</button>
          </div>
          <div className="immerse-hero-stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="immerse-stat">
                <span className="immerse-stat-icon">{stat.icon}</span>
                <div>
                  <span className="immerse-stat-value">{stat.value}</span>
                  <span className="immerse-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="immerse-categories">
        <div className="immerse-section-header">
          <h2>Explore Categories</h2>
          <p>Discover content in every format</p>
        </div>
        <div className="immerse-categories-grid">
          {categories.map((cat) => (
            <Link
              href={`/${cat.id}`}
              key={cat.id}
              className="immerse-category-card"
            >
              <div
                className="immerse-category-icon"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <span style={{ color: cat.color }}>{cat.icon}</span>
              </div>
              <div className="immerse-category-info">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span className="immerse-category-count">
                  {cat.count} items
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Content */}
      <section className="immerse-featured">
        <div className="immerse-section-header">
          <h2>🔥 Featured Content</h2>
          <p>Popular picks for you</p>
        </div>
        <div className="immerse-featured-grid">
          {featuredContent.map((item) => (
            <div key={item.id} className="immerse-featured-card">
              <img
                src={item.cover}
                alt={item.title}
                className="immerse-featured-cover"
              />
              <div className="immerse-featured-info">
                <span className="immerse-featured-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <div className="immerse-featured-rating">⭐ {item.rating}</div>
                <button className="immerse-featured-btn">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="immerse-footer">
        <div className="immerse-footer-content">
          <div className="immerse-footer-section">
            <h4>BookQubit Immerse</h4>
            <p>Your immersive reading experience</p>
          </div>
          <div className="immerse-footer-section">
            <h4>Content</h4>
            <ul>
              <li>
                <Link href="/audiobooks">Audiobooks</Link>
              </li>
              <li>
                <Link href="/visualbooks">Visual Books</Link>
              </li>
              <li>
                <Link href="/explainerbooks">Explainer Books</Link>
              </li>
              <li>
                <Link href="/summaries">Book Summaries</Link>
              </li>
            </ul>
          </div>
          <div className="immerse-footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
          <div className="immerse-footer-section">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
              <li>
                <a href="#">Discord</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="immerse-footer-bottom">
          <p>© 2024 BookQubit Immerse. All rights reserved.</p>
        </div>
      </footer>

      {/* CSS */}
      <style jsx>{`
        .bookqubit-immerse-page {
          min-height: 100vh;
          background: ${isDarkMode ? "#111827" : "#f9fafb"};
          color: ${isDarkMode ? "#f9fafb" : "#111827"};
        }

        .immerse-hero {
          background: linear-gradient(
            135deg,
            ${isDarkMode ? "#1f2937" : "#667eea"} 0%,
            ${isDarkMode ? "#111827" : "#764ba2"} 100%
          );
          padding: 4rem 2rem;
          text-align: center;
        }

        .immerse-hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: white;
        }

        .immerse-hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 2rem;
        }

        .immerse-hero-search {
          display: flex;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .immerse-search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem 0 0 0.5rem;
          font-size: 1rem;
          outline: none;
        }

        .immerse-search-btn {
          padding: 0.75rem 1.5rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0 0.5rem 0.5rem 0;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
        }

        .immerse-hero-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .immerse-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
        }

        .immerse-stat-icon {
          font-size: 1.5rem;
        }

        .immerse-stat-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .immerse-stat-label {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .immerse-section-header {
          text-align: center;
          padding: 3rem 0 2rem;
        }

        .immerse-section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
        }

        .immerse-section-header p {
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
        }

        .immerse-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 0 2rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .immerse-category-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: ${isDarkMode ? "#1f2937" : "white"};
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.3s;
          border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"};
        }

        .immerse-category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .immerse-category-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .immerse-category-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: ${isDarkMode ? "#f9fafb" : "#111827"};
        }

        .immerse-category-info p {
          font-size: 0.75rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          margin: 0.25rem 0;
        }

        .immerse-category-count {
          font-size: 0.65rem;
          color: #3b82f6;
          font-weight: 500;
        }

        .immerse-featured {
          padding: 0 2rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .immerse-featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .immerse-featured-card {
          background: ${isDarkMode ? "#1f2937" : "white"};
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s;
          border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"};
        }

        .immerse-featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .immerse-featured-cover {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .immerse-featured-info {
          padding: 1rem;
        }

        .immerse-featured-type {
          font-size: 0.6rem;
          text-transform: uppercase;
          color: #3b82f6;
          font-weight: 600;
        }

        .immerse-featured-info h3 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.25rem 0;
        }

        .immerse-featured-info p {
          font-size: 0.75rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          margin: 0 0 0.25rem;
        }

        .immerse-featured-rating {
          font-size: 0.75rem;
          color: #f59e0b;
          margin-bottom: 0.5rem;
        }

        .immerse-featured-btn {
          width: 100%;
          padding: 0.375rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .immerse-footer {
          background: ${isDarkMode ? "#1f2937" : "#f3f4f6"};
          padding: 2rem;
          margin-top: 2rem;
        }

        .immerse-footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .immerse-footer-section h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .immerse-footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .immerse-footer-section ul li {
          margin-bottom: 0.25rem;
        }

        .immerse-footer-section ul li a {
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          text-decoration: none;
          font-size: 0.875rem;
        }

        .immerse-footer-section ul li a:hover {
          color: #3b82f6;
        }

        .immerse-footer-bottom {
          text-align: center;
          padding-top: 1.5rem;
          margin-top: 1.5rem;
          border-top: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"};
          font-size: 0.75rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          max-width: 1200px;
          margin: 1.5rem auto 0;
        }

        @media (max-width: 768px) {
          .immerse-hero-title {
            font-size: 2rem;
          }
          .immerse-hero-subtitle {
            font-size: 1rem;
          }
          .immerse-hero-stats {
            gap: 1rem;
          }
          .immerse-stat {
            flex-direction: column;
          }
          .immerse-categories-grid {
            grid-template-columns: 1fr;
          }
          .immerse-featured-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .immerse-hero {
            padding: 2rem 1rem;
          }
          .immerse-hero-title {
            font-size: 1.5rem;
          }
          .immerse-featured-grid {
            grid-template-columns: 1fr;
          }
          .immerse-footer-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
