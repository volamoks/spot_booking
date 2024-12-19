import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Authentication</h1>
      <div className="flex flex-row gap-10">
        <div className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <LoginForm />
        </div>
        <div className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
