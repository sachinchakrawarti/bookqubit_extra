"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import {
  FaBars,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaBook,
  FaSearch,
} from "react-icons/fa";
import AdminDashboardThemeSwitch from "./AdminDashboardThemeSwitch";
import "./Navbar_Admin_Dashboard.css";

const Navbar_Admin_Dashboard = ({ onToggleSidebar, sidebarOpen }) => {
  const { theme, themeName } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Check dark mode based on theme
  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" ||
      themeName === "midnight" ||
      themeName === "cyberpunk"
    );
  }, [themeName]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Notifications data
  const notifications = [
    { id: 1, title: "New book added", message: "The Great Gatsby was added to the library", time: "2 min ago", read: false },
    { id: 2, title: "User registered", message: "John Doe registered as a new user", time: "15 min ago", read: false },
    { id: 3, title: "New review posted", message: "Jane Smith reviewed To Kill a Mockingbird", time: "1 hour ago", read: true },
    { id: 4, title: "System update", message: "System was updated to version 2.4.0", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Get theme-based colors
  const getNavbarBg = () => {
    // Use theme background if available
    if (theme?.background?.navbar) {
      return theme.background.navbar;
    }
    if (theme?.background?.card) {
      return theme.background.card;
    }
    if (isDarkMode) return "#1F2937";
    return "#FFFFFF";
  };

  const getBorderColor = () => {
    if (theme?.border?.default) {
      return theme.border.default;
    }
    if (isDarkMode) return "#374151";
    return "#E5E7EB";
  };

  const getTextColor = () => {
    if (theme?.textColors?.primary) {
      return theme.textColors.primary;
    }
    if (isDarkMode) return "#F9FAFB";
    return "#111827";
  };

  const getSecondaryTextColor = () => {
    if (theme?.textColors?.secondary) {
      return theme.textColors.secondary;
    }
    if (isDarkMode) return "#9CA3AF";
    return "#6B7280";
  };

  const getIconColor = () => {
    if (theme?.iconColors?.default) {
      return theme.iconColors.default;
    }
    if (isDarkMode) return "#9CA3AF";
    return "#6B7280";
  };

  const getSearchBg = () => {
    if (theme?.background?.search) {
      return theme.background.search;
    }
    if (isDarkMode) return "#374151";
    return "#F3F4F6";
  };

  return (
    <nav
      className={`admin-navbar ${isDarkMode ? "dark" : ""}`}
      style={{
        backgroundColor: getNavbarBg(),
        borderBottom: `1px solid ${getBorderColor()}`,
        color: getTextColor(),
      }}
    >
      {/* Left Section */}
      <div className="admin-navbar-left">
        <button
          className="admin-navbar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          style={{ color: getIconColor() }}
        >
          <FaBars />
        </button>

        <Link href="/admin-dashboard" className="admin-navbar-logo">
          <FaBook className="admin-navbar-logo-icon" />
          <span className="admin-navbar-logo-text">BookQubit Admin</span>
        </Link>
      </div>

      {/* Center Section - Search */}
      <div className="admin-navbar-center">
        <form className="admin-navbar-search" onSubmit={handleSearch}>
          <FaSearch className="search-icon" style={{ color: getSecondaryTextColor() }} />
          <input
            type="text"
            placeholder="Search books, users, reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{
              backgroundColor: getSearchBg(),
              color: getTextColor(),
            }}
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="admin-navbar-right">
        {/* Theme Switch */}
        <AdminDashboardThemeSwitch />

        {/* Notifications */}
        <div className="notification-container" ref={notificationRef}>
          <button
            className="admin-navbar-btn notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            style={{ color: getIconColor() }}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`notification-dropdown ${isDarkMode ? "dark" : ""}`}
              style={{
                backgroundColor: getNavbarBg(),
                borderColor: getBorderColor(),
              }}
            >
              <div className="notification-dropdown-header">
                <span className="notification-dropdown-title" style={{ color: getTextColor() }}>
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button className="notification-mark-all">
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="notification-empty" style={{ color: getSecondaryTextColor() }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.read ? "unread" : ""}`}
                      style={{
                        borderLeftColor: !notification.read ? "#0284c7" : "transparent",
                      }}
                    >
                      <div className="notification-item-content">
                        <div className="notification-item-title" style={{ color: getTextColor() }}>
                          {notification.title}
                        </div>
                        <div className="notification-item-message" style={{ color: getSecondaryTextColor() }}>
                          {notification.message}
                        </div>
                        <div className="notification-item-time" style={{ color: getSecondaryTextColor() }}>
                          {notification.time}
                        </div>
                      </div>
                      {!notification.read && (
                        <span className="notification-unread-dot" />
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="notification-dropdown-footer">
                <button className="notification-view-all">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-menu-container" ref={userMenuRef}>
          <button
            className="admin-user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            style={{ color: getTextColor() }}
          >
            <div className="admin-user-avatar">
              <FaUser />
            </div>
            <span className="admin-user-name">Admin</span>
            <FaChevronDown className="admin-user-chevron" style={{ color: getSecondaryTextColor() }} />
          </button>

          {showUserMenu && (
            <div
              className={`admin-user-dropdown ${isDarkMode ? "dark" : ""}`}
              style={{
                backgroundColor: getNavbarBg(),
                borderColor: getBorderColor(),
              }}
            >
              <div className="admin-user-dropdown-header">
                <div className="admin-user-dropdown-avatar">
                  <FaUser />
                </div>
                <div className="admin-user-dropdown-info">
                  <div className="admin-user-dropdown-name" style={{ color: getTextColor() }}>
                    Admin User
                  </div>
                  <div className="admin-user-dropdown-email" style={{ color: getSecondaryTextColor() }}>
                    admin@bookqubit.com
                  </div>
                </div>
              </div>
              <div className="admin-user-dropdown-divider" style={{ borderColor: getBorderColor() }}></div>
              <Link href="/admin-dashboard/profile" className="admin-dropdown-item" style={{ color: getTextColor() }}>
                <FaUser />
                <span>Profile</span>
              </Link>
              <Link href="/admin-dashboard/settings" className="admin-dropdown-item" style={{ color: getTextColor() }}>
                <FaCog />
                <span>Settings</span>
              </Link>
              <div className="admin-user-dropdown-divider" style={{ borderColor: getBorderColor() }}></div>
              <button className="admin-dropdown-item admin-dropdown-logout">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar_Admin_Dashboard;