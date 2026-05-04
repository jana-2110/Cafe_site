# ☕ Brew & Bean — Premium Artisan Café Website

A modern, visually stunning, and fully responsive café website with a **dark midnight blue theme**, warm copper accents, and a complete **Node.js ordering backend**. Built to attract customers, showcase menu items, and drive online orders.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Stopping the Server](#-stopping-the-server)
- [API Endpoints](#-api-endpoints)
- [Pages & Sections](#-pages--sections)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Frontend
- 🎨 **Dark Midnight Blue + Copper theme** — premium, modern aesthetic
- 📱 **Fully responsive** — mobile-first design across all devices
- 🧈 **Smooth animations** — scroll reveal, hover effects, micro-interactions
- 🛒 **Cart sidebar** — slide-in cart with quantity controls and real-time total
- 💳 **Checkout modal** — customer form with order confirmation
- 🔗 **Smooth scrolling navigation** — sticky navbar with active link highlighting
- 📱 **Mobile navigation** — hamburger menu with full-screen overlay
- 💬 **WhatsApp integration** — floating contact button
- 🏷️ **Category-filtered menu** — filter by Coffee, Tea, Snacks, Desserts

### Backend
- 🖥️ **Express.js REST API** — handles order placement and retrieval
- 📦 **JSON file persistence** — orders saved to `data/orders.json`
- ✅ **Server-side validation** — validates customer info and menu items
- 🆔 **Auto-generated order IDs** — unique IDs like `BB-M1K2N3-XYZ`
- 📊 **Admin order listing** — view all orders via API

---

## 🛠️ Tech Stack

| Layer        | Technology                  | Purpose                              |
|--------------|-----------------------------|--------------------------------------|
| **Markup**   | HTML5                       | Semantic page structure              |
| **Styling**  | Vanilla CSS3                | Custom design system with variables  |
| **Frontend** | Vanilla JavaScript (ES6+)   | Interactivity, cart, and API calls   |
| **Backend**  | Node.js                     | Server runtime                       |
| **Framework**| Express.js v4               | REST API and static file serving     |
| **Middleware**| CORS                       | Cross-origin resource sharing        |
| **Storage**  | JSON (file-based)           | Lightweight order persistence        |
| **Icons**    | Font Awesome 6              | UI icons throughout the site         |
| **Fonts**    | Google Fonts (Playfair Display, Inter) | Typography              |

---

## 📁 Project Structure

```
Cafe project/
├── data/
│   └── orders.json          # Auto-generated — stores all placed orders
├── images/
│   ├── hero-bg.png          # Hero section background
│   ├── cappuccino.png       # Product image
│   ├── espresso.png         # Product image
│   ├── latte.png            # Product image
│   ├── matcha-latte.png     # Product image
│   ├── chai-tea.png         # Product image
│   ├── croissant.png        # Product image
│   ├── tiramisu.png         # Product image
│   ├── chocolate-cake.png   # Product image
│   └── cafe-interior.png    # About section image
├── node_modules/            # Dependencies (auto-generated)
├── index.html               # Main HTML file (all sections)
├── style.css                # Complete CSS design system
├── script.js                # Frontend JavaScript (cart, UI, API)
├── server.js                # Express.js backend server
├── package.json             # Node.js project config & dependencies
├── package-lock.json        # Dependency lock file
└── README.md                # This file
```

---

## 📌 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0.0 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)

To verify your installation:

```bash
node --version    # Should show v16+ 
npm --version     # Should show 8+
```

---

## 📥 Installation

1. **Clone or download** the project to your machine

2. **Open a terminal** and navigate to the project folder:
   ```bash
   cd "J:\Cafe project"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs `express` and `cors` from npm.

---

## 🚀 Running the Project

### Start the server:

```bash
npm start
```

You should see:

```
☕ Brew & Bean server running at http://localhost:3000
```

### Open in browser:

Visit **[http://localhost:3000](http://localhost:3000)** in your web browser.

> **Note:** The Express server serves both the static frontend files AND the API endpoints from the same port (3000).

---

## 🛑 Stopping the Server

### Method 1 — Keyboard shortcut (recommended):

In the terminal where the server is running, press:

```
Ctrl + C
```

### Method 2 — Kill the port (if terminal is closed):

**Windows (PowerShell):**
```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill it by PID (replace <PID> with the actual number)
taskkill /PID <PID> /F
```

**Or use npx:**
```bash
npx kill-port 3000
```

**macOS / Linux:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

---

## 🔌 API Endpoints

The backend exposes the following REST API endpoints:

### Menu

| Method | Endpoint     | Description         |
|--------|-------------|---------------------|
| `GET`  | `/api/menu` | Returns the full menu organized by category |

**Example response:**
```json
{
  "success": true,
  "menu": {
    "coffee": [{ "id": "espresso", "name": "Single Espresso", "price": 249 }],
    "tea": [...],
    "snacks": [...],
    "desserts": [...]
  }
}
```

---

### Orders

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| `POST` | `/api/orders`      | Place a new order              |
| `GET`  | `/api/orders`      | List all orders (admin)        |
| `GET`  | `/api/orders/:id`  | Look up a specific order by ID |

**POST `/api/orders`** — Request body:
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "+1 555 123 4567",
    "email": "john@example.com"
  },
  "items": [
    { "id": "cappuccino", "qty": 2 },
    { "id": "tiramisu", "qty": 1 }
  ],
  "notes": "No sugar please"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "orderId": "BB-M1K2N3-XYZ",
    "customer": { "name": "John Doe", "phone": "+1 555 123 4567" },
    "items": [...],
    "total": 1347,
    "status": "pending",
    "createdAt": "2026-05-04T09:00:00.000Z"
  }
}
```

---

## 🏗️ Pages & Sections

The website is a single-page application with the following sections:

| # | Section          | Description                                              |
|---|------------------|----------------------------------------------------------|
| 1 | **Navbar**       | Sticky header with logo, nav links, and cart button      |
| 2 | **Hero**         | Full-width background image with tagline and CTA buttons |
| 3 | **Featured**     | 4-card grid showcasing best sellers with badges          |
| 4 | **Menu**         | Category-tabbed menu with filterable product cards       |
| 5 | **About**        | Two-column layout with café story and interior image     |
| 6 | **Testimonials** | 3 customer review cards with star ratings                |
| 7 | **CTA**          | Call-to-action section with booking prompt               |
| 8 | **Contact**      | Address, phone, hours + embedded Google Map              |
| 9 | **Footer**       | Quick links, social icons, copyright                     |

**Overlays:**
- 🛒 Cart Sidebar — slide-in panel with items and checkout
- 💳 Checkout Modal — order form with confirmation screen
- 💬 WhatsApp floating button

---

## 🎨 Customization

### Changing the Color Theme

All colors are defined as CSS variables in `style.css` (lines 5–17). Edit these to change the entire theme:

```css
:root {
  --bg-primary: #080c14;       /* Main background */
  --bg-secondary: #0e1520;     /* Section backgrounds */
  --bg-card: #141d2b;          /* Card backgrounds */
  --accent: #d4885a;           /* Primary accent (copper) */
  --accent-dark: #b56b3a;      /* Darker accent */
  --accent-light: #f0c4a0;     /* Lighter accent */
  --text-primary: #eef1f6;     /* Main text color */
  --text-secondary: #8a94a6;   /* Muted text */
}
```

### Changing the Port

Edit the `PORT` constant in `server.js` (line 6):

```javascript
const PORT = 3000;  // Change to any available port
```

### Adding Menu Items

Add new items to the `MENU` object in `server.js` and the `MENU_DATA` object in `script.js`. Then add a corresponding card in `index.html`.

### Replacing Images

Replace any image in the `images/` folder with your own. Keep the same filename or update the references in `index.html` and `server.js`.

---

## ❓ Troubleshooting

### `Error: EADDRINUSE: address already in use :::3000`

Port 3000 is already occupied. Fix:

```powershell
# Kill whatever is using port 3000
npx kill-port 3000

# Then start again
npm start
```

### Images not loading

Make sure all images exist in the `images/` folder. The server serves static files from the project root.

### Orders not saving

Check that the `data/` folder exists and has write permissions. The server auto-creates it on first start.

### Fonts not loading

The site uses Google Fonts loaded via CDN. Make sure you have an internet connection on first load (fonts are cached after).

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">
  Crafted with ♥ for coffee lovers<br>
  <strong>Brew & Bean</strong> — Where Every Sip Tells a Story
</p>
#   C a f e _ s i t e  
 