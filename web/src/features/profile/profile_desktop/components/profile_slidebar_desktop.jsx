"use client";

import React from "react";
import Link from "next/link";
import {
  FiUser,
  FiBookOpen,
  FiActivity,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import "./profile_slidebar_desktop.css";

const ProfileSidebarDesktop = ({ 
  userData, 
  activeTab, 
  setActiveTab, 
  translations,
  isDarkMode,
  isRTL 
}) => {
  const menuItems = [
    { id: "overview", label: translations.overview, icon: <FiUser size={20} /> },
    { id: "reading", label: translations.readingList, icon: <FiBookOpen size={20} /> },
    { id: "activity", label: translations.activity, icon: <FiActivity size={20} /> },
    { id: "stats", label: translations.stats, icon: <FiBarChart2 size={20} /> },
    { id: "settings", label: translations.settings, icon: <FiSettings size={20} /> },
  ];

  return (
    <aside className={`profile-sidebar ${isDarkMode ? 'profile-sidebar-dark' : ''}`}>
      {/* User Profile Card */}
      <div className="profile-sidebar-user">
        <div className="profile-sidebar-avatar-wrapper">
          <img 
            src={userData.avatar} 
            alt={userData.name}
            className="profile-sidebar-avatar"
          />
          <button className="profile-sidebar-avatar-edit">
            <FiEdit2 size={12} />
          </button>
        </div>
        
        <h2 className="profile-sidebar-name">
          {userData.name}
        </h2>
        <p className="profile-sidebar-username">
          {userData.username}
        </p>
        
        <p className="profile-sidebar-bio">
          {userData.bio}
        </p>

        <div className="profile-sidebar-details">
          <div className="profile-sidebar-detail">
            <FiMapPin size={14} />
            <span>{userData.location}</span>
          </div>
          <div className="profile-sidebar-detail">
            <FiBriefcase size={14} />
            <span>{userData.occupation}</span>
          </div>
          <div className="profile-sidebar-detail">
            <FiCalendar size={14} />
            <span>{translations.memberSince} {userData.joined}</span>
          </div>
        </div>

        {/* Follow Stats */}
        <div className="profile-sidebar-follow">
          <div className="profile-sidebar-follow-item">
            <span className="profile-sidebar-follow-count">{userData.stats.followers}</span>
            <span className="profile-sidebar-follow-label">{translations.followers}</span>
          </div>
          <div className="profile-sidebar-follow-divider"></div>
          <div className="profile-sidebar-follow-item">
            <span className="profile-sidebar-follow-count">{userData.stats.following}</span>
            <span className="profile-sidebar-follow-label">{translations.following}</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="profile-sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`profile-sidebar-nav-item ${activeTab === item.id ? 'profile-sidebar-nav-item-active' : ''}`}
          >
            <span className="profile-sidebar-nav-icon">{item.icon}</span>
            <span className="profile-sidebar-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="profile-sidebar-actions">
        <Link 
          href={`/${isRTL ? 'ur' : 'en'}/profile/edit`}
          className="profile-sidebar-action-btn profile-sidebar-edit-btn"
        >
          <FiEdit2 size={18} />
          <span>{translations.editProfile}</span>
        </Link>
        <button className="profile-sidebar-action-btn profile-sidebar-logout-btn">
          <FiLogOut size={18} />
          <span>{translations.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebarDesktop;