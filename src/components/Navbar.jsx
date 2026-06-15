import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { favorites } = useMovieContext();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎬 <span>WatchWave</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <span className="nav-link-text">Discover</span>
          </Link>
          <Link
            to="/favorite"
            className={`nav-link ${location.pathname === "/favorite" ? "active" : ""}`}
          >
            <span className="nav-link-text">Favorites</span>
            {favorites.length > 0 && (
              <span className="nav-badge">{favorites.length}</span>
            )}
          </Link>

          <div className="nav-user">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="user-avatar"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="user-initials">
                {user?.email?.[0]?.toUpperCase()}
              </div>
            )}
            <span className="user-name">
              {user?.displayName?.split(" ")[0]}
            </span>
            <button className="btn-logout" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
