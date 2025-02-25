import { cn } from "@/lib/utils";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X as CloseIcon,
} from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ToastType = "success" | "warning" | "error" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-success" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  error: <XCircle className="w-5 h-5 text-error" />,
  info: <Info className="w-5 h-5 text-text-secondary" />,
};

const toastStyles = {
  success: "bg-success-light border-success",
  warning: "bg-warning-light border-warning",
  error: "bg-error-light border-error",
  info: "bg-surface-secondary border-border-medium",
};

const positionStyles: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

export function ToastProvider({
  children,
  defaultPosition = "bottom-right",
}: {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, position, setPosition }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts, position } = useToast();

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-2 pointer-events-none w-full sm:max-w-sm",
        positionStyles[position]
      )}
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ id, type, title, message, duration = 3000, action }: Toast) {
  const { removeToast } = useToast();

  useEffect(() => {
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, removeToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "relative w-full pointer-events-auto",
        "bg-white border shadow-lg rounded-md px-4 py-3",
        "transition-colors duration-300 ease-in-out",
        toastStyles[type]
      )}
    >
      <button
        onClick={() => removeToast(id)}
        className="absolute top-2 right-2 text-text-secondary hover:text-text-primary"
      >
        <CloseIcon className="w-4 h-4" />
      </button>

      <div className="flex gap-3">
        <div className="flex-shrink-0">{toastIcons[type]}</div>
        <div className="flex-1 pr-6">
          {title && (
            <div className="font-medium text-app-body-sm mb-1">{title}</div>
          )}
          <div className="text-app-body-sm text-text-primary">{message}</div>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-app-body-sm font-medium text-primary hover:text-primary-hover"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
