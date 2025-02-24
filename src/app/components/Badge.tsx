"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "primary";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  onDismiss?: () => void;
  outline?: boolean;
  className?: string;
  isStatus?: boolean;
}

const variantClasses: Record<BadgeVariant, { bg: string; text: string }> = {
  default: {
    bg: "bg-surface-secondary",
    text: "text-text-primary",
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
  primary: {
    bg: "bg-primary-light",
    text: "text-primary",
  },
};

const sizeClasses: Record<BadgeSize, { container: string; icon: string }> = {
  sm: {
    container: "text-app-caption px-1.5 py-0.5",
    icon: "w-3 h-3",
  },
  md: {
    container: "text-app-body-sm px-2 py-0.5",
    icon: "w-3.5 h-3.5",
  },
  lg: {
    container: "text-app-body px-3 py-1",
    icon: "w-4 h-4",
  },
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  onDismiss,
  outline = false,
  className,
  isStatus,
}: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1 rounded-full font-medium";
  const variantStyle = variantClasses[variant];
  const sizeStyle = sizeClasses[size];

  return (
    <div
      className={cn(
        baseClasses,
        sizeStyle.container,
        outline
          ? `border border-${
              variant === "default" ? "border-medium" : variant
            } bg-transparent`
          : variantStyle.bg,
        variantStyle.text,
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
            "flex-shrink-0 rounded-full -mr-1 hover:bg-surface-tertiary transition-colors",
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
