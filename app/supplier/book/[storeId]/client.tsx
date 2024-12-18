'use client';

import { BookASpot } from '../../../../components/BookingSpotPage';
import { Store } from '../../../../types';

interface BookingPageClientProps {
    initialStores: Store[];
}

export function BookingPageClient({ initialStores }: BookingPageClientProps) {
    return <BookASpot initialStores={initialStores} />;
}
