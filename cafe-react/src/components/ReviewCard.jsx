export default function ReviewCard({ review }) {
  const { name, role, initials, rating, feedback } = review

  const renderStars = () => {
    const stars = []
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5

    for (let i = 0; i < full; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>)
    }
    if (half) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }
    return stars
  }

  return (
    <div className="review-card">
      <div className="quote-icon">"</div>
      <div className="stars">
        {renderStars()}
      </div>
      <p className="feedback">{feedback}</p>
      <div className="reviewer">
        <div className="reviewer-avatar">{initials}</div>
        <div className="reviewer-info">
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}
