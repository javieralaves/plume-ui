"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

type TextareaSize = "sm" | "md" | "lg";

/**
 * A textarea component that extends the native textarea with additional styling and features.
 * Supports error states, disabled state, and auto-resizing.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea
 *   placeholder="Enter your message"
 *   onChange={handleChange}
 * />
 *
 * // With error state
 * <Textarea
 *   value={message}
 *   onChange={handleChange}
 *   error="Message is required"
 * />
 *
 * // Auto-resizing
 * <Textarea
 *   value={content}
 *   onChange={handleChange}
 *   autoResize
 *   minRows={3}
 *   maxRows={10}
 * />
 * ```
 */
interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  /** Error message to display */
  error?: string;
  size?: TextareaSize;
}

const sizeClasses = {
  sm: "text-app-body-sm px-2 py-1 h-20",
  md: "text-app-body px-3 py-2 h-32",
  lg: "text-app-body px-4 py-3 h-48",
} as const;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, size = "md", disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-app-body-sm font-medium text-text-primary mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            // Base styles
            "w-full bg-white border border-border-medium shadow-sm rounded-md",
            "text-text-primary placeholder:text-text-secondary",
            "focus:outline-none focus:border-primary",
            // Size variants
            sizeClasses[size],
            // Error state
            error && "border-error focus:border-error",
            // Disabled state
            disabled &&
              "bg-neutral-100 text-text-disabled cursor-not-allowed resize-none",
            // Default resize behavior
            !disabled && "resize-y",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {error && <p className="mt-1 text-error text-app-caption">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
