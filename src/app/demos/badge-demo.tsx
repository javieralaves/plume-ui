"use client";

import { Badge } from "../components/Badge";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export function BadgeDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays a status indicator or small amount of information.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Icons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant="success"
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
          >
            Completed
          </Badge>
          <Badge
            variant="warning"
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
          >
            Warning
          </Badge>
          <Badge variant="error" icon={<AlertCircle className="w-3.5 h-3.5" />}>
            Error
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dismissible</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge onDismiss={() => console.log("Dismissed")}>Dismissible</Badge>
          <Badge variant="primary" onDismiss={() => console.log("Dismissed")}>
            Primary
          </Badge>
          <Badge variant="success" onDismiss={() => console.log("Dismissed")}>
            Success
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Status Indicators</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="success" isStatus>
            Online
          </Badge>
          <Badge variant="warning" isStatus>
            Away
          </Badge>
          <Badge variant="error" isStatus>
            Offline
          </Badge>
        </div>
      </div>
    </section>
  );
}
