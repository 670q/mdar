import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Returning a dummy client for build.')
    return createBrowserClient('https://dummy.supabase.co', 'dummy-key')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
