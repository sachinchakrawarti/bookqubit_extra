// src/app/[lang]/(public)/testpage/page.jsx
// Author API Integration Test Page with Hindi Language Support

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// ============================================
// API BASE URL
// ============================================
const API_BASE_URL = "http://localhost:5000/api";

// ============================================
// HINDI TRANSLATIONS
// ============================================
const translations = {
  en: {
    title: "📚 Author Management",
    subtitle: "View, create, and manage authors in the BookQubit database.",
    totalAuthors: "Total Authors",
    featuredAuthors: "Featured Authors",
    averageRating: "Average Rating",
    totalBooks: "Total Books",
    searchPlaceholder: "Search authors...",
    allNationalities: "All Nationalities",
    newAuthor: "New Author",
    refresh: "Refresh",
    createNewAuthor: "✏️ Create New Author",
    name: "Name *",
    nationality: "Nationality",
    language: "Language",
    birthDate: "Birth Date",
    deathDate: "Death Date",
    bio: "Bio",
    createAuthor: "Create Author",
    cancel: "Cancel",
    noAuthors: "No authors found.",
    actions: "Actions",
    view: "View",
    delete: "Delete",
    restore: "Restore",
    close: "Close",
    author: "Author",
    languageLabel: "Language",
    rating: "Rating",
    books: "Books",
    selectLanguage: "Select Language",
  },
  hi: {
    title: "📚 लेखक प्रबंधन",
    subtitle: "बुकक्यूबिट डेटाबेस में लेखकों को देखें, बनाएं और प्रबंधित करें।",
    totalAuthors: "कुल लेखक",
    featuredAuthors: "विशेष लेखक",
    averageRating: "औसत रेटिंग",
    totalBooks: "कुल पुस्तकें",
    searchPlaceholder: "लेखक खोजें...",
    allNationalities: "सभी राष्ट्रीयताएँ",
    newAuthor: "नया लेखक",
    refresh: "ताज़ा करें",
    createNewAuthor: "✏️ नया लेखक बनाएं",
    name: "नाम *",
    nationality: "राष्ट्रीयता",
    language: "भाषा",
    birthDate: "जन्म तिथि",
    deathDate: "मृत्यु तिथि",
    bio: "जीवनी",
    createAuthor: "लेखक बनाएं",
    cancel: "रद्द करें",
    noAuthors: "कोई लेखक नहीं मिला।",
    actions: "कार्रवाई",
    view: "देखें",
    delete: "हटाएं",
    restore: "पुनर्स्थापित करें",
    close: "बंद करें",
    author: "लेखक",
    languageLabel: "भाषा",
    rating: "रेटिंग",
    books: "पुस्तकें",
    selectLanguage: "भाषा चुनें",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateHindi = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("hi-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    "⭐".repeat(fullStars) + (halfStar ? "✨" : "") + "☆".repeat(emptyStars)
  );
};

// ============================================
// LANGUAGE FLAGS
// ============================================
const languageFlags = {
  english: "🇬🇧",
  hindi: "🇮🇳",
  urdu: "🇵🇰",
  arabic: "🇸🇦",
  french: "🇫🇷",
  german: "🇩🇪",
  spanish: "🇪🇸",
  japanese: "🇯🇵",
  korean: "🇰🇷",
  chinese: "🇨🇳",
  russian: "🇷🇺",
  italian: "🇮🇹",
  portuguese: "🇵🇹",
  dutch: "🇳🇱",
  swedish: "🇸🇪",
  norwegian: "🇳🇴",
  danish: "🇩🇰",
  finnish: "🇫🇮",
  polish: "🇵🇱",
  turkish: "🇹🇷",
  vietnamese: "🇻🇳",
  thai: "🇹🇭",
  indonesian: "🇮🇩",
  malay: "🇲🇾",
  filipino: "🇵🇭",
  hebrew: "🇮🇱",
  greek: "🇬🇷",
  czech: "🇨🇿",
  hungarian: "🇭🇺",
  romanian: "🇷🇴",
  bulgarian: "🇧🇬",
  serbian: "🇷🇸",
  croatian: "🇭🇷",
  slovak: "🇸🇰",
  slovenian: "🇸🇮",
  estonian: "🇪🇪",
  latvian: "🇱🇻",
  lithuanian: "🇱🇹",
  icelandic: "🇮🇸",
  irish: "🇮🇪",
  welsh: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function TestPage() {
  const params = useParams();
  const lang = params?.lang || "en";
  const t = translations[lang] || translations.en;

  // State
  const [authors, setAuthors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNationality, setFilterNationality] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    bio: "",
    nationality: "",
    language_code: "english",
    birth_date: "",
    death_date: "",
    image_url: "",
  });

  // ============================================
  // FETCH AUTHORS
  // ============================================
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/authors?limit=50`);
      const result = await response.json();

      if (result.status === "success") {
        setAuthors(result.data.authors || []);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch authors");
      }
    } catch (err) {
      console.error("Error fetching authors:", err);
      setError("Failed to connect to API server");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FETCH STATS
  // ============================================
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/stats`);
      const result = await response.json();

      if (result.status === "success") {
        setStats(result.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // ============================================
  // FETCH AUTHOR DETAILS
  // ============================================
  const fetchAuthorDetails = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/${id}`);
      const result = await response.json();

      if (result.status === "success") {
        setSelectedAuthor(result.data);
      }
    } catch (err) {
      console.error("Error fetching author details:", err);
    }
  };

  // ============================================
  // CREATE AUTHOR
  // ============================================
  const createAuthor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      const result = await response.json();

      if (result.status === "success") {
        setIsCreating(false);
        setNewAuthor({
          name: "",
          bio: "",
          nationality: "",
          language_code: "english",
          birth_date: "",
          death_date: "",
          image_url: "",
        });
        await fetchAuthors();
        await fetchStats();
      } else {
        alert("Failed to create author: " + result.message);
      }
    } catch (err) {
      console.error("Error creating author:", err);
      alert("Failed to create author");
    }
  };

  // ============================================
  // DELETE AUTHOR
  // ============================================
  const deleteAuthor = async (id) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === "success") {
        await fetchAuthors();
        await fetchStats();
        setSelectedAuthor(null);
      } else {
        alert("Failed to delete author: " + result.message);
      }
    } catch (err) {
      console.error("Error deleting author:", err);
      alert("Failed to delete author");
    }
  };

  // ============================================
  // RESTORE AUTHOR
  // ============================================
  const restoreAuthor = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/${id}/restore`, {
        method: "POST",
      });

      const result = await response.json();

      if (result.status === "success") {
        await fetchAuthors();
        await fetchStats();
        setSelectedAuthor(null);
      } else {
        alert("Failed to restore author: " + result.message);
      }
    } catch (err) {
      console.error("Error restoring author:", err);
      alert("Failed to restore author");
    }
  };

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    fetchAuthors();
    fetchStats();
  }, []);

  // ============================================
  // FILTER AUTHORS
  // ============================================
  const filteredAuthors = authors.filter((author) => {
    const matchesSearch =
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (author.nationality &&
        author.nationality.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesNationality =
      filterNationality === "all" || author.nationality === filterNationality;
    return matchesSearch && matchesNationality;
  });

  // ============================================
  // GET UNIQUE NATIONALITIES
  // ============================================
  const nationalities = [
    "all",
    ...new Set(authors.map((a) => a.nationality).filter(Boolean)),
  ];

  // ============================================
  // GET LANGUAGE NAME
  // ============================================
  const getLanguageName = (code) => {
    const names = {
      english: "English",
      hindi: "हिन्दी",
      urdu: "اردو",
      arabic: "العربية",
      french: "Français",
      german: "Deutsch",
      spanish: "Español",
      japanese: "日本語",
      korean: "한국어",
      chinese: "中文",
      russian: "Русский",
      italian: "Italiano",
      portuguese: "Português",
      dutch: "Nederlands",
      swedish: "Svenska",
      norwegian: "Norsk",
      danish: "Dansk",
      finnish: "Suomi",
      polish: "Polski",
      turkish: "Türkçe",
      vietnamese: "Tiếng Việt",
      thai: "ไทย",
      indonesian: "Bahasa Indonesia",
      malay: "Bahasa Melayu",
      filipino: "Filipino",
      hebrew: "עברית",
      greek: "Ελληνικά",
      czech: "Čeština",
      hungarian: "Magyar",
      romanian: "Română",
      bulgarian: "Български",
      serbian: "Српски",
      croatian: "Hrvatski",
      slovak: "Slovenčina",
      slovenian: "Slovenščina",
      estonian: "Eesti",
      latvian: "Latviešu",
      lithuanian: "Lietuvių",
      icelandic: "Íslenska",
      irish: "Gaeilge",
      welsh: "Cymraeg",
    };
    return names[code] || code;
  };

  // ============================================
  // RENDER LOADING
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {lang === "hi" ? "लेखक लोड हो रहे हैं..." : "Loading authors..."}
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER MAIN
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ============================================
                LANGUAGE TOGGLE
                ============================================ */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md shadow-sm">
            <a
              href="/en/testpage"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                lang === "en"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              🇬🇧 English
            </a>
            <a
              href="/hi/testpage"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                lang === "hi"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              🇮🇳 हिन्दी
            </a>
          </div>
        </div>

        {/* ============================================
                HEADER
                ============================================ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </div>

        {/* ============================================
                STATISTICS CARDS
                ============================================ */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {t.totalAuthors}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.total_authors}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {t.featuredAuthors}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.featured_authors}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {t.averageRating}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.average_rating || 0} ⭐
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {t.totalBooks}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.total_books_published || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================
                CONTROLS
                ============================================ */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <select
                value={filterNationality}
                onChange={(e) => setFilterNationality(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t.allNationalities}</option>
                {nationalities
                  .filter((n) => n !== "all")
                  .map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
              </select>
            </div>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t.newAuthor}
            </button>

            <button
              onClick={() => {
                fetchAuthors();
                fetchStats();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ↻ {t.refresh}
            </button>
          </div>
        </div>

        {/* ============================================
                CREATE AUTHOR FORM
                ============================================ */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow p-6 mb-8 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-4">{t.createNewAuthor}</h3>
            <form
              onSubmit={createAuthor}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor.name}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={lang === "hi" ? "लेखक का नाम" : "Author name"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.nationality}
                </label>
                <input
                  type="text"
                  value={newAuthor.nationality}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, nationality: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={lang === "hi" ? "राष्ट्रीयता" : "Nationality"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.language}
                </label>
                <select
                  value={newAuthor.language_code}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      language_code: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="english">English 🇬🇧</option>
                  <option value="hindi">हिन्दी 🇮🇳</option>
                  <option value="urdu">اردو 🇵🇰</option>
                  <option value="arabic">العربية 🇸🇦</option>
                  <option value="french">Français 🇫🇷</option>
                  <option value="german">Deutsch 🇩🇪</option>
                  <option value="spanish">Español 🇪🇸</option>
                  <option value="japanese">日本語 🇯🇵</option>
                  <option value="korean">한국어 🇰🇷</option>
                  <option value="chinese">中文 🇨🇳</option>
                  <option value="russian">Русский 🇷🇺</option>
                  <option value="italian">Italiano 🇮🇹</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.birthDate}
                </label>
                <input
                  type="date"
                  value={newAuthor.birth_date}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, birth_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.deathDate}
                </label>
                <input
                  type="date"
                  value={newAuthor.death_date}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, death_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.bio}
                </label>
                <textarea
                  rows="3"
                  value={newAuthor.bio}
                  onChange={(e) =>
                    setNewAuthor({ ...newAuthor, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    lang === "hi" ? "लेखक की जीवनी" : "Author biography"
                  }
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.createAuthor}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================
                AUTHORS TABLE
                ============================================ */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.author}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.nationality}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.languageLabel}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.rating}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.books}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAuthors.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      {t.noAuthors}{" "}
                      {searchTerm &&
                        (lang === "hi"
                          ? "अपनी खोज समायोजित करें।"
                          : "Try adjusting your search.")}
                    </td>
                  </tr>
                ) : (
                  filteredAuthors.map((author) => (
                    <tr
                      key={author.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {author.image_url ? (
                            <img
                              src={author.image_url}
                              alt={author.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {author.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {author.name}
                              {/* Hindi translation if available */}
                              {author.translations &&
                                author.translations.length > 0 &&
                                lang === "hi" && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    (
                                    {author.translations.find(
                                      (t) => t.language_code === "hindi",
                                    )?.name || ""}
                                    )
                                  </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {author.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {author.nationality || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          {languageFlags[author.language_code] || "🌐"}
                          {getLanguageName(author.language_code)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-1">
                            {author.rating || 0}
                          </span>
                          <span className="text-sm text-gray-400">
                            {getRatingStars(author.rating || 0)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {author.total_books || author.published_books || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => fetchAuthorDetails(author.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {t.view}
                          </button>
                          <button
                            onClick={() => deleteAuthor(author.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            {t.delete}
                          </button>
                          {author.deleted_at && (
                            <button
                              onClick={() => restoreAuthor(author.id)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              {t.restore}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================
                AUTHOR DETAILS MODAL
                ============================================ */}
        {selectedAuthor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedAuthor.name}
                    {lang === "hi" && selectedAuthor.translations && (
                      <span className="ml-2 text-lg font-normal text-gray-500">
                        (
                        {selectedAuthor.translations.find(
                          (t) => t.language_code === "hindi",
                        )?.name || ""}
                        )
                      </span>
                    )}
                  </h2>
                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{t.nationality}</p>
                    <p className="font-medium">
                      {selectedAuthor.nationality || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.languageLabel}</p>
                    <p className="font-medium flex items-center gap-1">
                      {languageFlags[selectedAuthor.language_code] || "🌐"}
                      {getLanguageName(selectedAuthor.language_code)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.rating}</p>
                    <p className="font-medium">
                      {selectedAuthor.rating || 0} ⭐{" "}
                      {getRatingStars(selectedAuthor.rating || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.books}</p>
                    <p className="font-medium">
                      {selectedAuthor.total_books ||
                        selectedAuthor.published_books ||
                        0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.birthDate}</p>
                    <p className="font-medium">
                      {lang === "hi"
                        ? formatDateHindi(selectedAuthor.birth_date)
                        : formatDate(selectedAuthor.birth_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.deathDate}</p>
                    <p className="font-medium">
                      {lang === "hi"
                        ? formatDateHindi(selectedAuthor.death_date)
                        : formatDate(selectedAuthor.death_date)}
                    </p>
                  </div>
                </div>

                {selectedAuthor.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">{t.bio}</p>
                    <p className="text-gray-700 mt-1">{selectedAuthor.bio}</p>
                  </div>
                )}

                {/* Hindi Translation */}
                {lang === "hi" && selectedAuthor.translations && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 font-medium">
                      हिन्दी अनुवाद
                    </p>
                    {selectedAuthor.translations
                      .filter((t) => t.language_code === "hindi")
                      .map((trans, idx) => (
                        <div key={idx} className="mt-2">
                          <p className="text-gray-700 font-medium">
                            {trans.name}
                          </p>
                          {trans.bio && (
                            <p className="text-gray-600 text-sm mt-1">
                              {trans.bio}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
