// src/features/bookqubit-discovery/books/bookdeatils/components/shared/BookSEO.jsx

"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const BookSEO = ({ book, language = "en" }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!book) return;

    // Generate book URL
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const path = pathname || "";
    const bookUrl = `${baseUrl}${path}`;

    // Generate book image URL
    const imageUrl = book.imageUrl || "/images/default-book-cover.jpg";

    // Generate description
    const description = book.description
      ? book.description.slice(0, 160)
      : `Read "${book.title}" by ${book.author}`;

    // Generate keywords
    const keywords = [
      book.title,
      book.author,
      book.category,
      ...(book.subjects || []),
      ...(book.tags || []),
      "book",
      "reading",
      "literature",
    ].join(", ");

    // Update document title
    document.title = `${book.title} | BookQubit`;

    // Update or create meta tags
    const metaTags = {
      description: description,
      keywords: keywords,
      "og:title": `${book.title} | BookQubit`,
      "og:description": description,
      "og:url": bookUrl,
      "og:site_name": "BookQubit",
      "og:image": imageUrl,
      "og:type": "book",
      "og:locale": language,
      "twitter:card": "summary_large_image",
      "twitter:title": `${book.title} | BookQubit`,
      "twitter:description": description,
      "twitter:image": imageUrl,
      "twitter:site": "@bookqubit",
      "twitter:creator": book.author
        ? `@${book.author.replace(/\s/g, "")}`
        : "",
    };

    // Update meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
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

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", bookUrl);

    // Update JSON-LD schema
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Book",
      name: book.title,
      author: {
        "@type": "Person",
        name: book.author,
      },
      description: description,
      image: imageUrl,
      url: bookUrl,
      isbn: book.isbn || "",
      publisher: book.publisher
        ? {
            "@type": "Organization",
            name: book.publisher,
          }
        : undefined,
      datePublished: book.publishedDate || book.published || "",
      numberOfPages: book.pageCount || "",
      genre: book.category || book.genre || "",
      inLanguage: book.language || language,
      aggregateRating: book.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: book.rating,
            ratingCount: book.reviewCount || 0,
          }
        : undefined,
    };

    let script = document.querySelector("#book-json-ld");
    if (!script) {
      script = document.createElement("script");
      script.id = "book-json-ld";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    // Breadcrumb schema
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/${language}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Books",
          item: `${baseUrl}/${language}/books`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: book.title,
          item: bookUrl,
        },
      ],
    };

    let breadcrumbScript = document.querySelector("#breadcrumb-json-ld");
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.id = "breadcrumb-json-ld";
      breadcrumbScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);

    return () => {
      // Cleanup is handled automatically by Next.js
    };
  }, [book, language, pathname]);

  // This component doesn't render anything visible
  return null;
};

export default BookSEO;
