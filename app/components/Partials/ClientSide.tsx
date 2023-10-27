"use client";
import { ThemeContextProvider } from "@/app/contextProvider/store";
import React from "react";
function ClientSide({ children }) {
  <ThemeContextProvider>{children}</ThemeContextProvider>;
}

export default ClientSide;
