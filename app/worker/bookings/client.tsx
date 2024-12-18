'use client';

import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { BookingDialog } from '@/components/booking/BookingDialog';
import { BookingStatusLegend } from '@/components/booking/BookingStatusLegend';
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/ui/use-toast';
import { BookingStatus, Zone } from '@/types';
import { Booking } from '@prisma/client';
import { format } from 'date-fns';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
// import { useBookings } from '@/hooks/booking/useBookings';
import { getStoresWithZonesAndBookings } from '@/services/storeService';
import { Dialog } from '@/components/ui/dialog';
import { DateRange } from 'react-day-picker';
import { Table } from '@/components/ui/table';
import { getWorkerBookings } from '@/services/workerBookingService';

export default function WorkerBookings() {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
    const [filterDate, setFilterDate] = useState<Date | null>(null);
    const { toast } = useToast();
    const [stores, setStores] = useState<any[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const storesData = await getStoresWithZonesAndBookings();
                setStores(storesData);
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to fetch stores',
                    variant: 'destructive',
                });
            }
        };
        fetchStores();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await getWorkerBookings();
                setBookings(bookingsData);
            } catch (error: any) {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to fetch bookings',
                    variant: 'destructive',
                });
            }
        };
        fetchBookings();
    }, []);


    const handleOpenDialog = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDialogOpen(true);
        const zone = stores
            .flatMap(store => store.dmpZones)
            .find((zone: Zone) => zone.id === booking.zoneId);
        setSelectedZone(zone || null);
    };


    const handleStatusChange = async (bookingId: number, newStatus: BookingStatus) => {
        try {
            // await updateBookingStatus(bookingId, newStatus); // Removed since updateBookingStatus is not available
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
            toast({
                title: 'Success',
                description: `Booking status updated to ${newStatus}`,
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update booking status',
                variant: 'destructive',
            });
        }
    };

    const filteredBookings = useMemo(() => {
        return bookings
            ? bookings.filter(booking => {
                  if (filterStatus === 'all') {
                      return true;
                  }
                  return booking.status === filterStatus;
              })
            : [];
    }, [bookings, filterStatus]);

    const dateFilteredBookings = useMemo(() => {
        return filterDate
            ? filteredBookings.filter(booking => {
                  const bookingDate = new Date(booking.startDate);
                  return (
                      bookingDate.getDate() === filterDate.getDate() &&
                      bookingDate.getMonth() === filterDate.getMonth() &&
                      bookingDate.getFullYear() === filterDate.getFullYear()
                  );
              })
            : filteredBookings;
    }, [filteredBookings, filterDate]);

    const handleDateSelect = useCallback((range: DateRange | undefined) => {
        if (range?.from) {
            setFilterDate(range.from);
        } else {
            setFilterDate(null);
        }
    }, [setFilterDate]);


    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Worker Bookings</h2>
                <BookingStatusLegend />
            </div>
            <div className="flex justify-between items-center mb-4">
                <BookingCalendar
                    zone={selectedZone || { bookings: [] } as Zone}
                    dateRange={filterDate ? { from: filterDate, to: filterDate } : undefined}
                    onDateRangeChange={handleDateSelect}
                    getRedColor={() => 'red'}
                />
            </div>
            {bookings.length === 0 ? (
                <div>Loading bookings...</div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Zone</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dateFilteredBookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.id}</TableCell>
                                    <TableCell>{booking.zoneId}</TableCell>
                                    <TableCell>
                                        {format(new Date(booking.startDate), 'yyyy-MM-dd HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(booking.endDate), 'yyyy-MM-dd HH:mm')}
                                    </TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpenDialog(booking)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {selectedZone && selectedBooking && (
                    <BookingDialog
                        zone={selectedZone}
                        getRedColor={() => 'red'}
                    />
                )}
            </Dialog>
        </div>
    );
}
