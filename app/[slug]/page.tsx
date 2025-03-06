import { notFound } from "next/navigation";
import ComponentMap from "../components/ComponentMap";
import Sidebar from "../components/AdminSidebar/Sidebar";
import RefreshBoundary from "../components/RefreshBoundary";
import { getServerSession } from "next-auth";

// Fetch page data on request
async function getPageData(slug: string) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/pages/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) return null;
  return response.json();
}

// Define a type for the pages
interface PageData {
  key: string;
  value: string; // Assuming value is a JSON string that needs parsing
}

// Fetch all pages
async function getAllPageData(): Promise<{ key: string; value: any }[]> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/all`);

  if (!response.ok) return [];

  const data: PageData[] = await response.json(); // Explicitly define type
  return data.map((page) => ({
    key: page.key,
    value: JSON.parse(page.value), // Ensure `value` is parsed correctly
  }));
}

// ✅ Await params properly to extract `slug`ed
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Await the promise
  const session = await getServerSession();
  const pageData = await getPageData(slug);
  const allPageData = await getAllPageData(); // Always an array

  if (!pageData) return notFound();

  return (
    <RefreshBoundary>
      <main className="flex">
        {session && <Sidebar slug={slug} initialPageData={allPageData} />}
        <div className="flex flex-col w-full">
          {pageData.components.map(
            (
              component: { component: keyof typeof ComponentMap; props: any },
              index: number
            ) => {
              const ComponentEntry = ComponentMap[component.component];
              if (!ComponentEntry) return null;
              const { component: Component } = ComponentEntry;
              return <Component key={index} {...component.props} />;
            }
          )}
        </div>
      </main>
    </RefreshBoundary>
  );
}
