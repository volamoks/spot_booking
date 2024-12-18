const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

class BaseService {
    protected getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                return userData.token;
            }
        }
        return null;
    }

    protected getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = this.getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    async fetchData(url: string, options?: RequestInit) {
        try {
            const defaultOptions: RequestInit = {
                headers: this.getHeaders(),
            };

            const mergedOptions: RequestInit = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...(options?.headers || {}),
                },
            };

            const response = await fetch(`${baseUrl}${url}`, mergedOptions);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message || 
                    `Failed to fetch data: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default BaseService;
