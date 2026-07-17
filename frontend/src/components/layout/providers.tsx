"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const loadProfile = useAuthStore((s) => s.loadProfile);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "hsl(0 0% 100%)",
            color: "hsl(340 10% 15%)",
            border: "1px solid hsl(340 15% 90%)",
          },
        }}
      />
    </ThemeProvider>
  );
}
