// components/EthosHeader.jsx
"use client";

import { FiGlobe, FiShield, FiZap } from "react-icons/fi";

export default function EthosHeader() {
  return (
    <div className="ethos-header">
      <div className="ethos-header-content">
        <div className="ethos-header-left">
          <h1 className="ethos-title">
            <span className="ethos-gradient-text">🌐 Web3</span> Identity
          </h1>
          <p className="ethos-subtitle">
            Decentralized profile • Self-sovereign identity • On-chain reputation
          </p>
        </div>
        <div className="ethos-header-right">
          <div className="ethos-status-badge">
            <FiShield className="ethos-status-icon" />
            <span>Trust Score: 94%</span>
          </div>
          <div className="ethos-network-badge">
            <FiGlobe className="ethos-network-icon" />
            <span>Ethereum Mainnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}