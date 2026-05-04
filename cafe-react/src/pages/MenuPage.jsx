import MenuSection from '../components/MenuSection'

export default function MenuPage({ onOpenCart }) {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <MenuSection onOpenCart={onOpenCart} />
    </div>
  )
}
