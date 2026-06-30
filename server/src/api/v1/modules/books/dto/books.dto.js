// src/api/v1/modules/books/dto/books.dto.js

// Data Transfer Objects for Books

export class BookDTO {
  constructor(book) {
    this.id = book.id;
    this.title = book.title;
    this.slug = book.slug;
    this.author = book.author;
    this.description = book.description;
    this.category = book.category;
    this.price = book.price;
    this.imageUrl = book.imageUrl;
    this.rating = book.rating;
    this.language = book.language || 'English';
    this.published = book.published;
    this.publisher = book.publisher;
    this.pageCount = book.pageCount;
    this.isbn = book.isbn;
    this.tags = book.tags || [];
    this.genres = book.genres || [];
    this.subjects = book.subjects || [];
    this.summary = book.summary;
    this.buttons = book.buttons;
    this.geography = book.geography;
    this.keyPoints = book.keyPoints || [];
  }

  // Simplified version for list views
  static toSummary(book) {
    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      category: book.category,
      price: book.price,
      imageUrl: book.imageUrl,
      rating: book.rating,
      language: book.language || 'English',
      published: book.published,
      tags: (book.tags || []).slice(0, 3)
    };
  }

  // Detailed version for single book view
  static toDetail(book) {
    return new BookDTO(book);
  }
}

export class CreateBookDTO {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.category = data.category;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.language = data.language;
    this.published = data.published;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.isbn = data.isbn;
    this.tags = data.tags || [];
    this.genres = data.genres || [];
    this.subjects = data.subjects || [];
    this.summary = data.summary;
    this.geography = data.geography;
    this.keyPoints = data.keyPoints || [];
  }
}

export class UpdateBookDTO {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.category = data.category;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.tags = data.tags;
    this.genres = data.genres;
    this.subjects = data.subjects;
    this.summary = data.summary;
    // Only include fields that are provided
    Object.keys(this).forEach(key => {
      if (this[key] === undefined) {
        delete this[key];
      }
    });
  }
}

export class BookListResponseDTO {
  constructor(books, pagination) {
    this.success = true;
    this.data = books.map(book => BookDTO.toSummary(book));
    this.pagination = pagination;
    this.total = books.length;
  }
}

export class BookDetailResponseDTO {
  constructor(book) {
    this.success = true;
    this.data = BookDTO.toDetail(book);
  }
}

// Default export for convenience
export default {
  BookDTO,
  CreateBookDTO,
  UpdateBookDTO,
  BookListResponseDTO,
  BookDetailResponseDTO
};