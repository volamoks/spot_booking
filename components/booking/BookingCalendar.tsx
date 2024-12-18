'use client';

import { Calendar } from '../ui/calendar';
import { DateRange } from 'react-day-picker';
import { useTheme } from 'next-themes';
import { Zone } from '../../types';
import { useToast } from '@/hooks/ui/use-toast';

interface BookingCalendarProps {
    zone: Zone;
    dateRange: DateRange | undefined;
    onDateRangeChange: (range: DateRange | undefined) => void;
    getRedColor: () => string;
}

export function BookingCalendar({
    zone,
    dateRange,
    onDateRangeChange,
    getRedColor,
}: BookingCalendarProps) {
    const { theme } = useTheme();
    const { toast } = useToast();

    // Function to check if a date is disabled
    const isDateDisabled = (date: Date) => {
        return zone.bookings.some(
            booking =>
                booking.startDate &&
                booking.endDate &&
                date >= new Date(booking.startDate) &&
                date <= new Date(booking.endDate) &&
                (booking.status === 'booked' || booking.status === 'confirmed'),
        );
    };

    // Function to handle date selection
    const handleDateSelect = (range: DateRange | undefined) => {
        if (!range || !range.from) {
            onDateRangeChange(undefined);
            return;
        }

        // If only start date is selected, allow it
        if (!range.to) {
            onDateRangeChange(range);
            return;
        }

        // Check if any date in the range is disabled
        const days = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));

        for (let i = 0; i <= days; i++) {
            const currentDate = new Date(range.from);
            currentDate.setDate(currentDate.getDate() + i);
            if (isDateDisabled(currentDate)) {
                toast({
                    title: 'Invalid Selection',
                    description: 'Your selected range includes already booked dates.',
                    variant: 'destructive',
                    duration: 3000,
                });
                onDateRangeChange(undefined);
                return;
            }
        }

        onDateRangeChange(range);
    };

    return (
        <>
            <style>
                {`
          .rdp-day_selected {
            background-color: ${getRedColor()} !important;
          }
          .rdp-day_booked {
            background-color: ${
                theme === 'dark' ? 'rgba(228, 0, 43, 0.5)' : 'rgba(228, 0, 43, 0.3)'
            } !important;
            color: ${
                theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
            } !important;
            cursor: not-allowed !important;
            pointer-events: none !important;
          }
          .rdp-day_requested {
            background-color: ${
                theme === 'dark' ? 'rgba(0, 122, 255, 0.5)' : 'rgba(0, 122, 255, 0.3)'
            } !important;
            color: ${
                theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
            } !important;
          }
          .rdp-day_confirmed {
            background-color: ${
                theme === 'dark' ? 'rgba(52, 199, 89, 0.5)' : 'rgba(52, 199, 89, 0.3)'
            } !important;
            color: ${
                theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
            } !important;
            cursor: not-allowed !important;
            pointer-events: none !important;
          }
          .rdp-day_booked:hover, .rdp-day_requested:hover, .rdp-day_confirmed:hover {
            opacity: 0.8;
          }
          .rdp-months {
            display: flex !important;
            gap: 1rem !important;
          }
          .rdp-day_disabled {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
            pointer-events: none !important;
          }
        `}
            </style>

            <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                className="rounded-md border"
                numberOfMonths={2}
                modifiers={{
                    booked: date =>
                        zone.bookings.some(
                            booking =>
                                booking.startDate &&
                                booking.endDate &&
                                date >= new Date(booking.startDate) &&
                                date <= new Date(booking.endDate) &&
                                booking.status === 'booked',
                        ),
                    requested: date =>
                        zone.bookings.some(
                            booking =>
                                booking.startDate &&
                                booking.endDate &&
                                date >= new Date(booking.startDate) &&
                                date <= new Date(booking.endDate) &&
                                booking.status === 'requested',
                        ),
                    confirmed: date =>
                        zone.bookings.some(
                            booking =>
                                booking.startDate &&
                                booking.endDate &&
                                date >= new Date(booking.startDate) &&
                                date <= new Date(booking.endDate) &&
                                booking.status === 'confirmed',
                        ),
                }}
                modifiersClassNames={{
                    booked: 'rdp-day_booked',
                    requested: 'rdp-day_requested',
                    confirmed: 'rdp-day_confirmed',
                }}
                disabled={isDateDisabled}
                fromDate={new Date()} // Prevent selecting past dates
            />
        </>
    );
}
