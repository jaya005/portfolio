import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyNavbar.css"; // Import the CSS file
import { logout } from "../utils/auth";

const MyNavbar = ({ isAuthenticated, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    // Reload the page to reset all state
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Brand Name */}
      <div className="brand">
        <Link to="/" className="brand-link">ProfFolio</Link>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</Link></li>
        <li><Link to="/research-papers" className="nav-link" onClick={() => setMenuOpen(false)}>Research</Link></li>
        <li><Link to="/conferences" className="nav-link" onClick={() => setMenuOpen(false)}>Conferences</Link></li>
        <li><Link to="/achievements" className="nav-link" onClick={() => setMenuOpen(false)}>Achievements</Link></li>
        <li><Link to="/teaching-experience" className="nav-link" onClick={() => setMenuOpen(false)}>Teaching</Link></li>
        <li><Link to="/collaborations" className="nav-link" onClick={() => setMenuOpen(false)}>Collaborations</Link></li>
        <li><Link to="/blog" className="nav-link" onClick={() => setMenuOpen(false)}>Blog</Link></li>
        
        {/* Show Admin link only if user is admin */}
        {isAuthenticated && isAdmin && (
          <li><Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        )}
        
        {/* Show Login/Logout based on authentication status */}
        {isAuthenticated ? (
          <li>
            <button 
              onClick={handleLogout} 
              className="nav-link logout-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </li>
        ) : (
          <li><Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default MyNavbar;
