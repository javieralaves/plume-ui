"use client";

import { useState, useRef } from "react";
import { DataTable } from "../components/DataTable";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Card, CardBody, CardStat } from "../components/Card";

interface Validator {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending";
  staked: number;
  apy: number;
  uptime: number;
  rewards: number;
}

// Initial data with fixed values to prevent hydration mismatch
const initialValidators: Validator[] = [
  {
    id: "validator-1",
    name: "Validator 1",
    status: "active",
    staked: 32000.0,
    apy: 4.2,
    uptime: 99.98,
    rewards: 1250.5,
  },
  {
    id: "validator-2",
    name: "Validator 2",
    status: "pending",
    staked: 16000.0,
    apy: 4.15,
    uptime: 99.95,
    rewards: 625.25,
  },
  {
    id: "validator-3",
    name: "Validator 3",
    status: "inactive",
    staked: 8000.0,
    apy: 4.1,
    uptime: 99.9,
    rewards: 312.75,
  },
];

const generateValidators = (count: number, startIndex: number): Validator[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `validator-${startIndex + i + 1}`,
    name: `Validator ${startIndex + i + 1}`,
    status: ["active", "inactive", "pending"][
      Math.floor(Math.random() * 3)
    ] as Validator["status"],
    staked: Math.floor(Math.random() * 100000) / 100,
    apy: Math.floor(Math.random() * 1500) / 100,
    uptime: 98 + Math.random() * 2,
    rewards: Math.floor(Math.random() * 10000) / 100,
  }));
};

const columns = [
  {
    key: "name",
    header: "Validator",
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value: unknown) => {
      const status = value as Validator["status"];
      const variants: Record<
        Validator["status"],
        "success" | "error" | "warning"
      > = {
        active: "success",
        inactive: "error",
        pending: "warning",
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
    },
  },
  {
    key: "staked",
    header: "Staked (ETH)",
    sortable: true,
    defaultSort: "desc" as const,
    render: (value: unknown) => (value as number).toFixed(2),
  },
  {
    key: "apy",
    header: "APY (%)",
    sortable: true,
    defaultSort: "desc" as const,
    render: (value: unknown) => (value as number).toFixed(2),
  },
  {
    key: "uptime",
    header: "Uptime (%)",
    sortable: true,
    render: (value: unknown) => (value as number).toFixed(2),
  },
  {
    key: "rewards",
    header: "Rewards (ETH)",
    sortable: true,
    render: (value: unknown) => (value as number).toFixed(2),
  },
];

const renderExpandedRow = (row: Validator) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardBody>
        <CardStat value={row.staked.toFixed(2)} label="Total ETH Staked" />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardStat
          value={`${row.apy.toFixed(2)}%`}
          label="Current APY"
          trend={{ value: 0.5, direction: "up" }}
        />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardStat value={row.rewards.toFixed(2)} label="Total Rewards Earned" />
      </CardBody>
    </Card>
  </div>
);

const renderActions = (row: Validator) => (
  <div className="flex items-center justify-end gap-2">
    <Button size="sm" variant="secondary">
      Stake
    </Button>
    {row.status === "active" && <Button size="sm">Claim</Button>}
  </div>
);

export function DataTableDemo() {
  // State for infinite scroll table
  const [infiniteValidators, setInfiniteValidators] = useState(() => [
    ...initialValidators,
    ...generateValidators(17, 3),
  ]);
  const [loading, setLoading] = useState(false);
  const validatorCountRef = useRef(20);

  // State for paginated table
  const [paginatedValidators] = useState(() => generateValidators(25, 50));

  const loadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newValidators = generateValidators(10, validatorCountRef.current);
      validatorCountRef.current += 10;
      setInfiniteValidators((prev) => [...prev, ...newValidators]);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="space-y-12">
      <div>
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold">Infinite Scroll Table</h2>
          <p className="text-gray-500">
            Load more data on demand with alternating row colors.
          </p>
        </div>

        <DataTable
          data={infiniteValidators}
          columns={columns}
          keyField="id"
          expandable
          renderExpandedRow={renderExpandedRow}
          actions={renderActions}
          defaultSort={{ key: "apy", direction: "desc" }}
          infiniteScroll
          onLoadMore={loadMore}
          hasMore={infiniteValidators.length < 50}
          isLoading={loading}
          alternateRowBackground
        />
      </div>

      <div>
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold">Paginated Table</h2>
          <p className="text-gray-500">
            Traditional pagination with solid background.
          </p>
        </div>

        <DataTable
          data={paginatedValidators}
          columns={columns}
          keyField="id"
          expandable
          renderExpandedRow={renderExpandedRow}
          actions={renderActions}
          defaultSort={{ key: "staked", direction: "desc" }}
          pageSize={10}
          alternateRowBackground={false}
        />
      </div>
    </section>
  );
}
