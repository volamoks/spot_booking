import { StatisticsClient } from './client'

async function getStatistics() {
  // In a real app, this would be an API call
  return {
    totalSpots: 10,
    bookedSpots: 7,
    availableSpots: 3,
    upcomingBookings: 5,
  }
}

export default async function StatisticsPage() {
  const statistics = await getStatistics()

  return <StatisticsClient statistics={statistics} />
}

