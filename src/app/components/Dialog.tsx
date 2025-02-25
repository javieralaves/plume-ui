import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

export function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className={cn(
            "fixed inset-0 z-50",
            "bg-black/50 backdrop-blur-sm",
            "flex items-center justify-center",
            className
          )}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            ref={dialogRef}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              // Position and size
              "relative w-[90%] sm:w-[500px]",
              // Styling
              "bg-white border border-border-light rounded-lg shadow-lg",
              "p-6"
            )}
          >
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4",
                "text-text-secondary hover:text-text-primary",
                "transition-colors duration-200"
              )}
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h3 className={cn("text-app-h4 font-medium mb-2", className)}>
      {children}
    </h3>
  );
}

export function DialogBody({ children, className }: DialogBodyProps) {
  return (
    <div
      className={cn(
        "text-app-body text-text-primary",
        "max-h-[calc(80vh-8rem)] overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-6", className)}>
      {children}
    </div>
  );
}
