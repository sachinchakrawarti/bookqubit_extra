"use client";

import { useKnowledgeSearch } from "../hooks/useKnowledgeSearch";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import ResultsGrid from "./ResultsGrid";
import SearchStats from "./SearchStats";
import "../knowledgegraph.css";

export default function KnowledgeGraph({ initialQuery = "" }) {
  const {
    query,
    setQuery,
    results,
    loading,
    selectedFilter,
    setSelectedFilter,
    recentSearches,
    suggestions,
    clearSearch,
    getFilteredResults,
    getTotalCount,
  } = useKnowledgeSearch();

  const filteredResults = getFilteredResults();
  const totalCount = getTotalCount();

  // Get counts for filter tabs
  const counts = {
    all: totalCount,
    books: results.books?.length || 0,
    authors: results.authors?.length || 0,
    tags: results.tags?.length || 0,
    news: results.news?.length || 0,
    blogs: results.blogs?.length || 0,
  };

  return (
    <div className="knowledge-graph">
      <div className="kg-header">
        <h1 className="kg-title">🔍 Knowledge Graph</h1>
        <p className="kg-subtitle">
          Search and discover connections between books, authors, and topics
        </p>
      </div>

      <SearchBar
        query={query}
        onSearch={setQuery}
        onClear={clearSearch}
        suggestions={suggestions}
        recentSearches={recentSearches}
        loading={loading}
      />

      {totalCount > 0 && (
        <>
          <SearchStats results={results} totalCount={totalCount} />
          <FilterTabs
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            counts={counts}
          />
          <ResultsGrid
            results={filteredResults}
            selectedFilter={selectedFilter}
          />
        </>
      )}

      {query && totalCount === 0 && !loading && (
        <div className="kg-no-results">
          <div className="kg-no-results-icon">🔍</div>
          <h3>No results found for "{query}"</h3>
          <p>Try different keywords or check your spelling</p>
        </div>
      )}

      {!query && !loading && (
        <div className="kg-welcome">
          <div className="kg-welcome-icon">📚</div>
          <h3>Start your search</h3>
          <p>Search for books, authors, topics, or explore connections</p>
          <div className="kg-welcome-tags">
            <span className="kg-welcome-tag">#ClassicLiterature</span>
            <span className="kg-welcome-tag">#DystopianFuture</span>
            <span className="kg-welcome-tag">#SpaceOpera</span>
            <span className="kg-welcome-tag">#FantasyAdventure</span>
          </div>
        </div>
      )}
    </div>
  );
}
