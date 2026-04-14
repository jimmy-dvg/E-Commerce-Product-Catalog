import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase'
import type { Product } from '../types/product'

export function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isSupabaseConfigured) {
        setError(supabaseConfigError)
        setProduct(null)
        setIsLoading(false)
        return
      }

      if (!id) {
        setError('Missing product id.')
        setProduct(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, title, description, price, photo_url, featured')
        .eq('id', Number(id))
        .maybeSingle()

      if (fetchError) {
        setError(fetchError.message)
        setProduct(null)
        setIsLoading(false)
        return
      }

      if (!data) {
        setError('Product not found.')
        setProduct(null)
        setIsLoading(false)
        return
      }

      setProduct(data)
      setIsLoading(false)
    }

    void fetchProduct()
  }, [id])

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Product Details</h1>

      {isLoading ? <p className="mt-3 text-slate-600">Loading product details...</p> : null}
      {error ? <p className="mt-3 text-red-600">{error}</p> : null}

      {!isLoading && !error && product ? (
        <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <img src={product.photo_url} alt={product.title} className="h-72 w-full object-cover" />
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">{product.title}</h2>
            <p className="text-lg font-medium text-slate-800">${product.price.toFixed(2)}</p>
            <p className="text-slate-700">{product.description}</p>
            {product.featured ? (
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                Featured product
              </span>
            ) : null}
          </div>
        </article>
      ) : null}
    </section>
  )
}
