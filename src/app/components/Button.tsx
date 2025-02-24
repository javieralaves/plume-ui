"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 py-1.5 text-app-body-sm",
  md: "h-10 px-4 py-2 text-app-body",
  lg: "h-12 px-5 py-3 text-app-body",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover active:bg-primary-hover text-white",
  secondary: `bg-white hover:bg-neutral-100 active:bg-neutral-200 
    text-neutral-900 border border-border-medium shadow-sm
    dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800`,
  disabled: "bg-neutral-300 text-text-secondary cursor-not-allowed",
};

export function Button({
  children,
  size = "md",
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  // If disabled is true, force the variant to be 'disabled'
  const effectiveVariant = disabled ? "disabled" : variant;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all",
        sizeClasses[size],
        variantClasses[effectiveVariant],
        className
      )}
      disabled={disabled || variant === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
}
