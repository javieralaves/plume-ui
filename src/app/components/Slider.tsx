import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * A versatile slider component that supports both single and range values.
 * Features step markers, labels, and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [value, setValue] = useState(50);
 * <Slider value={value} onChange={setValue} />
 *
 * // Range slider
 * const [range, setRange] = useState([20, 80]);
 * <Slider value={range} onChange={setRange} />
 *
 * // With step markers and labels
 * <Slider
 *   min={0}
 *   max={100}
 *   step={10}
 *   showLabels
 *   value={value}
 *   onChange={setValue}
 * />
 *
 * // Disabled state
 * <Slider disabled value={30} />
 * ```
 */
interface SliderProps {
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
  /** Step increment value */
  step?: number;
  /** Current value(s) of the slider. Use array for range slider */
  value?: number | [number, number];
  /** Initial value(s) of the slider. Use array for range slider */
  defaultValue?: number | [number, number];
  /** Callback fired when the value changes */
  onChange?: (value: number | [number, number]) => void;
  /** Whether to show min/max/current value labels */
  showLabels?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Slider component that follows the Plume UI design system.
 * Supports both single value and range selection modes.
 * Implements keyboard navigation and ARIA attributes for accessibility.
 */
export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  showLabels = false,
  disabled = false,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    value ?? defaultValue ?? (Array.isArray(defaultValue) ? [min, max] : min)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<"start" | "end" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDualThumb = Array.isArray(value) || Array.isArray(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValueFromPosition = useCallback(
    (position: number) => {
      const percentage = Math.max(0, Math.min(100, position));
      const rawValue = ((max - min) * percentage) / 100 + min;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(max, Math.max(min, steppedValue));
    },
    [max, min, step]
  );

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;

    const percentage = ((event.clientX - rect.left) / rect.width) * 100;
    const newValue = getValueFromPosition(percentage);

    if (isDualThumb && Array.isArray(internalValue)) {
      // For dual thumb, update the closest thumb
      const [start, end] = internalValue;
      const distanceToStart = Math.abs(getPercentage(start) - percentage);
      const distanceToEnd = Math.abs(getPercentage(end) - percentage);

      const updatedValue: [number, number] =
        distanceToStart < distanceToEnd ? [newValue, end] : [start, newValue];

      setInternalValue(updatedValue);
      onChange?.(updatedValue);
    } else if (!isDualThumb) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleThumbMouseDown = (thumb: "start" | "end") => {
    if (disabled) return;
    setIsDragging(true);
    setActiveThumb(thumb);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      const newValue = getValueFromPosition(percentage);

      if (isDualThumb && Array.isArray(internalValue)) {
        const [start, end] = internalValue;
        const updatedValue: [number, number] =
          activeThumb === "start"
            ? [Math.min(newValue, end), end]
            : [start, Math.max(start, newValue)];

        setInternalValue(updatedValue);
        onChange?.(updatedValue);
      } else if (!isDualThumb) {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveThumb(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    activeThumb,
    onChange,
    isDualThumb,
    internalValue,
    getValueFromPosition,
  ]);

  const handleKeyDown = (
    event: React.KeyboardEvent,
    thumb: "start" | "end"
  ) => {
    if (disabled) return;

    let newValue: number | [number, number] = internalValue;
    const currentValue = Array.isArray(internalValue)
      ? internalValue[thumb === "start" ? 0 : 1]
      : (internalValue as number);

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        if (Array.isArray(internalValue)) {
          const [start, end] = internalValue;
          newValue =
            thumb === "start"
              ? [Math.min(end, currentValue + step), end]
              : [start, Math.min(max, currentValue + step)];
        } else {
          newValue = Math.min(max, currentValue + step);
        }
        break;

      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        if (Array.isArray(internalValue)) {
          const [start, end] = internalValue;
          newValue =
            thumb === "start"
              ? [Math.max(min, currentValue - step), end]
              : [start, Math.max(start, currentValue - step)];
        } else {
          newValue = Math.max(min, currentValue - step);
        }
        break;

      case "Home":
        event.preventDefault();
        if (Array.isArray(internalValue)) {
          const [, end] = internalValue;
          newValue = thumb === "start" ? [min, end] : [min, min];
        } else {
          newValue = min;
        }
        break;

      case "End":
        event.preventDefault();
        if (Array.isArray(internalValue)) {
          const [start] = internalValue;
          newValue = thumb === "start" ? [max, max] : [start, max];
        } else {
          newValue = max;
        }
        break;

      default:
        return;
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const renderThumb = (value: number, type: "start" | "end") => (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
        "w-5 h-5 rounded-full bg-white",
        "border border-border-medium shadow-md",
        "cursor-pointer transition-shadow",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        isDragging && activeThumb === type && "shadow-lg scale-110"
      )}
      style={{ left: `${getPercentage(value)}%` }}
      onMouseDown={() => handleThumbMouseDown(type)}
      onKeyDown={(e) => handleKeyDown(e, type)}
    />
  );

  const renderStepMarkers = () => {
    if (!step || step <= 1) return null;

    const numSteps = Math.floor((max - min) / step);
    return Array.from({ length: numSteps - 1 }, (_, i) => {
      const stepValue = min + (i + 1) * step;
      return (
        <div
          key={stepValue}
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-neutral-400 rounded-full"
          style={{ left: `${getPercentage(stepValue)}%` }}
        />
      );
    });
  };

  return (
    <div className={cn("relative pt-6 pb-2 select-none", className)}>
      {showLabels && (
        <div className="absolute top-0 left-0 right-0 flex justify-between text-sm text-text-secondary">
          <span>{min}</span>
          {isDualThumb && Array.isArray(internalValue) ? (
            <span>{`${internalValue[0]} - ${internalValue[1]}`}</span>
          ) : (
            <span>{internalValue as number}</span>
          )}
          <span>{max}</span>
        </div>
      )}

      <div
        ref={trackRef}
        className={cn(
          "relative w-full h-2 bg-neutral-300 rounded-full cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={handleTrackClick}
      >
        {renderStepMarkers()}

        {isDualThumb && Array.isArray(internalValue) ? (
          <>
            <div
              className="absolute h-full bg-neutral-900 rounded-full"
              style={{
                left: `${getPercentage(internalValue[0])}%`,
                right: `${100 - getPercentage(internalValue[1])}%`,
              }}
            />
            {renderThumb(internalValue[0], "start")}
            {renderThumb(internalValue[1], "end")}
          </>
        ) : (
          <>
            <div
              className="absolute h-full bg-neutral-900 rounded-full"
              style={{
                width: `${getPercentage(internalValue as number)}%`,
              }}
            />
            {renderThumb(internalValue as number, "start")}
          </>
        )}
      </div>
    </div>
  );
}
