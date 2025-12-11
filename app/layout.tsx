import { ThemeModeScript } from "flowbite-react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "../.flowbite-react/init";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "./globals.css";
import Providers from "./providers";
import AgGridRegistry from "./components/AGGridRegistry";
import NavigationBar from "./components/navigation/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

ModuleRegistry.registerModules([AllCommunityModule]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <AgGridRegistry />
        <head>
          <ThemeModeScript />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeInit />
          <div className="flex">
            <NavigationBar />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
