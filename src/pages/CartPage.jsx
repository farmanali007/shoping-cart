import { useCart } from '../context/CartContext'

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, grandTotal } = useCart()

  if (cart.length === 0) {
    return (
      <main className="container pb-5">
        <h1 className="mb-4">Your cart</h1>
        <div className="alert alert-info" role="status">
          No items in cart
        </div>
      </main>
    )
  }

  return (
    <main className="container pb-5">
      <h1 className="mb-4">Your cart</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col" className="text-end">
                Subtotal
              </th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {/**
             * Same idea as ProductList: key=id keeps row identity stable for React.
             */}
            {cart.map((item) => {
              const subtotal = item.price * item.quantity
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Quantity">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="btn btn-sm btn-light disabled">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-end">${subtotal.toFixed(2)}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3} className="text-end">
                Total
              </th>
              <td className="text-end fw-semibold">${grandTotal.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  )
}
