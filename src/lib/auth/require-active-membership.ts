import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BusinessMembership } from "@/types/database";

export const requireActiveMembership = cache(async (): Promise<BusinessMembership> => {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("business_memberships")
    .select("business_id, role, businesses(id, name, slug)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Unable to load your business membership.");
  if (!data || !data.businesses) redirect("/onboarding");
  return data as unknown as BusinessMembership;
});
