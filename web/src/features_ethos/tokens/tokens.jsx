// src/features_ethos/tokens/tokens.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FaCoins,
  FaEthereum,
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaExchangeAlt,
  FaWallet,
  FaDollarSign,
  FaPercent,
  FaCog,
  FaStar,
  FaFire,
  FaClock,
  FaShieldAlt,
  FaLock,
  FaUnlock,
  FaExternalLinkAlt,
  FaCopy,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaSpinner,
  FaInfoCircle,
  FaThLarge,
  FaThList,
  FaGripLines,
} from "react-icons/fa";
import "./tokens.css";

export default function Tokens() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("marketCap");
  const [selectedToken, setSelectedToken] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  // Token Data
  const tokens = [
    {
      id: 1,
      name: "Ethereum",
      symbol: "ETH",
      balance: 2.45,
      balanceUSD: 6721.50,
      price: 2743.47,
      priceChange24h: 2.4,
      priceChange7d: 8.7,
      marketCap: "330,456,789,123",
      volume24h: "15,234,567,890",
      supply: "120,345,678",
      icon: "⟠",
      color: "#627eea",
      category: "Layer 1",
      tokens: [
        { symbol: "WETH", balance: 1.23, value: 3374.47 },
        { symbol: "USDC", balance: 567.89, value: 567.89 },
      ],
      staking: {
        apy: 4.2,
        staked: 1.5,
        rewards: 0.012,
      },
      description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
      website: "https://ethereum.org",
      twitter: "@ethereum",
    },
    {
      id: 2,
      name: "Ethos Token",
      symbol: "ETHOS",
      balance: 1234.56,
      balanceUSD: 1073.47,
      price: 0.87,
      priceChange24h: 12.8,
      priceChange7d: 23.5,
      marketCap: "89,234,567",
      volume24h: "4,567,890",
      supply: "100,000,000",
      icon: "⚓",
      color: "#8b5cf6",
      category: "Governance",
      tokens: [
        { symbol: "xETHOS", balance: 500, value: 435.00 },
        { symbol: "ETHOS-ETH", balance: 200, value: 174.00 },
      ],
      staking: {
        apy: 15.6,
        staked: 750,
        rewards: 4.56,
      },
      description: "ETHOS is the native governance token of the BookQubit ecosystem, enabling voting and participation.",
      website: "https://bookqubit.com",
      twitter: "@bookqubit",
    },
    {
      id: 3,
      name: "USDC",
      symbol: "USDC",
      balance: 567.89,
      balanceUSD: 567.89,
      price: 1.00,
      priceChange24h: 0.01,
      priceChange7d: 0.03,
      marketCap: "25,678,901,234",
      volume24h: "5,678,901,234",
      supply: "25,678,901,234",
      icon: "💵",
      color: "#2775ca",
      category: "Stablecoin",
      tokens: [],
      staking: null,
      description: "USDC is a fully collateralized US dollar stablecoin, issued by regulated financial institutions.",
      website: "https://centre.io",
      twitter: "@centre_io",
    },
    {
      id: 4,
      name: "BookQubit",
      symbol: "BQBT",
      balance: 345.67,
      balanceUSD: 456.28,
      price: 1.32,
      priceChange24h: -3.2,
      priceChange7d: 5.6,
      marketCap: "12,345,678",
      volume24h: "1,234,567",
      supply: "10,000,000",
      icon: "📚",
      color: "#f59e0b",
      category: "Utility",
      tokens: [],
      staking: {
        apy: 8.4,
        staked: 200,
        rewards: 0.89,
      },
      description: "BookQubit is the utility token for accessing premium content and features on the platform.",
      website: "https://bookqubit.com",
      twitter: "@bookqubit",
    },
    {
      id: 5,
      name: "Dai",
      symbol: "DAI",
      balance: 100.00,
      balanceUSD: 100.00,
      price: 1.00,
      priceChange24h: 0.02,
      priceChange7d: 0.05,
      marketCap: "5,678,901,234",
      volume24h: "456,789,012",
      supply: "5,678,901,234",
      icon: "🏦",
      color: "#f5ac37",
      category: "Stablecoin",
      tokens: [],
      staking: null,
      description: "DAI is a decentralized stablecoin pegged to the US dollar, backed by collateral on the Maker Protocol.",
      website: "https://makerdao.com",
      twitter: "@MakerDAO",
    },
    {
      id: 6,
      name: "Polygon",
      symbol: "MATIC",
      balance: 200.00,
      balanceUSD: 154.00,
      price: 0.77,
      priceChange24h: 1.8,
      priceChange7d: 4.2,
      marketCap: "7,890,123,456",
      volume24h: "678,901,234",
      supply: "9,234,567,890",
      icon: "🔷",
      color: "#8247e5",
      category: "Layer 2",
      tokens: [],
      staking: {
        apy: 6.2,
        staked: 100,
        rewards: 0.34,
      },
      description: "Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks.",
      website: "https://polygon.technology",
      twitter: "@0xPolygon",
    },
  ];

  // Categories
  const categories = ["all", "Layer 1", "Layer 2", "Governance", "Utility", "Stablecoin"];

  // Sort options
  const sortOptions = [
    { value: "marketCap", label: "Market Cap" },
    { value: "price", label: "Price" },
    { value: "change24h", label: "24h Change" },
    { value: "balance", label: "Your Balance" },
    { value: "name", label: "Name" },
  ];

  // Filter and sort tokens
  const filteredTokens = tokens
    .filter(token => {
      const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || token.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "marketCap":
          return parseFloat(b.marketCap.replace(/,/g, '')) - parseFloat(a.marketCap.replace(/,/g, ''));
        case "price":
          return b.price - a.price;
        case "change24h":
          return b.priceChange24h - a.priceChange24h;
        case "balance":
          return b.balanceUSD - a.balanceUSD;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Stats
  const stats = {
    totalValue: tokens.reduce((sum, token) => sum + token.balanceUSD, 0),
    totalTokens: tokens.length,
    stakedValue: tokens.reduce((sum, token) => {
      if (token.staking) return sum + (token.staking.staked * token.price);
      return sum;
    }, 0),
    totalRewards: tokens.reduce((sum, token) => {
      if (token.staking) return sum + (token.staking.rewards * token.price);
      return sum;
    }, 0),
  };

  // Format price
  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  // Format number
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  // Format large number with commas
  const formatLargeNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="ethos-tokens-page">
      {/* Header */}
      <div className="ethos-tokens-header">
        <div>
          <h1 className="ethos-tokens-title">
            <FaCoins size={24} className="ethos-tokens-icon" />
            Tokens
          </h1>
          <p className="ethos-tokens-subtitle">
            Manage and track your digital assets
          </p>
        </div>
        <div className="ethos-tokens-actions">
          <button className="ethos-tokens-btn primary">
            <FaWallet size={14} />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="ethos-tokens-stats">
        <div className="ethos-tokens-stat-item">
          <span className="ethos-tokens-stat-label">Total Portfolio</span>
          <span className="ethos-tokens-stat-value">${formatLargeNumber(Math.round(stats.totalValue))}</span>
        </div>
        <div className="ethos-tokens-stat-item">
          <span className="ethos-tokens-stat-label">Tokens</span>
          <span className="ethos-tokens-stat-value">{stats.totalTokens}</span>
        </div>
        <div className="ethos-tokens-stat-item">
          <span className="ethos-tokens-stat-label">Staked Value</span>
          <span className="ethos-tokens-stat-value">${formatLargeNumber(Math.round(stats.stakedValue))}</span>
        </div>
        <div className="ethos-tokens-stat-item">
          <span className="ethos-tokens-stat-label">Rewards</span>
          <span className="ethos-tokens-stat-value">${formatLargeNumber(Math.round(stats.totalRewards))}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="ethos-tokens-controls">
        <div className="ethos-tokens-search">
          <FaSearch size={16} className="ethos-tokens-search-icon" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ethos-tokens-search-input"
          />
          {searchQuery && (
            <button 
              className="ethos-tokens-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        <div className="ethos-tokens-controls-right">
          <button 
            className="ethos-tokens-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter size={14} />
            Filters
          </button>

          <select
            className="ethos-tokens-sort-select"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="ethos-tokens-view-toggle">
            <button
              className={`ethos-tokens-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <FaThLarge size={16} />
            </button>
            <button
              className={`ethos-tokens-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <FaThList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="ethos-tokens-filters-panel">
          <div className="ethos-tokens-filters-content">
            <div className="ethos-tokens-filter-group">
              <label className="ethos-tokens-filter-label">Categories</label>
              <div className="ethos-tokens-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`ethos-tokens-category-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="ethos-tokens-filters-clear"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSort("marketCap");
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="ethos-tokens-results">
        <span className="ethos-tokens-results-count">
          {filteredTokens.length} tokens found
        </span>
      </div>

      {/* Tokens Grid/List */}
      {filteredTokens.length === 0 ? (
        <div className="ethos-tokens-empty">
          <div className="ethos-tokens-empty-icon">🪙</div>
          <h3 className="ethos-tokens-empty-title">No Tokens Found</h3>
          <p className="ethos-tokens-empty-text">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className={`ethos-tokens-${viewMode}`}>
          {filteredTokens.map((token) => (
            <div 
              key={token.id} 
              className={`ethos-tokens-card ${viewMode === "list" ? "list-view" : ""}`}
              onClick={() => setSelectedToken(token)}
            >
              <div className="ethos-tokens-card-header">
                <div className="ethos-tokens-card-icon-wrapper">
                  <div 
                    className="ethos-tokens-card-icon"
                    style={{ backgroundColor: token.color }}
                  >
                    {token.icon}
                  </div>
                </div>
                <div className="ethos-tokens-card-info">
                  <div className="ethos-tokens-card-name-row">
                    <h3 className="ethos-tokens-card-name">{token.name}</h3>
                    <span className="ethos-tokens-card-symbol">{token.symbol}</span>
                  </div>
                  <div className="ethos-tokens-card-price-row">
                    <span className="ethos-tokens-card-price">{formatPrice(token.price)}</span>
                    <span 
                      className={`ethos-tokens-card-change ${token.priceChange24h >= 0 ? "positive" : "negative"}`}
                    >
                      {token.priceChange24h >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                      {Math.abs(token.priceChange24h)}%
                    </span>
                  </div>
                </div>
                <div className="ethos-tokens-card-balance">
                  <div className="ethos-tokens-card-balance-amount">
                    {token.balance} {token.symbol}
                  </div>
                  <div className="ethos-tokens-card-balance-usd">
                    ${formatLargeNumber(Math.round(token.balanceUSD))}
                  </div>
                </div>
              </div>

              <div className="ethos-tokens-card-details">
                <div className="ethos-tokens-card-detail">
                  <span className="ethos-tokens-card-detail-label">Market Cap</span>
                  <span className="ethos-tokens-card-detail-value">${formatLargeNumber(token.marketCap)}</span>
                </div>
                <div className="ethos-tokens-card-detail">
                  <span className="ethos-tokens-card-detail-label">24h Volume</span>
                  <span className="ethos-tokens-card-detail-value">${formatLargeNumber(token.volume24h)}</span>
                </div>
                <div className="ethos-tokens-card-detail">
                  <span className="ethos-tokens-card-detail-label">Supply</span>
                  <span className="ethos-tokens-card-detail-value">{formatLargeNumber(token.supply)}</span>
                </div>
                <div className="ethos-tokens-card-detail">
                  <span className="ethos-tokens-card-detail-label">Category</span>
                  <span className="ethos-tokens-card-detail-value">{token.category}</span>
                </div>
              </div>

              {token.staking && (
                <div className="ethos-tokens-card-staking">
                  <div className="ethos-tokens-card-staking-item">
                    <span className="ethos-tokens-card-staking-label">APY</span>
                    <span className="ethos-tokens-card-staking-value">{token.staking.apy}%</span>
                  </div>
                  <div className="ethos-tokens-card-staking-item">
                    <span className="ethos-tokens-card-staking-label">Staked</span>
                    <span className="ethos-tokens-card-staking-value">{token.staking.staked} {token.symbol}</span>
                  </div>
                  <div className="ethos-tokens-card-staking-item">
                    <span className="ethos-tokens-card-staking-label">Rewards</span>
                    <span className="ethos-tokens-card-staking-value">{token.staking.rewards} {token.symbol}</span>
                  </div>
                </div>
              )}

              <div className="ethos-tokens-card-actions">
                <button 
                  className="ethos-tokens-card-btn buy"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedToken(token);
                    setShowBuyModal(true);
                  }}
                >
                  <FaPlus size={12} />
                  Buy
                </button>
                <button 
                  className="ethos-tokens-card-btn sell"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedToken(token);
                    setShowSellModal(true);
                  }}
                >
                  <FaMinus size={12} />
                  Sell
                </button>
                {token.staking && (
                  <button className="ethos-tokens-card-btn stake">
                    <FaLock size={12} />
                    Stake
                  </button>
                )}
                <button className="ethos-tokens-card-btn details">
                  <FaChartLine size={12} />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Token Detail Modal */}
      {selectedToken && !showBuyModal && !showSellModal && (
        <div 
          className="ethos-tokens-modal-overlay"
          onClick={() => setSelectedToken(null)}
        >
          <div 
            className="ethos-tokens-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-tokens-modal-close"
              onClick={() => setSelectedToken(null)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-tokens-modal-content">
              <div className="ethos-tokens-modal-header">
                <div className="ethos-tokens-modal-icon-wrapper">
                  <div 
                    className="ethos-tokens-modal-icon"
                    style={{ backgroundColor: selectedToken.color }}
                  >
                    {selectedToken.icon}
                  </div>
                </div>
                <div className="ethos-tokens-modal-info">
                  <h2 className="ethos-tokens-modal-name">{selectedToken.name}</h2>
                  <p className="ethos-tokens-modal-symbol">{selectedToken.symbol}</p>
                  <div className="ethos-tokens-modal-price-row">
                    <span className="ethos-tokens-modal-price">{formatPrice(selectedToken.price)}</span>
                    <span 
                      className={`ethos-tokens-modal-change ${selectedToken.priceChange24h >= 0 ? "positive" : "negative"}`}
                    >
                      {selectedToken.priceChange24h >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                      {Math.abs(selectedToken.priceChange24h)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="ethos-tokens-modal-description">
                <p>{selectedToken.description}</p>
              </div>

              <div className="ethos-tokens-modal-details">
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">Market Cap</span>
                  <span className="ethos-tokens-modal-detail-value">${formatLargeNumber(selectedToken.marketCap)}</span>
                </div>
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">24h Volume</span>
                  <span className="ethos-tokens-modal-detail-value">${formatLargeNumber(selectedToken.volume24h)}</span>
                </div>
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">Supply</span>
                  <span className="ethos-tokens-modal-detail-value">{formatLargeNumber(selectedToken.supply)}</span>
                </div>
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">Category</span>
                  <span className="ethos-tokens-modal-detail-value">{selectedToken.category}</span>
                </div>
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">Balance</span>
                  <span className="ethos-tokens-modal-detail-value">{selectedToken.balance} {selectedToken.symbol}</span>
                </div>
                <div className="ethos-tokens-modal-detail-item">
                  <span className="ethos-tokens-modal-detail-label">Value</span>
                  <span className="ethos-tokens-modal-detail-value">${formatLargeNumber(Math.round(selectedToken.balanceUSD))}</span>
                </div>
              </div>

              {selectedToken.staking && (
                <div className="ethos-tokens-modal-staking">
                  <h4 className="ethos-tokens-modal-staking-title">Staking</h4>
                  <div className="ethos-tokens-modal-staking-details">
                    <div className="ethos-tokens-modal-staking-item">
                      <span className="ethos-tokens-modal-staking-label">APY</span>
                      <span className="ethos-tokens-modal-staking-value">{selectedToken.staking.apy}%</span>
                    </div>
                    <div className="ethos-tokens-modal-staking-item">
                      <span className="ethos-tokens-modal-staking-label">Staked</span>
                      <span className="ethos-tokens-modal-staking-value">{selectedToken.staking.staked} {selectedToken.symbol}</span>
                    </div>
                    <div className="ethos-tokens-modal-staking-item">
                      <span className="ethos-tokens-modal-staking-label">Rewards</span>
                      <span className="ethos-tokens-modal-staking-value">{selectedToken.staking.rewards} {selectedToken.symbol}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedToken.tokens.length > 0 && (
                <div className="ethos-tokens-modal-tokens">
                  <h4 className="ethos-tokens-modal-tokens-title">Held Tokens</h4>
                  <div className="ethos-tokens-modal-tokens-list">
                    {selectedToken.tokens.map((t, index) => (
                      <div key={index} className="ethos-tokens-modal-token-item">
                        <span className="ethos-tokens-modal-token-symbol">{t.symbol}</span>
                        <span className="ethos-tokens-modal-token-balance">{t.balance}</span>
                        <span className="ethos-tokens-modal-token-value">${formatLargeNumber(Math.round(t.value))}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="ethos-tokens-modal-actions">
                <button className="ethos-tokens-modal-action-btn buy">
                  <FaPlus size={14} />
                  Buy
                </button>
                <button className="ethos-tokens-modal-action-btn sell">
                  <FaMinus size={14} />
                  Sell
                </button>
                {selectedToken.staking && (
                  <button className="ethos-tokens-modal-action-btn stake">
                    <FaLock size={14} />
                    Stake
                  </button>
                )}
              </div>

              <div className="ethos-tokens-modal-links">
                <a href={selectedToken.website} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt size={14} />
                  Website
                </a>
                <a href={`https://twitter.com/${selectedToken.twitter}`} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt size={14} />
                  Twitter
                </a>
                <button>
                  <FaCopy size={14} />
                  Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Modal */}
      {showBuyModal && selectedToken && (
        <div 
          className="ethos-tokens-modal-overlay"
          onClick={() => setShowBuyModal(false)}
        >
          <div 
            className="ethos-tokens-modal small"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-tokens-modal-close"
              onClick={() => setShowBuyModal(false)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-tokens-modal-content">
              <h2 className="ethos-tokens-modal-title">Buy {selectedToken.symbol}</h2>
              <p className="ethos-tokens-modal-subtitle">
                Enter the amount you want to buy
              </p>

              <div className="ethos-tokens-modal-form">
                <div className="ethos-tokens-modal-form-group">
                  <label className="ethos-tokens-modal-form-label">Amount (ETH)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="ethos-tokens-modal-form-input"
                  />
                </div>

                <div className="ethos-tokens-modal-form-group">
                  <label className="ethos-tokens-modal-form-label">You will receive</label>
                  <div className="ethos-tokens-modal-form-result">
                    <span className="ethos-tokens-modal-form-result-amount">0.00 {selectedToken.symbol}</span>
                    <span className="ethos-tokens-modal-form-result-price">≈ $0.00</span>
                  </div>
                </div>

                <div className="ethos-tokens-modal-form-actions">
                  <button 
                    className="ethos-tokens-modal-form-btn cancel"
                    onClick={() => setShowBuyModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="ethos-tokens-modal-form-btn submit">
                    <FaPlus size={14} />
                    Buy {selectedToken.symbol}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedToken && (
        <div 
          className="ethos-tokens-modal-overlay"
          onClick={() => setShowSellModal(false)}
        >
          <div 
            className="ethos-tokens-modal small"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-tokens-modal-close"
              onClick={() => setShowSellModal(false)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-tokens-modal-content">
              <h2 className="ethos-tokens-modal-title">Sell {selectedToken.symbol}</h2>
              <p className="ethos-tokens-modal-subtitle">
                Enter the amount you want to sell
              </p>

              <div className="ethos-tokens-modal-form">
                <div className="ethos-tokens-modal-form-group">
                  <label className="ethos-tokens-modal-form-label">Amount ({selectedToken.symbol})</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="ethos-tokens-modal-form-input"
                  />
                </div>

                <div className="ethos-tokens-modal-form-group">
                  <label className="ethos-tokens-modal-form-label">You will receive</label>
                  <div className="ethos-tokens-modal-form-result">
                    <span className="ethos-tokens-modal-form-result-amount">0.00 ETH</span>
                    <span className="ethos-tokens-modal-form-result-price">≈ $0.00</span>
                  </div>
                </div>

                <div className="ethos-tokens-modal-form-actions">
                  <button 
                    className="ethos-tokens-modal-form-btn cancel"
                    onClick={() => setShowSellModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="ethos-tokens-modal-form-btn submit sell">
                    <FaMinus size={14} />
                    Sell {selectedToken.symbol}
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