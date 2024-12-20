'use client';

import { BookASpot } from '@/components/features/Booking/BookingSpotPage';
import { Store } from '@/types/index';
// import { Store } from '@/types';

interface SupplierClientProps {
    initialStores: Store[];
}

export default function SupplierClient({ initialStores }: SupplierClientProps) {
    return <BookASpot initialStores={initialStores} />;
}
