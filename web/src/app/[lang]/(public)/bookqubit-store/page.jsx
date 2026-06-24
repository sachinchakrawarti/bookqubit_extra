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
  FiPhone,
  FiMail,
  FiStar,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiUser,
  FiBook,
  FiShoppingBag,
  FiCoffee,
  FiWifi,
  FiMonitor,
  FiTruck,
  FiAward,
  FiHeart,
  FiShare2,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCalendar,
  FiGlobe,
  FiTag,
  FiPercent
} from "react-icons/fi";
import "./bookqubit-store.css";

const BookqubitStorePage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedStore, setSelectedStore] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Cities
  const cities = [
    { id: "all", name: "All Cities", count: 12 },
    { id: "mumbai", name: "Mumbai", count: 3 },
    { id: "delhi", name: "Delhi", count: 2 },
    { id: "bangalore", name: "Bangalore", count: 2 },
    { id: "chennai", name: "Chennai", count: 1 },
    { id: "hyderabad", name: "Hyderabad", count: 1 },
    { id: "pune", name: "Pune", count: 1 },
    { id: "kolkata", name: "Kolkata", count: 1 },
    { id: "ahmedabad", name: "Ahmedabad", count: 1 },
  ];

  // Store Categories
  const categories = [
    { id: "all", name: "All Stores" },
    { id: "flagship", name: "🏛️ Flagship" },
    { id: "express", name: "📦 Express" },
    { id: "cafe", name: "☕ Cafe" },
    { id: "children", name: "🧒 Children's" },
    { id: "academic", name: "🎓 Academic" },
  ];

  // Stores Data
  const stores = [
    {
      id: 1,
      name: "BookQubit Store - Mumbai Central",
      city: "mumbai",
      address: "123, Marine Drive, Mumbai Central, Mumbai - 400001",
      landmark: "Near Marine Drive Police Station",
      timings: "9:00 AM - 9:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43210",
      email: "mumbai.store@bookqubit.com",
      rating: 4.8,
      reviews: 234,
      category: "flagship",
      features: ["WiFi", "Cafe", "Reading Area", "Kids Corner", "Events"],
      image: "🏛️",
      coverColor: "#3b82f6",
      stockedItems: 15000,
      staff: 12,
      established: "2015",
      offers: ["10% off on first purchase", "Free membership"],
      nearby: ["Marine Drive", "Gateway of India"],
      type: "Flagship Store",
    },
    {
      id: 2,
      name: "BookQubit Express - Delhi Connaught Place",
      city: "delhi",
      address: "45, Connaught Place, New Delhi - 110001",
      landmark: "Near Rajiv Chowk Metro Station",
      timings: "8:00 AM - 10:00 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43211",
      email: "delhi.store@bookqubit.com",
      rating: 4.9,
      reviews: 312,
      category: "express",
      features: ["WiFi", "Quick Pickup", "Digital Kiosk"],
      image: "📦",
      coverColor: "#10b981",
      stockedItems: 8000,
      staff: 8,
      established: "2016",
      offers: ["Buy 2 Get 1 Free", "Student Discount"],
      nearby: ["Connaught Place", "Parliament House"],
      type: "Express Store",
    },
    {
      id: 3,
      name: "BookQubit Cafe - Bangalore Koramangala",
      city: "bangalore",
      address: "789, 80 Feet Road, Koramangala, Bangalore - 560034",
      landmark: "Near Sony Signal",
      timings: "7:00 AM - 11:00 PM (Mon-Sat), 8:00 AM - 8:00 PM (Sun)",
      phone: "+91 98765 43212",
      email: "bangalore.store@bookqubit.com",
      rating: 4.7,
      reviews: 189,
      category: "cafe",
      features: ["WiFi", "Cafe", "Reading Area", "Outdoor Seating"],
      image: "☕",
      coverColor: "#f59e0b",
      stockedItems: 12000,
      staff: 15,
      established: "2017",
      offers: ["Free coffee with book purchase", "Book Club Discount"],
      nearby: ["Koramangala", "Forum Mall"],
      type: "Cafe Store",
    },
    {
      id: 4,
      name: "BookQubit Kids - Chennai T Nagar",
      city: "chennai",
      address: "234, Usman Road, T Nagar, Chennai - 600017",
      landmark: "Near Panagal Park",
      timings: "9:00 AM - 8:30 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43213",
      email: "chennai.store@bookqubit.com",
      rating: 4.6,
      reviews: 156,
      category: "children",
      features: ["Kids Corner", "Story Time", "Play Area", "Parent Lounge"],
      image: "🧒",
      coverColor: "#ec4899",
      stockedItems: 10000,
      staff: 10,
      established: "2018",
      offers: ["Kids books at 20% off", "Free membership"],
      nearby: ["T Nagar", "Panagal Park"],
      type: "Children's Store",
    },
    {
      id: 5,
      name: "BookQubit Academic - Hyderabad Banjara Hills",
      city: "hyderabad",
      address: "567, Road No. 12, Banjara Hills, Hyderabad - 500034",
      landmark: "Near GVK Mall",
      timings: "8:00 AM - 9:30 PM (Mon-Sat), 9:00 AM - 7:00 PM (Sun)",
      phone: "+91 98765 43214",
      email: "hyderabad.store@bookqubit.com",
      rating: 4.8,
      reviews: 201,
      category: "academic",
      features: ["Study Rooms", "Academic Books", "Research Section", "Digital Access"],
      image: "🎓",
      coverColor: "#8b5cf6",
      stockedItems: 20000,
      staff: 14,
      established: "2019",
      offers: ["Student Discount 15%", "Bulk Purchase Offers"],
      nearby: ["Banjara Hills", "GVK Mall"],
      type: "Academic Store",
    },
    {
      id: 6,
      name: "BookQubit Store - Pune FC Road",
      city: "pune",
      address: "432, Fergusson College Road, Pune - 411004",
      landmark: "Near FC College",
      timings: "7:30 AM - 10:00 PM (Mon-Sat), 8:30 AM - 8:00 PM (Sun)",
      phone: "+91 98765 43215",
      email: "pune.store@bookqubit.com",
      rating: 4.5,
      reviews: 143,
      category: "flagship",
      features: ["WiFi", "Cafe", "Reading Area", "Events", "Book Club"],
      image: "🏛️",
      coverColor: "#3b82f6",
      stockedItems: 18000,
      staff: 13,
      established: "2020",
      offers: ["10% off on all books", "Student Discount"],
      nearby: ["FC Road", "Deccan Gymkhana"],
      type: "Flagship Store",
    },
    {
      id: 7,
      name: "BookQubit Express - Kolkata Park Street",
      city: "kolkata",
      address: "890, Park Street, Kolkata - 700016",
      landmark: "Near Park Street Metro",
      timings: "9:00 AM - 8:00 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43216",
      email: "kolkata.store@bookqubit.com",
      rating: 4.4,
      reviews: 98,
      category: "express",
      features: ["WiFi", "Quick Pickup", "Digital Kiosk"],
      image: "📦",
      coverColor: "#10b981",
      stockedItems: 7000,
      staff: 7,
      established: "2021",
      offers: ["Buy 2 Get 1 Free"],
      nearby: ["Park Street", "Victoria Memorial"],
      type: "Express Store",
    },
    {
      id: 8,
      name: "BookQubit Cafe - Ahmedabad CG Road",
      city: "ahmedabad",
      address: "123, CG Road, Ahmedabad - 380006",
      landmark: "Near Municipal Market",
      timings: "9:00 AM - 8:30 PM (Mon-Sat), 10:00 AM - 6:00 PM (Sun)",
      phone: "+91 98765 43217",
      email: "ahmedabad.store@bookqubit.com",
      rating: 4.3,
      reviews: 87,
      category: "cafe",
      features: ["WiFi", "Cafe", "Reading Area"],
      image: "☕",
      coverColor: "#f59e0b",
      stockedItems: 9000,
      staff: 9,
      established: "2022",
      offers: ["Free coffee with book purchase"],
      nearby: ["CG Road", "Law Garden"],
      type: "Cafe Store",
    },
  ];

  // Filter stores
  const filteredStores = stores.filter(store => {
    const matchesCity = selectedCity === "all" || store.city === selectedCity;
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    const matchesRating = store.rating >= selectedRating;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesRating && matchesSearch;
  });

  // Get featured stores (top rated)
  const featuredStores = [...stores].sort((a, b) => b.rating - a.rating).slice(0, 3);

  // Get city name
  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : cityId;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.name.split(' ')[0] : '📚';
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bookqubit-store-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Hero Section */}
      <section className="store-hero">
        <div className="store-hero-container">
          <div className="store-hero-content">
            <span className="store-hero-badge">🏪 BookQubit Stores</span>
            <h1 className="store-hero-title">
              Find Your <span className="store-hero-highlight">Local Bookstore</span>
            </h1>
            <p className="store-hero-desc">
              Visit our physical stores in every city. Discover books, stationery, and a community of readers.
            </p>
            <div className="store-hero-search">
              <FiSearch className="store-hero-search-icon" />
              <input
                type="text"
                placeholder="Search stores by name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`store-hero-search-input ${theme.background?.input || "bg-white dark:bg-gray-800"}`}
              />
            </div>
            <div className="store-hero-stats">
              <div className="store-hero-stat">
                <span className="store-hero-stat-value">{stores.length}+</span>
                <span className="store-hero-stat-label">Stores</span>
              </div>
              <div className="store-hero-stat">
                <span className="store-hero-stat-value">{cities.length - 1}</span>
                <span className="store-hero-stat-label">Cities</span>
              </div>
              <div className="store-hero-stat">
                <span className="store-hero-stat-value">4.7</span>
                <span className="store-hero-stat-label">Avg Rating</span>
              </div>
              <div className="store-hero-stat">
                <span className="store-hero-stat-value">100K+</span>
                <span className="store-hero-stat-label">Customers</span>
              </div>
            </div>
          </div>
          <div className="store-hero-image">
            <div className="store-hero-icon-large">🏪</div>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="store-featured">
        <div className="store-featured-header">
          <h2 className="store-featured-title">
            🌟 Featured <span className="store-featured-highlight">Stores</span>
          </h2>
          <p className="store-featured-subtitle">
            Our most popular and highly rated stores
          </p>
        </div>
        <div className="store-featured-grid">
          {featuredStores.map((store) => (
            <div
              key={store.id}
              className={`store-featured-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
              onClick={() => setSelectedStore(store)}
            >
              <div
                className="store-featured-card-header"
                style={{ backgroundColor: `${store.coverColor}15` }}
              >
                <span className="store-featured-card-icon">{store.image}</span>
                <span className="store-featured-card-type">{store.type}</span>
              </div>
              <div className="store-featured-card-body">
                <h3 className="store-featured-card-name">{store.name}</h3>
                <p className="store-featured-card-location">
                  <FiMapPin /> {store.landmark}
                </p>
                <div className="store-featured-card-rating">
                  <FiStar className="filled" />
                  <span>{store.rating}</span>
                  <span className="store-featured-card-reviews">({store.reviews} reviews)</span>
                </div>
                <div className="store-featured-card-features">
                  {store.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="store-featured-card-feature">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="store-featured-card-btn">
                  View Details <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="store-controls">
        <div className="store-controls-container">
          <div className="store-controls-top">
            <div className="store-controls-left">
              <button
                className="store-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter /> Filters
              </button>
              <div className="store-view-toggle">
                <button
                  className={`store-view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <FiGrid />
                </button>
                <button
                  className={`store-view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <FiList />
                </button>
              </div>
            </div>
            <div className="store-controls-right">
              <span className="store-results-count">{filteredStores.length} stores found</span>
            </div>
          </div>

          {showFilters && (
            <div className={`store-filters-panel ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
              <div className="store-filters-header">
                <h3>Filter Stores</h3>
                <button className="store-filters-close" onClick={() => setShowFilters(false)}>
                  <FiX />
                </button>
              </div>
              <div className="store-filters-grid">
                <div className="store-filter-group">
                  <h4>City</h4>
                  <div className="store-filter-options">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        className={`store-filter-chip ${selectedCity === city.id ? "active" : ""}`}
                        onClick={() => setSelectedCity(city.id)}
                      >
                        {city.name} ({city.count})
                      </button>
                    ))}
                  </div>
                </div>
                <div className="store-filter-group">
                  <h4>Category</h4>
                  <div className="store-filter-options">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`store-filter-chip ${selectedCategory === cat.id ? "active" : ""}`}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="store-filter-group">
                  <h4>Rating</h4>
                  <div className="store-filter-options">
                    {[0, 4, 4.5, 4.8].map((rating) => (
                      <button
                        key={rating}
                        className={`store-filter-chip ${selectedRating === rating ? "active" : ""}`}
                        onClick={() => setSelectedRating(rating)}
                      >
                        {rating === 0 ? "All" : `${rating}+ ⭐`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stores Grid */}
      <section className="store-grid-section">
        <div className="store-grid-container">
          {filteredStores.length === 0 ? (
            <div className="store-no-results">
              <p>No stores found matching your criteria.</p>
              <button onClick={() => {
                setSelectedCity("all");
                setSelectedCategory("all");
                setSelectedRating(0);
                setSearchQuery("");
              }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`store-grid ${viewMode === "list" ? "list-view" : ""}`}>
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`store-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div
                    className="store-card-icon"
                    style={{ backgroundColor: `${store.coverColor}15` }}
                  >
                    {store.image}
                  </div>
                  <div className="store-card-content">
                    <div className="store-card-header">
                      <h3 className="store-card-name">{store.name}</h3>
                      <span className="store-card-type">{store.type}</span>
                    </div>
                    <p className="store-card-address">
                      <FiMapPin /> {store.landmark}
                    </p>
                    <div className="store-card-meta">
                      <span className="store-card-meta-item">
                        <FiClock /> {store.timings.split(",")[0]}
                      </span>
                      <span className="store-card-meta-item">
                        <FiBook /> {store.stockedItems.toLocaleString()} items
                      </span>
                    </div>
                    <div className="store-card-footer">
                      <span className="store-card-rating">
                        <FiStar className="filled" /> {store.rating}
                      </span>
                      <span className="store-card-city">{getCityName(store.city)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Store Detail Modal */}
      {selectedStore && (
        <div className="store-modal-overlay" onClick={() => setSelectedStore(null)}>
          <div
            className={`store-modal ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="store-modal-close" onClick={() => setSelectedStore(null)}>
              <FiX />
            </button>
            <div className="store-modal-content">
              <div
                className="store-modal-header"
                style={{ backgroundColor: `${selectedStore.coverColor}15` }}
              >
                <span className="store-modal-icon">{selectedStore.image}</span>
                <div>
                  <h2 className="store-modal-name">{selectedStore.name}</h2>
                  <p className="store-modal-type">{selectedStore.type}</p>
                </div>
              </div>
              <div className="store-modal-body">
                <div className="store-modal-grid">
                  <div className="store-modal-info">
                    <div className="store-modal-info-item">
                      <FiMapPin />
                      <div>
                        <strong>Address</strong>
                        <p>{selectedStore.address}</p>
                      </div>
                    </div>
                    <div className="store-modal-info-item">
                      <FiClock />
                      <div>
                        <strong>Timings</strong>
                        <p>{selectedStore.timings}</p>
                      </div>
                    </div>
                    <div className="store-modal-info-item">
                      <FiPhone />
                      <div>
                        <strong>Phone</strong>
                        <p>{selectedStore.phone}</p>
                      </div>
                    </div>
                    <div className="store-modal-info-item">
                      <FiMail />
                      <div>
                        <strong>Email</strong>
                        <p>{selectedStore.email}</p>
                      </div>
                    </div>
                    <div className="store-modal-info-item">
                      <FiCalendar />
                      <div>
                        <strong>Established</strong>
                        <p>{selectedStore.established}</p>
                      </div>
                    </div>
                    <div className="store-modal-info-item">
                      <FiUser />
                      <div>
                        <strong>Staff</strong>
                        <p>{selectedStore.staff} members</p>
                      </div>
                    </div>
                  </div>
                  <div className="store-modal-stats">
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-value">{selectedStore.stockedItems.toLocaleString()}</span>
                      <span className="store-modal-stat-label">Items Stocked</span>
                    </div>
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-value">{selectedStore.rating}</span>
                      <span className="store-modal-stat-label">Rating</span>
                    </div>
                    <div className="store-modal-stat">
                      <span className="store-modal-stat-value">{selectedStore.reviews}</span>
                      <span className="store-modal-stat-label">Reviews</span>
                    </div>
                  </div>
                </div>

                <div className="store-modal-features">
                  <h4>Features</h4>
                  <div className="store-modal-features-grid">
                    {selectedStore.features.map((feature, index) => (
                      <span key={index} className="store-modal-feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="store-modal-offers">
                  <h4>Special Offers</h4>
                  <div className="store-modal-offers-grid">
                    {selectedStore.offers.map((offer, index) => (
                      <span key={index} className="store-modal-offer">
                        <FiTag /> {offer}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="store-modal-actions">
                  <Link href={`tel:${selectedStore.phone}`} className="store-modal-btn-primary">
                    <FiPhone /> Call Store
                  </Link>
                  <Link href={`/${language}/bookqubit-store/${selectedStore.id}`} className="store-modal-btn-secondary">
                    <FiArrowRight /> Visit Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="store-cta">
        <div
          className="store-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="store-cta-content">
            <h2 className="store-cta-title">Open a BookQubit Store in Your City</h2>
            <p className="store-cta-desc">
              Join the BookQubit family! Franchise opportunities available in all major cities.
            </p>
            <div className="store-cta-buttons">
              <Link href={`/${language}/bookqubit-store/franchise`} className="store-cta-btn-primary">
                Apply Now <FiArrowRight />
              </Link>
              <Link href={`/${language}/bookqubit-store/contact`} className="store-cta-btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookqubitStorePage;