// Mock data for knowledge graph search results

export const mockSearchData = {
  books: [
    {
      id: "book-1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.5,
      year: 1925,
      genre: "Classic",
      description: "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
      tags: ["#ClassicLiterature", "#AmericanDream", "#RoaringTwenties"],
      relatedAuthors: ["F. Scott Fitzgerald", "Ernest Hemingway"],
      relatedBooks: ["Tender Is the Night", "This Side of Paradise"],
      followers: 1250,
    },
    {
      id: "book-2",
      title: "1984",
      author: "George Orwell",
      rating: 4.8,
      year: 1949,
      genre: "Dystopian",
      description: "A chilling vision of a totalitarian future that remains eerily relevant today.",
      tags: ["#DystopianFuture", "#Totalitarianism", "#Surveillance"],
      relatedAuthors: ["George Orwell", "Aldous Huxley"],
      relatedBooks: ["Animal Farm", "Brave New World"],
      followers: 980,
    },
    {
      id: "book-3",
      title: "Dune",
      author: "Frank Herbert",
      rating: 4.7,
      year: 1965,
      genre: "Science Fiction",
      description: "An epic masterpiece of science fiction that continues to inspire generations.",
      tags: ["#SpaceOpera", "#SciFiClassic", "#DesertPlanet"],
      relatedAuthors: ["Frank Herbert", "Arthur C. Clarke"],
      relatedBooks: ["Dune Messiah", "Children of Dune"],
      followers: 850,
    },
    {
      id: "book-4",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 4.9,
      year: 1960,
      genre: "Classic",
      description: "A powerful story of racial injustice and loss of innocence in the American South.",
      tags: ["#ToKillAMockingbird", "#RacialJustice", "#SouthernGothic"],
      relatedAuthors: ["Harper Lee", "Truman Capote"],
      relatedBooks: ["Go Set a Watchman"],
      followers: 920,
    },
    {
      id: "book-5",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      rating: 4.6,
      year: 1937,
      genre: "Fantasy",
      description: "A timeless fantasy adventure that began it all.",
      tags: ["#FantasyAdventure", "#MiddleEarth", "#Dragons"],
      relatedAuthors: ["J.R.R. Tolkien", "C.S. Lewis"],
      relatedBooks: ["The Lord of the Rings", "The Silmarillion"],
      followers: 780,
    },
    {
      id: "book-6",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      rating: 4.7,
      year: 1813,
      genre: "Romance",
      description: "A timeless tale of love, class, and societal expectations in Regency England.",
      tags: ["#RegencyRomance", "#ClassicLiterature", "#Witty"],
      relatedAuthors: ["Jane Austen", "Charlotte Brontë"],
      relatedBooks: ["Sense and Sensibility", "Emma"],
      followers: 650,
    },
  ],
  authors: [
    {
      id: "author-1",
      name: "F. Scott Fitzgerald",
      bio: "American novelist and short story writer, widely regarded as one of the greatest American writers.",
      books: ["The Great Gatsby", "Tender Is the Night"],
      genres: ["Classic", "Literary Fiction"],
      followers: 3400,
      relatedAuthors: ["Ernest Hemingway", "John Dos Passos"],
    },
    {
      id: "author-2",
      name: "George Orwell",
      bio: "English novelist, essayist, and critic, known for his dystopian novels and social commentary.",
      books: ["1984", "Animal Farm"],
      genres: ["Dystopian", "Political Fiction"],
      followers: 4200,
      relatedAuthors: ["Aldous Huxley", "H.G. Wells"],
    },
    {
      id: "author-3",
      name: "Frank Herbert",
      bio: "American science fiction author, best known for his epic Dune series.",
      books: ["Dune", "Dune Messiah"],
      genres: ["Science Fiction", "Space Opera"],
      followers: 2800,
      relatedAuthors: ["Arthur C. Clarke", "Isaac Asimov"],
    },
    {
      id: "author-4",
      name: "Harper Lee",
      bio: "American novelist, best known for her Pulitzer Prize-winning novel To Kill a Mockingbird.",
      books: ["To Kill a Mockingbird", "Go Set a Watchman"],
      genres: ["Classic", "Southern Gothic"],
      followers: 3100,
      relatedAuthors: ["Truman Capote", "William Faulkner"],
    },
    {
      id: "author-5",
      name: "J.R.R. Tolkien",
      bio: "English writer, poet, and academic, best known for his high fantasy works.",
      books: ["The Hobbit", "The Lord of the Rings"],
      genres: ["Fantasy", "High Fantasy"],
      followers: 5600,
      relatedAuthors: ["C.S. Lewis", "T.H. White"],
    },
    {
      id: "author-6",
      name: "Jane Austen",
      bio: "English novelist known for her six major novels and keen social commentary.",
      books: ["Pride and Prejudice", "Sense and Sensibility"],
      genres: ["Romance", "Classic"],
      followers: 4800,
      relatedAuthors: ["Charlotte Brontë", "Emily Brontë"],
    },
  ],
  tags: [
    { id: "tag-1", name: "#ClassicLiterature", count: 2500, category: "Genre" },
    { id: "tag-2", name: "#DystopianFuture", count: 1800, category: "Theme" },
    { id: "tag-3", name: "#SpaceOpera", count: 2200, category: "Genre" },
    { id: "tag-4", name: "#ToKillAMockingbird", count: 1600, category: "Book" },
    { id: "tag-5", name: "#FantasyAdventure", count: 2800, category: "Genre" },
    { id: "tag-6", name: "#RegencyRomance", count: 1200, category: "Genre" },
    { id: "tag-7", name: "#SciFiClassic", count: 1950, category: "Genre" },
    { id: "tag-8", name: "#AmericanDream", count: 870, category: "Theme" },
    { id: "tag-9", name: "#Totalitarianism", count: 650, category: "Theme" },
    { id: "tag-10", name: "#MiddleEarth", count: 2300, category: "Setting" },
  ],
  news: [
    {
      id: "news-1",
      title: "New Edition of The Great Gatsby Released",
      source: "Literary Times",
      date: "2024-06-15",
      excerpt: "A new illustrated edition of F. Scott Fitzgerald's classic novel has been released...",
      category: "Book News",
    },
    {
      id: "news-2",
      title: "Dune Movie Sequel Announced",
      source: "SciFi Weekly",
      date: "2024-06-10",
      excerpt: "Following the success of the first film, the Dune sequel has been officially confirmed...",
      category: "Movie News",
    },
    {
      id: "news-3",
      title: "Harper Lee's Lost Manuscript Discovered",
      source: "Book Gazette",
      date: "2024-06-05",
      excerpt: "A previously unknown manuscript by Harper Lee has been discovered in a family archive...",
      category: "Literary Discovery",
    },
    {
      id: "news-4",
      title: "Tolkien's Unpublished Letters Released",
      source: "Fantasy Times",
      date: "2024-06-01",
      excerpt: "A collection of previously unpublished letters from J.R.R. Tolkien has been released...",
      category: "Author News",
    },
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Why 1984 Remains Relevant Today",
      author: "Sarah Johnson",
      date: "2024-06-12",
      excerpt: "George Orwell's dystopian masterpiece continues to resonate with modern readers...",
      category: "Literary Analysis",
      readTime: 5,
    },
    {
      id: "blog-2",
      title: "The Impact of Dune on Modern Sci-Fi",
      author: "Michael Chen",
      date: "2024-06-08",
      excerpt: "Frank Herbert's epic has influenced generations of science fiction writers...",
      category: "Genre Analysis",
      readTime: 8,
    },
    {
      id: "blog-3",
      title: "Reading Guide to Pride and Prejudice",
      author: "Emily Watson",
      date: "2024-06-03",
      excerpt: "A comprehensive guide to understanding Jane Austen's beloved classic...",
      category: "Reading Guide",
      readTime: 6,
    },
    {
      id: "blog-4",
      title: "Fantasy vs Sci-Fi: A Comparative Analysis",
      author: "David Kim",
      date: "2024-05-28",
      excerpt: "Exploring the similarities and differences between fantasy and science fiction genres...",
      category: "Genre Comparison",
      readTime: 10,
    },
  ],
};

// Search function to find results across all categories
export const searchKnowledge = (query) => {
  if (!query || query.trim().length === 0) {
    return { books: [], authors: [], tags: [], news: [], blogs: [] };
  }

  const searchTerm = query.toLowerCase().trim();
  const results = {
    books: [],
    authors: [],
    tags: [],
    news: [],
    blogs: [],
  };

  // Search books
  results.books = mockSearchData.books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      book.relatedAuthors.some((author) =>
        author.toLowerCase().includes(searchTerm)
      ) ||
      book.relatedBooks.some((related) =>
        related.toLowerCase().includes(searchTerm)
      )
  );

  // Search authors
  results.authors = mockSearchData.authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm) ||
      author.bio.toLowerCase().includes(searchTerm) ||
      author.books.some((book) => book.toLowerCase().includes(searchTerm)) ||
      author.genres.some((genre) => genre.toLowerCase().includes(searchTerm)) ||
      author.relatedAuthors.some((related) =>
        related.toLowerCase().includes(searchTerm)
      )
  );

  // Search tags
  results.tags = mockSearchData.tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm)
  );

  // Search news
  results.news = mockSearchData.news.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm) ||
      news.excerpt.toLowerCase().includes(searchTerm) ||
      news.category.toLowerCase().includes(searchTerm) ||
      news.source.toLowerCase().includes(searchTerm)
  );

  // Search blogs
  results.blogs = mockSearchData.blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm)
  );

  return results;
};

// Get related items for a specific book
export const getRelatedItems = (bookId) => {
  const book = mockSearchData.books.find((b) => b.id === bookId);
  if (!book) return null;

  return {
    authors: mockSearchData.authors.filter((author) =>
      book.relatedAuthors.includes(author.name)
    ),
    books: mockSearchData.books.filter(
      (b) =>
        book.relatedBooks.includes(b.title) && b.id !== bookId
    ),
    tags: mockSearchData.tags.filter((tag) =>
      book.tags.includes(tag.name)
    ),
  };
};