// src/layout_ethos/ethos_layout.jsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import LayoutEthosDesktop from "./layout_ethos_desktop/layout_ethos_desktop";
import LayoutEthosMobile from "./layout_ethos_mobile/layout_ethos_mobile";

export default function EthosLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { themeName } = useTheme();
  const { currentFont } = useFont();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLoading(false);
    };

    checkMobile();

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor:
            themeName === "dark" || themeName === "midnight"
              ? "#0f172a"
              : "#f1f5f9",
          fontFamily: currentFont?.family || "inherit",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "48px", display: "block" }}>⚓</span>
          <div
            style={{
              width: "40px",
              height: "40px",
              margin: "16px auto",
              border: `3px solid ${themeName === "dark" || themeName === "midnight" ? "#334155" : "#e2e8f0"}`,
              borderTop: "3px solid #8b5cf6",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ opacity: 0.6, fontSize: "14px" }}>Loading Ethos...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return isMobile ? (
    <LayoutEthosMobile>{children}</LayoutEthosMobile>
  ) : (
    <LayoutEthosDesktop>{children}</LayoutEthosDesktop>
  );
}
