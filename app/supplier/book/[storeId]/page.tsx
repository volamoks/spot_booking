import { BookingPageClient } from './client'

async function getStoreData(storeId: string) {
  // In a real app, this would be an API call
  const stores = [
    {
      id: "1",
      name: "Store A",
      spots: [
        { id: 1, name: "Spot A1", price: 100, description: "Near entrance", location: "Front", isAvailable: true },
        { id: 2, name: "Spot A2", price: 150, description: "Window display", location: "Front", isAvailable: false },
        { id: 3, name: "Spot A3", price: 80, description: "Back corner", location: "Back", isAvailable: true },
      ],
      unavailableDates: ["2024-03-15", "2024-03-16", "2024-03-17"]
    },
    // ... other stores
  ]

  return stores.find(store => store.id === storeId)
}

export default async function BookingPage({ params }: { params: { storeId: string } }) {
  const storeData = await getStoreData(params.storeId)

  if (!storeData) {
    return <div>Store not found</div>
  }

  return <BookingPageClient storeData={storeData} />
}

