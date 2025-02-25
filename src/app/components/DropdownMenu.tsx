import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { ButtonProps } from "./Button";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import React from "react";

/**
 * A fully accessible dropdown menu component that supports keyboard navigation,
 * positioning, and nested items.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownTrigger>
 *     <Button>Open Menu</Button>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownItem>Profile</DropdownItem>
 *     <DropdownItem>Settings</DropdownItem>
 *     <DropdownDivider />
 *     <DropdownItem>Logout</DropdownItem>
 *   </DropdownContent>
 * </DropdownMenu>
 * ```
 */

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  itemsRef: React.MutableRefObject<HTMLDivElement[]>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

/**
 * Hook to access the dropdown context within dropdown components.
 * @throws {Error} If used outside of a DropdownMenu component
 */
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
};

/**
 * Props for the DropdownMenu component
 */
interface DropdownMenuProps {
  /** Content of the dropdown menu */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the DropdownTrigger component
 */
interface DropdownTriggerProps {
  /** Button element that triggers the dropdown */
  children: React.ReactElement<ButtonProps>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the DropdownContent component
 */
interface DropdownContentProps {
  /** Content to be displayed in the dropdown */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for individual dropdown items
 */
interface DropdownItemProps {
  /** Content of the dropdown item */
  children: ReactNode;
  /** Optional icon to display before the content */
  icon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for the item */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is currently active/selected */
  isActive?: boolean;
}

/**
 * Props for the divider component
 */
interface DropdownDividerProps {
  /** Additional CSS classes */
  className?: string;
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, activeIndex, setActiveIndex, itemsRef }}
    >
      <div className={cn("relative inline-block", className)}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdown();

  return React.cloneElement(children, {
    onClick: () => setIsOpen(!isOpen),
    "aria-expanded": isOpen,
    className: cn(className, children.props.className),
    iconRight: children.props.iconOnly ? undefined : ChevronDown,
  });
}

export function DropdownContent({ children, className }: DropdownContentProps) {
  const { isOpen, setIsOpen, activeIndex, setActiveIndex, itemsRef } =
    useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldOpenUpward, setShouldOpenUpward] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const bottomSpace = windowHeight - rect.bottom;
        setShouldOpenUpward(bottomSpace < 100); // If less than 100px from bottom, open upward
      }
    };

    if (isOpen) {
      checkPosition();
      window.addEventListener("scroll", checkPosition);
      window.addEventListener("resize", checkPosition);
    }

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev: number) =>
            prev < itemsRef.current.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev: number) =>
            prev > 0 ? prev - 1 : itemsRef.current.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (activeIndex >= 0) {
            itemsRef.current[activeIndex]?.click();
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen, activeIndex, setActiveIndex, itemsRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-10 min-w-[200px]",
        shouldOpenUpward ? "bottom-full mb-1" : "top-full mt-1",
        "bg-white border border-border-light rounded-md shadow-lg",
        "py-1.5 px-1.5",
        className
      )}
      role="menu"
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  icon,
  className,
  onClick,
  disabled,
  isActive,
}: DropdownItemProps) {
  const { setIsOpen, activeIndex, setActiveIndex, itemsRef } = useDropdown();
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      const index = Array.from(
        itemRef.current.parentElement?.children || []
      ).indexOf(itemRef.current);
      if (index !== -1) {
        itemsRef.current[index] = itemRef.current;
      }
    }
  }, [itemsRef]);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        "flex items-center gap-3 rounded-md relative",
        "px-2.5 py-1.5",
        "text-text-primary cursor-pointer",
        "hover:bg-neutral-50 active:bg-neutral-100",
        disabled && "opacity-50 cursor-not-allowed hover:bg-white",
        className
      )}
      role="menuitem"
      onClick={handleClick}
      onMouseEnter={() => {
        const index = Array.from(
          itemRef.current?.parentElement?.children || []
        ).indexOf(itemRef.current!);
        setActiveIndex(index);
      }}
      data-active={
        activeIndex ===
        Array.from(itemRef.current?.parentElement?.children || []).indexOf(
          itemRef.current!
        )
      }
    >
      {icon && (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
      <span className="flex-1">{children}</span>
      {isActive && (
        <Check className="w-[18px] h-[18px] text-text-primary shrink-0" />
      )}
    </div>
  );
}

export function DropdownDivider({ className }: DropdownDividerProps) {
  return (
    <div
      className={cn("h-px bg-border-light my-2", className)}
      role="separator"
    />
  );
}

// Add displayNames for components
DropdownMenu.displayName = "DropdownMenu";
DropdownTrigger.displayName = "DropdownTrigger";
DropdownContent.displayName = "DropdownContent";
DropdownItem.displayName = "DropdownItem";
DropdownDivider.displayName = "DropdownDivider";
