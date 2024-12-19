'use client';

import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus } from 'types/booking';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Badge } from 'components/ui/badge';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'components/ui/select';

const SupplierBookingsClient = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
    const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/bookings');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBookings(data);
            } catch (error: unknown) {
                console.error('Error fetching bookings', error);
                if (error instanceof Error) {
                    setError(error.message || 'Failed to fetch bookings');
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const groupedBookings = bookings.reduce((acc, booking) => {
        if (!acc[booking.storeName]) {
            acc[booking.storeName] = [];
        }
        acc[booking.storeName].push(booking);
        return acc;
    }, {} as Record<string, Booking[]>);

    const toggleStore = (storeName: string) => {
        const newExpandedStores = new Set(expandedStores);
        if (expandedStores.has(storeName)) {
            newExpandedStores.delete(storeName);
        } else {
            newExpandedStores.add(storeName);
        }
        setExpandedStores(newExpandedStores);
    };

    const expandAll = () => {
        setExpandedStores(new Set(Object.keys(groupedBookings)));
    };

    const collapseAll = () => {
        setExpandedStores(new Set());
    };

    const getStatusBadgeVariant = (
        status: BookingStatus,
    ): 'default' | 'secondary' | 'success' | 'destructive' | 'outline' => {
        switch (status) {
            case 'confirmed':
                return 'success';
            case 'pending':
                return 'secondary';
            case 'cancelled':
                return 'destructive';
            default:
                return 'default';
        }
    };

    const filteredGroupedBookings = Object.entries(groupedBookings)
        .filter(([storeName]) => storeName.toLowerCase().includes(searchQuery.toLowerCase()))
        .reduce((acc, [storeName, storeBookings]) => {
            const filteredBookings = storeBookings.filter(
                booking => statusFilter === 'all' || booking.status === statusFilter,
            );
            if (filteredBookings.length > 0) {
                acc[storeName] = filteredBookings;
            }
            return acc;
        }, {} as Record<string, Booking[]>);

    if (loading) {
        return <div className="p-4">Loading bookings...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="relative w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search stores or spots"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-4">
                    <Select
                        value={statusFilter}
                        onValueChange={value => setStatusFilter(value as BookingStatus | 'all')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={expandAll}
                    >
                        Expand All
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={collapseAll}
                    >
                        Collapse All
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg font-semibold">
                    <div className="col-span-4">Store</div>
                    <div className="col-span-2 text-center">Total Bookings</div>
                    <div className="col-span-6 text-right">Actions</div>
                </div>

                {Object.entries(filteredGroupedBookings).map(([storeName, storeBookings]) => (
                    <div
                        key={storeName}
                        className="border rounded-lg shadow-sm"
                    >
                        <div
                            className="grid grid-cols-12 gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleStore(storeName)}
                        >
                            <div className="col-span-4 flex items-center">
                                {expandedStores.has(storeName) ? (
                                    <ChevronUp className="mr-2 h-4 w-4" />
                                ) : (
                                    <ChevronDown className="mr-2 h-4 w-4" />
                                )}
                                {storeName}
                            </div>
                            <div className="col-span-2 text-center">{storeBookings.length}</div>
                            <div className="col-span-6 text-right text-sm text-gray-500">
                                {expandedStores.has(storeName)
                                    ? 'Click to collapse'
                                    : 'Click to expand'}
                            </div>
                        </div>

                        {expandedStores.has(storeName) && (
                            <div className="border-t">
                                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 text-sm font-medium">
                                    <div className="col-span-3">Spot</div>
                                    <div className="col-span-6">Dates</div>
                                    <div className="col-span-3 text-right">Status</div>
                                </div>
                                {storeBookings.map(booking => (
                                    <div
                                        key={booking.id}
                                        className="grid grid-cols-12 gap-4 px-4 py-3 border-t hover:bg-gray-50"
                                    >
                                        <div className="col-span-3">{booking.spot}</div>
                                        <div className="col-span-6">
                                            {new Date(booking.startDate).toLocaleDateString()} -{' '}
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-3 text-right">
                                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                                {booking.status.charAt(0).toUpperCase() +
                                                    booking.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupplierBookingsClient;
