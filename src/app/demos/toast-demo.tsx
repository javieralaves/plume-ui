"use client";

import { Button } from "../components/Button";
import { useToast } from "../components/Toast";
import { Badge } from "../components/Badge";

export function ToastDemo() {
  const { addToast } = useToast();

  const showBasicToast = () => {
    addToast({
      title: "Notification",
      message: "This is a simple notification message",
      duration: 3000,
    });
  };

  const showToastWithAction = () => {
    addToast({
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
      title: "Update Available",
      message: "A new version is available. Please update your app.",
      duration: Infinity,
      action: {
        label: "Update Now",
        onClick: () => console.log("Update clicked"),
      },
    });
  };

  const showTransactionPending = () => {
    addToast({
      title: "Transaction Initiated",
      message: (
        <div className="flex items-center gap-2">
          <Badge transactionStatus="pending">Processing</Badge>
          Sending 1.5 ETH to 0x1234...5678
        </div>
      ),
      duration: 3000,
    });
  };

  const showTransactionSuccess = () => {
    addToast({
      title: "Transaction Complete",
      message: (
        <div className="flex items-center gap-2">
          <Badge transactionStatus="success">Success</Badge>
          Transaction confirmed on network
        </div>
      ),
      duration: 5000,
      action: {
        label: "View Transaction",
        onClick: () => console.log("View transaction clicked"),
      },
    });
  };

  const showTransactionFailed = () => {
    addToast({
      title: "Transaction Failed",
      message: (
        <div className="flex items-center gap-2">
          <Badge transactionStatus="failed">Failed</Badge>
          Insufficient funds for gas
        </div>
      ),
      duration: 5000,
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
          <Button onClick={showBasicToast}>Show Toast</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={showToastWithAction}>Show Toast with Action</Button>
          <Button onClick={showPersistentToast}>Show Persistent Toast</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Transaction Status</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={showTransactionPending}>Pending Transaction</Button>
          <Button onClick={showTransactionSuccess}>
            Successful Transaction
          </Button>
          <Button onClick={showTransactionFailed}>Failed Transaction</Button>
        </div>
      </div>
    </section>
  );
}
