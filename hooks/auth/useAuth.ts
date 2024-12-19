import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export function useAuth() {
    const [user] = useState({ role: 'supplier', id: 'mock-user-id' });
    const loading = false;
    const router = useRouter();

    const login = async () => {};
    const signup = async () => {};
    const logout = () => {
        deleteCookie('token');
        router.push('/login');
    };

    return { user, login, signup, logout, loading };
}
