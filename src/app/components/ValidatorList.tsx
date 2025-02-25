"use client";

import { Card, CardBody } from "./Card";
import { Badge } from "./Badge";

interface Validator {
  id: number;
  name: string;
  apr: number;
  totalStaked: number;
}

interface ValidatorListProps {
  validators: Validator[];
  selectedValidator: number | null;
  onValidatorSelect: (id: number) => void;
}

export function ValidatorList({
  validators,
  selectedValidator,
  onValidatorSelect,
}: ValidatorListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {validators.map((validator) => (
        <Card
          key={validator.id}
          variant="interactive"
          className={cn(
            "cursor-pointer transition-all duration-200",
            "hover:transform hover:-translate-y-1",
            selectedValidator === validator.id
              ? "ring-2 ring-primary bg-surface-secondary"
              : "hover:bg-surface-secondary"
          )}
          onClick={() => onValidatorSelect(validator.id)}
        >
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="app-h3 mb-1">{validator.name}</h3>
                  <p className="app-body-sm text-text-secondary">
                    Total Staked: {validator.totalStaked.toLocaleString()} PLUME
                  </p>
                </div>
                <Badge variant="success" className="text-lg">
                  {validator.apr}% APR
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex-1">
                  <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (validator.totalStaked / 2000000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="whitespace-nowrap">
                  {((validator.totalStaked / 2000000) * 100).toFixed(1)}% of cap
                </span>
              </div>

              {selectedValidator === validator.id && (
                <div className="mt-2 flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">
                    Selected for staking
                  </span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
