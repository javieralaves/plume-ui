import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      checked = false,
      onCheckedChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out items-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          {
            "bg-primary": checked,
            "bg-neutral-200 dark:bg-neutral-700": !checked,
            "opacity-50 cursor-not-allowed": disabled,
            // Size variants for track (background)
            "h-5 w-9 px-0.5": size === "sm",
            "h-6 w-11 px-0.5": size === "md",
            "h-7 w-[52px] px-[3px]": size === "lg",
          },
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            {
              "translate-x-[16px]": checked && size === "sm",
              "translate-x-[20px]": checked && size === "md",
              "translate-x-[24px]": checked && size === "lg",
              "translate-x-0": !checked,
              // Size variants for thumb (circle)
              "h-4 w-4": size === "sm",
              "h-5 w-5": size === "md",
              "h-6 w-6": size === "lg",
            }
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
