// src/features_ethos/nfts/NFTs.jsx
"use client";

import React, { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { 
  FaImage, 
  FaEthereum, 
  FaHeart, 
  FaRegHeart,
  FaEye,
  FaShareAlt,
  FaExternalLinkAlt,
  FaClock,
  FaTag,
  FaWallet,
  FaLayerGroup,
  FaStar,
  FaFire,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaSearch,
  FaThLarge,
  FaThList,
  FaGripLines,
  FaTimes
} from "react-icons/fa";
import "./NFTs.css";

export default function NFTs() {
  const { theme, themeName } = useTheme();
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // State
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedNFTs, setLikedNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  // NFT Data
  const nfts = [
    {
      id: 1,
      name: "The Quantum Reader",
      collection: "Ethos Library",
      image: "🔮",
      price: "0.45 ETH",
      priceUSD: "$1,234.56",
      edition: "1/100",
      creator: "0x742d...35Cc",
      owner: "0x1a2b...3c4d",
      likes: 234,
      views: 1245,
      rarity: "Legendary",
      category: "Art",
      created: "2 days ago",
      status: "owned",
      description: "A mystical journey through quantum realms and ancient wisdom.",
    },
    {
      id: 2,
      name: "Web3 Wisdom",
      collection: "Ethos Library",
      image: "📖",
      price: "0.28 ETH",
      priceUSD: "$768.32",
      edition: "23/250",
      creator: "0x742d...35Cc",
      owner: "0x5e6f...7g8h",
      likes: 189,
      views: 876,
      rarity: "Rare",
      category: "Education",
      created: "5 days ago",
      status: "owned",
      description: "Decentralized knowledge for the Web3 generation.",
    },
    {
      id: 3,
      name: "Digital Poetry Vol. 1",
      collection: "Ethos Library",
      image: "📝",
      price: "0.12 ETH",
      priceUSD: "$329.40",
      edition: "47/500",
      creator: "0x742d...35Cc",
      owner: "0x9i0j...1k2l",
      likes: 156,
      views: 623,
      rarity: "Uncommon",
      category: "Literature",
      created: "1 week ago",
      status: "owned",
      description: "A collection of digital poetry exploring the intersection of art and technology.",
    },
    {
      id: 4,
      name: "Ethereum Dreamscape",
      collection: "Crypto Art",
      image: "🌌",
      price: "0.89 ETH",
      priceUSD: "$2,443.66",
      edition: "1/50",
      creator: "0x3m4n...5o6p",
      owner: "0x1a2b...3c4d",
      likes: 412,
      views: 2341,
      rarity: "Legendary",
      category: "Art",
      created: "3 days ago",
      status: "listed",
      description: "Surreal landscapes inspired by the blockchain.",
    },
    {
      id: 5,
      name: "BookQubit Genesis",
      collection: "BookQubit",
      image: "📚",
      price: "0.34 ETH",
      priceUSD: "$933.02",
      edition: "1/1000",
      creator: "0x742d...35Cc",
      owner: "0x5e6f...7g8h",
      likes: 321,
      views: 1567,
      rarity: "Epic",
      category: "Books",
      created: "1 day ago",
      status: "owned",
      description: "The first edition of the BookQubit genesis collection.",
    },
    {
      id: 6,
      name: "Cyberpunk Scholar",
      collection: "Ethos Library",
      image: "🤖",
      price: "0.67 ETH",
      priceUSD: "$1,838.77",
      edition: "5/250",
      creator: "0x742d...35Cc",
      owner: "0x9i0j...1k2l",
      likes: 278,
      views: 1456,
      rarity: "Rare",
      category: "Art",
      created: "6 days ago",
      status: "owned",
      description: "The future of learning in a cyberpunk world.",
    },
    {
      id: 7,
      name: "Decentralized Dreams",
      collection: "Web3 Art",
      image: "🌐",
      price: "0.56 ETH",
      priceUSD: "$1,536.54",
      edition: "3/75",
      creator: "0x3m4n...5o6p",
      owner: "0x1a2b...3c4d",
      likes: 445,
      views: 2678,
      rarity: "Legendary",
      category: "Art",
      created: "4 days ago",
      status: "listed",
      description: "Dreams built on the decentralized web.",
    },
    {
      id: 8,
      name: "The Infinite Library",
      collection: "Ethos Library",
      image: "📚",
      price: "0.92 ETH",
      priceUSD: "$2,525.24",
      edition: "1/50",
      creator: "0x742d...35Cc",
      owner: "0x5e6f...7g8h",
      likes: 567,
      views: 3124,
      rarity: "Legendary",
      category: "Books",
      created: "2 days ago",
      status: "owned",
      description: "A never-ending library of knowledge and wonder.",
    },
  ];

  // Categories for filter
  const categories = ["all", "Art", "Books", "Education", "Literature"];

  // Stats
  const stats = {
    total: nfts.length,
    owned: nfts.filter(nft => nft.status === "owned").length,
    listed: nfts.filter(nft => nft.status === "listed").length,
    value: "2.45 ETH",
    valueUSD: "$6,712.50",
  };

  // Filter NFTs
  const filteredNFTs = nfts.filter(nft => {
    const matchesFilter = filter === "all" || nft.category === filter;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.collection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Toggle like
  const toggleLike = (id) => {
    setLikedNFTs(prev => 
      prev.includes(id) ? prev.filter(nftId => nftId !== id) : [...prev, id]
    );
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
      case "owned": return <span className="nft-status-badge owned">Owned</span>;
      case "listed": return <span className="nft-status-badge listed">Listed</span>;
      default: return null;
    }
  };

  return (
    <div className="ethos-nfts-page">
      {/* Header */}
      <div className="ethos-nfts-header">
        <div>
          <h1 className="ethos-nfts-title">
            <FaLayerGroup size={24} className="ethos-nfts-icon" />
            NFTs
          </h1>
          <p className="ethos-nfts-subtitle">
            Explore and manage your digital collectibles
          </p>
        </div>
        <div className="ethos-nfts-actions">
          <button className="ethos-nfts-btn primary">
            <FaWallet size={14} />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="ethos-nfts-stats">
        <div className="ethos-nfts-stat-item">
          <span className="ethos-nfts-stat-label">Total NFTs</span>
          <span className="ethos-nfts-stat-value">{stats.total}</span>
        </div>
        <div className="ethos-nfts-stat-item">
          <span className="ethos-nfts-stat-label">Owned</span>
          <span className="ethos-nfts-stat-value">{stats.owned}</span>
        </div>
        <div className="ethos-nfts-stat-item">
          <span className="ethos-nfts-stat-label">Listed</span>
          <span className="ethos-nfts-stat-value">{stats.listed}</span>
        </div>
        <div className="ethos-nfts-stat-item">
          <span className="ethos-nfts-stat-label">Total Value</span>
          <span className="ethos-nfts-stat-value">{stats.value}</span>
          <span className="ethos-nfts-stat-sub">{stats.valueUSD}</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="ethos-nfts-controls">
        <div className="ethos-nfts-search">
          <FaSearch size={16} className="ethos-nfts-search-icon" />
          <input
            type="text"
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ethos-nfts-search-input"
          />
          {searchQuery && (
            <button 
              className="ethos-nfts-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        <div className="ethos-nfts-controls-right">
          <div className="ethos-nfts-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`ethos-nfts-category-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="ethos-nfts-view-toggle">
            <button
              className={`ethos-nfts-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <FaThLarge size={16} />
            </button>
            <button
              className={`ethos-nfts-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <FaThList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* NFT Grid/List */}
      {filteredNFTs.length === 0 ? (
        <div className="ethos-nfts-empty">
          <div className="ethos-nfts-empty-icon">🎨</div>
          <h3 className="ethos-nfts-empty-title">No NFTs Found</h3>
          <p className="ethos-nfts-empty-text">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className={`ethos-nfts-${viewMode}`}>
          {filteredNFTs.map((nft) => (
            <div 
              key={nft.id} 
              className={`ethos-nft-card ${viewMode === "list" ? "list-view" : ""}`}
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="ethos-nft-card-image-wrapper">
                <div className="ethos-nft-card-image">{nft.image}</div>
                <div className="ethos-nft-card-overlay">
                  <button 
                    className="ethos-nft-card-like"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(nft.id);
                    }}
                  >
                    {likedNFTs.includes(nft.id) ? (
                      <FaHeart size={18} color="#ef4444" />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>
                  <div className="ethos-nft-card-actions">
                    <button className="ethos-nft-card-action-btn">
                      <FaEye size={14} />
                    </button>
                    <button className="ethos-nft-card-action-btn">
                      <FaShareAlt size={14} />
                    </button>
                    <button className="ethos-nft-card-action-btn">
                      <FaExternalLinkAlt size={14} />
                    </button>
                  </div>
                </div>
                {getStatusBadge(nft.status)}
                <div 
                  className="ethos-nft-card-rarity"
                  style={{ backgroundColor: getRarityColor(nft.rarity) }}
                >
                  {nft.rarity}
                </div>
              </div>

              <div className="ethos-nft-card-content">
                <div className="ethos-nft-card-header">
                  <div>
                    <h3 className="ethos-nft-card-name">{nft.name}</h3>
                    <p className="ethos-nft-card-collection">{nft.collection}</p>
                  </div>
                  <div className="ethos-nft-card-edition">{nft.edition}</div>
                </div>

                <div className="ethos-nft-card-stats">
                  <div className="ethos-nft-card-stat">
                    <FaHeart size={12} />
                    <span>{likedNFTs.includes(nft.id) ? nft.likes + 1 : nft.likes}</span>
                  </div>
                  <div className="ethos-nft-card-stat">
                    <FaEye size={12} />
                    <span>{nft.views}</span>
                  </div>
                  <div className="ethos-nft-card-stat">
                    <FaClock size={12} />
                    <span>{nft.created}</span>
                  </div>
                </div>

                <div className="ethos-nft-card-footer">
                  <div className="ethos-nft-card-price">
                    <FaEthereum size={14} />
                    <span>{nft.price}</span>
                    <span className="ethos-nft-card-price-usd">{nft.priceUSD}</span>
                  </div>
                  <div className="ethos-nft-card-creator">
                    <div className="ethos-nft-card-creator-avatar">
                      {nft.creator.slice(0, 2)}
                    </div>
                    <span>{nft.creator}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div 
          className="ethos-nft-modal-overlay"
          onClick={() => setSelectedNFT(null)}
        >
          <div 
            className="ethos-nft-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="ethos-nft-modal-close"
              onClick={() => setSelectedNFT(null)}
            >
              <FaTimes size={24} />
            </button>

            <div className="ethos-nft-modal-content">
              <div className="ethos-nft-modal-image-wrapper">
                <div className="ethos-nft-modal-image">
                  {selectedNFT.image}
                </div>
                <div 
                  className="ethos-nft-modal-rarity"
                  style={{ backgroundColor: getRarityColor(selectedNFT.rarity) }}
                >
                  {selectedNFT.rarity}
                </div>
              </div>

              <div className="ethos-nft-modal-info">
                <div className="ethos-nft-modal-header">
                  <div>
                    <h2 className="ethos-nft-modal-name">{selectedNFT.name}</h2>
                    <p className="ethos-nft-modal-collection">{selectedNFT.collection}</p>
                  </div>
                  {getStatusBadge(selectedNFT.status)}
                </div>

                <div className="ethos-nft-modal-details">
                  <div className="ethos-nft-modal-detail-item">
                    <span className="ethos-nft-modal-detail-label">Edition</span>
                    <span className="ethos-nft-modal-detail-value">{selectedNFT.edition}</span>
                  </div>
                  <div className="ethos-nft-modal-detail-item">
                    <span className="ethos-nft-modal-detail-label">Category</span>
                    <span className="ethos-nft-modal-detail-value">{selectedNFT.category}</span>
                  </div>
                  <div className="ethos-nft-modal-detail-item">
                    <span className="ethos-nft-modal-detail-label">Created</span>
                    <span className="ethos-nft-modal-detail-value">{selectedNFT.created}</span>
                  </div>
                  <div className="ethos-nft-modal-detail-item">
                    <span className="ethos-nft-modal-detail-label">Owner</span>
                    <span className="ethos-nft-modal-detail-value">{selectedNFT.owner}</span>
                  </div>
                  <div className="ethos-nft-modal-detail-item">
                    <span className="ethos-nft-modal-detail-label">Creator</span>
                    <span className="ethos-nft-modal-detail-value">{selectedNFT.creator}</span>
                  </div>
                </div>

                <div className="ethos-nft-modal-description">
                  <p>{selectedNFT.description}</p>
                </div>

                <div className="ethos-nft-modal-actions">
                  <div className="ethos-nft-modal-price">
                    <span className="ethos-nft-modal-price-label">Price</span>
                    <div className="ethos-nft-modal-price-amount">
                      <FaEthereum size={20} />
                      <span>{selectedNFT.price}</span>
                      <span className="ethos-nft-modal-price-usd">{selectedNFT.priceUSD}</span>
                    </div>
                  </div>
                  <button className="ethos-nft-modal-buy-btn">
                    Buy Now
                  </button>
                </div>

                <div className="ethos-nft-modal-social">
                  <button className="ethos-nft-modal-social-btn">
                    <FaHeart size={16} />
                    <span>{likedNFTs.includes(selectedNFT.id) ? selectedNFT.likes + 1 : selectedNFT.likes}</span>
                  </button>
                  <button className="ethos-nft-modal-social-btn">
                    <FaShareAlt size={16} />
                    <span>Share</span>
                  </button>
                  <button className="ethos-nft-modal-social-btn">
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