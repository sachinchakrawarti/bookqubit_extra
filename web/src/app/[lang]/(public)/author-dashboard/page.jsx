"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight,
  FiBook,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiStar,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiCalendar,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiUpload,
  FiDownload,
  FiShare2,
  FiClock,
  FiAward,
  FiTarget,
  FiMail,
  FiBell,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiLock
} from "react-icons/fi";
import "./AuthorDashboard.css";

const AuthorDashboardPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Author Stats
  const stats = [
    {
      title: "Total Books",
      value: "12",
      icon: <FiBook />,
      change: "+2",
      changeType: "positive",
      color: "#3b82f6",
    },
    {
      title: "Total Readers",
      value: "8,542",
      icon: <FiUsers />,
      change: "+12.5%",
      changeType: "positive",
      color: "#10b981",
    },
    {
      title: "Revenue",
      value: "$4,235",
      icon: <FiDollarSign />,
      change: "+8.3%",
      changeType: "positive",
      color: "#f59e0b",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      icon: <FiStar />,
      change: "+0.2",
      changeType: "positive",
      color: "#8b5cf6",
    },
  ];

  // Recent Books
  const recentBooks = [
    {
      id: 1,
      title: "The Digital Future",
      genre: "Science Fiction",
      price: "$14.99",
      sales: 1234,
      rating: 4.9,
      status: "Published",
      date: "2024-01-15",
      cover: "📱",
    },
    {
      id: 2,
      title: "Stories of Tomorrow",
      genre: "Fiction",
      price: "$12.99",
      sales: 987,
      rating: 4.7,
      status: "Published",
      date: "2024-02-20",
      cover: "🌅",
    },
    {
      id: 3,
      title: "Quantum Dreams",
      genre: "Science Fiction",
      price: "$16.99",
      sales: 756,
      rating: 4.8,
      status: "Draft",
      date: "2024-03-10",
      cover: "🔬",
    },
    {
      id: 4,
      title: "The Art of Writing",
      genre: "Non-Fiction",
      price: "$11.99",
      sales: 543,
      rating: 4.6,
      status: "Published",
      date: "2024-04-05",
      cover: "🎨",
    },
  ];

  // Recent Reviews
  const recentReviews = [
    {
      id: 1,
      book: "The Digital Future",
      reader: "Priya Sharma",
      rating: 5,
      comment: "Absolutely brilliant! A must-read for tech enthusiasts.",
      date: "2024-04-28",
    },
    {
      id: 2,
      book: "Stories of Tomorrow",
      reader: "Amit Kumar",
      rating: 4,
      comment: "Beautiful storytelling with a powerful message.",
      date: "2024-04-25",
    },
    {
      id: 3,
      book: "Quantum Dreams",
      reader: "Dr. Sarah Lee",
      rating: 5,
      comment: "Fascinating concepts presented in an accessible way.",
      date: "2024-04-22",
    },
  ];

  // Activity Timeline
  const activities = [
    {
      id: 1,
      type: "sale",
      message: "New sale: 'The Digital Future' - 15 copies sold",
      time: "2 hours ago",
      icon: <FiTrendingUp />,
      color: "#10b981",
    },
    {
      id: 2,
      type: "review",
      message: "New 5-star review on 'Stories of Tomorrow'",
      time: "4 hours ago",
      icon: <FiStar />,
      color: "#f59e0b",
    },
    {
      id: 3,
      type: "follow",
      message: "500 new followers this week",
      time: "1 day ago",
      icon: <FiUsers />,
      color: "#3b82f6",
    },
    {
      id: 4,
      type: "book",
      message: "Your book 'Quantum Dreams' reached 1,000 sales",
      time: "2 days ago",
      icon: <FiBook />,
      color: "#8b5cf6",
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      title: "New Book",
      icon: <FiPlus />,
      href: "/author-dashboard/new-book",
      color: "#3b82f6",
    },
    {
      title: "Edit Profile",
      icon: <FiUser />,
      href: "/author-dashboard/profile",
      color: "#10b981",
    },
    {
      title: "Upload Cover",
      icon: <FiUpload />,
      href: "/author-dashboard/upload",
      color: "#f59e0b",
    },
    {
      title: "View Analytics",
      icon: <FiBarChart2 />,
      href: "/author-dashboard/analytics",
      color: "#8b5cf6",
    },
  ];

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check if user was previously authenticated (session storage)
    const authStatus = sessionStorage.getItem("authorDashboardAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Save auth status to session storage
  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem("authorDashboardAuth", "true");
    }
  }, [isAuthenticated]);

  if (!mounted) {
    return null;
  }

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div
        className={`author-dashboard-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
        style={{ fontFamily: currentFont?.family }}
      >
        <div className="author-dashboard-password-container">
          <div
            className={`author-dashboard-password-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
          >
            <div className="author-dashboard-password-icon">
              <FiLock />
            </div>
            <h2
              className={`author-dashboard-password-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
            >
              Author Dashboard
            </h2>
            <p
              className={`author-dashboard-password-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              Enter the password to access the author dashboard
            </p>
            <form onSubmit={handlePasswordSubmit} className="author-dashboard-password-form">
              <div className="author-dashboard-password-input-wrapper">
                <FiLock className="author-dashboard-password-input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`author-dashboard-password-input ${theme.background?.input || "bg-gray-50 dark:bg-gray-900"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  autoFocus
                />
              </div>
              {error && (
                <p className="author-dashboard-password-error">{error}</p>
              )}
              <button
                type="submit"
                className="author-dashboard-password-btn"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                    : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                }}
              >
                Unlock Dashboard
                <FiArrowRight />
              </button>
            </form>
            <p
              className={`author-dashboard-password-hint ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-500"}`}
            >
              🔑 Hint: The password is 1234
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`author-dashboard-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      <div className="author-dashboard-container">
        {/* Dashboard Header */}
        <div className="author-dashboard-header">
          <div className="author-dashboard-header-left">
            <h1
              className={`author-dashboard-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
            >
              Author Dashboard
            </h1>
            <p
              className={`author-dashboard-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              Welcome back, Author! Here's what's happening with your books.
            </p>
          </div>
          <div className="author-dashboard-header-right">
            <button
              className="author-dashboard-logout-btn"
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem("authorDashboardAuth");
              }}
            >
              <FiLock />
              Logout
            </button>
            <button className="author-dashboard-notification">
              <FiBell />
              <span className="author-dashboard-notification-badge">3</span>
            </button>
            <Link
              href={`/${language}/author-dashboard/settings`}
              className="author-dashboard-settings"
            >
              <FiSettings />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="author-dashboard-stats">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`author-dashboard-stat-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            >
              <div className="author-dashboard-stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="author-dashboard-stat-info">
                <p
                  className={`author-dashboard-stat-value ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                >
                  {stat.value}
                </p>
                <p
                  className={`author-dashboard-stat-title ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  {stat.title}
                </p>
              </div>
              <div className={`author-dashboard-stat-change ${stat.changeType === 'positive' ? 'positive' : 'negative'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="author-dashboard-quick-actions">
          <h3
            className={`author-dashboard-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            Quick Actions
          </h3>
          <div className="author-dashboard-quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`author-dashboard-quick-action ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                style={{ borderColor: `${action.color}30` }}
              >
                <div
                  className="author-dashboard-quick-action-icon"
                  style={{ backgroundColor: `${action.color}15`, color: action.color }}
                >
                  {action.icon}
                </div>
                <span
                  className={`author-dashboard-quick-action-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                >
                  {action.title}
                </span>
                <FiArrowRight className="author-dashboard-quick-action-arrow" style={{ color: action.color }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="author-dashboard-main-grid">
          {/* Recent Books */}
          <div className="author-dashboard-recent-books">
            <div className="author-dashboard-section-header">
              <h3
                className={`author-dashboard-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Recent Books
              </h3>
              <Link
                href={`/${language}/author-dashboard/books`}
                className="author-dashboard-view-all"
              >
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="author-dashboard-books-list">
              {recentBooks.map((book) => (
                <div
                  key={book.id}
                  className={`author-dashboard-book-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                >
                  <div className="author-dashboard-book-cover">{book.cover}</div>
                  <div className="author-dashboard-book-info">
                    <h4
                      className={`author-dashboard-book-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                    >
                      {book.title}
                    </h4>
                    <p
                      className={`author-dashboard-book-meta ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                    >
                      {book.genre} • {book.date}
                    </p>
                    <div className="author-dashboard-book-stats">
                      <span className="author-dashboard-book-sales">
                        <FiUsers /> {book.sales} sales
                      </span>
                      <span className="author-dashboard-book-rating">
                        <FiStar /> {book.rating}
                      </span>
                      <span
                        className="author-dashboard-book-status"
                        style={{
                          backgroundColor: book.status === 'Published' ? '#10b98120' : '#f59e0b20',
                          color: book.status === 'Published' ? '#10b981' : '#f59e0b',
                        }}
                      >
                        {book.status}
                      </span>
                    </div>
                  </div>
                  <div className="author-dashboard-book-actions">
                    <button className="author-dashboard-book-action-btn" title="Edit">
                      <FiEdit />
                    </button>
                    <button className="author-dashboard-book-action-btn" title="View">
                      <FiEye />
                    </button>
                    <button className="author-dashboard-book-action-btn" title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="author-dashboard-recent-reviews">
            <div className="author-dashboard-section-header">
              <h3
                className={`author-dashboard-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Recent Reviews
              </h3>
              <Link
                href={`/${language}/author-dashboard/reviews`}
                className="author-dashboard-view-all"
              >
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="author-dashboard-reviews-list">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className={`author-dashboard-review-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                >
                  <div className="author-dashboard-review-header">
                    <div className="author-dashboard-reviewer-info">
                      <div className="author-dashboard-reviewer-avatar">
                        {review.reader.charAt(0)}
                      </div>
                      <div>
                        <h4
                          className={`author-dashboard-reviewer-name ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                        >
                          {review.reader}
                        </h4>
                        <p
                          className={`author-dashboard-review-book ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                        >
                          {review.book}
                        </p>
                      </div>
                    </div>
                    <div className="author-dashboard-review-rating">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <p
                    className={`author-dashboard-review-comment ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  >
                    "{review.comment}"
                  </p>
                  <div className="author-dashboard-review-footer">
                    <span
                      className={`author-dashboard-review-date ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                    >
                      <FiCalendar /> {review.date}
                    </span>
                    <button className="author-dashboard-review-reply">
                      <FiMessageCircle /> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="author-dashboard-activity">
            <div className="author-dashboard-section-header">
              <h3
                className={`author-dashboard-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Recent Activity
              </h3>
            </div>
            <div className="author-dashboard-activity-list">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`author-dashboard-activity-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                >
                  <div
                    className="author-dashboard-activity-icon"
                    style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                  >
                    {activity.icon}
                  </div>
                  <div className="author-dashboard-activity-content">
                    <p
                      className={`author-dashboard-activity-message ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                    >
                      {activity.message}
                    </p>
                    <span
                      className={`author-dashboard-activity-time ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                    >
                      <FiClock /> {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Writing Goals */}
          <div className="author-dashboard-goals">
            <div className="author-dashboard-section-header">
              <h3
                className={`author-dashboard-section-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              >
                Writing Goals
              </h3>
              <Link
                href={`/${language}/author-dashboard/goals`}
                className="author-dashboard-view-all"
              >
                Manage <FiArrowRight />
              </Link>
            </div>
            <div className="author-dashboard-goals-list">
              <div className={`author-dashboard-goal-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
                <div className="author-dashboard-goal-info">
                  <div className="author-dashboard-goal-icon">📝</div>
                  <div>
                    <h4 className={`author-dashboard-goal-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
                      Write 10,000 words
                    </h4>
                    <p className={`author-dashboard-goal-progress-text ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                      6,500 / 10,000 words
                    </p>
                  </div>
                </div>
                <div className="author-dashboard-goal-progress">
                  <div className="author-dashboard-goal-progress-bar">
                    <div className="author-dashboard-goal-progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <span className="author-dashboard-goal-percentage">65%</span>
                </div>
              </div>

              <div className={`author-dashboard-goal-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
                <div className="author-dashboard-goal-info">
                  <div className="author-dashboard-goal-icon">📚</div>
                  <div>
                    <h4 className={`author-dashboard-goal-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
                      Complete book draft
                    </h4>
                    <p className={`author-dashboard-goal-progress-text ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                      Chapter 8 / 12 chapters
                    </p>
                  </div>
                </div>
                <div className="author-dashboard-goal-progress">
                  <div className="author-dashboard-goal-progress-bar">
                    <div className="author-dashboard-goal-progress-fill" style={{ width: '66%' }}></div>
                  </div>
                  <span className="author-dashboard-goal-percentage">66%</span>
                </div>
              </div>

              <div className={`author-dashboard-goal-item ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
                <div className="author-dashboard-goal-info">
                  <div className="author-dashboard-goal-icon">🎯</div>
                  <div>
                    <h4 className={`author-dashboard-goal-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}>
                      Monthly sales target
                    </h4>
                    <p className={`author-dashboard-goal-progress-text ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}>
                      850 / 1,000 units
                    </p>
                  </div>
                </div>
                <div className="author-dashboard-goal-progress">
                  <div className="author-dashboard-goal-progress-bar">
                    <div className="author-dashboard-goal-progress-fill" style={{ width: '85%' }}></div>
                  </div>
                  <span className="author-dashboard-goal-percentage">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="author-dashboard-footer-cta">
          <div
            className="author-dashboard-cta-container"
            style={{
              background: isDarkMode
                ? "linear-gradient(135deg, #1e293b, #0f172a)"
                : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            }}
          >
            <div className="author-dashboard-cta-content">
              <h2 className="author-dashboard-cta-title">
                Ready to Publish Your Next Book?
              </h2>
              <p className="author-dashboard-cta-desc">
                Start writing your next masterpiece and reach millions of readers
              </p>
              <Link
                href={`/${language}/author-dashboard/new-book`}
                className="author-dashboard-cta-btn"
              >
                <FiPlus />
                Create New Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboardPage;