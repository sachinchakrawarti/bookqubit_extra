// components/EthosReputation.jsx
"use client";

import { useState, useMemo } from "react";
import {
  FiStar,
  FiShield,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiActivity,
  FiZap,
  FiHexagon,
  FiDroplet,
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import "./EthosReputation.css";

export default function EthosReputation({ user }) {
  const [expandedSections, setExpandedSections] = useState({
    credentials: true,
    daos: true,
    metrics: true,
  });
  const [copied, setCopied] = useState(false);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  // Get level color
  const getLevelColor = (level) => {
    const colors = {
      Platinum: "#ec4899",
      Gold: "#f59e0b",
      Silver: "#9ca3af",
      Bronze: "#cd7f32",
    };
    return colors[level] || "#6b7280";
  };

  // Calculate reputation percentage
  const reputationPercentage = useMemo(() => {
    return Math.min((user.reputationScore / 1000) * 100, 100);
  }, [user.reputationScore]);

  // Get reputation level
  const getReputationLevel = (score) => {
    if (score >= 900) return "Legendary";
    if (score >= 800) return "Master";
    if (score >= 700) return "Expert";
    if (score >= 600) return "Advanced";
    if (score >= 500) return "Intermediate";
    return "Beginner";
  };

  // Get reputation level color
  const getReputationLevelColor = (score) => {
    if (score >= 900) return "#8b5cf6";
    if (score >= 800) return "#3b82f6";
    if (score >= 700) return "#06b6d4";
    if (score >= 600) return "#10b981";
    if (score >= 500) return "#f59e0b";
    return "#6b7280";
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="ethos-reputation-card">
      {/* Header */}
      <div className="ethos-reputation-header">
        <div className="ethos-reputation-title-section">
          <FiStar className="ethos-reputation-icon" />
          <div>
            <h3 className="ethos-reputation-title">On-Chain Reputation</h3>
            <span className="ethos-reputation-subtitle">
              Decentralized trust & identity verification
            </span>
          </div>
        </div>
        <div className="ethos-reputation-level">
          <span 
            className="ethos-reputation-level-badge"
            style={{ 
              backgroundColor: getReputationLevelColor(user.reputationScore),
              boxShadow: `0 4px 20px ${getReputationLevelColor(user.reputationScore)}40`
            }}
          >
            {getReputationLevel(user.reputationScore)}
          </span>
        </div>
      </div>

      {/* Reputation Score */}
      <div className="ethos-reputation-score">
        <div className="ethos-score-circle">
          <svg viewBox="0 0 36 36" className="ethos-score-svg">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--ethos-border)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--ethos-gradient-1)"
              strokeWidth="3"
              strokeDasharray={`${reputationPercentage}, 100`}
              strokeLinecap="round"
              className="ethos-score-path"
            />
            <text x="18" y="20.5" className="ethos-score-text">
              {user.reputationScore}
            </text>
          </svg>
        </div>

        <div className="ethos-score-info">
          <h4>Reputation Score</h4>
          <p>{getReputationLevel(user.reputationScore)} Level</p>
          <div className="ethos-score-bar">
            <div 
              className="ethos-score-bar-fill"
              style={{ 
                width: `${reputationPercentage}%`,
                background: `linear-gradient(90deg, ${getReputationLevelColor(user.reputationScore)}, var(--ethos-gradient-1))`
              }}
            />
          </div>
          <div className="ethos-score-details">
            <span>Based on on-chain activity, governance participation, and social trust</span>
            <button className="ethos-score-info-btn">
              <FiInfo /> Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Trust Score */}
      <div className="ethos-trust-section">
        <div className="ethos-trust-header">
          <FiShield className="ethos-trust-icon" />
          <span className="ethos-trust-label">Trust Score</span>
          <span 
            className="ethos-trust-value"
            style={{ color: getTrustColor(user.trustScore) }}
          >
            {user.trustScore}%
          </span>
          <span className="ethos-trust-status">
            {getTrustLabel(user.trustScore)}
          </span>
        </div>
        <div className="ethos-trust-bar">
          <div 
            className="ethos-trust-bar-fill"
            style={{ 
              width: `${user.trustScore}%`,
              backgroundColor: getTrustColor(user.trustScore)
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="ethos-reputation-metrics-section">
        <button 
          className="ethos-section-toggle"
          onClick={() => toggleSection('metrics')}
        >
          <FiBarChart2 className="ethos-section-icon" />
          <span>Reputation Metrics</span>
          {expandedSections.metrics ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.metrics && (
          <div className="ethos-reputation-metrics">
            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiShield className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">{user.trustScore}%</span>
                <span className="ethos-metric-label">Trust Score</span>
                <span className="ethos-metric-change positive">↑ 5.2%</span>
              </div>
            </div>

            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiTrendingUp className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">{user.stats.proposalsVoted}</span>
                <span className="ethos-metric-label">Proposals Voted</span>
                <span className="ethos-metric-change positive">↑ 12</span>
              </div>
            </div>

            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiUsers className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">{user.stats.delegations}</span>
                <span className="ethos-metric-label">Delegations</span>
                <span className="ethos-metric-change positive">↑ 4</span>
              </div>
            </div>

            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiAward className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">{user.badges.length}</span>
                <span className="ethos-metric-label">Badges Earned</span>
                <span className="ethos-metric-change positive">↑ 2</span>
              </div>
            </div>

            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiZap className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">125</span>
                <span className="ethos-metric-label">Gas Optimized</span>
                <span className="ethos-metric-change positive">↑ 8.7%</span>
              </div>
            </div>

            <div className="ethos-reputation-metric">
              <div className="ethos-metric-icon-wrapper">
                <FiHexagon className="ethos-metric-icon" />
              </div>
              <div>
                <span className="ethos-metric-value">{user.daos.length}</span>
                <span className="ethos-metric-label">DAO Memberships</span>
                <span className="ethos-metric-change positive">↑ 1</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verified Credentials */}
      <div className="ethos-credentials-section">
        <button 
          className="ethos-section-toggle"
          onClick={() => toggleSection('credentials')}
        >
          <FiCheckCircle className="ethos-section-icon" />
          <span>Verified Credentials</span>
          <span className="ethos-section-count">{user.credentials.length}</span>
          {expandedSections.credentials ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.credentials && (
          <div className="ethos-credentials-list">
            {user.credentials.map((cred) => (
              <div key={cred.id} className="ethos-credential-item">
                <FiCheckCircle className="ethos-credential-icon" />
                <div className="ethos-credential-info">
                  <span className="ethos-credential-name">{cred.name}</span>
                  <span className="ethos-credential-date">
                    <FiClock /> {formatDate(cred.date)}
                  </span>
                </div>
                <div className="ethos-credential-actions">
                  <span className="ethos-credential-status verified">
                    {cred.status}
                  </span>
                  <button 
                    className="ethos-credential-copy"
                    onClick={() => copyToClipboard(cred.name)}
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                  </button>
                  <a href="#" className="ethos-credential-link">
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DAO Memberships */}
      <div className="ethos-daos-section">
        <button 
          className="ethos-section-toggle"
          onClick={() => toggleSection('daos')}
        >
          <FiUsers className="ethos-section-icon" />
          <span>DAO Memberships</span>
          <span className="ethos-section-count">{user.daos.length}</span>
          {expandedSections.daos ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expandedSections.daos && (
          <div className="ethos-daos-list">
            {user.daos.map((dao) => (
              <div key={dao.id} className="ethos-dao-item">
                <div className="ethos-dao-info">
                  <span className="ethos-dao-name">{dao.name}</span>
                  <span className={`ethos-dao-role ${dao.role.toLowerCase()}`}>
                    {dao.role}
                  </span>
                </div>
                <div className="ethos-dao-power-section">
                  <span className="ethos-dao-power">{dao.votingPower}</span>
                  <span className="ethos-dao-power-label">Voting Power</span>
                </div>
                <button className="ethos-dao-action">
                  View DAO
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reputation Summary */}
      <div className="ethos-reputation-footer">
        <div className="ethos-reputation-footer-item">
          <FiActivity className="ethos-footer-icon" />
          <span>Last updated: Block 15,234,567</span>
        </div>
        <div className="ethos-reputation-footer-item">
          <FiClock className="ethos-footer-icon" />
          <span>Reputation age: 245 days</span>
        </div>
        <button className="ethos-reputation-refresh">
          <FiZap /> Refresh Reputation
        </button>
      </div>
    </div>
  );
}