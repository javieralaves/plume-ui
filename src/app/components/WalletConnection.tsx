import { cn } from "@/lib/utils";
import { Copy, AlertTriangle, Check } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownDivider,
} from "./DropdownMenu";
import { Button } from "./Button";

interface WalletConnectionProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether the wallet is connected */
  isConnected?: boolean;
  /** The wallet address if connected */
  address?: string;
  /** The current network name */
  network?: string;
  /** Whether the current network is supported */
  isCorrectNetwork?: boolean;
  /** Callback when connect button is clicked */
  onConnect?: () => void;
  /** Callback when disconnect is clicked */
  onDisconnect?: () => void;
  /** Callback when network change is requested */
  onNetworkChange?: () => void;
  /** The wallet balances to display */
  balances?: {
    token: string;
    amount: string;
  }[];
}

/**
 * Displays wallet connection status, address, and network information
 */
export function WalletConnection({
  className,
  isConnected = false,
  address = "",
  network = "Plume Chain",
  isCorrectNetwork = true,
  onConnect,
  onDisconnect,
  onNetworkChange,
  balances = [],
}: WalletConnectionProps) {
  const [showCopied, setShowCopied] = useState(false);

  const shortenAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Button
        onClick={onConnect}
        className={cn("app-body-sm", className)}
        variant="secondary"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {/* Wallet Info Dropdown */}
      <DropdownMenu>
        <DropdownTrigger>
          <Button variant="secondary" className="app-body-sm">
            <div className="flex items-center gap-2">
              {!isCorrectNetwork && (
                <AlertTriangle size={16} className="text-error" />
              )}
              {shortenAddress(address)}
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownContent className="w-[300px]">
          {/* Address Section */}
          <div className="px-3 py-2 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="app-body-sm text-text-secondary">Address</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyAddress}
                className="h-6 px-2"
              >
                {showCopied ? <Check size={14} /> : <Copy size={14} />}
              </Button>
            </div>
            <div className="app-body-sm break-all">{address}</div>
          </div>

          <DropdownDivider />

          {/* Balances Section */}
          <div className="px-3 py-2">
            <span className="app-body-sm text-text-secondary">Balances</span>
            <div className="space-y-2 mt-2">
              {balances.map((balance, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="app-body-sm">{balance.token}</span>
                  <span className="app-body-sm">{balance.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <DropdownDivider />

          {/* Network Section */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="app-body-sm text-text-secondary">Network</span>
              {!isCorrectNetwork && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onNetworkChange}
                  className="h-6 px-2"
                >
                  Switch Network
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="app-body-sm">{network}</span>
            </div>
          </div>

          <DropdownDivider />

          {/* Disconnect Option */}
          <DropdownItem
            onClick={onDisconnect}
            className="text-error hover:text-error"
          >
            Disconnect
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </div>
  );
}
