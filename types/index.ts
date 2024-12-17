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
  startDate: Date | null;
  endDate: Date | null;
  status: string;
  userId: number;
  zoneId: number;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  dmpZones: Zone[];
  city: string;
  region: string;
  isPremium: boolean;
  size: string;
}

export interface Zone {
  id: number;
  uniqueId: string;
  equipment: string;
  dmpProductNeighboring: string;
  purpose: string;
  subPurpose: string;
  category: string;
  supplier: string;
  brand: string;
  productCategory: string;
  status: string;
  storeId: number;
  comment: string | null;
  price: number;
  bookings: Booking[];
}
