"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "error";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
  isStatus?: boolean;
}

const variantClasses: Record<
  BadgeVariant,
  { bg: string; text: string; border?: string }
> = {
  primary: {
    bg: "bg-primary",
    text: "text-white",
  },
  secondary: {
    bg: "bg-surface-secondary",
    text: "text-text-primary",
  },
  outline: {
    bg: "bg-white dark:bg-neutral-900",
    text: "text-text-primary",
    border: "border border-border-light",
  },
  success: {
    bg: "bg-success-light",
    text: "text-success",
  },
  warning: {
    bg: "bg-warning-light",
    text: "text-warning",
  },
  error: {
    bg: "bg-error-light",
    text: "text-error",
  },
};

const sizeClasses: Record<BadgeSize, { container: string; icon: string }> = {
  sm: {
    container: "text-app-caption px-2 py-0.5",
    icon: "w-3 h-3",
  },
  md: {
    container: "text-app-body-sm px-2.5 py-0.5",
    icon: "w-3.5 h-3.5",
  },
  lg: {
    container: "text-app-body px-3.5 py-1",
    icon: "w-4 h-4",
  },
};

export function Badge({
  children,
  variant = "secondary",
  size = "md",
  icon,
  onDismiss,
  className,
  isStatus,
}: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1 rounded-md font-medium";
  const variantStyle = variantClasses[variant];
  const sizeStyle = sizeClasses[size];

  return (
    <div
      className={cn(
        baseClasses,
        sizeStyle.container,
        variantStyle.bg,
        variantStyle.text,
        variantStyle.border,
        className
      )}
      role={isStatus ? "status" : undefined}
    >
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "flex-shrink-0 rounded-md -mr-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
            sizeStyle.icon
          )}
          aria-label="Dismiss"
        >
          <X className="w-full h-full" />
        </button>
      )}
    </div>
  );
}
