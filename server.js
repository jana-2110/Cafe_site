const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// ===== HELPERS =====
function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function generateOrderId() {
  const prefix = 'BB';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ===== MENU DATA =====
const MENU = {
  coffee: [
    { id: 'espresso', name: 'Single Espresso', price: 249, image: 'images/espresso.png', desc: 'Bold, intense, pure coffee essence' },
    { id: 'cappuccino', name: 'Cappuccino', price: 399, image: 'images/cappuccino.png', desc: 'Espresso with steamed milk foam' },
    { id: 'iced-latte', name: 'Iced Latte', price: 429, image: 'images/latte.png', desc: 'Chilled espresso with cold milk' },
  ],
  tea: [
    { id: 'matcha-latte', name: 'Matcha Latte', price: 449, image: 'images/matcha-latte.png', desc: 'Ceremonial-grade matcha & oat milk' },
    { id: 'masala-chai', name: 'Masala Chai', price: 199, image: 'images/chai-tea.png', desc: 'Spiced tea with cinnamon & cardamom' },
  ],
  snacks: [
    { id: 'croissant', name: 'Butter Croissant', price: 249, image: 'images/croissant.png', desc: 'Flaky, golden, freshly baked' },
  ],
  desserts: [
    { id: 'tiramisu', name: 'Classic Tiramisu', price: 549, image: 'images/tiramisu.png', desc: 'Espresso-soaked ladyfingers & mascarpone' },
    { id: 'chocolate-cake', name: 'Chocolate Fudge Cake', price: 599, image: 'images/chocolate-cake.png', desc: 'Rich dark chocolate ganache layers' },
  ]
};

// Flat lookup for validation
const ALL_ITEMS = Object.values(MENU).flat();

// ===== API ROUTES =====

// GET /api/menu — return full menu
app.get('/api/menu', (req, res) => {
  res.json({ success: true, menu: MENU });
});

// POST /api/orders — place a new order
app.post('/api/orders', (req, res) => {
  const { customer, items, notes } = req.body;

  // Validate customer info
  if (!customer || !customer.name || !customer.phone) {
    return res.status(400).json({ success: false, error: 'Customer name and phone are required.' });
  }

  // Validate items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'At least one item is required.' });
  }

  // Build order items with price validation
  const orderItems = [];
  let total = 0;

  for (const item of items) {
    const menuItem = ALL_ITEMS.find(m => m.id === item.id);
    if (!menuItem) {
      return res.status(400).json({ success: false, error: `Unknown item: ${item.id}` });
    }
    const qty = Math.max(1, parseInt(item.qty) || 1);
    const subtotal = menuItem.price * qty;
    total += subtotal;
    orderItems.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      qty,
      subtotal: Math.round(subtotal * 100) / 100
    });
  }

  const order = {
    orderId: generateOrderId(),
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: (customer.email || '').trim()
    },
    items: orderItems,
    notes: (notes || '').trim(),
    total: Math.round(total * 100) / 100,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const orders = readOrders();
  orders.push(order);
  saveOrders(orders);

  console.log(`✅ New order ${order.orderId} — ₹${order.total} — ${order.customer.name}`);

  res.status(201).json({ success: true, order });
});

// GET /api/orders/:id — look up an order by ID
app.get('/api/orders/:id', (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found.' });
  }
  res.json({ success: true, order });
});

// GET /api/orders — list all orders (admin)
app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  res.json({ success: true, count: orders.length, orders: orders.reverse() });
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`\n☕ Brew & Bean server running at http://localhost:${PORT}\n`);
});
