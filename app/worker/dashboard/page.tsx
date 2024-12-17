import { WorkerDashboard } from '../../../components/worker-dashboard';
import { UserRole } from '../../../types/user';
import { Booking, BookingStatus } from '../../../types/booking';
import { ProtectedComponent } from '../../../components/RoleProvider';

async function getBookingRequests(): Promise<Booking[]> {
    // In a real app, this would be an API call
    const mockBookings: Booking[] = [
        {
            id: 1,
            storeName: 'Store A',
            spot: 'Spot A1',
            supplierName: 'Supplier A',
            startDate: '2024-03-15',
            endDate: '2024-03-15',
            status: 'pending' as BookingStatus,
            totalPrice: 100,
            createdAt: '2024-03-15',
        },
        {
            id: 2,
            storeName: 'Store B',
            spot: 'Spot B2',
            supplierName: 'Supplier B',
            startDate: '2024-03-16',
            endDate: '2024-03-16',
            status: 'approved' as BookingStatus,
            totalPrice: 200,
            createdAt: '2024-03-16',
        },
        {
            id: 3,
            storeName: 'Store C',
            spot: 'Spot C1',
            supplierName: 'Supplier C',
            startDate: '2024-03-17',
            endDate: '2024-03-17',
            status: 'pending' as BookingStatus,
            totalPrice: 150,
            createdAt: '2024-03-17',
        },
    ];
    return mockBookings;
}

async function getSupplierBookings(): Promise<Booking[]> {
    // In a real app, this would be an API call
    const mockBookings: Booking[] = [
        {
            id: 1,
            storeName: 'Store X',
            spot: 'Spot D1',
            supplierName: 'Supplier X',
            startDate: '2024-04-01',
            endDate: '2024-04-05',
            status: 'confirmed' as BookingStatus,
            totalPrice: 500,
            createdAt: '2024-04-01',
        },
        {
            id: 2,
            storeName: 'Store Y',
            spot: 'Spot E2',
            supplierName: 'Supplier Y',
            startDate: '2024-04-10',
            endDate: '2024-04-15',
            status: 'confirmed' as BookingStatus,
            totalPrice: 750,
            createdAt: '2024-04-10',
        },
        {
            id: 3,
            storeName: 'Store Z',
            spot: 'Spot F3',
            supplierName: 'Supplier Z',
            startDate: '2024-04-20',
            endDate: '2024-04-25',
            status: 'confirmed' as BookingStatus,
            totalPrice: 1000,
            createdAt: '2024-04-20',
        },
    ];
    return mockBookings;
}

async function WorkerDashboardPage() {
    const bookingRequests = await getBookingRequests();
    const supplierBookings = await getSupplierBookings();
    
    return (
        <WorkerDashboard
            initialBookingRequests={bookingRequests}
            initialSupplierBookings={supplierBookings}
        />
    );
}

export default function WorkerDashboardPageWithRoleProtection() {
    return (
        <ProtectedComponent
            component={WorkerDashboardPage}
            allowedRoles={['worker'] as UserRole[]}
        />
    );
}
