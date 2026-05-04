import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

// Load cart from localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem('brewbean-cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload)
    case 'UPDATE_QTY': {
      const { id, delta } = action.payload
      const updated = state.map(item =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      )
      return updated.filter(item => item.qty > 0)
    }
    case 'RESET_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart)

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('brewbean-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const updateQty = (id, delta) => dispatch({ type: 'UPDATE_QTY', payload: { id, delta } })
  const resetCart = () => dispatch({ type: 'RESET_CART' })

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, resetCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
