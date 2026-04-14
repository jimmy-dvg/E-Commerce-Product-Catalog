create table if not exists public.products (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  photo_url text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Keep it simple: anyone using anon or authenticated role can read products.
drop policy if exists "Public read products" on public.products;
create policy "Public read products"
on public.products
for select
to anon, authenticated
using (true);

insert into public.products (title, description, price, photo_url, featured)
values
  ('Aurora Lamp', 'Soft ambient bedside lamp with dimmer.', 39.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', true),
  ('Metro Chair', 'Modern upholstered chair for living spaces.', 129.00, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', false),
  ('Oak Desk', 'Compact oak desk with cable management slot.', 249.50, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80', true),
  ('Cloud Pillow', 'Breathable memory-foam pillow for side sleepers.', 59.90, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80', false),
  ('Summit Backpack', 'Weather-resistant daypack with 20L capacity.', 89.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80', false),
  ('Slate Mug Set', 'Set of four ceramic mugs with matte finish.', 28.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80', false),
  ('Luma Headphones', 'Wireless over-ear headphones with ANC.', 199.99, 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1200&q=80', true),
  ('Terra Planter', 'Stoneware planter with drainage tray.', 34.00, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80', false),
  ('Canyon Bottle', 'Insulated stainless bottle, 750ml.', 24.75, 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80', false),
  ('Pulse Keyboard', 'Low-profile mechanical keyboard, 75 percent layout.', 109.99, 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80', true),
  ('Nordic Throw', 'Woven cotton throw blanket with fringe.', 44.50, 'https://images.unsplash.com/photo-1616627457990-8d8f4af6df14?auto=format&fit=crop&w=1200&q=80', false),
  ('Pebble Speaker', 'Portable Bluetooth speaker with deep bass.', 79.00, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80', false),
  ('Drift Candle', 'Soy wax candle with cedar and citrus notes.', 18.00, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80', false),
  ('Frame Shelf', 'Floating wall shelf in black steel.', 52.00, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', false),
  ('Glide Mouse', 'Ergonomic wireless mouse with silent clicks.', 46.90, 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80', false),
  ('Voyage Watch', 'Minimalist analog watch with leather strap.', 159.00, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80', true),
  ('Breeze Fan', 'Quiet desk fan with three-speed control.', 36.80, 'https://images.unsplash.com/photo-1616628182509-6f56ea6de296?auto=format&fit=crop&w=1200&q=80', false),
  ('Canvas Tote', 'Heavy-duty canvas tote for daily carry.', 22.00, 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80', false),
  ('Studio Light', 'LED panel light for photo and video creators.', 139.00, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80', false),
  ('Echo Table', 'Round side table with powder-coated base.', 94.40, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80', true);
