import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "./Checkbox";

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  alternateRowBackground?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  pageSize?: number;
  renderExpandedRow?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyField,
  alternateRowBackground = false,
  selectable = false,
  expandable = false,
  pageSize = 10,
  renderExpandedRow,
  onRowClick,
  onSelectionChange,
}: DataTableProps<T>) {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: "", direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Sort and paginate data
  const sortedAndPaginatedData = useMemo(() => {
    const processedData = [...data];

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];
        const direction = sortConfig.direction === "asc" ? 1 : -1;

        if (typeof aValue === "string") {
          return direction * aValue.localeCompare(String(bValue));
        }
        return direction * (Number(aValue) - Number(bValue));
      });
    }

    // Apply pagination
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [data, sortConfig, currentPage, pageSize]);

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? null
            : "asc"
          : "asc",
    }));
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(
        sortedAndPaginatedData.map((row) => String(row[keyField]))
      );
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
    onSelectionChange?.(checked ? sortedAndPaginatedData : []);
  };

  const handleSelectRow = (rowKey: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowKey);
    } else {
      newSelected.delete(rowKey);
    }
    setSelectedRows(newSelected);
    onSelectionChange?.(
      Array.from(sortedAndPaginatedData).filter((row) =>
        newSelected.has(String(row[keyField]))
      )
    );
  };

  // Handle row expansion
  const handleRowClick = (row: T) => {
    if (expandable) {
      const rowKey = String(row[keyField]);
      const newExpanded = new Set(expandedRows);
      if (newExpanded.has(rowKey)) {
        newExpanded.delete(rowKey);
      } else {
        newExpanded.add(rowKey);
      }
      setExpandedRows(newExpanded);
    }
    onRowClick?.(row);
  };

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="w-full border border-border-light rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-secondary border-b border-border-light">
              {selectable && (
                <th className="px-4 py-3 w-[52px]">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={
                        sortedAndPaginatedData.length > 0 &&
                        sortedAndPaginatedData.every((row) =>
                          selectedRows.has(String(row[keyField]))
                        )
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-left text-app-body-sm font-medium uppercase",
                    column.sortable && "cursor-pointer select-none"
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "w-3 h-3",
                            sortConfig.key === column.key &&
                              sortConfig.direction === "asc"
                              ? "text-primary"
                              : "text-text-tertiary"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 -mt-1",
                            sortConfig.key === column.key &&
                              sortConfig.direction === "desc"
                              ? "text-primary"
                              : "text-text-tertiary"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAndPaginatedData.map((row, index) => {
              const rowKey = String(row[keyField]);
              const isExpanded = expandedRows.has(rowKey);

              return (
                <React.Fragment key={rowKey}>
                  <tr
                    className={cn(
                      "border-b border-border-light hover:bg-neutral-100 transition-colors",
                      alternateRowBackground &&
                        index % 2 === 1 &&
                        "bg-neutral-50",
                      (onRowClick || expandable) && "cursor-pointer"
                    )}
                    onClick={() => handleRowClick(row)}
                  >
                    {selectable && (
                      <td
                        className="px-4 py-3 w-[52px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selectedRows.has(rowKey)}
                            onChange={(e) =>
                              handleSelectRow(rowKey, e.target.checked)
                            }
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-app-body text-text-primary"
                      >
                        {column.render
                          ? column.render(row[column.key as keyof T], row)
                          : String(row[column.key as keyof T])}
                      </td>
                    ))}
                  </tr>
                  {expandable && isExpanded && renderExpandedRow && (
                    <tr className="bg-surface-secondary">
                      <td
                        colSpan={columns.length + (selectable ? 1 : 0)}
                        className="px-4 py-3"
                      >
                        {renderExpandedRow(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-3 px-4 border-t border-border-light">
        <div className="text-app-body-sm text-text-secondary">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className={cn(
              "flex items-center gap-1 px-3 py-1 border border-border-medium rounded-md text-text-primary",
              "hover:bg-surface-secondary transition-colors",
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            className={cn(
              "flex items-center gap-1 px-3 py-1 border border-border-medium rounded-md text-text-primary",
              "hover:bg-surface-secondary transition-colors",
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
