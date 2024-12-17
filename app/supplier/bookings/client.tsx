'use client';

import React, { useState, useEffect } from 'react';
import { Booking } from '@/types';

const SupplierBookingsClient = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {/* Display booking details here */}
              Booking ID: {booking.id}, 
              Start Date: {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}, 
              End Date: {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}, 
              Status: {booking.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default SupplierBookingsClient;
