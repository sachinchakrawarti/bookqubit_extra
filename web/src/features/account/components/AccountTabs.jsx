// components/AccountTabs.jsx
"use client";

import { FiUser, FiBarChart2, FiAward } from "react-icons/fi";

export default function AccountTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { id: "bookworm", label: "Bookworm", icon: <FiAward /> },
  ];

  return (
    <div className="account-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`account-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}