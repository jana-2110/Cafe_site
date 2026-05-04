import ScrollReveal from './ScrollReveal'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { MENU_FLAT } from '../data/menuData'

const FEATURED_ITEMS = [
  { id: 'cappuccino', badge: 'Best Seller', desc: 'Rich espresso topped with velvety steamed milk foam and a dusting of cocoa.' },
  { id: 'croissant', badge: 'Popular', desc: 'Flaky, golden, freshly baked every morning with premium French butter.' },
  { id: 'matcha-latte', badge: 'New', desc: 'Ceremonial-grade matcha whisked with creamy oat milk for a smooth finish.' },
  { id: 'tiramisu', badge: 'Fan Fav', desc: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa.' },
]

export default function FeaturedSection({ onOpenCart }) {
  const { addToCart } = useCart()
  const showToast = useToast()

  const handleAdd = (itemId) => {
    const item = MENU_FLAT[itemId]
    if (!item) return
    addToCart(item)
    showToast(`${item.name} added to cart!`)
    onOpenCart()
  }

  return (
    <section className="section featured" id="featured">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Our Specials</span>
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Handpicked favourites that our customers can't get enough of.</p>
        </ScrollReveal>
        <div className="featured-grid">
          {FEATURED_ITEMS.map(feat => {
            const item = MENU_FLAT[feat.id]
            if (!item) return null
            return (
              <ScrollReveal key={feat.id} className="feature-card-wrapper">
                <div className="feature-card">
                  <span className="card-badge">{feat.badge}</span>
                  <div className="card-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="card-body">
                    <h3>{item.name}</h3>
                    <p>{feat.desc}</p>
                    <div className="card-footer">
                      <span className="price">₹{item.price}</span>
                      <button className="btn btn-primary btn-sm" onClick={() => handleAdd(feat.id)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
