import { NextResponse } from "next/server";

const WORKER_URL = "https://kv-worker.enquiries-01c.workers.dev";

export async function POST(req: Request) {
  try {
    const { slug, pageData } = await req.json();

    if (!slug || !pageData) {
      return NextResponse.json(
        { error: "Missing slug or pageData" },
        { status: 400 }
      );
    }

    const response = await fetch(`${WORKER_URL}/api/pages/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
