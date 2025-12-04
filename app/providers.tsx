"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "flowbite-react";
import ContactsContextProvider from "./ContactsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ContactsContextProvider>{children}</ContactsContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
