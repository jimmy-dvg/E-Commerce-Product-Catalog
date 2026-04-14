import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase'
import type { Product } from '../types/product'

export function ProductCatalogPage() {
  const pageSize = 6
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalProducts / pageSize))
  }, [totalProducts, pageSize])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isSupabaseConfigured) {
        setError(supabaseConfigError)
        setProducts([])
        setTotalProducts(0)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      const from = (currentPage - 1) * pageSize
      const to = from + pageSize - 1

      let query = supabase
        .from('products')
        .select('id, title, description, price, photo_url, featured', { count: 'exact' })
        .order('id', { ascending: true })
        .range(from, to)

      const trimmedSearch = searchTerm.trim()
      if (trimmedSearch.length > 0) {
        query = query.or(`title.ilike.%${trimmedSearch}%,description.ilike.%${trimmedSearch}%`)
      }

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        setError(fetchError.message)
        setProducts([])
        setTotalProducts(0)
        setIsLoading(false)
        return
      }

      setProducts(data ?? [])
      setTotalProducts(count ?? 0)
      setIsLoading(false)
    }

    void fetchProducts()
  }, [currentPage, pageSize, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Catalog</h1>
      <p className="mt-2 text-slate-600">Browse products, search, and paginate through results.</p>

      <div className="mt-6">
        <label htmlFor="product-search" className="mb-2 block text-sm font-medium text-slate-700">
          Search products
        </label>
        <input
          id="product-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title or description"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-500"
        />
      </div>

      {isLoading ? <p className="mt-4 text-slate-600">Loading products...</p> : null}
      {error ? <p className="mt-4 text-red-600">{error}</p> : null}

      {!isLoading && !error ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
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

          {products.length === 0 ? <p className="mt-4 text-slate-600">No products found.</p> : null}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={!hasPreviousPage}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={!hasNextPage}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </section>
  )
}
