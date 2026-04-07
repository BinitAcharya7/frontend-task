'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionSnapshot } from '@/lib/services/auth-service';

export default function ProtectedShell({ children }) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const snapshot = getSessionSnapshot();
    if (!snapshot.isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (isMountedRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsChecked(true);
    }
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
