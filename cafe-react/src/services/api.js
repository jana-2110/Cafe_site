import supabase from './supabaseClient'
import MENU_DATA from '../data/menuData'

const API_URL = import.meta.env.VITE_API_URL || ''

/**
 * Fetch menu data from Supabase.
 * Falls back to local data if Supabase is not configured or errors out.
 */
export async function fetchMenu() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('menu')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error

      if (data && data.length > 0) {
        // Group by category
        const grouped = {}
        data.forEach(item => {
          const cat = item.category || 'other'
          if (!grouped[cat]) grouped[cat] = []
          grouped[cat].push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            desc: item.desc || item.description,
          })
        })
        return grouped
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local data:', err.message)
    }
  }

  // Fallback to local data
  return MENU_DATA
}

/**
 * Place an order via Express backend.
 */
export async function placeOrder({ customer, items, notes }) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, items, notes }),
  })

  const data = await res.json()

  if (!data.success) {
    throw new Error(data.error || 'Order failed. Please try again.')
  }

  return data.order
}

/**
 * Insert order into Supabase (optional — for analytics/history).
 */
export async function saveOrderToSupabase(order) {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_id: order.orderId,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        customer_email: order.customer.email,
        items: order.items,
        total: order.total,
        notes: order.notes,
        status: order.status,
      }])

    if (error) throw error
    return data
  } catch (err) {
    console.warn('Failed to save order to Supabase:', err.message)
    return null
  }
}
