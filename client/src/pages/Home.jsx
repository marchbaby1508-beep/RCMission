import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

// ─── Dummy Data ─────────────────────────────────────────────
const CITIES = [
  "Kathmandu", "Pokhara", "Chitwan", "Lumbini", "Janakpur",
  "Biratnagar", "Butwal", "Dharan", "Hetauda", "Birgunj",
  "Nepalgunj", "Dhangadhi", "Sarlahi", "Sindhuli", "Gorkha"
];

const BUSES = [
  {
    id: 1, operator: "Sajha Yatayat", from: "Kathmandu", to: "Pokhara",
    departure: "06:00 AM", arrival: "12:30 PM", duration: "6h 30m",
    type: "AC", seats: 18, price: 1200, rating: 4.5,
    amenities: ["WiFi", "AC", "Charging Port", "Water"],
    badge: "Premium",
  },
  {
    id: 2, operator: "Green Line Tours", from: "Kathmandu", to: "Pokhara",
    departure: "07:30 AM", arrival: "01:45 PM", duration: "6h 15m",
    type: "AC", seats: 12, price: 1500, rating: 4.8,
    amenities: ["WiFi", "AC", "Meals", "Blanket", "Charging Port"],
    badge: "Top Rated",
  },
  {
    id: 3, operator: "Buddha Air Bus", from: "Kathmandu", to: "Chitwan",
    departure: "08:00 AM", arrival: "12:00 PM", duration: "4h 00m",
    type: "Non-AC", seats: 34, price: 600, rating: 3.9,
    amenities: ["Water"],
    badge: "Budget",
  },
  {
    id: 4, operator: "Deluxe Travels", from: "Pokhara", to: "Kathmandu",
    departure: "09:00 AM", arrival: "03:30 PM", duration: "6h 30m",
    type: "Ladies Special", seats: 22, price: 1100, rating: 4.3,
    amenities: ["AC", "Women Only", "Charging Port"],
    badge: "Ladies",
  },
  {
    id: 5, operator: "Himalayan Express", from: "Kathmandu", to: "Biratnagar",
    departure: "05:30 PM", arrival: "09:30 AM", duration: "16h 00m",
    type: "Sleeper AC", seats: 8, price: 2400, rating: 4.6,
    amenities: ["WiFi", "AC", "Sleeper", "Meals", "Blanket"],
    badge: "Overnight",
  },
  {
    id: 6, operator: "Lumbini Express", from: "Kathmandu", to: "Lumbini",
    departure: "06:30 PM", arrival: "06:00 AM", duration: "11h 30m",
    type: "General", seats: 45, price: 900, rating: 3.7,
    amenities: ["Water"],
    badge: "",
  },
];

const SOCIAL_CARDS = [
  { platform: "Facebook", icon: "📘", handle: "@ChalooBus", followers: "48K", color: "#1877F2", link: "https://facebook.com" },
  { platform: "Instagram", icon: "📸", handle: "@chaloo.bus", followers: "32K", color: "#E1306C", link: "https://instagram.com" },
  { platform: "Twitter/X", icon: "🐦", handle: "@ChalooBus", followers: "21K", color: "#1DA1F2", link: "https://twitter.com" },
  { platform: "YouTube", icon: "▶", handle: "Chaloo Bus Nepal", followers: "15K", color: "#FF0000", link: "https://youtube.com" },
];

// ─── Category Icons ──────────────────────────────────────────
const CATEGORIES = [
  { label: "Ladies Special", icon: "👩", id: "cat-ladies" },
  { label: "General", icon: "🚌", id: "cat-general" },
  { label: "AC Deluxe", icon: "❄️", id: "cat-ac" },
  { label: "Non-AC", icon: "🌬️", id: "cat-nonac" },
  { label: "Sleeper", icon: "🛌", id: "cat-sleeper" },
  { label: "Night Bus", icon: "🌙", id: "cat-night" },
];

// ─── Home Component ─────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchError, setSearchError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    setSearchError("");
    if (!from.trim() || !to.trim() || !date) {
      setSearchError("⚠️ Please fill in all fields — From, To, and Date.");
      return;
    }
    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setSearchError("⚠️ Source and destination cannot be the same.");
      return;
    }
    const results = BUSES.filter(
      (b) =>
        (!activeCategory || b.type === activeCategory) &&
        (b.from.toLowerCase().includes(from.toLowerCase()) ||
          b.to.toLowerCase().includes(to.toLowerCase()))
    );
    setFilteredBuses(results.length ? results : BUSES.slice(0, 4));
    setShowResults(true);
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCategoryClick = (label) => {
    setActiveCategory(activeCategory === label ? null : label);
    setShowResults(false);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero" id="hero-section">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-headline">
            <h1 className="hero-title">
              <span className="brand-tag">🚍 CHALOO</span>
              <br />
              Nepal's Fastest Bus Booking
            </h1>
            <p className="hero-subtitle">
              Book your seat in seconds. Travel with comfort and confidence.
            </p>
          </div>

          {/* Booking Box */}
          <div className="booking-card" id="booking-card">
            <div className="booking-card-header">
              <span className="booking-label">🎫 Book Your Bus Ticket</span>
            </div>

            <div className="booking-form">
              {/* From */}
              <div className="input-group" id="input-from">
                <label>From</label>
                <div className="input-with-icon">
                  <span className="input-icon">📍</span>
                  <input
                    id="from-input"
                    type="text"
                    placeholder="Departure City"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    list="city-list"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <button className="swap-btn" id="swap-btn" onClick={handleSwap} title="Swap cities">
                ⇄
              </button>

              {/* To */}
              <div className="input-group" id="input-to">
                <label>To</label>
                <div className="input-with-icon">
                  <span className="input-icon">🏁</span>
                  <input
                    id="to-input"
                    type="text"
                    placeholder="Destination City"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    list="city-list"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="input-group" id="input-date">
                <label>Date</label>
                <div className="input-with-icon">
                  <span className="input-icon">📅</span>
                  <input
                    id="date-input"
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Search */}
              <button className="search-btn" id="search-btn" onClick={handleSearch}>
                🔍 Search Bus
              </button>
            </div>

            {searchError && <p className="search-error">{searchError}</p>}

            {/* City Datalist */}
            <datalist id="city-list">
              {CITIES.map((c) => <option key={c} value={c} />)}
            </datalist>

            {/* Category Bar */}
            <div className="category-bar" id="category-bar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={cat.id}
                  className={`cat-chip ${activeCategory === cat.label ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat.label)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-num">5000+</span><span className="stat-label">Daily Buses</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">200+</span><span className="stat-label">Routes</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">2M+</span><span className="stat-label">Happy Travelers</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-num">4.8★</span><span className="stat-label">App Rating</span></div>
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ── */}
      {showResults && (
        <section className="results-section" id="results-section">
          <div className="results-container">
            <h2 className="results-title">
              🚌 Available Buses — <span>{from} → {to}</span>
            </h2>
            <p className="results-count">{filteredBuses.length} buses found</p>

            <div className="bus-list">
              {filteredBuses.map((bus) => (
                <div className="bus-card" key={bus.id} id={`bus-card-${bus.id}`}>
                  {bus.badge && <span className="bus-badge">{bus.badge}</span>}
                  <div className="bus-card-top">
                    <div className="bus-operator">
                      <span className="operator-icon">🚌</span>
                      <div>
                        <h3 className="operator-name">{bus.operator}</h3>
                        <span className="bus-type-tag">{bus.type}</span>
                      </div>
                    </div>
                    <div className="bus-route">
                      <div className="time-block">
                        <span className="time">{bus.departure}</span>
                        <span className="city">{bus.from}</span>
                      </div>
                      <div className="route-line">
                        <div className="dot start" />
                        <div className="line" />
                        <span className="duration-tag">{bus.duration}</span>
                        <div className="line" />
                        <div className="dot end" />
                      </div>
                      <div className="time-block">
                        <span className="time">{bus.arrival}</span>
                        <span className="city">{bus.to}</span>
                      </div>
                    </div>
                    <div className="bus-price-block">
                      <span className="price">₨ {bus.price}</span>
                      <span className="seats">{bus.seats} seats left</span>
                      <div className="rating">⭐ {bus.rating}</div>
                    </div>
                  </div>

                  <div className="bus-card-bottom">
                    <div className="amenities">
                      {bus.amenities.map((a) => (
                        <span key={a} className="amenity-tag">{a}</span>
                      ))}
                    </div>
                    <button
                      className="book-now-btn"
                      id={`book-btn-${bus.id}`}
                      onClick={() => navigate("/login")}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      <section className="features-section" id="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose <span>CHALOO</span>?</h2>
          <p className="section-subtitle">The smartest way to book buses across Nepal</p>
          <div className="features-grid">
            {[
              { icon: "⚡", title: "Instant Booking", desc: "Book your ticket in under 60 seconds with our lightning-fast platform." },
              { icon: "💳", title: "Secure Payments", desc: "Multiple payment options including eSewa, Khalti, card, and cash." },
              { icon: "🔄", title: "Easy Cancellation", desc: "Flexible cancellation policy with quick refund processing." },
              { icon: "📍", title: "Live Tracking", desc: "Track your bus in real-time with our GPS-powered system." },
              { icon: "🎫", title: "E-Tickets", desc: "Receive your ticket instantly on email and SMS." },
              { icon: "🤝", title: "24/7 Support", desc: "Round-the-clock customer support for a hassle-free journey." },
            ].map((f, i) => (
              <div className="feature-card" key={i} id={`feature-${i}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL MEDIA ── */}
      <section className="social-section" id="social-section">
        <div className="section-container">
          <h2 className="section-title">Follow <span>CHALOO</span></h2>
          <p className="section-subtitle">Stay connected with us on social media</p>
          <div className="social-grid">
            {SOCIAL_CARDS.map((s) => (
              <a
                key={s.platform}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                id={`social-${s.platform.toLowerCase().replace("/", "-")}`}
                style={{ "--card-color": s.color }}
              >
                <div className="social-icon">{s.icon}</div>
                <div className="social-info">
                  <span className="social-platform">{s.platform}</span>
                  <span className="social-handle">{s.handle}</span>
                  <span className="social-followers">{s.followers} followers</span>
                </div>
                <div className="social-follow-btn">Follow</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🚍 CHALOO</span>
            <p>Nepal's most trusted bus booking platform. Travel safe, travel smart.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#">Book Ticket</a>
            <a href="#">PNR Status</a>
            <a href="#">Bus Schedule</a>
            <a href="#">Offers</a>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Cancellation Policy</a>
            <a href="#">Refund Status</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CHALOO. All rights reserved. Built with ❤️ in Nepal.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;