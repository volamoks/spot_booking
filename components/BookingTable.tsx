import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking, BookingStatus } from '@/types';

interface BookingTableProps {
    bookings: Booking[];
    onStatusChange?: (id: number, status: BookingStatus) => void;
    showActions?: boolean;
}

export const BookingTable: React.FC<BookingTableProps> = ({
    bookings,
    onStatusChange,
    showActions = false,
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Spot</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    {showActions && <TableHead>Actions</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map(booking => (
                    <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{`${booking.startDate} - ${booking.endDate}`}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    booking.status === 'confirmed' || booking.status === 'approved'
                                        ? 'success'
                                        : booking.status === 'rejected'
                                        ? 'destructive'
                                        : 'secondary'
                                }
                            >
                                {booking.status}
                            </Badge>
                        </TableCell>
                        {showActions && onStatusChange && booking.status === 'pending' && (
                            <TableCell>
                                <div className="space-x-2">
                                    <Button
                                        onClick={() => onStatusChange(booking.id, 'confirmed')}
                                        variant="default"
                                        size="sm"
                                        style={{ backgroundColor: 'rgb(228, 0, 43)' }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => onStatusChange(booking.id, 'rejected')}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
