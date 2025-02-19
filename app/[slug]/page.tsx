// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import ComponentMap from "../components/ComponentMap";
import Sidebar from "../components/Sidebar";
import RefreshBoundary from "../components/RefreshBoundary";

// Fetch page data on request
async function getPageData(slug: string) {
  const response = await fetch(`http://localhost:3001/api/pages/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json();
}

// Fetch all pages
async function getAllPageData() {
  const response = await fetch("http://localhost:3001/api/pages/all");

  if (!response.ok) return null;
  const data = await response.json();
  return data.map((page) => ({
    key: page.key,
    value: JSON.parse(page.value),
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const pageData = await getPageData(slug);
  const allPageData = await getAllPageData();

  if (!pageData) return notFound();

  return (
    <RefreshBoundary>
      <main className="flex">
        <Sidebar slug={slug} initialPageData={allPageData} />
        <div className="flex flex-col w-full">
          {pageData.components.map((component, index) => {
            const ComponentEntry = ComponentMap[component.component];
            if (!ComponentEntry) return null;
            console.log(ComponentEntry);
            const { component: Component } = ComponentEntry;
            return <Component key={index} {...component.props} />;
          })}
        </div>
      </main>
    </RefreshBoundary>
  );
}
