// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import ComponentMap from "./components/ComponentMap";
import Sidebar from "./components/AdminSidebar/Sidebar";
import RefreshBoundary from "./components/RefreshBoundary";
import Banner_Carousel from "./components/Banners/Banner_Carousel/Banner_Carousel";
import AboutUs from "./components/AboutUs/AboutUs";
import Features from "./components/AboutUs/Features";
import Reviews from "./components/Reviews/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { getServerSession } from "next-auth";
import TestimonialCarousel from "./components/Reviews/Testimonials";

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

  if (!pageData) return notFound();

  return (
    <RefreshBoundary>
      <main className="flex">
        {session && (
          <Sidebar slug={"home"} initialPageData={allPageData || []} />
        )}
        <div className="flex flex-col w-full z-40">
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
          )}{" "}
        </div>
      </main>
    </RefreshBoundary>
  );
}
