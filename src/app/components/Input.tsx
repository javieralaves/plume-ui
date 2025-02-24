"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: InputSize;
  className?: string;
}

const sizeClasses: Record<InputSize, { container: string; input: string }> = {
  sm: {
    container: "h-8",
    input: "text-app-body-sm px-2 py-1",
  },
  md: {
    container: "h-10",
    input: "text-app-body px-3 py-2",
  },
  lg: {
    container: "h-12",
    input: "text-app-body px-4 py-3",
  },
};

export function Input({
  label,
  error,
  size = "md",
  className,
  disabled,
  ...props
}: InputProps) {
  const sizeStyle = sizeClasses[size];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-app-body-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative rounded-md shadow-sm transition-shadow",
          sizeStyle.container,
          disabled && "cursor-not-allowed"
        )}
      >
        <input
          type="text"
          className={cn(
            "w-full h-full rounded-md border border-border-medium bg-white text-text-primary",
            "placeholder:text-text-secondary",
            "focus:outline-none focus:ring-0 focus:border-primary",
            "disabled:bg-surface-secondary disabled:text-text-disabled disabled:cursor-not-allowed",
            error && "border-error",
            sizeStyle.input
          )}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-app-caption text-error">{error}</p>}
    </div>
  );
}
