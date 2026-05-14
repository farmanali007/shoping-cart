# Shopping Cart (React + Vite)

A focused storefront demo: browse a local product catalog, add items to a shared cart, adjust quantities on a dedicated cart page, and see per-line subtotals plus a grand total. The UI is styled with **Bootstrap**; navigation uses **React Router**; cart data lives in one place via the **Context API** so components do not pass cart props through every layer.

## What this project does

- **Home (`/`)** — grid of product cards loaded from a static JavaScript catalog.
- **Cart (`/cart`)** — table of line items with quantity controls, remove actions, subtotals (`price × quantity`), and an empty-state message when there are no rows.
- **Navbar** — links between routes and a badge showing how many **distinct line items** are in the cart (`cart.length`).

## Tech stack

| Piece | Role |
| ----- | ---- |
| [React](https://react.dev/) 19 + [Vite](https://vite.dev/) | UI and fast dev/build tooling |
| [react-router-dom](https://reactrouter.com/) | `BrowserRouter`, `Routes`, `Route`, `NavLink` for `/` and `/cart` |
| [Bootstrap](https://getbootstrap.com/) | Layout and components via `className` (CSS + JS bundle for the collapsible navbar) |
| Context API | `createContext`, `CartProvider`, `useCart` for global cart state |

## Concepts explored (learning angle)

These ideas are implemented in code with short educational comments in key files (especially `src/context/CartContext.jsx`).

### React fundamentals

- **Component trees and composition** — pages assemble smaller pieces (`ProductList`, `ProductCard`, `NavBar`) instead of one monolithic screen.
- **Props** — catalog data flows into presentational components (`ProductCard` receives `id`, `name`, `price` from `ProductList`).
- **Lists and the `key` prop** — mapping products (and cart rows) with a stable `key` (here, `id`) so React can reconcile the right DOM nodes when lists change.

### State and the Context API

- **Local vs global state** — product data is imported once; cart state is shared app-wide.
- **`createContext` + `Provider`** — `CartProvider` wraps the router subtree and supplies a single `value` object to descendants.
- **`children`** — the provider renders `{children}` so anything nested under `<CartProvider>` can call `useCart()` without prop drilling.
- **Custom hook (`useCart`)** — wraps `useContext` and fails fast if used outside a provider, which keeps call sites simple and safe.
- **Immutable updates** — cart updates use new arrays/objects (`map`, `filter`, spread) so React detects changes reliably when calling `setCart`.

### Array methods used in the cart logic

- **`map`** — return a new array with updated quantities (e.g. increment an existing line or adjust qty with +/-).
- **`filter`** — remove a line by id, or drop rows whose quantity fell to zero after a decrement.
- **`reduce`** — fold the cart into one **grand total** by summing `price * quantity` for each line.

### Routing

- **Declarative routes** — URLs map to page components (`HomePage`, `CartPage`).
- **`NavLink`** — navigation with an active style on the current route, integrated with Bootstrap classes.

### Styling and UX

- **Bootstrap utility and component classes** — layout (`container`, `row`, `card`, `table`), feedback (`alert`), and controls (`btn`, `badge`).
- **Responsive patterns** — responsive grid for products and a scrollable table wrapper on smaller viewports.

## Project layout (high level)

```
src/
  App.jsx              # Router + CartProvider shell
  main.jsx             # App entry; Bootstrap CSS/JS imports
  context/
    CartContext.jsx    # Cart state, actions, totals, useCart
  data/
    products.js        # Local catalog (id, name, price)
  components/          # NavBar, ProductList, ProductCard
  pages/               # HomePage, CartPage
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## How to read the code

See **[READING_GUIDE.md](READING_GUIDE.md)** for a step-by-step order to open files, questions to ask yourself, and a suggested “trace one button click” exercise through the cart logic.
