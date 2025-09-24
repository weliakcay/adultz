"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

export type ToastVariant = "success" | "info" | "warning";

export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastInstance = ToastOptions & { id: string };

type ToastContextValue = {
  pushToast: (options: ToastOptions) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const value = useMemo(() => {
    const pushToast = ({
      title,
      description,
      variant = "info",
      duration = 5000,
    }: ToastOptions) => {
      const id = uuidv4();
      const toast: ToastInstance = { id, title, description, variant, duration };
      setToasts((prev) => [...prev, toast]);
      if (duration > 0) {
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((item) => item.id !== id));
        }, duration);
      }
    };

    const dismissToast = (id: string) => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    };

    return { pushToast, dismissToast } satisfies ToastContextValue;
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3"
            role="status"
            aria-live="polite"
          >
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`neon-border blur-overlay rounded-[18px] border border-transparent p-4 shadow-lg transition-transform hover:-translate-y-1 ${
                  toast.variant === "success"
                    ? "bg-[rgba(0,180,216,0.12)]"
                    : toast.variant === "warning"
                    ? "bg-[rgba(255,0,84,0.12)]"
                    : "bg-[rgba(157,78,221,0.12)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-lg text-foreground">
                      {toast.title}
                    </p>
                    {toast.description ? (
                      <p className="mt-1 text-sm text-muted">
                        {toast.description}
                      </p>
                    ) : null}
                  </div>
                  <button
                    onClick={() => value.dismissToast(toast.id)}
                    className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
