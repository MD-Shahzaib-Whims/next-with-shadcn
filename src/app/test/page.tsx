"use client"
import { ReusableTable } from "@/components/ReusableTable/ReusableTable";
import TableContainer from "@/components/TableContainer/TableContainer";
import { Button } from "@/components/ui/button";
import { Column, RowData } from "@/lib/Interfaces";
import { generateRandomData } from "@/lib/utils";
import { useState } from "react";

const Test = () => {


    // Props Handling for ReusableTable:
    const myData = generateRandomData(10000)
    const columns: Column<RowData>[] = [
        { label: "Ref#", key: "ref", sortable: true },
        { label: "Pickup Time", key: "pickupTime" },
        { label: "Drop Off", key: "dropOff" },
        { label: "Customer", key: "customer" },
        { label: "Phone", key: "phone" },
        { label: "Status", key: "status" },
    ]

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [filterText, setFilterText] = useState<string>("");

    // Row selection handler
    const handleRowSelect = (selected: string[]) => {
        setSelectedRows(selected);
    };

    // Pagination change handler
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Filter change handler
    const handleFilterChange = (filter: string) => {
        setFilterText(filter);
    };

    // Rows per page change handler
    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
    };

    console.log("🚀 ~ selectedRows currentPage,rowsPerPage,filterText:", selectedRows, currentPage, rowsPerPage, filterText)
    // Props Handling for ReusableTable:

    return (
        <div className="bg-slate-200">
            <div className="max-w-4xl mx-auto px-4 py-8 bg-slate-200">
                <h1 className="text-3xl font-semibold text-center text-gray-500 mb-4">Welcome to the Test Page!</h1>

                <p className="text-lg text-gray-400 mb-6">
                    This page showcases the custom <strong className="text-blue-600">TableContainer</strong> component,
                    designed to display structured data in a table format. Below is an example of a data table rendered using
                    our custom table component.
                </p>

                <hr className="border-t-2 border-gray-300 mb-6" />

                <h2 className="text-2xl font-semibold text-gray-500 mb-4">Example TableContainer</h2>
                <p className="text-lg text-gray-400 mb-6">
                    The table below displays sample data including names, ages, and occupations. You can easily modify or extend
                    this table with more features like sorting, filtering, and pagination. Feel free to explore how it can be adapted
                    for your own data.
                </p>

                <TableContainer />

                <hr className="border-t-2 border-gray-300 mt-6 mb-6" />

                <h2 className="text-2xl font-semibold text-gray-500 mb-4">Example ReusableTable</h2>
                <p className="text-lg text-gray-400 mb-6">
                    The table below displays sample data including names, ages, and occupations. You can easily modify or extend
                    this table with more features like sorting, filtering, and pagination. Feel free to explore how it can be adapted
                    for your own data.
                </p>

                <ReusableTable
                    data={myData}
                    columns={columns}
                    onRowSelect={handleRowSelect}
                    onPageChange={handlePageChange}
                    onFilterChange={handleFilterChange}
                    rowsPerPageOptions={[5, 10, 15]}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    customActions={<button className="btn">Custom Action</button>}
                    hideSelectedRows={false}
                />

                <hr className="border-t-2 border-gray-300 mt-6 mb-6" />

                <footer className="text-center text-sm text-gray-500">
                    <p>
                        This is a simple example of a custom table in React. You can add more features or customize the design further
                        based on your project requirements.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Test;
