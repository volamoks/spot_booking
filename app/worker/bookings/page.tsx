import { WorkerBookings } from '@/components/WorkerBookings';
import { getBookings } from '@/services/bookingService';

export default async function WorkerBookingsPage() {
  const allBookings = await getBookings();
  return <WorkerBookings initialBookings={allBookings} />;
}

