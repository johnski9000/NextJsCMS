"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

// Fetcher function to get subscription data
const fetchSubscription = async () => {
  const res = await fetch("/api/subscription");
  if (!res.ok) throw new Error("Failed to fetch subscription");
  return res.json();
};

// Create Subscription Context
const SubscriptionContext = createContext(null);

// Subscription Provider
export const SubscriptionProvider = ({ children }) => {
  const { data, error, isValidating, mutate } = useSWR("/api/subscription", fetchSubscription);

  return (
    <SubscriptionContext.Provider value={{ data, error, isValidating, mutate }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Hook to use Subscription
export const useSubscription = () => {
  return useContext(SubscriptionContext);
};
