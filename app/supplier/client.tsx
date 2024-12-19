'use client';

import { BookASpot } from 'components/features/BookingSpotPage';
import { Store } from 'types';

interface SupplierClientProps {
    initialStores: Store[];
}

export default function SupplierClient({ initialStores }: SupplierClientProps) {
    return <BookASpot initialStores={initialStores} />;
}
