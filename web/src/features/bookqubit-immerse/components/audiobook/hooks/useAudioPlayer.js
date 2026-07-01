// src/features/bookqubit-immerse/components/audiobook/hooks/useAudioPlayer.js
"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const useAudioPlayer = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [progress, setProgress] = useState({});

  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // Update progress
  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      
      // Update progress tracking
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
    
    // If we have an audio element, load and play
    if (audioRef.current && book.audioUrl) {
      audioRef.current.src = book.audioUrl;
      audioRef.current.load();
      audioRef.current.play();
    }
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
  const playNext = useCallback((books) => {
    if (!currentBook || !books) return;
    const currentIndex = books.findIndex(b => b.id === currentBook.id);
    if (currentIndex < books.length - 1) {
      playBook(books[currentIndex + 1]);
    }
  }, [currentBook, playBook]);

  // Play previous
  const playPrevious = useCallback((books) => {
    if (!currentBook || !books) return;
    const currentIndex = books.findIndex(b => b.id === currentBook.id);
    if (currentIndex > 0) {
      playBook(books[currentIndex - 1]);
    }
  }, [currentBook, playBook]);

  // Get progress percentage
  const getProgressPercentage = useCallback((bookId) => {
    if (bookId && progress[bookId] !== undefined) {
      const book = currentBook?.id === bookId ? currentBook : null;
      const total = book?.durationSeconds || 1;
      return Math.min((progress[bookId] / total) * 100, 100);
    }
    if (currentBook && progress[currentBook.id] !== undefined) {
      const total = currentBook.durationSeconds || 1;
      return Math.min((progress[currentBook.id] / total) * 100, 100);
    }
    return 0;
  }, [currentBook, progress]);

  // Format time
  const formatTime = useCallback((seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Cleanup
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, updateProgress]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next if available
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
  }, []);

  return {
    audioRef,
    currentBook,
    isPlaying,
    currentTime,
    duration,
    volume,
    speed,
    isMuted,
    isPlayerVisible,
    progress,
    playBook,
    pauseBook,
    togglePlay,
    seekTo,
    setVolume: setVolumeLevel,
    setSpeed: setSpeedLevel,
    toggleMute,
    playNext,
    playPrevious,
    setIsPlayerVisible,
    getProgressPercentage,
    formatTime,
  };
};

export default useAudioPlayer;