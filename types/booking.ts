export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'confirmed';

export interface Booking {
  id: number
  storeName: string
  spot: string
  supplierName: string
  startDate: string
  endDate: string
  status: BookingStatus
  totalPrice: number
  createdAt: string
}
