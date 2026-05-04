import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import MenuSection from '../components/MenuSection'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import Contact from '../components/Contact'

export default function Home({ onOpenCart }) {
  return (
    <>
      <Hero />
      <FeaturedSection onOpenCart={onOpenCart} />
      <MenuSection onOpenCart={onOpenCart} />
      <About />
      <Testimonials />
      <CTASection />
      <Contact />
    </>
  )
}
