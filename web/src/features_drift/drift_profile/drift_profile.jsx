// src/features_drift/drift_profile/drift_profile.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  FaUser, 
  FaEdit, 
  FaCamera, 
  FaBook, 
  FaUsers, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendar,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLink,
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaCog,
  FaBell,
  FaMoon,
  FaSun,
  FaLock,
  FaCheckCircle,
  FaClock,
  FaCertificate,
  FaAward,
  FaStar,
  FaFire,
  FaChartLine,
  FaUserPlus,
  FaUserCheck,
  FaUserMinus,
  FaEllipsisH,  // ← Changed from FaMoreHorizontal
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import "./drift_profile.css";

// Mock hooks if contexts don't exist yet
const useTheme = () => {
  return { 
    theme: { 
      background: { section: 'bg-white' },
      textColors: { primary: 'text-gray-900', secondary: 'text-gray-600' },
      border: { default: 'border-gray-200' }
    }, 
    themeName: 'light' 
  };
};

const useFont = () => {
  return { currentFont: { family: 'Arial' } };
};

const useRTL = () => {
  return { direction: 'ltr' };
};

const useLanguage = () => {
  return { 
    td: (key) => {
      const translations = {
        'home': 'Home',
        'explore': 'Explore',
        'myBooks': 'My Books',
        'community': 'Community',
        'messages': 'Messages',
        'notifications': 'Notifications',
        'drift_profile': 'Profile',
        'appName': 'Drift',
        'appSubtitle': 'Your Reading Journey',
        'searchPlaceholder': 'Search...',
        'mobileSearchPlaceholder': 'Search...',
        'collapseTooltip': 'Collapse',
        'expandTooltip': 'Expand'
      };
      return translations[key] || key;
    }
  };
};

export default function DriftProfile({ userId, isOwnProfile = false }) {
  const { theme, themeName } = useTheme();
  const { currentFont } = useFont();
  const { direction } = useRTL();
  const { td } = useLanguage();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  
  const moreOptionsRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Determine dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';
  
  // Theme-aware styles
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const primaryText = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const inputBg = isDarkMode ? "bg-gray-700" : "bg-gray-100";
  
  const fontStyle = currentFont?.family ? { fontFamily: currentFont.family } : {};

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProfile = {
        id: userId || "1",
        username: "drift_reader",
        displayName: "Drift Reader",
        bio: "📚 Book enthusiast | 🌍 World traveler | 💭 Dreamer",
        location: "New York, USA",
        website: "https://driftreader.com",
        joinedDate: "January 2023",
        avatar: "https://via.placeholder.com/150",
        coverImage: "https://via.placeholder.com/1200x300",
        email: "reader@drift.com",
        socialLinks: {
          twitter: "@drift_reader",
          instagram: "@drift_reader",
          github: "drift-reader"
        },
        stats: {
          posts: 127,
          followers: 342,
          following: 189,
          booksRead: 56,
          achievements: 23,
          readingStreak: 45
        },
        recentActivity: [
          { type: "post", content: "Just finished reading 'The Alchemist' - what a journey! ✨", date: "2 hours ago" },
          { type: "book", book: "Dune", author: "Frank Herbert", date: "1 day ago" },
          { type: "achievement", title: "Bookworm Level 5", date: "3 days ago" }
        ],
        posts: [
          { id: 1, content: "Just finished reading 'The Alchemist' - what a journey! ✨", likes: 42, comments: 12, date: "2 hours ago" },
          { id: 2, content: "Starting my annual re-read of 'The Lord of the Rings' trilogy 📖", likes: 38, comments: 8, date: "1 day ago" },
          { id: 3, content: "Book recommendation: 'Sapiens' by Yuval Noah Harari - mind-blowing perspective on human history 🧠", likes: 56, comments: 15, date: "3 days ago" }
        ],
        books: [
          { id: 1, title: "The Alchemist", author: "Paulo Coelho", rating: 5, status: "completed", cover: "📚" },
          { id: 2, title: "Dune", author: "Frank Herbert", rating: 4, status: "reading", cover: "📖" },
          { id: 3, title: "Sapiens", author: "Yuval Noah Harari", rating: 5, status: "completed", cover: "🧠" },
          { id: 4, title: "1984", author: "George Orwell", rating: 4, status: "want-to-read", cover: "📕" }
        ],
        achievements: [
          { title: "Bookworm Level 5", description: "Read 50 books", icon: "📚", earned: true },
          { title: "Speed Reader", description: "Read 10 books in a month", icon: "⚡", earned: true },
          { title: "Diverse Reader", description: "Read books from 10 different genres", icon: "🌍", earned: false },
          { title: "Review Master", description: "Write 25 book reviews", icon: "✍️", earned: true }
        ],
        isVerified: true,
        isPremium: true,
        readingStreak: 45
      };
      
      setProfile(mockProfile);
      setFollowersCount(mockProfile.stats.followers);
      setLoading(false);
    };
    
    fetchProfile();
  }, [userId]);

  // Close more options dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading image:", file);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile?.displayName}'s Profile`,
        text: `Check out ${profile?.displayName}'s profile on Drift!`,
        url: window.location.href,
      });
    }
  };

  const handleReportUser = () => {
    setShowMoreOptions(false);
  };

  const handleBlockUser = () => {
    setShowMoreOptions(false);
  };

  if (loading) {
    return (
      <div className={`drift-profile ${bgColor} ${direction === 'rtl' ? 'rtl' : ''}`} style={fontStyle}>
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p className={secondaryText}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`drift-profile ${bgColor}`} style={fontStyle}>
        <div className="profile-error">
          <h2 className={primaryText}>Profile Not Found</h2>
          <p className={secondaryText}>The user profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`drift-profile ${bgColor} ${direction === 'rtl' ? 'rtl' : ''}`} 
      style={fontStyle}
      dir={direction}
    >
      {/* Cover Image */}
      <div className="profile-cover-container">
        <div className="profile-cover">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="cover-image"
            onLoad={() => setImageLoading(prev => ({...prev, cover: false}))}
          />
          <div className="cover-gradient"></div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="profile-header-wrapper">
        <div className="profile-container">
          <div className="profile-header">
            {/* Avatar Section */}
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <img 
                  src={profile.avatar} 
                  alt={profile.displayName} 
                  className="profile-avatar"
                />
                {isOwnProfile && (
                  <button 
                    className={`avatar-upload-btn ${inputBg} ${primaryText}`}
                    onClick={handleProfileImageUpload}
                  >
                    <FaCamera size={14} />
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }}
                />
                {profile.isVerified && (
                  <span className="verified-badge">
                    <FaCheckCircle size={20} color="#1DA1F2" />
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <div className="profile-name-section">
                <h1 className={`profile-name ${primaryText}`}>
                  {profile.displayName}
                  {profile.isPremium && (
                    <span className="premium-badge">
                      <FaStar size={16} color="#FFD700" />
                    </span>
                  )}
                </h1>
                <p className={`profile-username ${secondaryText}`}>
                  @{profile.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="profile-actions">
                {isOwnProfile ? (
                  <>
                    <button 
                      className={`action-btn edit-btn ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={handleEditProfile}
                    >
                      <FaEdit size={14} />
                      <span>Edit Profile</span>
                    </button>
                    <button className={`action-btn settings-btn ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <FaCog size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className={`action-btn ${isFollowing ? 'following-btn' : 'follow-btn'}`}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? <FaUserCheck size={14} /> : <FaUserPlus size={14} />}
                      <span>{isFollowing ? 'Following' : 'Follow'}</span>
                    </button>
                    <button className={`action-btn message-btn ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <FaEnvelope size={14} />
                    </button>
                    <div className="more-options-wrapper" ref={moreOptionsRef}>
                      <button 
                        className={`action-btn more-btn ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                      >
                        <FaEllipsisH size={14} />  {/* ← Changed from FaMoreHorizontal */}
                      </button>
                      {showMoreOptions && (
                        <div className={`more-options-dropdown ${cardBg} ${borderColor}`}>
                          <button onClick={handleShareProfile} className={`dropdown-item ${hoverBg}`}>
                            <FaShare size={14} />
                            <span>Share Profile</span>
                          </button>
                          <button onClick={handleReportUser} className={`dropdown-item ${hoverBg}`}>
                            <FaLock size={14} />
                            <span>Report User</span>
                          </button>
                          <button onClick={handleBlockUser} className={`dropdown-item ${hoverBg}`}>
                            <FaUserMinus size={14} />
                            <span>Block User</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bio and Details */}
          <div className="profile-details">
            <p className={`profile-bio ${primaryText}`}>{profile.bio}</p>
            <div className="profile-meta">
              {profile.location && (
                <span className={`meta-item ${secondaryText}`}>
                  <FaMapMarkerAlt size={14} />
                  <span>{profile.location}</span>
                </span>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className={`meta-item ${secondaryText}`}>
                  <FaGlobe size={14} />
                  <span>{profile.website}</span>
                </a>
              )}
              <span className={`meta-item ${secondaryText}`}>
                <FaCalendar size={14} />
                <span>Joined {profile.joinedDate}</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="social-links">
              {profile.socialLinks?.twitter && (
                <a href={`https://twitter.com/${profile.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTwitter size={18} color="#1DA1F2" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a href={`https://instagram.com/${profile.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram size={18} color="#E4405F" />
                </a>
              )}
              {profile.socialLinks?.github && (
                <a href={`https://github.com/${profile.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub size={18} className={primaryText} />
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className={`profile-stats ${borderColor}`}>
            <div className={`stat-item ${secondaryText}`}>
              <span className={`stat-value ${primaryText}`}>{profile.stats.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className={`stat-item ${secondaryText}`}>
              <span className={`stat-value ${primaryText}`}>{followersCount}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className={`stat-item ${secondaryText}`}>
              <span className={`stat-value ${primaryText}`}>{profile.stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className={`stat-item ${secondaryText}`}>
              <span className={`stat-value ${primaryText}`}>{profile.stats.booksRead}</span>
              <span className="stat-label">Books Read</span>
            </div>
            <div className={`stat-item ${secondaryText}`}>
              <span className={`stat-value ${primaryText}`}>
                <FaFire size={20} color="#FF6B6B" />
                <span>{profile.readingStreak}</span>
              </span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>

          {/* Recent Activity */}
          {profile.recentActivity && profile.recentActivity.length > 0 && (
            <div className={`recent-activity ${cardBg} ${borderColor}`}>
              <h3 className={`activity-title ${primaryText}`}>
                <FaClock size={16} />
                <span>Recent Activity</span>
              </h3>
              <div className="activity-timeline">
                {profile.recentActivity.map((activity, index) => (
                  <div key={index} className={`activity-item ${borderColor}`}>
                    <div className="activity-icon">
                      {activity.type === 'post' && <FaComment size={16} className="text-blue-500" />}
                      {activity.type === 'book' && <FaBook size={16} className="text-green-500" />}
                      {activity.type === 'achievement' && <FaAward size={16} className="text-yellow-500" />}
                    </div>
                    <div className="activity-content">
                      <p className={`activity-text ${primaryText}`}>
                        {activity.content || `${activity.title} - ${activity.author || ''}`}
                      </p>
                      <span className={`activity-date ${secondaryText}`}>{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className={`profile-tabs-wrapper ${cardBg} ${borderColor}`}>
        <div className="profile-container">
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              <FaComment size={16} />
              <span>Posts</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => handleTabChange('books')}
            >
              <FaBook size={16} />
              <span>Books</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => handleTabChange('achievements')}
            >
              <FaAward size={16} />
              <span>Achievements</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleTabChange('about')}
            >
              <FaUser size={16} />
              <span>About</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="profile-container">
        <div className="profile-content">
          {activeTab === 'posts' && (
            <div className="posts-section">
              {profile.posts.map(post => (
                <div key={post.id} className={`post-card ${cardBg} ${borderColor}`}>
                  <div className="post-header">
                    <div className="post-user-info">
                      <img src={profile.avatar} alt={profile.displayName} className="post-avatar" />
                      <div>
                        <h4 className={`post-username ${primaryText}`}>{profile.displayName}</h4>
                        <span className={`post-date ${secondaryText}`}>{post.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`post-content ${primaryText}`}>{post.content}</p>
                  <div className="post-actions">
                    <button className={`post-action ${secondaryText}`}>
                      <FaHeart size={16} />
                      <span>{post.likes}</span>
                    </button>
                    <button className={`post-action ${secondaryText}`}>
                      <FaComment size={16} />
                      <span>{post.comments}</span>
                    </button>
                    <button className={`post-action ${secondaryText}`}>
                      <FaShare size={16} />
                    </button>
                    <button className={`post-action ${secondaryText}`}>
                      <FaBookmark size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'books' && (
            <div className="books-section">
              <div className="books-grid">
                {profile.books.map(book => (
                  <div key={book.id} className={`book-card ${cardBg} ${borderColor}`}>
                    <div className="book-cover">{book.cover}</div>
                    <div className="book-info">
                      <h4 className={`book-title ${primaryText}`}>{book.title}</h4>
                      <p className={`book-author ${secondaryText}`}>{book.author}</p>
                      <div className="book-status">
                        <span className={`status-badge ${book.status}`}>
                          {book.status === 'completed' && <FaCheckCircle size={12} />}
                          {book.status === 'reading' && <FaBook size={12} />}
                          {book.status === 'want-to-read' && <FaClock size={12} />}
                          <span>{book.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                      <div className="book-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={14} color={i < book.rating ? "#FFD700" : "#D1D5DB"} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <div className="achievements-grid">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className={`achievement-card ${cardBg} ${borderColor} ${!achievement.earned ? 'locked' : ''}`}>
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <h4 className={`achievement-title ${primaryText}`}>{achievement.title}</h4>
                      <p className={`achievement-desc ${secondaryText}`}>{achievement.description}</p>
                      <span className={`achievement-status ${achievement.earned ? 'earned' : 'locked'}`}>
                        {achievement.earned ? (
                          <>
                            <FaCheckCircle size={12} />
                            <span>Earned</span>
                          </>
                        ) : (
                          <>
                            <FaLock size={12} />
                            <span>Locked</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="about-section">
              <div className={`about-card ${cardBg} ${borderColor}`}>
                <h3 className={`about-title ${primaryText}`}>About</h3>
                <div className="about-content">
                  <p className={`about-bio ${secondaryText}`}>{profile.bio}</p>
                  <div className="about-details">
                    <div className={`about-item ${borderColor}`}>
                      <span className={`about-label ${secondaryText}`}>
                        <FaUser size={14} />
                        <span>Display Name</span>
                      </span>
                      <span className={`about-value ${primaryText}`}>{profile.displayName}</span>
                    </div>
                    <div className={`about-item ${borderColor}`}>
                      <span className={`about-label ${secondaryText}`}>
                        <FaEnvelope size={14} />
                        <span>Email</span>
                      </span>
                      <span className={`about-value ${primaryText}`}>{profile.email}</span>
                    </div>
                    <div className={`about-item ${borderColor}`}>
                      <span className={`about-label ${secondaryText}`}>
                        <FaMapMarkerAlt size={14} />
                        <span>Location</span>
                      </span>
                      <span className={`about-value ${primaryText}`}>{profile.location}</span>
                    </div>
                    <div className={`about-item ${borderColor}`}>
                      <span className={`about-label ${secondaryText}`}>
                        <FaGlobe size={14} />
                        <span>Website</span>
                      </span>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className={`about-value ${primaryText}`}>
                        {profile.website}
                      </a>
                    </div>
                    <div className={`about-item ${borderColor}`}>
                      <span className={`about-label ${secondaryText}`}>
                        <FaCalendar size={14} />
                        <span>Joined</span>
                      </span>
                      <span className={`about-value ${primaryText}`}>{profile.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className={`modal-content ${cardBg}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={`modal-title ${primaryText}`}>Edit Profile</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label className={`form-label ${secondaryText}`}>Display Name</label>
                <input 
                  type="text" 
                  className={`form-input ${inputBg} ${primaryText}`}
                  defaultValue={profile.displayName}
                />
              </div>
              <div className="form-group">
                <label className={`form-label ${secondaryText}`}>Bio</label>
                <textarea 
                  className={`form-input ${inputBg} ${primaryText}`}
                  rows="3"
                  defaultValue={profile.bio}
                />
              </div>
              <div className="form-group">
                <label className={`form-label ${secondaryText}`}>Location</label>
                <input 
                  type="text" 
                  className={`form-input ${inputBg} ${primaryText}`}
                  defaultValue={profile.location}
                />
              </div>
              <div className="form-group">
                <label className={`form-label ${secondaryText}`}>Website</label>
                <input 
                  type="url" 
                  className={`form-input ${inputBg} ${primaryText}`}
                  defaultValue={profile.website}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}