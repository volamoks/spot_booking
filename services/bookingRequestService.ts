import BaseService from './baseService';

class BookingRequestService extends BaseService {
    async getBookingRequests() {
        return this.fetchData('/api/bookings');
    }

    async createBookingRequest(zoneId: string, startDate: Date, endDate: Date) {
        try {
            const response = await fetch(`/api/booking-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ zoneId, startDate, endDate }),
            });

            if (!response.ok) {
                const error = await response.json();
                return {
                    success: false,
                    message: error.message || 'Failed to create booking request',
                };
            }

            const data = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Error creating booking request', error);
            if (error instanceof Error) {
                return {
                    success: false,
                    message: error.message || 'Failed to create booking request',
                };
            }
            return {
                success: false,
                message: 'Failed to create booking request',
            };
        }
    }
}

const bookingRequestService = new BookingRequestService();

export const { getBookingRequests, createBookingRequest } = bookingRequestService;
