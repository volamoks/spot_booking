export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export interface Booking {
  id: number
  storeName: string
  spotName: string
  supplierName: string
  startDate: string
  endDate: string
  status: BookingStatus
  totalPrice: number
  createdAt: string
}

