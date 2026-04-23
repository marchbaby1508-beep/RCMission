import './HomePage.css'

export default function HomePage({ onLogin, onSignUp }) {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-brand">chaloo</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">IRCTC</a>
          <a href="#">Trains</a>
          <a href="#">Buses</a>
          <a href="#">Hotels</a>
        </nav>
        <div className="header-actions">
          <button className="link-button" onClick={onLogin}>
            Login
          </button>
          <button className="button-primary" onClick={onSignUp}>
            Sign Up
          </button>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Bus ticketing made easy</span>
          <h1>Travel by bus with confidence, comfort, and speed.</h1>
          <p>Search routes, compare fares, and book in a few clicks with a clean, minimalist experience.</p>
          <div className="hero-form">
            <label>
              From
              <input type="text" defaultValue="Delhi" />
            </label>
            <label>
              To
              <input type="text" defaultValue="Jaipur" />
            </label>
            <label>
              Date
              <input type="date" defaultValue="2026-05-01" />
            </label>
            <button className="button-primary">Search bus</button>
          </div>
        </div>
        <div className="hero-image" />
      </main>

      <section className="section-topics">
        <div className="topic-card">Ladies</div>
        <div className="topic-card">General</div>
        <div className="topic-card">AC</div>
        <div className="topic-card">Non-AC</div>
        <div className="topic-card">Sleeper</div>
      </section>
    </div>
  )
}
