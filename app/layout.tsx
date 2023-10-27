"use client";
import Provider from "@/provider/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Partials/Navbar";
import { UserContextProvider, userUserContext } from "./contextProvider/store";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, setUser } = userUserContext();

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {<Navbar />}
          <Provider>{children}</Provider>
        </UserContextProvider>
      </body>
    </html>
  );
}
