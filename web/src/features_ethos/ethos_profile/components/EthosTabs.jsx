// components/EthosTabs.jsx
"use client";

import { FiUser, FiAward, FiImage, FiActivity } from "react-icons/fi";

export default function EthosTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "identity", label: "Identity", icon: <FiUser /> },
    { id: "reputation", label: "Reputation", icon: <FiAward /> },
    { id: "nfts", label: "NFTs", icon: <FiImage /> },
    { id: "activity", label: "Activity", icon: <FiActivity /> },
  ];

  return (
    <div className="ethos-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`ethos-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="ethos-tab-icon">{tab.icon}</span>
          <span className="ethos-tab-label">{tab.label}</span>
          {activeTab === tab.id && <span className="ethos-tab-indicator" />}
        </button>
      ))}
    </div>
  );
}