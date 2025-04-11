// app/dashboard/page.tsx
import { getUserWebsites, getUserStats } from "@/lib/supabase/data-utils";
import { QuickStatsGrid } from "./QuickStats";
import WebsiteGrid from "./WebsiteGrid";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/data-utils";

export default async function DashboardPage() {
  const session = await getSession();

  // Redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  const { data: websites, error: websitesError } = await getUserWebsites();
  const { data: stats, error: statsError } = await getUserStats();

  if (websitesError) {
    console.error("Error fetching websites:", websitesError);
    return <div>Error loading websites</div>;
  }

  if (statsError) {
    console.error("Error fetching stats:", statsError);
  }
  console.log("Websites:", websites);
  console.log("Stats:", stats);
  return (
    <main className="p-2">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Welcome to your dashboard! Here you can manage your websites and view
        statistics.
      </p>
      <QuickStatsGrid />
      <h2 className="text-2xl mt-4 font-bold mb-4">Your Websites</h2>
      <p className="text-gray-600 mb-4">Manage your websites below:</p>
      <WebsiteGrid />
    </main>
  );
}
