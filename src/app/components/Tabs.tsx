"use client";

import { createContext, useContext, useId, useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type TabSize = "sm" | "md" | "lg";
type TabVariant = "modern" | "traditional";

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  size?: TabSize;
  variant?: TabVariant;
  className?: string;
  children: React.ReactNode;
  hugContent?: boolean;
  fullWidth?: boolean;
}

interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContextValue {
  activeTab: string;
  onChange: (value: string) => void;
  size: TabSize;
  variant: TabVariant;
  baseId: string;
  hugContent?: boolean;
  fullWidth?: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const sizeClasses: Record<TabSize, { tab: string; border: string }> = {
  sm: {
    tab: "text-app-body-sm px-2 py-1",
    border: "border-b-2",
  },
  md: {
    tab: "text-app-body px-3 py-2",
    border: "border-b-2",
  },
  lg: {
    tab: "text-app-body px-4 py-3",
    border: "border-b-3",
  },
};

const variantClasses: Record<
  TabVariant,
  {
    list: string;
    tab: string;
    activeTab: string;
    inactiveTab: string;
  }
> = {
  modern: {
    list: "bg-surface-secondary rounded-lg p-1 gap-2",
    tab: "rounded-md transition-colors",
    activeTab: "bg-white text-text-primary shadow-sm",
    inactiveTab: "text-text-secondary hover:text-text-primary",
  },
  traditional: {
    list: "border-b border-border-light gap-6",
    tab: "relative transition-colors border-b-2 border-transparent -mb-[2px]",
    activeTab: "text-text-primary border-primary",
    inactiveTab: "text-text-secondary hover:text-text-primary",
  },
};

export function Tabs({
  value,
  onChange,
  size = "md",
  variant = "modern",
  className,
  children,
  hugContent = false,
  fullWidth = false,
}: TabsProps) {
  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{
        activeTab: value,
        onChange,
        size,
        variant,
        baseId,
        hugContent,
        fullWidth,
      }}
    >
      <div className={cn("space-y-2", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabList must be used within Tabs");

  const { variant, hugContent, fullWidth } = context;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    const tabCount = tabRefs.current.length;
    let nextIndex = index;

    switch (event.key) {
      case "ArrowLeft":
        nextIndex = (index - 1 + tabCount) % tabCount;
        break;
      case "ArrowRight":
        nextIndex = (index + 1) % tabCount;
        break;
      default:
        return;
    }

    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <nav
      role="tablist"
      className={cn(
        "flex",
        hugContent && "inline-flex",
        fullWidth && "w-full",
        variantClasses[variant].list,
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(fullWidth && "flex-1")}
              ref={(el) => {
                const button = el?.querySelector("button");
                if (button) tabRefs.current[index] = button;
              }}
            >
              {child}
            </div>
          ))
        : children}
    </nav>
  );
}

export function Tab({ value, disabled, className, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, onChange, size, variant, baseId, fullWidth } = context;
  const isSelected = value === activeTab;
  const id = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      role="tab"
      id={id}
      aria-selected={isSelected}
      aria-controls={panelId}
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      className={cn(
        "focus:outline-none",
        fullWidth && "w-full",
        sizeClasses[size].tab,
        variantClasses[variant].tab,
        isSelected
          ? variantClasses[variant].activeTab
          : variantClasses[variant].inactiveTab,
        disabled && "text-text-disabled cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, className, children }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  const { activeTab, baseId } = context;
  const isActive = value === activeTab;
  const id = `${baseId}-panel-${value}`;
  const tabId = `${baseId}-tab-${value}`;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={tabId}
      className={cn("p-4 bg-surface-primary rounded-lg", className)}
    >
      {children}
    </div>
  );
}
