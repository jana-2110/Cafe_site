import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <span className="logo-icon">☕</span> Brew & Bean
            </Link>
            <p>Handcrafted coffee, warm vibes, and a community that feels like home. Visit us and taste the difference.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#menu">Our Menu</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Menu</h4>
            <a href="#menu">Coffee</a>
            <a href="#menu">Tea</a>
            <a href="#menu">Snacks</a>
            <a href="#menu">Desserts</a>
          </div>
          <div className="footer-col">
            <h4>Hours</h4>
            <a href="#">Mon–Fri: 7AM–9PM</a>
            <a href="#">Sat–Sun: 8AM–10PM</a>
            <a href="#">Holidays: 9AM–6PM</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Brew &amp; Bean. All rights reserved.</p>
          <p>Crafted with <span style={{ color: 'var(--accent)' }}>♥</span> for coffee lovers</p>
        </div>
      </div>
    </footer>
  )
}
