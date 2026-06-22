// components/EthosReputation.jsx
"use client";

import { FiStar, FiShield, FiTrendingUp, FiAward, FiUsers, FiCheckCircle } from "react-icons/fi";

export default function EthosReputation({ user }) {
  return (
    <div className="ethos-reputation-card">
      <div className="ethos-reputation-header">
        <div className="ethos-reputation-title-section">
          <FiStar className="ethos-reputation-icon" />
          <h3 className="ethos-reputation-title">On-Chain Reputation</h3>
        </div>
      </div>

      <div className="ethos-reputation-content">
        <div className="ethos-reputation-score">
          <div className="ethos-score-circle">
            <svg viewBox="0 0 36 36" className="ethos-score-svg">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={`${user.reputationScore / 10}, 100`}
                strokeLinecap="round"
              />
              <text x="18" y="20.5" className="ethos-score-text">
                {user.reputationScore}
              </text>
            </svg>
          </div>
          <div className="ethos-score-info">
            <h4>Reputation Score</h4>
            <p>Based on on-chain activity, governance participation, and social trust</p>
          </div>
        </div>

        <div className="ethos-reputation-metrics">
          <div className="ethos-reputation-metric">
            <FiShield className="ethos-metric-icon" />
            <div>
              <span className="ethos-metric-value">{user.trustScore}%</span>
              <span className="ethos-metric-label">Trust Score</span>
            </div>
          </div>
          <div className="ethos-reputation-metric">
            <FiTrendingUp className="ethos-metric-icon" />
            <div>
              <span className="ethos-metric-value">{user.stats.proposalsVoted}</span>
              <span className="ethos-metric-label">Proposals Voted</span>
            </div>
          </div>
          <div className="ethos-reputation-metric">
            <FiUsers className="ethos-metric-icon" />
            <div>
              <span className="ethos-metric-value">{user.stats.delegations}</span>
              <span className="ethos-metric-label">Delegations</span>
            </div>
          </div>
          <div className="ethos-reputation-metric">
            <FiAward className="ethos-metric-icon" />
            <div>
              <span className="ethos-metric-value">{user.badges.length}</span>
              <span className="ethos-metric-label">Badges Earned</span>
            </div>
          </div>
        </div>

        <div className="ethos-credentials">
          <h4 className="ethos-credentials-title">Verified Credentials</h4>
          <div className="ethos-credentials-list">
            {user.credentials.map((cred) => (
              <div key={cred.id} className="ethos-credential-item">
                <FiCheckCircle className="ethos-credential-icon" />
                <div className="ethos-credential-info">
                  <span className="ethos-credential-name">{cred.name}</span>
                  <span className="ethos-credential-date">{cred.date}</span>
                </div>
                <span className="ethos-credential-status verified">{cred.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ethos-daos">
          <h4 className="ethos-daos-title">DAO Memberships</h4>
          <div className="ethos-daos-list">
            {user.daos.map((dao) => (
              <div key={dao.id} className="ethos-dao-item">
                <div className="ethos-dao-info">
                  <span className="ethos-dao-name">{dao.name}</span>
                  <span className="ethos-dao-role">{dao.role}</span>
                </div>
                <span className="ethos-dao-power">{dao.votingPower}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}