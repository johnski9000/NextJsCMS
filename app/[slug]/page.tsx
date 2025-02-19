"use client";

import React, { useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import ComponentMap from "../components/ComponentMap";
import { getSession } from "@/auth";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  const { slug } = React.use(params);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  // Fetch page data dynamically
  const fetchPageData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/pages/${slug}`);

      if (!response.ok) {
        setPageData(null);
        return;
      }

      const data = await response.json();
      setPageData(data);
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Run fetchPageData on mount
  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  if (loading) return <div>Loading...</div>;
  if (!pageData) return notFound();

  return (
    <main className="flex">
      {session && <Sidebar refreshPage={fetchPageData} />}
      <div className="flex flex-col w-full">
        {pageData?.components.map((component, index) => {
          const ComponentEntry = ComponentMap[component.component];
          const { props } = component;
          if (!ComponentEntry) return null;

          const { component: Component } = ComponentEntry;

          return <Component key={index} {...props} />;
        })}
        <div className="text-black">asdad</div>
      </div>
    </main>
  );
}
