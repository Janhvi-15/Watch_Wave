import React from "react";
import { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import { searchMovies, discoverMovies } from "../services/api";
import "../css/Home.css";

const DEFAULT_FILTERS = {
  genre: "",
  rating: "",
  year: "",
  language: "",
  sortBy: "popularity.desc",
};

function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetcher = debouncedQuery.trim()
      ? searchMovies(debouncedQuery).then((results) =>
          results.filter((m) => {
            if (filters.rating && m.vote_average < parseFloat(filters.rating))
              return false;
            if (filters.year && m.release_date?.split("-")[0] !== filters.year)
              return false;
            if (filters.language && m.original_language !== filters.language)
              return false;
            return true;
          }),
        )
      : discoverMovies(filters);

    fetcher
      .then(setMovies)
      .catch(() => setError("Failed to fetch movies. Try again."))
      .finally(() => setLoading(false));
  }, [debouncedQuery, filters]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Millions of movies.</h1>
        <p className="hero-sub">Search, explore, and save your favorites.</p>
        <div className="search-wrapper">
          <span className="search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie, genre, actor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="content-section">
        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="movies-grid skeleton-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="no-results">
            <p>No movies found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
