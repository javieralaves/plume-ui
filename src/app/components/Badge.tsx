"use client";

import { X, Loader2, CheckCircle2, XCircle, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Available visual styles for the badge
 */
type BadgeVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "error"
  | "destructive";

type BadgeSize = "sm" | "md" | "lg";

type TransactionStatusType = "pending" | "success" | "failed" | "cooldown";

/**
 * A badge component for displaying short status text, labels, or counts.
 * Supports different visual styles and can contain icons or text.
 * Can also be used to display transaction statuses with predefined styles.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // Different variants
 * <Badge variant="primary">Featured</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="outline">Archive</Badge>
 * <Badge variant="destructive">Delete</Badge>
 *
 * // Transaction status
 * <Badge transactionStatus="pending">Processing...</Badge>
 * <Badge transactionStatus="cooldown" cooldownRemaining={172800}>Unstaking</Badge>
 * ```
 */
interface BadgeProps {
  /** Visual style variant of the badge */
  variant?: BadgeVariant;
  /** Content of the badge */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Size of the badge */
  size?: BadgeSize;
  /** Icon to be displayed on the badge */
  icon?: ReactNode;
  /** Callback function to be called when the badge is dismissed */
  onDismiss?: () => void;
  /** Indicates if the badge is a status badge */
  isStatus?: boolean;
  /** Transaction status type for predefined transaction status styles */
  transactionStatus?: TransactionStatusType;
  /** Optional cooldown time remaining (in seconds) for cooldown status */
  cooldownRemaining?: number;
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
  destructive: {
    bg: "bg-destructive-light",
    text: "text-destructive",
  },
};

const sizeClasses: Record<BadgeSize, { container: string; icon: string }> = {
  sm: {
    container: "text-app-caption px-2",
    icon: "w-3 h-3",
  },
  md: {
    container: "text-app-body-sm px-2.5",
    icon: "w-3.5 h-3.5",
  },
  lg: {
    container: "text-app-body px-3.5",
    icon: "w-4 h-4",
  },
};

const transactionStatusConfig: Record<
  TransactionStatusType,
  { icon: ReactNode; variant: BadgeVariant }
> = {
  pending: {
    icon: <Loader2 className="animate-spin" size={14} />,
    variant: "secondary",
  },
  success: {
    icon: <CheckCircle2 size={14} />,
    variant: "success",
  },
  failed: {
    icon: <XCircle size={14} />,
    variant: "error",
  },
  cooldown: {
    icon: <Hourglass size={14} />,
    variant: "warning",
  },
};

function formatCooldownTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export function Badge({
  children,
  variant = "secondary",
  size = "md",
  icon,
  onDismiss,
  className,
  isStatus,
  transactionStatus,
  cooldownRemaining,
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-md font-medium min-h-[theme(spacing.6)]";
  const sizeStyle = sizeClasses[size];

  // If transaction status is provided, use its predefined configuration
  if (transactionStatus) {
    const config = transactionStatusConfig[transactionStatus];
    variant = config.variant;
    icon = config.icon;
  }

  const variantStyle = variantClasses[variant];

  return (
    <div
      className={cn(
        baseClasses,
        sizeStyle.container,
        "py-0.5", // Consistent vertical padding
        variantStyle.bg,
        variantStyle.text,
        variantStyle.border,
        className
      )}
      role={isStatus ? "status" : undefined}
    >
      {icon && (
        <span
          className={cn("flex-shrink-0 flex items-center", sizeStyle.icon)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="py-px">{children}</span>
      {cooldownRemaining !== undefined && (
        <span className="py-px">{formatCooldownTime(cooldownRemaining)}</span>
      )}
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
