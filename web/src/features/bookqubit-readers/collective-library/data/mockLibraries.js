export const mockLibraries = [
  {
    id: 1,
    slug: "classic-literature-collective",
    shelf: "Classics Collection",
    name: "Classic Literature Collective",
    description: "A curated collection of timeless classics from around the world.",
    owner: {
      id: 101,
      name: "Priya Sharma",
      avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff",
      username: "priya_reads",
    },
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    books: [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 2, title: "1984", author: "George Orwell", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 342,
      saves: 156,
      views: 1234,
      shares: 89,
      members: 45,
    },
    createdAt: "2024-06-15",
    category: "Classics",
    isPublic: true,
    tags: ["classic", "literature", "fiction"],
    isFeatured: true,
  },
  {
    id: 2,
    slug: "sci-fi-universe-collective",
    shelf: "Science Fiction",
    name: "Sci-Fi Universe Collective",
    description: "Exploring the best science fiction books that shaped the genre.",
    owner: {
      id: 102,
      name: "Amit Patel",
      avatar: "https://ui-avatars.com/api/?name=Amit+Patel&background=3b82f6&color=fff",
      username: "amit_sci_fi",
    },
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    books: [
      { id: 6, title: "Dune", author: "Frank Herbert", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 7, title: "Foundation", author: "Isaac Asimov", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 8, title: "Neuromancer", author: "William Gibson", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 9, title: "The Martian", author: "Andy Weir", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 567,
      saves: 234,
      views: 2345,
      shares: 156,
      members: 67,
    },
    createdAt: "2024-06-10",
    category: "Science Fiction",
    isPublic: true,
    tags: ["sci-fi", "space", "future"],
    isFeatured: true,
  },
  {
    id: 3,
    slug: "fantasy-world-collective",
    shelf: "Fantasy Collection",
    name: "Fantasy World Collective",
    description: "A magical collection of fantasy books for dreamers and adventurers.",
    owner: {
      id: 103,
      name: "Sarah Williams",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=10b981&color=fff",
      username: "sarah_fantasy",
    },
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    books: [
      { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 11, title: "The Name of the Wind", author: "Patrick Rothfuss", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 12, title: "Mistborn", author: "Brandon Sanderson", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 13, title: "The Way of Kings", author: "Brandon Sanderson", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 789,
      saves: 345,
      views: 3456,
      shares: 234,
      members: 89,
    },
    createdAt: "2024-06-05",
    category: "Fantasy",
    isPublic: true,
    tags: ["fantasy", "magic", "adventure"],
    isFeatured: false,
  },
  {
    id: 4,
    slug: "mystery-thriller-collective",
    shelf: "Mystery & Thriller",
    name: "Mystery & Thriller Collective",
    description: "Books that will keep you on the edge of your seat.",
    owner: {
      id: 104,
      name: "Ishani Krishna",
      avatar: "https://ui-avatars.com/api/?name=Ishani+Krishna&background=ef4444&color=fff",
      username: "ishani_mystery",
    },
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
    books: [
      { id: 14, title: "Gone Girl", author: "Gillian Flynn", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 15, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 16, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 17, title: "Sharp Objects", author: "Gillian Flynn", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 456,
      saves: 198,
      views: 1876,
      shares: 123,
      members: 56,
    },
    createdAt: "2024-05-28",
    category: "Mystery",
    isPublic: true,
    tags: ["mystery", "thriller", "crime"],
    isFeatured: false,
  },
  {
    id: 5,
    slug: "romance-reads-collective",
    shelf: "Romance Collection",
    name: "Romance Reads Collective",
    description: "Heartwarming love stories to make you believe in love.",
    owner: {
      id: 105,
      name: "Hania Amir",
      avatar: "https://ui-avatars.com/api/?name=Hania+Amir&background=ec4899&color=fff",
      username: "hania_romance",
    },
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    books: [
      { id: 18, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 19, title: "The Notebook", author: "Nicholas Sparks", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 20, title: "Me Before You", author: "Jojo Moyes", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 634,
      saves: 287,
      views: 2567,
      shares: 178,
      members: 73,
    },
    createdAt: "2024-05-20",
    category: "Romance",
    isPublic: true,
    tags: ["romance", "love", "heartwarming"],
    isFeatured: false,
  },
  {
    id: 6,
    slug: "self-help-collective",
    shelf: "Self-Help & Growth",
    name: "Self-Help Collective",
    description: "Books to help you grow, learn, and become your best self.",
    owner: {
      id: 106,
      name: "Sachin Chakrawarti",
      avatar: "https://ui-avatars.com/api/?name=Sachin+Chakrawarti&background=1e293b&color=fff",
      username: "sachin_selfhelp",
    },
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    books: [
      { id: 21, title: "Atomic Habits", author: "James Clear", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 22, title: "The Power of Now", author: "Eckhart Tolle", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 23, title: "Think and Grow Rich", author: "Napoleon Hill", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
      { id: 24, title: "The 7 Habits", author: "Stephen Covey", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150" },
    ],
    stats: {
      likes: 523,
      saves: 412,
      views: 2987,
      shares: 267,
      members: 94,
    },
    createdAt: "2024-05-15",
    category: "Self-Help",
    isPublic: true,
    tags: ["self-help", "growth", "success"],
    isFeatured: false,
  },
];

export const getFeaturedLibraries = () => {
  return mockLibraries.filter(lib => lib.isFeatured);
};

export const getTrendingLibraries = () => {
  return [...mockLibraries].sort((a, b) => b.stats.likes - a.stats.likes);
};

export const getLibrariesByCategory = (category) => {
  if (category === "all") return mockLibraries;
  return mockLibraries.filter(lib => lib.category === category);
};

export const getLibraryById = (id) => {
  return mockLibraries.find(lib => lib.id === id);
};

export const getLibraryBySlug = (slug) => {
  console.log("Searching for slug:", slug);
  console.log("Available slugs:", mockLibraries.map(lib => lib.slug));
  const result = mockLibraries.find(lib => lib.slug === slug);
  console.log("Found library:", result);
  return result;
};

export const getLibrariesByShelf = (shelf) => {
  return mockLibraries.filter(lib => lib.shelf === shelf);
};

export const getShelves = () => {
  const shelves = [...new Set(mockLibraries.map(lib => lib.shelf))];
  return shelves;
};

export const getCategories = () => {
  const categories = ["all", ...new Set(mockLibraries.map(lib => lib.category))];
  return categories;
};