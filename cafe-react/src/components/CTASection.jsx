import ScrollReveal from './ScrollReveal'

export default function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Don't Miss Out</span>
          <h2>Ready for the Perfect Cup?</h2>
          <p>Visit us today or book a table for your next special occasion. Great coffee, warm vibes, and unforgettable moments await.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-calendar-alt"></i> Book a Table
            </a>
            <a href="#menu" className="btn btn-secondary">
              <i className="fas fa-utensils"></i> See Full Menu
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
