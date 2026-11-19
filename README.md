<div align="center">

# 🎓 EduMart

**An online store for educational products, built with React 19, TypeScript and Vite.**

Customers can browse, search, add to cart and check out. Admins manage products, stock, orders, customers and other admins from a dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Backend API](#-backend-api)
- [Related Repositories](#-related-repositories)
- [Author](#-author)

---

## ✨ Features

### 🛍️ Customer side
- **Sign up and sign in**, with email verification and a "resend code" option
- **Home page** with featured products and popular categories
- **Product search** with filters
- **Product page** with details, add-to-cart and customer reviews
- **Shopping cart**: change quantities and remove items. Guests get a temporary cart that is merged into their account when they sign in
- **Checkout** with saved delivery addresses and online payment through **PayHere**
- **My Account**: edit your profile, change your password, manage addresses and see your order history

### 🛠️ Admin dashboard
- Separate admin sign-in with its own verification step
- **Overview**: sales, recent orders, top-selling products and low-stock alerts
- **Products**: add or edit products, upload images, turn products on or off, and print the product list
- **Categories and brands**: add new brands and categories
- **Inventory**: check and update stock
- **Orders**: see all orders and update their delivery status
- **Customers**: see registered customers
- **Admin users**: add admins, give them roles and turn their accounts on or off

### 🔐 Routing and sessions
- `ProtectedRoute` / `GuestRoute` keep customers out of pages they shouldn't see (signed-in vs. signed-out)
- `AdminProtectedRoute` / `AdminGuestRoute` do the same for admin pages
- Toast notifications for feedback across the app

---

## 🧰 Tech Stack

| Area | Tools |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| UI components | [MUI](https://mui.com/), [PrimeReact](https://primereact.org/), [Lucide icons](https://lucide.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| State | React Context (`CartProvider`) |
| Notifications | [React-Toastify](https://fkhadra.github.io/react-toastify/) |
| Utilities | [date-fns](https://date-fns.org/), [react-to-print](https://github.com/MatthewHerbst/react-to-print) |
| Payments | [PayHere](https://www.payhere.lk/) |
| Linting | ESLint 9 + typescript-eslint |

---

## 📸 Screenshots

| Home | Product | Cart |
|---|---|---|
| ![Home](docs/home.png) | ![Product](docs/product.png) | ![Cart](docs/cart.png) |

| Checkout | My Account | Admin Dashboard |
|---|---|---|
| ![Checkout](docs/checkout.png) | ![My Account](docs/account.png) | ![Admin](docs/admin.png) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer, and npm
- The **EduMart backend** running at `http://localhost:8080/Edumart-Backend` (see [Related Repositories](#-related-repositories))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/DinukaDilshan415/EduMart-React.git
cd EduMart-React

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

> **Note:** The frontend sends cookies to the backend to keep you signed in, so the backend needs to allow requests (CORS with credentials) from the Vite dev server's address.

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Type-checks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

---

## 🗂️ Project Structure

```
EduMart-React/
├── public/
├── src/
│   ├── Admin/              # Admin dashboard, admin login & verification
│   ├── Cart/               # Cart page, cart items, CartProvider (useCart)
│   ├── Checkout/           # Checkout page & payment
│   ├── Components/         # AppRouter, shared components (ConfirmToast)
│   ├── EmailVerification/  # Account verification page
│   ├── Footer/
│   ├── Header/
│   ├── Home/               # Home page & featured products
│   ├── Login/              # Sign in / sign up
│   ├── MyAccount/          # Profile, addresses, orders, password
│   ├── Navigation/
│   ├── Product/            # Product listing & single product view
│   ├── ProductSearch/      # Search page & filters
│   ├── SessionCheck/       # Route guards & session helpers
│   ├── assets/
│   ├── App.tsx             # Root component (CartProvider + router + toasts)
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🧭 Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/login` | Sign in / Sign up | Guests only |
| `/Auth/VrifyAccount` | Email verification | Guests |
| `/singleproduct` | Product details | Public |
| `/product/search` | Search | Public |
| `/product/cart` | Cart | Public |
| `/product/cart/checkout` | Checkout | Signed-in users |
| `/home/myaccount` | My Account | Signed-in users |
| `/admin/login` | Admin sign in | Admin guests |
| `/admin/verification` | Admin verification | Admin guests |
| `/admin/dashboard` | Admin dashboard | Admins only |

---

## 🔌 Backend API

All requests go to:

```
http://localhost:8080/Edumart-Backend
```

<details>
<summary><b>Endpoints the frontend uses</b> (click to expand)</summary>

**Auth**: `SignUp`, `SignIn`, `SignOut`, `VerifyAccount`, `ReSendVerification`

**Products**: `LoadHomeProducts`, `LoadPopulerCategories`, `LoadProductData`, `loadSearchDetails`, `SearchProducts`, `SubmitProductReview`

**Cart**: `AddToCart`, `LoadCartItems`, `GetCartCount`, `UpdateCartQtyFromCart`, `RemoveFromCart`, `SaveTempCart`, `CheckSessionCart`

**Checkout**: `LoadCityData`, `SaveNewAddress`, `CheckOut`, `MakePayment`

**Account**: `SetAccountData`, `UpdateUserProfile`, `UpdateUserPassword`, `DeleteAddress`, `LoadUserOrders`

**Admin**: `AdminSignIn`, `AdminSignOut`, `VerifyAdminAccount`, `ReSendAdminVerification`, `LoadDashboardData`, `LoadAllProducts`, `SaveProduct`, `UpdateProductDetails`, `ToggleProductStatus`, `StockCheck`, `StockUpdate`, `SaveNewBrand`, `LoadAllOrders`, `DeliveryStatusUpdate`, `LoadCustomers`, `LoadAdmins`, `SaveAdmins`, `ToggleAdminStatus`, `LoadAdminRoleData`

</details>

> 💡 **To use a different backend address:** the URL is currently written directly into the components. Moving it into an environment variable (e.g. `VITE_API_URL` in a `.env` file) would make this a one-line change.

## 👤 Author

**Dinuka Dilshan**
- GitHub: [@DinukaDilshan415](https://github.com/DinukaDilshan415)

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>
