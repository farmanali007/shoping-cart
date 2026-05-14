# How to read this codebase (learning path)

Use this order the first time through. Each step builds on the previous one. Skip `node_modules/` entirely unless you are debugging a library.

---

## 1. App entry — where the tree mounts

**File:** [src/main.jsx](src/main.jsx)

**What to notice**

- `createRoot(...).render(...)` — this is the single mount point for the whole UI.
- Imports: Bootstrap CSS/JS, your global CSS, then `App`.

**Questions to ask yourself**

- What is the root component React renders?
- What runs *before* any of your pages (global styles, scripts)?

---

## 2. Routing shell — URLs and layout

**File:** [src/App.jsx](src/App.jsx)

**What to notice**

- **Outside → inside:** `BrowserRouter` → `CartProvider` → `NavBar` + `Routes`.
- Why `CartProvider` wraps both the navbar and the routes: anything inside can call `useCart()` and see the same cart.

**Questions to ask yourself**

- Which path shows which page component?
- If you added `/about`, where would you add another `<Route>`?

---

## 3. Global cart state — the “brain”

**File:** [src/context/CartContext.jsx](src/context/CartContext.jsx)

**Read in this order inside the file**

1. `createContext` / default `undefined` — the slot for shared data.
2. `CartProvider` — `useState` for `cart`, then the functions that call `setCart`.
3. Follow **one function at a time:** `addToCart` → `removeFromCart` → `updateQuantity` → `grandTotal`.
4. `useCart` — how consumers read the context and what happens without a provider.

**What to notice**

- Comments next to **`map`**, **`filter`**, and **`reduce`**: each returns a **new** array/value; React relies on new references to know state changed.
- `children` — the rest of your app passed through the provider so you do not pass cart props through every intermediate component.

**Questions to ask yourself**

- What is the shape of one item in `cart` (which fields)?
- When you “add” the same product twice, does the array grow or does `quantity` change?

---

## 4. Static data — no backend yet

**File:** [src/data/products.js](src/data/products.js)

**What to notice**

- Plain data: `id`, `name`, `price`. The cart layer adds `quantity` when an item enters the cart.

---

## 5. Pages — compose UI and wire to context

**Files:** [src/pages/HomePage.jsx](src/pages/HomePage.jsx), [src/pages/CartPage.jsx](src/pages/CartPage.jsx)

**What to notice**

- `useCart()` at the top of `CartPage` — which values and functions does the page actually need?
- Empty cart: early `return` vs rendering the table — same page, two UIs.

**Questions to ask yourself**

- Where does `grandTotal` get computed (which file), and where is it only *displayed*?

---

## 6. Components — smaller pieces and props

Read in this order:

| Order | File | Focus |
|-------|------|--------|
| 6a | [src/components/NavBar.jsx](src/components/NavBar.jsx) | `NavLink`, active styles, `cart.length` badge |
| 6b | [src/components/ProductList.jsx](src/components/ProductList.jsx) | `map`, **`key={product.id}`** comment |
| 6c | [src/components/ProductCard.jsx](src/components/ProductCard.jsx) | Props vs context: which comes from parent, which from `useCart`? |

**Questions to ask yourself**

- Why does `ProductCard` receive `id`, `name`, `price` as props instead of importing `products`?
- Where would you change the badge if you wanted “total number of items” instead of “number of lines”?

---

## 7. Optional: global styles

**File:** [src/index.css](src/index.css)

Small layout helpers only; most styling is Bootstrap classes in components.

---

## Trace one user action (recommended exercise)

Pick **“Add to cart”** on the home page and trace the call chain on paper or in the editor:

`ProductCard` button → `addToCart` in context → `setCart` → React re-render → which components call `useCart()` and therefore update?

Repeat for **Remove** and **+ / −** on the cart page.

---

## What you can ignore for learning the app logic

- `node_modules/`
- `dist/` (build output)
- Vite/Eslint config unless you care about tooling

---

## If you get lost

1. Start again from [src/App.jsx](src/App.jsx) and list every child component.
2. Search the repo for `useCart` — every hit is a subscriber to cart state.
3. Search for `addToCart`, `removeFromCart`, `updateQuantity` — those are the only writers of cart state.
