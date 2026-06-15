import React from "react";
import "../css/FilterBar.css";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

const YEARS = Array.from({ length: 30 }, (_, i) => 2024 - i);

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
];

function FilterBar({ filters, onChange, onClear }) {
  const hasActiveFilters =
    filters.genre ||
    filters.rating ||
    filters.year ||
    filters.language ||
    filters.sortBy !== "popularity.desc";

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Genre</label>
        <select
          className="filter-select"
          value={filters.genre}
          onChange={(e) => onChange("genre", e.target.value)}
        >
          <option value="">All</option>
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Min Rating</label>
        <select
          className="filter-select"
          value={filters.rating}
          onChange={(e) => onChange("rating", e.target.value)}
        >
          <option value="">Any</option>
          <option value="9">9+ ★</option>
          <option value="8">8+ ★</option>
          <option value="7">7+ ★</option>
          <option value="6">6+ ★</option>
          <option value="5">5+ ★</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Year</label>
        <select
          className="filter-select"
          value={filters.year}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value="">Any</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Language</label>
        <select
          className="filter-select"
          value={filters.language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="">Any</option>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="primary_release_date.desc">Newest</option>
          <option value="primary_release_date.asc">Oldest</option>
          <option value="revenue.desc">Top Grossing</option>
        </select>
      </div>

      {hasActiveFilters && (
        <div className="filter-group filter-group--clear">
          <label className="filter-label">&nbsp;</label>
          <button className="filter-clear" onClick={onClear}>
            ✕ Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
