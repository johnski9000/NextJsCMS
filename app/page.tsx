// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import ComponentMap from "./components/ComponentMap";
import Sidebar from "./components/AdminSidebar/Sidebar";
import RefreshBoundary from "./components/RefreshBoundary";

// Fetch page data on request
async function getPageData() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/home`, {
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json();
}

// Fetch all pages
async function getAllPageData() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/all`);

  if (!response.ok) return null;
  const data = await response.json();
  return data.map((page) => ({
    key: page.key,
    value: JSON.parse(page.value),
  }));
}

export default async function Page() {
  const pageData = await getPageData();
  const allPageData = await getAllPageData();

  if (!pageData) return notFound();

  return (
    <RefreshBoundary>
      <main className="flex">
        <Sidebar slug={"home"} initialPageData={allPageData} />
        <div className="flex flex-col w-full">
          {pageData?.components?.map((component, index) => {
            const ComponentEntry = ComponentMap[component.component];
            if (!ComponentEntry) return null;
            const { component: Component } = ComponentEntry;
            return <Component key={index} {...component.props} />;
          })}
        </div>
      </main>
    </RefreshBoundary>
  );
}
