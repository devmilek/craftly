import React from "react";
import { ThemeProvider } from "../theme/theme-provider";
import ModalProvider from "./modal-provider";
import { Toaster } from "../ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import QueryProvider from "./query-provider";

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryProvider>
        <NuqsAdapter>
          {children}
          <ModalProvider />
          <Toaster richColors />
        </NuqsAdapter>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
