import { Store, Zone, Booking } from '../types';
import BaseService from './baseService';

export class StoreService extends BaseService {
    constructor() {
        super();
    }
    async getStoresWithZonesAndBookings(): Promise<Store[]> {
        const stores = await this.fetchData('/api/stores');

        if (!stores) {
            throw new Error('No stores found');
        }

        const storesWithValidDates = stores.map((store: Store): Store => ({
            id: store.id,
            name: store.name,
            address: `${store.city}, ${store.region}`,
            city: store.city,
            region: store.region,
            isPremium: false,
            size: 'Medium',
            dmpZones: store.dmpZones.map((zone: Zone): Zone => ({
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
                bookings: zone.bookings.map((booking: Booking): Booking => {
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
    }
}

const storeService = new StoreService();

export const { getStoresWithZonesAndBookings } = storeService;
