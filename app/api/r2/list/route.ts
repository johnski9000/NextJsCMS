import { NextResponse } from "next/server";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || "",
    secretAccessKey: process.env.R2_SECRET_KEY || "",
  },
});

export async function GET(req: Request) {
  const requiredEnvVars = {
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY: process.env.R2_ACCESS_KEY,
    R2_SECRET_KEY: process.env.R2_SECRET_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  };
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      console.error(`${key} is not set in environment variables`);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
  }

  try {
    const response = await s3.send(
      new ListObjectsCommand({ Bucket: process.env.R2_BUCKET_NAME })
    );

    const contents = response.Contents || [];

    const objects = contents.map((obj) => ({
      url: `${process.env.R2_PUBLIC_BUCKET_ID}/${obj.Key}`,
    }));

    return NextResponse.json({ objects });
  } catch (error) {
    console.error("List Error:", error);
    return NextResponse.json(
      { error: "Failed to list R2 images" },
      { status: 500 }
    );
  }
}
