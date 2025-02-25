"use client";

import { ToastProvider } from "./Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider defaultPosition="bottom-right">{children}</ToastProvider>
  );
}
