"use client";

import { useState } from "react";
import { WalletConnection } from "../components/WalletConnection";

const DEMO_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

export function WalletConnectionDemo() {
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);

  const demoBalances = [
    { token: "PLUME", amount: "1,234.56" },
    { token: "pUSD", amount: "789.12" },
    { token: "USDC", amount: "456.78" },
  ];

  return (
    <section>
      <h2 className="app-h2 mb-8">Wallet Connection</h2>

      <div className="grid gap-12">
        {/* Basic Usage */}
        <div>
          <h3 className="app-h3 mb-4 text-text-secondary">Basic Usage</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <WalletConnection
                isConnected={isConnected}
                address={DEMO_ADDRESS}
                onConnect={() => setIsConnected(true)}
                onDisconnect={() => setIsConnected(false)}
                balances={demoBalances}
              />
            </div>
            <p className="app-body text-text-secondary">
              A wallet connection component that handles connecting,
              disconnecting, and displaying wallet information.
            </p>
          </div>
        </div>

        {/* Network Status */}
        <div>
          <h3 className="app-h3 mb-4 text-text-secondary">Network Status</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <WalletConnection
                isConnected={true}
                address={DEMO_ADDRESS}
                isCorrectNetwork={isCorrectNetwork}
                onNetworkChange={() => setIsCorrectNetwork(true)}
                balances={demoBalances}
              />
              <button
                onClick={() => setIsCorrectNetwork(!isCorrectNetwork)}
                className="app-body-sm text-text-secondary hover:text-text-primary"
              >
                Toggle Network Status
              </button>
            </div>
            <p className="app-body text-text-secondary">
              The component shows a warning when connected to an unsupported
              network.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h3 className="app-h3 mb-4 text-text-secondary">Code Example</h3>
          <pre className="p-4 rounded-lg bg-surface-secondary overflow-x-auto">
            <code className="text-sm">{`<WalletConnection
  isConnected={isConnected}
  address="0x742d...f44e"
  network="Plume Chain"
  isCorrectNetwork={true}
  onConnect={() => {}}
  onDisconnect={() => {}}
  onNetworkChange={() => {}}
  balances={[
    { token: "PLUME", amount: "1,234.56" },
    { token: "pUSD", amount: "789.12" },
  ]}
/>`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
