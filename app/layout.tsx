import { Montserrat } from "next/font/google";
import "./globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: {
    fontFamily: "Montserrat, sans-serif",
  },
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
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {" "}
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <Navigation />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
