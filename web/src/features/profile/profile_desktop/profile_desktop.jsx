"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiUser,
  FiBookOpen,
  FiHeart,
  FiStar,
  FiClock,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiBookmark,
  FiEye,
  FiMessageSquare,
  FiUsers,
  FiBarChart2,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { FaUserCircle, FaBookReader, FaGraduationCap } from "react-icons/fa";
import ProfileSidebarDesktop from "./components/profile_slidebar_desktop";
import "./profile_desktop.css";

const ProfileDesktop = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [windowWidth, setWindowWidth] = useState(1280);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock user data (would come from API)
  const userData = {
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&size=128&background=3b82f6&color=fff",
    location: "New York, USA",
    joined: "January 2024",
    bio: "Book lover, avid reader, and tech enthusiast. Exploring the world through words.",
    occupation: "Software Engineer",
    readingGoal: 50,
    booksRead: 32,
    totalBooks: 32,
    favoriteGenres: ["Fiction", "Science", "Technology", "History"],
    stats: {
      booksRead: 32,
      pagesRead: 12450,
      readingTime: "456 hrs",
      reviews: 18,
      followers: 156,
      following: 89,
    },
    recentActivity: [
      { type: "read", book: "The Alchemist", date: "2 hours ago" },
      { type: "review", book: "Atomic Habits", date: "5 hours ago" },
      { type: "added", book: "Dune", date: "1 day ago" },
      { type: "reading", book: "The Psychology of Money", date: "2 days ago" },
    ],
    readingList: [
      { title: "The Alchemist", author: "Paulo Coelho", progress: 100 },
      { title: "Atomic Habits", author: "James Clear", progress: 80 },
      { title: "Dune", author: "Frank Herbert", progress: 45 },
      { title: "The Psychology of Money", author: "Morgan Housel", progress: 30 },
    ],
  };

  // Translations (would be imported from translations file)
  const translations = useMemo(() => ({
    en: {
      title: "Profile",
      overview: "Overview",
      readingList: "Reading List",
      activity: "Activity",
      stats: "Stats",
      settings: "Settings",
      editProfile: "Edit Profile",
      logout: "Logout",
      memberSince: "Member since",
      location: "Location",
      occupation: "Occupation",
      bio: "Bio",
      booksRead: "Books Read",
      pagesRead: "Pages Read",
      readingTime: "Reading Time",
      reviews: "Reviews",
      followers: "Followers",
      following: "Following",
      readingGoal: "Reading Goal",
      recentActivity: "Recent Activity",
      favoriteGenres: "Favorite Genres",
      currentlyReading: "Currently Reading",
      completed: "Completed",
      inProgress: "In Progress",
      wantToRead: "Want to Read",
      viewAll: "View All",
      achievements: "Achievements",
      noActivity: "No recent activity",
      startReading: "Start Reading",
      exploreBooks: "Explore Books",
    },
    hi: {
      title: "प्रोफ़ाइल",
      overview: "अवलोकन",
      readingList: "रीडिंग लिस्ट",
      activity: "गतिविधि",
      stats: "आंकड़े",
      settings: "सेटिंग्स",
      editProfile: "प्रोफ़ाइल संपादित करें",
      logout: "लॉगआउट",
      memberSince: "सदस्य",
      location: "स्थान",
      occupation: "पेशा",
      bio: "जीवनी",
      booksRead: "पढ़ी गई किताबें",
      pagesRead: "पढ़े गए पृष्ठ",
      readingTime: "पढ़ने का समय",
      reviews: "समीक्षाएं",
      followers: "फॉलोअर्स",
      following: "फॉलोइंग",
      readingGoal: "रीडिंग लक्ष्य",
      recentActivity: "हाल की गतिविधि",
      favoriteGenres: "पसंदीदा शैलियाँ",
      currentlyReading: "अभी पढ़ रहे हैं",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      wantToRead: "पढ़ना चाहते हैं",
      viewAll: "सभी देखें",
      achievements: "उपलब्धियां",
      noActivity: "कोई हाल की गतिविधि नहीं",
      startReading: "पढ़ना शुरू करें",
      exploreBooks: "किताबें खोजें",
    },
    ur: {
      title: "پروفائل",
      overview: "جائزہ",
      readingList: "ریڈنگ لسٹ",
      activity: "سرگرمی",
      stats: "اعداد و شمار",
      settings: "ترتیبات",
      editProfile: "پروفائل میں ترمیم کریں",
      logout: "لاگ آؤٹ",
      memberSince: "رکن از",
      location: "مقام",
      occupation: "پیشہ",
      bio: "سوانح",
      booksRead: "پڑھی گئی کتابیں",
      pagesRead: "پڑھے گئے صفحات",
      readingTime: "پڑھنے کا وقت",
      reviews: "جائزے",
      followers: "پیروکار",
      following: "پیروی",
      readingGoal: "پڑھنے کا ہدف",
      recentActivity: "حالیہ سرگرمی",
      favoriteGenres: "پسندیدہ اصناف",
      currentlyReading: "ابھی پڑھ رہے ہیں",
      completed: "مکمل",
      inProgress: "جاری",
      wantToRead: "پڑھنا چاہتے ہیں",
      viewAll: "سب دیکھیں",
      achievements: "کامیابیاں",
      noActivity: "کوئی حالیہ سرگرمی نہیں",
      startReading: "پڑھنا شروع کریں",
      exploreBooks: "کتابیں دریافت کریں",
    }
  }), []);

  const t = translations[language] || translations.en;

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (!mounted || !theme) {
    return null;
  }

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  // Tab content renderer
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="profile-content-overview">
            {/* Stats Grid */}
            <div className="profile-stats-grid">
              <div className={`profile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-stat-icon" style={{ color: '#3b82f6' }}>
                  <FiBookOpen size={24} />
                </div>
                <div className="profile-stat-info">
                  <span className={`profile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.booksRead}
                  </span>
                  <span className={`profile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.booksRead}
                  </span>
                </div>
              </div>
              <div className={`profile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-stat-icon" style={{ color: '#10b981' }}>
                  <FaBookReader size={24} />
                </div>
                <div className="profile-stat-info">
                  <span className={`profile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.pagesRead}
                  </span>
                  <span className={`profile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.pagesRead}
                  </span>
                </div>
              </div>
              <div className={`profile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-stat-icon" style={{ color: '#8b5cf6' }}>
                  <FiClock size={24} />
                </div>
                <div className="profile-stat-info">
                  <span className={`profile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.readingTime}
                  </span>
                  <span className={`profile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.readingTime}
                  </span>
                </div>
              </div>
              <div className={`profile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-stat-icon" style={{ color: '#f59e0b' }}>
                  <FiStar size={24} />
                </div>
                <div className="profile-stat-info">
                  <span className={`profile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.reviews}
                  </span>
                  <span className={`profile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.reviews}
                  </span>
                </div>
              </div>
            </div>

            {/* Reading Goal Progress */}
            <div className={`profile-goal-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-goal-header">
                <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                  {t.readingGoal}
                </h3>
                <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {userData.booksRead} / {userData.readingGoal} {t.booksRead}
                </span>
              </div>
              <div className="profile-goal-bar">
                <div 
                  className="profile-goal-progress" 
                  style={{ 
                    width: `${(userData.booksRead / userData.readingGoal) * 100}%`,
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                  }}
                />
              </div>
              <p className={`profile-goal-percentage ${theme.textColors?.secondary || 'text-gray-500'}`}>
                {Math.round((userData.booksRead / userData.readingGoal) * 100)}% {t.completed}
              </p>
            </div>

            {/* Favorite Genres */}
            <div className={`profile-genres-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`${theme.textColors?.primary || 'text-gray-900'} mb-3`}>
                {t.favoriteGenres}
              </h3>
              <div className="profile-genres-list">
                {userData.favoriteGenres.map((genre, index) => (
                  <span 
                    key={index}
                    className={`profile-genre-tag ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')} ${theme.textColors?.secondary || 'text-gray-700'}`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`profile-activity-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-activity-header">
                <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                  {t.recentActivity}
                </h3>
                <Link 
                  href={`/${language}/profile/activity`}
                  className={`${theme.textColors?.highlight || 'text-blue-600'} flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {t.viewAll}
                  {isRTL ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
                </Link>
              </div>
              <div className="profile-activity-list">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className={`profile-activity-item ${theme.border?.default || 'border-gray-200'}`}>
                    <div className="profile-activity-icon">
                      {activity.type === 'read' && <FiBookOpen style={{ color: '#3b82f6' }} />}
                      {activity.type === 'review' && <FiStar style={{ color: '#f59e0b' }} />}
                      {activity.type === 'added' && <FiBookmark style={{ color: '#10b981' }} />}
                      {activity.type === 'reading' && <FiEye style={{ color: '#8b5cf6' }} />}
                    </div>
                    <div className="profile-activity-content">
                      <p className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                        {activity.type === 'read' && `Read "${activity.book}"`}
                        {activity.type === 'review' && `Reviewed "${activity.book}"`}
                        {activity.type === 'added' && `Added "${activity.book}" to list`}
                        {activity.type === 'reading' && `Started reading "${activity.book}"`}
                      </p>
                      <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-sm`}>
                        {activity.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "reading":
        return (
          <div className="profile-reading-list">
            <div className={`profile-reading-header ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                {t.readingList}
              </h3>
              <div className="profile-reading-filters">
                <button className={`profile-filter-btn ${theme.textColors?.primary || 'text-gray-900'} ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')}`}>
                  {t.currentlyReading}
                </button>
                <button className={`profile-filter-btn ${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {t.wantToRead}
                </button>
                <button className={`profile-filter-btn ${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {t.completed}
                </button>
              </div>
            </div>

            <div className="profile-reading-grid">
              {userData.readingList.map((book, index) => (
                <div key={index} className={`profile-reading-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'} ${theme.border?.default || 'border-gray-200'}`}>
                  <div className="profile-reading-card-header">
                    <h4 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                      {book.title}
                    </h4>
                    <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-sm`}>
                      {book.author}
                    </span>
                  </div>
                  <div className="profile-reading-progress">
                    <div className="profile-reading-progress-bar">
                      <div 
                        className="profile-reading-progress-fill"
                        style={{ 
                          width: `${book.progress}%`,
                          background: book.progress === 100 
                            ? 'linear-gradient(135deg, #10b981, #34d399)' 
                            : 'linear-gradient(135deg, #3b82f6, #60a5fa)'
                        }}
                      />
                    </div>
                    <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-sm`}>
                      {book.progress}%
                    </span>
                  </div>
                  <div className="profile-reading-status">
                    {book.progress === 100 ? (
                      <span className="profile-status-completed">✓ {t.completed}</span>
                    ) : (
                      <span className="profile-status-reading">{t.inProgress}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "activity":
        return (
          <div className={`profile-activity-full ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
            <h3 className={`${theme.textColors?.primary || 'text-gray-900'} mb-4`}>
              {t.activity}
            </h3>
            <div className="profile-activity-timeline">
              {userData.recentActivity.map((activity, index) => (
                <div key={index} className={`profile-timeline-item ${theme.border?.default || 'border-gray-200'}`}>
                  <div className="profile-timeline-dot" style={{ 
                    background: activity.type === 'read' ? '#3b82f6' :
                              activity.type === 'review' ? '#f59e0b' :
                              activity.type === 'added' ? '#10b981' : '#8b5cf6'
                  }} />
                  <div className="profile-timeline-content">
                    <p className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                      {activity.type === 'read' && `📖 Read "${activity.book}"`}
                      {activity.type === 'review' && `⭐ Reviewed "${activity.book}"`}
                      {activity.type === 'added' && `📚 Added "${activity.book}"`}
                      {activity.type === 'reading' && `👀 Started reading "${activity.book}"`}
                    </p>
                    <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-sm`}>
                      {activity.date}
                    </span>
                  </div>
                </div>
              ))}
              {userData.recentActivity.length === 0 && (
                <p className={`${theme.textColors?.secondary || 'text-gray-500'} text-center py-8`}>
                  {t.noActivity}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`profile-desktop-container ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="profile-desktop-wrapper">
        {/* Sidebar */}
        <ProfileSidebarDesktop 
          userData={userData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          translations={t}
          isDarkMode={isDarkMode}
          isRTL={isRTL}
        />

        {/* Main Content */}
        <main className="profile-main-content">
          {/* Mobile Header */}
          {isMobile && (
            <div className={`profile-mobile-header ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-user">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="profile-mobile-avatar"
                />
                <div className="profile-mobile-info">
                  <h2 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.name}
                  </h2>
                  <p className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {userData.username}
                  </p>
                </div>
              </div>
              <button 
                className={`profile-mobile-edit ${theme.textColors?.highlight || 'text-blue-600'}`}
              >
                <FiEdit2 size={18} />
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="profile-content-area">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileDesktop;