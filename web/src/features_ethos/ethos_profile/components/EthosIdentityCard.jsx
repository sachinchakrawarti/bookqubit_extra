// components/EthosIdentityCard.jsx
"use client";

import { useState } from "react";
import {
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiShield,
  FiTwitter,
  FiGithub,
  FiMail,
  FiUser,
  FiStar,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiCheck,
  FiX,
  FiMoreHorizontal,
  FiShare2,
  FiSend,
  FiMessageCircle,
  FiCamera,
} from "react-icons/fi";
// FiQrCode and FiDiscord are not available in react-icons/fi
import { BsQrCode } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import "./EthosIdentityCard.css";

export default function EthosIdentityCard({ user, isVerified }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(user.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share profile
  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Web3 Profile`,
        text: `Check out ${user.name}'s Web3 profile: ${user.ens}`,
        url: window.location.href,
      });
    }
  };

  // Social icons mapping
  const socialIcons = {
    twitter: <FiTwitter />,
    github: <FiGithub />,
    discord: <FaDiscord />,
    email: <FiMail />,
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

  // Format address for display
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get level badge color
  const getLevelColor = (level) => {
    const colors = {
      Platinum: "#ec4899",
      Gold: "#f59e0b",
      Silver: "#9ca3af",
      Bronze: "#cd7f32",
    };
    return colors[level] || "#6b7280";
  };

  return (
    <div className="ethos-identity-card">
      <div className="ethos-identity-header">
        {/* Avatar Section */}
        <div className="ethos-identity-avatar-wrapper">
          <div 
            className="ethos-identity-avatar"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img src={user.avatar} alt={user.name} />
            {isVerified && (
              <div className="ethos-verification-badge">
                <FiCheckCircle />
              </div>
            )}
            {isHovering && (
              <div className="ethos-avatar-overlay">
                <button className="ethos-avatar-action">
                  <FiCamera />
                </button>
              </div>
            )}
          </div>

          <div className="ethos-identity-status">
            <span className="ethos-status-dot online" />
            <span className="ethos-status-text">Online</span>
            <span className="ethos-status-divider">•</span>
            <span className="ethos-status-text">{user.verificationLevel} Member</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="ethos-identity-info">
          <div className="ethos-identity-name-section">
            <h2 className="ethos-identity-name">{user.name}</h2>
            <span className="ethos-identity-ens">{user.ens}</span>
            {isVerified && (
              <span className="ethos-verified-label">
                <FiCheckCircle /> Verified
              </span>
            )}
            <button className="ethos-share-btn" onClick={shareProfile}>
              <FiShare2 />
            </button>
          </div>

          <div className="ethos-identity-address">
            <span className="ethos-address-label">Wallet Address</span>
            <div className="ethos-address-value">
              <span className="ethos-address-text">{formatAddress(user.address)}</span>
              <button 
                onClick={copyAddress} 
                className={`ethos-copy-btn ${copied ? "copied" : ""}`}
                title="Copy address"
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
              <button 
                className="ethos-qr-btn" 
                onClick={() => setShowQR(!showQR)}
                title="Show QR code"
              >
                <BsQrCode />
              </button>
              <a href="#" className="ethos-explorer-link" title="View on explorer">
                <FiExternalLink />
              </a>
            </div>
            {showQR && (
              <div className="ethos-qr-popup">
                <div className="ethos-qr-content">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.address}`}
                    alt="Wallet QR Code"
                  />
                  <span className="ethos-qr-address">{user.address}</span>
                  <button onClick={() => setShowQR(false)} className="ethos-qr-close">
                    <FiX />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="ethos-identity-bio">{user.bio}</p>

          <div className="ethos-identity-meta">
            <span className="ethos-meta-item">
              <FiMapPin /> {user.location}
            </span>
            <span className="ethos-meta-item">
              <FiCalendar /> Joined {user.joinDate}
            </span>
            <span className="ethos-meta-item">
              <FiShield /> Level: {user.verificationLevel}
            </span>
            <span 
              className="ethos-meta-item ethos-trust-score"
              style={{ color: getTrustColor(user.trustScore) }}
            >
              <FiStar /> Trust: {user.trustScore}% ({getTrustLabel(user.trustScore)})
            </span>
          </div>

          <div className="ethos-social-links">
            {Object.entries(user.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`ethos-social-link ${platform}`}
                title={`${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
              >
                {socialIcons[platform] || <FiExternalLink />}
              </a>
            ))}
            <button className="ethos-social-link more">
              <FiMoreHorizontal />
            </button>
          </div>

          <div className="ethos-identity-actions">
            <button className="ethos-edit-profile-btn">
              <FiEdit2 /> Edit Profile
            </button>
            <button className="ethos-message-btn">
              <FiSend /> Message
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="ethos-identity-stats">
          <div className="ethos-identity-stat">
            <FiAward className="ethos-stat-icon" />
            <span className="ethos-stat-value">{user.reputationScore}</span>
            <span className="ethos-stat-label">Reputation</span>
          </div>
          <div className="ethos-identity-stat">
            <FiTrendingUp className="ethos-stat-icon" />
            <span className="ethos-stat-value">{user.trustScore}%</span>
            <span className="ethos-stat-label">Trust Score</span>
          </div>
          <div className="ethos-identity-stat">
            <FiClock className="ethos-stat-icon" />
            <span className="ethos-stat-value">{user.stats.transactions}</span>
            <span className="ethos-stat-label">Transactions</span>
          </div>
          <div className="ethos-identity-stat">
            <FiUser className="ethos-stat-icon" />
            <span className="ethos-stat-value">{user.stats.tokensHeld}</span>
            <span className="ethos-stat-label">Tokens Held</span>
          </div>
        </div>
      </div>

      {/* Level Badge */}
      <div 
        className="ethos-level-badge"
        style={{ 
          backgroundColor: getLevelColor(user.verificationLevel),
          boxShadow: `0 4px 20px ${getLevelColor(user.verificationLevel)}40`
        }}
      >
        <span className="ethos-level-text">{user.verificationLevel}</span>
        <span className="ethos-level-label">Verification Level</span>
      </div>
    </div>
  );
}