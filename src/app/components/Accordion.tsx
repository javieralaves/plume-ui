import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionContextValue {
  activeItems: string[];
  toggleItem: (id: string) => void;
  variant: AccordionVariant;
  allowMultiple: boolean;
  registerItem: (id: string) => void;
  items: string[];
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
  variant?: AccordionVariant;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  title: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  itemId: string;
  isExpanded: boolean;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  itemId: string;
}

type AccordionVariant = "default" | "borderless";

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

export function Accordion({
  children,
  className,
  variant = "default",
  allowMultiple = false,
  defaultExpanded = [],
}: AccordionProps) {
  const [activeItems, setActiveItems] = useState<string[]>(defaultExpanded);
  const [items, setItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (allowMultiple) {
        return [...prev, id];
      }
      return [id];
    });
  };

  const registerItem = (id: string) => {
    setItems((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  return (
    <AccordionContext.Provider
      value={{
        activeItems,
        toggleItem,
        variant,
        allowMultiple,
        registerItem,
        items,
      }}
    >
      <div
        className={cn(
          "bg-white rounded-md",
          variant === "default" && "border border-border-light",
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, className, title }: AccordionItemProps) {
  const id = useId();
  const { activeItems, variant, registerItem } = useAccordion();
  const isExpanded = activeItems.includes(id);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerItem(id);
  }, [id, registerItem]);

  return (
    <div
      className={cn(
        variant === "default" && [
          "border-b border-border-light",
          "last:border-b-0",
        ],
        className
      )}
    >
      <AccordionTrigger itemId={id} isExpanded={isExpanded} ref={triggerRef}>
        {title}
      </AccordionTrigger>
      <AccordionContent itemId={id}>{children}</AccordionContent>
    </div>
  );
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, itemId, isExpanded }, ref) => {
  const { toggleItem, items } = useAccordion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = items.indexOf(itemId);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          const nextTrigger = document.querySelector(
            `[data-accordion-id="${items[currentIndex + 1]}"]`
          ) as HTMLButtonElement;
          nextTrigger?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          const prevTrigger = document.querySelector(
            `[data-accordion-id="${items[currentIndex - 1]}"]`
          ) as HTMLButtonElement;
          prevTrigger?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        const firstTrigger = document.querySelector(
          `[data-accordion-id="${items[0]}"]`
        ) as HTMLButtonElement;
        firstTrigger?.focus();
        break;
      case "End":
        e.preventDefault();
        const lastTrigger = document.querySelector(
          `[data-accordion-id="${items[items.length - 1]}"]`
        ) as HTMLButtonElement;
        lastTrigger?.focus();
        break;
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => toggleItem(itemId)}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full text-left px-4 py-3",
        "text-app-body font-medium",
        "flex items-center justify-between",
        "hover:bg-neutral-100 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      aria-expanded={isExpanded}
      data-accordion-id={itemId}
    >
      {children}
      <ChevronDown
        className={cn(
          "w-4 h-4 text-text-secondary transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
    </button>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

function AccordionContent({
  children,
  className,
  itemId,
}: AccordionContentProps) {
  const { activeItems } = useAccordion();
  const isExpanded = activeItems.includes(itemId);

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("overflow-hidden", className)}
        >
          <div className="px-4 py-3 text-app-body-sm bg-surface-secondary">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { AccordionItem };
