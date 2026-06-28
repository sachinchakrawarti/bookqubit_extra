// src/features/bookqubit-discovery/books/bookdeatils/hooks/useSEO.js

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom hook for SEO optimization
 * @param {Object} options - Configuration options
 * @param {Object} options.book - Book data
 * @param {string} options.language - Current language
 * @param {Object} options.customMeta - Custom meta tags
 * @param {Object} options.customOpenGraph - Custom Open Graph tags
 * @param {Object} options.customTwitter - Custom Twitter card tags
 * @param {Object} options.customJsonLd - Custom JSON-LD schema
 * @param {Function} options.onMetaUpdate - Callback when meta tags are updated
 * @returns {Object} SEO utilities
 */
export const useSEO = ({
  book = null,
  language = "en",
  customMeta = {},
  customOpenGraph = {},
  customTwitter = {},
  customJsonLd = null,
  onMetaUpdate = null,
}) => {
  const pathname = usePathname();

  // Generate book URL
  const getBookUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const path = pathname || "";
    return `${baseUrl}${path}`;
  };

  // Generate book image URL
  const getBookImage = () => {
    if (book?.imageUrl) {
      return book.imageUrl;
    }
    return "/images/default-book-cover.jpg";
  };

  // Generate meta description
  const generateDescription = () => {
    if (book?.description) {
      return book.description.slice(0, 160);
    }
    if (book?.about) {
      return book.about.slice(0, 160);
    }
    return `Read "${book?.title || 'Book'}" by ${book?.author || 'Unknown Author'}`;
  };

  // Generate keywords
  const generateKeywords = () => {
    const keywords = [];
    if (book?.title) keywords.push(book.title);
    if (book?.author) keywords.push(book.author);
    if (book?.category) keywords.push(book.category);
    if (book?.subjects) keywords.push(...book.subjects);
    if (book?.tags) keywords.push(...book.tags);
    if (book?.genre) keywords.push(book.genre);
    return keywords.join(", ");
  };

  // Generate Open Graph data
  const generateOpenGraph = () => {
    const url = getBookUrl();
    const image = getBookImage();
    const description = generateDescription();

    return {
      title: `${book?.title || 'Book'} | BookQubit`,
      description: description,
      url: url,
      siteName: "BookQubit",
      image: image,
      type: "book",
      locale: language,
      book: {
        author: book?.author || "",
        isbn: book?.isbn || "",
        releaseDate: book?.publishedDate || book?.published || "",
        pages: book?.pageCount || "",
      },
      ...customOpenGraph,
    };
  };

  // Generate Twitter Card data
  const generateTwitter = () => {
    const image = getBookImage();
    const description = generateDescription();

    return {
      card: "summary_large_image",
      title: `${book?.title || 'Book'} | BookQubit`,
      description: description,
      image: image,
      site: "@bookqubit",
      creator: book?.author ? `@${book.author.replace(/\s/g, '')}` : "",
      ...customTwitter,
    };
  };

  // Generate JSON-LD schema
  const generateJsonLd = () => {
    if (customJsonLd) return customJsonLd;

    if (!book) return null;

    const url = getBookUrl();
    const image = getBookImage();

    return {
      "@context": "https://schema.org",
      "@type": "Book",
      name: book.title,
      author: {
        "@type": "Person",
        name: book.author,
      },
      description: generateDescription(),
      image: image,
      url: url,
      isbn: book.isbn || "",
      publisher: {
        "@type": "Organization",
        name: book.publisher || "",
      },
      datePublished: book.publishedDate || book.published || "",
      numberOfPages: book.pageCount || "",
      genre: book.category || book.genre || "",
      inLanguage: book.language || language,
      aggregateRating:
        book.rating && book.reviewCount
          ? {
              "@type": "AggregateRating",
              ratingValue: book.rating,
              ratingCount: book.reviewCount,
            }
          : undefined,
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    };
  };

  // Update meta tags
  const updateMetaTags = () => {
    if (!book && !customMeta) return;

    const title = `${book?.title || 'Book'} | BookQubit`;
    const description = generateDescription();
    const keywords = generateKeywords();
    const og = generateOpenGraph();
    const twitter = generateTwitter();

    // Update title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description: description,
      keywords: keywords,
      "og:title": og.title,
      "og:description": og.description,
      "og:url": og.url,
      "og:site_name": og.siteName,
      "og:image": og.image,
      "og:type": og.type,
      "og:locale": og.locale,
      "twitter:card": twitter.card,
      "twitter:title": twitter.title,
      "twitter:description": twitter.description,
      "twitter:image": twitter.image,
      "twitter:site": twitter.site,
      "twitter:creator": twitter.creator,
      ...customMeta,
    };

    // Update or create meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        // Check for property attribute (Open Graph)
        meta = document.querySelector(`meta[property="${name}"]`);
      }
      if (!meta) {
        meta = document.createElement("meta");
        if (name.startsWith("og:")) {
          meta.setAttribute("property", name);
        } else if (name.startsWith("twitter:")) {
          meta.setAttribute("name", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Call onMetaUpdate callback
    if (onMetaUpdate) {
      onMetaUpdate({ title, metaTags, og, twitter });
    }
  };

  // Update JSON-LD schema
  const updateJsonLd = () => {
    const jsonLd = generateJsonLd();
    if (!jsonLd) return;

    let script = document.querySelector('#book-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'book-json-ld';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  };

  // Update canonical URL
  const updateCanonical = () => {
    const url = getBookUrl();
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  };

  // Initialize SEO
  useEffect(() => {
    if (!book) return;

    updateMetaTags();
    updateJsonLd();
    updateCanonical();

    // Cleanup on unmount
    return () => {
      // Optional: Restore default meta tags
      // This is handled by Next.js automatically
    };
  }, [book, language, pathname]);

  // Generate structured data for breadcrumbs
  const generateBreadcrumbJsonLd = () => {
    const url = getBookUrl();
    const bookTitle = book?.title || 'Book';

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${url.split('/books')[0]}`,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Books",
          "item": `${url.split('/books')[0]}/books`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": bookTitle,
          "item": url,
        },
      ],
    };
  };

  // Add breadcrumb schema
  const addBreadcrumbSchema = () => {
    if (!book) return;

    const breadcrumb = generateBreadcrumbJsonLd();
    let script = document.querySelector('#breadcrumb-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-json-ld';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumb);
  };

  // Add breadcrumb on mount
  useEffect(() => {
    if (!book) return;
    addBreadcrumbSchema();
  }, [book]);

  return {
    // Functions
    updateMetaTags,
    updateJsonLd,
    updateCanonical,
    addBreadcrumbSchema,
    generateOpenGraph,
    generateTwitter,
    generateJsonLd,
    generateBreadcrumbJsonLd,

    // Data
    getBookUrl,
    getBookImage,
    generateDescription,
    generateKeywords,
  };
};

export default useSEO;