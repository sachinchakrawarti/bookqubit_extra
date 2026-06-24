"use client";

import {
  FiBookOpen,
  FiUsers,
  FiHeart,
  FiEye,
  FiBookmark,
} from "react-icons/fi";

export default function LibraryStats({ libraries }) {
  const totalBooks = libraries.reduce((acc, lib) => acc + lib.books.length, 0);
  const totalMembers = libraries.reduce(
    (acc, lib) => acc + lib.stats.members,
    0,
  );
  const totalLikes = libraries.reduce((acc, lib) => acc + lib.stats.likes, 0);
  const totalViews = libraries.reduce((acc, lib) => acc + lib.stats.views, 0);
  const totalSaves = libraries.reduce((acc, lib) => acc + lib.stats.saves, 0);

  const stats = [
    {
      label: "Collectives",
      value: libraries.length,
      icon: <FiBookOpen />,
      color: "#3b82f6",
    },
    {
      label: "Total Books",
      value: totalBooks,
      icon: <FiBookOpen />,
      color: "#8b5cf6",
    },
    {
      label: "Members",
      value: totalMembers,
      icon: <FiUsers />,
      color: "#10b981",
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: <FiHeart />,
      color: "#ef4444",
    },
    {
      label: "Total Saves",
      value: totalSaves,
      icon: <FiBookmark />,
      color: "#f59e0b",
    },
    {
      label: "Total Views",
      value: totalViews,
      icon: <FiEye />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="cl-stats">
      {stats.map((stat, idx) => (
        <div key={idx} className="cl-stat-card">
          <div className="cl-stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="cl-stat-info">
            <span className="cl-stat-value">{stat.value}</span>
            <span className="cl-stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
