// account.jsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiUser,
  FiEdit2,
  FiSettings,
  FiLogOut,
  FiMessageSquare,
  FiBookOpen,
  FiStar,
  FiUsers,
  FiHeart,
  FiTrendingUp,
  FiAward,
  FiBarChart2,
  FiTarget,
  FiZap,
  FiBookmark,
} from "react-icons/fi";

// Import Components
import AccountHeader from "./components/AccountHeader";
import AccountTabs from "./components/AccountTabs";
import ProfileCard from "./components/ProfileCard";
import ProfileSettings from "./components/ProfileSettings";
import DashboardContent from "./components/DashboardContent";
import BookwormContent from "./components/BookwormContent";

import "./components/account.css";

export default function Account() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

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

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <ProfileCard user={user} />
            <ProfileSettings menuItems={profileMenuItems} />
          </>
        );
      case "dashboard":
        return <DashboardContent user={user} menuItems={dashboardItems} />;
      case "bookworm":
        return <BookwormContent user={user} menuItems={bookwormItems} />;
      default:
        return null;
    }
  };

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`account-page ${isDarkMode ? "dark" : ""}`}
    >
      <div className="account-container">
        <AccountHeader />
        <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="account-tab-content">{renderContent()}</div>
      </div>
    </div>
  );
}