"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </QueryClientProvider>
  );
};

export { Providers };
