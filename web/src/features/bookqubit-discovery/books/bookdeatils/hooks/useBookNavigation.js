import { useBookNavigation } from '@/features/bookqubit-discovery/books/bookdeatils/hooks/useBookNavigation';

const BookDetailsPage = ({ params }) => {
  const { book, books, language } = useBookData({...});
  
  const {
    prevBook,
    nextBook,
    hasPrev,
    hasNext,
    navigateToPrev,
    navigateToNext,
    navigateToRandom,
    getPositionText,
    getProgress,
  } = useBookNavigation({
    books: books,
    currentBook: book,
    language: language,
    basePath: '/books',
  });

  return (
    <div>
      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        <button 
          onClick={navigateToPrev} 
          disabled={!hasPrev}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span className="text-sm">
          {getPositionText()}
        </span>
        
        <button 
          onClick={navigateToNext} 
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
        
        <button 
          onClick={navigateToRandom}
          className="px-4 py-2 bg-sky-500 text-white rounded"
        >
          Random
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded">
        <div 
          className="h-full bg-sky-500 rounded transition-all duration-300"
          style={{ width: `${getProgress()}%` }}
        />
      </div>
      
      {/* Quick navigation to related books */}
      <button onClick={() => navigateToRelated('author')}>
        Read more by {book.author}
      </button>
    </div>
  );
};