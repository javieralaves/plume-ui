"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

/**
 * Available sizes for the Input component.
 */
type InputSize = "sm" | "md" | "lg";

/**
 * A form input component that supports different sizes, labels, and error states.
 * Extends the native input element with additional styling and functionality.
 */
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Optional error message displayed below the input */
  error?: string;
  /** Size variant of the input */
  size?: InputSize;
  /** Additional CSS classes */
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

/**
 * Input component that follows the Plume UI design system.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With label and error
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Please enter a valid email"
 * />
 *
 * // Different sizes
 * <Input size="sm" placeholder="Small input" />
 * <Input size="md" placeholder="Medium input" />
 * <Input size="lg" placeholder="Large input" />
 * ```
 */
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
