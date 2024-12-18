'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DateRange } from 'react-day-picker';
import { useToast } from '../../hooks/use-toast';
import { Zone } from '../../types';
import { createBookingRequest } from '../../services/bookingRequestService';
import { BookingCalendar } from './BookingCalendar';
import { BookingStatusLegend } from './BookingStatusLegend';
import { BookingSummary } from './BookingSummary';

interface BookingDialogProps {
    zone: Zone;
    getRedColor: () => string;
}

export function BookingDialog({ zone, getRedColor }: BookingDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (!dateRange?.from || !dateRange?.to) {
            toast({
                title: 'Error',
                description: 'Please select a date range for your booking.',
                variant: 'destructive',
                duration: 5000,
            });
            return;
        }

        // Check if any day in the range is already booked or confirmed
        const startDate = new Date(dateRange.from);
        const endDate = new Date(dateRange.to);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        const isRangeAvailable = !Array.from({ length: days + 1 }).some((_, index) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + index);
            return zone.bookings.some(
                booking =>
                    booking.startDate &&
                    booking.endDate &&
                    currentDate >= new Date(booking.startDate) &&
                    currentDate <= new Date(booking.endDate) &&
                    (booking.status === 'booked' || booking.status === 'confirmed'),
            );
        });

        if (!isRangeAvailable) {
            toast({
                title: 'Error',
                description: 'Some dates in your selected range are already booked.',
                variant: 'destructive',
                duration: 5000,
            });
            return;
        }

        setLoading(true);
        try {
            const result = await createBookingRequest(zone.uniqueId, startDate, endDate);
            if (result.success) {
                toast({
                    title: 'Booking Requested',
                    description: `Your booking for ${
                        zone.uniqueId
                    } from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} has been requested.`,
                    duration: 5000,
                });
                setIsDialogOpen(false);
            } else {
                toast({
                    title: 'Error',
                    description: result.message || 'Failed to create booking request.',
                    variant: 'destructive',
                    duration: 5000,
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message || 'An unexpected error occurred.',
                    variant: 'destructive',
                    duration: 5000,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'An unexpected error occurred.',
                    variant: 'destructive',
                    duration: 5000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setDateRange(undefined);
        }
    };

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={handleDialogOpenChange}
        >
            <DialogTrigger asChild>
                <Button
                    className="w-full"
                    style={{ backgroundColor: getRedColor() }}
                >
                    Забронировать
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Book {zone.uniqueId}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <BookingStatusLegend />

                    <BookingCalendar
                        zone={zone}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        getRedColor={getRedColor}
                    />

                    {dateRange?.from && dateRange?.to && (
                        <BookingSummary
                            dateRange={{ from: dateRange.from, to: dateRange.to }}
                            price={zone.price}
                        />
                    )}

                    <Button
                        onClick={handleBooking}
                        style={{ backgroundColor: getRedColor() }}
                        className="mt-4 w-full"
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
