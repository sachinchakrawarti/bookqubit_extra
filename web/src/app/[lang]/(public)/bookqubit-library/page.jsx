"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiBook,
  FiUsers,
  FiStar,
  FiSearch,
  FiFilter,
  FiPhone,
  FiMail,
  FiGlobe,
  FiCalendar,
  FiAward,
  FiCoffee,
  FiWifi,
  FiMonitor,
  FiBookOpen,
  FiChevronDown,
  FiX
} from "react-icons/fi";
import "./bookqubit-library.css";

const BookqubitLibraryPage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Cities
  const cities = [
    { id: "all", name: "All Cities" },
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi" },
    { id: "bangalore", name: "Bangalore" },
    { id: "chennai", name: "Chennai" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "kolkata", name: "Kolkata" },
    { id: "pune", name: "Pune" },
    { id: "ahmedabad", name: "Ahmedabad" },
    { id: "jaipur", name: "Jaipur" },
    { id: "lucknow", name: "Lucknow" },
    { id: "chandigarh", name: "Chandigarh" },
  ];

  // Libraries Data
  const libraries = [
    {
      id: 1,
      name: "BookQubit Library - Mumbai Central",
      city: "mumbai",
      address: "123, Marine Drive, Mumbai Central, Mumbai - 400001",
      landmark: "Near Marine Drive Police Station",
      timings: "9:00 AM - 9:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43210",
      email: "mumbai.central@bookqubit.com",
      website: "www.bookqubit.com/mumbai",
      rating: 4.8,
      totalBooks: 25000,
      members: 3200,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "Reading Hall"],
      image: "📚",
      featured: true,
      coordinates: { lat: 18.9401, lng: 72.8352 },
      established: "2015",
      languages: ["English", "Hindi", "Marathi", "Gujarati"],
    },
    {
      id: 2,
      name: "BookQubit Library - Delhi Connaught Place",
      city: "delhi",
      address: "45, Connaught Place, New Delhi - 110001",
      landmark: "Near Rajiv Chowk Metro Station",
      timings: "8:00 AM - 10:00 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43211",
      email: "delhi.cp@bookqubit.com",
      website: "www.bookqubit.com/delhi",
      rating: 4.9,
      totalBooks: 32000,
      members: 4500,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "Reading Hall", "Event Space"],
      image: "📖",
      featured: true,
      coordinates: { lat: 28.6315, lng: 77.2167 },
      established: "2014",
      languages: ["English", "Hindi", "Urdu", "Punjabi"],
    },
    {
      id: 3,
      name: "BookQubit Library - Bangalore Koramangala",
      city: "bangalore",
      address: "789, 80 Feet Road, Koramangala, Bangalore - 560034",
      landmark: "Near Sony Signal",
      timings: "7:00 AM - 11:00 PM (Mon-Sat), 8:00 AM - 8:00 PM (Sun)",
      phone: "+91 98765 43212",
      email: "bangalore.koramangala@bookqubit.com",
      website: "www.bookqubit.com/bangalore",
      rating: 4.7,
      totalBooks: 28000,
      members: 3800,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "24/7 Access"],
      image: "📕",
      featured: true,
      coordinates: { lat: 12.9352, lng: 77.6245 },
      established: "2016",
      languages: ["English", "Kannada", "Tamil", "Telugu", "Hindi"],
    },
    {
      id: 4,
      name: "BookQubit Library - Chennai T Nagar",
      city: "chennai",
      address: "234, Usman Road, T Nagar, Chennai - 600017",
      landmark: "Near Panagal Park",
      timings: "9:00 AM - 8:30 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43213",
      email: "chennai.tnagar@bookqubit.com",
      website: "www.bookqubit.com/chennai",
      rating: 4.6,
      totalBooks: 22000,
      members: 2800,
      amenities: ["WiFi", "Study Rooms", "Reading Hall", "Digital Access"],
      image: "📗",
      featured: false,
      coordinates: { lat: 13.0404, lng: 80.2326 },
      established: "2017",
      languages: ["English", "Tamil", "Telugu", "Hindi"],
    },
    {
      id: 5,
      name: "BookQubit Library - Hyderabad Banjara Hills",
      city: "hyderabad",
      address: "567, Road No. 12, Banjara Hills, Hyderabad - 500034",
      landmark: "Near GVK Mall",
      timings: "8:00 AM - 9:30 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43214",
      email: "hyderabad.banjarahills@bookqubit.com",
      website: "www.bookqubit.com/hyderabad",
      rating: 4.8,
      totalBooks: 26000,
      members: 3400,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "Gardens"],
      image: "📘",
      featured: false,
      coordinates: { lat: 17.4539, lng: 78.3941 },
      established: "2018",
      languages: ["English", "Telugu", "Hindi", "Urdu"],
    },
    {
      id: 6,
      name: "BookQubit Library - Kolkata Park Street",
      city: "kolkata",
      address: "890, Park Street, Kolkata - 700016",
      landmark: "Near Park Street Metro",
      timings: "9:00 AM - 8:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43215",
      email: "kolkata.parkstreet@bookqubit.com",
      website: "www.bookqubit.com/kolkata",
      rating: 4.5,
      totalBooks: 20000,
      members: 2500,
      amenities: ["WiFi", "Study Rooms", "Reading Hall", "Digital Access"],
      image: "📙",
      featured: false,
      coordinates: { lat: 22.5549, lng: 88.3539 },
      established: "2019",
      languages: ["English", "Bengali", "Hindi", "Urdu"],
    },
    {
      id: 7,
      name: "BookQubit Library - Pune FC Road",
      city: "pune",
      address: "432, Fergusson College Road, Pune - 411004",
      landmark: "Near FC College",
      timings: "7:30 AM - 10:00 PM (Mon-Sat), 8:30 AM - 8:00 PM (Sun)",
      phone: "+91 98765 43216",
      email: "pune.fcroad@bookqubit.com",
      website: "www.bookqubit.com/pune",
      rating: 4.7,
      totalBooks: 24000,
      members: 3100,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "Reading Hall"],
      image: "📓",
      featured: false,
      coordinates: { lat: 18.5182, lng: 73.8346 },
      established: "2020",
      languages: ["English", "Marathi", "Hindi", "Gujarati"],
    },
    {
      id: 8,
      name: "BookQubit Library - Ahmedabad CG Road",
      city: "ahmedabad",
      address: "123, CG Road, Ahmedabad - 380006",
      landmark: "Near Municipal Market",
      timings: "9:00 AM - 8:30 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43217",
      email: "ahmedabad.cgroad@bookqubit.com",
      website: "www.bookqubit.com/ahmedabad",
      rating: 4.4,
      totalBooks: 18000,
      members: 2200,
      amenities: ["WiFi", "Study Rooms", "Reading Hall", "Digital Access"],
      image: "📒",
      featured: false,
      coordinates: { lat: 23.0225, lng: 72.5714 },
      established: "2021",
      languages: ["English", "Gujarati", "Hindi", "Marathi"],
    },
    {
      id: 9,
      name: "BookQubit Library - Jaipur MI Road",
      city: "jaipur",
      address: "567, MI Road, Jaipur - 302001",
      landmark: "Near Sindhi Camp",
      timings: "8:00 AM - 9:00 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43218",
      email: "jaipur.miroad@bookqubit.com",
      website: "www.bookqubit.com/jaipur",
      rating: 4.6,
      totalBooks: 21000,
      members: 2700,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access"],
      image: "📔",
      featured: false,
      coordinates: { lat: 26.9124, lng: 75.7873 },
      established: "2021",
      languages: ["English", "Hindi", "Rajasthani", "Urdu"],
    },
    {
      id: 10,
      name: "BookQubit Library - Lucknow Hazratganj",
      city: "lucknow",
      address: "234, Hazratganj, Lucknow - 226001",
      landmark: "Near KD Singh Stadium",
      timings: "9:00 AM - 8:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43219",
      email: "lucknow.hazratganj@bookqubit.com",
      website: "www.bookqubit.com/lucknow",
      rating: 4.3,
      totalBooks: 16000,
      members: 2000,
      amenities: ["WiFi", "Study Rooms", "Reading Hall"],
      image: "📕",
      featured: false,
      coordinates: { lat: 26.8467, lng: 80.9462 },
      established: "2022",
      languages: ["English", "Hindi", "Urdu", "Awadhi"],
    },
    {
      id: 11,
      name: "BookQubit Library - Chandigarh Sector 17",
      city: "chandigarh",
      address: "789, Sector 17, Chandigarh - 160017",
      landmark: "Near ISBT",
      timings: "8:00 AM - 9:30 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43220",
      email: "chandigarh.sector17@bookqubit.com",
      website: "www.bookqubit.com/chandigarh",
      rating: 4.7,
      totalBooks: 23000,
      members: 2900,
      amenities: ["WiFi", "Study Rooms", "Cafe", "Digital Access", "Gardens"],
      image: "📗",
      featured: false,
      coordinates: { lat: 30.7333, lng: 76.7794 },
      established: "2022",
      languages: ["English", "Hindi", "Punjabi", "Urdu"],
    },
  ];

  // Filter libraries based on city and search
  const filteredLibraries = libraries.filter(library => {
    const matchesCity = selectedCity === "all" || library.city === selectedCity;
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          library.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          library.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  // Get featured libraries
  const featuredLibraries = libraries.filter(lib => lib.featured);

  // Get city name
  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : cityId;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bookqubit-library-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Hero Section */}
      <section className="library-hero">
        <div className="library-hero-container">
          <div className="library-hero-content">
            <span className="library-hero-badge">
              📚 BookQubit Libraries
            </span>
            <h1
              className={`library-hero-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
            >
              Find a <span className="library-hero-highlight">Physical Library</span> Near You
            </h1>
            <p
              className={`library-hero-desc ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
            >
              Discover BookQubit physical libraries in every city. Read, learn, and grow with our community.
            </p>
            <div className="library-hero-stats">
              <div className="library-hero-stat">
                <span className="library-hero-stat-value">{libraries.length}+</span>
                <span className="library-hero-stat-label">Libraries</span>
              </div>
              <div className="library-hero-stat">
                <span className="library-hero-stat-value">{cities.length - 1}</span>
                <span className="library-hero-stat-label">Cities</span>
              </div>
              <div className="library-hero-stat">
                <span className="library-hero-stat-value">50K+</span>
                <span className="library-hero-stat-label">Books</span>
              </div>
              <div className="library-hero-stat">
                <span className="library-hero-stat-value">30K+</span>
                <span className="library-hero-stat-label">Members</span>
              </div>
            </div>
          </div>
          <div className="library-hero-image">
            <div className="library-hero-icon-large">
              🏛️📚
            </div>
          </div>
        </div>
      </section>

      {/* Featured Libraries */}
      <section className="library-featured">
        <div className="library-featured-header">
          <h2
            className={`library-featured-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            🌟 Featured <span className="library-featured-highlight">Libraries</span>
          </h2>
          <p
            className={`library-featured-subtitle ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            Our most popular libraries across the country
          </p>
        </div>
        <div className="library-featured-grid">
          {featuredLibraries.map((library) => (
            <div
              key={library.id}
              className={`library-featured-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
              onClick={() => setSelectedLibrary(library)}
            >
              <div className="library-featured-card-image">{library.image}</div>
              <div className="library-featured-card-content">
                <div className="library-featured-card-header">
                  <h3
                    className={`library-featured-card-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                  >
                    {library.name}
                  </h3>
                  <span className="library-featured-card-rating">
                    <FiStar /> {library.rating}
                  </span>
                </div>
                <p
                  className={`library-featured-card-location ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  <FiMapPin /> {library.landmark}
                </p>
                <div className="library-featured-card-amenities">
                  {library.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="library-featured-card-amenity">
                      {amenity}
                    </span>
                  ))}
                  {library.amenities.length > 3 && (
                    <span className="library-featured-card-amenity">+{library.amenities.length - 3} more</span>
                  )}
                </div>
                <button className="library-featured-card-btn">
                  View Details <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="library-search-section">
        <div className="library-search-container">
          <div className="library-search-wrapper">
            <div className="library-search-input-wrapper">
              <FiSearch className="library-search-icon" />
              <input
                type="text"
                placeholder="Search libraries by name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`library-search-input ${theme.background?.input || "bg-white dark:bg-gray-800"} ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
              />
              {searchQuery && (
                <button
                  className="library-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <FiX />
                </button>
              )}
            </div>
            <button
              className={`library-filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filter
            </button>
          </div>

          {showFilters && (
            <div className={`library-filters ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
              <div className="library-filters-header">
                <h4>Filter by City</h4>
                <button className="library-filters-close" onClick={() => setShowFilters(false)}>
                  <FiX />
                </button>
              </div>
              <div className="library-filters-grid">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    className={`library-filter-chip ${selectedCity === city.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCity(city.id);
                      setShowFilters(false);
                    }}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Libraries Grid */}
      <section className="library-grid-section">
        <div className="library-grid-header">
          <h2
            className={`library-grid-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
          >
            {selectedCity === "all" ? "All Libraries" : `${getCityName(selectedCity)} Libraries`}
          </h2>
          <p
            className={`library-grid-count ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            {filteredLibraries.length} libraries found
          </p>
        </div>
        <div className="library-grid">
          {filteredLibraries.map((library) => (
            <div
              key={library.id}
              className={`library-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
              onClick={() => setSelectedLibrary(library)}
            >
              <div className="library-card-icon">{library.image}</div>
              <div className="library-card-content">
                <h3
                  className={`library-card-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                >
                  {library.name}
                </h3>
                <p
                  className={`library-card-address ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  <FiMapPin /> {library.address}
                </p>
                <div className="library-card-meta">
                  <span className="library-card-meta-item">
                    <FiClock /> {library.timings.split(",")[0]}
                  </span>
                  <span className="library-card-meta-item">
                    <FiBook /> {library.totalBooks.toLocaleString()} books
                  </span>
                </div>
                <div className="library-card-footer">
                  <span className="library-card-rating">
                    <FiStar /> {library.rating}
                  </span>
                  <span className="library-card-city">{getCityName(library.city)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredLibraries.length === 0 && (
          <div className="library-no-results">
            <p>No libraries found matching your criteria.</p>
            <button onClick={() => { setSelectedCity("all"); setSearchQuery(""); }}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Library Detail Modal */}
      {selectedLibrary && (
        <div className="library-modal-overlay" onClick={() => setSelectedLibrary(null)}>
          <div
            className={`library-modal ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="library-modal-close" onClick={() => setSelectedLibrary(null)}>
              <FiX />
            </button>
            <div className="library-modal-header">
              <div className="library-modal-icon">{selectedLibrary.image}</div>
              <div>
                <h2
                  className={`library-modal-title ${theme.textColors?.primary || "text-gray-900 dark:text-white"}`}
                >
                  {selectedLibrary.name}
                </h2>
                <p
                  className={`library-modal-location ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
                >
                  <FiMapPin /> {selectedLibrary.address}
                </p>
              </div>
            </div>

            <div className="library-modal-grid">
              <div className="library-modal-info">
                <div className="library-modal-info-item">
                  <FiClock />
                  <div>
                    <strong>Timings</strong>
                    <p>{selectedLibrary.timings}</p>
                  </div>
                </div>
                <div className="library-modal-info-item">
                  <FiPhone />
                  <div>
                    <strong>Phone</strong>
                    <p>{selectedLibrary.phone}</p>
                  </div>
                </div>
                <div className="library-modal-info-item">
                  <FiMail />
                  <div>
                    <strong>Email</strong>
                    <p>{selectedLibrary.email}</p>
                  </div>
                </div>
                <div className="library-modal-info-item">
                  <FiGlobe />
                  <div>
                    <strong>Website</strong>
                    <p>{selectedLibrary.website}</p>
                  </div>
                </div>
                <div className="library-modal-info-item">
                  <FiCalendar />
                  <div>
                    <strong>Established</strong>
                    <p>{selectedLibrary.established}</p>
                  </div>
                </div>
              </div>

              <div className="library-modal-stats">
                <div className="library-modal-stat">
                  <span className="library-modal-stat-value">{selectedLibrary.totalBooks.toLocaleString()}</span>
                  <span className="library-modal-stat-label">Total Books</span>
                </div>
                <div className="library-modal-stat">
                  <span className="library-modal-stat-value">{selectedLibrary.members.toLocaleString()}</span>
                  <span className="library-modal-stat-label">Members</span>
                </div>
                <div className="library-modal-stat">
                  <span className="library-modal-stat-value">{selectedLibrary.rating}</span>
                  <span className="library-modal-stat-label">Rating</span>
                </div>
              </div>

              <div className="library-modal-amenities">
                <h4>Amenities</h4>
                <div className="library-modal-amenities-grid">
                  {selectedLibrary.amenities.map((amenity, index) => (
                    <span key={index} className="library-modal-amenity">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="library-modal-languages">
                <h4>Languages Available</h4>
                <div className="library-modal-languages-grid">
                  {selectedLibrary.languages.map((lang, index) => (
                    <span key={index} className="library-modal-language">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="library-modal-actions">
              <Link href={`/${language}/bookqubit-library/${selectedLibrary.id}`} className="library-modal-btn-primary">
                Visit Library <FiArrowRight />
              </Link>
              <Link href={`tel:${selectedLibrary.phone}`} className="library-modal-btn-secondary">
                <FiPhone /> Call Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="library-cta">
        <div
          className="library-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="library-cta-content">
            <h2 className="library-cta-title">
              Can't Find a Library Near You?
            </h2>
            <p className="library-cta-desc">
              Help us bring BookQubit Library to your city. Request a new library location today!
            </p>
            <div className="library-cta-buttons">
              <Link
                href={`/${language}/bookqubit-library/request`}
                className="library-cta-btn-primary"
              >
                Request New Library <FiArrowRight />
              </Link>
              <Link
                href={`/${language}/bookqubit-library/partner`}
                className="library-cta-btn-secondary"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookqubitLibraryPage;