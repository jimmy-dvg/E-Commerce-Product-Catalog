import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabaseConfigError = isSupabaseConfigured
	? null
	: 'Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'

// Use harmless placeholders when env vars are missing so the app can render setup guidance.
export const supabase = createClient(
	supabaseUrl || 'https://example.supabase.co',
	supabaseAnonKey || 'public-anon-key',
)
