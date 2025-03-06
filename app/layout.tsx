import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getSession } from "@/auth";
import AuthProvider from "./components/AuthProvider";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title:
    "Setoria Security | Event & Venue Security in Greater Manchester & Cheshire",
  description:
    "Setoria Security provides professional event and venue security services across Greater Manchester and Cheshire. Our licensed security personnel ensure safety with crowd control, emergency response, and threat detection. Contact us for tailored security solutions.",
  keywords: [
    "event security Manchester",
    "venue security Manchester",
    "door security Manchester",
    "event security Cheshire",
    "venue security Cheshire",
    "security services Greater Manchester",
    "Manchester security company",
    "licensed security guards",
    "crowd control Manchester",
    "access management security",
    "emergency response security",
    "threat detection Manchester",
    "CCTV monitoring security",
    "bar security Manchester",
    "club security Manchester",
    "festival security Manchester",
    "Manchester event security services",
    "concert security Manchester",
    "wedding security Manchester",
    "corporate event security",
    "private event security",
  ],
  openGraph: {
    title:
      "Setoria Security | Event & Venue Security in Greater Manchester & Cheshire",
    description:
      "Professional event and venue security services across Greater Manchester and Cheshire. Our licensed security team provides crowd control, access management, emergency response, and CCTV monitoring for bars, clubs, and large-scale events.",
    url: "https://setoriasecurity.co.uk/",
    siteName: "Setoria Security",
    images: [
      {
        url: "https://setoriasecurity.co.uk/setoria-7.jpeg",
        width: 1200,
        height: 630,
        alt: "Setoria Security providing event security services",
      },
    ],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Setoria Security | Event & Venue Security in Greater Manchester & Cheshire",
    description:
      "Trusted security solutions for events, venues, bars, and clubs in Greater Manchester and Cheshire. Our licensed security team ensures crowd control, emergency response, and safety management.",
    images: ["https://setoriasecurity.co.uk/setoria-7.jpeg"],
  },
  alternates: {
    canonical: "https://setoriasecurity.co.uk/",
  },
};
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },

  autoContrast: true,
  primaryColor: "dark",

  defaultRadius: "md",
  // Force dark mode globally
  colorScheme: "dark", // This ensures Mantine applies dark mode styles
  // Optional: Customize default text and background colors
  other: {
    backgroundColor: "#000000", // Black background
    textColor: "#ffffff", // White text
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AuthProvider session={session}>
          <MantineProvider
            theme={theme}
            withGlobalStyles
            withNormalizeCSS
            defaultColorScheme="dark" // Ensures dark mode is the default
          >
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
