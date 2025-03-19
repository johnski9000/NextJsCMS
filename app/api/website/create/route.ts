import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const checkSubdomainExists = async (subdomain: string) => {
  const { data, error } = await supabase
    .from("websites")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No row found, subdomain is available
      return false;
    }
    throw new Error(`Supabase error: ${error.message}`);
  }

  return !!data; // true if subdomain exists
};

export async function POST(req: NextRequest) {
  try {
    const { userId, subdomain, customDomain, plan } = await req.json();

    if (!userId || !subdomain || !plan) {
      return NextResponse.json(
        { error: "User ID, Subdomain, and Plan are required" },
        { status: 400 }
      );
    }

    const exists = await checkSubdomainExists(subdomain);

    if (exists) {
      return NextResponse.json(
        { error: "Subdomain already exists" },
        { status: 409 }
      );
    }

    // Insert the new website record
    const { data, error } = await supabase
      .from("websites")
      .insert([
        {
          user_id: userId,
          subdomain,
          custom_domain: customDomain || null,
          plan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create website" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Website created successfully",
        website: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
