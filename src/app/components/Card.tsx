import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";

type CardVariant = "default" | "info" | "statistic" | "interactive";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  onClick?: () => void;
  compact?: boolean;
  image?: string;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
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

export function Card({
  children,
  className,
  variant = "default",
  onClick,
  compact = false,
  image,
}: CardProps) {
  const isClickable = variant === "interactive" || onClick;

  return (
    <div
      className={cn(
        // Base styles
        "bg-white border border-border-light rounded-lg",
        "shadow-sm transition-all duration-200",

        // Padding based on compact mode
        compact ? "p-3" : "p-4",

        // Variant-specific styles
        variant === "interactive" && "cursor-pointer hover:bg-neutral-50",
        isClickable && "hover:shadow-md",

        className
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {image && (
        <div className="relative -mx-4 -mt-4 mb-4 h-48 overflow-hidden rounded-t-lg">
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
    <div className={cn("flex items-center gap-2 mb-2", className)}>
      {icon && <span className="text-text-secondary">{icon}</span>}
      <h4 className="text-app-h4 font-medium text-text-primary">{children}</h4>
    </div>
  );
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn("text-app-body text-text-primary", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4",
        "flex items-center justify-between gap-4",
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
