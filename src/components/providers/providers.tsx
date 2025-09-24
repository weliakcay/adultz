"use client";

import { AnalyticsProvider } from "@/components/providers/use-analytics";
import { ToastProvider } from "@/components/providers/use-toast";
import { AgeGate } from "@/components/safety/age-gate";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      <ToastProvider>
        {children}
        <AgeGate />
      </ToastProvider>
    </AnalyticsProvider>
  );
}
