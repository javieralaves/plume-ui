"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "destructive" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  iconLeft?: LucideIcon;
  iconOnly?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-2.5 py-1 text-app-body-sm",
  md: "h-10 px-3.5 py-1.5 text-app-body",
  lg: "h-12 px-4 py-2 text-app-body",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8 p-1.5",
  md: "h-10 w-10 p-2",
  lg: "h-12 w-12 p-2.5",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover active:bg-primary-hover text-white",
  secondary: `bg-white hover:bg-neutral-100 active:bg-neutral-200 
    text-neutral-900 border border-border-medium shadow-sm
    dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800`,
  destructive: "bg-error hover:bg-error/90 active:bg-error/80 text-white",
  disabled: "bg-neutral-300 text-text-secondary cursor-not-allowed",
};

export function Button({
  children,
  size = "md",
  variant = "primary",
  className,
  disabled,
  iconLeft: IconLeft,
  iconOnly = false,
  ...props
}: ButtonProps) {
  // Validate that children is provided when iconOnly is false
  if (!iconOnly && !children) {
    throw new Error("Button requires children when not in iconOnly mode");
  }

  // If disabled is true, force the variant to be 'disabled'
  const effectiveVariant = disabled ? "disabled" : variant;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all font-medium",
        iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        variantClasses[effectiveVariant],
        className
      )}
      disabled={disabled || variant === "disabled"}
      {...props}
    >
      {IconLeft && (
        <IconLeft
          className={cn(
            "stroke-2",
            iconOnly
              ? "w-full h-full"
              : size === "sm"
              ? "w-4 h-4 mr-1.5"
              : "w-5 h-5 mr-2"
          )}
        />
      )}
      {!iconOnly && children}
    </button>
  );
}
