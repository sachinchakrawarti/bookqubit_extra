// components/EthosWalletInfo.jsx
"use client";

import { FiWallet, FiDroplet, FiTrendingUp, FiArrowUp, FiArrowDown, FiClock, FiHexagon } from "react-icons/fi";

export default function EthosWalletInfo({ user, isWalletConnected }) {
  return (
    <div className="ethos-wallet-card">
      <div className="ethos-wallet-header">
        <div className="ethos-wallet-title-section">
          <FiWallet className="ethos-wallet-icon" />
          <h3 className="ethos-wallet-title">Wallet Overview</h3>
        </div>
        <div className={`ethos-wallet-status ${isWalletConnected ? "connected" : "disconnected"}`}>
          <span className="ethos-status-dot" />
          {isWalletConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="ethos-wallet-content">
        <div className="ethos-wallet-balance">
          <div className="ethos-balance-main">
            <span className="ethos-balance-value">{user.walletBalance}</span>
            <span className="ethos-balance-label">Total Balance</span>
          </div>
          <div className="ethos-balance-change positive">
            <FiTrendingUp />
            <span>+8.2% (30d)</span>
          </div>
        </div>

        <div className="ethos-wallet-stats">
          <div className="ethos-wallet-stat">
            <FiDroplet className="ethos-wallet-stat-icon" />
            <div>
              <span className="ethos-wallet-stat-value">{user.stats.totalValue}</span>
              <span className="ethos-wallet-stat-label">Portfolio Value</span>
            </div>
          </div>
          <div className="ethos-wallet-stat">
            <FiHexagon className="ethos-wallet-stat-icon" />
            <div>
              <span className="ethos-wallet-stat-value">{user.stats.daoMemberships}</span>
              <span className="ethos-wallet-stat-label">DAO Memberships</span>
            </div>
          </div>
          <div className="ethos-wallet-stat">
            <FiClock className="ethos-wallet-stat-icon" />
            <div>
              <span className="ethos-wallet-stat-value">{user.stats.gasSaved}</span>
              <span className="ethos-wallet-stat-label">Gas Saved</span>
            </div>
          </div>
        </div>

        <div className="ethos-wallet-actions">
          <button className="ethos-wallet-action-btn primary">
            <FiArrowUp /> Send
          </button>
          <button className="ethos-wallet-action-btn secondary">
            <FiArrowDown /> Receive
          </button>
          <button className="ethos-wallet-action-btn tertiary">
            <FiTrendingUp /> Stake
          </button>
        </div>
      </div>
    </div>
  );
}