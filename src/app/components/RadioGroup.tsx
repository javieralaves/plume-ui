"use client";

import { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RadioSize = "sm" | "md" | "lg";
type RadioOrientation = "horizontal" | "vertical";

/**
 * A group of radio buttons that allows users to select a single option from multiple choices.
 * Supports horizontal and vertical layouts, disabled state, and custom styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RadioGroup
 *   name="fruits"
 *   value={selectedFruit}
 *   onChange={setSelectedFruit}
 * >
 *   <RadioOption value="apple">Apple</RadioOption>
 *   <RadioOption value="banana">Banana</RadioOption>
 *   <RadioOption value="orange">Orange</RadioOption>
 * </RadioGroup>
 *
 * // Horizontal layout with disabled option
 * <RadioGroup
 *   name="size"
 *   value={selectedSize}
 *   onChange={setSelectedSize}
 *   orientation="horizontal"
 * >
 *   <RadioOption value="sm">Small</RadioOption>
 *   <RadioOption value="md">Medium</RadioOption>
 *   <RadioOption value="lg" disabled>Large</RadioOption>
 * </RadioGroup>
 * ```
 */
interface RadioGroupProps {
  /** Name attribute for the radio group */
  name: string;
  /** Currently selected value */
  value: string;
  /** Callback fired when selection changes */
  onChange: (value: string) => void;
  /** Radio options */
  children: ReactNode;
  /** Layout orientation */
  orientation?: RadioOrientation;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Size variant of the radio buttons */
  size?: RadioSize;
  /** Optional label text for the group */
  label?: string;
}

/**
 * Individual radio option within a RadioGroup
 */
interface RadioItemProps {
  /** Value associated with this option */
  value: string;
  /** Label text for the option */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
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
  name,
  value,
  onChange,
  children,
  orientation = "vertical",
  disabled,
  className,
  size = "md",
  label,
}: RadioGroupProps) {
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
            "flex gap-4",
            orientation === "vertical" ? "flex-col" : "flex-row"
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
  disabled,
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
  const isDisabled = disabled || groupDisabled;
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

// For backward compatibility
export { RadioItem as RadioOption };
