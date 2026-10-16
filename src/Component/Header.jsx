// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen } from "../redux/bookingSlice";
import { logoutUser } from "../services/authApi";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  // Pull cart count from Redux store safely
  const cartItems = useSelector((state) => state.booking?.cart) || [];
  const totalItems = cartItems.reduce((sum, item) => sum + (item.travelers || 1), 0);

  const handleLogout = () => {
    logoutUser(); // Clear token and auth storage
    logout();     // Update context user state
    navigate("/login");
  };

  return (
    <header className="site-header" style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", background: "#f8f9fa", borderBottom: "1px solid #ddd", alignItems: "center" }}>
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>🌍 TravelApp</h2>
      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/packages">Packages</Link>

        {/* Cart Button to trigger Redux side drawer */}
        <button 
          onClick={() => dispatch(setCartOpen(true))}
          style={{ padding: "6px 12px", backgroundColor: "#ffc107", color: "#000", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          🛒 Cart ({totalItems})
        </button>

        {/* User Auth Section */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>Hello, <strong>{user.name || user.email}</strong></span>
            <button 
              onClick={handleLogout} 
              style={{ padding: "6px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ padding: "6px 12px", backgroundColor: "#007BFF", color: "white", borderRadius: "4px", textDecoration: "none" }}>
            Login / Signup
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;