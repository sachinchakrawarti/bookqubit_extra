// src/features_ethos/marketplace/marketplace.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import {
  FaStore,
  FaSearch,
  FaFilter,
  FaTimes,
  FaEthereum,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaShoppingCart,
  FaStar,
  FaFire,
  FaClock,
  FaTag,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaChartLine,
  FaThLarge,
  FaThList,
  FaGripLines,
  FaWallet,
  FaExternalLinkAlt,
  FaShareAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import "./marketplace.css";

export default function Marketplace() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });
  const [likedItems, setLikedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Marketplace Data
  const marketplaceItems = [
    {
      id: 1,
      name: "The Quantum Reader",
      collection: "Ethos Library",
      image: "🔮",
      price: 0.45,
      priceUSD: 1234.56,
      edition: "1/100",
      creator: "0x742d...35Cc",
      seller: "0x1a2b...3c4d",
      likes: 234,
      views: 1245,
      rarity: "Legendary",
      category: "Art",
      created: "2 days ago",
      status: "available",
      description: "A mystical journey through quantum realms and ancient wisdom.",
      tags: ["quantum", "wisdom", "mystical"],
    },
    {
      id: 2,
      name: "Web3 Wisdom",
      collection: "Ethos Library",
      image: "📖",
      price: 0.28,
      priceUSD: 768.32,
      edition: "23/250",
      creator: "0x742d...35Cc",
      seller: "0x5e6f...7g8h",
      likes: 189,
      views: 876,
      rarity: "Rare",
      category: "Education",
      created: "5 days ago",
      status: "available",
      description: "Decentralized knowledge for the Web3 generation.",
      tags: ["education", "web3", "knowledge"],
    },
    {
      id: 3,
      name: "Digital Poetry Vol. 1",
      collection: "Ethos Library",
      image: "📝",
      price: 0.12,
      priceUSD: 329.40,
      edition: "47/500",
      creator: "0x742d...35Cc",
      seller: "0x9i0j...1k2l",
      likes: 156,
      views: 623,
      rarity: "Uncommon",
      category: "Literature",
      created: "1 week ago",
      status: "available",
      description: "A collection of digital poetry exploring the intersection of art and technology.",
      tags: ["poetry", "digital", "art"],
    },
    {
      id: 4,
      name: "Ethereum Dreamscape",
      collection: "Crypto Art",
      image: "🌌",
      price: 0.89,
      priceUSD: 2443.66,
      edition: "1/50",
      creator: "0x3m4n...5o6p",
      seller: "0x1a2b...3c4d",
      likes: 412,
      views: 2341,
      rarity: "Legendary",
      category: "Art",
      created: "3 days ago",
      status: "available",
      description: "Surreal landscapes inspired by the blockchain.",
      tags: ["surreal", "blockchain", "art"],
    },
    {
      id: 5,
      name: "BookQubit Genesis",
      collection: "BookQubit",
      image: "📚",
      price: 0.34,
      priceUSD: 933.02,
      edition: "1/1000",
      creator: "0x742d...35Cc",
      seller: "0x5e6f...7g8h",
      likes: 321,
      views: 1567,
      rarity: "Epic",
      category: "Books",
      created: "1 day ago",
      status: "available",
      description: "The first edition of the BookQubit genesis collection.",
      tags: ["books", "genesis", "collection"],
    },
    {
      id: 6,
      name: "Cyberpunk Scholar",
      collection: "Ethos Library",
      image: "🤖",
      price: 0.67,
      priceUSD: 1838.77,
      edition: "5/250",
      creator: "0x742d...35Cc",
      seller: "0x9i0j...1k2l",
      likes: 278,
      views: 1456,
      rarity: "Rare",
      category: "Art",
      created: "6 days ago",
      status: "sold",
      description: "The future of learning in a cyberpunk world.",
      tags: ["cyberpunk", "future", "learning"],
    },
    {
      id: 7,
      name: "Decentralized Dreams",
      collection: "Web3 Art",
      image: "🌐",
      price: 0.56,
      priceUSD: 1536.54,
      edition: "3/75",
      creator: "0x3m4n...5o6p",
      seller: "0x1a2b...3c4d",
      likes: 445,
      views: 2678,
      rarity: "Legendary",
      category: "Art",
      created: "4 days ago",
      status: "available",
      description: "Dreams built on the decentralized web.",
      tags: ["dreams", "web3", "decentralized"],
    },
    {
      id: 8,
      name: "The Infinite Library",
      collection: "Ethos Library",
      image: "🏛️",
      price: 0.92,
      priceUSD: 2525.24,
      edition: "1/50",
      creator: "0x742d...35Cc",
      seller: "0x5e6f...7g8h",
      likes: 567,
      views: 3124,
      rarity: "Legendary",
      category: "Books",
      created: "2 days ago",
      status: "available",
      description: "A never-ending library of knowledge and wonder.",
      tags: ["library", "infinite", "knowledge"],
    },
  ];

  // Categories
  const categories = ["all", "Art", "Books", "Education", "Literature"];

  // Sort options
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "recent", label: "Recently Added" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "likes", label: "Most Liked" },
  ];

  // Filter and sort items
  const filteredItems = marketplaceItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.collection.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
      const matchesStatus = item.status === "available";
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "popular":
          return b.views - a.views;
        case "recent":
          return new Date(b.created) - new Date(a.created);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "likes":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  // Stats
  const stats = {
    total: marketplaceItems.length,
    available: marketplaceItems.filter(item => item.status === "available").length,
    sold: marketplaceItems.filter(item => item.status === "sold").length,
    floorPrice: Math.min(...marketplaceItems.map(item => item.price)),
    volume: marketplaceItems.reduce((sum, item) => sum + item.price, 0),
    volumeUSD: marketplaceItems.reduce((sum, item) => sum + item.priceUSD, 0),
  };

  // Toggle like
  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Add to cart
  const addToCart = (item) => {
    if (!cartItems.find(cartItem => cartItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  // Get rarity color
  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "legendary": return "#f59e0b";
      case "epic": return "#8b5cf6";
      case "rare": return "#3b82f6";
      case "uncommon": return "#10b981";
      default: return "#94a3b8";
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "available": return <span className="marketplace-status-badge available">Available</span>;
      case "sold": return <span className="marketplace-status-badge sold">Sold</span>;
      default: return null;
    }
  };

  // Format price
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Format USD
  const formatUSD = (price) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="ethos-marketplace-page">
      {/* Header */}
      <div className="ethos-marketplace-header">
        <div>
          <h1 className="ethos-marketplace-title">
            <FaStore size={24} className="ethos-marketplace-icon" />
            Marketplace
          </h1>
          <p className="ethos-marketplace-subtitle">
            Discover, buy, and sell digital collectibles
          </p>
        </div>
        <div className="ethos-marketplace-actions">
          <button className="ethos-marketplace-btn primary">
            <FaWallet size={14} />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="ethos-marketplace-stats">
        <div className="ethos-marketplace-stat-item">
          <span className="ethos-marketplace-stat-label">Total Items</span>
          <span className="ethos-marketplace-stat-value">{stats.total}</span>
        </div>
        <div className="ethos-marketplace-stat-item">
          <span className="ethos-marketplace-stat-label">Available</span>
          <span className="ethos-marketplace-stat-value">{stats.available}</span>
        </div>
        <div className="ethos-marketplace-stat-item">
          <span className="ethos-marketplace-stat-label">Floor Price</span>
          <span className="ethos-marketplace-stat-value">{formatPrice(stats.floorPrice)} ETH</span>
        </div>
        <div className="ethos-marketplace-stat-item">
          <span className="ethos-marketplace-stat-label">Volume</span>
          <span className="ethos-marketplace-stat-value">{formatPrice(stats.volume)} ETH</span>
          <span className="ethos-marketplace-stat-sub">{formatUSD(stats.volumeUSD)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="ethos-marketplace-controls">
        <div className="ethos-marketplace-search">
          <FaSearch size={16} className="ethos-marketplace-search-icon" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ethos-marketplace-search-input"
          />
          {searchQuery && (
            <button 
              className="ethos-marketplace-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        <div className="ethos-marketplace-controls-right">
          <button 
            className="ethos-marketplace-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter size={14} />
            Filters
            {showFilters && <FaTimes size={14} />}
          </button>

          <select
            className="ethos-marketplace-sort-select"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="ethos-marketplace-view-toggle">
            <button
              className={`ethos-marketplace-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <FaThLarge size={16} />
            </button>
            <button
              className={`ethos-marketplace-view-btn ${viewMode === "list" ? "active" : ""}`}
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
        <div className="ethos-marketplace-filters-panel">
          <div className="ethos-marketplace-filters-content">
            <div className="ethos-marketplace-filter-group">
              <label className="ethos-marketplace-filter-label">Categories</label>
              <div className="ethos-marketplace-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`ethos-marketplace-category-btn ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="ethos-marketplace-filter-group">
              <label className="ethos-marketplace-filter-label">Price Range (ETH)</label>
              <div className="ethos-marketplace-price-range">
                <div className="ethos-marketplace-price-inputs">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                    className="ethos-marketplace-price-input"
                    placeholder="Min"
                  />
                  <span className="ethos-marketplace-price-separator">to</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 10 })}
                    className="ethos-marketplace-price-input"
                    placeholder="Max"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
                  className="ethos-marketplace-price-slider"
                />
              </div>
            </div>

            <button 
              className="ethos-marketplace-filters-clear"
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange({ min: 0, max: 10 });
                setSelectedSort("popular");
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="ethos-marketplace-results">
        <span className="ethos-marketplace-results-count">
          {filteredItems.length} items found
        </span>
      </div>

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <div className="ethos-marketplace-empty">
          <div className="ethos-marketplace-empty-icon">🔍</div>
          <h3 className="ethos-marketplace-empty-title">No Items Found</h3>
          <p className="ethos-marketplace-empty-text">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className={`ethos-marketplace-${viewMode}`}>
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={`ethos-marketplace-item ${viewMode === "list" ? "list-view" : ""}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="ethos-marketplace-item-image-wrapper">
                <div className="ethos-marketplace-item-image">{item.image}</div>
                <div className="ethos-marketplace-item-overlay">
                  <button 
                    className="ethos-marketplace-item-like"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                  >
                    {likedItems.includes(item.id) ? (
                      <FaHeart size={18} color="#ef4444" />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>
                  <div className="ethos-marketplace-item-actions">
                    <button className="ethos-marketplace-item-action-btn">
                      <FaEye size={14} />
                    </button>
                    <button className="ethos-marketplace-item-action-btn">
                      <FaShareAlt size={14} />
                    </button>
                  </div>
                </div>
                {getStatusBadge(item.status)}
                <div 
                  className="ethos-marketplace-item-rarity"
                  style={{ backgroundColor: getRarityColor(item.rarity) }}
                >
                  {item.rarity}
                </div>
              </div>

              <div className="ethos-marketplace-item-content">
                <div className="ethos-marketplace-item-header">
                  <div>
                    <h3 className="ethos-marketplace-item-name">{item.name}</h3>
                    <p className="ethos-marketplace-item-collection">{item.collection}</p>
                  </div>
                  <div className="ethos-marketplace-item-edition">{item.edition}</div>
                </div>

                <div className="ethos-marketplace-item-stats">
                  <div className="ethos-marketplace-item-stat">
                    <FaHeart size={12} />
                    <span>{likedItems.includes(item.id) ? item.likes + 1 : item.likes}</span>
                  </div>
                  <div className="ethos-marketplace-item-stat">
                    <FaEye size={12} />
                    <span>{item.views}</span>
                  </div>
                  <div className="ethos-marketplace-item-stat">
                    <FaClock size={12} />
                    <span>{item.created}</span>
                  </div>
                </div>

                <div className="ethos-marketplace-item-footer">
                  <div className="ethos-marketplace-item-price">
                    <FaEthereum size={14} />
                    <span>{formatPrice(item.price)} ETH</span>
                    <span className="ethos-marketplace-item-price-usd">{formatUSD(item.priceUSD)}</span>
                  </div>
                  <button 
                    className="ethos-marketplace-item-buy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    <FaShoppingCart size={14} />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div 
          className="ethos-marketplace-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="ethos-marketplace-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-marketplace-modal-close"
              onClick={() => setSelectedItem(null)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-marketplace-modal-content">
              <div className="ethos-marketplace-modal-image-wrapper">
                <div className="ethos-marketplace-modal-image">
                  {selectedItem.image}
                </div>
                <div 
                  className="ethos-marketplace-modal-rarity"
                  style={{ backgroundColor: getRarityColor(selectedItem.rarity) }}
                >
                  {selectedItem.rarity}
                </div>
              </div>

              <div className="ethos-marketplace-modal-info">
                <div className="ethos-marketplace-modal-header">
                  <div>
                    <h2 className="ethos-marketplace-modal-name">{selectedItem.name}</h2>
                    <p className="ethos-marketplace-modal-collection">{selectedItem.collection}</p>
                  </div>
                  {getStatusBadge(selectedItem.status)}
                </div>

                <div className="ethos-marketplace-modal-details">
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Edition</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.edition}</span>
                  </div>
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Category</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.category}</span>
                  </div>
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Created</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.created}</span>
                  </div>
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Creator</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.creator}</span>
                  </div>
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Seller</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.seller}</span>
                  </div>
                  <div className="ethos-marketplace-modal-detail-item">
                    <span className="ethos-marketplace-modal-detail-label">Views</span>
                    <span className="ethos-marketplace-modal-detail-value">{selectedItem.views}</span>
                  </div>
                </div>

                <div className="ethos-marketplace-modal-description">
                  <p>{selectedItem.description}</p>
                </div>

                <div className="ethos-marketplace-modal-tags">
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className="ethos-marketplace-modal-tag">
                      <FaTag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="ethos-marketplace-modal-actions">
                  <div className="ethos-marketplace-modal-price">
                    <span className="ethos-marketplace-modal-price-label">Price</span>
                    <div className="ethos-marketplace-modal-price-amount">
                      <FaEthereum size={20} />
                      <span>{formatPrice(selectedItem.price)} ETH</span>
                      <span className="ethos-marketplace-modal-price-usd">{formatUSD(selectedItem.priceUSD)}</span>
                    </div>
                  </div>
                  <button 
                    className="ethos-marketplace-modal-buy-btn"
                    onClick={() => {
                      addToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                  >
                    <FaShoppingCart size={16} />
                    Buy Now
                  </button>
                </div>

                <div className="ethos-marketplace-modal-social">
                  <button className="ethos-marketplace-modal-social-btn">
                    <FaHeart size={16} />
                    <span>{likedItems.includes(selectedItem.id) ? selectedItem.likes + 1 : selectedItem.likes}</span>
                  </button>
                  <button className="ethos-marketplace-modal-social-btn">
                    <FaShareAlt size={16} />
                    <span>Share</span>
                  </button>
                  <button className="ethos-marketplace-modal-social-btn">
                    <FaExternalLinkAlt size={16} />
                    <span>View on Blockchain</span>
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