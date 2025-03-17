import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"; // Adjust path (e.g., "../../auth")

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="py-4 min-h-screen px-8 bg-gray-900 border-b border-orange-500/20">
      <h6 className="text-lg font-semibold text-white">
        Welcome back,{" "}
        <span className="text-orange-500">
          {session?.user?.name || "User"}! <br /> stripe id -
          {session?.stripeCustomerId}
        </span>
      </h6>
      <p className="text-sm text-orange-200">Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="border border-orange-500/30 rounded-xl shadow-md shadow-orange-500/10 overflow-hidden">
          <img
            src="/dashboard-placeholder.png"
            alt="Dashboard Placeholder"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
