import { BookASpot } from '../../components/book-a-spot'
import { BookingStatus, Store } from '../../types'

// This is a sample async function to fetch stores data
async function getStores(): Promise<Store[]> {
  // In a real app, this would be an API call or database query
  const stores: Store[] = [
    {
      id: 1,
      name: "Store A",
      isPremium: true,
      size: "Large",
      address: "123 Main St, City, Country",
      spots: [
        { 
          id: 1, 
          name: "Spot A1", 
          price: 100, 
          description: "Near entrance", 
          type: "Standard",
          bookings: [
            { id: 1, supplierName: "Supplier A", spot: "Spot A1", startDate: "2024-04-05", endDate: "2024-04-10", status: 'booked' as BookingStatus },
            { id: 2, supplierName: "Supplier A", spot: "Spot A1", startDate: "2024-04-15", endDate: "2024-04-20", status: 'requested' as BookingStatus },
            { id: 3, supplierName: "Supplier A", spot: "Spot A1", startDate: "2024-04-25", endDate: "2024-04-30", status: 'confirmed' as BookingStatus }
          ]
        },
        { 
          id: 2, 
          name: "Spot A2", 
          price: 150, 
          description: "Window display", 
          type: "Premium", 
          bookings: [
            { id: 4, supplierName: "Supplier A", spot: "Spot A2", startDate: "2024-04-01", endDate: "2024-04-07", status: 'booked' as BookingStatus },
            { id: 5, supplierName: "Supplier A", spot: "Spot A2", startDate: "2024-04-12", endDate: "2024-04-18", status: 'requested' as BookingStatus },
            { id: 6, supplierName: "Supplier A", spot: "Spot A2", startDate: "2024-04-22", endDate: "2024-04-28", status: 'confirmed' as BookingStatus }
          ] 
        },
        { 
          id: 3, 
          name: "Spot A3", 
          price: 80, 
          description: "Back corner", 
          type: "Budget", 
          bookings: [
            { id: 7, supplierName: "Supplier A", spot: "Spot A3", startDate: "2024-04-08", endDate: "2024-04-14", status: 'booked' as BookingStatus },
            { id: 8, supplierName: "Supplier A", spot: "Spot A3", startDate: "2024-04-19", endDate: "2024-04-24", status: 'requested' as BookingStatus }
          ] 
        },
      ]
    },
    // Add more stores as needed
  ]
  return stores
}

export default async function SupplierPage() {
  const stores = await getStores()
  return <BookASpot initialStores={stores} />
}
