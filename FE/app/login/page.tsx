'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, phone });

      if (response.success) {
        router.push('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Customer Portal</h1>
        <p className={styles.subtitle}>Sign in to view your bookings</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={styles.input}
              placeholder="0412345678"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.demoInfo}>
          <p className={styles.demoTitle}>Demo Credentials:</p>
          <p className={styles.demoText}>Email: john.doe@example.com</p>
          <p className={styles.demoText}>Phone: 0412345678</p>
        </div>
      </div>
    </div>
  );
}

