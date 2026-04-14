import { ProductCard } from '../components/ProductCard'

export function ProductCatalogPage() {
  const placeholderProducts = [
    { id: '1', name: 'Sample Product A', price: 29.99 },
    { id: '2', name: 'Sample Product B', price: 49.99 },
    { id: '3', name: 'Sample Product C', price: 79.99 },
  ]

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Catalog</h1>
      <p className="mt-2 text-slate-600">Product grid placeholder using reusable cards.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  )
}
