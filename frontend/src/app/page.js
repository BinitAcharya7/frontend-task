'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionSnapshot, logoutUser } from '@/lib/services/auth-service';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const session = getSessionSnapshot();

    if (!session.isAuthenticated) {
      router.replace('/login');
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await logoutUser();
    } finally {
      router.replace('/login');
    }
  }

  if (checkingAuth) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <p className="text-slate-600">Checking your session...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-6">
      <div className="w-full rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome </h1>
        <p className="mt-2 text-slate-600">You are authenticated.</p>

        <Button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-6"
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </main>
  );
}
