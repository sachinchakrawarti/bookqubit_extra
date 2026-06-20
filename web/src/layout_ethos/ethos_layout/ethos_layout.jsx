// src/layout_ethos/ethos_layout/ethos_layout.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdExplore, MdChat, MdAnchor } from "react-icons/md";
import EthosLeftSlidebar from "../ethos_left_slidebar/ethos_left_slidebar";
import "./ethos_layout.css";

export default function EthosLayout({ 
  children, 
  pathname: propPathname, 
  themeName, 
  isRTL, 
  currentFont,
  onThemeToggle,
  onDisconnect,
  onSettings,
  walletAddress = "0x742...e3F2",
  ethBalance = "2,450",
  ethosBalance = "1,234",
  isConnected = true,
}) {
  const pathname = propPathname || usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determine dark mode
  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" || 
      themeName === "midnight" || 
      themeName === "cyberpunk"
    );
  }, [themeName]);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if a nav item is active
  const isActive = (href) => {
    if (href === "/ethos" && pathname === "/ethos") return true;
    if (href !== "/ethos" && pathname?.startsWith(href)) return true;
    return false;
  };

  // Handle disconnect
  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    } else {
      console.log("Disconnect clicked");
    }
  };

  // Handle settings
  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      console.log("Settings clicked");
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      console.log("Theme toggle clicked");
    }
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
      <EthosLeftSlidebar
        isActive={isActive}
        isDarkMode={isDarkMode}
        isRTL={isRTL}
      />

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
          {/* Left Side - Wallet Info */}
          <div className="ethos-header-left">
            <span className="ethos-wallet-badge">
              <FaEthereum size={14} />
              <span>{walletAddress}</span>
            </span>
            {isConnected && (
              <span className="ethos-connection-status connected">
                <span className="status-dot"></span>
                Connected
              </span>
            )}
          </div>

          {/* Right Side - Balance & Actions */}
          <div className="ethos-header-right">
            <span className="ethos-balance">
              <FaCoins size={16} />
              <span>{ethBalance} ETH</span>
            </span>
            <span className="ethos-balance ethos-balance-token">
              <FaShieldAlt size={16} />
              <span>{ethosBalance} $ETHOS</span>
            </span>

            {/* Theme Toggle Button */}
            <button
              className="ethos-icon-btn"
              onClick={handleThemeToggle}
              style={{
                color: isDarkMode ? "#fbbf24" : "#64748b",
              }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Connect/Disconnect Button */}
            <button
              className={`ethos-connect-btn ${isConnected ? 'connected' : 'disconnected'}`}
              style={{
                backgroundColor: isConnected ? "#2563eb" : "#ef4444",
                color: "#ffffff",
              }}
              onClick={handleDisconnect}
            >
              <FaWallet size={14} />
              <span>{isConnected ? 'Connected' : 'Disconnect'}</span>
            </button>
          </div>
        </header>

        {/* Page Content with spacing */}
        <div className="ethos-content">
          <div className="ethos-content-spacing">
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="ethos-footer"
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            borderTop: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            color: isDarkMode ? "#94a3b8" : "#64748b",
          }}
        >
          <div className="ethos-footer-content">
            <span>© 2024 Ethos. All rights reserved.</span>
            <div className="ethos-footer-links">
              <Link href="/ethos/privacy">Privacy</Link>
              <Link href="/ethos/terms">Terms</Link>
              <Link href="/ethos/support">Support</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}