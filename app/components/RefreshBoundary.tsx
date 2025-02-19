// components/RefreshBoundary.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RefreshBoundary({ children }) {
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    router.refresh();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

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
