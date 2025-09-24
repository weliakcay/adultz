"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { useAnalytics } from "@/components/providers/use-analytics";
import type { AnalyticsEventName } from "@/types/analytics";

const baseClasses =
  "inline-flex items-center justify-center rounded-full border text-xs font-semibold uppercase tracking-[0.32em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(7,7,12,0.9)]";

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "px-5 py-3",
  md: "px-6 py-4",
  lg: "px-8 py-5 text-sm",
};

const intensityClasses: Record<"purple" | "blue" | "pink", string> = {
  purple:
    "border-[rgba(157,78,221,0.65)] bg-[rgba(157,78,221,0.2)] text-foreground shadow-[0_0_30px_rgba(157,78,221,0.35)] hover:bg-[rgba(157,78,221,0.35)]",
  blue:
    "border-[rgba(0,180,216,0.75)] bg-[rgba(0,180,216,0.18)] text-foreground shadow-[0_0_30px_rgba(0,180,216,0.35)] hover:bg-[rgba(0,180,216,0.3)]",
  pink:
    "border-[rgba(255,0,84,0.65)] bg-[rgba(255,0,84,0.15)] text-foreground shadow-[0_0_30px_rgba(255,0,84,0.35)] hover:bg-[rgba(255,0,84,0.25)]",
};

type NeonButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  intensity?: "purple" | "blue" | "pink";
  href?: string;
  className?: string;
  eventName?: AnalyticsEventName;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function NeonButton({
  children,
  size = "md",
  intensity = "purple",
  href,
  className,
  eventName,
  onClick,
}: NeonButtonProps) {
  const { track } = useAnalytics();

  const handleClick: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (event) => {
    if (eventName) {
      track(eventName, { label: href ?? "button" });
    }
    onClick?.(event);
  };

  const classes = clsx(baseClasses, sizeClasses[size], intensityClasses[intensity], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={handleClick}>
      {children}
    </button>
  );
}
