"use client";

import { DataTable, Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "User",
    status: "inactive",
  },
];

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    key: "email",
    header: "Email Address",
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value, row) => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          row.status === "active"
            ? "bg-success-light text-success"
            : "bg-error-light text-error"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export function DataTableDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Table</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays data in a tabular format with sorting and pagination.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <DataTable<User>
          data={users}
          columns={columns}
          keyField="id"
          pageSize={5}
          alternateRowBackground
          selectable
        />
      </div>
    </section>
  );
}
