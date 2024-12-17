import { MyBookingsClient } from './client'

async function getBookings() {
  // In a real app, this would be an API call
  // For now, we'll just return the dummy data
  const dummyData = [
    {
      id: 1,
      name: "Store A",
      bookings: [
        { id: 1, spotName: "Spot A1", startDate: "2024-03-01", endDate: "2024-03-15", status: "confirmed" },
        { id: 2, spotName: "Spot A2", startDate: "2024-03-20", endDate: "2024-03-25", status: "pending" },
      ]
    },
    {
      id: 2,
      name: "Store B",
      bookings: [
        { id: 3, spotName: "Spot B1", startDate: "2024-04-01", endDate: "2024-04-07", status: "pending" },
      ]
    },
    {
      id: 3,
      name: "Store C",
      bookings: [
        { id: 4, spotName: "Spot C1", startDate: "2024-05-01", endDate: "2024-05-14", status: "confirmed" },
        { id: 5, spotName: "Spot C2", startDate: "2024-05-15", endDate: "2024-05-20", status: "cancelled" },
        { id: 6, spotName: "Spot C3", startDate: "2024-06-01", endDate: "2024-06-07", status: "confirmed" },
      ]
    },
  ]
  return dummyData
}

export default async function MyBookingsPage() {
  const initialStores = await getBookings()
  return <MyBookingsClient initialStores={initialStores} />
}

