import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ScrollReveal from '../components/ScrollReveal'

export default function CartPage({ onOpenCheckout }) {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart()

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Your Order</span>
            <h2 className="section-title">Shopping Cart</h2>
            <p className="section-subtitle">
              {cartCount > 0
                ? `You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart.`
                : 'Your cart is empty.'}
            </p>
          </ScrollReveal>

          {cart.length === 0 ? (
            <ScrollReveal>
              <div style={{
                textAlign: 'center',
                padding: '60px 0',
                color: 'var(--text-muted)',
              }}>
                <i className="fas fa-coffee" style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.3, display: 'block' }}></i>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Nothing here yet!
                </p>
                <p style={{ fontSize: '0.9rem', marginBottom: '28px' }}>
                  Browse our menu and add some delicious items.
                </p>
                <Link to="/#menu" className="btn btn-primary">
                  <i className="fas fa-book-open"></i> View Menu
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <>
              <div style={{ marginTop: '40px' }}>
                {cart.map(item => (
                  <ScrollReveal key={item.id}>
                    <div className="cart-item" style={{
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius)',
                      padding: '20px 24px',
                      marginBottom: '16px',
                      border: '1px solid var(--border)',
                    }}>
                      <div className="cart-item-img" style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-sm)' }}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info" style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{item.name}</h4>
                        <span className="item-price" style={{ fontSize: '1rem' }}>₹{item.price * item.qty}</span>
                      </div>
                      <div className="cart-item-controls">
                        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove"
                        style={{ fontSize: '1rem', padding: '8px' }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius)',
                padding: '28px 32px',
                marginTop: '32px',
                border: '1px solid var(--border)',
              }}>
                <div className="cart-total" style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.2rem' }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    color: 'var(--accent)',
                    fontWeight: 700,
                  }}>₹{cartTotal}</span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px 32px' }}
                  onClick={onOpenCheckout}
                >
                  <i className="fas fa-credit-card"></i> Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
