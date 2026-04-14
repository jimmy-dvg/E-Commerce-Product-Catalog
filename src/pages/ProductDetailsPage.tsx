import { useParams } from 'react-router-dom'

export function ProductDetailsPage() {
  const { productId } = useParams()

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-900">Product Details</h1>
      <p className="mt-2 text-slate-600">Product ID: {productId}</p>
    </section>
  )
}
