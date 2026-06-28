"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";

const SheetFooter = ({
  primaryLabel = "Add to Library",
  secondaryLabel = "Cancel",
  onPrimary,
  onSecondary,
  primaryIcon = null,
  secondaryIcon = null,
  primaryDisabled = false,
  secondaryDisabled = false,
  primaryVariant = "primary", // 'primary', 'success', 'danger', 'warning'
  isDarkMode = false,
  className = "",
  children,
  showDivider = true,
}) => {
  const { theme } = useTheme();

  // Get primary button colors based on variant
  const getPrimaryColors = () => {
    const variants = {
      primary: {
        background: `linear-gradient(135deg, ${theme.colors?.primary || "#6366F1"}, ${theme.colors?.secondary || "#8B5CF6"})`,
        hoverBackground: `linear-gradient(135deg, ${theme.colors?.primaryDark || "#4F46E5"}, ${theme.colors?.secondaryDark || "#7C3AED"})`,
        textColor: "white",
        shadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
        hoverShadow: "0 6px 25px rgba(99, 102, 241, 0.4)",
      },
      success: {
        background: `linear-gradient(135deg, #10B981, #059669)`,
        hoverBackground: `linear-gradient(135deg, #059669, #047857)`,
        textColor: "white",
        shadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
        hoverShadow: "0 6px 25px rgba(16, 185, 129, 0.4)",
      },
      danger: {
        background: `linear-gradient(135deg, #EF4444, #DC2626)`,
        hoverBackground: `linear-gradient(135deg, #DC2626, #B91C1C)`,
        textColor: "white",
        shadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
        hoverShadow: "0 6px 25px rgba(239, 68, 68, 0.4)",
      },
      warning: {
        background: `linear-gradient(135deg, #F59E0B, #D97706)`,
        hoverBackground: `linear-gradient(135deg, #D97706, #B45309)`,
        textColor: "white",
        shadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
        hoverShadow: "0 6px 25px rgba(245, 158, 11, 0.4)",
      },
    };
    return variants[primaryVariant] || variants.primary;
  };

  const primaryColors = getPrimaryColors();

  return (
    <div className={`sheet-footer ${isDarkMode ? "dark" : ""} ${className}`}>
      {showDivider && <div className="sheet-footer-divider" />}

      <div className="sheet-footer-content">
        {children && <div className="sheet-footer-children">{children}</div>}

        <div className="sheet-footer-buttons">
          {/* Secondary Button */}
          {secondaryLabel && (
            <button
              className={`footer-btn secondary-btn ${isDarkMode ? "dark" : ""}`}
              onClick={onSecondary}
              disabled={secondaryDisabled}
            >
              {secondaryIcon && (
                <span className="btn-icon">{secondaryIcon}</span>
              )}
              {secondaryLabel}
            </button>
          )}

          {/* Primary Button */}
          {primaryLabel && (
            <button
              className={`footer-btn primary-btn ${primaryDisabled ? "disabled" : ""}`}
              onClick={onPrimary}
              disabled={primaryDisabled}
              style={{
                background: primaryColors.background,
                color: primaryColors.textColor,
                boxShadow: primaryColors.shadow,
              }}
              onMouseEnter={(e) => {
                if (!primaryDisabled) {
                  e.currentTarget.style.background =
                    primaryColors.hoverBackground;
                  e.currentTarget.style.boxShadow = primaryColors.hoverShadow;
                }
              }}
              onMouseLeave={(e) => {
                if (!primaryDisabled) {
                  e.currentTarget.style.background = primaryColors.background;
                  e.currentTarget.style.boxShadow = primaryColors.shadow;
                }
              }}
            >
              {primaryIcon && <span className="btn-icon">{primaryIcon}</span>}
              {primaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SheetFooter;
