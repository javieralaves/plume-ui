"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Available sizes for the Switch component.
 */
type SwitchSize = "sm" | "md" | "lg";

/**
 * A toggle switch component that provides an alternative to checkboxes.
 * Follows WAI-ARIA switch pattern for accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onChange={setEnabled} label="Notifications" />
 *
 * // Different sizes
 * <Switch size="sm" checked={value} onChange={setValue} label="Small switch" />
 * <Switch size="md" checked={value} onChange={setValue} label="Medium switch" />
 * <Switch size="lg" checked={value} onChange={setValue} label="Large switch" />
 *
 * // Disabled state
 * <Switch disabled checked={true} onChange={() => {}} label="Disabled switch" />
 * ```
 */
interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** The current state of the switch */
  checked: boolean;
  /** Callback fired when the state changes */
  onChange: (checked: boolean) => void;
  /** The size variant of the switch */
  size?: SwitchSize;
  /** Optional label text displayed next to the switch */
  label?: string;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
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

/**
 * Switch component that follows the Plume UI design system.
 * Implements the WAI-ARIA switch pattern for accessibility.
 * Supports keyboard navigation (Space and Enter keys).
 */
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
