// components/EthosIdentityCard.jsx
"use client";

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
  FiDiscord,
  FiMail,
} from "react-icons/fi";

export default function EthosIdentityCard({ user, isVerified }) {
  const copyAddress = () => {
    navigator.clipboard.writeText(user.address);
  };

  const socialIcons = {
    twitter: <FiTwitter />,
    github: <FiGithub />,
    discord: <FiDiscord />,
    email: <FiMail />,
  };

  return (
    <div className="ethos-identity-card">
      <div className="ethos-identity-header">
        <div className="ethos-identity-avatar-wrapper">
          <div className="ethos-identity-avatar">
            <img src={user.avatar} alt={user.name} />
            {isVerified && (
              <div className="ethos-verification-badge">
                <FiCheckCircle />
              </div>
            )}
          </div>
          <div className="ethos-identity-status">
            <span className="ethos-status-dot online" />
            <span className="ethos-status-text">Online</span>
          </div>
        </div>

        <div className="ethos-identity-info">
          <div className="ethos-identity-name-section">
            <h2 className="ethos-identity-name">{user.name}</h2>
            <span className="ethos-identity-ens">{user.ens}</span>
            {isVerified && (
              <span className="ethos-verified-label">
                <FiCheckCircle /> Verified
              </span>
            )}
          </div>

          <div className="ethos-identity-address">
            <span className="ethos-address-label">Wallet Address</span>
            <div className="ethos-address-value">
              <span>{user.address}</span>
              <button onClick={copyAddress} className="ethos-copy-btn">
                <FiCopy />
              </button>
              <a href="#" className="ethos-explorer-link">
                <FiExternalLink />
              </a>
            </div>
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
          </div>

          <div className="ethos-social-links">
            {Object.entries(user.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ethos-social-link"
              >
                {socialIcons[platform] || <FiExternalLink />}
              </a>
            ))}
          </div>

          <button className="ethos-edit-profile-btn">
            <FiEdit2 /> Edit Profile
          </button>
        </div>

        <div className="ethos-identity-stats">
          <div className="ethos-identity-stat">
            <span className="ethos-stat-value">{user.reputationScore}</span>
            <span className="ethos-stat-label">Reputation Score</span>
          </div>
          <div className="ethos-identity-stat">
            <span className="ethos-stat-value">{user.trustScore}%</span>
            <span className="ethos-stat-label">Trust Score</span>
          </div>
          <div className="ethos-identity-stat">
            <span className="ethos-stat-value">{user.stats.transactions}</span>
            <span className="ethos-stat-label">Transactions</span>
          </div>
          <div className="ethos-identity-stat">
            <span className="ethos-stat-value">{user.stats.tokensHeld}</span>
            <span className="ethos-stat-label">Tokens Held</span>
          </div>
        </div>
      </div>
    </div>
  );
}