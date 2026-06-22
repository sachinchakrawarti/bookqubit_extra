// components/EthosSocialProof.jsx
"use client";

import { FiUsers, FiThumbsUp, FiMessageCircle, FiUserPlus, FiHeart, FiCheckCircle } from "react-icons/fi";

export default function EthosSocialProof({ user }) {
  return (
    <div className="ethos-social-proof">
      <div className="ethos-social-proof-header">
        <div className="ethos-social-proof-title-section">
          <FiUsers className="ethos-social-proof-icon" />
          <h3 className="ethos-social-proof-title">Social Proof</h3>
        </div>
      </div>

      <div className="ethos-social-proof-content">
        <div className="ethos-social-proof-stats">
          <div className="ethos-social-proof-stat">
            <FiThumbsUp className="ethos-social-stat-icon" />
            <div>
              <span className="ethos-social-stat-value">2.4K</span>
              <span className="ethos-social-stat-label">Endorsements</span>
            </div>
          </div>
          <div className="ethos-social-proof-stat">
            <FiMessageCircle className="ethos-social-stat-icon" />
            <div>
              <span className="ethos-social-stat-value">847</span>
              <span className="ethos-social-stat-label">Reviews</span>
            </div>
          </div>
          <div className="ethos-social-proof-stat">
            <FiUserPlus className="ethos-social-stat-icon" />
            <div>
              <span className="ethos-social-stat-value">1.2K</span>
              <span className="ethos-social-stat-label">Followers</span>
            </div>
          </div>
          <div className="ethos-social-proof-stat">
            <FiHeart className="ethos-social-stat-icon" />
            <div>
              <span className="ethos-social-stat-value">3.8K</span>
              <span className="ethos-social-stat-label">Likes</span>
            </div>
          </div>
        </div>

        <div className="ethos-social-proof-verification">
          <div className="ethos-verification-item">
            <FiCheckCircle className="ethos-verification-icon" />
            <span>BrightID Verified</span>
          </div>
          <div className="ethos-verification-item">
            <FiCheckCircle className="ethos-verification-icon" />
            <span>Gitcoin Passport</span>
          </div>
          <div className="ethos-verification-item">
            <FiCheckCircle className="ethos-verification-icon" />
            <span>Proof of Humanity</span>
          </div>
          <div className="ethos-verification-item">
            <FiCheckCircle className="ethos-verification-icon" />
            <span>ENS Registered</span>
          </div>
        </div>

        <div className="ethos-trust-score">
          <div className="ethos-trust-score-bar">
            <div className="ethos-trust-score-fill" style={{ width: `${user.trustScore}%` }} />
          </div>
          <div className="ethos-trust-score-info">
            <span className="ethos-trust-score-label">Trust Score</span>
            <span className="ethos-trust-score-value">{user.trustScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}