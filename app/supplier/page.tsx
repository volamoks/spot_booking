import { BookASpot } from '../../components/book-a-spot';
import { getStoresWithZonesAndBookings } from '../../services/bookingService';

export default async function SupplierPage() {
    try {
        const stores = await getStoresWithZonesAndBookings();
        
        if (!stores || stores.length === 0) {
            return <div>No stores found</div>;
        }

        return <BookASpot initialStores={stores} />;
    } catch (error) {
        console.error('Error loading supplier page:', error);
        return <div>Error loading stores. Please try again later.</div>;
    }
}
