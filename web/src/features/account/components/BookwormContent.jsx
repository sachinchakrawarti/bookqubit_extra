// components/BookwormContent.jsx
"use client";

import Link from "next/link";
import {
  FiAward,
  FiZap,
  FiBookOpen,
  FiStar,
  FiChevronRight,
  FiTrendingUp,
  FiTarget,
  FiHeart,
} from "react-icons/fi";

export default function BookwormContent({ user, menuItems }) {
  return (
    <>
      {/* Bookworm Stats */}
      <div className="account-card">
        <div className="account-card-header">
          <div className="account-card-title-section">
            <FiAward className="account-card-icon" style={{ color: "#f59e0b" }} />
            <h3 className="account-card-title">Bookworm Stats</h3>
          </div>
          <Link href="/bookworm" className="account-card-view-all">
            View All <FiChevronRight />
          </Link>
        </div>
        <div className="account-card-content">
          <div className="account-bookworm-stats">
            <div className="account-bookworm-stat">
              <FiAward />
              <div>
                <span>#{user.stats.ranking}</span>
                <span>Global Rank</span>
              </div>
            </div>
            <div className="account-bookworm-stat">
              <FiAward />
              <div>
                <span>{user.stats.badges}</span>
                <span>Badges Earned</span>
              </div>
            </div>
            <div className="account-bookworm-stat">
              <FiZap />
              <div>
                <span>{user.stats.readingStreak}</span>
                <span>Day Streak</span>
              </div>
            </div>
            <div className="account-bookworm-stat">
              <FiBookOpen />
              <div>
                <span>{user.stats.totalPages.toLocaleString()}</span>
                <span>Pages Read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookworm Menu */}
      <div className="account-card">
        <div className="account-card-header">
          <div className="account-card-title-section">
            <FiAward className="account-card-icon" style={{ color: "#f59e0b" }} />
            <h3 className="account-card-title">Bookworm Features</h3>
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
                {item.value && (
                  <span className="account-card-menu-value">{item.value}</span>
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