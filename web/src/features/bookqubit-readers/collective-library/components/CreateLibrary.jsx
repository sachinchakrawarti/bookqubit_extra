"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiSearch,
  FiBookOpen,
  FiTag,
  FiLock,
  FiGlobe,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";
import "../collectivelibrary.css";

export default function CreateLibrary({ onClose, onSuccess }) {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    cover: null,
    visibility: "public",
    tags: [],
    books: [],
  });

  const [bookSearch, setBookSearch] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock books for search
  const availableBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 6,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 7,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
    {
      id: 8,
      title: "Mistborn",
      author: "Brandon Sanderson",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
    },
  ];

  const categories = [
    "Classics",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Horror",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Poetry",
    "Young Adult",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Library name is required";
    if (formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.books.length === 0) newErrors.books = "Add at least one book";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newLibrary = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        stats: {
          likes: 0,
          saves: 0,
          views: 0,
          shares: 0,
          members: 1,
        },
        owner: {
          id: 1,
          name: "You",
          avatar:
            "https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff",
          username: "your_username",
        },
        isFeatured: false,
        isPublic: formData.visibility === "public",
      };

      if (onSuccess) {
        onSuccess(newLibrary);
      } else {
        router.push(`/collective/${newLibrary.id}`);
      }
    } catch (error) {
      console.error("Error creating library:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = (book) => {
    if (!formData.books.find((b) => b.id === book.id)) {
      setFormData({ ...formData, books: [...formData.books, book] });
      setBookSearch("");
    }
  };

  const handleRemoveBook = (bookId) => {
    setFormData({
      ...formData,
      books: formData.books.filter((b) => b.id !== bookId),
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const filteredBooks = availableBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(bookSearch.toLowerCase()),
  );

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`create-library-modal ${isDarkMode ? "dark" : ""}`}
    >
      <div className="create-library-content">
        {/* Header */}
        <div className="cl-modal-header">
          <h2 className="cl-modal-title">📚 Start a Collective</h2>
          <button className="cl-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Steps */}
        <div className="cl-steps">
          <div className={`cl-step ${step >= 1 ? "active" : ""}`}>
            <span className="cl-step-number">1</span>
            <span className="cl-step-label">Details</span>
          </div>
          <div className={`cl-step ${step >= 2 ? "active" : ""}`}>
            <span className="cl-step-number">2</span>
            <span className="cl-step-label">Books</span>
          </div>
          <div className={`cl-step ${step >= 3 ? "active" : ""}`}>
            <span className="cl-step-number">3</span>
            <span className="cl-step-label">Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="cl-form-step">
              <div className="cl-form-group">
                <label className="cl-form-label">
                  Library Name <span className="cl-form-required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a name for your library..."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`cl-form-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <span className="cl-form-error">{errors.name}</span>
                )}
              </div>

              <div className="cl-form-group">
                <label className="cl-form-label">
                  Description <span className="cl-form-required">*</span>
                </label>
                <textarea
                  placeholder="Describe what your library is about..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description)
                      setErrors({ ...errors, description: null });
                  }}
                  className={`cl-form-textarea ${errors.description ? "error" : ""}`}
                  rows="4"
                />
                <div className="cl-form-char-count">
                  {formData.description.length}/500
                </div>
                {errors.description && (
                  <span className="cl-form-error">{errors.description}</span>
                )}
              </div>

              <div className="cl-form-row">
                <div className="cl-form-group">
                  <label className="cl-form-label">
                    Category <span className="cl-form-required">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      if (errors.category)
                        setErrors({ ...errors, category: null });
                    }}
                    className={`cl-form-select ${errors.category ? "error" : ""}`}
                  >
                    <option value="">Select a category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="cl-form-error">{errors.category}</span>
                  )}
                </div>

                <div className="cl-form-group">
                  <label className="cl-form-label">Cover Image</label>
                  <div className="cl-form-upload">
                    <FiUpload />
                    <span>Upload cover image</span>
                    <input type="file" accept="image/*" />
                  </div>
                </div>
              </div>

              <div className="cl-form-group">
                <label className="cl-form-label">Tags</label>
                <div className="cl-form-tags-input">
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="cl-form-input"
                  />
                  <button
                    type="button"
                    className="cl-form-tag-add"
                    onClick={handleAddTag}
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="cl-form-tags">
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="cl-form-tag">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="cl-form-group">
                <label className="cl-form-label">Visibility</label>
                <div className="cl-form-visibility">
                  <button
                    type="button"
                    className={`cl-visibility-btn ${formData.visibility === "public" ? "active" : ""}`}
                    onClick={() =>
                      setFormData({ ...formData, visibility: "public" })
                    }
                  >
                    <FiGlobe /> Public
                    <span>Anyone can see and join</span>
                  </button>
                  <button
                    type="button"
                    className={`cl-visibility-btn ${formData.visibility === "private" ? "active" : ""}`}
                    onClick={() =>
                      setFormData({ ...formData, visibility: "private" })
                    }
                  >
                    <FiLock /> Private
                    <span>Only you can see</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Books */}
          {step === 2 && (
            <div className="cl-form-step">
              <div className="cl-form-group">
                <label className="cl-form-label">
                  Add Books <span className="cl-form-required">*</span>
                </label>
                <div className="cl-book-search">
                  <FiSearch className="cl-book-search-icon" />
                  <input
                    type="text"
                    placeholder="Search books by title or author..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="cl-form-input"
                  />
                </div>
                {bookSearch && (
                  <div className="cl-book-search-results">
                    {filteredBooks.map((book) => (
                      <div
                        key={book.id}
                        className="cl-book-result"
                        onClick={() => handleAddBook(book)}
                      >
                        <img src={book.cover} alt={book.title} />
                        <div>
                          <strong>{book.title}</strong>
                          <span>{book.author}</span>
                        </div>
                        <button type="button" className="cl-book-add">
                          <FiPlus />
                        </button>
                      </div>
                    ))}
                    {filteredBooks.length === 0 && (
                      <div className="cl-book-no-results">
                        <p>No books found. Try a different search.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="cl-form-group">
                <label className="cl-form-label">
                  Selected Books ({formData.books.length})
                </label>
                <div className="cl-selected-books">
                  {formData.books.map((book) => (
                    <div key={book.id} className="cl-selected-book">
                      <img src={book.cover} alt={book.title} />
                      <div>
                        <strong>{book.title}</strong>
                        <span>{book.author}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveBook(book.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  {formData.books.length === 0 && (
                    <div className="cl-no-books">
                      <FiBookOpen />
                      <p>No books added yet</p>
                      <span>Search and add books to your library</span>
                    </div>
                  )}
                </div>
                {errors.books && (
                  <span className="cl-form-error">{errors.books}</span>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="cl-form-step">
              <div className="cl-review">
                <div className="cl-review-section">
                  <h3>📖 Library Details</h3>
                  <div className="cl-review-item">
                    <span>Name</span>
                    <strong>{formData.name}</strong>
                  </div>
                  <div className="cl-review-item">
                    <span>Description</span>
                    <p>{formData.description}</p>
                  </div>
                  <div className="cl-review-item">
                    <span>Category</span>
                    <strong>{formData.category}</strong>
                  </div>
                  <div className="cl-review-item">
                    <span>Visibility</span>
                    <strong>{formData.visibility}</strong>
                  </div>
                  <div className="cl-review-item">
                    <span>Tags</span>
                    <div className="cl-review-tags">
                      {formData.tags.map((tag, idx) => (
                        <span key={idx}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="cl-review-section">
                  <h3>📚 Books ({formData.books.length})</h3>
                  <div className="cl-review-books">
                    {formData.books.map((book) => (
                      <div key={book.id} className="cl-review-book">
                        <img src={book.cover} alt={book.title} />
                        <div>
                          <strong>{book.title}</strong>
                          <span>{book.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="cl-form-actions">
            {step > 1 && (
              <button
                type="button"
                className="cl-btn cl-btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="cl-btn cl-btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="cl-btn cl-btn-success"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Library"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
