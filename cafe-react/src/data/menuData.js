// Fallback menu data — used when Supabase is unavailable
const MENU_DATA = {
  coffee: [
    { id: 'espresso', name: 'Single Espresso', price: 249, image: '/images/espresso.png', desc: 'Bold, intense, pure coffee essence' },
    { id: 'cappuccino', name: 'Cappuccino', price: 399, image: '/images/cappuccino.png', desc: 'Espresso with steamed milk foam' },
    { id: 'iced-latte', name: 'Iced Latte', price: 429, image: '/images/latte.png', desc: 'Chilled espresso with cold milk' },
  ],
  tea: [
    { id: 'matcha-latte', name: 'Matcha Latte', price: 449, image: '/images/matcha-latte.png', desc: 'Ceremonial-grade matcha & oat milk' },
    { id: 'masala-chai', name: 'Masala Chai', price: 199, image: '/images/chai-tea.png', desc: 'Spiced tea with cinnamon & cardamom' },
  ],
  snacks: [
    { id: 'croissant', name: 'Butter Croissant', price: 249, image: '/images/croissant.png', desc: 'Flaky, golden, freshly baked' },
  ],
  desserts: [
    { id: 'tiramisu', name: 'Classic Tiramisu', price: 549, image: '/images/tiramisu.png', desc: 'Espresso-soaked ladyfingers & mascarpone' },
    { id: 'chocolate-cake', name: 'Chocolate Fudge Cake', price: 599, image: '/images/chocolate-cake.png', desc: 'Rich dark chocolate ganache layers' },
  ]
}

// Flat lookup map by id
export const MENU_FLAT = Object.values(MENU_DATA).flat().reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

export default MENU_DATA
