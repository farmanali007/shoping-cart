import { useCart } from '../context/CartContext'

/**
 * ProductCard receives catalog fields via props and triggers addToCart on click.
 */
export function ProductCard({ id, name, price }) {
  const { addToCart } = useCart()

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h2 className="card-title h5">{name}</h2>
        <p className="card-text text-muted mb-auto">${price.toFixed(2)}</p>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => addToCart({ id, name, price })}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
