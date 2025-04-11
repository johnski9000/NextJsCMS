// lib/data-utils.ts
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./session_server";

export async function getUserWebsites() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) return { data: null, error: new Error("Not authenticated") };

  return await supabase
    .from("websites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
}

export async function getUserStats() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) return { data: null, error: new Error("Not authenticated") };

  // Get websites count
  const { data: websites, error: websitesError } = await supabase
    .from("websites")
    .select("id")
    .eq("user_id", user.id);

  // Get subscription info
  const { data: subscription, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (websitesError || subscriptionError) {
    return {
      data: null,
      error: websitesError || subscriptionError,
    };
  }

  return {
    data: {
      websitesCount: websites?.length || 0,
      subscription: subscription || null,
    },
    error: null,
  };
}
