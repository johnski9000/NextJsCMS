import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { supabase_server } from "@/auth/supabase";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  // Redirect to login if no session is found
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch additional user data from Supabase
  const { data: user, error } = await supabase_server
    .from("users")
    .select("*")
    .eq("id", token.sub) // token.sub is the user ID
    .single();
  if (error) console.error("Supabase user fetch error:", error);

  // Merge Supabase user data into the request headers (available in the next API or pages)
  const requestHeaders = new Headers(req.headers);
  if (user) {
    requestHeaders.set("X-User-Data", JSON.stringify(user));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
