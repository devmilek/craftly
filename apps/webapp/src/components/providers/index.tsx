import React from "react";
import { ThemeProvider } from "../theme/theme-provider";
import ModalProvider from "./modal-provider";
import { Toaster } from "../ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NuqsAdapter>
        {children}
        <ModalProvider />
        <Toaster richColors />
      </NuqsAdapter>
    </ThemeProvider>
  );
};

export default Providers;
