// src/layout_ethos/layout_ethos_mobile/layout_ethos_mobile.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FaHome,
  FaWallet,
  FaGem,
  FaGavel,
  FaUser,
  FaEthereum,
  FaShieldAlt,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaCoins,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./layout_ethos_mobile.css";

export default function LayoutEthosMobile({ children }) {
  const pathname = usePathname();
  const { themeName } = useTheme();
  const { isRTL } = useRTL();
  const { currentFont } = useFont();

  const [isDarkMode, setIsDarkMode] = useState(
    themeName === "dark" ||
      themeName === "midnight" ||
      themeName === "cyberpunk",
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" ||
        themeName === "midnight" ||
        themeName === "cyberpunk",
    );
  }, [themeName]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/ethos", label: "Home", icon: FaHome },
    { href: "/ethos/wallet", label: "Wallet", icon: FaWallet },
    { href: "/ethos/nfts", label: "NFTs", icon: FaGem },
    { href: "/ethos/dao", label: "DAO", icon: FaGavel },
    { href: "/ethos/profile", label: "Profile", icon: FaUser },
  ];

  const menuItems = [
    { href: "/ethos", label: "Dashboard", icon: FaHome },
    { href: "/ethos/wallet", label: "Wallet", icon: FaWallet },
    { href: "/ethos/nfts", label: "NFTs", icon: FaGem },
    { href: "/ethos/marketplace", label: "Marketplace", icon: FaGem },
    { href: "/ethos/dao", label: "DAO", icon: FaGavel },
    { href: "/ethos/tokens", label: "Tokens", icon: FaCoins },
    { href: "/ethos/profile", label: "Profile", icon: FaUser },
  ];

  const isActive = (href) => {
    if (href === "/ethos" && pathname === "/ethos") return true;
    if (href !== "/ethos" && pathname?.startsWith(href)) return true;
    return false;
  };

  const getPageTitle = () => {
    const titles = {
      "/ethos": "Dashboard",
      "/ethos/wallet": "Wallet",
      "/ethos/nfts": "NFTs",
      "/ethos/marketplace": "Marketplace",
      "/ethos/dao": "DAO",
      "/ethos/tokens": "Tokens",
      "/ethos/profile": "Profile",
      "/ethos/settings": "Settings",
    };
    return titles[pathname] || "Ethos";
  };

  const bgColor = isDarkMode ? "#0f172a" : "#f1f5f9";
  const headerBg = isDarkMode ? "#1e293b" : "#ffffff";
  const borderColor = isDarkMode ? "#334155" : "#e2e8f0";
  const textColor = isDarkMode ? "#f1f5f9" : "#0f172a";
  const mutedColor = isDarkMode ? "#94a3b8" : "#64748b";

  return (
    <div
      className={`ethos-layout-mobile ${isDarkMode ? "dark" : "light"}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        fontFamily: currentFont?.family || "inherit",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Header */}
      <header
        className={`ethos-mobile-header ${isScrolled ? "scrolled" : ""}`}
        style={{
          backgroundColor: headerBg,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="ethos-mobile-header-left">
          <button
            className="ethos-mobile-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            style={{ color: textColor }}
          >
            <FaBars size={22} />
          </button>
          <Link href="/ethos" className="ethos-mobile-logo">
            <span className="ethos-logo-icon">⚓</span>
            <span className="ethos-mobile-logo-text">Ethos</span>
          </Link>
        </div>

        <div className="ethos-mobile-header-right">
          <button
            className="ethos-mobile-action"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            style={{ color: mutedColor }}
          >
            <FaSearch size={18} />
          </button>
          <button
            className="ethos-mobile-action"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ color: mutedColor }}
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <div
            className="ethos-mobile-wallet"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              color: "#8b5cf6",
            }}
          >
            <FaEthereum size={12} />
            <span>0x742</span>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div
          className="ethos-mobile-search"
          style={{
            backgroundColor: headerBg,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <div
            className="ethos-mobile-search-wrapper"
            style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9" }}
          >
            <FaSearch size={16} className="ethos-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="ethos-mobile-search-input"
              style={{ color: textColor }}
              autoFocus
            />
            <button
              className="ethos-mobile-search-close"
              onClick={() => setIsSearchOpen(false)}
              style={{ color: mutedColor }}
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="ethos-mobile-main">
        <div className="ethos-mobile-page-header">
          <h1 className="ethos-mobile-page-title">{getPageTitle()}</h1>
          <div
            className="ethos-mobile-balance-badge"
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              color: "#f59e0b",
            }}
          >
            <FaCoins size={14} />
            <span>1,234 ETHOS</span>
          </div>
        </div>

        <div className="ethos-mobile-content">{children}</div>

        <div className="ethos-mobile-spacer" />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="ethos-mobile-bottom-nav"
        style={{
          backgroundColor: headerBg,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`ethos-mobile-nav-item ${active ? "active" : ""}`}
              style={{
                color: active ? "#8b5cf6" : mutedColor,
              }}
            >
              <Icon size={22} />
              <span className="ethos-mobile-nav-label">{item.label}</span>
              {active && <span className="ethos-mobile-nav-dot" />}
            </Link>
          );
        })}
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="ethos-mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className="ethos-mobile-menu-panel"
            style={{
              backgroundColor: headerBg,
            }}
          >
            <div
              className="ethos-mobile-menu-header"
              style={{ borderColor: borderColor }}
            >
              <div className="ethos-mobile-menu-logo">
                <span className="ethos-logo-icon">⚓</span>
                <span className="ethos-mobile-menu-title">Ethos</span>
              </div>
              <button
                className="ethos-mobile-menu-close"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: mutedColor }}
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div
              className="ethos-mobile-menu-balance"
              style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9" }}
            >
              <span className="ethos-balance-label">Total Balance</span>
              <div className="ethos-balance-amount">$4,892.34</div>
              <div className="ethos-balance-details">
                2.45 ETH · 1,234 ETHOS
              </div>
            </div>

            <nav className="ethos-mobile-menu-nav">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`ethos-mobile-menu-link ${active ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: active ? "#8b5cf6" : textColor,
                      backgroundColor: active
                        ? "rgba(139, 92, 246, 0.1)"
                        : "transparent",
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {active && <span className="ethos-mobile-menu-dot" />}
                  </Link>
                );
              })}
            </nav>

            <div
              className="ethos-mobile-menu-footer"
              style={{ borderColor: borderColor }}
            >
              <button
                className="ethos-mobile-menu-disconnect"
                style={{ color: "#ef4444" }}
              >
                <FaShieldAlt size={18} />
                <span>Disconnect Wallet</span>
              </button>
              <div
                className="ethos-mobile-menu-version"
                style={{ color: mutedColor }}
              >
                Ethos v1.0.0
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
