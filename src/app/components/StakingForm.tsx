"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { AssetInput } from "./AssetInput";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Dialog, DialogTitle, DialogBody, DialogFooter } from "./Dialog";
import { useToast } from "./Toast";
import { Loader2 } from "lucide-react";

interface Validator {
  id: number;
  name: string;
  apr: number;
  totalStaked: number;
}

interface StakingFormProps {
  userBalance: number;
  selectedValidator: Validator | null;
  onStake: (amount: number) => void;
  onTabChange?: (tab: string) => void;
}

export function StakingForm({
  userBalance,
  selectedValidator,
  onStake,
  onTabChange,
}: StakingFormProps) {
  const [stakeAmount, setStakeAmount] = useState<number | "">("");
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Validate input whenever amount or balance changes
  useEffect(() => {
    // Only validate if there's a value
    if (stakeAmount !== "") {
      validateInput(stakeAmount);
    } else {
      setValidationError(undefined);
    }
  }, [stakeAmount, userBalance]);

  const validateInput = (value: number | "") => {
    if (value === "") {
      setValidationError(undefined);
      return false;
    }
    if (value <= 0) {
      setValidationError("Amount must be greater than 0");
      return false;
    }
    if (value > userBalance) {
      setValidationError("Amount exceeds available balance");
      return false;
    }
    setValidationError(undefined);
    return true;
  };

  const handleStakeClick = () => {
    if (typeof stakeAmount === "number" && validateInput(stakeAmount)) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmStake = async () => {
    if (typeof stakeAmount !== "number" || !selectedValidator) return;

    setIsSubmitting(true);
    try {
      // Simulate transaction delay (replace with actual transaction)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onStake(stakeAmount);

      addToast({
        title: "Stake Successful!",
        message: `Successfully staked ${stakeAmount} PLUME with ${selectedValidator.name}`,
        duration: 5000,
      });

      setIsConfirmationOpen(false);
      if (onTabChange) {
        onTabChange("earnings");
      }
    } catch (error) {
      addToast({
        title: "Transaction Failed",
        message: "Failed to stake PLUME. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAnnualYield = (amount: number) => {
    if (!selectedValidator) return 0;
    return (amount * selectedValidator.apr) / 100;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="app-h3">Stake PLUME</h2>
          <p className="text-text-secondary">Enter amount to stake</p>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div className="relative">
              <AssetInput
                value={stakeAmount}
                onChange={setStakeAmount}
                selectedAsset="PLUME"
                onAssetChange={() => {}} // Only PLUME is supported
                balance={userBalance}
                label="Stake Amount"
                placeholder="Enter amount to stake"
                assets={["PLUME"]}
                error={validationError}
              />
            </div>

            <div className="p-4 bg-surface-secondary rounded-lg">
              {selectedValidator ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-text-secondary">Staking with:</p>
                    <Badge variant="success">
                      {selectedValidator.apr}% APR
                    </Badge>
                  </div>
                  <p className="app-h4 mb-4">{selectedValidator.name}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Stake Amount:</span>
                      <span className="font-medium">
                        {stakeAmount === ""
                          ? "Enter amount"
                          : `${stakeAmount.toLocaleString()} PLUME`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Annual Yield:</span>
                      <span className="font-medium text-success">
                        {stakeAmount === ""
                          ? "-"
                          : `${calculateAnnualYield(
                              stakeAmount
                            ).toLocaleString()} PLUME`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">
                        Monthly Yield:
                      </span>
                      <span className="font-medium text-success">
                        {stakeAmount === ""
                          ? "-"
                          : `${(calculateAnnualYield(stakeAmount) / 12).toFixed(
                              2
                            )} PLUME`}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-text-secondary">
                  Please select a validator from the list above
                </p>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedValidator || !stakeAmount || !!validationError}
            onClick={handleStakeClick}
          >
            Stake PLUME
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        isOpen={isConfirmationOpen}
        onClose={() => !isSubmitting && setIsConfirmationOpen(false)}
        variant="form"
      >
        <DialogTitle>
          <h3 className="app-h3">Confirm Staking</h3>
          <p className="text-text-secondary">
            Please review your staking details
          </p>
        </DialogTitle>
        <DialogBody>
          <div className="space-y-4">
            <div className="p-4 bg-surface-secondary rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="app-body text-text-secondary">
                    Validator:
                  </span>
                  <span className="app-body font-medium">
                    {selectedValidator?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="app-body text-text-secondary">Amount:</span>
                  <span className="app-body font-medium">
                    {stakeAmount === ""
                      ? "-"
                      : `${stakeAmount.toLocaleString()} PLUME`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="app-body text-text-secondary">APR:</span>
                  <span className="app-body font-medium text-success">
                    {selectedValidator?.apr}%
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="app-body-sm text-text-secondary">
                  Annual Yield:
                </span>
                <span className="app-body-sm font-medium text-success">
                  {stakeAmount === ""
                    ? "-"
                    : `${calculateAnnualYield(
                        stakeAmount
                      ).toLocaleString()} PLUME`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="app-body-sm text-text-secondary">
                  Monthly Yield:
                </span>
                <span className="app-body-sm font-medium text-success">
                  {stakeAmount === ""
                    ? "-"
                    : `${(calculateAnnualYield(stakeAmount) / 12).toFixed(
                        2
                      )} PLUME`}
                </span>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsConfirmationOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmStake} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm & Stake"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
