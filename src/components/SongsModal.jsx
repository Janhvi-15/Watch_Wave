import React from "react";
import "../css/SongsModal.css";

function SongsModal({ movie, onClose }) {
  if (!movie) return null;

  const title = encodeURIComponent(movie.title + " songs");
  const soundtrack = encodeURIComponent(movie.title + " soundtrack");

  const spotifyUrl = `https://open.spotify.com/search/${soundtrack}`;
  const ytMusicUrl = `https://music.youtube.com/search?q=${title}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${title}`;
  const gaanaUrl = `https://gaana.com/search/${soundtrack}`;

  return (
    <div className="songs-overlay" onClick={onClose}>
      <div className="songs-modal" onClick={(e) => e.stopPropagation()}>
        <button className="songs-close" onClick={onClose}>
          ✕
        </button>

        <div className="songs-header">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="songs-poster"
            />
          )}
          <div>
            <h2 className="songs-title">{movie.title}</h2>
            <p className="songs-subtitle">🎵 Listen to the soundtrack</p>
          </div>
        </div>

        <div className="songs-links">
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="songs-btn spotify"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.4c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.85-9.3-1.02-.35.08-.7-.15-.78-.5-.08-.35.15-.7.5-.78 4.05-.92 7.5-.52 10.3 1.18.3.2.4.6.18.92zm1.24-2.77c-.25.38-.76.5-1.14.25-2.86-1.76-7.22-2.27-10.6-1.24-.43.13-.88-.12-1.01-.55-.13-.43.12-.88.55-1.01 3.87-1.17 8.67-.6 11.95 1.41.38.25.5.76.25 1.14zm.1-2.88C14.96 8.8 9.3 8.6 5.9 9.67c-.52.16-1.07-.13-1.23-.65-.16-.52.13-1.07.65-1.23 3.95-1.2 10.52-.97 14.67 1.4.47.27.63.87.36 1.34-.27.47-.87.63-1.36.36z" />
            </svg>
            Spotify
          </a>

          <a
            href={ytMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="songs-btn ytmusic"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l7 4.5-7 4.5z" />
            </svg>
            YouTube Music
          </a>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="songs-btn youtube"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.8 8.001a2.75 2.75 0 0 0-1.936-1.946C18.166 5.6 12 5.6 12 5.6s-6.166 0-7.864.455A2.75 2.75 0 0 0 2.2 8.001 28.8 28.8 0 0 0 1.75 12a28.8 28.8 0 0 0 .45 3.999a2.75 2.75 0 0 0 1.936 1.945C5.834 18.4 12 18.4 12 18.4s6.166 0 7.864-.456a2.75 2.75 0 0 0 1.936-1.945A28.8 28.8 0 0 0 22.25 12a28.8 28.8 0 0 0-.45-3.999zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
            YouTube
          </a>

          <a
            href={gaanaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="songs-btn gaana"
          >
            🎶 Gaana
          </a>
        </div>
      </div>
    </div>
  );
}

export default SongsModal;
