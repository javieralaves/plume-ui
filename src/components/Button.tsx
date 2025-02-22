import { ButtonHTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary hover:bg-primary-hover text-white focus:ring-primary-light",
        secondary:
          "bg-secondary hover:bg-secondary-hover text-white focus:ring-secondary-light",
        ghost:
          "bg-transparent border border-border-medium hover:border-primary text-primary",
        icon: "rounded-full hover:bg-surface-secondary w-10 h-10 p-0",
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
      {...props}
    >
      {children}
    </button>
  );
}
