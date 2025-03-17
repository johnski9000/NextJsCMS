import Sidebar from "./Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface LayoutWrapperProps {
  children: React.ReactNode;
  session: any; // Use your session type from next-auth.d.ts
}

export default async function LayoutWrapper({
  children,
  session: initialSession,
}: LayoutWrapperProps) {
  const session = await getServerSession(authOptions); // Still use useSession for client-side updates

  // Use initialSession from server if client-side session isn’t ready
  const effectiveSession = session || initialSession;

  if (!session && !effectiveSession) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex overflow-auto">
      <Sidebar session={session} />

      <div className=" w-full flex-col overflow-y-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}
