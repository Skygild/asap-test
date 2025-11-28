'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (authApi.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontSize: '18px',
      color: '#6b7280'
    }}>
      <p>Redirecting...</p>
    </main>
  );
}

