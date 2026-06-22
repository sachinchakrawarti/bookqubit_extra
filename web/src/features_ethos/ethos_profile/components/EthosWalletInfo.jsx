// components/EthosWalletInfo.jsx
"use client";

import { useState } from "react";
import {
  FiDroplet,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiClock,
  FiHexagon,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiRefreshCw,
  FiShield,
  FiZap,
  FiPieChart,
  FiPercent,
  FiDollarSign,
  FiEye,
  FiEyeOff,
  FiMoreHorizontal,
} from "react-icons/fi";
// FiWallet is not available in react-icons/fi, use BsWallet instead
import { BsWallet } from "react-icons/bs";
import "./EthosWalletInfo.css";

export default function EthosWalletInfo({ user, isWalletConnected }) {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFrame, setTimeFrame] = useState("30d");

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(user.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Refresh wallet data
  const refreshWallet = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Format address for display
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get change color
  const getChangeColor = (change) => {
    return change.startsWith('+') ? '#10b981' : '#ef4444';
  };

  // Get change icon
  const getChangeIcon = (change) => {
    return change.startsWith('+') ? <FiArrowUp /> : <FiArrowDown />;
  };

  // Wallet stats with additional data
  const walletStats = [
    { 
      id: 1, 
      icon: <FiDroplet />, 
      value: user.stats.totalValue, 
      label: "Portfolio Value",
      change: "+12.4%",
      color: "#3b82f6"
    },
    { 
      id: 2, 
      icon: <FiHexagon />, 
      value: user.stats.daoMemberships, 
      label: "DAO Memberships",
      change: "+2",
      color: "#8b5cf6"
    },
    { 
      id: 3, 
      icon: <FiClock />, 
      value: user.stats.gasSaved, 
      label: "Gas Saved",
      change: "-5.2%",
      color: "#f59e0b"
    },
    { 
      id: 4, 
      icon: <FiPercent />, 
      value: "4.8%", 
      label: "APY Earned",
      change: "+0.3%",
      color: "#10b981"
    },
  ];

  // Token holdings
  const tokenHoldings = [
    { name: "ETH", amount: "12.5", value: "$32,450", change: "+5.2%" },
    { name: "USDC", amount: "25,000", value: "$25,000", change: "+2.1%" },
    { name: "UNI", amount: "1,250", value: "$8,750", change: "-1.3%" },
    { name: "AAVE", amount: "500", value: "$7,250", change: "+8.7%" },
  ];

  // Recent transactions
  const transactions = [
    { id: 1, type: "send", amount: "2.5 ETH", to: "0x7a8...b9c", time: "2 hours ago", status: "completed" },
    { id: 2, type: "receive", amount: "1,000 USDC", from: "0xdef...123", time: "5 hours ago", status: "completed" },
    { id: 3, type: "swap", amount: "5 ETH → 12,500 USDC", time: "1 day ago", status: "completed" },
    { id: 4, type: "stake", amount: "10 ETH", to: "Lido", time: "2 days ago", status: "pending" },
  ];

  // Get transaction icon
  const getTxIcon = (type) => {
    switch(type) {
      case "send": return <FiArrowUp className="ethos-tx-icon send" />;
      case "receive": return <FiArrowDown className="ethos-tx-icon receive" />;
      case "swap": return <FiTrendingUp className="ethos-tx-icon swap" />;
      case "stake": return <FiZap className="ethos-tx-icon stake" />;
      default: return <FiExternalLink className="ethos-tx-icon" />;
    }
  };

  return (
    <div className="ethos-wallet-card">
      {/* Header */}
      <div className="ethos-wallet-header">
        <div className="ethos-wallet-title-section">
          <BsWallet className="ethos-wallet-icon" />
          <div>
            <h3 className="ethos-wallet-title">Wallet Overview</h3>
            <span className="ethos-wallet-subtitle">
              {formatAddress(user.address)}
            </span>
          </div>
        </div>
        <div className="ethos-wallet-actions-header">
          <button 
            className="ethos-wallet-copy-btn"
            onClick={copyAddress}
            title="Copy address"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
          <button 
            className="ethos-wallet-refresh-btn"
            onClick={refreshWallet}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? "spinning" : ""} />
          </button>
          <button 
            className="ethos-wallet-visibility-btn"
            onClick={() => setShowBalance(!showBalance)}
            title={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? <FiEye /> : <FiEyeOff />}
          </button>
          <div className={`ethos-wallet-status ${isWalletConnected ? "connected" : "disconnected"}`}>
            <span className="ethos-status-dot" />
            {isWalletConnected ? "Connected" : "Disconnected"}
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="ethos-wallet-balance">
        <div className="ethos-balance-main">
          <span className="ethos-balance-value">
            {showBalance ? user.walletBalance : "••••••"}
          </span>
          <span className="ethos-balance-label">Total Balance</span>
        </div>
        <div className="ethos-balance-change positive">
          <FiTrendingUp />
          <span>+8.2% (30d)</span>
        </div>
        <div className="ethos-balance-usd">
          <FiDollarSign />
          <span>$45,280.50 USD</span>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="ethos-wallet-timeframe">
        <button 
          className={`ethos-timeframe-btn ${timeFrame === "7d" ? "active" : ""}`}
          onClick={() => setTimeFrame("7d")}
        >
          7d
        </button>
        <button 
          className={`ethos-timeframe-btn ${timeFrame === "30d" ? "active" : ""}`}
          onClick={() => setTimeFrame("30d")}
        >
          30d
        </button>
        <button 
          className={`ethos-timeframe-btn ${timeFrame === "90d" ? "active" : ""}`}
          onClick={() => setTimeFrame("90d")}
        >
          90d
        </button>
        <button 
          className={`ethos-timeframe-btn ${timeFrame === "1y" ? "active" : ""}`}
          onClick={() => setTimeFrame("1y")}
        >
          1y
        </button>
      </div>

      {/* Stats */}
      <div className="ethos-wallet-stats">
        {walletStats.map((stat) => (
          <div key={stat.id} className="ethos-wallet-stat">
            <div className="ethos-wallet-stat-icon-wrapper" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="ethos-wallet-stat-info">
              <span className="ethos-wallet-stat-value">{stat.value}</span>
              <span className="ethos-wallet-stat-label">{stat.label}</span>
              <span 
                className={`ethos-wallet-stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}
                style={{ color: getChangeColor(stat.change) }}
              >
                {getChangeIcon(stat.change)} {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Token Holdings */}
      <div className="ethos-wallet-tokens">
        <div className="ethos-wallet-tokens-header">
          <span className="ethos-wallet-tokens-title">Token Holdings</span>
          <span className="ethos-wallet-tokens-count">{tokenHoldings.length} tokens</span>
        </div>
        <div className="ethos-wallet-tokens-list">
          {tokenHoldings.map((token, index) => (
            <div key={index} className="ethos-wallet-token">
              <div className="ethos-wallet-token-info">
                <span className="ethos-wallet-token-name">{token.name}</span>
                <span className="ethos-wallet-token-amount">{token.amount}</span>
              </div>
              <div className="ethos-wallet-token-value">
                <span className="ethos-wallet-token-value-text">{token.value}</span>
                <span 
                  className={`ethos-wallet-token-change ${token.change.startsWith('+') ? 'positive' : 'negative'}`}
                  style={{ color: getChangeColor(token.change) }}
                >
                  {token.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="ethos-wallet-transactions">
        <div className="ethos-wallet-transactions-header">
          <span className="ethos-wallet-transactions-title">Recent Transactions</span>
          <button className="ethos-wallet-transactions-view-all">
            View All <FiExternalLink />
          </button>
        </div>
        <div className="ethos-wallet-transactions-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="ethos-wallet-transaction">
              <div className="ethos-wallet-tx-left">
                <div className={`ethos-wallet-tx-icon-wrapper ${tx.type}`}>
                  {getTxIcon(tx.type)}
                </div>
                <div className="ethos-wallet-tx-info">
                  <span className="ethos-wallet-tx-type">
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </span>
                  <span className="ethos-wallet-tx-details">
                    {tx.to || tx.from || tx.amount}
                  </span>
                </div>
              </div>
              <div className="ethos-wallet-tx-right">
                <span className="ethos-wallet-tx-amount">{tx.amount}</span>
                <span className="ethos-wallet-tx-time">{tx.time}</span>
                <span className={`ethos-wallet-tx-status ${tx.status}`}>
                  {tx.status === "completed" ? "✓" : "⏳"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
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
        <button className="ethos-wallet-action-btn quaternary">
          <FiPieChart /> Analytics
        </button>
      </div>

      {/* Security Info */}
      <div className="ethos-wallet-security">
        <div className="ethos-wallet-security-item">
          <FiShield className="ethos-wallet-security-icon" />
          <span>Hardware wallet connected</span>
        </div>
        <div className="ethos-wallet-security-item">
          <FiZap className="ethos-wallet-security-icon" />
          <span>Network: Ethereum Mainnet</span>
        </div>
        <div className="ethos-wallet-security-item">
          <FiClock className="ethos-wallet-security-icon" />
          <span>Last activity: 2 minutes ago</span>
        </div>
      </div>
    </div>
  );
}