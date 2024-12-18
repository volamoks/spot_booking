import { StoreService } from '../../services/storeService';
import SupplierClient from './client';

export default async function SupplierProfilePage() {
    const storeService = new StoreService();
    const initialStores = await storeService.getStoresWithZonesAndBookings();
    return <SupplierClient initialStores={initialStores} />;
}
