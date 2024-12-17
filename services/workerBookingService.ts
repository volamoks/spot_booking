async function getWorkerBookings() {
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

export { getWorkerBookings };
