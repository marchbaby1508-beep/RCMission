import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`chaloo-header ${scrolled ? "scrolled" : ""}`}>
      {/* Top utility bar */}
      <div className="header-utility-bar">
        <div className="utility-left">
          <span className="utility-item">📞 1800-XXX-XXXX (Toll Free)</span>
          <span className="utility-divider">|</span>
          <span className="utility-item">✉ support@chaloo.np</span>
        </div>
        <div className="utility-right">
          <span className="utility-item lang-toggle">🌐 EN | NP</span>
          <span className="utility-divider">|</span>
          <span className="utility-item">🕐 SYSTEM IS AVAILABLE 24 × 7</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="main-nav">
        {/* Logo */}
        <Link to="/" className="nav-logo" id="nav-logo-link">
          <span className="logo-icon">🚍</span>
          <div className="logo-text">
            <span className="logo-name">CHALOO</span>
            <span className="logo-tagline">Book. Travel. Arrive.</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links" id="nav-links-desktop">
          <li className="nav-item has-dropdown" id="nav-trains">
            <a href="#" className="nav-link">🚌 Buses <span className="chevron">▾</span></a>
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-item" id="dd-book-ticket">🎫 Book Ticket</Link>
              <Link to="/" className="dropdown-item" id="dd-pnr">📋 PNR Status</Link>
              <Link to="/" className="dropdown-item" id="dd-schedule">📅 Bus Schedule</Link>
              <Link to="/" className="dropdown-item" id="dd-cancel">❌ Cancel Ticket</Link>
            </div>
          </li>
          <li className="nav-item has-dropdown" id="nav-tourism">
            <a href="#" className="nav-link">🏔 Tourism <span className="chevron">▾</span></a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" id="dd-packages">🏞 Tour Packages</a>
              <a href="#" className="dropdown-item" id="dd-hotels">🏨 Hotels</a>
              <a href="#" className="dropdown-item" id="dd-cabs">🚕 Cab Booking</a>
            </div>
          </li>
          <li className="nav-item" id="nav-offers">
            <a href="#" className="nav-link">🎁 Offers</a>
          </li>
          <li className="nav-item" id="nav-help">
            <a href="#" className="nav-link">❓ Help</a>
          </li>
        </ul>

        {/* Auth buttons */}
        <div className="nav-auth" id="nav-auth-section">
          <Link to="/login" className="btn-login" id="btn-nav-login">Login</Link>
          <Link to="/signup" className="btn-signup" id="btn-nav-signup">Register</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          id="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} id="mobile-menu">
        <Link to="/" className="mobile-link" onClick={() => setMobileOpen(false)}>🏠 Home</Link>
        <Link to="/" className="mobile-link" onClick={() => setMobileOpen(false)}>🚌 Buses</Link>
        <a href="#" className="mobile-link">🏔 Tourism</a>
        <a href="#" className="mobile-link">🎁 Offers</a>
        <a href="#" className="mobile-link">❓ Help</a>
        <div className="mobile-auth">
          <Link to="/login" className="btn-login" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link to="/signup" className="btn-signup" onClick={() => setMobileOpen(false)}>Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;