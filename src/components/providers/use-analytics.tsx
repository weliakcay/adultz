"use client";

import { createContext, useCallback, useContext } from "react";
import { AnalyticsEventName } from "@/types/analytics";

type AnalyticsPayload = Record<string, unknown>;

type AnalyticsContextValue = {
  track: (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined,
);

function emitEvent(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  const detail = { event, payload, timestamp: Date.now() };
  window.dispatchEvent(new CustomEvent("adultz-analytics", { detail }));

  if (process.env.NODE_ENV !== "production") {
    console.info("[Analytics]", detail);
  }
}

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const track = useCallback((event: AnalyticsEventName, payload?: AnalyticsPayload) => {
    emitEvent(event, payload);
  }, []);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
