import React, { useState, useMemo, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "./Checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Sort direction type for table columns
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Configuration for a table column
 */
export interface Column<T> {
  /** Unique identifier for the column */
  key: string;
  /** Display text for the column header */
  header: string;
  /** Whether the column can be sorted */
  sortable?: boolean;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Default sort direction for this column */
  defaultSort?: SortDirection;
}

/**
 * A feature-rich data table component with sorting, pagination, selection, and expandable rows.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const columns = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'age', header: 'Age', sortable: true },
 *   {
 *     key: 'status',
 *     header: 'Status',
 *     render: (value) => <Badge variant={value === 'active' ? 'success' : 'error'}>{value}</Badge>
 *   }
 * ];
 *
 * const data = [
 *   { id: 1, name: 'John', age: 30, status: 'active' },
 *   { id: 2, name: 'Jane', age: 25, status: 'inactive' }
 * ];
 *
 * // Simple table with selection
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   keyField="id"
 *   selectable
 *   pageSize={10}
 *   onSelectionChange={handleSelectionChange}
 * />
 *
 * // With expandable rows
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   keyField="id"
 *   expandable
 *   renderExpandedRow={(row) => (
 *     <div>Additional details for {row.name}</div>
 *   )}
 * />
 * ```
 */
export interface DataTableProps<T> {
  /** Array of data items to display in the table */
  data: T[];
  /** Array of column configurations */
  columns: Column<T>[];
  /** Key field in data items used as unique identifier */
  keyField: keyof T;
  /** Whether to alternate row background colors */
  alternateRowBackground?: boolean;
  /** Whether to enable row selection */
  selectable?: boolean;
  /** Whether to enable expandable rows */
  expandable?: boolean;
  /** Number of rows per page */
  pageSize?: number;
  /** Render function for expanded row content */
  renderExpandedRow?: (row: T) => React.ReactNode;
  /** Callback fired when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Callback fired when row selection changes */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Render function for row actions */
  actions?: (row: T) => React.ReactNode;
  /** Default sort configuration */
  defaultSort?: {
    key: string;
    direction: SortDirection;
  };
  /** Enable infinite scroll */
  infiniteScroll?: boolean;
  /** Callback to load more data when scrolling */
  onLoadMore?: () => void;
  /** Whether there is more data to load */
  hasMore?: boolean;
  /** Loading state for infinite scroll */
  isLoading?: boolean;
}

/**
 * DataTable component that follows the Plume UI design system.
 * Provides a rich set of features including:
 * - Sorting (click column headers)
 * - Pagination
 * - Row selection
 * - Expandable rows
 * - Custom cell rendering
 * - Responsive design
 */
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
  actions,
  defaultSort,
  infiniteScroll = false,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}: DataTableProps<T>) {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>(defaultSort || { key: "", direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Infinite scroll setup
  const { ref: loadMoreRef } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Remove automatic loading on scroll
  React.useEffect(() => {
    // Removed automatic loading effect
  }, []);

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
    if (!infiniteScroll) {
      const start = (currentPage - 1) * pageSize;
      return processedData.slice(start, start + pageSize);
    }

    return processedData;
  }, [data, sortConfig, currentPage, pageSize, infiniteScroll]);

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // If already sorting by this column, cycle through states
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: "", direction: null };
        return { key, direction: "asc" };
      }
      // If sorting by a new column, use its default direction or "asc"
      const column = columns.find((col) => col.key === key);
      return { key, direction: column?.defaultSort || "asc" };
    });
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
                    "px-4 py-3 text-left text-app-body-sm font-medium text-text-secondary",
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
              {actions && (
                <th className="px-4 py-3 text-right text-app-body-sm font-medium text-text-secondary">
                  Actions
                </th>
              )}
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
                    {actions && (
                      <td
                        className="px-4 py-3 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                  {expandable && renderExpandedRow && (
                    <AnimatePresence initial={false} mode="sync">
                      {isExpanded && (
                        <tr className="bg-surface-secondary">
                          <td
                            colSpan={
                              columns.length +
                              (selectable ? 1 : 0) +
                              (actions ? 1 : 0)
                            }
                            className="px-4"
                          >
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden py-3"
                            >
                              {renderExpandedRow(row)}
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {infiniteScroll ? (
        <div
          ref={loadMoreRef}
          className={cn(
            "flex items-center justify-center p-4 border-t border-border-light",
            !hasMore && "hidden"
          )}
        >
          {isLoading ? (
            <div className="text-sm text-text-secondary">Loading more...</div>
          ) : hasMore ? (
            <button
              onClick={() => onLoadMore?.()}
              className="px-3 py-1.5 text-sm font-medium rounded-md border border-border-light bg-white hover:bg-neutral-50 transition-colors"
            >
              Load more rows
            </button>
          ) : null}
        </div>
      ) : (
        totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border-light">
            <div className="text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md border border-border-light",
                  "bg-white text-text-primary hover:bg-neutral-50 disabled:opacity-50",
                  "disabled:cursor-not-allowed transition-colors"
                )}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md border border-border-light",
                  "bg-white text-text-primary hover:bg-neutral-50 disabled:opacity-50",
                  "disabled:cursor-not-allowed transition-colors"
                )}
              >
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
