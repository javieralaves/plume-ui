"use client";

import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanel } from "../components/Tabs";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardStat,
} from "../components/Card";
import { DataTable, Column } from "../components/DataTable";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { ValidatorList } from "../components/ValidatorList";
import { StakingForm } from "../components/StakingForm";
import { UnstakeDialog } from "../components/UnstakeDialog";
import { WithdrawDialog } from "../../app/components/WithdrawDialog";
import {
  ArrowLeft,
  TrendingUp,
  Hourglass,
  CheckCircle2,
  Loader2,
  FastForward,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/Toast";

// Mock data for validators
const validators = [
  { id: 1, name: "Validator Alpha", apr: 12.5, totalStaked: 1250000 },
  { id: 2, name: "Validator Beta", apr: 10.8, totalStaked: 980000 },
  { id: 3, name: "Validator Gamma", apr: 11.2, totalStaked: 1100000 },
];

interface RewardHistory {
  id: number;
  date: string;
  validator: string;
  amount: number;
  status: "Pending Unstake" | "Withdrawable" | "Claimed";
  apr: number;
  type: string;
  cooldownRemaining?: number; // in seconds
  isWithdrawing?: boolean;
}

// Enhanced mock data for rewards history with pending unstakes
const initialRewardsHistory: RewardHistory[] = [
  {
    id: 0,
    date: new Date().toISOString(),
    validator: "Validator Alpha",
    amount: 1000,
    status: "Pending Unstake" as const,
    apr: 12.5,
    type: "Unstake",
    cooldownRemaining: 23 * 60 * 60, // 23 hours remaining
  },
  {
    id: 1,
    date: "2024-02-25",
    validator: "Validator Alpha",
    amount: 125,
    status: "Claimed" as const,
    apr: 12.5,
    type: "Daily Reward",
  },
  {
    id: 2,
    date: "2024-02-24",
    validator: "Validator Beta",
    amount: 98,
    status: "Claimed" as const,
    apr: 10.8,
    type: "Daily Reward",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function StakingDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("stake");
  const [selectedValidator, setSelectedValidator] = useState<number | null>(
    null
  );
  const [totalEarned, setTotalEarned] = useState(585);
  const [averageApr, setAverageApr] = useState(11.5);
  const [monthlyGrowth, setMonthlyGrowth] = useState(12.5);
  const [isUnstakeDialogOpen, setIsUnstakeDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<RewardHistory | null>(null);
  const [stakedBalance, setStakedBalance] = useState(1000); // Mock staked balance
  const [rewardsHistory, setRewardsHistory] = useState<RewardHistory[]>(
    initialRewardsHistory
  );
  const { addToast } = useToast();

  // Mock user balance
  const userBalance = 5000;

  // Handle withdrawal click
  const onWithdrawClick = (reward: RewardHistory) => {
    if (reward.status === "Withdrawable") {
      setSelectedWithdrawal(reward);
      setIsWithdrawDialogOpen(true);
    }
  };

  // Enhanced columns for rewards history table
  const rewardsColumns: Column<RewardHistory>[] = [
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (value: unknown) => (
        <span className="app-body-sm">
          {new Date(value as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "validator",
      header: "Validator",
      sortable: true,
      render: (value: unknown) => (
        <span className="app-body">{value as string}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (value: unknown) => (
        <span className="app-body-sm text-text-secondary">
          {value as string}
        </span>
      ),
    },
    {
      key: "apr",
      header: "APR",
      sortable: true,
      render: (value: unknown) => (
        <span className="app-body-sm text-success">{value as number}%</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (value: unknown) => (
        <span className="app-body font-medium">{value as number} PLUME</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value: unknown, row: RewardHistory) => {
        if (value === "Pending Unstake" && row.cooldownRemaining) {
          const hours = Math.floor(row.cooldownRemaining / 3600);
          const minutes = Math.floor((row.cooldownRemaining % 3600) / 60);
          return (
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="flex items-center gap-1">
                <Hourglass className="w-3 h-3" />
                {`${hours}h ${minutes}m`}
              </Badge>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  // Skip cooldown by setting it to 0
                  setRewardsHistory((current) =>
                    current.map((r) =>
                      r.id === row.id ? { ...r, cooldownRemaining: 0 } : r
                    )
                  );
                }}
              >
                <FastForward className="w-3 h-3" />
                Skip
              </Button>
            </div>
          );
        }
        if (value === "Withdrawable") {
          return (
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-1"
              disabled={row.isWithdrawing}
              onClick={(e) => {
                e.stopPropagation();
                onWithdrawClick(row);
              }}
            >
              {row.isWithdrawing ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Withdrawing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Withdraw
                </>
              )}
            </Button>
          );
        }
        return <Badge variant="success">{value as string}</Badge>;
      },
    },
  ];

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStake = (amount: number) => {
    // TODO: Implement staking logic
    console.log(`Staking ${amount} PLUME with validator ${selectedValidator}`);
  };

  const selectedValidatorData = selectedValidator
    ? validators.find((v) => v.id === selectedValidator) ?? null
    : null;

  // Calculate earnings stats
  useEffect(() => {
    // In a real app, this would fetch from an API
    const calculateStats = () => {
      const total = rewardsHistory.reduce(
        (sum, reward) => sum + reward.amount,
        0
      );
      const avgApr =
        validators.reduce((sum, val) => sum + val.apr, 0) / validators.length;

      setTotalEarned(total);
      setAverageApr(avgApr);
    };

    calculateStats();
  }, []);

  const handleUnstake = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // In a real app, this would call the blockchain
    setStakedBalance(0);
  };

  // Handle withdrawal confirmation
  const handleWithdraw = async (
    reward: Pick<RewardHistory, "id" | "amount" | "validator">
  ) => {
    // Update the reward status to show loading
    setRewardsHistory((current) =>
      current.map((r) =>
        r.id === reward.id ? { ...r, isWithdrawing: true } : r
      )
    );

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Remove the withdrawn reward from history
      setRewardsHistory((current) => current.filter((r) => r.id !== reward.id));

      addToast({
        title: "Withdrawal Successful!",
        message: `${reward.amount} PLUME has been withdrawn to your wallet.`,
        duration: 5000,
      });
    } catch (error) {
      setRewardsHistory((current) =>
        current.map((r) =>
          r.id === reward.id ? { ...r, isWithdrawing: false } : r
        )
      );

      addToast({
        title: "Withdrawal Failed",
        message: "Please try again later.",
        duration: 5000,
      });
    }
  };

  // Update cooldown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setRewardsHistory((current: RewardHistory[]) =>
        current.map((reward: RewardHistory) => {
          if (reward.cooldownRemaining && reward.cooldownRemaining > 0) {
            return {
              ...reward,
              cooldownRemaining: reward.cooldownRemaining - 1,
            };
          }
          if (reward.cooldownRemaining === 0) {
            return {
              ...reward,
              status: "Withdrawable",
              cooldownRemaining: undefined,
            };
          }
          return reward;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen p-8 sm:p-20 bg-surface-primary">
        <main className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="app-h1">Staking Dashboard</h1>
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-surface-secondary rounded-lg mb-8"></div>
            <div className="h-96 bg-surface-secondary rounded-lg"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-surface-primary">
      <main className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="app-h1">Staking Dashboard</h1>
        </div>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="modern"
          size="lg"
          className="w-full"
        >
          <TabList className="mb-8">
            <Tab value="stake">Stake</Tab>
            <Tab value="earnings">Earnings</Tab>
          </TabList>

          <TabPanel value="stake" className="space-y-8">
            {/* User Balance Section */}
            <Card>
              <CardHeader>
                <h2 className="app-h3">Your Balance</h2>
                <p className="text-text-secondary">
                  Available PLUME for staking
                </p>
              </CardHeader>
              <CardBody>
                <CardStat
                  value={`${userBalance} PLUME`}
                  label="Available Balance"
                />
              </CardBody>
            </Card>

            {/* Validator List Section */}
            <Card>
              <CardHeader>
                <h2 className="app-h3">Validators</h2>
                <p className="text-text-secondary">
                  Select a validator to stake with
                </p>
              </CardHeader>
              <CardBody>
                <ValidatorList
                  validators={validators}
                  selectedValidator={selectedValidator}
                  onValidatorSelect={setSelectedValidator}
                />
              </CardBody>
            </Card>

            {/* Staking Form Section */}
            <StakingForm
              userBalance={userBalance}
              selectedValidator={selectedValidatorData}
              onStake={handleStake}
              onTabChange={setActiveTab}
            />
          </TabPanel>

          <TabPanel value="earnings" className="space-y-8">
            {/* Earnings Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Total Earned Card */}
              <Card>
                <CardHeader>
                  <h2 className="app-h3">Total Earnings</h2>
                  <p className="text-text-secondary">
                    Your staking rewards to date
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <CardStat
                      value={`${totalEarned.toLocaleString()} PLUME`}
                      label="Total Earned"
                      trend={{
                        direction: "up",
                        value: monthlyGrowth,
                      }}
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-border-light">
                      <div>
                        <p className="app-body-sm text-text-secondary">
                          Currently Staked
                        </p>
                        <p className="app-body font-medium">
                          {stakedBalance.toLocaleString()} PLUME
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => setIsUnstakeDialogOpen(true)}
                        disabled={stakedBalance <= 0}
                      >
                        Unstake
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Average APR Card */}
              <Card>
                <CardHeader>
                  <h2 className="app-h3">Average APR</h2>
                  <p className="text-text-secondary">
                    Current average return rate
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <CardStat
                      value={`${averageApr.toFixed(1)}%`}
                      label="Current APR"
                    />
                    <Badge variant="success" className="h-fit">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Rewards History Table */}
            <Card>
              <CardHeader>
                <h2 className="app-h3">Rewards History</h2>
                <p className="text-text-secondary">
                  Detailed history of your staking rewards
                </p>
              </CardHeader>
              <CardBody>
                <DataTable
                  columns={rewardsColumns}
                  data={rewardsHistory}
                  keyField="id"
                  pageSize={5}
                  defaultSort={{ key: "date", direction: "desc" }}
                  expandable
                />
              </CardBody>
            </Card>
          </TabPanel>
        </Tabs>
      </main>

      <UnstakeDialog
        isOpen={isUnstakeDialogOpen}
        onClose={() => setIsUnstakeDialogOpen(false)}
        stakedAmount={stakedBalance}
        onUnstake={handleUnstake}
        onSuccess={() => setActiveTab("earnings")}
      />

      {selectedWithdrawal && (
        <WithdrawDialog
          isOpen={isWithdrawDialogOpen}
          onClose={() => {
            setIsWithdrawDialogOpen(false);
            setSelectedWithdrawal(null);
          }}
          reward={selectedWithdrawal}
          onWithdraw={handleWithdraw}
        />
      )}
    </div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
