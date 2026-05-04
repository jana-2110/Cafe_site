import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobile = () => {
    setMobileOpen(prev => !prev)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  // For home page we use hash links, for other pages we link to /#section
  const navLink = (hash, label) => {
    if (isHome) {
      return (
        <a href={`#${hash}`} onClick={closeMobile}>
          {label}
        </a>
      )
    }
    return (
      <Link to={`/#${hash}`} onClick={closeMobile}>
        {label}
      </Link>
    )
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">☕</span> Brew & Bean
          </Link>
          <div className="nav-links">
            {navLink('home', 'Home')}
            {navLink('menu', 'Menu')}
            {navLink('about', 'About')}
            {navLink('testimonials', 'Reviews')}
            {navLink('contact', 'Contact')}
          </div>
          <button
            className="btn btn-primary nav-order-btn"
            style={{ position: 'relative' }}
            onClick={onOpenCart}
          >
            <i className="fas fa-shopping-bag"></i> Cart
            <span
              className="cart-count"
              style={{ display: cartCount > 0 ? 'flex' : 'none' }}
            >
              {cartCount}
            </span>
          </button>
          <button
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            id="hamburger"
            aria-label="Toggle navigation"
            onClick={toggleMobile}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobileNav">
        {navLink('home', 'Home')}
        {navLink('featured', 'Featured')}
        {navLink('menu', 'Menu')}
        {navLink('about', 'About')}
        {navLink('testimonials', 'Reviews')}
        {navLink('contact', 'Contact')}
        <button
          className="btn btn-primary"
          style={{ marginTop: '12px' }}
          onClick={() => { closeMobile(); onOpenCart(); }}
        >
          <i className="fas fa-shopping-bag"></i> Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </>
  )
}
