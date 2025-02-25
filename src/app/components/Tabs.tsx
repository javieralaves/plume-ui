"use client";

import {
  createContext,
  useContext,
  useId,
  useRef,
  KeyboardEvent,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type TabSize = "sm" | "md" | "lg";
type TabVariant = "modern" | "traditional";

/**
 * A tabbed interface component that organizes content into multiple panels.
 * Supports keyboard navigation, disabled tabs, and custom styling.
 */
interface TabsProps {
  /** Currently selected tab value */
  value: string;
  /** Callback fired when selected tab changes */
  onChange: (value: string) => void;
  /** Tab components */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Size variant of the tabs */
  size?: TabSize;
  /** Visual style variant */
  variant?: TabVariant;
  /** Whether content should hug the tabs */
  hugContent?: boolean;
  /** Whether tabs should take full width */
  fullWidth?: boolean;
}

/**
 * Container for tab triggers
 */
interface TabsListProps {
  /** Tab trigger components */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual tab trigger button
 */
interface TabsTriggerProps {
  /** Value associated with this tab */
  value: string;
  /** Tab label */
  children: ReactNode;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Content panel associated with a tab
 */
interface TabsContentProps {
  /** Value that matches the associated tab trigger */
  value: string;
  /** Panel content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

interface TabPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

interface TabsContextValue {
  activeTab: string;
  onChange: (value: string) => void;
  size: TabSize;
  variant: TabVariant;
  baseId: string;
  hugContent: boolean;
  fullWidth: boolean;
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

export function TabList({ className, children }: TabsListProps) {
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
  const tabId = baseId + "-tab-" + value;
  const panelId = baseId + "-panel-" + value;

  return (
    <button
      role="tab"
      id={tabId}
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
  const panelId = baseId + "-panel-" + value;
  const tabId = baseId + "-tab-" + value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      className={cn("p-4 bg-surface-primary rounded-lg", className)}
    >
      {children}
    </div>
  );
}
