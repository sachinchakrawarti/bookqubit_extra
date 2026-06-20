"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { MdExplore, MdChat } from "react-icons/md";
import { FaAnchor } from "react-icons/fa"; // Using Anchor icon for Ethos
import { memo, useMemo, useCallback } from "react";
import "./DiscoveryDriftBar.css";

const DiscoveryDriftBar = memo(() => {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();

  const isDrift = pathname?.includes("/drift") || false;
  const isEthos = pathname?.includes("/ethos") || false;

  // Detect theme type for proper styling
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const isForestTheme = themeName === "forest";

  // Memoized style calculations to prevent unnecessary re-renders
  const styles = useMemo(() => {
    // Get container background from theme or fallback
    const getContainerBackground = () => {
      if (theme.background?.navigationDots)
        return theme.background.navigationDots;
      if (isForestTheme) return "bg-white/80";
      return isDarkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)";
    };

    // Get active tab background based on theme
    const getActiveTabBackground = () => {
      if (theme.buttonColors?.primaryButton?.background) {
        if (isForestTheme) {
          return "linear-gradient(135deg, #059669, #10b981)";
        }
        return "linear-gradient(135deg, #2563eb, #1d4ed8)";
      }
      if (isForestTheme) {
        return "linear-gradient(135deg, #059669, #10b981)";
      }
      return isDarkMode
        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
        : "linear-gradient(135deg, #2563eb, #1d4ed8)";
    };

    // Get Ethos active tab background (different color for Web3)
    const getEthosActiveBackground = () => {
      if (isForestTheme) {
        return "linear-gradient(135deg, #7c3aed, #6d28d9)";
      }
      return isDarkMode
        ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
        : "linear-gradient(135deg, #7c3aed, #6d28d9)";
    };

    // Get inactive tab background
    const getInactiveTabBackground = () => {
      if (theme.background?.card) return theme.background.card;
      if (isForestTheme) return "rgba(255, 255, 255, 0.6)";
      return isDarkMode ? "rgba(55, 65, 81, 0.4)" : "rgba(255, 255, 255, 0.6)";
    };

    // Get inactive text color
    const getInactiveTextColor = () => {
      if (theme.textColors?.secondary) {
        if (isForestTheme) return "#047857";
        return isDarkMode ? "#d1d5db" : "#374151";
      }
      if (isForestTheme) return "#047857";
      return isDarkMode ? "#d1d5db" : "#374151";
    };

    // Get border color
    const getBorderColor = () => {
      if (theme.border?.default) return theme.border.default;
      if (isForestTheme) return "rgba(5, 150, 105, 0.2)";
      return isDarkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(209, 213, 219, 0.5)";
    };

    // Get hover background
    const getHoverBackground = () => {
      if (theme.buttonColors?.primaryButton?.hoverBackground) {
        if (isForestTheme) {
          return "linear-gradient(135deg, #047857, #059669)";
        }
        return "linear-gradient(135deg, #1d4ed8, #1e40af)";
      }
      if (isForestTheme) {
        return "linear-gradient(135deg, #047857, #059669)";
      }
      return isDarkMode
        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
        : "linear-gradient(135deg, #1d4ed8, #1e40af)";
    };

    // Get Ethos hover background
    const getEthosHoverBackground = () => {
      if (isForestTheme) {
        return "linear-gradient(135deg, #6d28d9, #7c3aed)";
      }
      return isDarkMode
        ? "linear-gradient(135deg, #7c3aed, #8b5cf6)"
        : "linear-gradient(135deg, #6d28d9, #7c3aed)";
    };

    // Get glow effect
    const getGlowEffect = () => {
      if (theme.ringEffect) return theme.ringEffect;
      if (isForestTheme) {
        return "0 0 20px rgba(5, 150, 105, 0.3)";
      }
      return isDarkMode
        ? "0 0 20px rgba(59, 130, 246, 0.3)"
        : "0 0 20px rgba(37, 99, 235, 0.2)";
    };

    // Get Ethos glow effect (purple)
    const getEthosGlowEffect = () => {
      return isDarkMode
        ? "0 0 20px rgba(139, 92, 246, 0.4)"
        : "0 0 20px rgba(124, 58, 237, 0.25)";
    };

    // Get box shadow
    const getBoxShadow = () => {
      if (theme.shadow?.container) return theme.shadow.container;
      return isDarkMode
        ? "0 4px 12px rgba(0, 0, 0, 0.2)"
        : "0 4px 12px rgba(0, 0, 0, 0.08)";
    };

    // Get container background color value
    const containerBg = getContainerBackground();
    const borderColor = getBorderColor();

    return {
      container: {
        backgroundColor:
          typeof containerBg === "string" && containerBg.includes("bg-")
            ? undefined
            : containerBg,
        className:
          typeof containerBg === "string" && containerBg.includes("bg-")
            ? containerBg
            : "",
        backdropFilter: "blur(12px)",
        borderRadius: "40px",
        padding: "6px",
        border: `1px solid ${borderColor}`,
        boxShadow: getBoxShadow(),
      },
      activeTab: {
        background: getActiveTabBackground(),
        color: "#ffffff",
        boxShadow: getGlowEffect(),
        transform: "scale(1.02)",
      },
      ethosActiveTab: {
        background: getEthosActiveBackground(),
        color: "#ffffff",
        boxShadow: getEthosGlowEffect(),
        transform: "scale(1.02)",
      },
      inactiveTab: {
        background: getInactiveTabBackground(),
        color: getInactiveTextColor(),
        backdropFilter: "blur(5px)",
      },
      hoverBackground: getHoverBackground(),
      ethosHoverBackground: getEthosHoverBackground(),
      glowEffect: getGlowEffect(),
      ethosGlowEffect: getEthosGlowEffect(),
    };
  }, [theme, themeName, isDarkMode, isForestTheme]);

  // Memoized hover handlers for Discovery
  const handleDiscoveryMouseEnter = useCallback(
    (e) => {
      if (!isDrift && !isEthos) {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = styles.glowEffect;
      }
    },
    [isDrift, isEthos, styles.hoverBackground, styles.glowEffect],
  );

  const handleDiscoveryMouseLeave = useCallback(
    (e) => {
      if (!isDrift && !isEthos) {
        e.currentTarget.style.background = styles.inactiveTab.background;
        e.currentTarget.style.color = styles.inactiveTab.color;
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    [isDrift, isEthos, styles.inactiveTab],
  );

  // Memoized hover handlers for Drift
  const handleDriftMouseEnter = useCallback(
    (e) => {
      if (!isDrift && !isEthos) {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = styles.glowEffect;
      }
    },
    [isDrift, isEthos, styles.hoverBackground, styles.glowEffect],
  );

  const handleDriftMouseLeave = useCallback(
    (e) => {
      if (!isDrift && !isEthos) {
        e.currentTarget.style.background = styles.inactiveTab.background;
        e.currentTarget.style.color = styles.inactiveTab.color;
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    [isDrift, isEthos, styles.inactiveTab],
  );

  // Memoized hover handlers for Ethos
  const handleEthosMouseEnter = useCallback(
    (e) => {
      if (!isEthos) {
        e.currentTarget.style.background = styles.ethosHoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = styles.ethosGlowEffect;
      }
    },
    [isEthos, styles.ethosHoverBackground, styles.ethosGlowEffect],
  );

  const handleEthosMouseLeave = useCallback(
    (e) => {
      if (!isEthos) {
        e.currentTarget.style.background = styles.inactiveTab.background;
        e.currentTarget.style.color = styles.inactiveTab.color;
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    [isEthos, styles.inactiveTab],
  );

  return (
    <div
      className={`discovery-drift-bar ${styles.container.className}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backdropFilter: styles.container.backdropFilter,
        borderRadius: styles.container.borderRadius,
        padding: styles.container.padding,
        border: styles.container.border,
        boxShadow: styles.container.boxShadow,
        ...(styles.container.backgroundColor && {
          backgroundColor: styles.container.backgroundColor,
        }),
      }}
    >
      <div className="discovery-drift-container">
        {/* Discovery Tab */}
        <Link
          href="/"
          className={`discovery-drift-tab ${!isDrift && !isEthos ? "active" : ""}`}
          style={{
            padding: "8px 20px",
            borderRadius: "32px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            ...(!isDrift && !isEthos ? styles.activeTab : styles.inactiveTab),
          }}
          onMouseEnter={handleDiscoveryMouseEnter}
          onMouseLeave={handleDiscoveryMouseLeave}
        >
          <MdExplore className="tab-icon" style={{ fontSize: "20px" }} />
          <span className="tab-text">Discovery</span>
          {!isDrift && !isEthos && <span className="active-indicator" />}
        </Link>

        {/* Drift Tab */}
        <Link
          href="/drift"
          className={`discovery-drift-tab ${isDrift ? "active" : ""}`}
          style={{
            padding: "8px 20px",
            borderRadius: "32px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            ...(isDrift ? styles.activeTab : styles.inactiveTab),
          }}
          onMouseEnter={handleDriftMouseEnter}
          onMouseLeave={handleDriftMouseLeave}
        >
          <MdChat className="tab-icon" style={{ fontSize: "20px" }} />
          <span className="tab-text">Drift</span>
          {isDrift && <span className="active-indicator" />}
        </Link>

        {/* Ethos Tab - Web3.0 */}
        <Link
          href="/ethos"
          className={`discovery-drift-tab ${isEthos ? "active ethos-active" : ""}`}
          style={{
            padding: "8px 20px",
            borderRadius: "32px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            ...(isEthos ? styles.ethosActiveTab : styles.inactiveTab),
          }}
          onMouseEnter={handleEthosMouseEnter}
          onMouseLeave={handleEthosMouseLeave}
        >
          <FaAnchor className="tab-icon" style={{ fontSize: "18px" }} />
          <span className="tab-text">Ethos</span>
          <span className="ethos-web3-badge">Web3</span>
          {isEthos && <span className="active-indicator ethos-indicator" />}
        </Link>
      </div>
    </div>
  );
});

DiscoveryDriftBar.displayName = "DiscoveryDriftBar";

export default DiscoveryDriftBar;
