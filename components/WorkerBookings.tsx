'use client'

import React from 'react';
import { useBookings } from '../hooks/useBookings';
import { BookingTable } from '../components/BookingTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Booking, BookingStatus } from '../types';
import { useToast } from '../hooks/use-toast';
import { useRole } from '../components/RoleProvider';

interface WorkerBookingsProps {
  initialBookings: Booking[];
}

export const WorkerBookings: React.FC<WorkerBookingsProps> = ({ initialBookings }) => {
  const { toast } = useToast();
  const { role } = useRole();
  const {
    bookings,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleStatusChange,
  } = useBookings(initialBookings);


  if (role !== 'worker') {
    return <div>You are not authorized to view this page.</div>;
  }


  const onStatusChange = (id: number, newStatus: BookingStatus) => {
    handleStatusChange(id, newStatus);
    toast({
      title: `Booking ${newStatus}`,
      description: `Booking has been ${newStatus}.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'rgb(228, 0, 43)' }}>All Bookings</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search by supplier or spot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={statusFilter} onValueChange={(value: BookingStatus | 'all') => setStatusFilter(value)}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingTable 
            bookings={bookings} 
            onStatusChange={onStatusChange}
            showActions={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};
