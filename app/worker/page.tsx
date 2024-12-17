import { WorkerDashboard } from './worker-dashboard'

async function getBookingRequests() {
  // In a real app, this would be an API call
  return [
    { id: 1, supplierName: "Supplier A", spot: "Spot A1", date: "2024-03-15", status: "pending" },
    { id: 2, supplierName: "Supplier B", spot: "Spot B2", date: "2024-03-16", status: "approved" },
    { id: 3, supplierName: "Supplier C", spot: "Spot C1", date: "2024-03-17", status: "pending" },
  ]
}

async function getSupplierBookings() {
  // In a real app, this would be an API call
  return [
    { id: 1, supplierName: "Supplier X", spot: "Spot D1", startDate: "2024-04-01", endDate: "2024-04-05", status: "confirmed" },
    { id: 2, supplierName: "Supplier Y", spot: "Spot E2", startDate: "2024-04-10", endDate: "2024-04-15", status: "confirmed" },
    { id: 3, supplierName: "Supplier Z", spot: "Spot F3", startDate: "2024-04-20", endDate: "2024-04-25", status: "confirmed" },
  ]
}

export default async function WorkerPage() {
  const bookingRequests = await getBookingRequests()
  const supplierBookings = await getSupplierBookings()
  return <WorkerDashboard initialBookingRequests={bookingRequests} initialSupplierBookings={supplierBookings} />
}

