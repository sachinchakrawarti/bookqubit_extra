// d:\Projects\done\bookqubit etra\web\src\app\[lang]\(public)\ethos\layout.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FaWallet,
  FaBook,
  FaUsers,
  FaCoins,
  FaVoteYea,
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaEthereum,
  FaShieldAlt,
  FaChartLine,
  FaGavel,
  FaBoxOpen,
} from "react-icons/fa";
import { MdExplore, MdChat, MdAnchor } from "react-icons/md";
import "./ethos.css";

export default function EthosLayout({ children, params: { lang } }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();
  const { currentFont } = useFont();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Navigation items
  const navItems = [
    { name: "Dashboard", href: "/ethos", icon: FaHome },
    { name: "Wallet", href: "/ethos/wallet", icon: FaWallet },
    { name: "NFTs", href: "/ethos/nfts", icon: FaBook },
    { name: "Marketplace", href: "/ethos/marketplace", icon: FaBoxOpen },
    { name: "DAO", href: "/ethos/dao", icon: FaGavel },
    { name: "Tokens", href: "/ethos/tokens", icon: FaCoins },
    { name: "Profile", href: "/ethos/profile", icon: FaUser },
  ];

  const isActive = (href) => {
    if (href === "/ethos" && pathname === "/ethos") return true;
    if (href !== "/ethos" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <div
      className="ethos-layout"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        fontFamily: currentFont?.family || "inherit",
        backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#e2e8f0" : "#1e293b",
      }}
    >
      {/* Sidebar */}
      <aside
        className="ethos-sidebar"
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRight: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
        }}
      >
        {/* Logo */}
        <div className="ethos-sidebar-header">
          <Link href="/ethos" className="ethos-logo">
            <span className="ethos-logo-icon">⚓</span>
            <span className="ethos-logo-text">Ethos</span>
          </Link>
          <span className="ethos-badge">Web3</span>
        </div>

        {/* Navigation */}
        <nav className="ethos-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ethos-nav-item ${active ? "active" : ""}`}
                style={{
                  backgroundColor: active
                    ? isDarkMode
                      ? "#3b82f6"
                      : "#2563eb"
                    : "transparent",
                  color: active
                    ? "#ffffff"
                    : isDarkMode
                      ? "#94a3b8"
                      : "#64748b",
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>
                {active && <span className="ethos-nav-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="ethos-sidebar-footer">
          <button
            className="ethos-footer-btn"
            style={{
              color: isDarkMode ? "#94a3b8" : "#64748b",
            }}
          >
            <FaCog size={18} />
            <span>Settings</span>
          </button>
          <button
            className="ethos-footer-btn"
            style={{
              color: "#ef4444",
            }}
          >
            <FaSignOutAlt size={18} />
            <span>Disconnect</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ethos-main">
        {/* Header */}
        <header
          className="ethos-header"
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          }}
        >
          <div className="ethos-header-left">
            <span className="ethos-wallet-badge">
              <FaEthereum size={14} />
              <span>0x742...e3F2</span>
            </span>
          </div>
          <div className="ethos-header-right">
            <span className="ethos-balance">
              <FaCoins size={16} />
              <span>2,450 ETH</span>
            </span>
            <span className="ethos-balance">
              <FaShieldAlt size={16} />
              <span>1,234 $ETHOS</span>
            </span>
            <button
              className="ethos-connect-btn"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
              }}
            >
              <FaWallet size={14} />
              <span>Connected</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="ethos-content">{children}</div>
      </main>
    </div>
  );
}
