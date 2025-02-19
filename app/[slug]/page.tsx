// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ComponentMap from "../components/ComponentMap";
import Sidebar from "../components/Sidebar";
import RefreshBoundary from "../components/RefreshBoundary"; // NEW

// Fetch page data on request
async function getPageData(slug: string) {
  const response = await fetch(`http://localhost:3001/api/pages/${slug}`, {
    cache: "no-store", // Ensure fresh data
  });

  if (!response.ok) return null;
  return response.json();
}

export default async function Page({ params }) {
  const { slug } = params;
  const pageData = await getPageData(slug);

  if (!pageData) return notFound();

  return (
    <RefreshBoundary>
      <main className="flex">
        {/* Wrap in RefreshBoundary to enable refetching */}

        <Sidebar slug={slug} />
        <div className="flex flex-col w-full">
          {pageData.components.map((component, index) => {
            const ComponentEntry = ComponentMap[component.component];
            if (!ComponentEntry) return null;

            const { component: Component } = ComponentEntry;
            return <Component key={index} {...component.props} />;
          })}
        </div>
      </main>{" "}
    </RefreshBoundary>
  );
}
