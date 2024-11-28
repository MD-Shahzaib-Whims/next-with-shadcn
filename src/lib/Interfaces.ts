export interface RowData {
    id: string;
    ref: string;
    pickupTime: string;
    dropOff: string;
    customer: string;
    phone: string;
    vehicleType: number;
    status: string;
    driver: string;
    fare: number;
    bookingDate: string;
}

export interface Column<T> {
    label: string;
    key: keyof T;
    sortable?: boolean;
}

export interface ReusableTableProps<T> {
    data: T[];
    columns: { label: string; key: keyof T; sortable?: boolean }[];
    onRowSelect: (selected: string[]) => void;
    onPageChange: (page: number) => void;
    onFilterChange: (filter: string) => void;
    rowsPerPageOptions?: number[];
    onRowsPerPageChange: (rows: number) => void;
    customActions?: JSX.Element;
    hideSelectedRows?: boolean;
}