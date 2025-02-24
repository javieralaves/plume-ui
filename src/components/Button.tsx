import { ButtonHTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary hover:bg-primary-hover text-white disabled:bg-neutral-100 disabled:text-neutral-600",
        neutral:
          "bg-neutral-100 hover:bg-neutral-200 text-text-primary disabled:bg-neutral-100 disabled:text-neutral-500",
        ghost:
          "bg-transparent border border-border-medium hover:border-primary hover:text-primary text-text-secondary disabled:border-neutral-200 disabled:text-neutral-500",
      },
      size: {
        sm: "text-sm px-3 py-1.5 h-8",
        md: "text-base px-4 py-2 h-10",
        lg: "text-lg px-5 py-3 h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
}
