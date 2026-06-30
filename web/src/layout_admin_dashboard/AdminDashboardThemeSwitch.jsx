"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { FaCheck, FaPalette, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AdminDashboardThemeSwitch.css";

const AdminDashboardThemeSwitch = ({ isInline = false, onThemeChange }) => {
  const { themeName, changeTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const themesList = [
    { key: "light", icon: "☀️", name: "Light" },
    { key: "dark", icon: "🌙", name: "Dark" },
    { key: "forest", icon: "🌲", name: "Forest" },
    { key: "cyberpunk", icon: "🎮", name: "Cyberpunk" },
    { key: "lavender", icon: "🌸", name: "Lavender" },
    { key: "midnight", icon: "🌃", name: "Midnight" },
    { key: "ocean", icon: "🌊", name: "Ocean" },
    { key: "rose", icon: "🌹", name: "Rose" },
    { key: "sand", icon: "🏖️", name: "Sand" },
    { key: "sepia", icon: "📜", name: "Sepia" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);
    setIsOpen(false);
    if (onThemeChange) {
      onThemeChange(themeKey);
    }
  };

  const getCurrentThemeName = () => {
    const found = themesList.find(t => t.key === themeName);
    return found ? found.name : "Light";
  };

  const getCurrentThemeIcon = () => {
    const found = themesList.find(t => t.key === themeName);
    return found ? found.icon : "☀️";
  };

  return (
    <div className="admin-theme-switch" ref={dropdownRef}>
      <button 
        className={`admin-theme-toggle ${isDarkMode ? "dark" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme menu"
      >
        <FaPalette className="theme-toggle-icon" />
        <span className="theme-toggle-name">{getCurrentThemeName()}</span>
        {isOpen ? <FaChevronUp className="theme-toggle-chevron" /> : <FaChevronDown className="theme-toggle-chevron" />}
      </button>

      {isOpen && (
        <div className={`admin-theme-dropdown ${isDarkMode ? "dark" : ""}`}>
          <div className="theme-dropdown-header">
            <h3 className="theme-dropdown-title">Choose Theme</h3>
            <p className="theme-dropdown-subtitle">Select your preferred appearance</p>
          </div>

          <div className="theme-dropdown-grid">
            {themesList.map((item) => {
              const isActive = themeName === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleThemeChange(item.key)}
                  className={`theme-option ${isActive ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                >
                  <span className="theme-option-icon">{item.icon}</span>
                  <span className="theme-option-name">{item.name}</span>
                  {isActive && <FaCheck className="theme-option-check" />}
                </button>
              );
            })}
          </div>

          <div className="theme-dropdown-footer">
            <p className="theme-dropdown-footer-text">Theme changes apply instantly</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardThemeSwitch;