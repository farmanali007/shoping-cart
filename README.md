# Shopping Cart (React + Vite)

A small storefront demo: product catalog, cart with line quantities, and totals. Built with **React 19**, **Vite**, **react-router-dom**, **Bootstrap**, and the **Context API** (`CartProvider` / `useCart`).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Learning the codebase

See [READING_GUIDE.md](READING_GUIDE.md) for a suggested file order and questions to ask while reading the code.

## Stack

- React + Vite
- React Router (`/`, `/cart`)
- Bootstrap (CSS + bundle for navbar behavior)
- Global cart state via `src/context/CartContext.jsx`
