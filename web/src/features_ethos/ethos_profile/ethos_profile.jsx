// ethos_profile.jsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";

// Import components
import EthosHeader from "./components/EthosHeader";
import EthosTabs from "./components/EthosTabs";
import EthosIdentityCard from "./components/EthosIdentityCard";
import EthosWalletInfo from "./components/EthosWalletInfo";
import EthosReputation from "./components/EthosReputation";
import EthosNFTGallery from "./components/EthosNFTGallery";
import EthosSocialProof from "./components/EthosSocialProof";
import EthosBadges from "./components/EthosBadges";
import EthosActivity from "./components/EthosActivity";

import "./ethos_profile.css";

export default function EthosProfile() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("identity");
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Web3 User Data
  const web3User = {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    ens: "johndoe.eth",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=200",
    bio: "Web3 Builder | DeFi Enthusiast | NFT Collector | Building the future of decentralized identity",
    location: "Metaverse",
    joinDate: "Block 15,234,567",
    walletBalance: "12.5 ETH",
    reputationScore: 892,
    trustScore: 94,
    verificationLevel: "Gold",
    
    stats: {
      tokensHeld: 24,
      nftsOwned: 47,
      daoMemberships: 12,
      proposalsVoted: 156,
      delegations: 34,
      totalValue: "45.2 ETH",
      transactions: 1247,
      gasSaved: "3.8 ETH",
    },

    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      discord: "https://discord.gg/johndoe",
      email: "john@web3.com",
    },

    badges: [
      { id: 1, name: "Early Adopter", icon: "⚡", color: "#8b5cf6", level: "Gold" },
      { id: 2, name: "Governance Participant", icon: "👥", color: "#3b82f6", level: "Silver" },
      { id: 3, name: "DeFi Master", icon: "📈", color: "#f59e0b", level: "Gold" },
      { id: 4, name: "NFT Collector", icon: "🖼️", color: "#ec4899", level: "Platinum" },
      { id: 5, name: "DAO Member", icon: "🔷", color: "#06b6d4", level: "Silver" },
      { id: 6, name: "Zero Knowledge", icon: "🔒", color: "#10b981", level: "Gold" },
    ],

    nfts: [
      { id: 1, name: "CyberPunk #8742", image: "https://picsum.photos/200/200?random=1", price: "12.5 ETH", collection: "CyberPunks" },
      { id: 2, name: "Bored Ape #1245", image: "https://picsum.photos/200/200?random=2", price: "8.2 ETH", collection: "BAYC" },
      { id: 3, name: "Azuki #3421", image: "https://picsum.photos/200/200?random=3", price: "5.7 ETH", collection: "Azuki" },
      { id: 4, name: "Doodles #756", image: "https://picsum.photos/200/200?random=4", price: "3.4 ETH", collection: "Doodles" },
      { id: 5, name: "CloneX #1234", image: "https://picsum.photos/200/200?random=5", price: "6.8 ETH", collection: "CloneX" },
      { id: 6, name: "World of Women #456", image: "https://picsum.photos/200/200?random=6", price: "4.2 ETH", collection: "WoW" },
    ],

    recentActivity: [
      { id: 1, type: "Voted", description: "Voted on Proposal #42 in Uniswap DAO", time: "2 hours ago", hash: "0x1234...5678" },
      { id: 2, type: "Minted", description: "Minted new NFT: 'Cyber Dreams'", time: "5 hours ago", hash: "0x8765...4321" },
      { id: 3, type: "Delegated", description: "Delegated voting power to 0x7a8...b9c", time: "1 day ago", hash: "0x9abc...def0" },
      { id: 4, type: "Swapped", description: "Swapped 5 ETH for 2500 USDC", time: "2 days ago", hash: "0xdef1...2345" },
      { id: 5, type: "Bridged", description: "Bridged assets from Ethereum to Arbitrum", time: "3 days ago", hash: "0x5678...9abc" },
    ],

    credentials: [
      { id: 1, name: "Gitcoin Passport", status: "Verified", date: "2024-01-15" },
      { id: 2, name: "BrightID", status: "Verified", date: "2024-01-20" },
      { id: 3, name: "Proof of Humanity", status: "Verified", date: "2024-02-01" },
      { id: 4, name: "POAP Collection", status: "Verified", date: "2024-02-15" },
    ],

    daos: [
      { id: 1, name: "Uniswap DAO", role: "Delegate", votingPower: "12,500 UNI" },
      { id: 2, name: "Aave DAO", role: "Member", votingPower: "5,000 AAVE" },
      { id: 3, name: "MakerDAO", role: "Voter", votingPower: "3,200 MKR" },
      { id: 4, name: "Compound DAO", role: "Proposer", votingPower: "8,000 COMP" },
    ],
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "identity":
        return (
          <>
            <EthosIdentityCard user={web3User} isVerified={isVerified} />
            <EthosWalletInfo user={web3User} isWalletConnected={isWalletConnected} />
            <EthosSocialProof user={web3User} />
          </>
        );
      case "reputation":
        return (
          <>
            <EthosReputation user={web3User} />
            <EthosBadges badges={web3User.badges} />
          </>
        );
      case "nfts":
        return <EthosNFTGallery nfts={web3User.nfts} />;
      case "activity":
        return <EthosActivity activity={web3User.recentActivity} />;
      default:
        return null;
    }
  };

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`ethos-profile-page ${isDarkMode ? "dark" : ""}`}
    >
      <div className="ethos-container">
        <EthosHeader />
        <EthosTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="ethos-tab-content">{renderContent()}</div>
      </div>
    </div>
  );
}