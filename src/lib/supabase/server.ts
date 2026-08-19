import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(env.supabaseUrl(), env.supabasePublishableKey(), {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll() { /* Server Components cannot set cookies; proxy refreshes auth sessions. */ },
    },
  });
}
