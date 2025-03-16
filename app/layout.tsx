import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import AuthProvider from "./components/Providers/AuthProvider";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import RefreshBoundary from "./context/RefreshBoundary";
import { getServerSession } from "next-auth";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
// async function getMetaData() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXTAUTH_URL}/api/pages/Metadata`,
//       { cache: "no-store" }
//     );
//     if (!response.ok) return null;
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching page data:", error);
//     return null;
//   }
// }

// Use generateMetadata for dynamic metadata
// export async function generateMetadata(): Promise<Metadata> {
//   const metaData = await getMetaData();
//   // Return default metadata if the fetch fails
//   if (!metaData) {
//     return {
//       title: "Default Title",
//       description: "Default Description",
//     };
//   }

//   // Spread the fetched metadata into the Metadata object
//   return {
//     title: metaData.props.title,
//     description: metaData.props.description,
//     openGraph: {
//       title: metaData.props["og:title"],
//       description: metaData.props["og:description"],
//       images: [metaData.props["og:image"]],
//       url: metaData.props["og:url"],
//     },
//     twitter: {
//       card: metaData.props["twitter:card"],
//       title: metaData.props["twitter:title"],
//       description: metaData.props["twitter:description"],
//       images: [metaData.props["twitter:image"]],
//     },
//   };
// }
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },
  colorScheme: "dark",
  primaryColor: "blue", // Change this to match your brand color
  primaryShade: 6,

  defaultRadius: "md",

  colors: {
    blue: [
      "#E3F2FD",
      "#BBDEFB",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#2196F3",
      "#1E88E5",
      "#1976D2",
      "#1565C0",
      "#0D47A1",
    ],
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log("session", session);
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AuthProvider session={session}>
          <RefreshBoundary>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </RefreshBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
