import { Booking } from '@/types';

// This is a mock service. In a real application, this would make API calls.
export const getBookings = async (): Promise<Booking[]> => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, supplierName: "Supplier X", spot: "Spot D1", startDate: "2024-04-01", endDate: "2024-04-05", status: "confirmed" },
        { id: 2, supplierName: "Supplier Y", spot: "Spot E2", startDate: "2024-04-10", endDate: "2024-04-15", status: "pending" },
        { id: 3, supplierName: "Supplier Z", spot: "Spot F3", startDate: "2024-04-20", endDate: "2024-04-25", status: "confirmed" },
        { id: 4, supplierName: "Supplier A", spot: "Spot G4", startDate: "2024-05-01", endDate: "2024-05-07", status: "rejected" },
        { id: 5, supplierName: "Supplier B", spot: "Spot H5", startDate: "2024-05-10", endDate: "2024-05-15", status: "approved" },
      ]);
    }, 500);
  });
};

export const updateBookingStatus = async (id: number, status: Booking['status']): Promise<Booking> => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        supplierName: "Updated Supplier",
        spot: "Updated Spot",
        startDate: "2024-06-01",
        endDate: "2024-06-05",
        status,
      });
    }, 500);
  });
};

