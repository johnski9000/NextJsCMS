import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WORKER_URL = process.env.KV_WORKER_URL;

export async function GET(req: NextRequest) {
  console.log("GET request received");
  try {
    const url = new URL(req.url);
    const slug = url.pathname.replace(/^\/api\/pages\//, ""); // Extract slug properly
    if (!slug) {
      return NextResponse.json({ error: "Missing page slug" }, { status: 400 });
    }

    console.log("Fetching page with slug:", slug);

    const response = await fetch(`${WORKER_URL}/api/pages/${slug}`);

    if (!response.ok) {
      console.error(
        "Error fetching page:",
        response.status,
        response.statusText
      );
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
    const { slug, pageData } = await req.json();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing slug" },
        { status: 400 }
      );
    }

    if (!pageData || typeof pageData !== "object") {
      return NextResponse.json(
        { error: "Invalid or missing page data" },
        { status: 400 }
      );
    }

    console.log("Saving page with slug:", slug);

    const response = await fetch(
      `${WORKER_URL}/api/pages/${encodeURIComponent(slug)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to store data:",
        response.status,
        response.statusText
      );
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
