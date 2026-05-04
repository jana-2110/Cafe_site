import ScrollReveal from './ScrollReveal'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img src="/images/hero-bg.png" alt="Café ambiance" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-star"></i> Est. 2018 — Specialty Coffee
          </div>
          <h1>Where Every Sip Tells a <span className="highlight">Story</span></h1>
          <p>Handcrafted beverages, freshly baked pastries, and a warm atmosphere — your perfect escape from the everyday.</p>
          <div className="hero-buttons">
            <a href="#menu" className="btn btn-primary">
              <i className="fas fa-book-open"></i> View Menu
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-calendar-check"></i> Book a Table
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>15K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="hero-stat">
              <h3>50+</h3>
              <p>Menu Items</p>
            </div>
            <div className="hero-stat">
              <h3>4.9</h3>
              <p>Star Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
