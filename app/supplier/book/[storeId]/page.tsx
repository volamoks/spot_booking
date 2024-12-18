import { BookASpot } from '../../../../components/BookingSpotPage';
import { prisma } from '../../../../services/prismaService';

export default async function BookingPage({ params }: { params: { storeId: string } }) {
    const store = await prisma.store.findUnique({
        where: {
            id: parseInt(params.storeId),
        },
        include: {
            dmpZones: {
                include: {
                    bookings: true,
                },
            },
        },
    });

    if (!store) {
        return <div>Store not found</div>;
    }

    const storeWithValidDates = {
        id: store.id,
        name: store.name,
        address: `${store.city}, ${store.region}`,
        city: store.city,
        region: store.region,
        isPremium: false,
        size: 'Medium',
        dmpZones: store.dmpZones.map(zone => ({
            id: zone.id,
            uniqueId: zone.uniqueId,
            equipment: zone.equipment,
            dmpProductNeighboring: zone.dmpProductNeighboring,
            purpose: zone.purpose,
            subPurpose: zone.subPurpose,
            category: zone.category,
            supplier: zone.supplier,
            brand: zone.brand,
            productCategory: zone.productCategory,
            status: zone.status,
            storeId: zone.storeId,
            comment: zone.comment,
            price: zone.price,
            bookings: zone.bookings.map(booking => {
                if (!booking) {
                    console.error('Booking is null for zone:', zone);
                    return {
                        id: -1,
                        startDate: null,
                        endDate: null,
                        status: 'unknown',
                        userId: -1,
                        zoneId: -1,
                    };
                }
                return {
                    id: booking.id,
                    startDate: booking.startDate ? booking.startDate : null,
                    endDate: booking.endDate ? booking.endDate : null,
                    status: booking.status,
                    userId: booking.userId,
                    zoneId: booking.zoneId,
                };
            }),
        })),
    };

    return <BookASpot initialStores={[storeWithValidDates]} />;
}
