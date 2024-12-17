import prisma from './prismaService';
import { Store, Zone, Booking } from '../types';

async function getStoresWithZonesAndBookings(): Promise<Store[]> {
  try {
    const stores = await prisma.store.findMany({
      include: {
        dmpZones: {
          include: {
            bookings: true,
          },
        },
      },
    });
    
    if (!stores) {
      throw new Error('No stores found');
    }

    const storesWithValidDates = stores.map((store): Store => ({
      id: store.id,
      name: store.name,
      address: `${store.city}, ${store.region}`,
      city: store.city,
      region: store.region,
      isPremium: false,
      size: 'Medium',
      dmpZones: store.dmpZones.map((zone): Zone => ({
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
        bookings: zone.bookings.map((booking): Booking => {
          if (!booking) {
            console.error("Booking is null for zone:", zone);
            return {
              id: -1,
              startDate: null,
              endDate: null,
              status: 'unknown',
              userId: -1,
              zoneId: -1,
            }
          }
          return {
            id: booking.id,
            startDate: booking.startDate ? booking.startDate : null,
            endDate: booking.endDate ? booking.endDate : null,
            status: booking.status,
            userId: booking.userId,
            zoneId: booking.zoneId,
          }
        }),
      })),
    }));
    
    return storesWithValidDates;
  } catch (error) {
    console.error("Error fetching stores with zones and bookings:", error);
    throw error;
  }
}

export { getStoresWithZonesAndBookings };
