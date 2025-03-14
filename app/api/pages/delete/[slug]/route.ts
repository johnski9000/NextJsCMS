import { NextResponse } from "next/server";

const WORKER_URL = process.env.KV_WORKER_URL;

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params; // Extract slug from URL params

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    if (slug === "home") {
      return NextResponse.json(
        { error: "Cannot delete home page" },
        { status: 400 }
      );
    }

    const response = await fetch(`${WORKER_URL}/api/pages/delete/${slug}`, {
      method: "POST",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete page" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
