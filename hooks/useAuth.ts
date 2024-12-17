'use client'

import { useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('supplier'); // Added state for current role
    const [loading, setLoading] = useState(false);
    const router = useRouter();


  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Simulating an API call to get the user
    const fetchUser = async () => {
      // In a real app, this would be an API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        role: currentRole, // Use the current role
        avatar: '/placeholder.svg?height=40&width=40',
      };
      setUser(mockUser);
    };

    if (!user) {
        fetchUser();
    }
  }, [currentRole, user]); // Re-fetch user when currentRole changes

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    // In a real app, this would call an API to log in
    console.log('Logging in with:', email, password, role);
    // For now, simulate a successful login
    const mockUser: User = {
        id: '1',
        name: 'John Doe',
        role: role,
        avatar: '/placeholder.svg?height=40&width=40',
      };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
    if (role === 'supplier') {
      router.push('/supplier/bookings');
    } else if (role === 'worker') {
      router.push('/worker/bookings');
    }
  };

    const signup = async (email: string, password: string, name: string, role: UserRole) => {
        setLoading(true);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, role, password }),
            });

            if (!response.ok) {
                const message = await response.json();
                throw new Error(message.message || 'Failed to sign up');
            }

            const user = await response.json();
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error: unknown) {
            console.error('Signup failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

  const logout = () => {
    // In a real app, this would call an API to log out
    setUser(null);
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  // Function to toggle the role
  const toggleRole = () => {
    setCurrentRole(currentRole === 'supplier' ? 'worker' : 'supplier');
  };

      return { user, login, signup, logout, toggleRole, loading };
}
