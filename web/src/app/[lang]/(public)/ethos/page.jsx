// src/app/[lang]/(public)/ethos/page.jsx

"use client";

import { useTheme } from "@/themes/useTheme";
import Link from "next/link";
import {
  FaEthereum,
  FaCoins,
  FaBook,
  FaUsers,
  FaGavel,
  FaRocket,
  FaWallet,
  FaGem,
  FaTrophy,
  FaGift,
  FaArrowRight,
} from "react-icons/fa";

export default function EthosPage() {
  const { themeName } = useTheme();
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const bgColor = isDarkMode ? "#1e293b" : "#ffffff";
  const borderColor = isDarkMode ? "#334155" : "#e2e8f0";
  const textColor = isDarkMode ? "#f1f5f9" : "#0f172a";
  const mutedColor = isDarkMode ? "#94a3b8" : "#64748b";

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

  const quickActions = [
    {
      icon: FaRocket,
      label: "Mint NFT",
      color: "#8b5cf6",
      href: "/ethos/nfts",
    },
    {
      icon: FaWallet,
      label: "Deposit",
      color: "#3b82f6",
      href: "/ethos/wallet",
    },
    {
      icon: FaGift,
      label: "Claim Rewards",
      color: "#f59e0b",
      href: "/ethos/tokens",
    },
    {
      icon: FaTrophy,
      label: "Leaderboard",
      color: "#10b981",
      href: "/ethos/dao",
    },
  ];

  const featuredNFTs = [
    {
      id: 1,
      title: "The Quantum Reader",
      author: "Elena Voss",
      price: "0.45 ETH",
      emoji: "🔮",
      verified: true,
    },
    {
      id: 2,
      title: "Web3 Wisdom",
      author: "Marcus Chen",
      price: "0.28 ETH",
      emoji: "📖",
      verified: true,
    },
    {
      id: 3,
      title: "Digital Poetry",
      author: "Sofia Reyes",
      price: "0.12 ETH",
      emoji: "📝",
      verified: false,
    },
    {
      id: 4,
      title: "The Blockchain Saga",
      author: "David Kim",
      price: "0.89 ETH",
      emoji: "⚡",
      verified: true,
    },
  ];

  const proposals = [
    {
      title: "Add New Book Category: AI Fiction",
      votes: "12,847",
      progress: 78,
      status: "Active",
    },
    {
      title: "Reduce Transaction Fees",
      votes: "8,234",
      progress: 45,
      status: "Active",
    },
    {
      title: "Community Curators Program",
      votes: "5,621",
      progress: 92,
      status: "Passing",
    },
  ];

  const tokenStats = [
    { label: "Price", value: "$0.87", change: "+12.4%" },
    { label: "Market Cap", value: "$34.2M", change: "" },
    { label: "Staked", value: "67.3%", change: "" },
    { label: "Holders", value: "14,287", change: "" },
  ];

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 16px",
        width: "100%",
      }}
    >
      {/* Welcome Banner */}
      <div
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, #1e293b, #0f172a)"
            : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}
          >
            ⚓ Welcome to Ethos
          </h2>
          <p
            style={{
              opacity: 0.9,
              fontSize: "16px",
              maxWidth: "500px",
              marginBottom: "20px",
            }}
          >
            Your decentralized reading universe. Own, trade, and govern the
            books you love.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/ethos/wallet"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <FaWallet size={16} />
              Connect Wallet
            </Link>
            <Link
              href="/ethos/marketplace"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                color: "#6d28d9",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              <FaGem size={16} />
              Explore NFTs
            </Link>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-5%",
            fontSize: "140px",
            opacity: 0.1,
            pointerEvents: "none",
          }}
        >
          ⚓
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              style={{
                backgroundColor: bgColor,
                borderRadius: "12px",
                padding: "20px",
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ color: stat.color, fontSize: "24px" }}>
                  <Icon size={24} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: textColor,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "13px", color: mutedColor }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Left: Featured NFTs */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: textColor,
                margin: 0,
              }}
            >
              <FaGem style={{ display: "inline", marginRight: "8px" }} />
              Featured NFT Books
            </h3>
            <Link
              href="/ethos/nfts"
              style={{
                color: "#8b5cf6",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              View All{" "}
              <FaArrowRight
                style={{ display: "inline", marginLeft: "4px" }}
                size={12}
              />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {featuredNFTs.map((nft) => (
              <div
                key={nft.id}
                style={{
                  backgroundColor: bgColor,
                  borderRadius: "12px",
                  border: `1px solid ${borderColor}`,
                  padding: "16px",
                  position: "relative",
                }}
              >
                <div
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
                  {nft.emoji}
                  {nft.verified && (
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        fontSize: "10px",
                        padding: "2px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: textColor,
                    marginBottom: "4px",
                  }}
                >
                  {nft.title}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: mutedColor,
                    marginBottom: "8px",
                  }}
                >
                  by {nft.author}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: `1px solid ${borderColor}`,
                    paddingTop: "12px",
                  }}
                >
                  <span style={{ color: "#f59e0b", fontWeight: "600" }}>
                    {nft.price}
                  </span>
                  <span style={{ fontSize: "12px", color: mutedColor }}>
                    NFT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions & Token Stats */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: textColor,
              marginBottom: "16px",
            }}
          >
            <FaRocket style={{ display: "inline", marginRight: "8px" }} />
            Quick Actions
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  style={{
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "center",
                    textDecoration: "none",
                    color: textColor,
                  }}
                >
                  <Icon size={24} color={action.color} />
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginTop: "4px",
                    }}
                  >
                    {action.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Token Stats */}
          <div
            style={{
              backgroundColor: bgColor,
              borderRadius: "12px",
              padding: "20px",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: textColor,
                  margin: 0,
                }}
              >
                <FaCoins style={{ display: "inline", marginRight: "6px" }} />
                $ETHOS Token
              </h4>
              <span
                style={{
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  fontSize: "11px",
                  padding: "2px 12px",
                  borderRadius: "12px",
                }}
              >
                Live
              </span>
            </div>
            {tokenStats.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: idx < 3 ? `1px solid ${borderColor}` : "none",
                }}
              >
                <span style={{ color: mutedColor }}>{item.label}</span>
                <span style={{ fontWeight: "600", color: textColor }}>
                  {item.value}
                  {item.change && (
                    <span style={{ color: "#10b981", marginLeft: "4px" }}>
                      {item.change}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DAO Proposals */}
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: "12px",
          padding: "20px",
          border: `1px solid ${borderColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: textColor,
              margin: 0,
            }}
          >
            <FaGavel style={{ display: "inline", marginRight: "8px" }} />
            Active DAO Proposals
          </h3>
          <Link
            href="/ethos/dao"
            style={{
              color: "#8b5cf6",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            View All{" "}
            <FaArrowRight
              style={{ display: "inline", marginLeft: "4px" }}
              size={12}
            />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {proposals.map((proposal, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: textColor,
                  }}
                >
                  {proposal.title}
                </span>
                <span
                  style={{
                    fontSize: "11px",
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
                  fontSize: "13px",
                  color: mutedColor,
                  marginBottom: "8px",
                }}
              >
                {proposal.votes} votes
              </div>
              <div
                style={{
                  width: "100%",
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
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          [style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
