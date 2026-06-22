// components/ProfileSettings.jsx
"use client";

import Link from "next/link";
import { FiUser, FiChevronRight } from "react-icons/fi";

export default function ProfileSettings({ menuItems }) {
  return (
    <div className="account-card">
      <div className="account-card-header">
        <div className="account-card-title-section">
          <FiUser className="account-card-icon" style={{ color: "#8b5cf6" }} />
          <h3 className="account-card-title">Profile Settings</h3>
        </div>
      </div>
      <div className="account-card-content">
        <div className="account-card-menu">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`account-card-menu-item ${item.isLogout ? "logout" : ""}`}
            >
              <span className="account-card-menu-icon">{item.icon}</span>
              <span className="account-card-menu-label">{item.label}</span>
              {item.badge && (
                <span className="account-card-menu-badge">{item.badge}</span>
              )}
              <FiChevronRight className="account-card-menu-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}