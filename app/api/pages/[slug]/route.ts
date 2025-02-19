import { NextResponse } from "next/server";

const WORKER_URL = "https://kv-worker.enquiries-01c.workers.dev";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
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

export async function POST(req: Request) {
  try {
    console.log("Request body:", req.body);
    const { slug, pageData } = await req.json();
    console.log("Slug:", slug);
    console.log("Page data:", pageData);
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
