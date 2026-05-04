import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          <ScrollReveal className="about-img-wrapper">
            <div className="about-img">
              <img src="/images/cafe-interior.png" alt="Our Café Interior" />
            </div>
          </ScrollReveal>
          <ScrollReveal className="about-text-wrapper">
            <div className="about-text">
              <span className="section-label">Our Story</span>
              <h2>Crafted with Passion, Served with Love</h2>
              <p>Since 2018, Brew &amp; Bean has been more than just a coffee shop — it's a community. Founded by two friends who believed great coffee should come with a great atmosphere, we source our beans from sustainable farms across Colombia, Ethiopia, and Guatemala.</p>
              <p>Every cup is hand-crafted by our skilled baristas who bring years of passion to every pour. Step inside, and you'll find a place where time slows down.</p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="icon"><i className="fas fa-seedling"></i></div>
                  <span>Organic Beans</span>
                </div>
                <div className="about-feature">
                  <div className="icon"><i className="fas fa-award"></i></div>
                  <span>Award Winning</span>
                </div>
                <div className="about-feature">
                  <div className="icon"><i className="fas fa-leaf"></i></div>
                  <span>Sustainably Sourced</span>
                </div>
                <div className="about-feature">
                  <div className="icon"><i className="fas fa-heart"></i></div>
                  <span>Made with Love</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
