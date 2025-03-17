import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (for admin tasks)
const supabase_server = createClient(
  process.env.SUPABASE_URL || "", // Fallback to empty string to avoid undefined issues
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Client-side Supabase client (for public access)
const supabase_client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export { supabase_server, supabase_client };
