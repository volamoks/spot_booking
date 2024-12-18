import { useState, useCallback, useMemo } from 'react';
import { Booking, BookingStatus } from '@/types';

export const useBookings = (initialBookings: Booking[]) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<keyof Booking>('startDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleStatusChange = useCallback((id: number, newStatus: BookingStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => 
      (booking.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.spot.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || booking.status === statusFilter)
    );
  }, [bookings, searchTerm, statusFilter]);

  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBookings, sortBy, sortOrder]);

  const handleSort = useCallback((column: keyof Booking) => {
    setSortBy(column);
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  }, []);

  return {
    bookings: sortedBookings,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleStatusChange,
    handleSort,
    sortBy,
    sortOrder,
  };
};

