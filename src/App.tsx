import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4">
          <span className="text-lg font-semibold">Product Catalog</span>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-medium text-slate-950' : 'text-slate-600 hover:text-slate-900'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'font-medium text-slate-950' : 'text-slate-600 hover:text-slate-900'
            }
          >
            Products
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
