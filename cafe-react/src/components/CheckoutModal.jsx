import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'
import { placeOrder, saveOrderToSupabase } from '../services/api'

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, resetCart } = useCart()
  const showToast = useToast()
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [orderInfo, setOrderInfo] = useState(null)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', notes: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) { showToast('Please enter your name'); return }
    if (!form.phone.trim()) { showToast('Please enter your phone number'); return }

    setLoading(true)

    try {
      const order = await placeOrder({
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
        },
        items: cart.map(item => ({ id: item.id, qty: item.qty })),
        notes: form.notes.trim(),
      })

      // Optionally save to Supabase for analytics
      saveOrderToSupabase(order)

      setOrderInfo(order)
      setConfirmed(true)
    } catch (err) {
      showToast(err.message || 'Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDone = () => {
    onClose()
    resetCart()
    setConfirmed(false)
    setOrderInfo(null)
    setForm({ name: '', phone: '', email: '', notes: '' })
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className={`modal-overlay ${isOpen ? 'open' : ''}`}
        id="checkoutOverlay"
        onClick={confirmed ? handleDone : onClose}
      ></div>
      <div className={`checkout-modal ${isOpen ? 'open' : ''}`} id="checkoutModal">
        {/* Step 1: Form */}
        {!confirmed && (
          <div className="checkout-step" id="checkoutForm">
            <div className="modal-header">
              <h3><i className="fas fa-receipt"></i> Checkout</h3>
              <button className="cart-close" onClick={onClose} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="checkout-body">
              <div className="checkout-items-summary" id="checkoutItemsSummary">
                {cart.map(item => (
                  <div className="summary-item" key={item.id}>
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="custName">Full Name *</label>
                <input
                  type="text"
                  id="custName"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="custPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="custPhone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="custEmail">Email (optional)</label>
                <input
                  type="email"
                  id="custEmail"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="custNotes">Special Instructions</label>
                <textarea
                  id="custNotes"
                  name="notes"
                  rows="3"
                  placeholder="Any allergies or special requests..."
                  value={form.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="checkout-total">
                <span>Order Total</span>
                <span id="checkoutTotal">₹{cartTotal}</span>
              </div>
              <button
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                style={{ width: '100%', justifyContent: 'center' }}
                id="placeOrderBtn"
                onClick={handleSubmit}
                disabled={loading}
              >
                <i className={`fas ${loading ? 'fa-spinner' : 'fa-paper-plane'}`}></i>
                {loading ? ' Placing Order...' : ' Place Order'}
              </button>
              <p className="checkout-note">You'll receive a confirmation with your order ID</p>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {confirmed && orderInfo && (
          <div className="checkout-step" id="checkoutConfirm">
            <div className="confirm-content">
              <div className="confirm-icon"><i className="fas fa-check-circle"></i></div>
              <h2>Order Placed!</h2>
              <p className="confirm-subtitle">Thank you for your order</p>
              <div className="confirm-details">
                <div className="confirm-row">
                  <span>Order ID</span>
                  <strong id="confirmOrderId">{orderInfo.orderId}</strong>
                </div>
                <div className="confirm-row">
                  <span>Total</span>
                  <strong id="confirmTotal">₹{orderInfo.total}</strong>
                </div>
                <div className="confirm-row">
                  <span>Status</span>
                  <span className="status-badge">Pending</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                onClick={handleDone}
              >
                <i className="fas fa-home"></i> Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
