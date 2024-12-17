'use client'

import { useState, useEffect } from 'react';
import { User } from '@/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulating an API call to get the user
    const fetchUser = async () => {
      // In a real app, this would be an API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        role: 'supplier',
        avatar: '/placeholder.svg?height=40&width=40',
      };
      setUser(mockUser);
    };

    fetchUser();
  }, []);

  const logout = () => {
    // In a real app, this would call an API to log out
    setUser(null);
  };

  return { user, logout };
}

