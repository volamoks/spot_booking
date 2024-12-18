import BaseService from './baseService';

class WorkerBookingService extends BaseService {
    async getWorkerBookings() {
        return this.fetchData('/api/bookings');
    }
}

const workerBookingService = new WorkerBookingService();

export const { getWorkerBookings } = workerBookingService;
