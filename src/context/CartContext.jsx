import { createContext, useContext, useState } from 'react'

/**
 * Shape of a product as it lives in the shopping cart.
 * We keep catalog fields (id, name, price) plus a running quantity.
 */
const CartContext = createContext(undefined)

/**
 * CartProvider wraps part (or all) of the React tree.
 *
 * The `children` prop is whatever JSX you nest inside <CartProvider>...</CartProvider>.
 * React passes that subtree as `children` so this component can render it in place
 * after supplying context — that way descendants do not need cart props drilled down
 * from every parent; they call useCart() instead.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  /**
   * addToCart: either merge into an existing line item or append a new row.
   * We always replace state with a new array reference so React detects updates.
   */
  function addToCart(product) {
    setCart((prev) => {
      const alreadyInCart = prev.some((item) => item.id === product.id)

      if (alreadyInCart) {
        /**
         * map walks the array and returns a new array of the same length.
         * For the matching product id we return a new object with quantity + 1;
         * other items are copied by reference (still immutable at the array level).
         */
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  /**
   * removeFromCart: drop the line whose id matches.
   *
   * filter keeps every element for which the predicate returns true — here we keep
   * items whose id is NOT the one to remove. filter always returns a brand-new array
   * and does not mutate the original.
   */
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  /**
   * updateQuantity: add `delta` (+1 / -1) to a line item's quantity.
   * We use map to produce an updated copy of the cart array.
   * If quantity falls below 1 after a decrement, we remove that line (filter) so
   * the cart does not contain zero-quantity rows.
   */
  function updateQuantity(id, delta) {
    setCart((prev) => {
      const mapped = prev.map((item) => {
        if (item.id !== id) return item
        return { ...item, quantity: item.quantity + delta }
      })
      return mapped.filter((item) => item.quantity > 0)
    })
  }

  /**
   * grandTotal: fold the cart into one number.
   *
   * reduce passes an accumulator (sum) and each cart line (item).
   * The second argument (0) is the initial accumulator — here, "start at zero dollars".
   * Each step adds price × quantity for that line; the final return is the cart total.
   */
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    grandTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * useCart: small wrapper around useContext for clearer imports and runtime safety.
 */
// Fast refresh expects one component per file; pairing a custom hook with its provider is intentional here.
/* eslint-disable-next-line react-refresh/only-export-components -- hook co-located with CartProvider */
export function useCart() {
  const ctx = useContext(CartContext)
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
