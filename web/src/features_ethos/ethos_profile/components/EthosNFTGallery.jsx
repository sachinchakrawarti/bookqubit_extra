// components/EthosNFTGallery.jsx
"use client";

import { useState } from "react";
import { FiImage, FiGrid, FiList, FiSearch, FiHeart, FiExternalLink } from "react-icons/fi";

export default function EthosNFTGallery({ nfts }) {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="ethos-nft-gallery">
      <div className="ethos-nft-header">
        <div className="ethos-nft-title-section">
          <FiImage className="ethos-nft-icon" />
          <h3 className="ethos-nft-title">NFT Gallery</h3>
          <span className="ethos-nft-count">{nfts.length} Items</span>
        </div>

        <div className="ethos-nft-controls">
          <div className="ethos-nft-search">
            <FiSearch />
            <input type="text" placeholder="Search NFTs..." />
          </div>
          <button
            className={`ethos-nft-view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid />
          </button>
          <button
            className={`ethos-nft-view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <FiList />
          </button>
        </div>
      </div>

      <div className={`ethos-nft-grid ${viewMode}`}>
        {nfts.map((nft) => (
          <div key={nft.id} className="ethos-nft-item">
            <div className="ethos-nft-image-wrapper">
              <img src={nft.image} alt={nft.name} className="ethos-nft-image" />
              <div className="ethos-nft-overlay">
                <button className="ethos-nft-like-btn">
                  <FiHeart />
                </button>
                <a href="#" className="ethos-nft-view-link">
                  <FiExternalLink />
                </a>
              </div>
            </div>
            <div className="ethos-nft-info">
              <h4 className="ethos-nft-name">{nft.name}</h4>
              <p className="ethos-nft-collection">{nft.collection}</p>
              <div className="ethos-nft-price">
                <span className="ethos-nft-price-value">{nft.price}</span>
                <span className="ethos-nft-price-label">Current Price</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}