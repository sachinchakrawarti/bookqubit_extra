// components/EthosNFTGallery.jsx
"use client";

import { useState, useMemo } from "react";
import {
  FiImage,
  FiGrid,
  FiList,
  FiSearch,
  FiHeart,
  FiExternalLink,
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiClock,
  FiTag,
  FiDroplet,
  FiTrendingUp,
  FiStar,
  FiShare2,
  FiInfo,
} from "react-icons/fi";
import "./EthosNFTGallery.css";

export default function EthosNFTGallery({ nfts }) {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [likedNFTs, setLikedNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Get unique collections for filter
  const collections = useMemo(() => {
    const collectionSet = new Set(nfts.map(nft => nft.collection));
    return ["all", ...Array.from(collectionSet)];
  }, [nfts]);

  // Filter and sort NFTs
  const filteredNFTs = useMemo(() => {
    let filtered = [...nfts];

    // Filter by collection
    if (filterBy !== "all") {
      filtered = filtered.filter(nft => nft.collection === filterBy);
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(nft =>
        nft.name.toLowerCase().includes(term) ||
        nft.collection.toLowerCase().includes(term)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (b.id || 0) - (a.id || 0);
        case "price_high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "price_low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [nfts, filterBy, searchTerm, sortBy]);

  // Toggle like
  const toggleLike = (id) => {
    setLikedNFTs(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // View NFT details
  const viewDetails = (nft) => {
    setSelectedNFT(nft);
    setShowDetails(true);
  };

  // Close details
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedNFT(null);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Format price
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Get price change
  const getPriceChange = (price) => {
    const changes = {
      "12.5": "+15.2%",
      "8.2": "+8.7%",
      "5.7": "-2.1%",
      "3.4": "+12.3%",
      "6.8": "+5.6%",
      "4.2": "+3.1%",
    };
    return changes[price] || "+0.0%";
  };

  // Get price change color
  const getPriceChangeColor = (price) => {
    const change = getPriceChange(price);
    return change.startsWith('+') ? "#10b981" : "#ef4444";
  };

  return (
    <div className="ethos-nft-gallery">
      {/* Header */}
      <div className="ethos-nft-header">
        <div className="ethos-nft-title-section">
          <FiImage className="ethos-nft-icon" />
          <div>
            <h3 className="ethos-nft-title">NFT Gallery</h3>
            <span className="ethos-nft-subtitle">
              {filteredNFTs.length} of {nfts.length} items
            </span>
          </div>
        </div>

        <div className="ethos-nft-controls">
          {/* Search */}
          <div className="ethos-nft-search-wrapper">
            <FiSearch className="ethos-nft-search-icon" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ethos-nft-search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="ethos-nft-clear-search">
                <FiX />
              </button>
            )}
          </div>

          {/* Filter */}
          <button
            className={`ethos-nft-filter-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            {filterBy !== "all" && (
              <span className="ethos-nft-filter-count">1</span>
            )}
          </button>

          {/* View Toggle */}
          <div className="ethos-nft-view-toggle">
            <button
              className={`ethos-nft-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`ethos-nft-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="ethos-nft-filters">
          <div className="ethos-nft-filter-section">
            <span className="ethos-nft-filter-label">Collection:</span>
            <div className="ethos-nft-filter-options">
              {collections.map((collection) => (
                <button
                  key={collection}
                  className={`ethos-nft-filter-option ${filterBy === collection ? "active" : ""}`}
                  onClick={() => setFilterBy(collection)}
                >
                  {collection === "all" ? "All" : collection}
                </button>
              ))}
            </div>
          </div>

          <div className="ethos-nft-filter-section">
            <span className="ethos-nft-filter-label">Sort by:</span>
            <select
              className="ethos-nft-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="name">Name</option>
            </select>
          </div>

          <button 
            className="ethos-nft-filters-close"
            onClick={() => setShowFilters(false)}
          >
            <FiX /> Close Filters
          </button>
        </div>
      )}

      {/* Stats Bar */}
      <div className="ethos-nft-stats">
        <div className="ethos-nft-stat">
          <FiDroplet className="ethos-nft-stat-icon" />
          <span className="ethos-nft-stat-value">
            {filteredNFTs.reduce((acc, nft) => acc + parseFloat(nft.price), 0).toFixed(1)} ETH
          </span>
          <span className="ethos-nft-stat-label">Total Value</span>
        </div>
        <div className="ethos-nft-stat">
          <FiTrendingUp className="ethos-nft-stat-icon" />
          <span className="ethos-nft-stat-value">{filteredNFTs.length}</span>
          <span className="ethos-nft-stat-label">Items</span>
        </div>
        <div className="ethos-nft-stat">
          <FiHeart className="ethos-nft-stat-icon" />
          <span className="ethos-nft-stat-value">{likedNFTs.length}</span>
          <span className="ethos-nft-stat-label">Liked</span>
        </div>
        <div className="ethos-nft-stat">
          <FiStar className="ethos-nft-stat-icon" />
          <span className="ethos-nft-stat-value">
            {filteredNFTs.length > 0 ? 
              (filteredNFTs.reduce((acc, nft) => acc + parseFloat(nft.price), 0) / filteredNFTs.length).toFixed(2) 
              : "0.00"}
          </span>
          <span className="ethos-nft-stat-label">Avg Price</span>
        </div>
      </div>

      {/* NFT Grid */}
      <div className={`ethos-nft-grid ${viewMode}`}>
        {filteredNFTs.length > 0 ? (
          filteredNFTs.map((nft) => {
            const isLiked = likedNFTs.includes(nft.id);
            const priceChange = getPriceChange(nft.price);
            const isPositive = priceChange.startsWith('+');

            return (
              <div 
                key={nft.id} 
                className={`ethos-nft-item ${viewMode}`}
                onClick={() => viewDetails(nft)}
              >
                <div className="ethos-nft-image-wrapper">
                  <img src={nft.image} alt={nft.name} className="ethos-nft-image" />
                  <div className="ethos-nft-badge">
                    <FiClock />
                    <span>New</span>
                  </div>
                  <div className="ethos-nft-overlay">
                    <button 
                      className="ethos-nft-like-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(nft.id);
                      }}
                    >
                      <FiHeart className={isLiked ? "liked" : ""} />
                    </button>
                    <button 
                      className="ethos-nft-view-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("#", "_blank");
                      }}
                    >
                      <FiExternalLink />
                    </button>
                    <button 
                      className="ethos-nft-share-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(nft.name);
                      }}
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>

                <div className="ethos-nft-info">
                  <div className="ethos-nft-info-header">
                    <h4 className="ethos-nft-name">{nft.name}</h4>
                    <span className="ethos-nft-collection-tag">
                      {nft.collection}
                    </span>
                  </div>
                  
                  <div className="ethos-nft-price-section">
                    <div className="ethos-nft-price">
                      <span className="ethos-nft-price-value">{nft.price} ETH</span>
                      <span 
                        className={`ethos-nft-price-change ${isPositive ? "positive" : "negative"}`}
                        style={{ color: isPositive ? "#10b981" : "#ef4444" }}
                      >
                        {priceChange}
                      </span>
                    </div>
                    <span className="ethos-nft-price-label">Current Price</span>
                  </div>

                  {viewMode === "list" && (
                    <div className="ethos-nft-list-actions">
                      <button className="ethos-nft-list-action">
                        <FiEye /> View
                      </button>
                      <button 
                        className="ethos-nft-list-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(nft.id);
                        }}
                      >
                        <FiHeart className={isLiked ? "liked" : ""} /> 
                        {isLiked ? "Liked" : "Like"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="ethos-nft-empty">
            <FiImage className="ethos-nft-empty-icon" />
            <h4>No NFTs Found</h4>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* NFT Details Modal */}
      {showDetails && selectedNFT && (
        <div className="ethos-nft-modal-overlay" onClick={closeDetails}>
          <div className="ethos-nft-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ethos-nft-modal-close" onClick={closeDetails}>
              <FiX />
            </button>
            
            <div className="ethos-nft-modal-content">
              <div className="ethos-nft-modal-image">
                <img src={selectedNFT.image} alt={selectedNFT.name} />
              </div>
              
              <div className="ethos-nft-modal-info">
                <h2 className="ethos-nft-modal-name">{selectedNFT.name}</h2>
                <p className="ethos-nft-modal-collection">{selectedNFT.collection}</p>
                
                <div className="ethos-nft-modal-price">
                  <span className="ethos-nft-modal-price-value">{selectedNFT.price} ETH</span>
                  <span className="ethos-nft-modal-price-label">Current Price</span>
                </div>

                <div className="ethos-nft-modal-details">
                  <div className="ethos-nft-modal-detail">
                    <FiTag />
                    <span>Collection: {selectedNFT.collection}</span>
                  </div>
                  <div className="ethos-nft-modal-detail">
                    <FiClock />
                    <span>Listed: Recently</span>
                  </div>
                  <div className="ethos-nft-modal-detail">
                    <FiTrendingUp />
                    <span>Volume: 45.2 ETH</span>
                  </div>
                </div>

                <div className="ethos-nft-modal-actions">
                  <button className="ethos-nft-modal-btn primary">
                    Buy Now
                  </button>
                  <button className="ethos-nft-modal-btn secondary">
                    Make Offer
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