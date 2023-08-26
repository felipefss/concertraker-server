import { Database } from '@/types/db.generated';
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.API_URL;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY;

if (!supabaseURL || !serviceRoleKey) {
  throw new Error('Supabase env vars not defined.');
}

export const supabase = createClient<Database>(supabaseURL, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const adminAuthClient = supabase.auth.admin;
