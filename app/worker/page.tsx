import { WorkerDashboard } from '../../components/worker-dashboard'
import { UserRole } from '../../types/user';
import { ProtectedComponent } from '../../components/RoleProvider';
import React from 'react';

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

async function getBookingRequests(): Promise<BookingRequest[]> {
  // In a real app, this would be an API call
  return [
    { id: 1, supplierName: "Supplier A", spot: "Spot A1", date: "2024-03-15", status: "pending" },
    { id: 2, supplierName: "Supplier B", spot: "Spot B2", date: "2024-03-16", status: "approved" },
    { id: 3, supplierName: "Supplier C", spot: "Spot C1", date: "2024-03-17", status: "pending" },
  ]
}

async function getSupplierBookings(): Promise<SupplierBooking[]> {
  // In a real app, this would be an API call
  return [
    { id: 1, supplierName: "Supplier X", spot: "Spot D1", startDate: "2024-04-01", endDate: "2024-04-05", status: "confirmed" },
    { id: 2, supplierName: "Supplier Y", spot: "Spot E2", startDate: "2024-04-10", endDate: "2024-04-15", status: "confirmed" },
    { id: 3, supplierName: "Supplier Z", spot: "Spot F3", startDate: "2024-04-20", endDate: "2024-04-25", status: "confirmed" },
  ]
}

interface WorkerPageProps {
  initialBookingRequests: BookingRequest[];
  initialSupplierBookings: SupplierBooking[];
}

function WorkerPage({ initialBookingRequests, initialSupplierBookings }: WorkerPageProps) {
  return <WorkerDashboard initialBookingRequests={initialBookingRequests} initialSupplierBookings={initialSupplierBookings} />
}


export default function WorkerPageWithRoleProtection() {
  return (
    <ProtectedComponent 
      component={({ ...props }) => <WorkerPage {...props} />}
      allowedRoles={['worker'] as UserRole[]}
      props={{
        initialBookingRequests: getBookingRequests(),
        initialSupplierBookings: getSupplierBookings()
      }}
    />
  );
}
