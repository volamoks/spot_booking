import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { User } from '../../types/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);


    const login = async () => {};
    const signup = async () => {};
    const logout = () => {
        localStorage.removeItem('user');
        deleteCookie('token');
        router.push('/login');
    };

    return { user, login, signup, logout, loading };
}
