// src/features_ethos/wallet/wallet.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import {
  FaWallet,
  FaEthereum,
  FaCoins,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaHistory,
  FaShieldAlt,
  FaCopy,
  FaExternalLinkAlt,
  FaQrcode,
  FaPlus,
  FaMinus,
  FaDollarSign,
  FaChartLine,
  FaLock,
  FaUnlock,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaArrowRight,
  FaArrowLeft,
  FaCreditCard,
  FaBank,
  FaBitcoin,
  FaGem,
} from "react-icons/fa";
import { MdOutlineWallet } from "react-icons/md";

import "./wallet.css";

export default function Wallet() {
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Wallet state
  const [walletConnected, setWalletConnected] = useState(true);
  const [activeTab, setActiveTab] = useState("assets");
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  // Wallet Data
  const walletData = {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    balance: {
      eth: 2.45,
      ethos: 1234.56,
      usdc: 567.89,
    },
    value: "$4,892.34",
  };

  // Transaction History
  const transactions = [
    {
      id: 1,
      type: "received",
      asset: "ETH",
      amount: "+0.45",
      value: "$1,234.56",
      from: "0x1a2b...3c4d",
      time: "2 min ago",
      status: "completed",
      hash: "0xabcdef1234567890",
    },
    {
      id: 2,
      type: "sent",
      asset: "ETHOS",
      amount: "-50.00",
      value: "$43.50",
      to: "0x5e6f...7g8h",
      time: "1 hour ago",
      status: "completed",
      hash: "0x9876543210fedcba",
    },
    {
      id: 3,
      type: "received",
      asset: "USDC",
      amount: "+100.00",
      value: "$100.00",
      from: "0x9i0j...1k2l",
      time: "3 hours ago",
      status: "pending",
      hash: "0x4567890123456789",
    },
    {
      id: 4,
      type: "sent",
      asset: "ETH",
      amount: "-0.02",
      value: "$54.32",
      to: "0x3m4n...5o6p",
      time: "Yesterday",
      status: "completed",
      hash: "0x3210987654321098",
    },
    {
      id: 5,
      type: "received",
      asset: "ETHOS",
      amount: "+25.00",
      value: "$21.75",
      from: "Reading Reward",
      time: "2 days ago",
      status: "completed",
      hash: "0x7890123456789012",
    },
  ];

  // Assets Data
  const assets = [
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: walletData.balance.eth,
      value: "$6,712.50",
      icon: "⟠",
      color: "#627eea",
      change: "+2.4%",
    },
    {
      name: "Ethos Token",
      symbol: "ETHOS",
      balance: walletData.balance.ethos,
      value: "$1,073.47",
      icon: "⚓",
      color: "#8b5cf6",
      change: "+12.8%",
    },
    {
      name: "USDC",
      symbol: "USDC",
      balance: walletData.balance.usdc,
      value: "$567.89",
      icon: "💵",
      color: "#2775ca",
      change: "+0.01%",
    },
  ];

  // NFTs Owned
  const nfts = [
    {
      id: 1,
      name: "The Quantum Reader",
      edition: "1/100",
      value: "0.45 ETH",
      image: "🔮",
    },
    {
      id: 2,
      name: "Web3 Wisdom",
      edition: "23/250",
      value: "0.28 ETH",
      image: "📖",
    },
    {
      id: 3,
      name: "Digital Poetry Vol. 1",
      edition: "47/500",
      value: "0.12 ETH",
      image: "📝",
    },
  ];

  // Quick Actions
  const quickActions = [
    { icon: FaArrowUp, label: "Send", color: "#3b82f6" },
    { icon: FaArrowDown, label: "Receive", color: "#10b981" },
    { icon: FaExchangeAlt, label: "Swap", color: "#8b5cf6" },
    { icon: FaHistory, label: "History", color: "#f59e0b" },
  ];

  // Status helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "#10b981";
      case "pending": return "#f59e0b";
      case "failed": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <FaCheckCircle size={14} />;
      case "pending": return <FaClock size={14} />;
      case "failed": return <FaSpinner size={14} />;
      default: return null;
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
  };

  return (
    <div className="ethos-wallet-page">
      {/* Header */}
      <div className="ethos-wallet-header">
        <div>
          <h1 className="ethos-wallet-title">
            <FaWallet size={24} className="ethos-wallet-icon" />
            Wallet
          </h1>
          <p className="ethos-wallet-subtitle">
            Manage your digital assets and Web3 identity
          </p>
        </div>
        <div className="ethos-wallet-status">
          <span className="ethos-status-dot" />
          Connected
        </div>
      </div>

      {/* Balance Card */}
      <div className={`ethos-balance-card ${isDarkMode ? 'dark' : ''}`}>
        <div className="ethos-balance-content">
          <div className="ethos-balance-top">
            <div>
              <p className="ethos-balance-label">Total Balance</p>
              <h2 className="ethos-balance-amount">{walletData.value}</h2>
              <p className="ethos-balance-detail">
                {walletData.balance.eth} ETH · {walletData.balance.ethos} ETHOS
              </p>
            </div>
            <div className="ethos-balance-actions">
              <button 
                className="ethos-balance-btn"
                onClick={() => setShowReceiveModal(true)}
              >
                <FaArrowDown size={14} />
                Receive
              </button>
              <button 
                className="ethos-balance-btn"
                onClick={() => setShowSendModal(true)}
              >
                <FaArrowUp size={14} />
                Send
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="ethos-address-box">
            <FaShieldAlt size={16} className="ethos-address-icon" />
            <span className="ethos-address-text">
              {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
            </span>
            <button onClick={copyAddress} className="ethos-address-copy">
              <FaCopy size={14} />
            </button>
            <a
              href={`https://etherscan.io/address/${walletData.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ethos-address-link"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          </div>
        </div>
        <div className="ethos-balance-decoration" />
      </div>

      {/* Quick Actions */}
      <div className="ethos-quick-actions">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button key={index} className="ethos-action-btn">
              <Icon size={20} color={action.color} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="ethos-wallet-tabs">
        {["assets", "transactions", "nfts"].map((tab) => (
          <button
            key={tab}
            className={`ethos-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="ethos-wallet-content">
        {/* ASSETS TAB */}
        {activeTab === "assets" && (
          <div>
            {assets.map((asset, index) => (
              <div key={index} className="ethos-asset-item">
                <div className="ethos-asset-left">
                  <div 
                    className="ethos-asset-icon"
                    style={{ backgroundColor: `${asset.color}20` }}
                  >
                    {asset.icon}
                  </div>
                  <div>
                    <div className="ethos-asset-name">{asset.name}</div>
                    <div className="ethos-asset-symbol">{asset.symbol}</div>
                  </div>
                </div>
                <div className="ethos-asset-right">
                  <div className="ethos-asset-balance">
                    {asset.balance} {asset.symbol}
                  </div>
                  <div className="ethos-asset-value">
                    {asset.value}
                    <span className={`ethos-asset-change ${asset.change.startsWith("+") ? "positive" : "negative"}`}>
                      {asset.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === "transactions" && (
          <div>
            {transactions.map((tx) => (
              <div key={tx.id} className="ethos-transaction-item">
                <div className="ethos-transaction-left">
                  <div className={`ethos-transaction-icon ${tx.type}`}>
                    {tx.type === "received" ? (
                      <FaArrowDown size={18} />
                    ) : (
                      <FaArrowUp size={18} />
                    )}
                  </div>
                  <div>
                    <div className="ethos-transaction-title">
                      {tx.type === "received" ? "Received" : "Sent"} {tx.asset}
                    </div>
                    <div className="ethos-transaction-detail">
                      {tx.type === "received" ? `From ${tx.from}` : `To ${tx.to}`}
                      <span 
                        className="ethos-transaction-status"
                        style={{ color: getStatusColor(tx.status) }}
                      >
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </span>
                    </div>
                    <div className="ethos-transaction-time">{tx.time}</div>
                  </div>
                </div>
                <div className="ethos-transaction-right">
                  <div className={`ethos-transaction-amount ${tx.type}`}>
                    {tx.amount} {tx.asset}
                  </div>
                  <div className="ethos-transaction-value">{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NFTS TAB */}
        {activeTab === "nfts" && (
          <div className="ethos-nfts-grid">
            {nfts.map((nft) => (
              <div key={nft.id} className="ethos-nft-item">
                <div className="ethos-nft-image">{nft.image}</div>
                <div className="ethos-nft-name">{nft.name}</div>
                <div className="ethos-nft-edition">{nft.edition}</div>
                <div className="ethos-nft-value">{nft.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receive Modal */}
      {showReceiveModal && (
        <div 
          className="ethos-modal-overlay"
          onClick={() => setShowReceiveModal(false)}
        >
          <div 
            className="ethos-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="ethos-modal-title">Receive</h3>
            <p className="ethos-modal-subtitle">
              Share this address to receive funds
            </p>
            <div className="ethos-modal-address">
              {walletData.address}
            </div>
            <div className="ethos-modal-actions">
              <button onClick={copyAddress} className="ethos-modal-btn primary">
                <FaCopy size={14} />
                Copy
              </button>
              <button 
                onClick={() => setShowReceiveModal(false)} 
                className="ethos-modal-btn secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div 
          className="ethos-modal-overlay"
          onClick={() => setShowSendModal(false)}
        >
          <div 
            className="ethos-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="ethos-modal-title">Send</h3>
            <p className="ethos-modal-subtitle">
              Send funds to any address
            </p>
            <div className="ethos-modal-form-group">
              <label className="ethos-modal-label">Recipient Address</label>
              <input 
                type="text" 
                placeholder="0x..." 
                className="ethos-modal-input"
              />
            </div>
            <div className="ethos-modal-form-group">
              <label className="ethos-modal-label">Amount</label>
              <input 
                type="number" 
                placeholder="0.0" 
                className="ethos-modal-input"
              />
            </div>
            <div className="ethos-modal-form-group">
              <label className="ethos-modal-label">Asset</label>
              <select className="ethos-modal-select">
                <option>ETH</option>
                <option>ETHOS</option>
                <option>USDC</option>
              </select>
            </div>
            <div className="ethos-modal-actions">
              <button className="ethos-modal-btn primary">Send</button>
              <button 
                onClick={() => setShowSendModal(false)} 
                className="ethos-modal-btn secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}