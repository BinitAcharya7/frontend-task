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
    <nav className="mb-6 flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-card-foreground">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Session
        </p>
        <p className="text-sm font-medium">
          {snapshot.email || 'Logged in user'}
        </p>
      </div>
      <Button type="button" onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? 'Logging out...' : 'Logout'}
      </Button>
    </nav>
  );
}
