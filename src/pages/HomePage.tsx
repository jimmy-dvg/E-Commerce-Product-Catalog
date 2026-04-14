import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase'
import type { Product } from '../types/product'

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      if (!isSupabaseConfigured) {
        setError(supabaseConfigError)
        setFeaturedProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, title, description, price, photo_url, featured')
        .eq('featured', true)
        .order('id', { ascending: true })

      if (fetchError) {
        setError(fetchError.message)
        setFeaturedProducts([])
        setIsLoading(false)
        return
      }

      setFeaturedProducts(data ?? [])
      setIsLoading(false)
    }

    void fetchFeaturedProducts()
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Home</h1>
      <p className="mt-2 text-slate-600">Welcome to the product catalog browser.</p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Featured products</h2>

      {isLoading ? <p className="mt-3 text-slate-600">Loading featured products...</p> : null}
      {error ? <p className="mt-3 text-red-600">{error}</p> : null}

      {!isLoading && !error ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              imageUrl={product.photo_url}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
