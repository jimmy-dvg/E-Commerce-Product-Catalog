import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
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
          Catalog
        </NavLink>
      </nav>
    </header>
  )
}
