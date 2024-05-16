// import Navbar from "../components/Navbar";
import "./globals.css";
import React from "react";

import TopBar from "../components/Topbar";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="w-full bg-gray_dark">
        <div className="min-h-screen bg-gray-dark">
          <div className="flex flex-col min-h-screen mb-24 md:ml-24">
            <TopBar />
            <main>{children}</main>
          </div>
          <Navbar className="fixed flex flex-row h-24 w-full items-center justify-between md:flex-col md:h-full md:w-24 md:left-0 top-0 " />
        </div>
      </body>
    </html>
  );
}
