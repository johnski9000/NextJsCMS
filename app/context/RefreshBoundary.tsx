"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

export default function RefreshBoundary({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle page refresh
  useEffect(() => {
    router.refresh();
  }, [refreshTrigger]);

  // Handle hash-based scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash; // e.g., "#about-us"
      if (hash) {
        const elementId = hash.substring(1); // Remove "#" to get "about-us"
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Scroll to hash on initial load
    handleHashChange();

    // Listen for hash changes (e.g., nav clicks)
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div key={refreshTrigger}>
      {children}
      {/* Hidden button for debugging refresh */}
      <button onClick={() => setRefreshTrigger((prev) => prev + 1)} hidden>
        Refresh
      </button>
    </div>
  );
}
