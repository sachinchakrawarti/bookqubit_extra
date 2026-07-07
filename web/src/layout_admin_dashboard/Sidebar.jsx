"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaCog,
  FaChartBar,
  FaTags,
  FaComments,
  FaFileAlt,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaStar,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, isMobile, isDarkMode, onToggle, theme }) => {
  const pathname = usePathname();
  const { themeName } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  // Close sidebar on mobile when pathname changes
  React.useEffect(() => {
    if (isMobile && isOpen) {
      onToggle();
    }
  }, [pathname, isMobile, isOpen, onToggle]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Navigation items
  const navItems = [
    {
      section: "Main",
      items: [
        { href: "/admin-dashboard", icon: FaHome, label: "Dashboard" },
        { href: "/admin-dashboard/books", icon: FaBook, label: "Books" },
        { href: "/admin-dashboard/users", icon: FaUsers, label: "Users" },
      ],
    },
    {
      section: "Content",
      items: [
        { href: "/admin-dashboard/languages", icon: FaTags, label: "Languages" },
        { href: "/admin-dashboard/tags", icon: FaTags, label: "Tags" },
        { href: "/admin-dashboard/comments", icon: FaComments, label: "Comments" },
        { href: "/admin-dashboard/reviews", icon: FaStar, label: "Reviews" },
      ],
    },
    {
      section: "Settings",
      items: [
        { href: "/admin-dashboard/analytics", icon: FaChartBar, label: "Analytics" },
        { href: "/admin-dashboard/settings", icon: FaCog, label: "Settings" },
      ],
    },
  ];

  // Theme-based color functions
  const getSidebarBg = () => {
    if (theme?.background?.section) return theme.background.section;
    if (theme?.background?.card) return theme.background.card;
    if (isDarkMode) return "bg-gray-900";
    return "bg-white";
  };

  const getBorderColor = () => {
    if (theme?.border?.default) return theme.border.default;
    if (isDarkMode) return "border-gray-700";
    return "border-gray-200";
  };

  const getTextColor = () => {
    if (theme?.textColors?.secondary) return theme.textColors.secondary;
    if (isDarkMode) return "text-gray-400";
    return "text-gray-600";
  };

  const getPrimaryTextColor = () => {
    if (theme?.textColors?.primary) return theme.textColors.primary;
    if (isDarkMode) return "text-gray-100";
    return "text-gray-900";
  };

  const getActiveBg = () => {
    if (theme?.background?.navigationDots) return theme.background.navigationDots;
    if (isDarkMode) return "bg-gray-800";
    return "bg-gray-100";
  };

  const getActiveColor = () => {
    if (theme?.textColors?.highlight) return theme.textColors.highlight;
    if (isDarkMode) return "text-sky-400";
    return "text-sky-600";
  };

  const getHoverBg = () => {
    if (theme?.background?.hover) return theme.background.hover;
    if (isDarkMode) return "hover:bg-gray-800/50";
    return "hover:bg-gray-100/50";
  };

  const getSidebarShadow = () => {
    if (theme?.shadow?.container) return theme.shadow.container;
    return "shadow-xl";
  };

  const isActive = (href) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onToggle} />
      )}

      <aside
        className={`
          admin-sidebar 
          ${isOpen ? "open" : "closed"} 
          ${collapsed ? "collapsed" : ""} 
          ${isDarkMode ? "dark" : ""} 
          ${isMobile ? "mobile" : ""}
          ${getSidebarBg()}
          ${getBorderColor()}
          ${getSidebarShadow()}
          border-r
          transition-all duration-300
        `}
      >
        {/* Logo - Only in Sidebar */}
        <div className={`sidebar-logo ${getBorderColor()} border-b`}>
          <div className="sidebar-logo-icon">
            <FaBook />
          </div>
          {!collapsed && (
            <span className={`sidebar-logo-text ${getPrimaryTextColor()}`}>
              Admin Panel
            </span>
          )}
        </div>

        {/* Collapse Toggle (Desktop only) */}
        {!isMobile && (
          <button
            className={`
              sidebar-collapse-btn 
              ${getSidebarBg()}
              ${getBorderColor()}
              border
              transition-all duration-300
              hover:scale-110
            `}
            onClick={toggleCollapse}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        )}

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((section, idx) => (
            <div key={idx} className="sidebar-section">
              {!collapsed && (
                <div className={`sidebar-section-title ${getTextColor()}`}>
                  {section.section}
                </div>
              )}
              <ul className="sidebar-menu">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className={`
                          sidebar-menu-item 
                          ${active ? "active" : ""}
                          ${getHoverBg()}
                          ${active ? getActiveBg() : ""}
                          ${active ? getActiveColor() : getTextColor()}
                          transition-all duration-200
                        `}
                      >
                        <Icon className="sidebar-menu-icon" />
                        {!collapsed && <span>{item.label}</span>}
                        {collapsed && (
                          <span className={`sidebar-tooltip ${getSidebarBg()} ${getPrimaryTextColor()}`}>
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className={`sidebar-bottom ${getBorderColor()} border-t`}>
          <Link
            href="/admin-dashboard/profile"
            className={`
              sidebar-menu-item 
              ${isActive("/admin-dashboard/profile") ? "active" : ""}
              ${getHoverBg()}
              ${isActive("/admin-dashboard/profile") ? getActiveBg() : ""}
              ${isActive("/admin-dashboard/profile") ? getActiveColor() : getTextColor()}
              transition-all duration-200
            `}
          >
            <FaUserCircle className="sidebar-menu-icon" />
            {!collapsed && <span>Profile</span>}
          </Link>
          <Link
            href="/admin-dashboard/settings"
            className={`
              sidebar-menu-item 
              ${isActive("/admin-dashboard/settings") ? "active" : ""}
              ${getHoverBg()}
              ${isActive("/admin-dashboard/settings") ? getActiveBg() : ""}
              ${isActive("/admin-dashboard/settings") ? getActiveColor() : getTextColor()}
              transition-all duration-200
            `}
          >
            <FaCog className="sidebar-menu-icon" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            className="sidebar-menu-item sidebar-logout transition-all duration-200 hover:bg-red-500/10"
          >
            <FaSignOutAlt className="sidebar-menu-icon" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;