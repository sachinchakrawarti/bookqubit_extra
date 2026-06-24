"use client";

import { useState } from "react";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FiHeart,
  FiBookmark,
  FiShare2,
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiFlag,
  FiMoreHorizontal,
  FiLink,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import "./LibraryActions.css";

export default function LibraryActions({ library, onUpdate }) {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(library?.stats?.likes || 0);
  const [saves, setSaves] = useState(library?.stats?.saves || 0);
  const [members, setMembers] = useState(library?.stats?.members || 0);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    if (onUpdate) onUpdate({ likes: isLiked ? likes - 1 : likes + 1 });
  };

  const handleSave = () => {
    if (isSaved) {
      setSaves(saves - 1);
    } else {
      setSaves(saves + 1);
    }
    setIsSaved(!isSaved);
    if (onUpdate) onUpdate({ saves: isSaved ? saves - 1 : saves + 1 });
  };

  const handleFollow = () => {
    if (isFollowing) {
      setMembers(members - 1);
    } else {
      setMembers(members + 1);
    }
    setIsFollowing(!isFollowing);
    if (onUpdate)
      onUpdate({ members: isFollowing ? members - 1 : members + 1 });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out "${library?.name}" on BookQubit Collective Library! 📚`;

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(library?.name)}&body=${encodeURIComponent(text + "\n\n" + url)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: library?.name, text, url });
        }
    }
    setShowShareMenu(false);
  };

  const actionButtons = [
    {
      id: "like",
      label: td("like") || "Like",
      icon: <FiHeart />,
      count: likes,
      onClick: handleLike,
      active: isLiked,
      activeClass: "liked",
    },
    {
      id: "save",
      label: td("save") || "Save",
      icon: <FiBookmark />,
      count: saves,
      onClick: handleSave,
      active: isSaved,
      activeClass: "saved",
    },
    {
      id: "share",
      label: td("share") || "Share",
      icon: <FiShare2 />,
      count: null,
      onClick: () => setShowShareMenu(!showShareMenu),
      active: showShareMenu,
      activeClass: "shared",
    },
  ];

  return (
    <div className={`library-actions ${isDarkMode ? "dark" : ""}`}>
      <div className="la-left">
        <button
          className={`la-action-btn la-follow-btn ${isFollowing ? "following" : ""}`}
          onClick={handleFollow}
        >
          {isFollowing ? (
            <>
              <FiUserCheck /> {td("following") || "Following"}
            </>
          ) : (
            <>
              <FiUserPlus /> {td("follow") || "Follow"}
            </>
          )}
          <span className="la-count">{members}</span>
        </button>

        {actionButtons.map((btn) => (
          <button
            key={btn.id}
            className={`la-action-btn ${btn.active ? btn.activeClass : ""}`}
            onClick={btn.onClick}
          >
            {btn.icon}
            {btn.label}
            {btn.count !== null && (
              <span className="la-count">{btn.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="la-right">
        <button className="la-action-btn la-more-btn">
          <FiMoreHorizontal />
        </button>
      </div>

      {/* Share Dropdown */}
      {showShareMenu && (
        <div className="la-share-dropdown">
          <div className="la-share-header">
            <span>Share this library</span>
            <button onClick={() => setShowShareMenu(false)}>✕</button>
          </div>
          <div className="la-share-options">
            <button
              onClick={() => handleShare("copy")}
              className="la-share-option"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="la-share-option"
            >
              <FiTwitter /> Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="la-share-option"
            >
              <FiFacebook /> Facebook
            </button>
            <button
              onClick={() => handleShare("email")}
              className="la-share-option"
            >
              <FiMail /> Email
            </button>
            <button
              onClick={() => handleShare("more")}
              className="la-share-option"
            >
              <FiLink /> More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
