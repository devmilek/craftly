import React from "react";
import { ThemeProvider } from "../theme/theme-provider";
import ModalProvider from "./modal-provider";
import { Toaster } from "../ui/sonner";

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <ModalProvider />
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
