"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBookOpen,
  FiStar,
  FiUsers,
  FiHeart,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiEdit2,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiBookmark,
  FiMessageSquare,
  FiThumbsUp,
  FiBarChart2,
  FiTarget,
  FiZap,
} from "react-icons/fi"; // Removed FiTrophy
import "./account.css";

export default function Account() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // User data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=120",
    joinDate: "January 2024",
    bio: "Passionate reader and book lover. Always looking for the next great story to dive into.",
    location: "New York, USA",
    stats: {
      booksRead: 127,
      reviews: 48,
      followers: 342,
      following: 156,
      readingStreak: 15,
      totalPages: 45230,
      badges: 12,
      ranking: 42,
    },
    favoriteGenres: ["Fiction", "Science Fiction", "Fantasy", "Mystery"],
  };

  // Profile Menu Items
  const profileMenuItems = [
    {
      id: "edit_profile",
      label: "Edit Profile",
      icon: <FiEdit2 />,
      link: "/account/edit",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FiSettings />,
      link: "/account/settings",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FiMessageSquare />,
      link: "/account/notifications",
      badge: 3,
    },
    {
      id: "logout",
      label: "Logout",
      icon: <FiLogOut />,
      link: "/logout",
      isLogout: true,
    },
  ];

  // Dashboard Menu Items
  const dashboardItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FiBarChart2 />,
      link: "/dashboard",
    },
    {
      id: "my_books",
      label: "My Books",
      icon: <FiBookOpen />,
      link: "/dashboard/books",
      count: user.stats.booksRead,
    },
    {
      id: "reading_stats",
      label: "Reading Stats",
      icon: <FiTrendingUp />,
      link: "/dashboard/stats",
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      icon: <FiBookmark />,
      link: "/dashboard/bookmarks",
    },
    {
      id: "reviews",
      label: "My Reviews",
      icon: <FiStar />,
      link: "/dashboard/reviews",
      count: user.stats.reviews,
    },
    {
      id: "followers",
      label: "Followers",
      icon: <FiUsers />,
      link: "/dashboard/followers",
      count: user.stats.followers,
    },
    {
      id: "following",
      label: "Following",
      icon: <FiHeart />,
      link: "/dashboard/following",
      count: user.stats.following,
    },
  ];

  // Bookworm Menu Items
  const bookwormItems = [
    {
      id: "my_rank",
      label: "My Rank",
      icon: <FiAward />,
      link: "/bookworm/rank",
      value: `#${user.stats.ranking}`,
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <FiTrendingUp />,
      link: "/bookworm/leaderboard",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <FiAward />,
      link: "/bookworm/achievements",
      count: user.stats.badges,
    },
    {
      id: "reading_challenge",
      label: "Reading Challenge",
      icon: <FiTarget />,
      link: "/bookworm/challenge",
    },
    {
      id: "reading_streak",
      label: "Reading Streak",
      icon: <FiZap />,
      link: "/bookworm/streak",
      value: `${user.stats.readingStreak} days`,
    },
    {
      id: "badges",
      label: "Badges",
      icon: <FiAward />,
      link: "/bookworm/badges",
      count: user.stats.badges,
    },
    {
      id: "bookworm_points",
      label: "Bookworm Points",
      icon: <FiStar />,
      link: "/bookworm/points",
      value: "2,450",
    },
    {
      id: "share_progress",
      label: "Share Progress",
      icon: <FiHeart />,
      link: "/bookworm/share",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`account-page ${isDarkMode ? "dark" : ""}`}
    >
      <div className="account-container">
        {/* Header */}
        <div className="account-header">
          <h1 className="account-title">👤 Account</h1>
          <p className="account-subtitle">
            Manage your profile, dashboard & bookworm journey
          </p>
        </div>

        {/* Profile Card */}
        <div className="account-profile-card">
          <div className="account-profile-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="account-profile-info">
            <h2 className="account-profile-name">{user.name}</h2>
            <p className="account-profile-email">{user.email}</p>
            <p className="account-profile-bio">{user.bio}</p>
            <div className="account-profile-meta">
              <span className="account-profile-location">
                <FiUser /> {user.location}
              </span>
              <span className="account-profile-join">
                <FiCalendar /> Joined {user.joinDate}
              </span>
            </div>
            <div className="account-profile-genres">
              {user.favoriteGenres.map((genre, idx) => (
                <span key={idx} className="account-profile-genre-tag">
                  {genre}
                </span>
              ))}
            </div>
            <button className="account-profile-edit-btn">
              <FiEdit2 /> Edit Profile
            </button>
          </div>
          <div className="account-profile-stats">
            <div className="account-stat-item">
              <span className="account-stat-value">{user.stats.booksRead}</span>
              <span className="account-stat-label">Books Read</span>
            </div>
            <div className="account-stat-item">
              <span className="account-stat-value">{user.stats.reviews}</span>
              <span className="account-stat-label">Reviews</span>
            </div>
            <div className="account-stat-item">
              <span className="account-stat-value">{user.stats.followers}</span>
              <span className="account-stat-label">Followers</span>
            </div>
            <div className="account-stat-item">
              <span className="account-stat-value">#{user.stats.ranking}</span>
              <span className="account-stat-label">Rank</span>
            </div>
          </div>
        </div>

        {/* Dashboard Card */}
        <div className="account-card">
          <div className="account-card-header">
            <div className="account-card-title-section">
              <FiBarChart2
                className="account-card-icon"
                style={{ color: "#3b82f6" }}
              />
              <h3 className="account-card-title">Dashboard</h3>
            </div>
            <Link href="/dashboard" className="account-card-view-all">
              View All <FiChevronRight />
            </Link>
          </div>
          <div className="account-card-content">
            <div className="account-card-stats">
              <div className="account-card-stat">
                <FiBookOpen />
                <div>
                  <span>{user.stats.booksRead}</span>
                  <span>Books Read</span>
                </div>
              </div>
              <div className="account-card-stat">
                <FiStar />
                <div>
                  <span>{user.stats.reviews}</span>
                  <span>Reviews</span>
                </div>
              </div>
              <div className="account-card-stat">
                <FiHeart />
                <div>
                  <span>{user.stats.following}</span>
                  <span>Following</span>
                </div>
              </div>
            </div>
            <div className="account-card-menu">
              {dashboardItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="account-card-menu-item"
                >
                  <span className="account-card-menu-icon">{item.icon}</span>
                  <span className="account-card-menu-label">{item.label}</span>
                  {item.count && (
                    <span className="account-card-menu-count">
                      {item.count}
                    </span>
                  )}
                  <FiChevronRight className="account-card-menu-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bookworm Card */}
        <div className="account-card">
          <div className="account-card-header">
            <div className="account-card-title-section">
              <FiAward
                className="account-card-icon"
                style={{ color: "#f59e0b" }}
              />
              <h3 className="account-card-title">Bookworm</h3>
            </div>
            <Link href="/bookworm" className="account-card-view-all">
              View All <FiChevronRight />
            </Link>
          </div>
          <div className="account-card-content">
            <div className="account-bookworm-stats">
              <div className="account-bookworm-stat">
                <FiAward />
                <div>
                  <span>#{user.stats.ranking}</span>
                  <span>Global Rank</span>
                </div>
              </div>
              <div className="account-bookworm-stat">
                <FiAward />
                <div>
                  <span>{user.stats.badges}</span>
                  <span>Badges Earned</span>
                </div>
              </div>
              <div className="account-bookworm-stat">
                <FiZap />
                <div>
                  <span>{user.stats.readingStreak}</span>
                  <span>Day Streak</span>
                </div>
              </div>
            </div>
            <div className="account-card-menu">
              {bookwormItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="account-card-menu-item"
                >
                  <span className="account-card-menu-icon">{item.icon}</span>
                  <span className="account-card-menu-label">{item.label}</span>
                  {item.count && (
                    <span className="account-card-menu-count">
                      {item.count}
                    </span>
                  )}
                  {item.value && (
                    <span className="account-card-menu-value">
                      {item.value}
                    </span>
                  )}
                  <FiChevronRight className="account-card-menu-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Menu Card */}
        <div className="account-card">
          <div className="account-card-header">
            <div className="account-card-title-section">
              <FiUser
                className="account-card-icon"
                style={{ color: "#8b5cf6" }}
              />
              <h3 className="account-card-title">Profile Settings</h3>
            </div>
          </div>
          <div className="account-card-content">
            <div className="account-card-menu">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className={`account-card-menu-item ${item.isLogout ? "logout" : ""}`}
                >
                  <span className="account-card-menu-icon">{item.icon}</span>
                  <span className="account-card-menu-label">{item.label}</span>
                  {item.badge && (
                    <span className="account-card-menu-badge">
                      {item.badge}
                    </span>
                  )}
                  <FiChevronRight className="account-card-menu-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
