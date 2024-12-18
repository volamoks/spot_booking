export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
    id: string;
    storeName: string;
    spot: string;
    startDate: string;
    endDate: string;
    status: BookingStatus;
    totalPrice: number;
    createdAt: string;
    // Add other properties as needed
}
