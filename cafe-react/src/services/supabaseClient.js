import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if credentials are provided
const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-supabase-url'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export default supabase
