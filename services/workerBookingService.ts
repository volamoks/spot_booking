async function getWorkerBookings() {
  try {
    const response = await fetch('/api/bookings');
    if (!response.ok) {
      throw new Error(`Failed to fetch worker bookings: ${response.status} ${response.statusText}`);
    }
    const bookings = await response.json();
    return bookings;
  } catch (error) {
    console.error('Error fetching worker bookings:', error);
    throw error;
  }
}

export { getWorkerBookings };
