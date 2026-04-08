'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getSessionSnapshot, loginUser } from '@/lib/services/auth-service';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (getSessionSnapshot().isAuthenticated) {
      router.replace('/');
    }
  }, [router]);

  async function onSubmit(values) {
    setServerError('');

    try {
      await loginUser(values);
      router.replace('/');
    } catch (error) {
      const rawMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        'Login failed';

      const message =
        rawMessage.toLowerCase() === 'invalid credentials'
          ? 'Invalid credentials.'
          : rawMessage;

      setServerError(message);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="bg-linear-to-r from-orange-400 via-amber-300 to-orange-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-300">Good to see you again.</p>
      </div>
      <Card className="w-full sm:max-w-xl border-b rounded-2xl bg-linear-120 from-gray-900 via-slate-700 to-gray-900 text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Use your registered credentials.</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Enter a valid email',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-slate-400">
            New here?{' '}
            <a href="/register" className="font-medium text-blue-700 underline">
              Create an account
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
