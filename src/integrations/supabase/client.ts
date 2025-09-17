import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fxsdfekulbrgeinoakai.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4c2RmZWt1bGJyZ2Vpbm9ha2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMDAzMDEsImV4cCI6MjA3MzU3NjMwMX0.l-iPVRu7KJZBZNZb-bgLGnI3bsg2_hNDVO5_NdzdH0A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});