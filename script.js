// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');
const reveals = document.querySelectorAll('.reveal');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyEl = document.getElementById('cartEmpty');
const cartSummary = document.getElementById('cartSummary');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutModal = document.getElementById('checkoutModal');

// ===== MENU DATA (mirrors server) =====
const MENU_DATA = {
  'espresso':        { id: 'espresso',       name: 'Single Espresso',      price: 249, image: 'images/espresso.png' },
  'cappuccino':      { id: 'cappuccino',     name: 'Cappuccino',           price: 399, image: 'images/cappuccino.png' },
  'iced-latte':      { id: 'iced-latte',     name: 'Iced Latte',           price: 429, image: 'images/latte.png' },
  'matcha-latte':    { id: 'matcha-latte',   name: 'Matcha Latte',         price: 449, image: 'images/matcha-latte.png' },
  'masala-chai':     { id: 'masala-chai',     name: 'Masala Chai',          price: 199, image: 'images/chai-tea.png' },
  'croissant':       { id: 'croissant',      name: 'Butter Croissant',     price: 249, image: 'images/croissant.png' },
  'tiramisu':        { id: 'tiramisu',       name: 'Classic Tiramisu',     price: 549, image: 'images/tiramisu.png' },
  'chocolate-cake':  { id: 'chocolate-cake', name: 'Chocolate Fudge Cake', price: 599, image: 'images/chocolate-cake.png' },
};

// ===== CART STATE =====
let cart = []; // { id, name, price, image, qty }

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== MENU TABS =====
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;
    menuCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== CART FUNCTIONS =====
function addToCart(itemId) {
  const item = MENU_DATA[itemId];
  if (!item) return;

  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`${item.name} added to cart!`);
  openCart();
}

function removeFromCart(itemId) {
  cart = cart.filter(c => c.id !== itemId);
  updateCartUI();
}

function updateQty(itemId, delta) {
  const item = cart.find(c => c.id === itemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartUI();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Update badge
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });

  // Update cart items
  if (cart.length === 0) {
    cartEmptyEl.style.display = 'flex';
    cartSummary.style.display = 'none';
    // Clear any cart item elements
    cartItemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }

  cartEmptyEl.style.display = 'none';
  cartSummary.style.display = 'block';

  // Remove existing items
  cartItemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  // Render items
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="item-price">₹${item.price * item.qty}</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    cartItemsEl.appendChild(el);
  });

  // Update total
  cartTotalEl.textContent = `₹${getCartTotal()}`;
}

// ===== CART SIDEBAR =====
function openCart() {
  cartOverlay.classList.add('open');
  cartSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOverlay.classList.remove('open');
  cartSidebar.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CHECKOUT MODAL =====
function openCheckout() {
  if (cart.length === 0) return;

  closeCart();

  // Populate summary
  const summaryEl = document.getElementById('checkoutItemsSummary');
  summaryEl.innerHTML = cart.map(item =>
    `<div class="summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>₹${item.price * item.qty}</span>
    </div>`
  ).join('');

  document.getElementById('checkoutTotal').textContent = `₹${getCartTotal()}`;

  // Show form, hide confirmation
  document.getElementById('checkoutForm').style.display = '';
  document.getElementById('checkoutConfirm').style.display = 'none';

  setTimeout(() => {
    checkoutOverlay.classList.add('open');
    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 100);
}

function closeCheckout() {
  checkoutOverlay.classList.remove('open');
  checkoutModal.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== PLACE ORDER =====
async function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  if (!name) { showToast('Please enter your name'); return; }
  if (!phone) { showToast('Please enter your phone number'); return; }

  const btn = document.getElementById('placeOrderBtn');
  btn.classList.add('loading');
  btn.innerHTML = '<i class="fas fa-spinner"></i> Placing Order...';

  const payload = {
    customer: { name, phone, email },
    items: cart.map(item => ({ id: item.id, qty: item.qty })),
    notes
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success) {
      // Show confirmation
      document.getElementById('checkoutForm').style.display = 'none';
      document.getElementById('checkoutConfirm').style.display = '';
      document.getElementById('confirmOrderId').textContent = data.order.orderId;
      document.getElementById('confirmTotal').textContent = `₹${data.order.total}`;
    } else {
      showToast(data.error || 'Order failed. Please try again.');
    }
  } catch (err) {
    showToast('Connection error. Please try again.');
    console.error(err);
  } finally {
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Place Order';
  }
}

function resetCart() {
  cart = [];
  updateCartUI();
  // Clear form
  document.getElementById('custName').value = '';
  document.getElementById('custPhone').value = '';
  document.getElementById('custEmail').value = '';
  document.getElementById('custNotes').value = '';
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== ANIMATION KEYFRAMES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(styleSheet);

// ===== INIT =====
updateCartUI();
