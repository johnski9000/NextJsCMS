import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WORKER_URL = "https://kv-worker.enquiries-01c.workers.dev";

// Fix the type definition for params
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathnameParts = url.pathname.split("/");
    const slug = pathnameParts[pathnameParts.length - 1]; // Extract slug

    const response = await fetch(`${WORKER_URL}/api/pages/${slug}`);

    if (!response.ok) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Worker:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, pageData } = await req.json(); // ✅ Fixed - No need for `req.body`

    const response = await fetch(`${WORKER_URL}/api/pages/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to store data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error posting to Worker:", error);
    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
