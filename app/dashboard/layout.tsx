// app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import LayoutWrapper from "./LayoutWrapper"; // Client-side wrapper
import { authOptions } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative bg-gray-900 min-h-screen text-white">
      {/* Pass session to the client-side wrapper */}
      <LayoutWrapper session={session}>{children}</LayoutWrapper>
    </div>
  );
}
