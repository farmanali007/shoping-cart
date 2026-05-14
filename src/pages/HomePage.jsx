import { ProductList } from '../components/ProductList'
import { products } from '../data/products'

export function HomePage() {
  return (
    <main className="container pb-5">
      <h1 className="mb-4">Products</h1>
      <ProductList products={products} />
    </main>
  )
}
