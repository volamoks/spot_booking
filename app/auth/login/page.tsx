'use client';

import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { UserRole } from '../../../types/user';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password, 'supplier' as UserRole);
        // After successful login, redirect to the appropriate page
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="mt-4 text-sm text-center">
                    <Link href="/auth/signup" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
