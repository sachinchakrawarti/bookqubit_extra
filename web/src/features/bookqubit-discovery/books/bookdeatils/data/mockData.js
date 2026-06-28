// src/features/bookqubit-discovery/books/bookdeatils/data/mockData.js

/**
 * Mock data for book details feature
 * Used for development and testing
 */

// ============================================
// MOCK BOOKS
// ============================================

export const mockBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    slug: "the-midnight-library",
    category: "Fiction",
    genre: "Contemporary Fiction",
    rating: 4.7,
    reviewCount: 1243,
    pageCount: 304,
    language: "English",
    publishedDate: "2020-08-13",
    published: 2020,
    publisher: "Canongate Books",
    isbn: "9781786892737",
    format: "Hardcover",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Would you have done anything different, if you had the chance to undo your regrets?",
    imageUrl: "https://covers.openlibrary.org/b/id/8231859-L.jpg",
    status: "reading",
    progress: 65,
    isInWishlist: false,
    isInCollection: true,
    keyPoints: [
      "Explores the concept of infinite possibilities and parallel lives",
      "Deals with themes of regret, mental health, and self-discovery",
      "Philosophical yet accessible storytelling",
      "Beautiful prose with emotional depth"
    ],
    subjects: ["Self-Discovery", "Mental Health", "Philosophy", "Life Choices", "Regret"],
    tags: ["Fiction", "Philosophical", "Heartwarming", "Thought-provoking", "Contemporary"],
    about: "The Midnight Library is a bestselling novel that explores the concept of parallel lives and the choices we make. It tells the story of Nora Seed, a woman who finds herself in a magical library between life and death, where she can try on different versions of her life and see what could have been.",
    summary: "Nora Seed is full of regrets. On the night she decides to end her life, she finds herself in the Midnight Library - a library that contains an infinite number of books, each one telling the story of a different life she could have lived. With the help of her librarian, Mrs. Elm, Nora explores these alternative lives, discovering what could have happened if she had made different choices. Along the way, she learns valuable lessons about regret, happiness, and the importance of living authentically.",
    analytics: {
      totalReaders: 12453,
      averageRating: 4.7,
      totalReviews: 342,
      totalRatings: 2156,
      readingTime: "4.5 hours",
      completionRate: 78,
      dailyReaders: 342,
      weeklyReaders: 2134,
      monthlyReaders: 8765,
      engagement: {
        likes: 2341,
        shares: 876,
        comments: 543,
        bookmarks: 1234,
        views: 45678
      },
      trending: {
        direction: "up",
        percentage: 23
      },
      ratings: {
        5: 45,
        4: 30,
        3: 15,
        2: 7,
        1: 3
      }
    },
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        avatar: "SJ",
        rating: 5,
        date: "2024-06-15",
        title: "A Masterpiece!",
        content: "This book completely changed my perspective on life. The writing is beautiful and the characters are so well-developed. I couldn't put it down!",
        likes: 42,
        dislikes: 3,
        replies: 5,
        verified: true,
        helpful: 38
      },
      {
        id: 2,
        user: "Michael Chen",
        avatar: "MC",
        rating: 4,
        date: "2024-06-10",
        title: "Great read, minor issues",
        content: "Really enjoyed this book. The plot is engaging and the themes are thought-provoking. However, I felt the ending was a bit rushed.",
        likes: 28,
        dislikes: 2,
        replies: 3,
        verified: false,
        helpful: 22
      }
    ],
    news: [
      {
        id: 1,
        title: "Book Award Nomination 2024",
        source: "Literary Times",
        sourceIcon: "📰",
        date: "2024-06-18",
        excerpt: "The book has been nominated for the prestigious Literary Award 2024, recognizing outstanding contributions to contemporary fiction.",
        category: "Awards",
        likes: 234,
        comments: 45,
        shares: 89,
        url: "#",
        featured: true
      }
    ],
    blog: [
      {
        id: 1,
        title: "10 Life Lessons from The Midnight Library",
        author: "Sarah Mitchell",
        avatar: "SM",
        date: "2024-06-15",
        readTime: "8 min read",
        excerpt: "This book offers profound insights about life, love, and the choices we make. Here are 10 lessons that will stay with you long after you finish reading.",
        category: "Analysis",
        tags: ["Life Lessons", "Self-Help", "Philosophy"],
        likes: 234,
        comments: 45,
        views: 1234,
        featured: true,
        url: "#"
      }
    ],
    buttons: {
      getBook: "https://example.com/buy",
      listenAudiobook: "https://example.com/audiobook",
      readSummary: "https://example.com/summary"
    }
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    slug: "project-hail-mary",
    category: "Science Fiction",
    genre: "Sci-Fi",
    rating: 4.9,
    reviewCount: 876,
    pageCount: 496,
    language: "English",
    publishedDate: "2021-05-04",
    published: 2021,
    publisher: "Ballantine Books",
    isbn: "9780593135204",
    format: "Hardcover",
    description: "A lone astronaut must save humanity from extinction in this thrilling sci-fi adventure. With humor, science, and heart, Andy Weir delivers another masterpiece.",
    imageUrl: "https://covers.openlibrary.org/b/id/10728085-L.jpg",
    status: "completed",
    progress: 100,
    isInWishlist: true,
    isInCollection: true,
    keyPoints: [
      "Masterful blend of science and storytelling",
      "Compelling protagonist with a unique voice",
      "Edge-of-your-seat suspense throughout",
      "Emotional depth and humor"
    ],
    subjects: ["Space Exploration", "Science", "Survival", "Astrophysics"],
    tags: ["Sci-Fi", "Adventure", "Science", "Space", "Thriller"],
    about: "Project Hail Mary follows Ryland Grace, a lone astronaut on a desperate mission to save Earth from extinction. Waking up with amnesia on a spaceship, he must piece together his mission and save humanity.",
    summary: "Ryland Grace wakes up on a spaceship with no memory of who he is or why he's there. As he slowly regains his memories, he discovers that he's on a mission to save Earth from an extinction-level event. With the help of an unlikely alien ally, Grace must overcome impossible odds to complete his mission.",
    analytics: {
      totalReaders: 9876,
      averageRating: 4.9,
      totalReviews: 456,
      totalRatings: 1876,
      readingTime: "7.5 hours",
      completionRate: 89,
      dailyReaders: 567,
      weeklyReaders: 3456,
      monthlyReaders: 10987,
      engagement: {
        likes: 3456,
        shares: 1234,
        comments: 678,
        bookmarks: 2345,
        views: 67890
      },
      trending: {
        direction: "up",
        percentage: 45
      },
      ratings: {
        5: 65,
        4: 25,
        3: 7,
        2: 2,
        1: 1
      }
    },
    reviews: [
      {
        id: 1,
        user: "David Wilson",
        avatar: "DW",
        rating: 5,
        date: "2024-06-12",
        title: "Absolutely brilliant!",
        content: "Andy Weir has done it again. This book is a perfect blend of science, humor, and heart. I couldn't put it down!",
        likes: 67,
        dislikes: 1,
        replies: 8,
        verified: true,
        helpful: 54
      }
    ],
    news: [
      {
        id: 1,
        title: "Movie Adaptation in Development",
        source: "Hollywood Reporter",
        sourceIcon: "🎬",
        date: "2024-06-20",
        excerpt: "A major studio has acquired the rights for a film adaptation of this bestselling sci-fi novel.",
        category: "Adaptations",
        likes: 567,
        comments: 89,
        shares: 234,
        url: "#",
        featured: true
      }
    ],
    blog: [
      {
        id: 1,
        title: "The Science Behind Project Hail Mary",
        author: "Dr. James Lee",
        avatar: "JL",
        date: "2024-06-18",
        readTime: "10 min read",
        excerpt: "A deep dive into the real science that makes this book so compelling.",
        category: "Science",
        tags: ["Science", "Space", "Astrophysics"],
        likes: 456,
        comments: 78,
        views: 2345,
        featured: true,
        url: "#"
      }
    ],
    buttons: {
      getBook: "https://example.com/buy/project-hail-mary",
      listenAudiobook: "https://example.com/audiobook/project-hail-mary",
      readSummary: "https://example.com/summary/project-hail-mary"
    }
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    slug: "atomic-habits",
    category: "Self-Help",
    genre: "Self-Help",
    rating: 4.8,
    reviewCount: 2341,
    pageCount: 320,
    language: "English",
    publishedDate: "2018-10-16",
    published: 2018,
    publisher: "Avery",
    isbn: "9780735211292",
    format: "Hardcover",
    description: "An easy & proven way to build good habits & break bad ones. Atomic Habits offers a powerful framework for improving your life.",
    imageUrl: "https://covers.openlibrary.org/b/id/14636880-L.jpg",
    status: "want_to_read",
    progress: 0,
    isInWishlist: true,
    isInCollection: false,
    keyPoints: [
      "Focus on systems, not goals",
      "The 1% rule: small changes lead to remarkable results",
      "Identity-based habits are more powerful than outcome-based",
      "Design your environment for success"
    ],
    subjects: ["Self-Improvement", "Habits", "Psychology", "Productivity"],
    tags: ["Self-Help", "Productivity", "Psychology", "Motivation", "Business"],
    about: "Atomic Habits is a bestselling book that provides a practical framework for building good habits and breaking bad ones. James Clear shares proven strategies for making lasting changes in your life.",
    summary: "In Atomic Habits, James Clear explains how small changes can lead to remarkable results. By focusing on identity-based habits and designing your environment for success, you can transform your life one habit at a time.",
    analytics: {
      totalReaders: 45678,
      averageRating: 4.8,
      totalReviews: 2341,
      totalRatings: 5678,
      readingTime: "5.5 hours",
      completionRate: 72,
      dailyReaders: 1234,
      weeklyReaders: 5678,
      monthlyReaders: 23456,
      engagement: {
        likes: 6789,
        shares: 3456,
        comments: 2345,
        bookmarks: 4567,
        views: 123456
      },
      trending: {
        direction: "up",
        percentage: 12
      },
      ratings: {
        5: 55,
        4: 30,
        3: 10,
        2: 3,
        1: 2
      }
    },
    reviews: [
      {
        id: 1,
        user: "Lisa Thompson",
        avatar: "LT",
        rating: 5,
        date: "2024-06-08",
        title: "Life-changing!",
        content: "This book gave me the tools I needed to transform my habits. Highly recommend to anyone looking to improve their life.",
        likes: 89,
        dislikes: 0,
        replies: 12,
        verified: true,
        helpful: 76
      }
    ],
    news: [
      {
        id: 1,
        title: "10-Year Anniversary Edition Announced",
        source: "Book News Daily",
        sourceIcon: "📚",
        date: "2024-06-22",
        excerpt: "A special anniversary edition with new content will be released later this year.",
        category: "Releases",
        likes: 345,
        comments: 56,
        shares: 123,
        url: "#",
        featured: false
      }
    ],
    blog: [
      {
        id: 1,
        title: "How to Apply Atomic Habits in Your Daily Life",
        author: "Emily Rodriguez",
        avatar: "ER",
        date: "2024-06-20",
        readTime: "6 min read",
        excerpt: "Practical tips for implementing the atomic habits framework in your daily routine.",
        category: "Practical",
        tags: ["Habits", "Productivity", "Self-Improvement"],
        likes: 567,
        comments: 89,
        views: 3456,
        featured: false,
        url: "#"
      }
    ],
    buttons: {
      getBook: "https://example.com/buy/atomic-habits",
      listenAudiobook: "https://example.com/audiobook/atomic-habits",
      readSummary: "https://example.com/summary/atomic-habits"
    }
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    slug: "the-silent-patient",
    category: "Thriller",
    genre: "Psychological Thriller",
    rating: 4.6,
    reviewCount: 987,
    pageCount: 336,
    language: "English",
    publishedDate: "2019-02-05",
    published: 2019,
    publisher: "Celadon Books",
    isbn: "9781250301697",
    format: "Hardcover",
    description: "A woman shoots her husband and then stops speaking. A therapist becomes obsessed with uncovering the truth.",
    imageUrl: "https://covers.openlibrary.org/b/id/14857780-L.jpg",
    status: "unread",
    progress: 0,
    isInWishlist: false,
    isInCollection: false,
    keyPoints: [
      "Gripping psychological thriller",
      "Unreliable narrator",
      "Twists and turns throughout",
      "Dark and atmospheric"
    ],
    subjects: ["Psychology", "Mystery", "Suspense", "Mental Health"],
    tags: ["Thriller", "Psychological", "Mystery", "Suspense", "Dark"],
    about: "The Silent Patient is a psychological thriller about a woman who shoots her husband and then stops speaking. A therapist becomes obsessed with uncovering the truth.",
    summary: "Alicia Berenson shoots her husband and then stops speaking. A therapist, Theo Faber, becomes obsessed with uncovering the truth behind her silence. As he delves deeper into her past, he discovers a dark secret that will change everything.",
    analytics: {
      totalReaders: 23456,
      averageRating: 4.6,
      totalReviews: 987,
      totalRatings: 3456,
      readingTime: "5 hours",
      completionRate: 82,
      dailyReaders: 567,
      weeklyReaders: 3456,
      monthlyReaders: 12345,
      engagement: {
        likes: 4567,
        shares: 2345,
        comments: 1234,
        bookmarks: 3456,
        views: 78901
      },
      trending: {
        direction: "down",
        percentage: 5
      },
      ratings: {
        5: 40,
        4: 35,
        3: 15,
        2: 7,
        1: 3
      }
    },
    reviews: [
      {
        id: 1,
        user: "Emma Watson",
        avatar: "EW",
        rating: 4,
        date: "2024-06-05",
        title: "Page-turner!",
        content: "Couldn't stop reading. The twists kept me guessing until the very end.",
        likes: 45,
        dislikes: 2,
        replies: 6,
        verified: true,
        helpful: 34
      }
    ],
    news: [
      {
        id: 1,
        title: "Netflix Adaptation in Production",
        source: "Entertainment Weekly",
        sourceIcon: "🎬",
        date: "2024-06-15",
        excerpt: "Netflix is developing a series adaptation of this bestselling thriller.",
        category: "Adaptations",
        likes: 789,
        comments: 123,
        shares: 456,
        url: "#",
        featured: true
      }
    ],
    blog: [
      {
        id: 1,
        title: "The Psychology of Silence in The Silent Patient",
        author: "Dr. Rachel Kim",
        avatar: "RK",
        date: "2024-06-12",
        readTime: "7 min read",
        excerpt: "An analysis of the psychological themes and symbolism in this gripping thriller.",
        category: "Analysis",
        tags: ["Psychology", "Analysis", "Thriller"],
        likes: 345,
        comments: 56,
        views: 2345,
        featured: true,
        url: "#"
      }
    ],
    buttons: {
      getBook: "https://example.com/buy/the-silent-patient",
      listenAudiobook: "https://example.com/audiobook/the-silent-patient",
      readSummary: "https://example.com/summary/the-silent-patient"
    }
  }
];

// ============================================
// MOCK SECTIONS
// ============================================

export const mockSections = [
  { id: "highlights", label: "Highlights" },
  { id: "subjects", label: "Subjects" },
  { id: "publication", label: "Publication" },
  { id: "about", label: "About" },
  { id: "summary", label: "Summary" },
  { id: "reviews", label: "Reviews" },
  { id: "news", label: "News" },
  { id: "blog", label: "Blog" },
  { id: "related", label: "Related" },
  { id: "analytics", label: "Analytics" },
  { id: "tags", label: "Tags" },
];

// ============================================
// MOCK RELATED BOOKS
// ============================================

export const mockRelatedBooks = [
  {
    id: 5,
    title: "The Alchemist",
    author: "Paulo Coelho",
    slug: "the-alchemist",
    category: "Fiction",
    rating: 4.5,
    imageUrl: "https://covers.openlibrary.org/b/id/7413697-L.jpg",
    status: "reading",
    progress: 30
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    slug: "dune",
    category: "Science Fiction",
    rating: 4.7,
    imageUrl: "https://covers.openlibrary.org/b/id/14636880-L.jpg",
    status: "want_to_read",
    progress: 0
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    slug: "the-great-gatsby",
    category: "Fiction",
    rating: 4.4,
    imageUrl: "https://covers.openlibrary.org/b/id/7219080-L.jpg",
    status: "completed",
    progress: 100
  },
  {
    id: 8,
    title: "1984",
    author: "George Orwell",
    slug: "1984",
    category: "Fiction",
    rating: 4.6,
    imageUrl: "https://covers.openlibrary.org/b/id/8219432-L.jpg",
    status: "unread",
    progress: 0
  }
];

// ============================================
// MOCK USER
// ============================================

export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "JD",
  readingGoal: 52,
  booksRead: 24,
  currentlyReading: 3,
  wantToRead: 15,
  totalPagesRead: 8765,
  memberSince: "2023-01-15"
};

// ============================================
// MOCK STATS
// ============================================

export const mockStats = {
  totalBooks: 12453,
  totalAuthors: 3456,
  totalReviews: 23456,
  totalReaders: 87654,
  averageRating: 4.6,
  topCategories: [
    { name: "Fiction", count: 4567 },
    { name: "Science Fiction", count: 2345 },
    { name: "Self-Help", count: 1876 },
    { name: "Thriller", count: 1654 },
    { name: "Fantasy", count: 1432 }
  ]
};

// ============================================
// MOCK COMMENTS
// ============================================

export const mockComments = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    date: "2024-06-15",
    text: "This book changed my life! Highly recommend to everyone.",
    likes: 45,
    replies: 5,
    verified: true
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "MC",
    date: "2024-06-14",
    text: "Beautifully written with so much depth. Couldn't put it down.",
    likes: 32,
    replies: 3,
    verified: false
  },
  {
    id: 3,
    user: "Emma Watson",
    avatar: "EW",
    date: "2024-06-12",
    text: "A masterpiece of modern literature. The themes are so relevant.",
    likes: 28,
    replies: 7,
    verified: true
  }
];

// ============================================
// EXPORT ALL
// ============================================

const mockData = {
  mockBooks,
  mockSections,
  mockRelatedBooks,
  mockUser,
  mockStats,
  mockComments,
};

export default mockData;