"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type AlertType = "base" | "success" | "warning" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const alertStyles: Record<
  AlertType,
  {
    container: string;
    border: string;
    icon: ReactNode;
  }
> = {
  base: {
    container: "bg-white dark:bg-neutral-900",
    border: "border-border-light",
    icon: <Info className="w-5 h-5 text-text-secondary" />,
  },
  success: {
    container: "bg-success-light",
    border: "border-success/20",
    icon: <CheckCircle className="w-5 h-5 text-success" />,
  },
  warning: {
    container: "bg-warning-light",
    border: "border-warning/20",
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
  },
  error: {
    container: "bg-error-light",
    border: "border-error/20",
    icon: <XCircle className="w-5 h-5 text-error" />,
  },
  info: {
    container: "bg-surface-secondary",
    border: "border-border-medium",
    icon: <Info className="w-5 h-5 text-text-secondary" />,
  },
};

export function Alert({
  type = "base",
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-2.5 px-3.5 py-2.5 rounded-lg border transition-opacity leading-snug",
        alertStyles[type].container,
        alertStyles[type].border,
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{alertStyles[type].icon}</div>

      <div className="flex-grow min-w-0">
        {title && (
          <div className="font-medium text-text-primary mb-0.5">{title}</div>
        )}
        <div className="text-text-primary">{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "flex-shrink-0 -mt-0.5 -mr-0.5 p-0.5 rounded-md",
            "text-text-secondary hover:text-text-primary",
            "transition-colors focus:outline-none"
          )}
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
