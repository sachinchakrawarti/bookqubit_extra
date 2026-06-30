"use client";

import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./NotificationBell.css";

const NotificationBell = ({ isDarkMode }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New book added", time: "2 min ago", read: false },
    { id: 2, title: "User registered", time: "15 min ago", read: false },
    { id: 3, title: "New review posted", time: "1 hour ago", read: true },
    { id: 4, title: "System update", time: "3 hours ago", read: true },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".notification-bell-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="notification-bell-container">
      <button
        className={`notification-bell-btn ${isDarkMode ? "dark" : ""}`}
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div
          className={`notification-dropdown ${isDarkMode ? "dark" : ""}`}
        >
          <div className="notification-dropdown-header">
            <span className="notification-dropdown-title">Notifications</span>
            {unreadCount > 0 && (
              <button
                className="notification-mark-all"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? "unread" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-item-content">
                    <div className="notification-item-title">
                      {notification.title}
                    </div>
                    <div className="notification-item-time">
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
  );
};

export default NotificationBell;