// app/dashboard/layout.tsx
import LayoutWrapper from "./LayoutWrapper"; // Client-side wrapper

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-gray-900 min-h-screen text-white">
      {/* Pass session to the client-side wrapper */}

      {children}
    </div>
  );
}
