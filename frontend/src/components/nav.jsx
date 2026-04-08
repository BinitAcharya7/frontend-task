'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getSessionSnapshot, logoutUser } from '@/lib/services/auth-service';

export default function Nav() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const snapshot = getSessionSnapshot();

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await logoutUser();
    } finally {
      router.replace('/login');
    }
  }

  return (
    <nav className="w-full border-b border-purple-800 bg-purple-700 text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-purple-100">
            Session
          </p>
          <p className="text-sm font-medium text-white">
            {snapshot.email || 'Logged in user'}
          </p>
        </div>
        <Button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          variant="secondary"
          className="bg-white text-purple-700 hover:bg-purple-100"
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </nav>
  );
}
