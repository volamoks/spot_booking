import { StoreDashboardClient } from './client'

async function getBookingRequests() {
  // In a real app, this would be an API call
  return [
    { id: 1, supplierName: "Supplier A", spot: "Spot A1", date: "2024-03-15", status: "pending" },
    { id: 2, supplierName: "Supplier B", spot: "Spot B2", date: "2024-03-16", status: "approved" },
    { id: 3, supplierName: "Supplier C", spot: "Spot C1", date: "2024-03-17", status: "pending" },
  ]
}

export default async function StoreDashboard() {
  const bookingRequests = await getBookingRequests()

  return <StoreDashboardClient bookingRequests={bookingRequests} />
}

