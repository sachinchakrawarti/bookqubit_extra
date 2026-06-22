// components/EthosHeader.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiGlobe,
  FiShield,
  FiZap,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiLogOut,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";
import "./EthosHeader.css";

export default function EthosHeader({ 
  trustScore = 94, 
  network = "Ethereum Mainnet",
  userAddress = "0x742d...f44e",
  isVerified = true,
  onConnect,
  onDisconnect,
}) {
  const [isConnected, setIsConnected] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(new Date());
  const [blockNumber, setBlockNumber] = useState("15,234,567");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate block number updates
  useEffect(() => {
    const interval = setInterval(() => {
      const blocks = Math.floor(Math.random() * 10) + 1;
      setBlockNumber(prev => {
        const num = parseInt(prev.replace(/,/g, '')) + blocks;
        return num.toLocaleString();
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle connection
  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected && onConnect) {
      onConnect();
    } else if (isConnected && onDisconnect) {
      onDisconnect();
    }
  };

  // Format time
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Get trust score color
  const getTrustScoreColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 70) return "#f59e0b";
    if (score >= 50) return "#f97316";
    return "#ef4444";
  };

  // Get trust score label
  const getTrustScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="ethos-header">
      <div className="ethos-header-content">
        {/* Left Section */}
        <div className="ethos-header-left">
          <div className="ethos-header-brand">
            <div className="ethos-brand-icon">
              <FiZap className="ethos-brand-icon-svg" />
            </div>
            <div>
              <h1 className="ethos-title">
                <span className="ethos-gradient-text">🌐 Web3</span> Identity
              </h1>
              <p className="ethos-subtitle">
                Decentralized profile • Self-sovereign identity • On-chain reputation
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="ethos-header-right">
          {/* Status Indicators */}
          <div className="ethos-header-statuses">
            {/* Network Status */}
            <div className="ethos-network-badge">
              <div className="ethos-network-indicator" />
              <FiGlobe className="ethos-network-icon" />
              <span className="ethos-network-name">{network}</span>
              <span className="ethos-network-block">
                Block #{blockNumber}
              </span>
            </div>

            {/* Trust Score */}
            <div className="ethos-status-badge">
              <FiShield 
                className="ethos-status-icon" 
                style={{ color: getTrustScoreColor(trustScore) }}
              />
              <span className="ethos-status-label">Trust Score:</span>
              <span 
                className="ethos-status-value"
                style={{ color: getTrustScoreColor(trustScore) }}
              >
                {trustScore}%
              </span>
              <span className="ethos-status-subtle">
                {getTrustScoreLabel(trustScore)}
              </span>
            </div>

            {/* Time */}
            <div className="ethos-time-badge">
              <span className="ethos-time-icon">🕐</span>
              <span className="ethos-time-value">{formattedTime}</span>
              <span className="ethos-time-zone">UTC</span>
            </div>
          </div>

          {/* User Actions */}
          <div className="ethos-header-actions">
            {/* Notifications */}
            <button className="ethos-action-btn" title="Notifications">
              <FiBell className="ethos-action-icon" />
              <span className="ethos-action-badge">3</span>
            </button>

            {/* Messages */}
            <button className="ethos-action-btn" title="Messages">
              <FiMessageSquare className="ethos-action-icon" />
              <span className="ethos-action-badge">5</span>
            </button>

            {/* Wallet Connection */}
            <button 
              className={`ethos-wallet-btn ${isConnected ? "connected" : "disconnected"}`}
              onClick={toggleConnection}
            >
              <div className="ethos-wallet-status-dot" />
              <span className="ethos-wallet-status-text">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
              {isConnected && (
                <span className="ethos-wallet-address">{userAddress}</span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="ethos-user-dropdown">
              <button 
                className="ethos-user-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="ethos-user-avatar">
                  <FiUser />
                  {isVerified && (
                    <FiCheckCircle className="ethos-user-verified" />
                  )}
                </div>
                {showDropdown ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="ethos-dropdown-menu">
                  <div className="ethos-dropdown-header">
                    <div className="ethos-dropdown-avatar">
                      <FiUser />
                    </div>
                    <div className="ethos-dropdown-user">
                      <span className="ethos-dropdown-name">John Doe</span>
                      <span className="ethos-dropdown-address">{userAddress}</span>
                    </div>
                  </div>

                  <div className="ethos-dropdown-divider" />

                  <button className="ethos-dropdown-item">
                    <FiUser /> Profile
                  </button>
                  <button className="ethos-dropdown-item">
                    <FiSettings /> Settings
                  </button>
                  <button className="ethos-dropdown-item">
                    <FiShield /> Security
                  </button>

                  <div className="ethos-dropdown-divider" />

                  <button 
                    className="ethos-dropdown-item ethos-dropdown-logout"
                    onClick={toggleConnection}
                  >
                    <FiLogOut /> {isConnected ? "Disconnect" : "Connect"} Wallet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="ethos-header-mobile-status">
        <div className="ethos-mobile-status-item">
          <FiShield style={{ color: getTrustScoreColor(trustScore) }} />
          <span>Trust: {trustScore}%</span>
        </div>
        <div className="ethos-mobile-status-item">
          <FiGlobe />
          <span>{network}</span>
        </div>
        <div className="ethos-mobile-status-item">
          <span>🕐</span>
          <span>{formattedTime}</span>
        </div>
        <button 
          className={`ethos-mobile-wallet-btn ${isConnected ? "connected" : "disconnected"}`}
          onClick={toggleConnection}
        >
          {isConnected ? "● Connected" : "○ Disconnected"}
        </button>
      </div>
    </div>
  );
}