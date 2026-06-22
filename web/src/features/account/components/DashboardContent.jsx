// components/DashboardContent.jsx
"use client";

import Link from "next/link";
import {
  FiBarChart2,
  FiBookOpen,
  FiStar,
  FiHeart,
  FiUsers,
  FiLayout,
  FiChevronRight,
} from "react-icons/fi";

export default function DashboardContent({ user, menuItems }) {
  return (
    <>
      {/* Dashboard Stats */}
      <div className="account-card">
        <div className="account-card-header">
          <div className="account-card-title-section">
            <FiBarChart2 className="account-card-icon" style={{ color: "#3b82f6" }} />
            <h3 className="account-card-title">Dashboard Overview</h3>
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
            <div className="account-card-stat">
              <FiUsers />
              <div>
                <span>{user.stats.followers}</span>
                <span>Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Menu */}
      <div className="account-card">
        <div className="account-card-header">
          <div className="account-card-title-section">
            <FiLayout className="account-card-icon" style={{ color: "#3b82f6" }} />
            <h3 className="account-card-title">Dashboard Menu</h3>
          </div>
        </div>
        <div className="account-card-content">
          <div className="account-card-menu">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="account-card-menu-item"
              >
                <span className="account-card-menu-icon">{item.icon}</span>
                <span className="account-card-menu-label">{item.label}</span>
                {item.count && (
                  <span className="account-card-menu-count">{item.count}</span>
                )}
                <FiChevronRight className="account-card-menu-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}