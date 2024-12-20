'use client';

import { useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

export default function Home() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        router.push('/' + user.role);
    }, [user, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-8">Welcome to ASP Booking</h1>
            {/* Removed buttons */}
        </div>
    );
}
