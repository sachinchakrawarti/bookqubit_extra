"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaCamera,
  FaUserCircle,
  FaBadge,
  FaClock,
  FaShieldAlt,
  FaBook,
  FaUsers,
  FaComments,
  FaStar,
  FaCheckCircle,
  FaGlobe,
  FaLanguage,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import "./AdminProfile.css";

const AdminProfile = () => {
  const { theme, themeName } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" ||
      themeName === "midnight" ||
      themeName === "cyberpunk"
    );
  }, [themeName]);

  // Mock user data
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@bookqubit.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "January 15, 2024",
    role: "Super Admin",
    bio: "Passionate about books and technology. Leading the BookQubit team to bring the best reading experience to users worldwide.",
    avatar: null,
    stats: {
      booksManaged: 1247,
      usersManaged: 8456,
      reviewsModerated: 3291,
    },
    languages: ["English", "Spanish", "French"],
    social: {
      twitter: "@bookqubit",
      github: "bookqubit-dev",
      linkedin: "bookqubit-admin",
    },
    permissions: [
      "Manage Books",
      "Manage Users",
      "Moderate Reviews",
      "Manage Categories",
      "View Analytics",
    ],
  });

  const getBgColor = () => {
    if (isDarkMode) return "#1F2937";
    return "#FFFFFF";
  };

  const getBorderColor = () => {
    if (isDarkMode) return "#374151";
    return "#E5E7EB";
  };

  const getTextColor = () => {
    if (isDarkMode) return "#F9FAFB";
    return "#111827";
  };

  const getSecondaryText = () => {
    if (isDarkMode) return "#9CA3AF";
    return "#6B7280";
  };

  const getCardBg = () => {
    if (isDarkMode) return "#111827";
    return "#F9FAFB";
  };

  const handleEditProfile = (updatedData) => {
    setUser({ ...user, ...updatedData });
    setShowEditModal(false);
  };

  const handlePasswordChange = (newPassword) => {
    console.log("Password changed successfully");
    setShowPasswordModal(false);
  };

  return (
    <div className={`admin-profile ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-subtitle">Manage your account settings and preferences</p>
      </div>

      {/* Main Profile Card */}
      <div 
        className="profile-card"
        style={{
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
        }}
      >
        {/* Cover Image */}
        <div className="profile-cover">
          <div 
            className="profile-cover-overlay"
            style={{
              background: `linear-gradient(135deg, ${isDarkMode ? '#1F2937' : '#0284c7'}, ${isDarkMode ? '#374151' : '#0ea5e9'})`
            }}
          />
        </div>

        {/* Avatar */}
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
            ) : (
              <div 
                className="profile-avatar-placeholder"
                style={{
                  background: `linear-gradient(135deg, ${isDarkMode ? '#0284c7' : '#0ea5e9'}, ${isDarkMode ? '#0ea5e9' : '#0284c7'})`
                }}
              >
                <FaUserCircle className="profile-avatar-icon" />
              </div>
            )}
            <button 
              className="profile-avatar-edit"
              style={{
                backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                borderColor: getBorderColor(),
              }}
            >
              <FaCamera />
            </button>
          </div>
          <div className="profile-badge">
            <FaBadge />
            <span>{user.role}</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-info-header">
            <div className="profile-name-section">
              <h2 className="profile-name" style={{ color: getTextColor() }}>
                {user.name}
              </h2>
              <p className="profile-email" style={{ color: getSecondaryText() }}>
                <FaEnvelope /> {user.email}
              </p>
            </div>
            <div className="profile-actions">
              <button 
                className="profile-btn profile-btn-primary"
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit />
                Edit Profile
              </button>
              <button 
                className="profile-btn profile-btn-secondary"
                onClick={() => setShowPasswordModal(true)}
                style={{
                  borderColor: getBorderColor(),
                  color: getSecondaryText(),
                }}
              >
                <FaKey />
                Change Password
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="profile-bio" style={{ color: getSecondaryText() }}>
            {user.bio}
          </p>

          {/* Details Grid */}
          <div className="profile-details-grid">
            <div className="profile-detail-item">
              <FaPhone className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Phone</span>
                <span className="profile-detail-value" style={{ color: getTextColor() }}>
                  {user.phone}
                </span>
              </div>
            </div>
            <div className="profile-detail-item">
              <FaMapMarker className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Location</span>
                <span className="profile-detail-value" style={{ color: getTextColor() }}>
                  {user.location}
                </span>
              </div>
            </div>
            <div className="profile-detail-item">
              <FaCalendarAlt className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Joined</span>
                <span className="profile-detail-value" style={{ color: getTextColor() }}>
                  {user.joinDate}
                </span>
              </div>
            </div>
            <div className="profile-detail-item">
              <FaLanguage className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Languages</span>
                <span className="profile-detail-value" style={{ color: getTextColor() }}>
                  {user.languages.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="profile-social">
            <span className="profile-social-label" style={{ color: getSecondaryText() }}>
              Social Links
            </span>
            <div className="profile-social-links">
              <a href="#" className="profile-social-link twitter">
                <FaTwitter />
              </a>
              <a href="#" className="profile-social-link github">
                <FaGithub />
              </a>
              <a href="#" className="profile-social-link linkedin">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats-grid">
        <div 
          className="profile-stat-card"
          style={{
            backgroundColor: getBgColor(),
            borderColor: getBorderColor(),
          }}
        >
          <div className="profile-stat-icon books">
            <FaBook />
          </div>
          <div className="profile-stat-info">
            <span className="profile-stat-value" style={{ color: getTextColor() }}>
              {user.stats.booksManaged}
            </span>
            <span className="profile-stat-label" style={{ color: getSecondaryText() }}>
              Books Managed
            </span>
          </div>
        </div>

        <div 
          className="profile-stat-card"
          style={{
            backgroundColor: getBgColor(),
            borderColor: getBorderColor(),
          }}
        >
          <div className="profile-stat-icon users">
            <FaUsers />
          </div>
          <div className="profile-stat-info">
            <span className="profile-stat-value" style={{ color: getTextColor() }}>
              {user.stats.usersManaged}
            </span>
            <span className="profile-stat-label" style={{ color: getSecondaryText() }}>
              Users Managed
            </span>
          </div>
        </div>

        <div 
          className="profile-stat-card"
          style={{
            backgroundColor: getBgColor(),
            borderColor: getBorderColor(),
          }}
        >
          <div className="profile-stat-icon reviews">
            <FaComments />
          </div>
          <div className="profile-stat-info">
            <span className="profile-stat-value" style={{ color: getTextColor() }}>
              {user.stats.reviewsModerated}
            </span>
            <span className="profile-stat-label" style={{ color: getSecondaryText() }}>
              Reviews Moderated
            </span>
          </div>
        </div>

        <div 
          className="profile-stat-card"
          style={{
            backgroundColor: getBgColor(),
            borderColor: getBorderColor(),
          }}
        >
          <div className="profile-stat-icon rating">
            <FaStar />
          </div>
          <div className="profile-stat-info">
            <span className="profile-stat-value" style={{ color: getTextColor() }}>
              4.9
            </span>
            <span className="profile-stat-label" style={{ color: getSecondaryText() }}>
              Rating
            </span>
          </div>
        </div>
      </div>

      {/* Permissions Section */}
      <div 
        className="profile-permissions-card"
        style={{
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
        }}
      >
        <h3 className="profile-permissions-title" style={{ color: getTextColor() }}>
          <FaShieldAlt />
          Permissions
        </h3>
        <div className="profile-permissions-grid">
          {user.permissions.map((permission, index) => (
            <div key={index} className="profile-permission-item">
              <FaCheckCircle className="profile-permission-check" />
              <span style={{ color: getTextColor() }}>{permission}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProfile}
          isDarkMode={isDarkMode}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={handlePasswordChange}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default AdminProfile;