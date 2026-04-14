import { Link } from 'react-router-dom'

type ProductCardProps = {
  id: number
  title: string
  price: number
  imageUrl?: string
  description?: string
}

export function ProductCard({ id, title, price, imageUrl, description }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="h-40 w-full object-cover" />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
          No image
        </div>
      )}
      <div className="space-y-3 p-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="line-clamp-2 text-sm text-slate-600">{description}</p>
        ) : null}
        <p className="text-slate-700">${price.toFixed(2)}</p>
        <Link
          to={`/product/${id}`}
          className="inline-flex rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          View details
        </Link>
      </div>
    </article>
  )
}
