"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type DialogVariant = "default" | "form";

/**
 * A modal dialog component that provides a focused overlay for important content or actions.
 * Supports keyboard navigation, focus trapping, and animations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Dialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <DialogHeader>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *   </DialogHeader>
 *   <DialogContent>
 *     Are you sure you want to proceed?
 *   </DialogContent>
 *   <DialogFooter>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </DialogFooter>
 * </Dialog>
 *
 * // Custom size
 * <Dialog size="lg" isOpen={isOpen} onClose={handleClose}>
 *   <DialogContent>Large dialog content</DialogContent>
 * </Dialog>
 * ```
 */
interface DialogProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Callback fired when the dialog should close */
  onClose: () => void;
  /** Dialog content */
  children: ReactNode;
  /** Size of the dialog */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Additional CSS classes for the dialog */
  className?: string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether clicking the overlay should close the dialog */
  closeOnOverlayClick?: boolean;
  /** Variant of the dialog */
  variant?: DialogVariant;
}

/**
 * Header section of the dialog
 */
interface DialogHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main content section of the dialog
 */
interface DialogContentProps {
  /** Main content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Footer section of the dialog
 */
interface DialogFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Title component for the dialog header
 */
interface DialogTitleProps {
  /** Title content */
  children: ReactNode;
  /** Additional CSS classes */
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

export function Dialog({
  isOpen,
  onClose,
  children,
  className,
  variant = "default",
}: DialogProps) {
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
              // Padding based on variant
              variant === "form" ? "p-6" : "p-6",
              // Variant-specific styles
              variant === "form" && "space-y-4 form",
              className
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
    <div
      className={cn(
        "flex flex-col gap-1",
        "[&:not(:last-child)]:mb-2",
        // Increase spacing for form variant
        "[.form_&]:mb-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogBody({ children, className }: DialogContentProps) {
  return (
    <div
      className={cn(
        "text-app-body text-text-primary",
        "max-h-[calc(80vh-8rem)] overflow-y-auto",
        // Only apply flex column layout to form variant
        "[.form_&]:flex [.form_&]:flex-col [.form_&]:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn("flex items-center gap-3 mt-6", "justify-end", className)}
    >
      {children}
    </div>
  );
}
