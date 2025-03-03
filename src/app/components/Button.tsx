"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "disabled"
  | "select";

/**
 * A versatile button component that supports multiple variants, sizes, and icon configurations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and size
 * <Button variant="primary" size="lg">Large Button</Button>
 *
 * // With icons
 * <Button iconLeft={Search}>Search</Button>
 *
 * // Icon only button
 * <Button iconOnly iconLeft={Menu} aria-label="Menu" />
 * ```
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content to be rendered inside the button */
  children?: ReactNode;
  /** The size variant of the button */
  size?: ButtonSize;
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** Additional CSS classes to apply */
  className?: string;
  /** Icon component to render on the left side */
  iconLeft?: LucideIcon;
  /** Icon component to render on the right side */
  iconRight?: LucideIcon;
  /** Whether the button should only display an icon */
  iconOnly?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-2.5 py-1 text-app-body-sm",
  md: "h-10 px-3.5 py-1.5 text-app-body",
  lg: "h-12 px-4 py-2 text-app-body",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover active:bg-primary-hover text-white",
  secondary: `bg-white hover:bg-neutral-100 active:bg-neutral-200 
    text-neutral-900 border border-border-medium shadow-sm
    dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800`,
  destructive: "bg-error hover:bg-error/90 active:bg-error/80 text-white",
  disabled: "bg-neutral-300 text-text-secondary cursor-not-allowed",
  select: `bg-white hover:bg-neutral-50 active:bg-neutral-100 
    text-text-primary border border-border-medium shadow-sm
    dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800
    flex items-center justify-between`,
};

/**
 * Button component that follows the Plume UI design system.
 * Supports multiple variants, sizes, and icon configurations.
 */
export function Button({
  children,
  size = "md",
  variant = "primary",
  className,
  disabled,
  iconLeft: IconLeft,
  iconRight: IconRight,
  iconOnly = false,
  ...props
}: ButtonProps) {
  // Validate that children is provided when iconOnly is false
  if (!iconOnly && !children) {
    throw new Error("Button requires children when not in iconOnly mode");
  }

  // If disabled is true, force the variant to be 'disabled'
  const effectiveVariant = disabled ? "disabled" : variant;

  const getIconSize = () => {
    if (iconOnly) {
      return size === "sm" ? "w-4 h-4" : "w-5 h-5";
    }
    return size === "sm" ? "w-4 h-4" : "w-5 h-5";
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all font-medium",
        iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        variantClasses[effectiveVariant],
        variant === "select" && "px-4",
        className
      )}
      disabled={disabled || variant === "disabled"}
      {...props}
    >
      {IconLeft && (
        <IconLeft
          className={cn("stroke-2", getIconSize(), !iconOnly && "mr-2")}
        />
      )}
      {!iconOnly && children}
      {IconRight && (
        <IconRight
          className={cn("stroke-2", getIconSize(), !iconOnly && "ml-2")}
        />
      )}
    </button>
  );
}
