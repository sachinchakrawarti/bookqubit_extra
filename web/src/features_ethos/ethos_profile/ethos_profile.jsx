// src/features_ethos/ethos_profile/ethos_profile.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FaUser,
  FaUserCircle,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaWallet,
  FaCoins,
  FaBook,
  FaStar,
  FaFire,
  FaTrophy,
  FaMedal,
  FaAward,
  FaCalendarAlt,
  FaMapPin,
  FaLink,
  FaTwitter,
  FaGithub,
  FaDiscord,
  FaEnvelope,
  FaGlobe,
  FaUsers,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCopy,
  FaShieldAlt,
  FaLock,
  FaUnlock,
  FaPen,
  FaTrash,
  FaPlus,
  FaMinus,
  FaHeart,
  FaEye,
  FaComment,
  FaShareAlt,
  FaBolt,
  FaGem,
  FaCrown,
} from "react-icons/fa";
import "./ethos_profile.css";

export default function EthosProfile() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState({
    name: "Alex Quantum",
    username: "@alex_quantum",
    bio: "Web3 enthusiast, book lover, and blockchain educator. Building the future of decentralized reading.",
    location: "San Francisco, CA",
    website: "https://alexquantum.eth",
    twitter: "@alex_quantum",
    github: "alex-quantum",
    discord: "alex_quantum#1234",
    email: "alex@bookqubit.com",
    joined: "January 2024",
    avatar: "👨‍🚀",
    coverColor: "#8b5cf6",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  });

  // Stats
  const stats = {
    tokens: 124.56,
    nfts: 8,
    books: 234,
    followers: 1245,
    following: 567,
    reputation: 98,
    level: 42,
    experience: 78,
    achievements: 23,
  };

  // Activities
  const activities = [
    {
      id: 1,
      type: "book",
      action: "Read",
      title: "The Quantum Reader",
      time: "2 hours ago",
      icon: "📚",
      reward: "+5 ETHOS",
    },
    {
      id: 2,
      type: "nft",
      action: "Collected",
      title: "Web3 Wisdom #23",
      time: "4 hours ago",
      icon: "🖼️",
      reward: "+10 ETHOS",
    },
    {
      id: 3,
      type: "dao",
      action: "Voted",
      title: "Treasury Allocation Proposal",
      time: "1 day ago",
      icon: "🗳️",
      reward: "+15 ETHOS",
    },
    {
      id: 4,
      type: "token",
      action: "Staked",
      title: "ETHOS Tokens",
      time: "2 days ago",
      icon: "💰",
      reward: "+8 ETHOS",
    },
    {
      id: 5,
      type: "book",
      action: "Completed",
      title: "Decentralized Dreams",
      time: "3 days ago",
      icon: "📖",
      reward: "+12 ETHOS",
    },
  ];

  // Achievements
  const achievements = [
    { id: 1, name: "Early Adopter", icon: "🌟", unlocked: true, description: "Joined in the first month" },
    { id: 2, name: "Book Worm", icon: "📚", unlocked: true, description: "Read 100+ books" },
    { id: 3, name: "DAO Member", icon: "🏛️", unlocked: true, description: "Active DAO participant" },
    { id: 4, name: "NFT Collector", icon: "🎨", unlocked: true, description: "Own 5+ NFTs" },
    { id: 5, name: "Staking King", icon: "👑", unlocked: true, description: "Staked 1000+ ETHOS" },
    { id: 6, name: "Community Leader", icon: "⭐", unlocked: false, description: "1000+ followers" },
    { id: 7, name: "Content Creator", icon: "✍️", unlocked: false, description: "Published 10+ reviews" },
    { id: 8, name: "Web3 Pioneer", icon: "🚀", unlocked: false, description: "Early participant in Web3" },
  ];

  // NFTs
  const nfts = [
    { id: 1, name: "The Quantum Reader", edition: "1/100", image: "🔮", value: "0.45 ETH" },
    { id: 2, name: "Web3 Wisdom", edition: "23/250", image: "📖", value: "0.28 ETH" },
    { id: 3, name: "Digital Poetry", edition: "47/500", image: "📝", value: "0.12 ETH" },
  ];

  // Recent Books
  const recentBooks = [
    { id: 1, title: "The Quantum Reader", author: "Dr. Sarah Chen", progress: 100, image: "🔮" },
    { id: 2, title: "Web3 Wisdom", author: "Marcus Webb", progress: 75, image: "📖" },
    { id: 3, title: "Decentralized Dreams", author: "Elena Rodriguez", progress: 45, image: "🌐" },
    { id: 4, title: "The Infinite Library", author: "Prof. James Morrison", progress: 30, image: "🏛️" },
  ];

  // Handle edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(profileData.walletAddress);
  };

  return (
    <div className="ethos-profile-page">
      {/* Cover Image */}
      <div 
        className="ethos-profile-cover"
        style={{ background: `linear-gradient(135deg, ${profileData.coverColor}, ${profileData.coverColor}dd, ${profileData.coverColor}99)` }}
      >
        <button className="ethos-profile-cover-edit">
          <FaCamera size={16} />
          Change Cover
        </button>
      </div>

      {/* Profile Header */}
      <div className="ethos-profile-header">
        <div className="ethos-profile-avatar-wrapper">
          <div className="ethos-profile-avatar">
            {profileData.avatar}
          </div>
          <button className="ethos-profile-avatar-edit">
            <FaCamera size={14} />
          </button>
        </div>

        <div className="ethos-profile-info">
          <div className="ethos-profile-name-row">
            <h1 className="ethos-profile-name">{profileData.name}</h1>
            <span className="ethos-profile-username">{profileData.username}</span>
            <span className="ethos-profile-level">
              <FaBolt size={12} />
              Level {stats.level}
            </span>
          </div>
          <p className="ethos-profile-bio">{profileData.bio}</p>
          <div className="ethos-profile-meta">
            <span className="ethos-profile-meta-item">
              <FaMapPin size={12} />
              {profileData.location}
            </span>
            <span className="ethos-profile-meta-item">
              <FaCalendarAlt size={12} />
              Joined {profileData.joined}
            </span>
            <span className="ethos-profile-meta-item">
              <FaLink size={12} />
              <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                {profileData.website}
              </a>
            </span>
          </div>
          <div className="ethos-profile-social">
            <a href={`https://twitter.com/${profileData.twitter}`} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={16} />
            </a>
            <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer">
              <FaGithub size={16} />
            </a>
            <a href={`https://discord.com/users/${profileData.discord}`} target="_blank" rel="noopener noreferrer">
              <FaDiscord size={16} />
            </a>
            <a href={`mailto:${profileData.email}`}>
              <FaEnvelope size={16} />
            </a>
          </div>
        </div>

        <div className="ethos-profile-actions">
          {isEditing ? (
            <>
              <button className="ethos-profile-btn save" onClick={handleSave}>
                <FaSave size={14} />
                Save
              </button>
              <button className="ethos-profile-btn cancel" onClick={handleCancel}>
                <FaTimes size={14} />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="ethos-profile-btn edit" onClick={handleEdit}>
                <FaEdit size={14} />
                Edit Profile
              </button>
              <button className="ethos-profile-btn message">
                <FaComment size={14} />
                Message
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="ethos-profile-stats">
        <div className="ethos-profile-stat-item">
          <FaCoins className="ethos-profile-stat-icon" color="#f59e0b" />
          <div>
            <span className="ethos-profile-stat-label">Tokens</span>
            <span className="ethos-profile-stat-value">{stats.tokens} ETHOS</span>
          </div>
        </div>
        <div className="ethos-profile-stat-item">
          <FaGem className="ethos-profile-stat-icon" color="#8b5cf6" />
          <div>
            <span className="ethos-profile-stat-label">NFTs</span>
            <span className="ethos-profile-stat-value">{stats.nfts}</span>
          </div>
        </div>
        <div className="ethos-profile-stat-item">
          <FaBook className="ethos-profile-stat-icon" color="#3b82f6" />
          <div>
            <span className="ethos-profile-stat-label">Books</span>
            <span className="ethos-profile-stat-value">{stats.books}</span>
          </div>
        </div>
        <div className="ethos-profile-stat-item">
          <FaUsers className="ethos-profile-stat-icon" color="#10b981" />
          <div>
            <span className="ethos-profile-stat-label">Followers</span>
            <span className="ethos-profile-stat-value">{stats.followers}</span>
          </div>
        </div>
        <div className="ethos-profile-stat-item">
          <FaStar className="ethos-profile-stat-icon" color="#f59e0b" />
          <div>
            <span className="ethos-profile-stat-label">Reputation</span>
            <span className="ethos-profile-stat-value">{stats.reputation}%</span>
          </div>
        </div>
        <div className="ethos-profile-stat-item">
          <FaTrophy className="ethos-profile-stat-icon" color="#ef4444" />
          <div>
            <span className="ethos-profile-stat-label">Achievements</span>
            <span className="ethos-profile-stat-value">{stats.achievements}</span>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="ethos-profile-wallet">
        <div className="ethos-profile-wallet-content">
          <FaShieldAlt size={16} className="ethos-profile-wallet-icon" />
          <span className="ethos-profile-wallet-address">{profileData.walletAddress}</span>
          <button onClick={copyAddress} className="ethos-profile-wallet-copy">
            <FaCopy size={14} />
          </button>
          <a 
            href={`https://etherscan.io/address/${profileData.walletAddress}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ethos-profile-wallet-link"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="ethos-profile-tabs">
        {["overview", "books", "nfts", "achievements", "activity"].map((tab) => (
          <button
            key={tab}
            className={`ethos-profile-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="ethos-profile-content">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="ethos-profile-overview">
            <div className="ethos-profile-overview-grid">
              {/* Recent Books */}
              <div className="ethos-profile-section">
                <h3 className="ethos-profile-section-title">
                  <FaBook size={16} />
                  Recent Books
                </h3>
                <div className="ethos-profile-books-list">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="ethos-profile-book-item">
                      <div className="ethos-profile-book-icon">{book.image}</div>
                      <div className="ethos-profile-book-info">
                        <div className="ethos-profile-book-title">{book.title}</div>
                        <div className="ethos-profile-book-author">{book.author}</div>
                        <div className="ethos-profile-book-progress-wrapper">
                          <div 
                            className="ethos-profile-book-progress-bar"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                        <div className="ethos-profile-book-progress-text">
                          {book.progress}% complete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="ethos-profile-section">
                <h3 className="ethos-profile-section-title">
                  <FaClock size={16} />
                  Recent Activity
                </h3>
                <div className="ethos-profile-activity-list">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="ethos-profile-activity-item">
                      <div className="ethos-profile-activity-icon">{activity.icon}</div>
                      <div className="ethos-profile-activity-info">
                        <div className="ethos-profile-activity-text">
                          <span className="ethos-profile-activity-action">{activity.action}</span>
                          <span className="ethos-profile-activity-title">{activity.title}</span>
                        </div>
                        <div className="ethos-profile-activity-meta">
                          <span className="ethos-profile-activity-time">{activity.time}</span>
                          <span className="ethos-profile-activity-reward">{activity.reward}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="ethos-profile-section-view-all">
                  View All Activity <FaArrowRight size={12} />
                </button>
              </div>

              {/* Stats */}
              <div className="ethos-profile-section">
                <h3 className="ethos-profile-section-title">
                  <FaChartLine size={16} />
                  Stats
                </h3>
                <div className="ethos-profile-stats-grid">
                  <div className="ethos-profile-stats-item">
                    <span className="ethos-profile-stats-label">Reading Streak</span>
                    <span className="ethos-profile-stats-value">🔥 15 days</span>
                  </div>
                  <div className="ethos-profile-stats-item">
                    <span className="ethos-profile-stats-label">Books This Month</span>
                    <span className="ethos-profile-stats-value">12</span>
                  </div>
                  <div className="ethos-profile-stats-item">
                    <span className="ethos-profile-stats-label">Total Pages Read</span>
                    <span className="ethos-profile-stats-value">2,456</span>
                  </div>
                  <div className="ethos-profile-stats-item">
                    <span className="ethos-profile-stats-label">DAO Votes Cast</span>
                    <span className="ethos-profile-stats-value">34</span>
                  </div>
                </div>
              </div>

              {/* Achievements Preview */}
              <div className="ethos-profile-section">
                <h3 className="ethos-profile-section-title">
                  <FaTrophy size={16} />
                  Recent Achievements
                </h3>
                <div className="ethos-profile-achievements-preview">
                  {achievements.slice(0, 4).map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`ethos-profile-achievement-preview-item ${achievement.unlocked ? "unlocked" : "locked"}`}
                    >
                      <div className="ethos-profile-achievement-preview-icon">
                        {achievement.icon}
                      </div>
                      <div className="ethos-profile-achievement-preview-name">
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKS TAB */}
        {activeTab === "books" && (
          <div className="ethos-profile-books">
            <div className="ethos-profile-books-header">
              <h3 className="ethos-profile-books-title">My Library</h3>
              <div className="ethos-profile-books-filters">
                <button className="ethos-profile-books-filter-btn active">All</button>
                <button className="ethos-profile-books-filter-btn">Reading</button>
                <button className="ethos-profile-books-filter-btn">Completed</button>
                <button className="ethos-profile-books-filter-btn">Want to Read</button>
              </div>
            </div>
            <div className="ethos-profile-books-grid">
              {recentBooks.map((book) => (
                <div key={book.id} className="ethos-profile-book-card">
                  <div className="ethos-profile-book-card-image">{book.image}</div>
                  <div className="ethos-profile-book-card-info">
                    <h4 className="ethos-profile-book-card-title">{book.title}</h4>
                    <p className="ethos-profile-book-card-author">{book.author}</p>
                    <div className="ethos-profile-book-card-progress">
                      <div className="ethos-profile-book-card-progress-bar-wrapper">
                        <div 
                          className="ethos-profile-book-card-progress-bar"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      <span className="ethos-profile-book-card-progress-text">
                        {book.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NFTS TAB */}
        {activeTab === "nfts" && (
          <div className="ethos-profile-nfts">
            <div className="ethos-profile-nfts-header">
              <h3 className="ethos-profile-nfts-title">NFT Collection</h3>
              <span className="ethos-profile-nfts-count">{stats.nfts} items</span>
            </div>
            <div className="ethos-profile-nfts-grid">
              {nfts.map((nft) => (
                <div key={nft.id} className="ethos-profile-nft-card">
                  <div className="ethos-profile-nft-card-image">{nft.image}</div>
                  <div className="ethos-profile-nft-card-info">
                    <h4 className="ethos-profile-nft-card-name">{nft.name}</h4>
                    <p className="ethos-profile-nft-card-edition">{nft.edition}</p>
                    <div className="ethos-profile-nft-card-value">{nft.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div className="ethos-profile-achievements">
            <div className="ethos-profile-achievements-header">
              <h3 className="ethos-profile-achievements-title">
                <FaTrophy size={18} />
                Achievements
              </h3>
              <span className="ethos-profile-achievements-count">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
              </span>
            </div>
            <div className="ethos-profile-achievements-grid">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`ethos-profile-achievement-card ${achievement.unlocked ? "unlocked" : "locked"}`}
                >
                  <div className="ethos-profile-achievement-card-icon">
                    {achievement.icon}
                  </div>
                  <h4 className="ethos-profile-achievement-card-name">{achievement.name}</h4>
                  <p className="ethos-profile-achievement-card-desc">{achievement.description}</p>
                  <div className="ethos-profile-achievement-card-status">
                    {achievement.unlocked ? (
                      <span className="ethos-profile-achievement-card-unlocked">
                        <FaCheckCircle size={12} />
                        Unlocked
                      </span>
                    ) : (
                      <span className="ethos-profile-achievement-card-locked">
                        <FaLock size={12} />
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && (
          <div className="ethos-profile-activity">
            <div className="ethos-profile-activity-header">
              <h3 className="ethos-profile-activity-title">All Activity</h3>
            </div>
            <div className="ethos-profile-activity-timeline">
              {activities.map((activity) => (
                <div key={activity.id} className="ethos-profile-activity-timeline-item">
                  <div className="ethos-profile-activity-timeline-icon">
                    {activity.icon}
                  </div>
                  <div className="ethos-profile-activity-timeline-content">
                    <div className="ethos-profile-activity-timeline-text">
                      <span className="ethos-profile-activity-timeline-action">
                        {activity.action}
                      </span>
                      <span className="ethos-profile-activity-timeline-title">
                        {activity.title}
                      </span>
                    </div>
                    <div className="ethos-profile-activity-timeline-meta">
                      <span className="ethos-profile-activity-timeline-time">
                        <FaClock size={12} />
                        {activity.time}
                      </span>
                      <span className="ethos-profile-activity-timeline-reward">
                        <FaCoins size={12} />
                        {activity.reward}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div 
          className="ethos-profile-modal-overlay"
          onClick={handleCancel}
        >
          <div 
            className="ethos-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ethos-profile-modal-close" onClick={handleCancel}>
              <FaTimes size={24} />
            </button>

            <div className="ethos-profile-modal-content">
              <h2 className="ethos-profile-modal-title">Edit Profile</h2>
              <p className="ethos-profile-modal-subtitle">
                Update your profile information
              </p>

              <div className="ethos-profile-modal-form">
                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Display Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-textarea"
                    rows="3"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={profileData.twitter}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={profileData.github}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                  />
                </div>

                <div className="ethos-profile-modal-form-group">
                  <label className="ethos-profile-modal-form-label">Avatar</label>
                  <input
                    type="text"
                    name="avatar"
                    value={profileData.avatar}
                    onChange={handleChange}
                    className="ethos-profile-modal-form-input"
                    placeholder="Choose an emoji"
                  />
                </div>

                <div className="ethos-profile-modal-form-actions">
                  <button className="ethos-profile-modal-form-btn cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="ethos-profile-modal-form-btn submit" onClick={handleSave}>
                    <FaSave size={14} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}