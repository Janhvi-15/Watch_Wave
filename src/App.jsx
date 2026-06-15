import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import SplashScreen from "./components/SplashScreen";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={<Favorite />} />
              </Routes>
            </main>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <MovieProvider>
        {showSplash && <SplashScreen />}
        <AppRoutes />
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
