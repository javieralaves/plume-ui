"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardStat,
} from "../components/Card";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Wallet, Settings } from "lucide-react";

export function CardDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <p className="text-gray-500 dark:text-gray-400">
          A versatile container component for content organization.
        </p>
      </div>

      {/* Basic Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Simple Card</h3>
              <p className="text-sm text-text-secondary">Basic card example</p>
            </CardHeader>
            <CardBody>
              <p>This is a basic card with header and body content.</p>
            </CardBody>
          </Card>

          <Card variant="interactive" onClick={() => console.log("clicked")}>
            <CardHeader>
              <h3 className="text-lg font-medium">Interactive Card</h3>
              <p className="text-sm text-text-secondary">Click me!</p>
            </CardHeader>
            <CardBody>
              <p>This card is clickable and shows a hover state.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Expandable Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Expandable Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card expandable defaultExpanded>
            <CardHeader>
              <h3 className="text-lg font-medium">Staking Details</h3>
              <p className="text-sm text-text-secondary">
                Click to expand/collapse
              </p>
            </CardHeader>
            <CardBody>
              <CardStat
                value="1,234.56 ETH"
                label="Total Staked"
                trend={{ value: 5.2, direction: "up" }}
              />
              <p className="mt-4">
                Additional details about your staking position that are revealed
                when expanded.
              </p>
            </CardBody>
          </Card>

          <Card expandable>
            <CardHeader>
              <h3 className="text-lg font-medium">Rewards History</h3>
              <p className="text-sm text-text-secondary">View your earnings</p>
            </CardHeader>
            <CardBody>
              <CardStat
                value="45.67 ETH"
                label="Total Rewards"
                trend={{ value: 2.8, direction: "up" }}
              />
              <p className="mt-4">
                Detailed breakdown of your staking rewards and history.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Cards with Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cards with Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader
              icon={<Wallet className="w-5 h-5" />}
              actions={
                <Button size="sm" variant="secondary">
                  Claim Rewards
                </Button>
              }
            >
              <h3 className="text-lg font-medium">Validator Status</h3>
              <p className="text-sm text-text-secondary">Active</p>
            </CardHeader>
            <CardBody>
              <CardStat value="32.00 ETH" label="Staked Amount" />
              <CardStat
                className="mt-4"
                value="99.98%"
                label="Uptime"
                trend={{ value: 0.02, direction: "up" }}
              />
            </CardBody>
            <CardFooter>
              <Badge variant="success">Earning Rewards</Badge>
            </CardFooter>
          </Card>

          <Card rightIcon="arrow" interactive>
            <CardHeader icon={<Settings className="w-5 h-5" />}>
              <h3 className="text-lg font-medium">Validator Settings</h3>
              <p className="text-sm text-text-secondary">
                Configure preferences
              </p>
            </CardHeader>
            <CardBody>
              <p>Manage your validator settings and preferences.</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Individual Stats Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Stats Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <CardStat
                value="128"
                label="Active Validators"
                trend={{ value: 3, direction: "up" }}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardStat
                value="4,096 ETH"
                label="Total Staked"
                trend={{ value: 1.2, direction: "up" }}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardStat value="99.9%" label="Network Uptime" />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardStat
                value="45.67 ETH"
                label="Rewards Earned"
                trend={{ value: 5.4, direction: "up" }}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
