import { getStoresWithZonesAndBookings } from '../../services/bookingService';
import SupplierClientPageWithProtection from './client';

export default async function SupplierPage() {
    try {
        const stores = await getStoresWithZonesAndBookings();
        return <SupplierClientPageWithProtection stores={stores} />;
    } catch (error) {
        console.error('Error loading supplier page:', error);
        return <div>Error loading stores. Please try again later.</div>;
    }
}
