"use client";

import { Alert } from "../components/Alert";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function AlertDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Alert</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays a callout for user attention.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Types</h3>
        <div className="space-y-4">
          <Alert type="info">
            <div className="font-medium">Update Available</div>A new software
            update is available for download.
          </Alert>

          <Alert type="success">
            <div className="font-medium">Success</div>
            Your changes have been successfully saved.
          </Alert>

          <Alert type="warning">
            <div className="font-medium">Warning</div>
            Your storage is almost full. Please free up some space.
          </Alert>

          <Alert type="error">
            <div className="font-medium">Error</div>
            There was an error processing your request.
          </Alert>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Dismiss Button</h3>
        <div className="space-y-4">
          <Alert
            type="info"
            onDismiss={() => console.log("Dismissed info alert")}
          >
            <div className="font-medium">Update Available</div>A new software
            update is available for download.
          </Alert>

          <Alert
            type="success"
            onDismiss={() => console.log("Dismissed success alert")}
          >
            <div className="font-medium">Success</div>
            Your changes have been successfully saved.
          </Alert>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Title Only</h3>
        <div className="space-y-4">
          <Alert type="warning">
            <div className="font-medium">Your trial period is ending soon</div>
          </Alert>

          <Alert type="error">
            <div className="font-medium">Something went wrong</div>
          </Alert>
        </div>
      </div>
    </section>
  );
}
