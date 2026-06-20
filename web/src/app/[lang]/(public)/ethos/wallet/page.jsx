// d:\Projects\done\bookqubit etra\web\src\app\[lang]\(public)\ethos\wallet\page.jsx

"use client";

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
import { useState } from "react";

export default function EthosWalletPage() {
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

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle size={14} />;
      case "pending":
        return <FaClock size={14} />;
      case "failed":
        return <FaSpinner size={14} />;
      default:
        return null;
    }
  };

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    // Show toast notification (you can add this later)
  };

  return (
    <div className="ethos-wallet-page">
      {/* Header */}
      <div className="ethos-wallet-header">
        <div>
          <h1
            className="ethos-wallet-title"
            style={{
              color: isDarkMode ? "#f1f5f9" : "#0f172a",
              fontSize: "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaWallet size={24} style={{ color: "#8b5cf6" }} />
            Wallet
          </h1>
          <p
            className="ethos-wallet-subtitle"
            style={{
              color: isDarkMode ? "#94a3b8" : "#64748b",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            Manage your digital assets and Web3 identity
          </p>
        </div>
        <div
          className="ethos-wallet-status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "20px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <span
            className="ethos-status-dot"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          Connected
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div
        className="ethos-balance-card"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #1e293b, #0f172a)"
            : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          borderRadius: "20px",
          padding: "32px",
          marginBottom: "24px",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p
                style={{ opacity: 0.8, fontSize: "14px", marginBottom: "4px" }}
              >
                Total Balance
              </p>
              <h2 style={{ fontSize: "36px", fontWeight: "700" }}>
                {walletData.value}
              </h2>
              <p style={{ opacity: 0.7, fontSize: "14px" }}>
                {walletData.balance.eth} ETH · {walletData.balance.ethos} ETHOS
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setShowReceiveModal(true)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                <FaArrowDown size={14} />
                Receive
              </button>
              <button
                onClick={() => setShowSendModal(true)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                <FaArrowUp size={14} />
                Send
              </button>
            </div>
          </div>

          {/* Address */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "12px",
              maxWidth: "fit-content",
            }}
          >
            <FaShieldAlt size={16} style={{ opacity: 0.7 }} />
            <span style={{ fontSize: "14px", fontFamily: "monospace" }}>
              {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
            </span>
            <button
              onClick={copyAddress}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              <FaCopy size={14} />
            </button>
            <a
              href={`https://etherscan.io/address/${walletData.address}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffffff",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              <FaExternalLinkAlt size={14} />
            </a>
          </div>
        </div>

        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Quick Actions */}
      <div
        className="ethos-quick-actions-wallet"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="ethos-action-btn-wallet"
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon size={20} color={action.color} />
              <span style={{ fontSize: "13px", fontWeight: "500" }}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div
        className="ethos-wallet-tabs"
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "24px",
          borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          paddingBottom: "4px",
        }}
      >
        {["assets", "transactions", "nfts"].map((tab) => (
          <button
            key={tab}
            className={`ethos-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background:
                activeTab === tab
                  ? isDarkMode
                    ? "#3b82f6"
                    : "#2563eb"
                  : "transparent",
              color:
                activeTab === tab
                  ? "#ffffff"
                  : isDarkMode
                    ? "#94a3b8"
                    : "#64748b",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: activeTab === tab ? "600" : "500",
              transition: "all 0.2s ease",
            }}
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
              <div
                key={index}
                className="ethos-asset-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                  backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: `${asset.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    {asset.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: isDarkMode ? "#f1f5f9" : "#0f172a",
                      }}
                    >
                      {asset.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                      }}
                    >
                      {asset.symbol}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: isDarkMode ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    {asset.balance} {asset.symbol}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: isDarkMode ? "#94a3b8" : "#64748b",
                    }}
                  >
                    {asset.value}
                    <span
                      style={{
                        color: asset.change.startsWith("+")
                          ? "#10b981"
                          : "#ef4444",
                        marginLeft: "4px",
                      }}
                    >
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
              <div
                key={tx.id}
                className="ethos-transaction-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                  backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor:
                        tx.type === "received"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(239,68,68,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: tx.type === "received" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {tx.type === "received" ? (
                      <FaArrowDown size={18} />
                    ) : (
                      <FaArrowUp size={18} />
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "500",
                        color: isDarkMode ? "#f1f5f9" : "#0f172a",
                      }}
                    >
                      {tx.type === "received" ? "Received" : "Sent"} {tx.asset}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: isDarkMode ? "#94a3b8" : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {tx.type === "received"
                        ? `From ${tx.from}`
                        : `To ${tx.to}`}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: getStatusColor(tx.status),
                        }}
                      >
                        {getStatusIcon(tx.status)}
                        <span style={{ textTransform: "capitalize" }}>
                          {tx.status}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isDarkMode ? "#64748b" : "#94a3b8",
                      }}
                    >
                      {tx.time}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: tx.type === "received" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {tx.amount} {tx.asset}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: isDarkMode ? "#94a3b8" : "#64748b",
                    }}
                  >
                    {tx.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NFTS TAB */}
        {activeTab === "nfts" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="ethos-nft-item"
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                    border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                    {nft.image}
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: isDarkMode ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    {nft.name}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: isDarkMode ? "#94a3b8" : "#64748b",
                    }}
                  >
                    {nft.edition}
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(139,92,246,0.1)",
                      color: "#8b5cf6",
                      fontSize: "13px",
                      fontWeight: "500",
                      display: "inline-block",
                    }}
                  >
                    {nft.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Receive Modal */}
      {showReceiveModal && (
        <div
          className="ethos-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowReceiveModal(false)}
        >
          <div
            className="ethos-modal"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "400px",
              width: "100%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
              }}
            >
              Receive
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
                marginBottom: "20px",
              }}
            >
              Share this address to receive funds
            </p>
            <div
              style={{
                padding: "16px",
                backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9",
                borderRadius: "12px",
                marginBottom: "16px",
                textAlign: "center",
                wordBreak: "break-all",
                fontFamily: "monospace",
                fontSize: "14px",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
              }}
            >
              {walletData.address}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={copyAddress}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <FaCopy size={14} style={{ marginRight: "6px" }} />
                Copy
              </button>
              <button
                onClick={() => setShowReceiveModal(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "12px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  backgroundColor: "transparent",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  cursor: "pointer",
                }}
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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowSendModal(false)}
        >
          <div
            className="ethos-modal"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "400px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
              }}
            >
              Send
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
                marginBottom: "20px",
              }}
            >
              Send funds to any address
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Recipient Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Amount
              </label>
              <input
                type="number"
                placeholder="0.0"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Asset
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  fontSize: "14px",
                  outline: "none",
                }}
              >
                <option>ETH</option>
                <option>ETHOS</option>
                <option>USDC</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Send
              </button>
              <button
                onClick={() => setShowSendModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  backgroundColor: "transparent",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  cursor: "pointer",
                }}
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
