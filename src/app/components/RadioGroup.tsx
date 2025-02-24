"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";

type RadioSize = "sm" | "md" | "lg";
type RadioOrientation = "horizontal" | "vertical";

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  size?: RadioSize;
  orientation?: RadioOrientation;
  disabled?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

interface RadioItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
}

interface RadioContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size: RadioSize;
  orientation: RadioOrientation;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

const sizeClasses: Record<RadioSize, { container: string; circle: string }> = {
  sm: {
    container: "w-4 h-4",
    circle: "w-1.5 h-1.5",
  },
  md: {
    container: "w-5 h-5",
    circle: "w-2 h-2",
  },
  lg: {
    container: "w-6 h-6",
    circle: "w-2.5 h-2.5",
  },
};

export function RadioGroup({
  value,
  onChange,
  size = "md",
  orientation = "vertical",
  disabled,
  label,
  className,
  children,
}: RadioGroupProps) {
  const name = useId();

  return (
    <RadioContext.Provider
      value={{ name, value, onChange, size, orientation, disabled }}
    >
      <fieldset
        className={cn("space-y-2", disabled && "cursor-not-allowed", className)}
        disabled={disabled}
      >
        {label && (
          <legend
            className={cn(
              "text-app-body font-medium mb-2",
              disabled && "opacity-50"
            )}
          >
            {label}
          </legend>
        )}
        <div
          className={cn(
            orientation === "horizontal"
              ? "flex items-center gap-6"
              : "flex flex-col gap-3"
          )}
        >
          {children}
        </div>
      </fieldset>
    </RadioContext.Provider>
  );
}

export function RadioItem({
  value,
  label,
  disabled: itemDisabled,
  className,
}: RadioItemProps) {
  const context = useContext(RadioContext);
  if (!context) throw new Error("RadioItem must be used within a RadioGroup");

  const {
    name,
    value: selectedValue,
    onChange,
    size,
    orientation,
    disabled: groupDisabled,
  } = context;
  const isDisabled = itemDisabled || groupDisabled;
  const isSelected = value === selectedValue;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        orientation === "horizontal" && "min-w-fit",
        isDisabled && "cursor-not-allowed",
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          disabled={isDisabled}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "border border-border-medium bg-surface-primary",
            isSelected && "bg-primary border-primary",
            isDisabled && !isSelected && "border-border-light opacity-50",
            isDisabled && isSelected && "bg-border-medium opacity-50",
            isDisabled && "cursor-not-allowed",
            sizeClasses[size].container
          )}
        >
          {isSelected && (
            <div
              className={cn("rounded-full bg-white", sizeClasses[size].circle)}
            />
          )}
        </div>
      </div>
      <span
        className={cn("text-app-body select-none", isDisabled && "opacity-50")}
      >
        {label}
      </span>
    </label>
  );
}
