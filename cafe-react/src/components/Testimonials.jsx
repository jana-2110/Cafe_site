import ScrollReveal from './ScrollReveal'
import ReviewCard from './ReviewCard'

const REVIEWS = [
  {
    name: 'Sarah Mitchell',
    role: 'Regular Customer',
    initials: 'SM',
    rating: 5,
    feedback: "Absolutely the best cappuccino in town! The atmosphere is so cozy and the staff is incredibly friendly. This has become my go-to spot for remote work days.",
  },
  {
    name: 'James Chen',
    role: 'Food Blogger',
    initials: 'JC',
    rating: 5,
    feedback: "Their tiramisu is out of this world! I've tried many cafés but Brew & Bean consistently delivers quality and taste. The matcha latte is a must-try!",
  },
  {
    name: 'Amara Rodriguez',
    role: 'Coffee Enthusiast',
    initials: 'AR',
    rating: 4.5,
    feedback: "I love how they source their beans sustainably. You can truly taste the difference. The warm interior and amazing playlist make it the perfect weekend retreat.",
  },
]

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <ScrollReveal>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Real reviews from real coffee lovers who keep coming back for more.</p>
          </div>
        </ScrollReveal>
        <div className="testimonials-grid">
          {REVIEWS.map((review, i) => (
            <ScrollReveal key={i}>
              <ReviewCard review={review} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
