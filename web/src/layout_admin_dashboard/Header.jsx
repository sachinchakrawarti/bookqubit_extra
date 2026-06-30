"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaBell, FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import NotificationBell from "./NotificationBell";
import "./Header.css";

const Header = ({ isDarkMode, onToggleSidebar, sidebarOpen, theme }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const getHeaderBg = () => {
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

  return (
    <header
      className={`admin-header ${isDarkMode ? "dark" : ""}`}
      style={{
        backgroundColor: getHeaderBg(),
        borderBottom: `1px solid ${getBorderColor()}`,
        color: getTextColor(),
      }}
    >
      <div className="admin-header-left">
        <button
          className="admin-header-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="admin-header-title">Admin Dashboard</h1>
      </div>

      <div className="admin-header-right">
        {/* Notification Bell */}
        <NotificationBell isDarkMode={isDarkMode} />

        {/* User Menu */}
        <div className="admin-user-menu-container">
          <button
            className="admin-user-menu-btn"
            onClick={toggleUserMenu}
            aria-label="User menu"
          >
            <div className="admin-user-avatar">
              <FaUser />
            </div>
            <span className="admin-user-name">Admin</span>
          </button>

          {showUserMenu && (
            <div
              className={`admin-user-dropdown ${isDarkMode ? "dark" : ""}`}
              style={{
                backgroundColor: getHeaderBg(),
                borderColor: getBorderColor(),
              }}
            >
              <Link href="/admin/profile" className="admin-dropdown-item">
                <FaUser />
                <span>Profile</span>
              </Link>
              <Link href="/admin/settings" className="admin-dropdown-item">
                <FaCog />
                <span>Settings</span>
              </Link>
              <div className="admin-dropdown-divider"></div>
              <button className="admin-dropdown-item admin-dropdown-logout">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;