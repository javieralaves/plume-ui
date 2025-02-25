"use client";

import { Button } from "../components/Button";
import { useToast } from "../components/Toast";

export function ToastDemo() {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: "success",
      title: "Success",
      message: "Operation completed successfully",
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      title: "Error",
      message: "Something went wrong",
      duration: 3000,
    });
  };

  const showWarningToast = () => {
    addToast({
      type: "warning",
      title: "Warning",
      message: "Please review your input",
      duration: 3000,
    });
  };

  const showInfoToast = () => {
    addToast({
      type: "info",
      title: "Information",
      message: "Your task is in progress",
      duration: 3000,
    });
  };

  const showToastWithAction = () => {
    addToast({
      type: "info",
      title: "New Message",
      message: "You have a new message from Jane",
      duration: 5000,
      action: {
        label: "View",
        onClick: () => console.log("View message clicked"),
      },
    });
  };

  const showPersistentToast = () => {
    addToast({
      type: "warning",
      title: "Update Available",
      message: "A new version is available. Please update your app.",
      duration: Infinity,
      action: {
        label: "Update Now",
        onClick: () => console.log("Update clicked"),
      },
    });
  };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays brief, temporary notifications.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={showSuccessToast}>Show Success Toast</Button>
          <Button onClick={showErrorToast}>Show Error Toast</Button>
          <Button onClick={showWarningToast}>Show Warning Toast</Button>
          <Button onClick={showInfoToast}>Show Info Toast</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={showToastWithAction}>Show Toast with Action</Button>
          <Button onClick={showPersistentToast}>Show Persistent Toast</Button>
        </div>
      </div>
    </section>
  );
}
