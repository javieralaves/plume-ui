"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type CardVariant = "default" | "info" | "statistic" | "interactive" | "form";
type CardStatLayout = "stacked" | "inline";

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
  /** Whether the card should be expandable */
  expandable?: boolean;
  /** Whether the card should be default expanded */
  defaultExpanded?: boolean;
  /** Right icon */
  rightIcon?: "arrow" | "chevron";
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
  /** Card actions */
  actions?: ReactNode;
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
  /** Footer actions */
  actions?: ReactNode;
}

interface CardStatProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
  layout?: CardStatLayout;
}

// Local storage key for expanded state
const EXPANDED_STATE_KEY = "card-expanded-states";

export function Card({
  children,
  className,
  variant = "default",
  onClick,
  compact = false,
  image,
  interactive = false,
  expandable = false,
  defaultExpanded = false,
  rightIcon,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isClickable = variant === "interactive" || onClick || interactive;

  // Load expanded state from localStorage on mount
  useEffect(() => {
    if (expandable) {
      const savedStates = JSON.parse(
        localStorage.getItem(EXPANDED_STATE_KEY) || "{}"
      );
      setIsExpanded(savedStates[className || "default"] ?? defaultExpanded);
    }
  }, [expandable, className, defaultExpanded]);

  // Save expanded state to localStorage
  useEffect(() => {
    if (expandable) {
      const savedStates = JSON.parse(
        localStorage.getItem(EXPANDED_STATE_KEY) || "{}"
      );
      savedStates[className || "default"] = isExpanded;
      localStorage.setItem(EXPANDED_STATE_KEY, JSON.stringify(savedStates));
    }
  }, [isExpanded, expandable, className]);

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
    onClick?.();
  };

  const rightIconElement =
    rightIcon === "arrow" ? (
      <ArrowRight className="w-4 h-4" />
    ) : rightIcon === "chevron" ? (
      <ChevronDown className="w-4 h-4" />
    ) : null;

  const renderContent = () => {
    if (!expandable) {
      return (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">{children}</div>
          {rightIconElement && (
            <span className="text-text-secondary flex-shrink-0">
              {rightIconElement}
            </span>
          )}
        </div>
      );
    }

    // Split children into header and expandable content
    const childrenArray = React.Children.toArray(children);
    const header = childrenArray[0]; // Assume first child is header
    const expandableContent = childrenArray.slice(1); // Rest is expandable

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex-1">{header}</div>
          <span className="text-text-secondary flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4">{expandableContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

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
          "cursor-pointer hover:bg-neutral-50 hover:border-primary",
        variant === "form" && "shadow-sm space-y-4 form",
        isClickable && "hover:shadow-md",

        // Expandable styles
        expandable && "cursor-pointer",

        className
      )}
      onClick={handleClick}
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
      {renderContent()}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  icon,
  actions,
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        "[&:not(:last-child)]:mb-2",
        // Increase spacing for form variant
        "[.form_&]:mb-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-text-secondary">{icon}</span>}
        <div className="flex flex-col gap-1">{children}</div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
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

export function CardFooter({ children, className, actions }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4",
        "flex items-center justify-between gap-3",
        className
      )}
    >
      <div>{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function CardStat({
  value,
  label,
  trend,
  className,
  layout = "stacked",
}: CardStatProps) {
  return (
    <div
      className={cn(
        layout === "inline" ? "flex items-center gap-4" : "space-y-1",
        className
      )}
    >
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
      <p
        className={cn(
          "text-app-body-sm text-text-secondary",
          layout === "inline" && "flex-1"
        )}
      >
        {label}
      </p>
    </div>
  );
}
