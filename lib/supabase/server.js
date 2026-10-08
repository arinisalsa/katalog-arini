import { createClient } from "@supabase/supabase-js";
import { createServerClient as createSsrClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Koneksi server untuk pengunjung (SUPABASE_SECRET_KEY)
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Koneksi sesi admin dengan cookie (@supabase/ssr dan SUPABASE_PUBLISHABLE_KEY)
export async function createSessionClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  return createSsrClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Method setAll dipanggil dari Server Component, abaikan jika ada proxy/middleware
        }
      },
    },
  });
}

export const createSupabaseServerClient = createServerClient;
export const getSupabaseServer = createServerClient;
export const createAdminSessionClient = createSessionClient;
