import "../css/SplashScreen.css";
import React from "react";

function SplashScreen() {
  return (
    <div className="splash">
      <div className="splash-logo">
        <span className="splash-icon">🎬</span>
        <span className="splash-text">WatchWave</span>
      </div>
      <div className="splash-bar" />
    </div>
  );
}

export default SplashScreen;
