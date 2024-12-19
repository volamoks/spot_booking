'use client';

import { useState } from 'react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from 'hooks/ui/use-toast';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                toast({
                    title: 'Success',
                    description: 'Logged in successfully',
                });
                router.push('/');
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Invalid credentials',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Логин</Button>
        </form>
    );
}
