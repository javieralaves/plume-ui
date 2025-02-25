"use client";

import { useState } from "react";
import { AssetInput } from "../components/AssetInput";

/**
 * Demo component showcasing the AssetInput component's features
 */
export function AssetInputDemo() {
  // State for basic usage
  const [amount, setAmount] = useState<number | "">("");
  const [selectedAsset, setSelectedAsset] = useState("PLUME");

  // State for disabled example
  const [disabledAmount, setDisabledAmount] = useState<number | "">("");

  // Mock balances for different assets
  const balances = {
    PLUME: 1000,
    pUSD: 500,
    pBTC: 0.1,
  };

  return (
    <div className="space-y-8">
      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <div className="max-w-sm">
          <AssetInput
            value={amount}
            onChange={setAmount}
            selectedAsset={selectedAsset}
            onAssetChange={setSelectedAsset}
            balance={balances[selectedAsset as keyof typeof balances]}
            label="Stake Amount"
            placeholder="Enter amount to stake"
            assets={Object.keys(balances)}
          />
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          This example shows the basic usage of AssetInput with asset selection
          and balance display. Try entering values, using the MAX button, or
          switching assets.
        </p>
      </div>

      {/* With Error State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Error State</h3>
        <div className="max-w-sm">
          <AssetInput
            value={10000}
            onChange={() => {}}
            selectedAsset="PLUME"
            onAssetChange={() => {}}
            balance={1000}
            label="Amount with Error"
            placeholder="Enter amount"
            error="Custom error message"
          />
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          The input shows an error state when the value exceeds the available
          balance or when a custom error is provided.
        </p>
      </div>

      {/* Disabled State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
        <div className="max-w-sm">
          <AssetInput
            value={disabledAmount}
            onChange={setDisabledAmount}
            selectedAsset="pBTC"
            onAssetChange={() => {}}
            balance={0}
            label="Disabled Input"
            placeholder="Enter amount"
            disabled
          />
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          The input can be disabled to prevent user interaction. The MAX button
          is also disabled when the balance is 0.
        </p>
      </div>
    </div>
  );
}
