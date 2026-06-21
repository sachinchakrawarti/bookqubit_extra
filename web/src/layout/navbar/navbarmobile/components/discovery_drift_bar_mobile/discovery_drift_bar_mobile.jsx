"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { MdExplore, MdChat } from "react-icons/md";
import { FaAnchor } from "react-icons/fa";
import { memo, useMemo, useCallback } from "react";
import "./discovery_drift_bar_mobile.css";

const DiscoveryDriftBarMobile = memo(() => {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();

  // ✅ SHOW ON:
  // 1) Language root: /en , /hi , /fr , ... (one segment)
  // 2) Homepage route: /en/homepages , /hi/homepages , ... (ends with "/homepages")
  // 3) Drift route: /en/drift , /hi/drift , ... (ends with "/drift")
  // 4) Ethos route: /en/ethos , /hi/ethos , ... (ends with "/ethos")
  const pathSegments = pathname?.split("/").filter(Boolean);
  const isLanguageOnly = pathSegments?.length === 1;
  const isHomepagesRoute = pathname?.endsWith("/homepages");
  const isDriftRoute = pathname?.endsWith("/drift");
  const isEthosRoute = pathname?.endsWith("/ethos");

  // Also check if pathname is exactly /ethos or /en/ethos etc.
  const isEthosExact = pathname === "/ethos" || pathname?.endsWith("/ethos");

  const isHomePage =
    isLanguageOnly ||
    isHomepagesRoute ||
    isDriftRoute ||
    isEthosRoute ||
    isEthosExact;

  if (!isHomePage) return null;

  const isDrift = pathname?.includes("/drift") || false;
  const isEthos = pathname?.includes("/ethos") || false;

  // Detect theme type for proper styling
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const isForestTheme = themeName === "forest";
  const isNeonTheme = themeName === "neon" || themeName === "cyberpunk";

  // Memoized style calculations for mobile
  const styles = useMemo(() => {
    const getContainerBackground = () => {
      if (theme.background?.navigationDots)
        return theme.background.navigationDots;
      if (isForestTheme) return "rgba(5, 150, 105, 0.08)";
      if (isNeonTheme) return "rgba(0, 255, 255, 0.05)";
      return isDarkMode
        ? "rgba(17, 24, 39, 0.85)"
        : "rgba(255, 255, 255, 0.75)";
    };

    const getActiveTabBackground = () => {
      if (theme.buttonColors?.primaryButton?.background) {
        if (isForestTheme) return "linear-gradient(135deg, #059669, #10b981)";
        if (isNeonTheme) return "linear-gradient(135deg, #00ffff, #00bfff)";
        return "linear-gradient(135deg, #2563eb, #1d4ed8)";
      }
      if (isForestTheme) return "linear-gradient(135deg, #059669, #10b981)";
      if (isNeonTheme) return "linear-gradient(135deg, #00ffff, #00bfff)";
      return isDarkMode
        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
        : "linear-gradient(135deg, #2563eb, #1d4ed8)";
    };

    // Ethos active tab - purple theme
    const getEthosActiveBackground = () => {
      if (isForestTheme) return "linear-gradient(135deg, #7c3aed, #6d28d9)";
      if (isNeonTheme) return "linear-gradient(135deg, #a855f7, #7c3aed)";
      return isDarkMode
        ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
        : "linear-gradient(135deg, #7c3aed, #6d28d9)";
    };

    const getInactiveTabBackground = () => {
      if (theme.background?.card) return theme.background.card;
      if (isForestTheme) return "rgba(255, 255, 255, 0.1)";
      if (isNeonTheme) return "rgba(0, 255, 255, 0.08)";
      return isDarkMode ? "rgba(55, 65, 81, 0.3)" : "rgba(255, 255, 255, 0.5)";
    };

    const getInactiveTextColor = () => {
      if (theme.textColors?.secondary) {
        if (isForestTheme) return "#065f46";
        if (isNeonTheme) return "#00ffff";
        return isDarkMode ? "#e5e7eb" : "#1f2937";
      }
      if (isForestTheme) return "#065f46";
      if (isNeonTheme) return "#00ffff";
      return isDarkMode ? "#e5e7eb" : "#1f2937";
    };

    const getBorderColor = () => {
      if (theme.border?.default) return theme.border.default;
      if (isForestTheme) return "rgba(5, 150, 105, 0.3)";
      if (isNeonTheme) return "rgba(0, 255, 255, 0.3)";
      return isDarkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(209, 213, 219, 0.4)";
    };

    const getHoverBackground = () => {
      if (theme.buttonColors?.primaryButton?.hoverBackground) {
        if (isForestTheme) return "linear-gradient(135deg, #047857, #059669)";
        if (isNeonTheme) return "linear-gradient(135deg, #00bfff, #00ffff)";
        return "linear-gradient(135deg, #1d4ed8, #1e40af)";
      }
      if (isForestTheme) return "linear-gradient(135deg, #047857, #059669)";
      if (isNeonTheme) return "linear-gradient(135deg, #00bfff, #00ffff)";
      return isDarkMode
        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
        : "linear-gradient(135deg, #1d4ed8, #1e40af)";
    };

    // Ethos hover background - purple
    const getEthosHoverBackground = () => {
      if (isForestTheme) return "linear-gradient(135deg, #6d28d9, #7c3aed)";
      if (isNeonTheme) return "linear-gradient(135deg, #7c3aed, #a855f7)";
      return isDarkMode
        ? "linear-gradient(135deg, #7c3aed, #8b5cf6)"
        : "linear-gradient(135deg, #6d28d9, #7c3aed)";
    };

    const getGlowEffect = () => {
      if (theme.ringEffect) return theme.ringEffect;
      if (isForestTheme) return "0 0 20px rgba(5, 150, 105, 0.4)";
      if (isNeonTheme)
        return "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)";
      return isDarkMode
        ? "0 0 20px rgba(59, 130, 246, 0.4)"
        : "0 0 20px rgba(37, 99, 235, 0.25)";
    };

    // Ethos glow effect - purple
    const getEthosGlowEffect = () => {
      return isDarkMode
        ? "0 0 20px rgba(139, 92, 246, 0.5)"
        : "0 0 20px rgba(124, 58, 237, 0.3)";
    };

    const getBoxShadow = () => {
      if (theme.shadow?.container) return theme.shadow.container;
      return isDarkMode
        ? "0 8px 32px rgba(0, 0, 0, 0.2)"
        : "0 8px 32px rgba(0, 0, 0, 0.08)";
    };

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
        backdropFilter: "blur(20px)",
        borderRadius: "0px",
        padding: "8px 16px",
        border: "none",
        borderBottom: `1px solid ${borderColor}`,
        borderTop: `1px solid ${borderColor}`,
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
        backdropFilter: "blur(8px)",
      },
      hoverBackground: getHoverBackground(),
      ethosHoverBackground: getEthosHoverBackground(),
      glowEffect: getGlowEffect(),
      ethosGlowEffect: getEthosGlowEffect(),
    };
  }, [theme, themeName, isDarkMode, isForestTheme, isNeonTheme]);

  // Touch‑optimized handlers with haptic feedback
  const handleDiscoveryTap = useCallback(
    (e) => {
      if (isDrift || isEthos) {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "scale(0.97)";
        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.style.background = styles.inactiveTab.background;
            e.currentTarget.style.color = styles.inactiveTab.color;
            e.currentTarget.style.transform = "scale(1)";
          }
        }, 150);
      }
    },
    [isDrift, isEthos, styles.hoverBackground, styles.inactiveTab],
  );

  const handleDriftTap = useCallback(
    (e) => {
      if (!isDrift && !isEthos) {
        e.currentTarget.style.background = styles.hoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "scale(0.97)";
        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.style.background = styles.inactiveTab.background;
            e.currentTarget.style.color = styles.inactiveTab.color;
            e.currentTarget.style.transform = "scale(1)";
          }
        }, 150);
      }
    },
    [isDrift, isEthos, styles.hoverBackground, styles.inactiveTab],
  );

  const handleEthosTap = useCallback(
    (e) => {
      if (!isEthos) {
        e.currentTarget.style.background = styles.ethosHoverBackground;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "scale(0.97)";
        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.style.background = styles.inactiveTab.background;
            e.currentTarget.style.color = styles.inactiveTab.color;
            e.currentTarget.style.transform = "scale(1)";
          }
        }, 150);
      }
    },
    [isEthos, styles.ethosHoverBackground, styles.inactiveTab],
  );

  const handleDiscoveryMouseEnter = useCallback(
    (e) => {
      if (isDrift || isEthos) {
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
      if (isDrift || isEthos) {
        e.currentTarget.style.background = styles.inactiveTab.background;
        e.currentTarget.style.color = styles.inactiveTab.color;
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    [isDrift, isEthos, styles.inactiveTab],
  );

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
      className={`discovery-drift-bar-mobile ${styles.container.className}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backdropFilter: styles.container.backdropFilter,
        WebkitBackdropFilter: styles.container.backdropFilter,
        padding: styles.container.padding,
        borderBottom: styles.container.borderBottom,
        borderTop: styles.container.borderTop,
        boxShadow: styles.container.boxShadow,
        width: "100%",
        ...(styles.container.backgroundColor && {
          backgroundColor: styles.container.backgroundColor,
        }),
      }}
    >
      <div className="discovery-drift-container-mobile">
        {/* Discovery Tab */}
        <Link
          href="/"
          className={`discovery-drift-tab-mobile ${!isDrift && !isEthos ? "active" : ""}`}
          style={{
            padding: "8px 16px",
            borderRadius: "40px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "13px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            flex: 1,
            maxWidth: "150px",
            ...(!isDrift && !isEthos ? styles.activeTab : styles.inactiveTab),
          }}
          onMouseEnter={handleDiscoveryMouseEnter}
          onMouseLeave={handleDiscoveryMouseLeave}
          onTouchStart={handleDiscoveryTap}
        >
          <MdExplore className="tab-icon-mobile" style={{ fontSize: "18px" }} />
          <span className="tab-text-mobile">Discovery</span>
          {!isDrift && !isEthos && (
            <>
              <span className="active-indicator-mobile" />
              <span className="ripple-effect" />
            </>
          )}
        </Link>

        {/* Drift Tab */}
        <Link
          href="/drift"
          className={`discovery-drift-tab-mobile ${isDrift ? "active" : ""}`}
          style={{
            padding: "8px 16px",
            borderRadius: "40px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "13px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            flex: 1,
            maxWidth: "150px",
            ...(isDrift ? styles.activeTab : styles.inactiveTab),
          }}
          onMouseEnter={handleDriftMouseEnter}
          onMouseLeave={handleDriftMouseLeave}
          onTouchStart={handleDriftTap}
        >
          <MdChat className="tab-icon-mobile" style={{ fontSize: "18px" }} />
          <span className="tab-text-mobile">Drift</span>
          {isDrift && (
            <>
              <span className="active-indicator-mobile" />
              <span className="ripple-effect" />
            </>
          )}
        </Link>

        {/* Ethos Tab - Web3.0 */}
        <Link
          href="/ethos"
          className={`discovery-drift-tab-mobile ${isEthos ? "active ethos-active" : ""}`}
          style={{
            padding: "8px 16px",
            borderRadius: "40px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "13px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            position: "relative",
            cursor: "pointer",
            border: "none",
            flex: 1,
            maxWidth: "150px",
            ...(isEthos ? styles.ethosActiveTab : styles.inactiveTab),
          }}
          onMouseEnter={handleEthosMouseEnter}
          onMouseLeave={handleEthosMouseLeave}
          onTouchStart={handleEthosTap}
        >
          <FaAnchor className="tab-icon-mobile" style={{ fontSize: "16px" }} />
          <span className="tab-text-mobile">Ethos</span>
          <span className="ethos-web3-badge">Web3</span>
          {isEthos && (
            <>
              <span className="active-indicator-mobile ethos-indicator" />
              <span className="ripple-effect" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
});

DiscoveryDriftBarMobile.displayName = "DiscoveryDriftBarMobile";

export default DiscoveryDriftBarMobile;
