import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "forest" | "navy" | "amber" | "outline" | "danger" | "gray";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-neutral-100 text-neutral-800 border-neutral-200",
    forest: "bg-emerald-50 text-emerald-800 border-emerald-200",
    navy: "bg-brand-navy-subtle text-brand-navy border-brand-navy/20",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    outline: "border border-neutral-200 text-neutral-700 bg-white",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
    gray: "bg-neutral-100 text-neutral-600 border-neutral-200",
  };

  const dotColors = {
    default: "bg-neutral-500",
    forest: "bg-emerald-500",
    navy: "bg-brand-navy",
    amber: "bg-amber-500",
    outline: "bg-neutral-400",
    danger: "bg-rose-500",
    gray: "bg-neutral-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}

