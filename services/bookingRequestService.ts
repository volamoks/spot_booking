async function getBookingRequests() {
    try {
        const response = await fetch(`/api/bookings`);
        if (!response.ok) {
            throw new Error(`Failed to fetch booking requests: ${response.status} ${response.statusText}`);
        }
        const bookings = await response.json();
        return bookings;
    } catch (error) {
        console.error('Error fetching booking requests:', error);
        throw error;
    }
}

async function createBookingRequest(zoneId: string, startDate: Date, endDate: Date) {
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

export { getBookingRequests, createBookingRequest };
