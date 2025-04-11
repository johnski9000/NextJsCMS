import { QuickStatsGrid } from "./QuickStats";
import WebsiteGrid from "./WebsiteGrid";


export default function DashboardPage() {
  return <main >
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    <p className="text-gray-600 mb-4">Welcome to your dashboard! Here you can manage your websites and view statistics.</p>
    <QuickStatsGrid />
    <h2  className="text-2xl mt-4 font-bold mb-4">Your Websites</h2>
    <p className="text-gray-600 mb-4">Manage your websites below:</p>
    <WebsiteGrid/>
  </main>;
}
