'use client';

import { useState } from 'react';
import LoginForm from '@/components/features/Login/LoginForm';
import RegisterForm from '@/components/features/Login/RegisterForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-6">Вход в систему</h1>
            <div className="flex flex-col items-center border p-4 rounded-md">
                <div className="flex gap-4 mb-4"></div>
                {showLogin ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Логин</h2>
                        <LoginForm />
                        <div className="flex justify-center items-center w-full mt-4 ">
                            <p className=" text-xs">Нет учетной записи?</p>
                            <Button
                                className="text-xs hover:text-blue-700"
                                variant={showLogin ? 'ghost' : 'default'}
                                onClick={() => setShowLogin(false)}
                            >
                                Регистрация
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Регистрация</h2>
                        <RegisterForm />
                        <div className="flex justify-center items-center w-full mt-4 ">
                            <p className=" text-xs">Уже зарегистрированы?</p>
                            <Button
                                className="text-xs hover:text-blue-700"
                                variant={showLogin ? 'outline' : 'ghost'}
                                onClick={() => setShowLogin(true)}
                            >
                                Логин
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
