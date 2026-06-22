// components/EthosSocialProof.jsx
"use client";

import { useState, useMemo } from "react";
import {
  FiUsers,
  FiThumbsUp,
  FiMessageCircle,
  FiUserPlus,
  FiHeart,
  FiCheckCircle,
  FiTrendingUp,
  FiAward,
  FiStar,
  FiZap,
  FiGlobe,
  FiShield,
  FiClock,
  FiExternalLink,
  FiShare2,
  FiMoreHorizontal,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import "./EthosSocialProof.css";

export default function EthosSocialProof({ user }) {
  const [expanded, setExpanded] = useState(false);
  const [showMoreVerifications, setShowMoreVerifications] = useState(false);

  // Extended verification data
  const allVerifications = [
    { id: 1, name: "BrightID Verified", icon: <FiCheckCircle />, status: "verified", date: "2024-01-15" },
    { id: 2, name: "Gitcoin Passport", icon: <FiCheckCircle />, status: "verified", date: "2024-01-20" },
    { id: 3, name: "Proof of Humanity", icon: <FiCheckCircle />, status: "verified", date: "2024-02-01" },
    { id: 4, name: "ENS Registered", icon: <FiCheckCircle />, status: "verified", date: "2024-02-15" },
    { id: 5, name: "POAP Collection", icon: <FiAward />, status: "verified", date: "2024-03-01" },
    { id: 6, name: "Snapshot Verified", icon: <FiShield />, status: "pending", date: "2024-03-10" },
  ];

  // Social proof stats with changes
  const stats = [
    { id: 1, icon: <FiThumbsUp />, value: "2.4K", label: "Endorsements", change: "+12%", positive: true },
    { id: 2, icon: <FiMessageCircle />, value: "847", label: "Reviews", change: "+8%", positive: true },
    { id: 3, icon: <FiUserPlus />, value: "1.2K", label: "Followers", change: "+5.2%", positive: true },
    { id: 4, icon: <FiHeart />, value: "3.8K", label: "Likes", change: "+15.3%", positive: true },
    { id: 5, icon: <FiStar />, value: "4.9", label: "Rating", change: "+0.2", positive: true },
    { id: 6, icon: <FiTrendingUp />, value: "94%", label: "Engagement", change: "+3.1%", positive: true },
  ];

  // Display verifications
  const displayedVerifications = showMoreVerifications 
    ? allVerifications 
    : allVerifications.slice(0, 4);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  // Get trust score color
  const getTrustColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 70) return "#f59e0b";
    if (score >= 50) return "#f97316";
    return "#ef4444";
  };

  // Get trust score label
  const getTrustLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Attention";
  };

  // Get social proof summary
  const summary = useMemo(() => {
    const total = stats.reduce((acc, stat) => {
      const numValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
      return acc + (isNaN(numValue) ? 0 : numValue);
    }, 0);
    return {
      totalInteractions: total.toFixed(0),
      verifiedCount: allVerifications.filter(v => v.status === "verified").length,
      totalCount: allVerifications.length,
    };
  }, []);

  return (
    <div className="ethos-social-proof">
      {/* Header */}
      <div className="ethos-social-proof-header">
        <div className="ethos-social-proof-title-section">
          <FiUsers className="ethos-social-proof-icon" />
          <div>
            <h3 className="ethos-social-proof-title">Social Proof</h3>
            <span className="ethos-social-proof-subtitle">
              {summary.totalInteractions} total interactions • {summary.verifiedCount} verified credentials
            </span>
          </div>
        </div>
        <div className="ethos-social-proof-actions">
          <button className="ethos-social-proof-share">
            <FiShare2 />
          </button>
          <button 
            className="ethos-social-proof-expand"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      <div className={`ethos-social-proof-content ${expanded ? "expanded" : ""}`}>
        {/* Stats Grid */}
        <div className="ethos-social-proof-stats">
          {stats.map((stat) => (
            <div key={stat.id} className="ethos-social-proof-stat">
              <div className="ethos-social-stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="ethos-social-stat-info">
                <span className="ethos-social-stat-value">{stat.value}</span>
                <span className="ethos-social-stat-label">{stat.label}</span>
                <span className={`ethos-social-stat-change ${stat.positive ? "positive" : "negative"}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Score */}
        <div className="ethos-trust-score-section">
          <div className="ethos-trust-score-header">
            <div className="ethos-trust-score-title">
              <FiShield className="ethos-trust-score-icon" />
              <span>Trust Score</span>
            </div>
            <div className="ethos-trust-score-value">
              <span style={{ color: getTrustColor(user.trustScore) }}>
                {user.trustScore}%
              </span>
              <span className="ethos-trust-score-label">
                {getTrustLabel(user.trustScore)}
              </span>
            </div>
          </div>
          <div className="ethos-trust-score-bar">
            <div 
              className="ethos-trust-score-fill" 
              style={{ 
                width: `${user.trustScore}%`,
                backgroundColor: getTrustColor(user.trustScore)
              }} 
            />
          </div>
          <div className="ethos-trust-score-details">
            <span className="ethos-trust-score-detail">
              <FiClock /> Last updated: 2 hours ago
            </span>
            <span className="ethos-trust-score-detail">
              <FiGlobe /> Global rank: #142
            </span>
          </div>
        </div>

        {/* Verifications */}
        <div className="ethos-social-proof-verification">
          <div className="ethos-verification-header">
            <h4 className="ethos-verification-title">Verifications</h4>
            <span className="ethos-verification-count">
              {summary.verifiedCount}/{summary.totalCount}
            </span>
          </div>

          <div className="ethos-verification-grid">
            {displayedVerifications.map((item) => (
              <div key={item.id} className="ethos-verification-item">
                <div className="ethos-verification-icon-wrapper">
                  <span style={{ color: getStatusColor(item.status) }}>
                    {item.icon}
                  </span>
                </div>
                <div className="ethos-verification-info">
                  <span className="ethos-verification-name">{item.name}</span>
                  <span className="ethos-verification-date">{item.date}</span>
                </div>
                <span 
                  className={`ethos-verification-status ${item.status}`}
                  style={{ 
                    backgroundColor: `${getStatusColor(item.status)}20`,
                    color: getStatusColor(item.status)
                  }}
                >
                  {getStatusLabel(item.status)}
                </span>
              </div>
            ))}
          </div>

          {allVerifications.length > 4 && (
            <button 
              className="ethos-verification-show-more"
              onClick={() => setShowMoreVerifications(!showMoreVerifications)}
            >
              {showMoreVerifications ? "Show Less" : `Show ${allVerifications.length - 4} More`}
            </button>
          )}
        </div>

        {/* Social Metrics */}
        <div className="ethos-social-metrics">
          <div className="ethos-social-metric">
            <div className="ethos-social-metric-header">
              <FiZap className="ethos-social-metric-icon" />
              <span>Engagement Rate</span>
            </div>
            <div className="ethos-social-metric-value">94%</div>
            <div className="ethos-social-metric-bar">
              <div className="ethos-social-metric-fill" style={{ width: "94%" }} />
            </div>
          </div>

          <div className="ethos-social-metric">
            <div className="ethos-social-metric-header">
              <FiTrendingUp className="ethos-social-metric-icon" />
              <span>Growth Rate</span>
            </div>
            <div className="ethos-social-metric-value">+23.5%</div>
            <div className="ethos-social-metric-bar">
              <div className="ethos-social-metric-fill positive" style={{ width: "78%" }} />
            </div>
          </div>

          <div className="ethos-social-metric">
            <div className="ethos-social-metric-header">
              <FiAward className="ethos-social-metric-icon" />
              <span>Reputation Score</span>
            </div>
            <div className="ethos-social-metric-value">892</div>
            <div className="ethos-social-metric-bar">
              <div className="ethos-social-metric-fill" style={{ width: "89%" }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ethos-social-proof-footer">
          <div className="ethos-social-proof-footer-item">
            <FiUsers className="ethos-footer-icon" />
            <span>Community trusted for 245 days</span>
          </div>
          <div className="ethos-social-proof-footer-item">
            <FiCheckCircle className="ethos-footer-icon" />
            <span>All verifications on-chain</span>
          </div>
          <button className="ethos-social-proof-verify-btn">
            <FiShield /> Verify New
          </button>
        </div>
      </div>
    </div>
  );
}