"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type AlertType = "success" | "warning" | "error" | "info";

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
  success: {
    container: "bg-success-light",
    border: "border-success",
    icon: <CheckCircle className="w-5 h-5 text-success" />,
  },
  warning: {
    container: "bg-warning-light",
    border: "border-warning",
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
  },
  error: {
    container: "bg-error-light",
    border: "border-error",
    icon: <XCircle className="w-5 h-5 text-error" />,
  },
  info: {
    container: "bg-surface-secondary",
    border: "border-border-medium",
    icon: <Info className="w-5 h-5 text-text-secondary" />,
  },
};

export function Alert({
  type = "info",
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 p-4 rounded-md border-l-4 transition-opacity",
        alertStyles[type].container,
        alertStyles[type].border,
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{alertStyles[type].icon}</div>

      <div className="flex-grow">
        {title && (
          <div className="font-medium text-text-primary mb-1">{title}</div>
        )}
        <div className="text-text-primary">{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "flex-shrink-0 -mt-1 -mr-1 p-1 rounded-md",
            "text-text-secondary",
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
