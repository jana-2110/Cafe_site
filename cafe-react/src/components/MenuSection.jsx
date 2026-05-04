import { useState, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'
import MenuCard from './MenuCard'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { fetchMenu } from '../services/api'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'tea', label: 'Tea' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'desserts', label: 'Desserts' },
]

export default function MenuSection({ onOpenCart }) {
  const [menuData, setMenuData] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const showToast = useToast()

  useEffect(() => {
    fetchMenu()
      .then(data => {
        setMenuData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleAddToCart = (item) => {
    addToCart(item)
    showToast(`${item.name} added to cart!`)
    onOpenCart()
  }

  // Flatten all items, optionally filter by category
  const allItems = Object.entries(menuData).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  )

  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category === activeCategory)

  return (
    <section className="section" id="menu">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Explore</span>
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">From bold espressos to delicate teas and indulgent desserts — there's something for everyone.</p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="menu-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`menu-tab ${activeCategory === cat.key ? 'active' : ''}`}
                data-category={cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
        <div className="menu-grid">
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', padding: '40px 0' }}>Loading menu...</p>
          ) : (
            filteredItems.map(item => (
              <ScrollReveal key={item.id}>
                <MenuCard item={item} onAddToCart={handleAddToCart} />
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
