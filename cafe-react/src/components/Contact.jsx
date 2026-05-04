import ScrollReveal from './ScrollReveal'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Visit Us</h2>
          <p className="section-subtitle">We'd love to see you! Drop by or reach out any time.</p>
        </ScrollReveal>
        <div className="contact-grid">
          <ScrollReveal className="contact-info-wrapper">
            <div className="contact-info">
              <div className="contact-item">
                <div className="icon-box"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4>Our Location</h4>
                  <p>42 Artisan Lane, Brewville<br />New York, NY 10012</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="fas fa-phone-alt"></i></div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 234-5678</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="fas fa-clock"></i></div>
                <div>
                  <h4>Opening Hours</h4>
                  <p>Mon – Fri: 7:00 AM – 9:00 PM<br />Sat – Sun: 8:00 AM – 10:00 PM</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="fas fa-envelope"></i></div>
                <div>
                  <h4>Email</h4>
                  <p>hello@brewandbean.com</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="contact-map-wrapper">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9!2d-74.0!3d40.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzQ4LjAiTiA3NMKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                title="Brew & Bean Location"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
