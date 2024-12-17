'use client'

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role === 'supplier') {
      router.push('/supplier');
    } else if (user.role === 'worker') {
      router.push('/worker');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to ASP Booking</h1>
      {/* Removed buttons */}
    </div>
  );
}
