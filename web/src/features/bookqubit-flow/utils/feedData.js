// src/features/bookqubit-flow/components/utils/feedData.js

import { FaFire, FaStar, FaRocket, FaAward, FaCrown, FaGem } from "react-icons/fa";

export const FEED_TYPES = {
  FEATURED: "featured",
  TRENDING: "trending",
  COMMENTS: "comments",
  NEWS: "news",
  BLOGS: "blogs",
  REVIEWS: "reviews",
  UPDATES: "updates",
};

const sampleData = {
  featuredBooks: [
    { title: "The Midnight Library", author: "Matt Haig", category: "Fiction", rating: 4.7 },
    { title: "Project Hail Mary", author: "Andy Weir", category: "Sci-Fi", rating: 4.9 },
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", category: "Fiction", rating: 4.8 },
    { title: "Atomic Habits", author: "James Clear", category: "Self-Help", rating: 4.8 },
    { title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", rating: 4.6 },
  ],
  comments: [
    { user: "Sarah J.", text: "This book changed my life! Highly recommend to everyone.", likes: 45 },
    { user: "Mike R.", text: "A masterpiece of modern literature. The character development is incredible.", likes: 32 },
    { user: "Emma W.", text: "Couldn't put it down. Read it in one sitting!", likes: 28 },
    { user: "David K.", text: "Beautifully written with such depth and emotion.", likes: 19 },
  ],
  news: [
    { title: "New Release: The Future of Reading", source: "BookNews Daily", time: "2 hours ago" },
    { title: "Annual Book Awards 2024 Winners Announced", source: "Literary Times", time: "5 hours ago" },
    { title: "10 Books to Read Before Summer Ends", source: "ReadWell Magazine", time: "1 day ago" },
  ],
  blogs: [
    { title: "How Reading Changes Your Brain", author: "Dr. Jane Smith", readTime: "5 min read" },
    { title: "The Art of Storytelling in Modern Literature", author: "Prof. John Doe", readTime: "8 min read" },
    { title: "Why We Love Anti-Heroes", author: "Emily Chen", readTime: "6 min read" },
  ],
  reviews: [
    { user: "Alex P.", rating: 5, text: "Absolutely phenomenal! A must-read for everyone.", book: "The Midnight Library" },
    { user: "Maria S.", rating: 4, text: "Great book with some minor pacing issues.", book: "Project Hail Mary" },
    { user: "James L.", rating: 5, text: "One of the best books I've ever read.", book: "Atomic Habits" },
  ],
};

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const generateFeedItems = (page, limit = 10) => {
  const items = [];
  const feedTypes = Object.values(FEED_TYPES);

  for (let i = 0; i < limit; i++) {
    const id = page * limit + i;
    const feedType = feedTypes[id % feedTypes.length];

    let item = {
      id,
      type: feedType,
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      isLiked: false,
    };

    switch (feedType) {
      case FEED_TYPES.FEATURED: {
        const book = getRandomItem(sampleData.featuredBooks);
        items.push({
          ...item,
          title: book.title,
          author: book.author,
          category: book.category,
          rating: book.rating,
          description: `A captivating ${book.category} book that has taken the literary world by storm.`,
          image: `/api/placeholder/120/180`,
          progress: Math.floor(Math.random() * 100),
          type: "featured",
        });
        break;
      }

      case FEED_TYPES.TRENDING: {
        const book = getRandomItem(sampleData.featuredBooks);
        items.push({
          ...item,
          title: book.title,
          author: book.author,
          category: book.category,
          rating: book.rating,
          trendScore: Math.floor(Math.random() * 1000),
          description: `Trending now! ${book.title} is gaining massive popularity.`,
          image: `/api/placeholder/120/180`,
          type: "trending",
        });
        break;
      }

      case FEED_TYPES.COMMENTS: {
        const comment = getRandomItem(sampleData.comments);
        const book = getRandomItem(sampleData.featuredBooks);
        items.push({
          ...item,
          user: comment.user,
          text: comment.text,
          bookTitle: book.title,
          likes: comment.likes,
          replies: Math.floor(Math.random() * 20),
          type: "comment",
        });
        break;
      }

      case FEED_TYPES.NEWS: {
        const news = getRandomItem(sampleData.news);
        items.push({
          ...item,
          title: news.title,
          source: news.source,
          time: news.time,
          excerpt: `Breaking news from ${news.source}: ${news.title.substring(0, 100)}...`,
          type: "news",
        });
        break;
      }

      case FEED_TYPES.BLOGS: {
        const blog = getRandomItem(sampleData.blogs);
        items.push({
          ...item,
          title: blog.title,
          author: blog.author,
          readTime: blog.readTime,
          excerpt: `A deep dive into ${blog.title.toLowerCase()} by ${blog.author}`,
          type: "blog",
        });
        break;
      }

      case FEED_TYPES.REVIEWS: {
        const review = getRandomItem(sampleData.reviews);
        items.push({
          ...item,
          user: review.user,
          rating: review.rating,
          text: review.text,
          book: review.book,
          type: "review",
        });
        break;
      }

      default: {
        items.push({
          ...item,
          text: "New update from BookQubit community!",
          type: "update",
        });
      }
    }
  }

  return items;
};