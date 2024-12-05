import { createClient } from "@supabase/supabase-js";
import { Database } from "../features/Types/SupabaseTypes";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient<Database>(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
