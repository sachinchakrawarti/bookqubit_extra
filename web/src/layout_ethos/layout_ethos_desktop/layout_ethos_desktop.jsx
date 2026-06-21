// src/layout_ethos/layout_ethos_desktop/layout_ethos_desktop.jsx

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FaEthereum,
  FaShieldAlt,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaCoins,
  FaBars,
} from "react-icons/fa";
import EthosLeftSlidebar from "./ethos_left_slidebar/ethos_left_slidebar";
import "./layout_ethos_desktop.css";

export default function LayoutEthosDesktop({ children }) {
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      className={`ethos-layout-desktop ${isDarkMode ? "dark" : "light"}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        fontFamily: currentFont?.family || "inherit",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <EthosLeftSlidebar
        isMobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <main className="ethos-main-desktop">
        <header
          className={`ethos-header-desktop ${isScrolled ? "scrolled" : ""}`}
          style={{
            backgroundColor: headerBg,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <div className="ethos-header-left">
            <button
              className="ethos-mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{ color: textColor }}
            >
              <FaBars size={22} />
            </button>
            <h1 className="ethos-header-title">{getPageTitle()}</h1>
          </div>

          <div className="ethos-header-right">
            <div
              className="ethos-search"
              style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9" }}
            >
              <FaSearch size={14} className="ethos-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                className="ethos-search-input"
                style={{ color: textColor }}
              />
              <kbd className="ethos-search-kbd" style={{ color: mutedColor }}>
                ⌘K
              </kbd>
            </div>

            <div
              className="ethos-balance"
              style={{
                color: textColor,
                backgroundColor: isDarkMode ? "#0f172a" : "#f1f5f9",
              }}
            >
              <FaCoins size={14} style={{ color: "#f59e0b" }} />
              <span>1,234 ETHOS</span>
            </div>

            <button className="ethos-icon-btn" style={{ color: mutedColor }}>
              <FaBell size={18} />
              <span className="ethos-dot" />
            </button>

            <button
              className="ethos-icon-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ color: mutedColor }}
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            <div
              className="ethos-wallet"
              style={{
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                color: "#8b5cf6",
                borderColor: "rgba(139, 92, 246, 0.2)",
              }}
            >
              <FaEthereum size={14} />
              <span>0x742...e3F2</span>
              <FaShieldAlt size={12} />
            </div>
          </div>
        </header>

        <div className="ethos-content">{children}</div>
      </main>
    </div>
  );
}
