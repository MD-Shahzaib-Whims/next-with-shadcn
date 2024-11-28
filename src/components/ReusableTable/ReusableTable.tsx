"use client";
import React, { useState, ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Column<T> = {
    label: string;
    key: keyof T;
    sortable?: boolean;
};

type ReusableTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    onRowSelect?: (selectedRows: string[]) => void;
    onPageChange?: (page: number) => void;
    onFilterChange?: (filterText: string) => void;
    rowsPerPageOptions?: number[];
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    customActions?: ReactNode;
    hideSelectedRows?: boolean;
};

export const ReusableTable = <T extends { id: string }>({
    data,
    columns,
    onRowSelect,
    onPageChange,
    onFilterChange,
    rowsPerPageOptions = [5, 10, 20],
    onRowsPerPageChange,
    customActions,
    hideSelectedRows = false,
}: ReusableTableProps<T>) => {
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            val.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn) {
            const valA = a[sortColumn];
            const valB = b[sortColumn];
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const toggleRowSelection = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
        onRowSelect?.(selectedRows);
    };

    const handlePaginationClick = (page: number) => {
        setCurrentPage(page);
        onPageChange?.(page);
    };

    const getPageNumbers = (totalPages: number, currentPage: number) => {
        const maxVisiblePages = 5;
        const pageNumbers: (number | string)[] = [1];
        if (currentPage > 3) pageNumbers.push("...");
        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(currentPage + 1, totalPages - 1);
            i++
        ) {
            pageNumbers.push(i);
        }
        if (currentPage < totalPages - 2) pageNumbers.push("...");
        if (totalPages > 1) pageNumbers.push(totalPages);
        return pageNumbers;
    };

    return (
        <div className="p-4">
            {/* Filter Input */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <Input
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => {
                        setFilterText(e.target.value);
                        onFilterChange?.(e.target.value);
                    }}
                    className="flex-1 min-w-[200px]"
                />
                {!hideSelectedRows && (
                    <span className="text-sm">
                        Selected Rows: {selectedRows.length}
                    </span>
                )}
                <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                        const newRowsPerPage = Number(value);
                        setRowsPerPage(newRowsPerPage);
                        onRowsPerPageChange?.(newRowsPerPage);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Rows per page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rows per page</SelectLabel>
                            {rowsPerPageOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {customActions}
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setSelectedRows(
                                        e.target.checked ? data.map((row) => row.id) : []
                                    )
                                }
                                checked={selectedRows.length === data.length}
                            />
                        </TableHead>
                        {columns.map((col) => (
                            <TableHead
                                key={col.key.toString()}
                                onClick={() => {
                                    if (col.sortable) {
                                        setSortColumn(col.key);
                                        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                                    }
                                }}
                            >
                                {col.label}
                                {sortColumn === col.key &&
                                    (sortOrder === "asc" ? " ▲" : " ▼")}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => toggleRowSelection(row.id)}
                                />
                            </TableCell>
                            {columns.map((col) => (
                                <TableCell key={col.key.toString()}>
                                    {String(row[col.key])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            {/* Previous Button */}
                            <Button
                                onClick={() => handlePaginationClick(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                variant="outline"
                                size="sm"
                                className={`${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-slate-100"
                                    }`}
                            >
                                Previous
                            </Button>
                        </PaginationItem>

                        {/* {/ Page Numbers /} */}
                        {getPageNumbers(totalPages, currentPage).map((page, index) =>
                            typeof page === "number" ? (
                                <Button
                                    key={index}
                                    onClick={() => handlePaginationClick(page)}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                >
                                    {page}
                                </Button>
                            ) : (
                                <span key={index} className="px-3 py-1 text-gray-500">
                                    {page}
                                </span>
                            )
                        )}

                        <PaginationItem>
                            {/* Next Button */}
                            <Button
                                onClick={() => handlePaginationClick(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                size="sm"
                                className={`${currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-slate-100"
                                    }`}
                            >
                                Next
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};
