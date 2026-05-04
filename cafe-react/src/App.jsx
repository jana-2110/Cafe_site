import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import CheckoutModal from './components/CheckoutModal'
import WhatsAppButton from './components/WhatsAppButton'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [hash])
  return null
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const openCart = () => {
    setCartOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeCart = () => {
    setCartOpen(false)
    document.body.style.overflow = ''
  }

  const openCheckout = () => {
    closeCart()
    setTimeout(() => {
      setCheckoutOpen(true)
      document.body.style.overflow = 'hidden'
    }, 100)
  }

  const closeCheckout = () => {
    setCheckoutOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <ToastProvider>
      <ScrollToTop />
      <ScrollToHash />
      <Navbar onOpenCart={openCart} />

      <Routes>
        <Route path="/" element={<Home onOpenCart={openCart} />} />
        <Route path="/menu" element={<MenuPage onOpenCart={openCart} />} />
        <Route path="/cart" element={<CartPage onOpenCheckout={openCheckout} />} />
      </Routes>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={closeCart} onCheckout={openCheckout} />
      <CheckoutModal isOpen={checkoutOpen} onClose={closeCheckout} />
      <WhatsAppButton />
    </ToastProvider>
  )
}
