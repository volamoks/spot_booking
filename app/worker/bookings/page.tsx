
import { WorkerBookings } from '@/components/worker-bookings';
import { getBookingRequests } from '@/services/bookingService';

export default async function WorkerBookingsPage() {
    const allBookings = await getBookingRequests();
    return <WorkerBookings initialBookings={allBookings} />;
}
ы