import React from "react";
import { useState } from "react";
import SongsModal from "./SongsModal";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import TrailerModal from "./TrailerModal";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const isMovieFavorite = isFavorite(movie.id);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showSongs, setShowSongs] = useState(false);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  function onSongsClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowSongs(true);
  }

  return (
    <>
      <div className="movie-card" onClick={() => setShowTrailer(true)}>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${isMovieFavorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ❤️
            </button>
            <button className="btn-songs" onClick={onSongsClick}>
              🎵 Songs
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          movieTitle={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}

      {showSongs && (
        <SongsModal movie={movie} onClose={() => setShowSongs(false)} />
      )}
    </>
  );
}

export default MovieCard;
