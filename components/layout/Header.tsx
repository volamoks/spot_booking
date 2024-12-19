'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { MoonIcon, SunIcon, BookmarkIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '../../hooks/auth/useAuth';
import { useEffect, useState } from 'react';

export function Header() {
    const pathname = usePathname();
    const { setTheme } = useTheme();
    const { user, logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        setMounted(true);
    }, []);

    const { theme } = useTheme();

    useEffect(() => {
        if (mounted) {
            setCurrentTheme(theme === 'light' ? 'light' : 'dark');
        }
    }, [theme, mounted]);

    const navItems =
        user?.role === 'supplier'
            ? [
                  { href: '/supplier', label: 'Book a Spot' },
                  { href: '/supplier/bookings', label: 'My Bookings' },
                  { href: '/supplier/profile', label: 'My Profile' },
              ]
            : [
                  { href: '/worker/dashboard', label: 'Dashboard' },
                  { href: '/worker/bookings', label: 'All Bookings' },
                  { href: '/worker/profile', label: 'My Profile' },
              ];

    return (
        <header className="bg-background border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="text-xl font-bold flex items-center"
                    >
                        <BookmarkIcon className="mr-2" />
                        DMP Booking
                    </Link>

                    <nav className="flex space-x-2">
                        {user
                            ? navItems.map(item => (
                                  <Button
                                      key={item.href}
                                      asChild
                                      variant={pathname === item.href ? 'default' : 'ghost'}
                                      size="sm"
                                  >
                                      <Link href={item.href}>{item.label}</Link>
                                  </Button>
                              ))
                            : null}
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
                    {user ? (
                        <>
                            <Button
                                onClick={logout}
                                size="sm"
                                variant="outline"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                            >
                                <Link href="/signup">Signup</Link>
                            </Button>
                        </>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        {currentTheme === 'light' ? (
                            <MoonIcon className="h-5 w-5" />
                        ) : (
                            <SunIcon className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
