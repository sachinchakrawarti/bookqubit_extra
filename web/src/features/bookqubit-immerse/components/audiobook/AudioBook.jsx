// src/features/bookqubit-immerse/components/audiobook/AudioBook.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import FloatingAudioPlayer from "./components/FloatingAudioPlayer";
import AudioBookSearch from "./components/AudioBookSearch";
import AudioBookFilters from "./components/AudioBookFilters";
import AudioBookCard from "./components/AudioBookCard";
import NowPlayingBanner from "./components/NowPlayingBanner";
import ChapterList from "./components/ChapterList";
import "./AudioBook.css";

// Sample audiobook data
const sampleAudiobooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    narrator: "Jake Gyllenhaal",
    duration: "8h 30m",
    durationSeconds: 30600,
    rating: 4.5,
    chapters: 12,
    category: "Classic",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/great-gatsby.mp3",
    description: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    publishYear: 1925,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    narrator: "Simon Prebble",
    duration: "6h 45m",
    durationSeconds: 24300,
    rating: 4.8,
    chapters: 10,
    category: "Dystopian",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/1984.mp3",
    description: "A dystopian social science fiction novel and cautionary tale.",
    publishYear: 1949,
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    narrator: "Derek Perkins",
    duration: "15h 20m",
    durationSeconds: 55200,
    rating: 4.9,
    chapters: 20,
    category: "Non-fiction",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/sapiens.mp3",
    description: "A brief history of humankind, from the Stone Age to the 21st century.",
    publishYear: 2011,
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    narrator: "Jeremy Irons",
    duration: "5h 15m",
    durationSeconds: 18900,
    rating: 4.6,
    chapters: 8,
    category: "Fiction",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/alchemist.mp3",
    description: "A philosophical story about a young shepherd on a journey to find his personal legend.",
    publishYear: 1988,
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick",
    duration: "21h 10m",
    durationSeconds: 76200,
    rating: 4.7,
    chapters: 25,
    category: "Science Fiction",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/dune.mp3",
    description: "Set in the distant future, a young man fights to save the desert planet Arrakis.",
    publishYear: 1965,
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    narrator: "Andy Serkis",
    duration: "10h 25m",
    durationSeconds: 37500,
    rating: 4.8,
    chapters: 19,
    category: "Fantasy",
    cover: "/placeholder-book.jpg",
    audioUrl: "/audio/hobbit.mp3",
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    publishYear: 1937,
  },
];

const AudioBook = () => {
  // State
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [showChapters, setShowChapters] = useState(false);
  const [error, setError] = useState(null);

  // Audio player state
  const [currentBook, setCurrentBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [progress, setProgress] = useState({});
  const audioRef = React.useRef(null);
  const animationRef = React.useRef(null);

  // Load audiobooks
  useEffect(() => {
    const loadAudiobooks = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAudiobooks(sampleAudiobooks);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadAudiobooks();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(audiobooks.map(book => book.category))];

  // Filter books
  const filteredBooks = audiobooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.narrator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get chapters for a book
  const getChapters = useCallback((bookId) => {
    const book = audiobooks.find(b => b.id === bookId);
    if (!book) return [];
    return Array.from({ length: book.chapters }, (_, i) => 
      `Chapter ${i + 1}`
    );
  }, [audiobooks]);

  // Update progress animation
  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      
      if (currentBook) {
        setProgress(prev => ({
          ...prev,
          [currentBook.id]: audioRef.current.currentTime
        }));
      }
    }
    animationRef.current = requestAnimationFrame(updateProgress);
  }, [currentBook]);

  // Play book
  const playBook = useCallback((book) => {
    setCurrentBook(book);
    setIsPlayerVisible(true);
    setIsPlaying(true);
    
    if (audioRef.current && book.audioUrl) {
      audioRef.current.src = book.audioUrl;
      audioRef.current.load();
      audioRef.current.play();
    }
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 5);
    });
  }, []);

  // Pause
  const pauseBook = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // Toggle play
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseBook();
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [isPlaying, pauseBook]);

  // Seek
  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Set volume
  const setVolumeLevel = useCallback((value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  }, []);

  // Set speed
  const setSpeedLevel = useCallback((value) => {
    setSpeed(value);
    if (audioRef.current) {
      audioRef.current.playbackRate = value;
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  // Play next
  const playNext = useCallback(() => {
    if (!currentBook) return;
    const currentIndex = audiobooks.findIndex(b => b.id === currentBook.id);
    if (currentIndex < audiobooks.length - 1) {
      playBook(audiobooks[currentIndex + 1]);
    }
  }, [currentBook, audiobooks, playBook]);

  // Play previous
  const playPrevious = useCallback(() => {
    if (!currentBook) return;
    const currentIndex = audiobooks.findIndex(b => b.id === currentBook.id);
    if (currentIndex > 0) {
      playBook(audiobooks[currentIndex - 1]);
    }
  }, [currentBook, audiobooks, playBook]);

  // Get progress percentage
  const getProgressPercentage = useCallback((bookId) => {
    if (bookId && progress[bookId] !== undefined) {
      const book = audiobooks.find(b => b.id === bookId);
      const total = book?.durationSeconds || 1;
      return Math.min((progress[bookId] / total) * 100, 100);
    }
    if (currentBook && progress[currentBook.id] !== undefined) {
      const total = currentBook.durationSeconds || 1;
      return Math.min((progress[currentBook.id] / total) * 100, 100);
    }
    return 0;
  }, [currentBook, progress, audiobooks]);

  // Format time
  const formatTime = useCallback((seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Handle close player
  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
    pauseBook();
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [playNext]);

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, updateProgress]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (isPlayerVisible) togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (isPlayerVisible && audioRef.current) {
            audioRef.current.currentTime += 10;
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (isPlayerVisible && audioRef.current) {
            audioRef.current.currentTime -= 10;
          }
          break;
        case "KeyM":
          if (isPlayerVisible) toggleMute();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isPlayerVisible, togglePlay, toggleMute]);

  return (
    <div className="audiobook-container">
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Header */}
      <div className="audiobook-header">
        <div className="audiobook-header-left">
          <h2 className="audiobook-title">Audio Books</h2>
          <p className="audiobook-subtitle">Immerse yourself in your favorite stories</p>
        </div>
        <div className="audiobook-header-right">
          {recentlyPlayed.length > 0 && (
            <div className="recently-played">
              <span className="recent-label">Recently Played</span>
              <div className="recent-avatars">
                {recentlyPlayed.slice(0, 3).map((book) => (
                  <div 
                    key={book.id}
                    className="recent-avatar"
                    onClick={() => playBook(book)}
                    title={book.title}
                  >
                    <div className="recent-avatar-placeholder"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <AudioBookSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultCount={filteredBooks.length}
        placeholder="Search audiobooks by title, author, or narrator..."
      />

      {/* Filters */}
      <AudioBookFilters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Now Playing Banner */}
      {isPlayerVisible && currentBook && (
        <NowPlayingBanner
          book={currentBook}
          isPlaying={isPlaying}
          progress={getProgressPercentage()}
          duration={formatTime(duration)}
          currentTime={formatTime(currentTime)}
          onTogglePlay={togglePlay}
          onClose={handleClosePlayer}
          onShowChapters={() => setShowChapters(!showChapters)}
        />
      )}

      {/* Book Grid */}
      <div className="audiobook-grid">
        {loading ? (
          // Loading skeletons
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="loading-card">
                <div className="loading-cover"></div>
                <div className="loading-info">
                  <div className="loading-title"></div>
                  <div className="loading-author"></div>
                  <div className="loading-meta"></div>
                </div>
              </div>
            ))}
          </>
        ) : error ? (
          <div className="error-state">
            <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3>Something went wrong</h3>
            <p>{error.message || "Failed to load audiobooks"}</p>
            <button 
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <AudioBookCard
              key={book.id}
              book={book}
              isPlaying={currentBook?.id === book.id && isPlaying}
              progress={getProgressPercentage(book.id)}
              onSelect={() => playBook(book)}
              onPlayToggle={() => {
                if (currentBook?.id === book.id) {
                  togglePlay();
                } else {
                  playBook(book);
                }
              }}
            />
          ))
        ) : (
          <div className="no-results">
            <svg className="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728M5.586 8.464a5 5 0 011.414-1.414m2.828 9.9a9 9 0 012.728 2.728" />
            </svg>
            <h3>No audiobooks found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Chapter List Modal */}
      {showChapters && currentBook && (
        <ChapterList
          chapters={getChapters(currentBook.id)}
          currentChapter={0}
          onClose={() => setShowChapters(false)}
          onSelectChapter={(chapterIndex) => {
            // Handle chapter selection
            console.log("Selected chapter:", chapterIndex);
            setShowChapters(false);
          }}
          bookTitle={currentBook.title}
          bookCover={currentBook.cover}
          totalDuration={currentBook.durationSeconds}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlayChapter={(chapterIndex) => {
            // Play from specific chapter
            const timePerChapter = currentBook.durationSeconds / currentBook.chapters;
            seekTo(chapterIndex * timePerChapter);
            if (!isPlaying) togglePlay();
            setShowChapters(false);
          }}
        />
      )}

      {/* Floating Audio Player */}
      {isPlayerVisible && currentBook && (
        <FloatingAudioPlayer
          audioSrc={currentBook.audioUrl}
          bookTitle={currentBook.title}
          bookAuthor={currentBook.author}
          bookCover={currentBook.cover}
          chapters={getChapters(currentBook.id)}
          currentChapter={0}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          speed={speed}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onSeek={seekTo}
          onVolumeChange={setVolumeLevel}
          onSpeedChange={setSpeedLevel}
          onToggleMute={toggleMute}
          onNext={playNext}
          onPrevious={playPrevious}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default AudioBook;