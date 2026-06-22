// components/EthosTabs.jsx
"use client";

import { useState, useEffect } from "react";
import {
  FiUser,
  FiAward,
  FiImage,
  FiActivity,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiMessageSquare,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import "./EthosTabs.css";

export default function EthosTabs({ activeTab, setActiveTab }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { 
      id: "identity", 
      label: "Identity", 
      icon: <FiUser />,
      description: "Profile & identity",
      badge: null,
    },
    { 
      id: "reputation", 
      label: "Reputation", 
      icon: <FiAward />,
      description: "On-chain reputation",
      badge: "New",
    },
    { 
      id: "nfts", 
      label: "NFTs", 
      icon: <FiImage />,
      description: "NFT gallery",
      badge: "24",
    },
    { 
      id: "activity", 
      label: "Activity", 
      icon: <FiActivity />,
      description: "Recent activity",
      badge: null,
    },
  ];

  // Additional tabs for desktop
  const extraTabs = [
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: <FiBarChart2 />,
      description: "Analytics & insights",
      badge: null,
    },
    { 
      id: "messages", 
      label: "Messages", 
      icon: <FiMessageSquare />,
      description: "Messages & notifications",
      badge: "5",
    },
  ];

  const allTabs = [...tabs, ...extraTabs];

  // Handle tab click with animation
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Close mobile dropdown if open
    if (isMobile && showMore) {
      setShowMore(false);
    }
  };

  // Get active tab data
  const activeTabData = allTabs.find(tab => tab.id === activeTab);

  return (
    <div className="ethos-tabs-wrapper">
      {/* Desktop Tabs */}
      <div className="ethos-tabs">
        {allTabs.map((tab) => (
          <button
            key={tab.id}
            className={`ethos-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            title={tab.description}
          >
            <span className="ethos-tab-icon">{tab.icon}</span>
            <span className="ethos-tab-label">{tab.label}</span>
            {tab.badge && (
              <span className={`ethos-tab-badge ${tab.id === "nfts" ? "nfts" : ""}`}>
                {tab.badge}
              </span>
            )}
            {activeTab === tab.id && <span className="ethos-tab-indicator" />}
          </button>
        ))}
      </div>

      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="ethos-tabs-mobile">
        <div className="ethos-tabs-scroll">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`ethos-tab-mobile ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="ethos-tab-mobile-icon">{tab.icon}</span>
              <span className="ethos-tab-mobile-label">{tab.label}</span>
              {tab.badge && (
                <span className="ethos-tab-mobile-badge">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile More Button */}
        <button 
          className="ethos-tab-more"
          onClick={() => setShowMore(!showMore)}
        >
          <span className="ethos-tab-more-icon">•••</span>
          {showMore ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {/* Mobile Dropdown */}
        {showMore && (
          <div className="ethos-tab-dropdown">
            {extraTabs.map((tab) => (
              <button
                key={tab.id}
                className={`ethos-tab-dropdown-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="ethos-tab-dropdown-icon">{tab.icon}</span>
                <span className="ethos-tab-dropdown-label">{tab.label}</span>
                {tab.badge && (
                  <span className="ethos-tab-dropdown-badge">{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Info Bar */}
      <div className="ethos-tab-info">
        <div className="ethos-tab-info-content">
          <span className="ethos-tab-info-icon">
            {activeTabData?.icon}
          </span>
          <span className="ethos-tab-info-label">{activeTabData?.label}</span>
          <span className="ethos-tab-info-description">
            {activeTabData?.description}
          </span>
        </div>
        <div className="ethos-tab-info-actions">
          <button className="ethos-tab-info-action" title="Help">
            <FiHelpCircle />
          </button>
          <button className="ethos-tab-info-action" title="Settings">
            <FiSettings />
          </button>
          <button className="ethos-tab-info-action" title="Notifications">
            <FiBell />
          </button>
        </div>
      </div>
    </div>
  );
}