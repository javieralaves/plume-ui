"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";

type CardVariant = "default" | "info" | "statistic" | "interactive" | "form";

/**
 * A versatile card component that provides a container for content with optional header and footer sections.
 * Supports hover effects and can be made interactive.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Optional description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content goes here
 *   </CardContent>
 *   <CardFooter>
 *     Footer content
 *   </CardFooter>
 * </Card>
 *
 * // Interactive card with hover effect
 * <Card interactive>
 *   <CardContent>
 *     Clickable card content
 *   </CardContent>
 * </Card>
 * ```
 */
interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the card should show hover effects and be interactive */
  interactive?: boolean;
  /** Card variant */
  variant?: CardVariant;
  /** Card click handler */
  onClick?: () => void;
  /** Whether the card should be compact */
  compact?: boolean;
  /** Card image */
  image?: string;
}

/**
 * Header section of the card
 */
interface CardHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Card icon */
  icon?: ReactNode;
}

/**
 * Main content section of the card
 */
interface CardBodyProps {
  /** Main content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Footer section of the card
 */
interface CardFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

interface CardStatProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}

/**
 * Title component for the card header
 */
interface CardTitleProps {
  /** Title content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Description component for the card header
 */
interface CardDescriptionProps {
  /** Description content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function Card({
  children,
  className,
  variant = "default",
  onClick,
  compact = false,
  image,
  interactive = false,
}: CardProps) {
  const isClickable = variant === "interactive" || onClick || interactive;

  return (
    <div
      className={cn(
        // Base styles
        "bg-white border border-border-light rounded-lg",
        "shadow-sm transition-all duration-200",

        // Padding based on variant and compact mode
        variant === "form" ? "p-6" : compact ? "p-3" : "p-4",

        // Variant-specific styles
        (variant === "interactive" || interactive) &&
          "cursor-pointer hover:bg-neutral-50",
        variant === "form" && "shadow-sm space-y-4 form",
        isClickable && "hover:shadow-md",

        className
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {image && (
        <div
          className={cn(
            "relative -mx-4 -mt-4 mb-4 h-48 overflow-hidden rounded-t-lg",
            variant === "form" && "-mx-6 -mt-6"
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {children}
    </div>
  );
}

export function CardHeader({ children, className, icon }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        "[&:not(:last-child)]:mb-2",
        // Increase spacing for form variant
        "[.form_&]:mb-4",
        className
      )}
    >
      {icon && <span className="text-text-secondary">{icon}</span>}
      {children}
    </div>
  );
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        "text-app-body text-text-primary",
        // Only apply flex column layout to form variant
        "[.form_&]:flex [.form_&]:flex-col [.form_&]:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4",
        "flex items-center gap-3",
        "justify-end",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardStat({ value, label, trend, className }: CardStatProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-app-h2 font-semibold text-text-primary">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-app-body-sm",
              trend.direction === "up" ? "text-success" : "text-error"
            )}
          >
            {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-app-body-sm text-text-secondary">{label}</p>
    </div>
  );
}
