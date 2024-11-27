"use client"
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RowData } from "@/lib/Interfaces";
import { mockData } from "@/lib/utils";

const TableContainer: React.FC = () => {
    const [data, setData] = useState<RowData[]>(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [sortColumn, setSortColumn] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const rowsPerPage = 5;

    // Filtering
    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            val.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    // Sorting
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn) {
            const valA = a[sortColumn as keyof RowData];
            const valB = b[sortColumn as keyof RowData];
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Row Selection
    const toggleRowSelection = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-4">
            {/* Filter Input */}
            <div className="mb-4 flex items-center justify-between">
                <Input
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-1/3"
                />
                <span className="text-sm">
                    Selected Rows: {selectedRows.length}
                </span>
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
                        <TableHead onClick={() => setSortColumn("ref")}>
                            Ref# {sortColumn === "ref" && (sortOrder === "asc" ? "▲" : "▼")}
                        </TableHead>
                        <TableHead>Pickup Time</TableHead>
                        <TableHead>Drop Off</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((row) => (
                        <TableRow key={row.id} className="hover:bg-gray-100">
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => toggleRowSelection(row.id)}
                                />
                            </TableCell>
                            <TableCell>{row.ref}</TableCell>
                            <TableCell>{row.pickupTime}</TableCell>
                            <TableCell>{row.dropOff}</TableCell>
                            <TableCell>{row.customer}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="secondary"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default TableContainer;