"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import Navbar_Admin_Dashboard from "./Navbar_Admin_Dashboard";
import Sidebar from "./Sidebar";
import "./AdminDashboardLayout.css";

const AdminDashboardLayout = ({ children }) => {
  const { theme, themeName } = useTheme();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check dark mode
  useEffect(() => {
    setIsDarkMode(
      themeName === "dark" ||
      themeName === "midnight" ||
      themeName === "cyberpunk"
    );
  }, [themeName]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getBgColor = () => {
    if (isDarkMode) return "#111827";
    return "#F9FAFB";
  };

  return (
    <div className={`admin-dashboard-layout ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        isDarkMode={isDarkMode}
        onToggle={toggleSidebar}
        pathname={pathname}
        theme={theme}
      />

      {/* Main Content */}
      <div
        className={`admin-dashboard-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
        style={{
          backgroundColor: getBgColor(),
        }}
      >
        {/* Navbar */}
        <Navbar_Admin_Dashboard
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Page Content */}
        <main className="admin-dashboard-content">
          <div className="admin-dashboard-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;