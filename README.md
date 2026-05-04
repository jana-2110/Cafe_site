# ☕ Brew & Bean — Premium Artisan Café Website

A modern, visually stunning, and fully responsive café website with a **dark midnight blue theme**, warm copper accents, and a complete **React + Node.js** stack. Built to attract customers, showcase menu items, and drive online orders.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![React](https://img.shields.io/badge/react-18.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Pages & Sections](#-pages--sections)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Frontend (React / Vite)
- 🎨 **Dark Midnight Blue + Copper theme** — premium, modern aesthetic
- 📱 **Fully responsive** — mobile-first design across all devices
- 🧈 **Smooth animations** — scroll reveal, hover effects, micro-interactions
- 🛒 **Cart State Management** — built with React Context + useReducer
- 💳 **Checkout modal** — customer form with order confirmation
- 🔗 **React Router** — client-side routing (`/`, `/menu`, `/cart`)
- 💬 **WhatsApp integration** — floating contact button
- 🏷️ **Dynamic Menu** — fetched from Supabase with local fallback

### Backend (Express)
- 🖥️ **Express.js REST API** — handles order placement and retrieval
- 📦 **JSON file persistence** — orders saved to `data/orders.json`
- ✅ **Server-side validation** — validates customer info and menu items
- 🆔 **Auto-generated order IDs** — unique IDs like `BB-M1K2N3-XYZ`

---

## 🛠️ Tech Stack

| Layer        | Technology                  | Purpose                              |
|--------------|-----------------------------|--------------------------------------|
| **Frontend** | React, Vite                 | UI Components, routing, state        |
| **Styling**  | Vanilla CSS3                | Custom design system with variables  |
| **Database** | Supabase                    | Dynamic menu data fetching           |
| **Backend**  | Node.js, Express.js v4      | REST API server                      |
| **Storage**  | JSON (file-based)           | Lightweight order persistence        |
| **Icons**    | Font Awesome 6              | UI icons throughout the site         |

---

## 📁 Project Structure

```
Cafe project/
├── cafe-react/              # React Frontend Application
│   ├── public/              # Static assets (images, icons)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # Cart Context & Reducers
│   │   ├── data/            # Fallback menu data
│   │   ├── pages/           # Home, Menu, and Cart pages
│   │   ├── services/        # Supabase and API clients
│   │   ├── App.jsx          # Main application & routing
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Complete CSS design system
│   ├── vite.config.js       # Vite bundler configuration
│   └── package.json         # Frontend dependencies
├── data/                    # Backend data storage
│   └── orders.json          # Auto-generated — stores all placed orders
├── server.js                # Express.js backend server
├── package.json             # Backend dependencies
└── README.md                # This file
```

---

## 📌 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0.0 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)

---

## 📥 Installation

1. **Clone or download** the project to your machine.
2. **Install Backend Dependencies:**
   ```bash
   cd "J:\Cafe project"
   npm install
   ```
3. **Install Frontend Dependencies:**
   ```bash
   cd cafe-react
   npm install
   ```
4. **Environment Variables (Frontend):**
   Copy `.env.example` to `.env` in the `cafe-react` directory:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase URL and Anon Key to `.env`. (If you leave it blank or don't set it up, the app will automatically fall back to the local `menuData.js`.)

---

## 🚀 Running the Project

You need to run both the backend API server and the frontend React dev server.

### 1. Start the Backend Server (Port 3001)
Open a terminal and run:
```bash
cd "J:\Cafe project"
npm start
```

### 2. Start the Frontend React App (Port 5173)
Open a **new** terminal and run:
```bash
cd "J:\Cafe project\cafe-react"
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your web browser.

> **Note:** The Vite dev server is configured to proxy `/api` requests automatically to `http://localhost:3001`.

---

## 🔌 API Endpoints

The backend exposes the following REST API endpoints:

### Orders
| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| `POST` | `/api/orders`      | Place a new order              |
| `GET`  | `/api/orders`      | List all orders (admin)        |
| `GET`  | `/api/orders/:id`  | Look up a specific order by ID |

---

## 🏗️ Pages & Sections

The React application uses `react-router-dom` for navigation:

- `/` (Home) — Hero, Featured, Menu preview, About, Testimonials, CTA, Contact
- `/menu` — Standalone menu page with full category filtering
- `/cart` — Standalone full-page shopping cart with checkout flow

**Overlays:**
- 🛒 Cart Sidebar — slide-in panel with items and checkout
- 💳 Checkout Modal — order form with confirmation screen

---

## ❓ Troubleshooting

### `Error: EADDRINUSE: address already in use :::3001`
Port 3001 is already occupied. Kill the process and try again:
```powershell
npx kill-port 3001
npm start
```

### API calls failing / Orders not saving
Ensure the Express backend is running (`npm start` from the root folder) while the React app is running.

### Supabase issues
If Supabase is not configured, check your browser console for fallback warnings. The app will gracefully fall back to local menu data if Supabase credentials are not found or fail.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">
  Crafted with ♥ for coffee lovers<br>
  <strong>Brew & Bean</strong> — Where Every Sip Tells a Story
</p>