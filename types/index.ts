export type UserRole = 'supplier' | 'worker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export type BookingStatus = 'booked' | 'requested' | 'confirmed';

export interface Booking {
  id: number;
  supplierName: string;
  spot: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
}

export interface Store {
  id: number;
  name: string;
  isPremium: boolean;
  size: string;
  address: string;
  spots: Spot[];
}

export interface Spot {
  id: number;
  name: string;
  price: number;
  description: string;
  type: string;
  bookings: Booking[];
}
