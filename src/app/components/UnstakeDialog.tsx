"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogBody, DialogFooter } from "./Dialog";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "./Toast";

interface UnstakeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stakedAmount: number;
  onUnstake: () => Promise<void>;
  onSuccess?: () => void;
}

export function UnstakeDialog({
  isOpen,
  onClose,
  stakedAmount,
  onUnstake,
  onSuccess,
}: UnstakeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Simulated cooldown period (24 hours in seconds)
  const cooldownPeriod = 24 * 60 * 60;

  const handleUnstake = async () => {
    setIsSubmitting(true);
    try {
      await onUnstake();

      addToast({
        title: "Unstaking Successful!",
        message: "Your funds will be available in 24 hours.",
        duration: 5000,
      });

      onClose();
      onSuccess?.();
    } catch (error) {
      addToast({
        title: "Unstaking Failed",
        message: "Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      variant="form"
    >
      <DialogTitle>
        <h3 className="app-h3">Confirm Unstaking</h3>
        <p className="text-text-secondary">
          Please review your unstaking details
        </p>
      </DialogTitle>
      <DialogBody>
        <div className="space-y-4">
          <div className="p-4 bg-surface-secondary rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="app-body text-text-secondary">
                  Amount to Unstake:
                </span>
                <span className="app-body font-medium">
                  {stakedAmount.toLocaleString()} PLUME
                </span>
              </div>
              <div className="flex justify-between">
                <span className="app-body text-text-secondary">
                  Cooldown Period:
                </span>
                <Badge variant="warning">24 hours</Badge>
              </div>
              <div className="flex justify-between">
                <span className="app-body text-text-secondary">
                  Available After:
                </span>
                <span className="app-body font-medium">
                  {new Date(
                    Date.now() + cooldownPeriod * 1000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="flex items-start gap-2 p-3 bg-warning-light text-warning rounded-lg">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="app-body-sm font-medium">Important Notice</p>
              <p className="app-caption">
                Your PLUME will be locked for 24 hours after initiating
                unstaking. During this period, you cannot cancel the unstaking
                process or stake these tokens.
              </p>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleUnstake} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Confirming...
            </>
          ) : (
            "Confirm & Unstake"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
