import { ProductCard } from './ProductCard'

/**
 * ProductList maps the catalog into ProductCard components.
 *
 * key={product.id}: React uses keys to match list items between renders. A stable,
 * unique key (here the product id) helps React update the correct DOM nodes instead
 * of reusing the wrong row when the list order or length changes.
 */
export function ProductList({ products }) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
          <ProductCard id={product.id} name={product.name} price={product.price} />
        </div>
      ))}
    </div>
  )
}
