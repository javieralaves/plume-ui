"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SwitchSize = "sm" | "md" | "lg";

interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: SwitchSize;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const sizeClasses: Record<
  SwitchSize,
  { track: string; thumb: string; thumbPosition: { off: string; on: string } }
> = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    thumbPosition: {
      off: "translate-x-0.5",
      on: "translate-x-[18px]",
    },
  },
  md: {
    track: "w-10 h-6",
    thumb: "w-4 h-4",
    thumbPosition: {
      off: "translate-x-1",
      on: "translate-x-5",
    },
  },
  lg: {
    track: "w-12 h-7",
    thumb: "w-5 h-5",
    thumbPosition: {
      off: "translate-x-1",
      on: "translate-x-6",
    },
  },
};

export function Switch({
  checked,
  onChange,
  size = "md",
  label,
  disabled,
  className,
  ...props
}: SwitchProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!disabled) {
        onChange(!checked);
      }
    }
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2",
          checked ? "bg-primary" : "bg-border-medium",
          disabled && "bg-border-light cursor-not-allowed",
          sizeClasses[size].track
        )}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span
          className={cn(
            "inline-block rounded-full bg-white transition-transform duration-200 ease-in-out",
            checked
              ? sizeClasses[size].thumbPosition.on
              : sizeClasses[size].thumbPosition.off,
            sizeClasses[size].thumb
          )}
        />
      </button>
      {label && (
        <span
          className={cn("text-app-body select-none", disabled && "opacity-50")}
        >
          {label}
        </span>
      )}
    </label>
  );
}
