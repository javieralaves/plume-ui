"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  indeterminate?: boolean;
  size?: CheckboxSize;
  label?: string;
  className?: string;
}

const sizeClasses: Record<CheckboxSize, { container: string; icon: string }> = {
  sm: {
    container: "w-4 h-4",
    icon: "w-3 h-3",
  },
  md: {
    container: "w-5 h-5",
    icon: "w-4 h-4",
  },
  lg: {
    container: "w-6 h-6",
    icon: "w-5 h-5",
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      indeterminate,
      disabled,
      checked,
      label,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (indeterminate) {
        e.target.checked = true;
      }
      onChange?.(e);
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex items-center justify-center rounded transition-colors shadow-sm",
              "border bg-white dark:bg-neutral-900",
              !checked && !indeterminate && "border-border-heavy",
              checked && "bg-primary border-primary",
              indeterminate && "bg-primary border-primary",
              disabled &&
                !checked &&
                "border-border-light bg-neutral-50 dark:bg-neutral-800",
              disabled &&
                (checked || indeterminate) &&
                "bg-border-medium border-border-medium opacity-50",
              disabled && "cursor-not-allowed",
              sizeClasses[size].container
            )}
          >
            {checked && !indeterminate && (
              <Check
                className={cn("text-white stroke-[3]", sizeClasses[size].icon)}
              />
            )}
            {indeterminate && (
              <Minus
                className={cn("text-white stroke-[3]", sizeClasses[size].icon)}
              />
            )}
          </div>
        </div>
        {label && (
          <span
            className={cn(
              "text-app-body select-none",
              disabled && "opacity-50"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
