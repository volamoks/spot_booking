'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/ui/use-toast';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    // const [role, setRole] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                variant: 'destructive',
            });
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, company, role: 'supplier' }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'User registered successfully',
                });
                router.push('/');
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Something went wrong',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error registering user:', error);
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
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
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
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
            />
            <Input
                type="text"
                placeholder="Company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                required
            />
            {/* <Input
                type="text"
                placeholder="Role"
                value={role}
                onChange={e => setRole(e.target.value)}
                required
            /> */}
            <Button type="submit">Регистрация</Button>
        </form>
    );
}
