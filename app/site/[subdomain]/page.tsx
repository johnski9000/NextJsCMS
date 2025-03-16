// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import ComponentMap from "@/app/components/ComponentMaps/ComponentMap";
import Sidebar from "@/app/components/AdminSidebar/Sidebar";
import { getServerSession } from "next-auth";
import DynamicNavigation from "@/app/components/DynamicNavigation";
import DynamicFooter from "@/app/components/DynamicFooter";

// Fetch page data on request
async function getPageData() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/home`, {
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json();
}

// Define a type for the pages
interface PageData {
  key: string;
  value: string; // Assuming value is a JSON string that needs parsing
}

// Fetch all pages
async function getAllPageData(): Promise<{ key: string; value: any }[] | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/pages/all`);
  if (!response.ok) return null;

  const data: PageData[] = await response.json(); // Explicitly define type
  return data.map((page) => ({
    key: page.key,
    value: JSON.parse(page.value), // Ensure `value` is parsed correctly
  }));
}

export default async function Page() {
  const session = await getServerSession();
  const pageData = await getPageData();
  const allPageData = await getAllPageData();
  const navigation = allPageData?.find((page) => page.key === "Navigation");
  const footer = allPageData?.find((page) => page.key === "Footer");

  // if (!pageData) return notFound();
  if (!pageData) return <div>not found</div>;

  return (
    <main className="flex min-h-screen">
      {session && (
        <div className="w-[250px] h-screen fixed">
          <Sidebar slug={"home"} initialPageData={allPageData || []} />
        </div>
      )}
      <div
        className={`flex flex-col z-40 ${
          session ? "ml-[250px] w-[calc(100%-250px)]" : "w-full"
        }`}
      >
        {navigation && <DynamicNavigation selectedNav={navigation?.value} />}
        {pageData?.components?.map(
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
