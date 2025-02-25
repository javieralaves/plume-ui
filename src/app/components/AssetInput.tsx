"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "./DropdownMenu";

/**
 * Props for the AssetInput component
 */
interface AssetInputProps {
  /** Current input value */
  value: number | "";
  /** Callback when input value changes */
  onChange: (value: number | "") => void;
  /** Currently selected asset */
  selectedAsset: string;
  /** Callback when selected asset changes */
  onAssetChange: (asset: string) => void;
  /** Available balance for the selected asset */
  balance: number;
  /** Optional label above the input field */
  label?: string;
  /** Placeholder text inside the input field */
  placeholder?: string;
  /** Error message if applicable */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** List of available assets */
  assets?: string[];
}

/**
 * A specialized input component for staking and transactions that combines
 * numeric input with asset selection and balance display.
 *
 * @example
 * ```tsx
 * <AssetInput
 *   value={amount}
 *   onChange={setAmount}
 *   selectedAsset="PLUME"
 *   onAssetChange={setSelectedAsset}
 *   balance={1000}
 *   label="Stake Amount"
 *   placeholder="Enter amount"
 *   assets={["PLUME", "pUSD"]}
 * />
 * ```
 */
export function AssetInput({
  value,
  onChange,
  selectedAsset,
  onAssetChange,
  balance,
  label,
  placeholder = "Enter amount",
  error,
  disabled,
  assets = ["PLUME", "pUSD"],
}: AssetInputProps) {
  // Handle numeric input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Handle empty input
    if (inputValue === "") {
      onChange("");
      return;
    }

    // Convert to number and validate
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return;

    // Prevent negative values
    if (numValue < 0) {
      onChange(0);
      return;
    }

    // Cap at available balance
    if (numValue > balance) {
      onChange(balance);
      return;
    }

    onChange(numValue);
  };

  // Handle MAX button click
  const handleMaxClick = () => {
    onChange(balance);
  };

  // Check if input exceeds balance
  const hasInsufficientBalance = typeof value === "number" && value > balance;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-app-body-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}

      {/* Input and Asset Selector */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="number"
            value={value === "" ? "" : value.toString()}
            onChange={handleInputChange}
            placeholder={placeholder}
            error={hasInsufficientBalance ? "Insufficient balance" : error}
            disabled={disabled}
          />
        </div>
        <DropdownMenu>
          <DropdownTrigger>
            <Button
              variant="select"
              size="md"
              iconRight={ChevronDown}
              disabled={disabled}
              className="min-w-[110px]"
            >
              {selectedAsset}
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            {assets.map((asset) => (
              <DropdownItem
                key={asset}
                onClick={() => onAssetChange(asset)}
                isActive={asset === selectedAsset}
              >
                {asset}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownMenu>
      </div>

      {/* Balance Display and MAX Button */}
      <div className="mt-1 flex items-center justify-between text-app-caption">
        <span className="text-text-secondary">
          Available: {balance.toLocaleString()} {selectedAsset}
        </span>
        <button
          onClick={handleMaxClick}
          className={cn(
            "text-primary hover:text-primary-hover font-medium",
            (disabled || balance <= 0) && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled || balance <= 0}
        >
          MAX
        </button>
      </div>
    </div>
  );
}
