"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { 
  FiArrowRight,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiFilter,
  FiGrid,
  FiList,
  FiMapPin,
  FiClock,
  FiUser,
  FiTag,
  FiDollarSign,
  FiBook,
  FiTrendingUp,
  FiAward,
  FiEye,
  FiMessageCircle,
  FiShare2,
  FiMail,
  FiPhone,
  FiPlus,
  FiMinus,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
  FiTruck,
  FiShield,
  FiThumbsUp,
  FiBookOpen
} from "react-icons/fi";
import "./bookqubit-marketplace.css";

const BookqubitMarketplacePage = () => {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Categories
  const categories = [
    { id: "all", name: "All Books", icon: "📚", count: 245 },
    { id: "fiction", name: "Fiction", icon: "📖", count: 85 },
    { id: "nonfiction", name: "Non-Fiction", icon: "📕", count: 62 },
    { id: "academic", name: "Academic", icon: "📗", count: 45 },
    { id: "comics", name: "Comics", icon: "🦸", count: 28 },
    { id: "rare", name: "Rare Books", icon: "💎", count: 15 },
    { id: "children", name: "Children's", icon: "🧒", count: 32 },
    { id: "selfhelp", name: "Self-Help", icon: "🧠", count: 23 },
  ];

  // Book Conditions
  const conditions = [
    { id: "all", name: "All Conditions" },
    { id: "new", name: "📦 New" },
    { id: "like-new", name: "✨ Like New" },
    { id: "good", name: "👍 Good" },
    { id: "acceptable", name: "📖 Acceptable" },
  ];

  // Books Data
  const books = [
    {
      id: 1,
      title: "The Digital Future",
      author: "Sarah Chen",
      price: 14.99,
      originalPrice: 24.99,
      category: "fiction",
      condition: "like-new",
      rating: 4.9,
      reviews: 234,
      image: "📱",
      seller: {
        name: "BookHaven",
        rating: 4.8,
        location: "Mumbai",
        sales: 1250,
        joined: "2023",
      },
      description: "A groundbreaking exploration of how technology will shape our future.",
      tags: ["Science Fiction", "Technology", "Future"],
      inStock: true,
      featured: true,
      discount: 40,
      published: "2024",
      pages: 320,
      language: "English",
    },
    {
      id: 2,
      title: "Stories of Tomorrow",
      author: "Maria Garcia",
      price: 12.99,
      originalPrice: 19.99,
      category: "fiction",
      condition: "good",
      rating: 4.7,
      reviews: 189,
      image: "🌅",
      seller: {
        name: "Readers Paradise",
        rating: 4.6,
        location: "Delhi",
        sales: 890,
        joined: "2022",
      },
      description: "A collection of inspiring stories about hope and resilience.",
      tags: ["Fiction", "Inspiring", "Short Stories"],
      inStock: true,
      featured: false,
      discount: 35,
      published: "2023",
      pages: 280,
      language: "English",
    },
    {
      id: 3,
      title: "Quantum Dreams",
      author: "Dr. Raj Patel",
      price: 16.99,
      originalPrice: 29.99,
      category: "academic",
      condition: "new",
      rating: 4.8,
      reviews: 156,
      image: "🔬",
      seller: {
        name: "Academic Books",
        rating: 4.9,
        location: "Bangalore",
        sales: 2100,
        joined: "2021",
      },
      description: "Understanding quantum physics through the lens of consciousness.",
      tags: ["Science", "Quantum Physics", "Academic"],
      inStock: true,
      featured: true,
      discount: 43,
      published: "2024",
      pages: 450,
      language: "English",
    },
    {
      id: 4,
      title: "The Art of Writing",
      author: "James Wilson",
      price: 11.99,
      originalPrice: 18.99,
      category: "nonfiction",
      condition: "like-new",
      rating: 4.6,
      reviews: 143,
      image: "🎨",
      seller: {
        name: "Creative Minds",
        rating: 4.5,
        location: "Chennai",
        sales: 670,
        joined: "2023",
      },
      description: "Master the craft of writing with this comprehensive guide.",
      tags: ["Writing", "Creativity", "Non-Fiction"],
      inStock: true,
      featured: false,
      discount: 37,
      published: "2023",
      pages: 350,
      language: "English",
    },
    {
      id: 5,
      title: "Digital Nomad Stories",
      author: "Alex Rivera",
      price: 9.99,
      originalPrice: 15.99,
      category: "selfhelp",
      condition: "good",
      rating: 4.5,
      reviews: 98,
      image: "💻",
      seller: {
        name: "Nomad Books",
        rating: 4.3,
        location: "Jaipur",
        sales: 450,
        joined: "2024",
      },
      description: "Real stories from digital nomads around the world.",
      tags: ["Self-Help", "Travel", "Lifestyle"],
      inStock: true,
      featured: false,
      discount: 38,
      published: "2024",
      pages: 210,
      language: "English",
    },
    {
      id: 6,
      title: "Rare: First Edition",
      author: "Various Authors",
      price: 89.99,
      originalPrice: 150.00,
      category: "rare",
      condition: "like-new",
      rating: 5.0,
      reviews: 67,
      image: "💎",
      seller: {
        name: "Rare Books Co.",
        rating: 4.9,
        location: "Kolkata",
        sales: 320,
        joined: "2020",
      },
      description: "A rare first edition collection of classic literature.",
      tags: ["Rare", "Collectible", "Classic"],
      inStock: true,
      featured: true,
      discount: 40,
      published: "1920",
      pages: 500,
      language: "English",
    },
    {
      id: 7,
      title: "Adventure Time Comics",
      author: "Jake Johnson",
      price: 7.99,
      originalPrice: 12.99,
      category: "comics",
      condition: "new",
      rating: 4.8,
      reviews: 210,
      image: "🦸",
      seller: {
        name: "Comic World",
        rating: 4.7,
        location: "Hyderabad",
        sales: 1500,
        joined: "2022",
      },
      description: "Exciting comic adventures for kids and adults.",
      tags: ["Comics", "Adventure", "Fun"],
      inStock: true,
      featured: false,
      discount: 38,
      published: "2024",
      pages: 120,
      language: "English",
    },
    {
      id: 8,
      title: "Children's Stories Collection",
      author: "Emma Thompson",
      price: 5.99,
      originalPrice: 9.99,
      category: "children",
      condition: "good",
      rating: 4.9,
      reviews: 320,
      image: "🧒",
      seller: {
        name: "Kids Books",
        rating: 4.8,
        location: "Pune",
        sales: 2800,
        joined: "2021",
      },
      description: "A magical collection of stories for children.",
      tags: ["Children", "Stories", "Learning"],
      inStock: true,
      featured: true,
      discount: 40,
      published: "2023",
      pages: 150,
      language: "English",
    },
    {
      id: 9,
      title: "The Mindful Path",
      author: "Dr. Lisa Chen",
      price: 13.99,
      originalPrice: 22.99,
      category: "selfhelp",
      condition: "like-new",
      rating: 4.7,
      reviews: 178,
      image: "🧘",
      seller: {
        name: "Mindful Books",
        rating: 4.6,
        location: "Delhi",
        sales: 780,
        joined: "2023",
      },
      description: "A guide to mindfulness and mental wellness.",
      tags: ["Mindfulness", "Wellness", "Self-Help"],
      inStock: true,
      featured: false,
      discount: 39,
      published: "2024",
      pages: 280,
      language: "English",
    },
    {
      id: 10,
      title: "History of Ancient India",
      author: "Prof. S. Kumar",
      price: 18.99,
      originalPrice: 34.99,
      category: "academic",
      condition: "new",
      rating: 4.6,
      reviews: 89,
      image: "🏛️",
      seller: {
        name: "Academic Hub",
        rating: 4.7,
        location: "Chennai",
        sales: 540,
        joined: "2022",
      },
      description: "A comprehensive history of ancient Indian civilization.",
      tags: ["History", "India", "Academic"],
      inStock: true,
      featured: false,
      discount: 46,
      published: "2024",
      pages: 600,
      language: "English",
    },
    {
      id: 11,
      title: "The Poetry of Love",
      author: "Amanda Rose",
      price: 8.99,
      originalPrice: 14.99,
      category: "fiction",
      condition: "good",
      rating: 4.8,
      reviews: 256,
      image: "❤️",
      seller: {
        name: "Poetry Corner",
        rating: 4.5,
        location: "Jaipur",
        sales: 980,
        joined: "2023",
      },
      description: "A beautiful collection of love poems for the soul.",
      tags: ["Poetry", "Love", "Romance"],
      inStock: true,
      featured: false,
      discount: 40,
      published: "2023",
      pages: 180,
      language: "English",
    },
    {
      id: 12,
      title: "Science for Everyone",
      author: "Dr. Neil Parker",
      price: 15.99,
      originalPrice: 25.99,
      category: "nonfiction",
      condition: "like-new",
      rating: 4.9,
      reviews: 312,
      image: "🔭",
      seller: {
        name: "Science Books",
        rating: 4.9,
        location: "Bangalore",
        sales: 1900,
        joined: "2021",
      },
      description: "Making science accessible and fun for everyone.",
      tags: ["Science", "Education", "Popular Science"],
      inStock: true,
      featured: true,
      discount: 38,
      published: "2024",
      pages: 400,
      language: "English",
    },
  ];

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesCondition = selectedCondition === "all" || book.condition === selectedCondition;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchesCategory && matchesCondition && matchesSearch && matchesPrice;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "popular") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return parseInt(b.published) - parseInt(a.published);
    if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  // Cart functions
  const addToCart = (book) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) {
        return prev.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === bookId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Wishlist functions
  const toggleWishlist = (bookId) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`bookqubit-marketplace-page ${theme.background?.page || "bg-gray-50 dark:bg-gray-900"}`}
      style={{ fontFamily: currentFont?.family }}
    >
      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <div className="marketplace-cart-sidebar">
          <div className="marketplace-cart-header">
            <h3>Shopping Cart</h3>
            <span>{totalItems} items</span>
            <button className="marketplace-cart-close" onClick={() => setCart([])}>
              <FiX />
            </button>
          </div>
          <div className="marketplace-cart-items">
            {cart.map(item => (
              <div key={item.id} className="marketplace-cart-item">
                <span className="marketplace-cart-item-icon">{item.image}</span>
                <div className="marketplace-cart-item-info">
                  <h4>{item.title}</h4>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="marketplace-cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <FiPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="marketplace-cart-footer">
            <div className="marketplace-cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="marketplace-cart-checkout">
              Checkout <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="marketplace-hero">
        <div className="marketplace-hero-container">
          <div className="marketplace-hero-content">
            <span className="marketplace-hero-badge">🛍️ BookQubit Marketplace</span>
            <h1 className="marketplace-hero-title">
              Buy & Sell <span className="marketplace-hero-highlight">Books</span>
            </h1>
            <p className="marketplace-hero-desc">
              Discover thousands of new and used books. Find rare gems, bestsellers, and academic books at the best prices.
            </p>
            <div className="marketplace-hero-search">
              <FiSearch className="marketplace-hero-search-icon" />
              <input
                type="text"
                placeholder="Search for books, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`marketplace-hero-search-input ${theme.background?.input || "bg-white dark:bg-gray-800"}`}
              />
              <button className="marketplace-hero-search-btn">Search</button>
            </div>
          </div>
          <div className="marketplace-hero-stats">
            <div className="marketplace-hero-stat">
              <span className="marketplace-hero-stat-value">2,500+</span>
              <span className="marketplace-hero-stat-label">Books Available</span>
            </div>
            <div className="marketplace-hero-stat">
              <span className="marketplace-hero-stat-value">500+</span>
              <span className="marketplace-hero-stat-label">Sellers</span>
            </div>
            <div className="marketplace-hero-stat">
              <span className="marketplace-hero-stat-value">98%</span>
              <span className="marketplace-hero-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="marketplace-categories">
        <div className="marketplace-categories-container">
          <div className="marketplace-categories-scroll">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`marketplace-category-btn ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span>{category.icon}</span>
                {category.name}
                <span className="marketplace-category-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Sorting */}
      <section className="marketplace-controls">
        <div className="marketplace-controls-container">
          <div className="marketplace-controls-left">
            <button
              className="marketplace-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
            <div className="marketplace-view-toggle">
              <button
                className={`marketplace-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FiGrid />
              </button>
              <button
                className={`marketplace-view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <FiList />
              </button>
            </div>
          </div>
          <div className="marketplace-controls-right">
            <span className="marketplace-results-count">{filteredBooks.length} results</span>
            <select
              className={`marketplace-sort-select ${theme.background?.input || "bg-white dark:bg-gray-800"}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className={`marketplace-filters-panel ${theme.background?.card || "bg-white dark:bg-gray-800"}`}>
          <div className="marketplace-filters-header">
            <h3>Filters</h3>
            <button className="marketplace-filters-close" onClick={() => setShowFilters(false)}>
              <FiX />
            </button>
          </div>
          <div className="marketplace-filters-grid">
            <div className="marketplace-filter-group">
              <h4>Condition</h4>
              {conditions.map((condition) => (
                <label key={condition.id} className="marketplace-filter-label">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === condition.id}
                    onChange={() => setSelectedCondition(condition.id)}
                  />
                  {condition.name}
                </label>
              ))}
            </div>
            <div className="marketplace-filter-group">
              <h4>Price Range</h4>
              <div className="marketplace-price-range">
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <div className="marketplace-price-labels">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="marketplace-filter-group">
              <h4>Quick Filters</h4>
              <button 
                className="marketplace-quick-filter"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCondition("all");
                  setPriceRange([0, 150]);
                }}
              >
                Reset All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Books Grid */}
      <section className="marketplace-books">
        <div className="marketplace-books-container">
          {filteredBooks.length === 0 ? (
            <div className="marketplace-no-results">
              <p>No books found matching your criteria.</p>
              <button onClick={() => {
                setSelectedCategory("all");
                setSelectedCondition("all");
                setPriceRange([0, 150]);
                setSearchQuery("");
              }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`marketplace-books-grid ${viewMode === "list" ? "list-view" : ""}`}>
              {sortedBooks.map((book) => (
                <div
                  key={book.id}
                  className={`marketplace-book-card ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
                >
                  <div className="marketplace-book-card-inner">
                    <div className="marketplace-book-image">
                      <span className="marketplace-book-emoji">{book.image}</span>
                      {book.discount > 0 && (
                        <span className="marketplace-book-discount">-{book.discount}%</span>
                      )}
                      <button
                        className="marketplace-book-wishlist"
                        onClick={() => toggleWishlist(book.id)}
                      >
                        <FiHeart className={wishlist.includes(book.id) ? "filled" : ""} />
                      </button>
                    </div>
                    <div className="marketplace-book-info">
                      <h3 className="marketplace-book-title">{book.title}</h3>
                      <p className="marketplace-book-author">by {book.author}</p>
                      <div className="marketplace-book-rating">
                        <FiStar className="filled" />
                        <span>{book.rating}</span>
                        <span className="marketplace-book-reviews">({book.reviews} reviews)</span>
                      </div>
                      <div className="marketplace-book-meta">
                        <span className="marketplace-book-condition">
                          {book.condition === "new" && "📦 New"}
                          {book.condition === "like-new" && "✨ Like New"}
                          {book.condition === "good" && "👍 Good"}
                          {book.condition === "acceptable" && "📖 Acceptable"}
                        </span>
                        <span className="marketplace-book-location">
                          <FiMapPin /> {book.seller.location}
                        </span>
                      </div>
                      <div className="marketplace-book-price">
                        <span className="marketplace-book-current-price">${book.price.toFixed(2)}</span>
                        {book.originalPrice > book.price && (
                          <span className="marketplace-book-original-price">${book.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="marketplace-book-actions">
                        <button 
                          className="marketplace-book-cart-btn"
                          onClick={() => addToCart(book)}
                        >
                          <FiShoppingCart /> Add to Cart
                        </button>
                        <button 
                          className="marketplace-book-detail-btn"
                          onClick={() => setSelectedBook(book)}
                        >
                          <FiEye /> View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="marketplace-modal-overlay" onClick={() => setSelectedBook(null)}>
          <div
            className={`marketplace-modal ${theme.background?.card || "bg-white dark:bg-gray-800"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="marketplace-modal-close" onClick={() => setSelectedBook(null)}>
              <FiX />
            </button>
            <div className="marketplace-modal-content">
              <div className="marketplace-modal-image">
                <span className="marketplace-modal-emoji">{selectedBook.image}</span>
              </div>
              <div className="marketplace-modal-info">
                <h2 className="marketplace-modal-title">{selectedBook.title}</h2>
                <p className="marketplace-modal-author">by {selectedBook.author}</p>
                <div className="marketplace-modal-rating">
                  <FiStar className="filled" />
                  <span>{selectedBook.rating}</span>
                  <span className="marketplace-modal-reviews">({selectedBook.reviews} reviews)</span>
                </div>
                <div className="marketplace-modal-price">
                  <span className="marketplace-modal-current">${selectedBook.price.toFixed(2)}</span>
                  {selectedBook.originalPrice > selectedBook.price && (
                    <span className="marketplace-modal-original">${selectedBook.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <p className="marketplace-modal-desc">{selectedBook.description}</p>
                <div className="marketplace-modal-details">
                  <div className="marketplace-modal-detail">
                    <span className="marketplace-modal-detail-label">Published</span>
                    <span>{selectedBook.published}</span>
                  </div>
                  <div className="marketplace-modal-detail">
                    <span className="marketplace-modal-detail-label">Pages</span>
                    <span>{selectedBook.pages}</span>
                  </div>
                  <div className="marketplace-modal-detail">
                    <span className="marketplace-modal-detail-label">Language</span>
                    <span>{selectedBook.language}</span>
                  </div>
                  <div className="marketplace-modal-detail">
                    <span className="marketplace-modal-detail-label">Condition</span>
                    <span>{selectedBook.condition}</span>
                  </div>
                </div>
                <div className="marketplace-modal-tags">
                  {selectedBook.tags.map((tag, index) => (
                    <span key={index} className="marketplace-modal-tag">{tag}</span>
                  ))}
                </div>
                <div className="marketplace-modal-seller">
                  <div className="marketplace-modal-seller-info">
                    <FiUser />
                    <div>
                      <strong>{selectedBook.seller.name}</strong>
                      <p>{selectedBook.seller.location} • {selectedBook.seller.sales} sales</p>
                    </div>
                  </div>
                  <div className="marketplace-modal-seller-rating">
                    <FiStar className="filled" /> {selectedBook.seller.rating}
                  </div>
                </div>
                <div className="marketplace-modal-actions">
                  <button 
                    className="marketplace-modal-add-cart"
                    onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                    }}
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button 
                    className="marketplace-modal-buy-now"
                    onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                    }}
                  >
                    Buy Now <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="marketplace-cta">
        <div
          className="marketplace-cta-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <div className="marketplace-cta-content">
            <h2 className="marketplace-cta-title">Sell Your Books on BookQubit</h2>
            <p className="marketplace-cta-desc">
              Join thousands of sellers and reach millions of readers. List your books for free today!
            </p>
            <div className="marketplace-cta-buttons">
              <Link href={`/${language}/bookqubit-marketplace/sell`} className="marketplace-cta-btn-primary">
                Start Selling <FiArrowRight />
              </Link>
              <Link href={`/${language}/bookqubit-marketplace/faq`} className="marketplace-cta-btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookqubitMarketplacePage;