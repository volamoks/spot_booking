'use client';

import { BookASpot } from '../../../../components/book-a-spot';
import { Store } from '../../../../types';

interface BookingPageClientProps {
    initialStores: Store[];
}

export function BookingPageClient({ initialStores }: BookingPageClientProps) {
    return (
        <BookASpot initialStores={initialStores} />
    );
}
