// components/ProfileCard.jsx
"use client";

import {
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiUser,
} from "react-icons/fi";

export default function ProfileCard({ user }) {
  return (
    <div className="account-profile-card">
      <div className="account-profile-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="account-profile-info">
        <h2 className="account-profile-name">{user.name}</h2>
        <p className="account-profile-email">{user.email}</p>
        <p className="account-profile-bio">{user.bio}</p>
        <div className="account-profile-meta">
          <span className="account-profile-location">
            <FiMapPin /> {user.location}
          </span>
          <span className="account-profile-join">
            <FiCalendar /> Joined {user.joinDate}
          </span>
        </div>
        <div className="account-profile-genres">
          {user.favoriteGenres.map((genre, idx) => (
            <span key={idx} className="account-profile-genre-tag">
              {genre}
            </span>
          ))}
        </div>
        <button className="account-profile-edit-btn">
          <FiEdit2 /> Edit Profile
        </button>
      </div>
      <div className="account-profile-stats">
        <div className="account-stat-item">
          <span className="account-stat-value">{user.stats.booksRead}</span>
          <span className="account-stat-label">Books Read</span>
        </div>
        <div className="account-stat-item">
          <span className="account-stat-value">{user.stats.reviews}</span>
          <span className="account-stat-label">Reviews</span>
        </div>
        <div className="account-stat-item">
          <span className="account-stat-value">{user.stats.followers}</span>
          <span className="account-stat-label">Followers</span>
        </div>
        <div className="account-stat-item">
          <span className="account-stat-value">#{user.stats.ranking}</span>
          <span className="account-stat-label">Rank</span>
        </div>
      </div>
    </div>
  );
}