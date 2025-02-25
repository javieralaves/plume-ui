"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogBody, DialogFooter } from "./Dialog";
import { Button } from "./Button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "./Toast";

interface WithdrawDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    id: number;
    amount: number;
    validator: string;
  };
  onWithdraw: (reward: WithdrawDialogProps["reward"]) => Promise<void>;
}

export function WithdrawDialog({
  isOpen,
  onClose,
  reward,
  onWithdraw,
}: WithdrawDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleWithdraw = async () => {
    setIsSubmitting(true);
    try {
      await onWithdraw(reward);
      onClose();
    } catch (error) {
      addToast({
        title: "Withdrawal Failed",
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
        <h3 className="app-h3">Confirm Withdrawal</h3>
        <p className="text-text-secondary">
          Your funds are ready to be withdrawn
        </p>
      </DialogTitle>
      <DialogBody>
        <div className="space-y-4">
          <div className="p-4 bg-surface-secondary rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="app-body text-text-secondary">
                  Amount to Withdraw:
                </span>
                <span className="app-body font-medium">
                  {reward.amount.toLocaleString()} PLUME
                </span>
              </div>
              <div className="flex justify-between">
                <span className="app-body text-text-secondary">
                  From Validator:
                </span>
                <span className="app-body">{reward.validator}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-success-light text-success rounded-lg">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="app-body-sm font-medium">Ready for Withdrawal</p>
              <p className="app-caption">
                The cooldown period has ended. Your PLUME is now ready to be
                withdrawn to your wallet.
              </p>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleWithdraw} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Withdrawing...
            </>
          ) : (
            "Confirm & Withdraw"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
