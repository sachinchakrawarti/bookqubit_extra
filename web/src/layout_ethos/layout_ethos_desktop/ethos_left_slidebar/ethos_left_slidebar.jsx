// src/layout_ethos/layout_ethos_desktop/ethos_left_slidebar/ethos_left_slidebar.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaWallet,
  FaBook,
  FaBoxOpen,
  FaGavel,
  FaCoins,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import "./ethos_left_slidebar.css";

export default function EthosLeftSlidebar({ isMobileOpen, onClose }) {
  const pathname = usePathname();
  const { themeName } = useTheme();
  const { isRTL } = useRTL();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth > 768) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { href: "/ethos", label: "Dashboard", icon: <FaHome />, exact: true },
    { href: "/ethos/wallet", label: "Wallet", icon: <FaWallet /> },
    { href: "/ethos/nfts", label: "NFTs", icon: <FaBook /> },
    { href: "/ethos/marketplace", label: "Marketplace", icon: <FaBoxOpen /> },
    { href: "/ethos/dao", label: "DAO", icon: <FaGavel /> },
    { href: "/ethos/tokens", label: "Tokens", icon: <FaCoins /> },
    { href: "/ethos/profile", label: "Profile", icon: <FaUser /> },
  ];

  const isActive = (href, exact = false) => {
    if (exact) return pathname === href;
    return pathname?.startsWith(href);
  };

  const bgColor = isDarkMode ? "#1e293b" : "#ffffff";
  const borderColor = isDarkMode ? "#334155" : "#e2e8f0";
  const textColor = isDarkMode ? "#f1f5f9" : "#0f172a";
  const mutedColor = isDarkMode ? "#94a3b8" : "#64748b";
  const hoverBg = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const activeColor = "#8b5cf6";

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside
      className={`ethos-desktop-sidebar ${isCollapsed ? "collapsed" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        width: isCollapsed ? "80px" : "260px",
      }}
    >
      <button
        className="ethos-collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ backgroundColor: activeColor }}
      >
        {isCollapsed ? (
          <FaChevronRight size={16} />
        ) : (
          <FaChevronLeft size={16} />
        )}
      </button>

      <div className="ethos-sidebar-logo" style={{ borderColor: borderColor }}>
        <Link href="/ethos" className="ethos-logo-link">
          <span className="ethos-logo-icon">⚓</span>
          {!isCollapsed && (
            <>
              <span className="ethos-logo-text">Ethos</span>
              <span className="ethos-logo-badge">Web3</span>
            </>
          )}
        </Link>
      </div>

      {!isCollapsed && (
        <div
          className="ethos-sidebar-balance"
          style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9" }}
        >
          <span className="ethos-balance-label">Total Balance</span>
          <div className="ethos-balance-amount">$4,892.34</div>
          <div className="ethos-balance-details">2.45 ETH · 1,234 ETHOS</div>
        </div>
      )}

      <nav className="ethos-sidebar-nav">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`ethos-nav-link ${active ? "active" : ""}`}
              data-tooltip={isCollapsed ? item.label : undefined}
              style={{
                color: active ? "#ffffff" : mutedColor,
                backgroundColor: active ? activeColor : "transparent",
                justifyContent: isCollapsed ? "center" : "flex-start",
              }}
            >
              <span className="ethos-nav-icon">{item.icon}</span>
              {!isCollapsed && (
                <span className="ethos-nav-label">{item.label}</span>
              )}
              {active && !isCollapsed && <span className="ethos-nav-dot" />}
            </Link>
          );
        })}
      </nav>

      <div
        className="ethos-sidebar-footer"
        style={{ borderColor: borderColor }}
      >
        <button className="ethos-footer-btn" style={{ color: mutedColor }}>
          <FaCog size={18} />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button
          className="ethos-footer-btn ethos-disconnect"
          style={{ color: "#ef4444" }}
        >
          <FaSignOutAlt size={18} />
          {!isCollapsed && <span>Disconnect</span>}
        </button>
      </div>
    </aside>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {isMobileOpen && (
        <div className="ethos-mobile-overlay" onClick={onClose} />
      )}

      <aside
        className={`ethos-mobile-sidebar ${isMobileOpen ? "open" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <div
          className="ethos-mobile-header"
          style={{ borderColor: borderColor }}
        >
          <div className="ethos-mobile-logo">
            <span className="ethos-logo-icon">⚓</span>
            <div>
              <span className="ethos-mobile-title">Ethos</span>
              <span className="ethos-mobile-subtitle">Web3</span>
            </div>
          </div>
          <button
            className="ethos-mobile-close"
            onClick={onClose}
            style={{ color: mutedColor }}
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div
          className="ethos-mobile-balance"
          style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9" }}
        >
          <span className="ethos-balance-label">Total Balance</span>
          <div className="ethos-balance-amount">$4,892.34</div>
          <div className="ethos-balance-details">2.45 ETH · 1,234 ETHOS</div>
        </div>

        <nav className="ethos-mobile-nav">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ethos-mobile-nav-link ${active ? "active" : ""}`}
                onClick={onClose}
                style={{
                  color: active ? "#ffffff" : mutedColor,
                  backgroundColor: active ? activeColor : "transparent",
                }}
              >
                <span className="ethos-nav-icon">{item.icon}</span>
                <span className="ethos-nav-label">{item.label}</span>
                {active && <span className="ethos-nav-dot" />}
              </Link>
            );
          })}
        </nav>

        <div
          className="ethos-mobile-footer"
          style={{ borderColor: borderColor }}
        >
          <button className="ethos-footer-btn" style={{ color: mutedColor }}>
            <FaCog size={18} />
            <span>Settings</span>
          </button>
          <button
            className="ethos-footer-btn ethos-disconnect"
            style={{ color: "#ef4444" }}
          >
            <FaSignOutAlt size={18} />
            <span>Disconnect</span>
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
