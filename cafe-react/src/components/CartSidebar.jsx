import { useCart } from '../context/CartContext'

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart()

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        id="cartOverlay"
        onClick={onClose}
      ></div>
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} id="cartSidebar">
        <div className="cart-header">
          <h3><i className="fas fa-shopping-bag"></i> Your Cart</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty" id="cartEmpty">
              <i className="fas fa-coffee"></i>
              <p>Your cart is empty</p>
              <span>Add some delicious items!</span>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="item-price">₹{item.price * item.qty}</span>
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
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary" id="cartSummary">
            <div className="cart-total">
              <span>Total</span>
              <span id="cartTotal">₹{cartTotal}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onCheckout}
            >
              <i className="fas fa-credit-card"></i> Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
