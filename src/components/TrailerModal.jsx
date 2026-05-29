import { useEffect, useState } from "react";
import { getMovieTrailer } from "../services/api";
import "../css/TrailerModal.css";

function TrailerModal({ movieId, movieTitle, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieTrailer(movieId).then((key) => {
      setTrailerKey(key);
      setLoading(false);
    });
  }, [movieId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="trailer-overlay" onClick={onClose}>
      <div className="trailer-box" onClick={(e) => e.stopPropagation()}>
        <div className="trailer-header">
          <h2>{movieTitle}</h2>
          <button className="trailer-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="trailer-player">
          {loading && <div className="trailer-loading">Loading...</div>}
          {!loading && !trailerKey && (
            <div className="trailer-not-found">No trailer available.</div>
          )}
          {trailerKey && (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${movieTitle} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
