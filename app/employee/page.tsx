import { ProtectedComponent } from '../../components/RoleProvider';
import React from 'react';
import AllBookings from './bookings/client';
// import AllBookings from './bookings/page';

interface BookingRequest {
    id: number;
    supplierName: string;
    spot: string;
    date: string;
    status: 'pending' | 'approved';
}

interface SupplierBooking {
    id: number;
    supplierName: string;
    spot: string;
    startDate: string;
    endDate: string;
    status: 'confirmed';
}

export default function WorkerPageWithRoleProtection() {
    return (
        <ProtectedComponent
            component={({ ...props }) => <AllBookings {...props} />}
            // allowedRoles={['worker'] as UserRole[]}
            props={{}}
        />
    );
}
