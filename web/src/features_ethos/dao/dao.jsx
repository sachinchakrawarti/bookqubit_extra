// src/features_ethos/dao/dao.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FaUsers,
  FaVoteYea,
  FaVoteNay,
  FaChartPie,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaPlus,
  FaSearch,
  FaFilter,
  FaTimes,
  FaGavel,
  FaBalanceScale,
  FaUserTie,
  FaCalendarAlt,
  FaFileAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaArrowUp,
  FaArrowDown,
  FaLock,
  FaUnlock,
  FaShieldAlt,
  FaLightbulb,
  FaComments,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaExternalLinkAlt,
  FaWallet,
  FaCoins,
  FaTrophy,
  FaMedal,
  FaFire,
} from "react-icons/fa";
import "./dao.css";

export default function DAO() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [activeTab, setActiveTab] = useState("proposals");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // DAO Data
  const daoStats = {
    totalProposals: 42,
    activeProposals: 5,
    passedProposals: 28,
    failedProposals: 9,
    totalVotes: 15234,
    participationRate: "68.5%",
    treasuryBalance: "1,245.67 ETH",
    treasuryValue: "$3,418,234.56",
    members: 2345,
    quorum: "10%",
    votingPeriod: "7 days",
  };

  // Proposals Data
  const proposals = [
    {
      id: 1,
      title: "Treasury Allocation for BookQubit Development",
      description: "Allocate 500 ETH from the treasury to accelerate BookQubit development, including smart contract upgrades, UI improvements, and community incentives.",
      category: "Treasury",
      status: "active",
      proposer: "0x742d...35Cc",
      created: "2 days ago",
      votingEnds: "5 days remaining",
      votes: {
        for: 782,
        against: 156,
        abstain: 34,
      },
      quorum: "12.5%",
      rewards: "50 ETHOS",
    },
    {
      id: 2,
      title: "Community Grant Program Expansion",
      description: "Expand the community grant program to support more projects in the BookQubit ecosystem. Increase the monthly grant pool from 10 ETH to 25 ETH.",
      category: "Grants",
      status: "active",
      proposer: "0x5e6f...7g8h",
      created: "4 days ago",
      votingEnds: "3 days remaining",
      votes: {
        for: 543,
        against: 89,
        abstain: 23,
      },
      quorum: "8.7%",
      rewards: "25 ETHOS",
    },
    {
      id: 3,
      title: "Governance Protocol Upgrade",
      description: "Proposal to upgrade the governance protocol to v2.0, introducing delegation, quadratic voting, and improved proposal execution.",
      category: "Protocol",
      status: "pending",
      proposer: "0x9i0j...1k2l",
      created: "1 day ago",
      votingEnds: "6 days remaining",
      votes: {
        for: 0,
        against: 0,
        abstain: 0,
      },
      quorum: "0%",
      rewards: "100 ETHOS",
    },
    {
      id: 4,
      title: "Strategic Partnership with Web3 Education",
      description: "Establish a strategic partnership with Web3 Education to integrate BookQubit content into their curriculum and reach 10,000 new students.",
      category: "Partnership",
      status: "active",
      proposer: "0x3m4n...5o6p",
      created: "6 days ago",
      votingEnds: "1 day remaining",
      votes: {
        for: 634,
        against: 234,
        abstain: 56,
      },
      quorum: "11.2%",
      rewards: "75 ETHOS",
    },
    {
      id: 5,
      title: "Community Multi-Sig Wallet Setup",
      description: "Set up a multi-signature wallet for community funds with 5 members required to approve any transaction, increasing security and transparency.",
      category: "Security",
      status: "passed",
      proposer: "0x1a2b...3c4d",
      created: "2 weeks ago",
      votingEnds: "Passed",
      votes: {
        for: 1234,
        against: 67,
        abstain: 45,
      },
      quorum: "15.2%",
      rewards: "50 ETHOS",
    },
    {
      id: 6,
      title: "Tokenomics Model Update",
      description: "Update the tokenomics model to include staking rewards, liquidity incentives, and reduced emission rates to ensure long-term sustainability.",
      category: "Tokenomics",
      status: "failed",
      proposer: "0x5e6f...7g8h",
      created: "3 weeks ago",
      votingEnds: "Failed",
      votes: {
        for: 345,
        against: 789,
        abstain: 67,
      },
      quorum: "8.9%",
      rewards: "30 ETHOS",
    },
    {
      id: 7,
      title: "Ethos Library Expansion Fund",
      description: "Create a dedicated fund for expanding the Ethos Library with new collections, paying authors, and marketing the platform to attract more readers.",
      category: "Treasury",
      status: "active",
      proposer: "0x9i0j...1k2l",
      created: "3 days ago",
      votingEnds: "4 days remaining",
      votes: {
        for: 456,
        against: 123,
        abstain: 32,
      },
      quorum: "9.8%",
      rewards: "40 ETHOS",
    },
    {
      id: 8,
      title: "DAO Constitution Amendment",
      description: "Amend the DAO constitution to include clear guidelines on proposal creation, voting requirements, and dispute resolution mechanisms.",
      category: "Governance",
      status: "passed",
      proposer: "0x3m4n...5o6p",
      created: "1 month ago",
      votingEnds: "Passed",
      votes: {
        for: 1456,
        against: 89,
        abstain: 34,
      },
      quorum: "18.3%",
      rewards: "20 ETHOS",
    },
  ];

  // Categories
  const categories = ["all", "Treasury", "Grants", "Protocol", "Partnership", "Security", "Tokenomics", "Governance"];

  // Filter proposals
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || proposal.category === selectedCategory;
    const matchesStatus = activeTab === "proposals" ? true : proposal.status === activeTab;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#f59e0b";
      case "passed": return "#10b981";
      case "failed": return "#ef4444";
      case "pending": return "#3b82f6";
      default: return "#94a3b8";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <FaClock size={14} />;
      case "passed": return <FaCheckCircle size={14} />;
      case "failed": return <FaTimesCircle size={14} />;
      case "pending": return <FaSpinner size={14} />;
      default: return null;
    }
  };

  // Get vote percentage
  const getVotePercentage = (votes) => {
    const total = votes.for + votes.against + votes.abstain;
    if (total === 0) return 0;
    return (votes.for / total) * 100;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Treasury": return <FaCoins size={14} />;
      case "Grants": return <FaGavel size={14} />;
      case "Protocol": return <FaBalanceScale size={14} />;
      case "Partnership": return <FaUserTie size={14} />;
      case "Security": return <FaShieldAlt size={14} />;
      case "Tokenomics": return <FaChartPie size={14} />;
      case "Governance": return <FaGavel size={14} />;
      default: return <FaFileAlt size={14} />;
    }
  };

  return (
    <div className="ethos-dao-page">
      {/* Header */}
      <div className="ethos-dao-header">
        <div>
          <h1 className="ethos-dao-title">
            <FaUsers size={24} className="ethos-dao-icon" />
            DAO Governance
          </h1>
          <p className="ethos-dao-subtitle">
            Shape the future of BookQubit through decentralized governance
          </p>
        </div>
        <div className="ethos-dao-actions">
          <button className="ethos-dao-btn primary">
            <FaWallet size={14} />
            Connect Wallet
          </button>
          <button 
            className="ethos-dao-btn secondary"
            onClick={() => setShowCreateProposal(true)}
          >
            <FaPlus size={14} />
            New Proposal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="ethos-dao-stats">
        <div className="ethos-dao-stat-item">
          <FaUsers className="ethos-dao-stat-icon" color="#8b5cf6" />
          <div>
            <span className="ethos-dao-stat-label">Members</span>
            <span className="ethos-dao-stat-value">{daoStats.members}</span>
          </div>
        </div>
        <div className="ethos-dao-stat-item">
          <FaFileAlt className="ethos-dao-stat-icon" color="#3b82f6" />
          <div>
            <span className="ethos-dao-stat-label">Total Proposals</span>
            <span className="ethos-dao-stat-value">{daoStats.totalProposals}</span>
          </div>
        </div>
        <div className="ethos-dao-stat-item">
          <FaCheckCircle className="ethos-dao-stat-icon" color="#10b981" />
          <div>
            <span className="ethos-dao-stat-label">Passed</span>
            <span className="ethos-dao-stat-value">{daoStats.passedProposals}</span>
          </div>
        </div>
        <div className="ethos-dao-stat-item">
          <FaCoins className="ethos-dao-stat-icon" color="#f59e0b" />
          <div>
            <span className="ethos-dao-stat-label">Treasury</span>
            <span className="ethos-dao-stat-value">{daoStats.treasuryBalance}</span>
            <span className="ethos-dao-stat-sub">{daoStats.treasuryValue}</span>
          </div>
        </div>
        <div className="ethos-dao-stat-item">
          <FaChartPie className="ethos-dao-stat-icon" color="#ec4899" />
          <div>
            <span className="ethos-dao-stat-label">Participation</span>
            <span className="ethos-dao-stat-value">{daoStats.participationRate}</span>
          </div>
        </div>
        <div className="ethos-dao-stat-item">
          <FaClock className="ethos-dao-stat-icon" color="#f59e0b" />
          <div>
            <span className="ethos-dao-stat-label">Active Proposals</span>
            <span className="ethos-dao-stat-value">{daoStats.activeProposals}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ethos-dao-tabs">
        {["proposals", "active", "passed", "failed"].map((tab) => (
          <button
            key={tab}
            className={`ethos-dao-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "active" && daoStats.activeProposals > 0 && (
              <span className="ethos-dao-tab-badge">{daoStats.activeProposals}</span>
            )}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="ethos-dao-controls">
        <div className="ethos-dao-search">
          <FaSearch size={16} className="ethos-dao-search-icon" />
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ethos-dao-search-input"
          />
          {searchQuery && (
            <button 
              className="ethos-dao-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        <div className="ethos-dao-controls-right">
          <button 
            className="ethos-dao-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter size={14} />
            Filters
          </button>

          <select
            className="ethos-dao-sort-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <div className="ethos-dao-empty">
          <div className="ethos-dao-empty-icon">📋</div>
          <h3 className="ethos-dao-empty-title">No Proposals Found</h3>
          <p className="ethos-dao-empty-text">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="ethos-dao-proposals-list">
          {filteredProposals.map((proposal) => (
            <div 
              key={proposal.id} 
              className="ethos-dao-proposal-card"
              onClick={() => setSelectedProposal(proposal)}
            >
              <div className="ethos-dao-proposal-header">
                <div className="ethos-dao-proposal-title-section">
                  <div className="ethos-dao-proposal-category">
                    {getCategoryIcon(proposal.category)}
                    {proposal.category}
                  </div>
                  <h3 className="ethos-dao-proposal-title">{proposal.title}</h3>
                  <p className="ethos-dao-proposal-description">{proposal.description}</p>
                </div>
                <div className="ethos-dao-proposal-status">
                  <span 
                    className="ethos-dao-proposal-status-badge"
                    style={{ backgroundColor: getStatusColor(proposal.status) }}
                  >
                    {getStatusIcon(proposal.status)}
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="ethos-dao-proposal-meta">
                <div className="ethos-dao-proposal-meta-item">
                  <FaUserTie size={12} />
                  <span>By {proposal.proposer}</span>
                </div>
                <div className="ethos-dao-proposal-meta-item">
                  <FaCalendarAlt size={12} />
                  <span>{proposal.created}</span>
                </div>
                <div className="ethos-dao-proposal-meta-item">
                  <FaClock size={12} />
                  <span>{proposal.votingEnds}</span>
                </div>
                <div className="ethos-dao-proposal-meta-item">
                  <FaTrophy size={12} />
                  <span>Reward: {proposal.rewards}</span>
                </div>
              </div>

              <div className="ethos-dao-proposal-votes">
                <div className="ethos-dao-proposal-vote-bars">
                  <div className="ethos-dao-proposal-vote-bar-wrapper">
                    <div 
                      className="ethos-dao-proposal-vote-bar for"
                      style={{ 
                        width: `${getVotePercentage(proposal.votes)}%`,
                        minWidth: getVotePercentage(proposal.votes) > 0 ? "4px" : "0"
                      }}
                    />
                  </div>
                  <div className="ethos-dao-proposal-vote-stats">
                    <div className="ethos-dao-proposal-vote-stat for">
                      <FaThumbsUp size={12} />
                      <span>{proposal.votes.for} For</span>
                    </div>
                    <div className="ethos-dao-proposal-vote-stat against">
                      <FaThumbsDown size={12} />
                      <span>{proposal.votes.against} Against</span>
                    </div>
                    <div className="ethos-dao-proposal-vote-stat abstain">
                      <FaTimesCircle size={12} />
                      <span>{proposal.votes.abstain} Abstain</span>
                    </div>
                    <div className="ethos-dao-proposal-vote-stat quorum">
                      <FaShieldAlt size={12} />
                      <span>Quorum: {proposal.quorum}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ethos-dao-proposal-footer">
                <button className="ethos-dao-proposal-vote-btn for">
                  <FaThumbsUp size={14} />
                  Vote For
                </button>
                <button className="ethos-dao-proposal-vote-btn against">
                  <FaThumbsDown size={14} />
                  Vote Against
                </button>
                <button className="ethos-dao-proposal-details-btn">
                  <FaExternalLinkAlt size={14} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div 
          className="ethos-dao-modal-overlay"
          onClick={() => setSelectedProposal(null)}
        >
          <div 
            className="ethos-dao-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-dao-modal-close"
              onClick={() => setSelectedProposal(null)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-dao-modal-content">
              <div className="ethos-dao-modal-header">
                <div>
                  <div className="ethos-dao-modal-category">
                    {getCategoryIcon(selectedProposal.category)}
                    {selectedProposal.category}
                  </div>
                  <h2 className="ethos-dao-modal-title">{selectedProposal.title}</h2>
                  <p className="ethos-dao-modal-description">{selectedProposal.description}</p>
                </div>
                <span 
                  className="ethos-dao-proposal-status-badge"
                  style={{ backgroundColor: getStatusColor(selectedProposal.status) }}
                >
                  {getStatusIcon(selectedProposal.status)}
                  {selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1)}
                </span>
              </div>

              <div className="ethos-dao-modal-details">
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Proposer</span>
                  <span className="ethos-dao-modal-detail-value">{selectedProposal.proposer}</span>
                </div>
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Created</span>
                  <span className="ethos-dao-modal-detail-value">{selectedProposal.created}</span>
                </div>
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Voting Ends</span>
                  <span className="ethos-dao-modal-detail-value">{selectedProposal.votingEnds}</span>
                </div>
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Rewards</span>
                  <span className="ethos-dao-modal-detail-value">{selectedProposal.rewards}</span>
                </div>
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Quorum</span>
                  <span className="ethos-dao-modal-detail-value">{selectedProposal.quorum}</span>
                </div>
                <div className="ethos-dao-modal-detail-item">
                  <span className="ethos-dao-modal-detail-label">Total Votes</span>
                  <span className="ethos-dao-modal-detail-value">
                    {selectedProposal.votes.for + selectedProposal.votes.against + selectedProposal.votes.abstain}
                  </span>
                </div>
              </div>

              <div className="ethos-dao-modal-votes-section">
                <h4 className="ethos-dao-modal-votes-title">Vote Breakdown</h4>
                <div className="ethos-dao-modal-votes">
                  <div className="ethos-dao-modal-vote-item for">
                    <div className="ethos-dao-modal-vote-header">
                      <FaThumbsUp size={16} />
                      <span>For</span>
                      <span className="ethos-dao-modal-vote-count">{selectedProposal.votes.for}</span>
                    </div>
                    <div className="ethos-dao-modal-vote-bar-wrapper">
                      <div 
                        className="ethos-dao-modal-vote-bar for"
                        style={{ 
                          width: `${(selectedProposal.votes.for / (selectedProposal.votes.for + selectedProposal.votes.against + selectedProposal.votes.abstain)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="ethos-dao-modal-vote-item against">
                    <div className="ethos-dao-modal-vote-header">
                      <FaThumbsDown size={16} />
                      <span>Against</span>
                      <span className="ethos-dao-modal-vote-count">{selectedProposal.votes.against}</span>
                    </div>
                    <div className="ethos-dao-modal-vote-bar-wrapper">
                      <div 
                        className="ethos-dao-modal-vote-bar against"
                        style={{ 
                          width: `${(selectedProposal.votes.against / (selectedProposal.votes.for + selectedProposal.votes.against + selectedProposal.votes.abstain)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="ethos-dao-modal-vote-item abstain">
                    <div className="ethos-dao-modal-vote-header">
                      <FaTimesCircle size={16} />
                      <span>Abstain</span>
                      <span className="ethos-dao-modal-vote-count">{selectedProposal.votes.abstain}</span>
                    </div>
                    <div className="ethos-dao-modal-vote-bar-wrapper">
                      <div 
                        className="ethos-dao-modal-vote-bar abstain"
                        style={{ 
                          width: `${(selectedProposal.votes.abstain / (selectedProposal.votes.for + selectedProposal.votes.against + selectedProposal.votes.abstain)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="ethos-dao-modal-actions">
                <button className="ethos-dao-modal-vote-btn for">
                  <FaThumbsUp size={16} />
                  Vote For
                </button>
                <button className="ethos-dao-modal-vote-btn against">
                  <FaThumbsDown size={16} />
                  Vote Against
                </button>
                <button className="ethos-dao-modal-share-btn">
                  <FaComments size={16} />
                  Discuss
                </button>
              </div>

              <div className="ethos-dao-modal-social">
                <button className="ethos-dao-modal-social-btn">
                  <FaDiscord size={16} />
                  Discord
                </button>
                <button className="ethos-dao-modal-social-btn">
                  <FaTwitter size={16} />
                  Twitter
                </button>
                <button className="ethos-dao-modal-social-btn">
                  <FaGithub size={16} />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateProposal && (
        <div 
          className="ethos-dao-modal-overlay"
          onClick={() => setShowCreateProposal(false)}
        >
          <div 
            className="ethos-dao-modal create"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-dao-modal-close"
              onClick={() => setShowCreateProposal(false)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-dao-modal-content">
              <h2 className="ethos-dao-modal-title">Create New Proposal</h2>
              <p className="ethos-dao-modal-subtitle">
                Submit a proposal for the community to vote on
              </p>

              <div className="ethos-dao-modal-form">
                <div className="ethos-dao-modal-form-group">
                  <label className="ethos-dao-modal-form-label">Proposal Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter a clear title for your proposal"
                    className="ethos-dao-modal-form-input"
                  />
                </div>

                <div className="ethos-dao-modal-form-group">
                  <label className="ethos-dao-modal-form-label">Category</label>
                  <select className="ethos-dao-modal-form-select">
                    <option>Treasury</option>
                    <option>Grants</option>
                    <option>Protocol</option>
                    <option>Partnership</option>
                    <option>Security</option>
                    <option>Tokenomics</option>
                    <option>Governance</option>
                  </select>
                </div>

                <div className="ethos-dao-modal-form-group">
                  <label className="ethos-dao-modal-form-label">Description</label>
                  <textarea 
                    placeholder="Describe your proposal in detail..."
                    className="ethos-dao-modal-form-textarea"
                    rows="5"
                  />
                </div>

                <div className="ethos-dao-modal-form-group">
                  <label className="ethos-dao-modal-form-label">Reward (ETHOS)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="ethos-dao-modal-form-input"
                  />
                </div>

                <div className="ethos-dao-modal-form-actions">
                  <button 
                    className="ethos-dao-modal-form-btn cancel"
                    onClick={() => setShowCreateProposal(false)}
                  >
                    Cancel
                  </button>
                  <button className="ethos-dao-modal-form-btn submit">
                    <FaPlus size={14} />
                    Submit Proposal
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