# E-Commerce Product Catalog

Simple product catalog browser built with React, Vite, TypeScript, Tailwind CSS, React Router, and Supabase.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS (v4 via `@tailwindcss/vite`)
- React Router
- Supabase (Postgres + RLS)

## Implemented Features

- Shared app layout with reusable navbar
- Home page with welcome text and featured products
- Catalog page with:
  - product cards
  - keyword search (title/description)
  - pagination (6 items per page)
- Product Details page with full product info
- Supabase products table + seed data via migration

## Routes

- `/` Home
- `/products` Catalog
- `/product/:id` Product details

## Database

Migration file:

- `supabase/migrations/202604140001_create_products.sql`

What it does:

- Creates `public.products`
- Enables RLS on `products`
- Adds simple public read policy (`anon`, `authenticated`)
- Inserts 20 sample products

## Environment Setup

Copy the values from your Supabase project into `.env`:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

An example file is included at `.env.example`.

## Install and Run

```bash
npm install
npm run dev
```

App runs at http://localhost:5173

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  components/
    Navbar.tsx
    ProductCard.tsx
  layouts/
    AppLayout.tsx
  lib/
    supabase.ts
  pages/
    HomePage.tsx
    ProductCatalogPage.tsx
    ProductDetailsPage.tsx
  types/
    product.ts
  App.tsx
  main.tsx
```
