"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

// THIS WILL WORK

export default function AuthProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      {children}
      <ToastContainer position="bottom-right" />
    </SessionProvider>
  );
}
