import prisma from './prismaService';

async function getBookingRequests() {
  // In a real app, this would be an API call
  return [
    {
      id: 1,
      storeId: 1,
      workerId: 1,
      date: '2024-07-20',
      startTime: '10:00',
      endTime: '12:00',
      status: 'pending',
    },
    {
      id: 2,
      storeId: 1,
      workerId: 2,
      date: '2024-07-21',
      startTime: '14:00',
      endTime: '16:00',
      status: 'confirmed',
    },
  ]
}

async function createBookingRequest(zoneId: string, startDate: Date, endDate: Date) {
  try {
    const response = await fetch('/api/booking-requests', {
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
