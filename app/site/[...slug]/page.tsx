import { notFound } from "next/navigation";
import ComponentMap from "../components/ComponentMaps/ComponentMap";
import Sidebar from "../components/AdminSidebar/Sidebar";
import { getServerSession } from "next-auth";
import DynamicNavigation from "../components/DynamicNavigation";
import DynamicFooter from "../components/DynamicFooter";

// Fetch page data
async function getPageData(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/pages/${slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

// Fetch all pages
async function getAllPageData(): Promise<{ key: string; value: any }[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/all`);
    if (!response.ok) return [];

    const data = await response.json();
    return data.map((page: any) => ({
      key: page.key,
      value: JSON.parse(page.value || "{}"), // Ensure valid JSON
    }));
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug } = await params;
  // ✅ Ensure params.slug exists and is an array
  const slugArray = Array.isArray(slug) ? slug : [];
  const concatSlug = slugArray.join("/");

  console.log("Resolved slug:", concatSlug);

  // ✅ Prevent recursive fetching
  if (concatSlug.includes("api/pages")) {
    console.error("Detected recursive fetch attempt, aborting request.");
    return notFound();
  }

  const session = await getServerSession();
  const pageData = await getPageData(concatSlug);
  const allPageData = await getAllPageData();
  const navigation = allPageData?.find((page) => page.key === "Navigation");
  const footer = allPageData?.find((page) => page.key === "Footer");
  // ✅ Ensure page data doesn't trigger infinite fetch loops
  if (pageData?.key?.includes("api/pages")) {
    console.error("Detected malformed page data, preventing re-render loop.");
    return notFound();
  }

  // Handle 404 for non-logged-in users
  if (!pageData && !session) return notFound();

  // Handle non-existent pages for admins
  if (!pageData && session) {
    return (
      <main className="flex min-h-screen w-[calc(100%-250px)] ml-[250px]">
        {session && <Sidebar slug={concatSlug} initialPageData={allPageData} />}
        <div className="flex flex-col w-full min-h-screen justify-center items-center">
          <h1>Page not found, create /{concatSlug} in sidebar :)</h1>
        </div>
      </main>
    );
  }

  // Handle empty components
  if (!pageData?.components || pageData.components.length === 0) {
    return (
      <main className="flex min-h-screen w-[calc(100%-250px)] ml-[250px]">
        {session && <Sidebar slug={concatSlug} initialPageData={allPageData} />}
        <div className="flex flex-col w-full min-h-screen justify-center items-center">
          {" "}
          {navigation && <DynamicNavigation selectedNav={navigation?.value} />}
          <h1>Page is empty, add components in sidebar :)</h1>
          {footer && <DynamicFooter selectedFooter={footer?.value} />}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen ">
      {session && <Sidebar slug={concatSlug} initialPageData={allPageData} />}
      <div className="w-[calc(100%-250px)] ml-[250px]">
        {navigation && <DynamicNavigation selectedNav={navigation?.value} />}

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
        {footer && <DynamicFooter selectedFooter={footer?.value} />}
      </div>
    </main>
  );
}
