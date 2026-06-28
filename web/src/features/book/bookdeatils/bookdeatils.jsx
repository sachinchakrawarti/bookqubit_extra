// src/features/book/bookdeatils/bookdeatils.jsx

"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { getBooksByLanguage } from "@/data/books";

// Import components
import BookNotFound from "@/features/book/bookdeatils/components/BookNotFound";
import BookCover from "@/features/book/bookdeatils/components/BookCover";
import BookInfo from "@/features/book/bookdeatils/components/BookInfo";
import BookActions from "@/features/book/bookdeatils/components/BookActions";
import BookKeyPoints from "@/features/book/bookdeatils/components/BookKeyPoints";
import BookSubjects from "@/features/book/bookdeatils/components/BookSubjects";
import BookPublicationDetails from "@/features/book/bookdeatils/components/BookPublicationDetails";
import BookAbout from "@/features/book/bookdeatils/components/BookAbout";
import BookSummary from "@/features/book/bookdeatils/components/BookSummary";
import RelatedBooks from "@/features/book/bookdeatils/components/RelatedBooks";
import BookNavigation from "@/features/book/bookdeatils/components/BookNavigation";
import BookSEO from "@/features/book/bookdeatils/components/BookSEO";
import BookSectionNavigator from "@/features/book/bookdeatils/components/BookSectionNavigator";

// Import BottonInLine components (mobile and desktop)
import BottonInLine_Mobile from "@/features/book/bookdeatils/components/mobile/bottoninline_mobile/BottonInLine_Mobile";
import BottonInLine_Desktop from "@/features/book/bookdeatils/components/desktop/BottonInLine_Desktop";

// Import dynamic tags components
import {
  extractDynamicTagsFromBook,
  getRelatedTagsForBook,
  getCategorizedBookTags,
  RelatedTagsSection,
} from "@/features/tags/dynamic_book_tags";

const BookDetailsPage = ({ initialBook, initialSlug, initialLanguage }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = initialSlug || params?.slug;
  const { theme, themeName } = useTheme();
  const { language: contextLanguage, t } = useLanguage();
  const { currentFont } = useFont();

  // Get language from URL
  const getLanguageFromURL = () => {
    const segments = pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    const supportedLanguages = [
      "en",
      "es",
      "fr",
      "de",
      "ja",
      "zh",
      "hi",
      "ar",
      "ur",
      "bn",
      "pt",
      "ru",
      "it",
      "ko",
      "nl",
      "tr",
      "vi",
      "th",
      "pl",
      "sv",
      "ta",
      "te",
      "ml",
      "kn",
      "mr",
    ];
    if (firstSegment && supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    return params?.lang || initialLanguage || contextLanguage || "en";
  };

  const currentLanguage = getLanguageFromURL();

  // Create refs for sections
  const summaryRef = useRef(null);
  const highlightsRef = useRef(null);
  const subjectsRef = useRef(null);
  const publicationRef = useRef(null);
  const aboutRef = useRef(null);
  const commentsRef = useRef(null);
  const relatedRef = useRef(null);

  // State for book status and user interactions
  const [bookStatus, setBookStatus] = useState("unread");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCollection, setIsInCollection] = useState(false);
  const [book, setBook] = useState(initialBook || null);
  const [booksData, setBooksData] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("highlights");

  // State for dynamic tags
  const [dynamicTags, setDynamicTags] = useState([]);
  const [relatedTags, setRelatedTags] = useState([]);
  const [categorizedTags, setCategorizedTags] = useState({});

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load books based on language from URL
  useEffect(() => {
    setIsLoading(true);
    const books = getBooksByLanguage(currentLanguage);
    setBooksData(books || []);
    setIsLoading(false);
  }, [currentLanguage]);

  // Reset book when language changes
  useEffect(() => {
    setBook(null);
    setIsRedirecting(false);
  }, [currentLanguage]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, currentLanguage]);

  // Find book when slug or booksData changes - SUPPORTS LANGUAGE-SPECIFIC SLUGS
  useEffect(() => {
    if (slug && booksData.length > 0 && !isRedirecting && !isLoading) {
      const urlSlug = slug?.toLowerCase().trim();

      const foundBook = booksData.find((book) => {
        // Check regular slug
        const bookSlug = book.slug?.toLowerCase().trim();
        if (bookSlug === urlSlug) return true;

        // Check language-specific slug (e.g., hindiSlug for Hindi)
        const langSlug = book[`${currentLanguage}Slug`]?.toLowerCase().trim();
        if (langSlug && langSlug === urlSlug) return true;

        // Check if slug matches ID
        if (!isNaN(slug) && book.id === parseInt(slug)) return true;

        // Generate slug from title as fallback
        const generatedSlug = book.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return generatedSlug === urlSlug;
      });

      setBook(foundBook);
    }
  }, [slug, booksData, isRedirecting, isLoading, currentLanguage]);

  // Extract dynamic tags when book is found
  useEffect(() => {
    if (book && (booksData.length > 0 || initialBook)) {
      const tags = extractDynamicTagsFromBook(book);
      setDynamicTags(tags);
      const categorized = getCategorizedBookTags(book);
      setCategorizedTags(categorized);
      const related = getRelatedTagsForBook(book, booksData, 15);
      setRelatedTags(related);
    }
  }, [book, booksData, initialBook, currentLanguage]);

  // Redirect from ID to slug URL
  useEffect(() => {
    if (!initialBook && book && book.slug && !isNaN(slug) && !isRedirecting) {
      setIsRedirecting(true);
      // Use language-specific slug if available
      const targetSlug =
        currentLanguage === "hi" && book.hindiSlug ? book.hindiSlug : book.slug;
      router.replace(`/${currentLanguage}/books/${targetSlug}`);
    }
  }, [book, slug, router, isRedirecting, initialBook, currentLanguage]);

  // Section definitions for mobile navigator
  const sections = [
    { id: "highlights", label: "Highlights" },
    { id: "subjects", label: "Subjects" },
    { id: "publication", label: "Publication" },
    { id: "about", label: "About" },
    { id: "summary", label: "Summary" },
    { id: "comments", label: "Comments" },
    { id: "related", label: "Related" },
  ];

  // Handle section click
  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const sectionRefs = {
      highlights: highlightsRef,
      subjects: subjectsRef,
      publication: publicationRef,
      about: aboutRef,
      summary: summaryRef,
      comments: commentsRef,
      related: relatedRef,
    };
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      const offset = isMobile ? 120 : 120;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const sectionRefs = [
        { id: "highlights", ref: highlightsRef },
        { id: "subjects", ref: subjectsRef },
        { id: "publication", ref: publicationRef },
        { id: "about", ref: aboutRef },
        { id: "summary", ref: summaryRef },
        { id: "comments", ref: commentsRef },
        { id: "related", ref: relatedRef },
      ];

      let currentSection = "highlights";
      const scrollPosition = window.scrollY + 180;

      for (const section of sectionRefs) {
        if (section.ref && section.ref.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToSummary = () => {
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (book?.buttons?.readSummary) {
      window.open(book.buttons.readSummary, "_blank");
    }
  };

  const handleTagClick = (tag) => {
    const tagSlug = tag
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    router.push(`/${currentLanguage}/tags/${tagSlug}`);
  };

  const relatedByAuthor = useMemo(() => {
    if (!book || booksData.length === 0) return [];
    return booksData
      .filter(
        (b) =>
          b.author === book.author && b.id !== book.id && b.slug !== book.slug,
      )
      .slice(0, 4);
  }, [book, booksData]);

  const relatedByCategory = useMemo(() => {
    if (!book || booksData.length === 0) return [];
    return booksData
      .filter(
        (b) =>
          b.category === book.category &&
          b.id !== book.id &&
          b.slug !== book.slug,
      )
      .slice(0, 4);
  }, [book, booksData]);

  const uniqueRelatedBooks = useMemo(() => {
    const allRelated = [...relatedByAuthor, ...relatedByCategory];
    const uniqueBooks = new Map();
    allRelated.forEach((book) => {
      if (!uniqueBooks.has(book.id)) {
        uniqueBooks.set(book.id, book);
      }
    });
    return Array.from(uniqueBooks.values()).slice(0, 4);
  }, [relatedByAuthor, relatedByCategory]);

  const handleWishlist = () => {
    if (!book) return;
    setIsInWishlist(!isInWishlist);
    console.log(
      `${isInWishlist ? "Removed from" : "Added to"} wishlist:`,
      book?.title,
    );
  };

  const handleShare = () => {
    if (!book) return;
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `Check out "${book.title}" by ${book.author}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.log("Error copying to clipboard:", err));
    }
  };

  const handleReadStatus = (status) => {
    if (!book) return;
    setBookStatus(status);
    console.log(`Marked as ${status}:`, book?.title);
  };

  const handleAddToLibrary = () => {
    if (!book) return;
    setIsInCollection(!isInCollection);
    console.log(
      `${isInCollection ? "Removed from" : "Added to"} library:`,
      book?.title,
    );
  };

  const handleGetBook = () => {
    if (book?.buttons?.getBook) {
      window.open(book.buttons.getBook, "_blank");
    }
  };

  const handleListenAudiobook = () => {
    if (book?.buttons?.listenAudiobook) {
      window.open(book.buttons.listenAudiobook, "_blank");
    }
  };

  // Handle Ask AI
  const handleAskAI = () => {
    console.log("Ask AI about:", book?.title);
    // Implement AI chat functionality here
    // Example: Open AI chat modal or navigate to AI chat page
  };

  // Handle Report
  const handleReport = () => {
    console.log("Report book:", book?.title);
    // Implement report functionality here
    // Example: Open report modal
  };

  // Handle BottonInLine actions
  const handleBottonLike = (liked) => {
    console.log(`${liked ? "Liked" : "Unliked"}:`, book?.title);
    // Update book state or make API call
  };

  const handleBottonAddToLibrary = (shelf) => {
    console.log(`Added to library shelf "${shelf}":`, book?.title);
    // Update book state or make API call
  };

  // Show loading state
  if (isLoading || (booksData.length === 0 && !initialBook)) {
    return (
      <div
        className={`${theme.background?.section || "bg-gray-50 dark:bg-gray-900"} min-h-screen flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p
            className={`mt-4 ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            {t("common.loading") || "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div
        className={`${theme.background?.section || "bg-gray-50 dark:bg-gray-900"} min-h-screen flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p
            className={`mt-4 ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}`}
          >
            {t("common.redirecting") || "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  if (!book) {
    return <BookNotFound slug={slug} language={currentLanguage} />;
  }

  const fontStyle = currentFont ? { fontFamily: currentFont.family } : {};
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Determine which BottonInLine component to use based on device
  const BottonInLineComponent = isMobile
    ? BottonInLine_Mobile
    : BottonInLine_Desktop;

  return (
    <>
      <BookSEO book={book} language={currentLanguage} />

      <div
        className={`${theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-gray-50")} min-h-screen`}
        style={fontStyle}
      >
        <div
          className={`
          ${theme.layout?.containerWidth || "max-w-7xl"} 
          mx-auto 
          ${theme.layout?.sectionPadding || "py-12 px-4 sm:px-6 lg:px-8"}
          ${isMobile ? "pb-24" : ""}
        `}
        >
          {/* Language Indicator */}
          <div className="text-right text-xs opacity-50 mb-4">
            <span
              className={
                theme.textColors?.secondary ||
                (isDarkMode ? "text-gray-400" : "text-gray-600")
              }
            >
              {t("common.language") || "Language"}:{" "}
              {currentLanguage.toUpperCase()}
            </span>
          </div>

          {/* Main Book Details */}
          <div
            className={`
            flex flex-col lg:flex-row gap-8 
            ${theme.shadow?.container || "shadow-lg"} 
            ${theme.border?.default || "border border-gray-200 dark:border-gray-700"} 
            p-6 
            ${theme.background?.section || (isDarkMode ? "bg-gray-800" : "bg-white")} 
            rounded-2xl
          `}
          >
            <BookCover book={book} />
            <div className="lg:w-2/3 space-y-6">
              <BookInfo book={book} />

              {/* BottonInLine - Responsive Action Bar with Like, Share, Summary, Library, Menu */}
              <div
                className={`flex ${isMobile ? "justify-center" : "justify-start"}`}
              >
                <BottonInLineComponent
                  bookId={book.id}
                  bookName={book.title}
                  authorName={book.author}
                  launchYear={book.publicationYear || book.year || "N/A"}
                  initialLiked={book.userLiked || false}
                  initialInLibrary={book.userInLibrary || false}
                  onLike={handleBottonLike}
                  onAddToLibrary={handleBottonAddToLibrary}
                  onShare={handleShare}
                  onReport={handleReport}
                  onAskAI={handleAskAI}
                  className={isMobile ? "w-full sm:w-auto" : ""}
                />
              </div>

              {/* Book Actions - Get Book, Read Status, Wishlist (Summary removed) */}
              <BookActions
                book={book}
                bookStatus={bookStatus}
                isInWishlist={isInWishlist}
                isInCollection={isInCollection}
                onGetBook={handleGetBook}
                onScrollToSummary={scrollToSummary}
                onWishlist={handleWishlist}
                onShare={handleShare}
                onAddToLibrary={handleAddToLibrary}
                onReadStatus={handleReadStatus}
                onListenAudiobook={handleListenAudiobook}
              />
            </div>
          </div>

          {/* Mobile Section Navigator - Below Book Cover and Buttons */}
          {isMobile && (
            <div className="mt-6 mb-6">
              <BookSectionNavigator
                sections={sections}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />
            </div>
          )}

          {/* Key Highlights Section */}
          <div
            ref={highlightsRef}
            id="section-highlights"
            className="mb-16 scroll-mt-28"
          >
            <BookKeyPoints book={book} />
          </div>

          {/* Subjects Section */}
          <div
            ref={subjectsRef}
            id="section-subjects"
            className="mb-16 scroll-mt-28"
          >
            <BookSubjects book={book} />
          </div>

          {/* Publication Details Section */}
          <div
            ref={publicationRef}
            id="section-publication"
            className="mb-16 scroll-mt-28"
          >
            <BookPublicationDetails book={book} />
          </div>

          {/* About Section */}
          <div ref={aboutRef} id="section-about" className="mb-16 scroll-mt-28">
            <BookAbout book={book} />
          </div>

          {/* Summary Section */}
          <div
            ref={summaryRef}
            id="section-summary"
            className="mb-16 scroll-mt-28"
          >
            <BookSummary book={book} />
          </div>

          {/* Comments Section */}
          <div
            ref={commentsRef}
            id="section-comments"
            className="mb-16 scroll-mt-28"
          >
            {/* Add comments component here */}
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>💬 Comments section coming soon</p>
            </div>
          </div>

          {/* Related Books Section */}
          <div ref={relatedRef} id="section-related" className="scroll-mt-28">
            {uniqueRelatedBooks.length > 0 && (
              <RelatedBooks
                relatedByAuthor={relatedByAuthor}
                relatedByCategory={relatedByCategory}
                book={book}
                relatedBooks={uniqueRelatedBooks}
                currentLang={currentLanguage}
              />
            )}
          </div>

          {/* Dynamic Tags */}
          {(dynamicTags.length > 0 || relatedTags.length > 0) && (
            <div className="my-12">
              <RelatedTagsSection
                currentTags={dynamicTags}
                relatedTags={relatedTags}
                categorizedTags={categorizedTags}
                onTagClick={handleTagClick}
              />
            </div>
          )}

          <BookNavigation currentLang={currentLanguage} />
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
