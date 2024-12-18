import { useState } from 'react';

export function useAuth() {
    const [user] = useState({ role: 'supplier', id: 'mock-user-id' });
    const loading = false;

    const login = async () => {};
    const signup = async (email: string, password: string, name: string, p0: string) => {};
    const logout = () => {};

    return { user, login, signup, logout, loading };
}
