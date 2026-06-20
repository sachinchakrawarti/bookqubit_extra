// src/layout_ethos/ethos_left_slidebar/ethos_left_slidebar.jsx
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
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useRTL } from "@/contexts/RTLContext";
import { useLanguage } from "@/contexts/LanguageContext";
import "./ethos_left_slidebar.css";

export default function EthosLeftSlidebar({ isMobileOpen }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const { te } = useLanguage(); // Ethos translations from LanguageContext
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainNavItems = [
    { href: "/ethos", label: te("dashboard"), icon: <FaHome />, exact: true },
    { href: "/ethos/wallet", label: te("wallet"), icon: <FaWallet /> },
    { href: "/ethos/nfts", label: te("nfts"), icon: <FaBook /> },
    { href: "/ethos/marketplace", label: te("marketplace"), icon: <FaBoxOpen /> },
    { href: "/ethos/dao", label: te("dao"), icon: <FaGavel /> },
    { href: "/ethos/tokens", label: te("tokens"), icon: <FaCoins /> },
    { href: "/ethos/ethos_profile", label: te("profile"), icon: <FaUser />, badge: 0 },
  ];

  const fontStyle = currentFont?.family ? {
    fontFamily: currentFont.family
  } : {};

  // Determine if a link is active
  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  // Get theme-aware styles
  const sidebarBg = isDarkMode 
    ? "bg-gray-800/95" 
    : theme.background?.section || "bg-white/95";

  const primaryText = theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const secondaryText = theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-600");
  const hoverBg = theme.background?.hover || (isDarkMode ? "bg-gray-700/50" : "bg-gray-100");
  const primaryButtonBg = theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-blue-600 to-purple-600";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`ethos-left-slidebar
          ${sidebarBg}
          ${theme.border?.default || "border-r border-gray-200 dark:border-gray-700"}
          ${isCollapsed ? "collapsed" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        {/* Collapse/Expand Button - INSIDE the sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`collapse-toggle-btn ${primaryButtonBg} text-white shadow-lg hover:scale-110 transition-transform`}
          aria-label={isCollapsed ? te("expand_sidebar") : te("collapse_sidebar")}
        >
          {isCollapsed ? <FaChevronRight size={18} /> : <FaChevronLeft size={18} />}
        </button>

        <div className="sidebar-content">
          {/* Header with Logo */}
          <div className="sidebar-header">
            {!isCollapsed ? (
              <div className="logo-section">
                <Link href="/ethos" className="logo-link">
                  <span className="logo-icon">⚓</span>
                  <span className={`logo-text ${primaryText}`}>
                    {te("ethos")} <span className="logo-subtitle">{te("web3")}</span>
                  </span>
                </Link>
              </div>
            ) : (
              <div className="logo-section-collapsed">
                <Link href="/ethos" className="logo-link-collapsed">
                  <span className="logo-icon">⚓</span>
                </Link>
              </div>
            )}
          </div>

          {/* Search Component - Optional */}
          <div className="sidebar-search-wrapper">
            {/* You can add a search component here if needed */}
          </div>

          {/* Main Navigation */}
          <div className="sidebar-section">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${secondaryText} hover:${hoverBg} ${
                  isActive(item.href, item.exact) ? 
                    `${primaryButtonBg} text-white` : 
                    ""
                }`}
                data-tooltip={!isCollapsed ? undefined : item.label}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className={`sidebar-badge ${primaryButtonBg} text-white`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="sidebar-footer">
            <button
              className={`sidebar-footer-btn ${secondaryText} hover:${hoverBg}`}
              onClick={() => console.log("Settings clicked")}
            >
              <FaCog size={18} />
              {!isCollapsed && <span>{te("settings")}</span>}
            </button>
            <button
              className={`sidebar-footer-btn ${secondaryText} hover:${hoverBg}`}
              style={{ color: "#ef4444" }}
              onClick={() => console.log("Disconnect clicked")}
            >
              <FaSignOutAlt size={18} />
              {!isCollapsed && <span>{te("disconnect")}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        dir={direction}
        style={fontStyle}
        className={`ethos-left-slidebar-mobile
          ${isDarkMode ? "bg-gray-800" : "bg-white"}
          ${isMobileOpen ? "open" : ""}
          ${direction === 'rtl' ? 'rtl' : ''}
        `}
      >
        <div className={`mobile-sidebar-header ${isDarkMode ? "border-gray-700" : "border-gray-200"} border-b`}>
          <div className="logo">
            <span className="logo-icon">⚓</span>
            <div className="logo-text-wrapper">
              <span className={`${primaryText} font-bold text-lg`}>{te("ethos")}</span>
              <span className={`${secondaryText} text-xs`}>{te("web3")}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mobile-collapse-btn"
          >
            <FaBars />
          </button>
        </div>
        <div className="mobile-sidebar-content">
          <div className="mobile-search">
            {/* You can add search here if needed */}
          </div>
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-sidebar-link ${secondaryText} hover:${hoverBg}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge && (
                <span className={`sidebar-badge ${primaryButtonBg} text-white`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="mobile-sidebar-footer">
            <button
              className={`mobile-footer-btn ${secondaryText}`}
              onClick={() => console.log("Settings clicked")}
            >
              <FaCog size={18} />
              <span>{te("settings")}</span>
            </button>
            <button
              className={`mobile-footer-btn ${secondaryText}`}
              style={{ color: "#ef4444" }}
              onClick={() => console.log("Disconnect clicked")}
            >
              <FaSignOutAlt size={18} />
              <span>{te("disconnect")}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}