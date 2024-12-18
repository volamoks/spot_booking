import { Booking } from '@/types/booking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, MapPinIcon, DollarSignIcon } from 'lucide-react';

interface BookingDetailsProps {
    booking: Booking;
    onStatusChange?: (id: number, status: 'cancelled') => void;
}

export function BookingDetails({ booking, onStatusChange }: BookingDetailsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'rejected':
                return 'bg-red-500';
            case 'cancelled':
                return 'bg-gray-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>
                        {booking.storeName} - {booking.status}
                    </span>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        <span>{booking.storeName}</span>
                    </div>
                    <div className="flex items-center">
                        <DollarSignIcon className="mr-2 h-4 w-4" />
                        <span>Общая цена: ${booking.totalPrice}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="mr-2 h-4 w-4" />
                        <span>Booked on: {formatDate(booking.createdAt)}</span>
                    </div>
                </div>
                {booking.status === 'pending' && onStatusChange && (
                    <Button
                        onClick={() => onStatusChange(booking.id, 'cancelled')}
                        variant="destructive"
                        className="mt-4"
                    >
                        Cancel Booking
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
