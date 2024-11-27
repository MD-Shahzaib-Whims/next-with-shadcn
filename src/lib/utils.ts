import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


import { RowData } from "./Interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const generateRandomData = (numRecords: number): RowData[] => {
  const statuses = ["Pending", "Completed", "Cancelled"];
  const vehicleTypes = [1, 2, 3];
  const customers = ["Maaz", "Zara", "Ahmed", "Hassan", "Nadia", "Omar", "Mariam", "Bilal", "Ali", "Junaid", "Anwar", "Khalid", "Faizan", "Shahbaz"];
  const locations = [
    "154, Block 5 Clifton, Karachi, Pakistan",
    "ST-16 Main University Rd, Karachi, Pakistan",
    "1st Floor, Sadar, Karachi, Pakistan",
    "Bahria Town, Karachi, Pakistan",
    "Liberty Market, Lahore, Pakistan",
    "DHA Phase 5, Lahore, Pakistan",
    "Gulshan-e-Iqbal, Karachi, Pakistan",
    "Korangi, Karachi, Pakistan",
    "Faisalabad, Pakistan",
    "Rawalpindi, Pakistan",
    "Islamabad, Pakistan",
    "Multan, Pakistan",
    "Bahawalpur, Pakistan",
  ];

  const randomElement = (arr: string[] | number[]) => arr[Math.floor(Math.random() * arr.length)];
  const randomFare = () => (Math.random() * 150 + 30).toFixed(2); // Generate a random fare between 30 and 180
  const randomPhone = () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`; // Random 10-digit phone number
  const randomDate = () => {
    const start = new Date(2024, 10, 1); // November 1, 2024
    const end = new Date(2024, 10, 30); // November 30, 2024
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };

  return Array.from({ length: numRecords }, (_, index) => ({
    id: `${index + 1}`,
    ref: `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    pickupTime: randomElement(locations) as string,
    dropOff: randomElement(locations) as string,
    customer: randomElement(customers) as string,
    phone: randomPhone(),
    vehicleType: randomElement(vehicleTypes) as number,
    status: randomElement(statuses) as string,
    driver: Math.random() > 0.5 ? randomElement(customers) as string : "",
    fare: parseFloat(randomFare()),
    bookingDate: randomDate(),
  }));
};