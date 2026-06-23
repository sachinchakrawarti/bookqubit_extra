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
  FiMenu,
  FiX,
  FiHome,
  FiActivity,
  FiBook,
  FiMoreHorizontal,
} from "react-icons/fi";
import { FaUserCircle, FaBookReader, FaGraduationCap } from "react-icons/fa";
import "./profile_mobile.css";

const ProfileMobile = () => {
  const { theme, themeName } = useTheme();
  const { language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Translations
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
      profile: "Profile",
      home: "Home",
      books: "Books",
      more: "More",
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
      profile: "प्रोफ़ाइल",
      home: "होम",
      books: "किताबें",
      more: "और",
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
      profile: "پروفائل",
      home: "ہوم",
      books: "کتابیں",
      more: "مزید",
    }
  }), []);

  const t = translations[language] || translations.en;

  // Bottom navigation items
  const bottomNavItems = [
    { id: "home", label: t.home, icon: <FiHome size={22} />, href: `/${language}` },
    { id: "books", label: t.books, icon: <FiBook size={22} />, href: `/${language}/books` },
    { id: "profile", label: t.profile, icon: <FiUser size={22} />, href: `/${language}/profile` },
    { id: "more", label: t.more, icon: <FiMoreHorizontal size={22} />, href: `/${language}/more` },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tab content renderer
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="profile-mobile-content">
            {/* User Header Card */}
            <div className={`profile-mobile-user-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-user-header">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="profile-mobile-avatar"
                />
                <div className="profile-mobile-user-info">
                  <h2 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.name}
                  </h2>
                  <p className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {userData.username}
                  </p>
                  <p className={`profile-mobile-bio ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {userData.bio}
                  </p>
                </div>
              </div>

              <div className="profile-mobile-user-details">
                <div className="profile-mobile-detail">
                  <FiMapPin size={14} className="profile-mobile-detail-icon" />
                  <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {userData.location}
                  </span>
                </div>
                <div className="profile-mobile-detail">
                  <FiBriefcase size={14} className="profile-mobile-detail-icon" />
                  <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {userData.occupation}
                  </span>
                </div>
                <div className="profile-mobile-detail">
                  <FiCalendar size={14} className="profile-mobile-detail-icon" />
                  <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.memberSince} {userData.joined}
                  </span>
                </div>
              </div>

              <div className="profile-mobile-actions">
                <button className={`profile-mobile-edit-btn ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'}`}>
                  <FiEdit2 size={16} />
                  <span>{t.editProfile}</span>
                </button>
                <button className={`profile-mobile-logout-btn ${theme.textColors?.secondary || 'text-red-500'}`}>
                  <FiLogOut size={16} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="profile-mobile-stats-grid">
              <div className={`profile-mobile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-mobile-stat-icon" style={{ color: '#3b82f6' }}>
                  <FiBookOpen size={20} />
                </div>
                <div className="profile-mobile-stat-info">
                  <span className={`profile-mobile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.booksRead}
                  </span>
                  <span className={`profile-mobile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.booksRead}
                  </span>
                </div>
              </div>
              <div className={`profile-mobile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-mobile-stat-icon" style={{ color: '#10b981' }}>
                  <FaBookReader size={20} />
                </div>
                <div className="profile-mobile-stat-info">
                  <span className={`profile-mobile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.pagesRead}
                  </span>
                  <span className={`profile-mobile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.pagesRead}
                  </span>
                </div>
              </div>
              <div className={`profile-mobile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-mobile-stat-icon" style={{ color: '#8b5cf6' }}>
                  <FiClock size={20} />
                </div>
                <div className="profile-mobile-stat-info">
                  <span className={`profile-mobile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.readingTime}
                  </span>
                  <span className={`profile-mobile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.readingTime}
                  </span>
                </div>
              </div>
              <div className={`profile-mobile-stat-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                <div className="profile-mobile-stat-icon" style={{ color: '#f59e0b' }}>
                  <FiStar size={20} />
                </div>
                <div className="profile-mobile-stat-info">
                  <span className={`profile-mobile-stat-value ${theme.textColors?.primary || 'text-gray-900'}`}>
                    {userData.stats.reviews}
                  </span>
                  <span className={`profile-mobile-stat-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                    {t.reviews}
                  </span>
                </div>
              </div>
            </div>

            {/* Follow Stats */}
            <div className={`profile-mobile-follow ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-follow-item">
                <span className={`profile-mobile-follow-count ${theme.textColors?.primary || 'text-gray-900'}`}>
                  {userData.stats.followers}
                </span>
                <span className={`profile-mobile-follow-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {t.followers}
                </span>
              </div>
              <div className="profile-mobile-follow-divider"></div>
              <div className="profile-mobile-follow-item">
                <span className={`profile-mobile-follow-count ${theme.textColors?.primary || 'text-gray-900'}`}>
                  {userData.stats.following}
                </span>
                <span className={`profile-mobile-follow-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {t.following}
                </span>
              </div>
            </div>

            {/* Reading Goal */}
            <div className={`profile-mobile-goal-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-goal-header">
                <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                  {t.readingGoal}
                </h3>
                <span className={`${theme.textColors?.secondary || 'text-gray-500'}`}>
                  {userData.booksRead} / {userData.readingGoal} {t.booksRead}
                </span>
              </div>
              <div className="profile-mobile-goal-bar">
                <div 
                  className="profile-mobile-goal-progress" 
                  style={{ 
                    width: `${(userData.booksRead / userData.readingGoal) * 100}%`,
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                  }}
                />
              </div>
              <p className={`profile-mobile-goal-percentage ${theme.textColors?.secondary || 'text-gray-500'}`}>
                {Math.round((userData.booksRead / userData.readingGoal) * 100)}% {t.completed}
              </p>
            </div>

            {/* Favorite Genres */}
            <div className={`profile-mobile-genres-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                {t.favoriteGenres}
              </h3>
              <div className="profile-mobile-genres-list">
                {userData.favoriteGenres.map((genre, index) => (
                  <span 
                    key={index}
                    className={`profile-mobile-genre-tag ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')} ${theme.textColors?.secondary || 'text-gray-700'}`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`profile-mobile-activity-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-activity-header">
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
              <div className="profile-mobile-activity-list">
                {userData.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className={`profile-mobile-activity-item ${theme.border?.default || 'border-gray-200'}`}>
                    <div className="profile-mobile-activity-icon">
                      {activity.type === 'read' && <FiBookOpen style={{ color: '#3b82f6' }} size={16} />}
                      {activity.type === 'review' && <FiStar style={{ color: '#f59e0b' }} size={16} />}
                      {activity.type === 'added' && <FiBookmark style={{ color: '#10b981' }} size={16} />}
                      {activity.type === 'reading' && <FiEye style={{ color: '#8b5cf6' }} size={16} />}
                    </div>
                    <div className="profile-mobile-activity-content">
                      <p className={`${theme.textColors?.primary || 'text-gray-900'} text-sm`}>
                        {activity.type === 'read' && `Read "${activity.book}"`}
                        {activity.type === 'review' && `Reviewed "${activity.book}"`}
                        {activity.type === 'added' && `Added "${activity.book}"`}
                        {activity.type === 'reading' && `Reading "${activity.book}"`}
                      </p>
                      <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-xs`}>
                        {activity.date}
                      </span>
                    </div>
                  </div>
                ))}
                {userData.recentActivity.length === 0 && (
                  <p className={`${theme.textColors?.secondary || 'text-gray-500'} text-center py-4 text-sm`}>
                    {t.noActivity}
                  </p>
                )}
              </div>
            </div>

            {/* Reading List Preview */}
            <div className={`profile-mobile-reading-preview ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <div className="profile-mobile-reading-header">
                <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                  {t.readingList}
                </h3>
                <Link 
                  href={`/${language}/profile/reading`}
                  className={`${theme.textColors?.highlight || 'text-blue-600'} flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {t.viewAll}
                  {isRTL ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
                </Link>
              </div>
              <div className="profile-mobile-reading-items">
                {userData.readingList.slice(0, 2).map((book, index) => (
                  <div key={index} className={`profile-mobile-reading-item ${theme.border?.default || 'border-gray-200'}`}>
                    <div className="profile-mobile-reading-info">
                      <h4 className={`${theme.textColors?.primary || 'text-gray-900'} text-sm`}>
                        {book.title}
                      </h4>
                      <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-xs`}>
                        {book.author}
                      </span>
                    </div>
                    <div className="profile-mobile-reading-progress">
                      <div className="profile-mobile-reading-progress-bar">
                        <div 
                          className="profile-mobile-reading-progress-fill"
                          style={{ 
                            width: `${book.progress}%`,
                            background: book.progress === 100 
                              ? 'linear-gradient(135deg, #10b981, #34d399)' 
                              : 'linear-gradient(135deg, #3b82f6, #60a5fa)'
                          }}
                        />
                      </div>
                      <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-xs`}>
                        {book.progress}%
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
          <div className="profile-mobile-reading-full">
            <div className={`profile-mobile-reading-header-full ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                {t.readingList}
              </h3>
            </div>
            <div className="profile-mobile-reading-grid">
              {userData.readingList.map((book, index) => (
                <div key={index} className={`profile-mobile-reading-card ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
                  <h4 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
                    {book.title}
                  </h4>
                  <span className={`${theme.textColors?.secondary || 'text-gray-500'} text-sm`}>
                    {book.author}
                  </span>
                  <div className="profile-mobile-reading-progress-full">
                    <div className="profile-mobile-reading-progress-bar-full">
                      <div 
                        className="profile-mobile-reading-progress-fill-full"
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
                  <div className="profile-mobile-reading-status">
                    {book.progress === 100 ? (
                      <span className="profile-mobile-status-completed">✓ {t.completed}</span>
                    ) : (
                      <span className="profile-mobile-status-reading">{t.inProgress}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "activity":
        return (
          <div className={`profile-mobile-activity-full ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
            <h3 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
              {t.activity}
            </h3>
            <div className="profile-mobile-activity-timeline">
              {userData.recentActivity.map((activity, index) => (
                <div key={index} className={`profile-mobile-timeline-item ${theme.border?.default || 'border-gray-200'}`}>
                  <div className="profile-mobile-timeline-dot" style={{ 
                    background: activity.type === 'read' ? '#3b82f6' :
                              activity.type === 'review' ? '#f59e0b' :
                              activity.type === 'added' ? '#10b981' : '#8b5cf6'
                  }} />
                  <div className="profile-mobile-timeline-content">
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

  if (!mounted || !theme) {
    return null;
  }

  return (
    <div 
      className={`profile-mobile-container ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}`}
      style={{ fontFamily: currentFont?.family }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Header */}
      <header className={`profile-mobile-header ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
        <div className="profile-mobile-header-left">
          <button 
            className="profile-mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className={`${theme.textColors?.primary || 'text-gray-900'}`}>
            {t.title}
          </h1>
        </div>
        <div className="profile-mobile-header-right">
          <button className="profile-mobile-settings-btn">
            <FiSettings size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="profile-mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className={`profile-mobile-menu ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`} onClick={(e) => e.stopPropagation()}>
            <div className="profile-mobile-menu-user">
              <img src={userData.avatar} alt={userData.name} className="profile-mobile-menu-avatar" />
              <div>
                <h4 className={`${theme.textColors?.primary || 'text-gray-900'}`}>{userData.name}</h4>
                <p className={`${theme.textColors?.secondary || 'text-gray-500'}`}>{userData.username}</p>
              </div>
            </div>
            <nav className="profile-mobile-menu-nav">
              <button className={`profile-mobile-menu-item ${activeTab === 'overview' ? 'profile-mobile-menu-item-active' : ''}`} onClick={() => { setActiveTab('overview'); setIsMenuOpen(false); }}>
                <FiUser size={20} />
                <span>{t.overview}</span>
              </button>
              <button className={`profile-mobile-menu-item ${activeTab === 'reading' ? 'profile-mobile-menu-item-active' : ''}`} onClick={() => { setActiveTab('reading'); setIsMenuOpen(false); }}>
                <FiBookOpen size={20} />
                <span>{t.readingList}</span>
              </button>
              <button className={`profile-mobile-menu-item ${activeTab === 'activity' ? 'profile-mobile-menu-item-active' : ''}`} onClick={() => { setActiveTab('activity'); setIsMenuOpen(false); }}>
                <FiActivity size={20} />
                <span>{t.activity}</span>
              </button>
              <button className={`profile-mobile-menu-item`} onClick={() => { setIsMenuOpen(false); }}>
                <FiSettings size={20} />
                <span>{t.settings}</span>
              </button>
              <button className={`profile-mobile-menu-item profile-mobile-menu-logout`}>
                <FiLogOut size={20} />
                <span>{t.logout}</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className={`profile-mobile-tabs ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.shadow?.container || 'shadow-lg'}`}>
        <button 
          className={`profile-mobile-tab ${activeTab === 'overview' ? 'profile-mobile-tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiUser size={18} />
          <span>{t.overview}</span>
        </button>
        <button 
          className={`profile-mobile-tab ${activeTab === 'reading' ? 'profile-mobile-tab-active' : ''}`}
          onClick={() => setActiveTab('reading')}
        >
          <FiBookOpen size={18} />
          <span>{t.readingList}</span>
        </button>
        <button 
          className={`profile-mobile-tab ${activeTab === 'activity' ? 'profile-mobile-tab-active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <FiActivity size={18} />
          <span>{t.activity}</span>
        </button>
      </div>

      {/* Content */}
      <div className="profile-mobile-content-wrapper">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className={`profile-mobile-bottom-nav ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
        {bottomNavItems.map((item) => (
          <Link 
            key={item.id}
            href={item.href}
            className={`profile-mobile-bottom-nav-item ${item.id === 'profile' ? 'profile-mobile-bottom-nav-item-active' : ''}`}
          >
            <span className="profile-mobile-bottom-nav-icon">{item.icon}</span>
            <span className={`profile-mobile-bottom-nav-label ${theme.textColors?.secondary || 'text-gray-500'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProfileMobile;