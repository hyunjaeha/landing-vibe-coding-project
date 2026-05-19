import { createClient } from "@supabase/supabase-js";

let serverClient = null;

export function getSupabaseConfigStatus() {
  return {
    hasUrl: Boolean(process.env.SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
}

export function isSupabaseConfigured() {
  const status = getSupabaseConfigStatus();
  return status.hasUrl && status.hasServiceRoleKey;
}

export function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  if (!serverClient) {
    serverClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }

  return serverClient;
}
