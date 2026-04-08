'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionSnapshot } from '@/lib/services/auth-service';

export default function ProtectedShell({ children }) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const snapshot = getSessionSnapshot();
    if (!snapshot.isAuthenticated) {
      router.replace('/login');
      return;
    }
    setIsChecked(true);
  }, [router]);

  if (!isChecked) {
    return (
      <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
        <p className="text-muted-foreground">Checking your session...</p>
      </main>
    );
  }

  return <>{children}</>;
}
