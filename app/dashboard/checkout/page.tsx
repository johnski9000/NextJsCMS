import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import React from "react";
import CheckoutPage from "./client";

async function page() {
  const session = await getServerSession(authOptions);
  return <CheckoutPage session={session} />;
}

export default page;
