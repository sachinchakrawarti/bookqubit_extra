// src/app/[lang]/(public)/ethos/page.jsx
"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import {
  FaEthereum,
  FaCoins,
  FaBook,
  FaUsers,
  FaGavel,
  FaChartLine,
  FaRocket,
  FaShieldAlt,
  FaWallet,
  FaCrown,
  FaStar,
  FaFire,
  FaArrowRight,
  FaLock,
  FaUnlock,
  FaExchangeAlt,
  FaVoteYea,
  FaGift,
  FaTrophy,
  FaGem,
} from "react-icons/fa";
import { MdExplore, MdChat, MdAnchor } from "react-icons/md";
import "./ethos.css";

export default function EthosPage() {
  const { theme, themeName } = useTheme();

  // Check if current theme is dark mode
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Get theme-aware styles
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const primaryText = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

  // Stats data
  const stats = [
    { label: "Total Books", value: "12,847", icon: FaBook, color: "#3b82f6" },
    { label: "NFT Holders", value: "8,234", icon: FaUsers, color: "#8b5cf6" },
    {
      label: "Total Volume",
      value: "345.2 ETH",
      icon: FaEthereum,
      color: "#f59e0b",
    },
    {
      label: "Active DAO Members",
      value: "1,847",
      icon: FaGavel,
      color: "#10b981",
    },
  ];

  // Featured NFTs
  const featuredNFTs = [
    {
      id: 1,
      title: "The Quantum Reader",
      author: "Elena Voss",
      price: "0.45 ETH",
      edition: "1/100",
      image: "🔮",
      verified: true,
    },
    {
      id: 2,
      title: "Web3 Wisdom",
      author: "Marcus Chen",
      price: "0.28 ETH",
      edition: "1/250",
      image: "📖",
      verified: true,
    },
    {
      id: 3,
      title: "Digital Poetry Vol. 1",
      author: "Sofia Reyes",
      price: "0.12 ETH",
      edition: "1/500",
      image: "📝",
      verified: false,
    },
    {
      id: 4,
      title: "The Blockchain Saga",
      author: "David Kim",
      price: "0.89 ETH",
      edition: "1/50",
      image: "⚡",
      verified: true,
    },
  ];

  // DAO Proposals
  const proposals = [
    {
      id: 1,
      title: "Add New Book Category: AI Fiction",
      votes: "12,847",
      progress: 78,
      status: "Active",
      timeLeft: "3 days",
    },
    {
      id: 2,
      title: "Reduce Transaction Fees",
      votes: "8,234",
      progress: 45,
      status: "Active",
      timeLeft: "5 days",
    },
    {
      id: 3,
      title: "Community Curators Program",
      votes: "5,621",
      progress: 92,
      status: "Passing",
      timeLeft: "1 day",
    },
  ];

  // Token Stats
  const tokenStats = [
    { label: "Price", value: "$0.87", change: "+12.4%" },
    { label: "Market Cap", value: "$34.2M", change: "+8.7%" },
    { label: "Staked", value: "67.3%", change: "+3.2%" },
    { label: "Holders", value: "14,287", change: "+5.1%" },
  ];

  // Quick actions
  const quickActions = [
    { icon: FaRocket, label: "Mint NFT", color: "#8b5cf6" },
    { icon: FaWallet, label: "Deposit", color: "#3b82f6" },
    { icon: FaGift, label: "Claim Rewards", color: "#f59e0b" },
    { icon: FaTrophy, label: "Leaderboard", color: "#10b981" },
  ];

  return (
    <div className={`ethos-dashboard ${bgColor} ${primaryText}`}>
      {/* Welcome Banner */}
      <div
        className="ethos-banner"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #1e293b, #0f172a)"
            : "linear-gradient(135deg, #2563eb, #1d4ed8)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          color: "#ffffff",
        }}
      >
        <div className="ethos-banner-content">
          <div className="ethos-banner-text">
            <h1 className="ethos-banner-title">Welcome to Ethos ⚓</h1>
            <p className="ethos-banner-subtitle">
              Your decentralized reading universe. Own, trade, and govern the
              books you love.
            </p>
            <div className="ethos-banner-actions">
              <button
                className="ethos-btn-primary"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <FaWallet size={16} />
                Connect Wallet
              </button>
              <button
                className="ethos-btn-secondary"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#1d4ed8",
                }}
              >
                <MdExplore size={16} />
                Explore Books
              </button>
            </div>
          </div>
          <div className="ethos-banner-icon">
            <span style={{ fontSize: "64px" }}>⚓</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ethos-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`ethos-stat-card ${cardBg} ${borderColor}`}
              style={{
                borderRadius: "12px",
                padding: "20px",
                border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
              }}
            >
              <div className="ethos-stat-icon" style={{ color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="ethos-stat-content">
                <span className={`ethos-stat-value ${primaryText}`}>{stat.value}</span>
                <span className={`ethos-stat-label ${secondaryText}`}>
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="ethos-two-column">
        {/* Left Column - Featured NFTs */}
        <div className="ethos-column-left">
          <div
            className="ethos-section-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 className={`ethos-section-title ${primaryText}`}>
              <FaGem size={20} style={{ marginRight: "8px" }} />
              Featured NFT Books
            </h2>
            <Link
              href="/ethos/nfts"
              className="ethos-view-all"
              style={{
                color: "#3b82f6",
              }}
            >
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="ethos-nft-grid">
            {featuredNFTs.map((nft) => (
              <div
                key={nft.id}
                className={`ethos-nft-card ${cardBg} ${borderColor}`}
                style={{
                  borderRadius: "12px",
                  border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                  padding: "16px",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  className="ethos-nft-image"
                  style={{
                    fontSize: "48px",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    position: "relative",
                  }}
                >
                  {nft.image}
                  {nft.verified && (
                    <span
                      className="ethos-verified-badge"
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "12px",
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
                <h3 className={`ethos-nft-title ${primaryText}`}>
                  {nft.title}
                </h3>
                <p className={`ethos-nft-author ${secondaryText}`}>
                  by {nft.author}
                </p>
                <div
                  className="ethos-nft-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                    paddingTop: "12px",
                  }}
                >
                  <span
                    className="ethos-nft-price"
                    style={{
                      color: "#f59e0b",
                      fontWeight: "600",
                    }}
                  >
                    {nft.price}
                  </span>
                  <span className={`ethos-nft-edition ${secondaryText}`}>
                    {nft.edition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - DAO & Tokens */}
        <div className="ethos-column-right">
          {/* Token Stats */}
          <div
            className={`ethos-token-section ${cardBg} ${borderColor}`}
            style={{
              borderRadius: "12px",
              padding: "20px",
              border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
              marginBottom: "20px",
            }}
          >
            <div
              className="ethos-section-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 className={primaryText}>
                <FaCoins size={18} style={{ marginRight: "8px" }} />
                $ETHOS Token
              </h3>
              <span
                className="ethos-token-badge"
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  fontSize: "12px",
                  padding: "2px 12px",
                  borderRadius: "12px",
                }}
              >
                Live
              </span>
            </div>

            <div className="ethos-token-grid">
              {tokenStats.map((stat, index) => (
                <div
                  key={index}
                  className="ethos-token-stat"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom:
                      index < tokenStats.length - 1
                        ? `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`
                        : "none",
                  }}
                >
                  <span className={secondaryText}>
                    {stat.label}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className={primaryText}>
                      {stat.value}
                    </span>
                    <span
                      style={{
                        color: stat.change.startsWith("+")
                          ? "#10b981"
                          : "#ef4444",
                        fontSize: "12px",
                      }}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="ethos-token-actions"
              style={{ marginTop: "16px", display: "flex", gap: "8px" }}
            >
              <button
                className="ethos-btn-small"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FaExchangeAlt size={12} style={{ marginRight: "6px" }} />
                Buy
              </button>
              <button
                className="ethos-btn-small"
                style={{
                  backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
                  color: isDarkMode ? "#f1f5f9" : "#0f172a",
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <FaLock size={12} style={{ marginRight: "6px" }} />
                Stake
              </button>
            </div>
          </div>

          {/* DAO Proposals */}
          <div
            className={`ethos-dao-section ${cardBg} ${borderColor}`}
            style={{
              borderRadius: "12px",
              padding: "20px",
              border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            }}
          >
            <div
              className="ethos-section-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 className={primaryText}>
                <FaGavel size={18} style={{ marginRight: "8px" }} />
                Active Proposals
              </h3>
              <Link
                href="/ethos/dao"
                style={{
                  color: "#3b82f6",
                  fontSize: "13px",
                }}
              >
                <FaArrowRight size={12} />
              </Link>
            </div>

            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="ethos-proposal-card"
                style={{
                  padding: "12px 0",
                  borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span className={primaryText}>
                    {proposal.title}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      backgroundColor:
                        proposal.status === "Active" ? "#f59e0b" : "#10b981",
                      color: "#ffffff",
                    }}
                  >
                    {proposal.status}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className={secondaryText}>
                    {proposal.votes} votes · {proposal.timeLeft} left
                  </span>
                  <div
                    style={{
                      width: "100px",
                      height: "6px",
                      backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${proposal.progress}%`,
                        height: "100%",
                        backgroundColor:
                          proposal.progress > 70 ? "#10b981" : "#f59e0b",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              className="ethos-vote-btn"
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "8px",
                borderRadius: "8px",
                border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                backgroundColor: "transparent",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <FaVoteYea size={14} style={{ marginRight: "6px" }} />
              Cast Your Vote
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Actions */}
      <div
        className="ethos-quick-actions"
        style={{
          marginTop: "32px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`ethos-action-btn ${cardBg} ${borderColor}`}
              style={{
                border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                color: isDarkMode ? "#f1f5f9" : "#0f172a",
                backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              }}
            >
              <Icon size={24} color={action.color} />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}