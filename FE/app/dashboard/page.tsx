'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, bookingsApi } from '@/lib/api';
import { Booking, Customer } from '@/lib/types';
import { formatDate, getStatusColor } from '@/lib/utils';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const customerData = authApi.getCustomer();
    setCustomer(customerData);

    loadBookings();
  }, [router]);

  const loadBookings = async () => {
    try {
      const data = await bookingsApi.getAll();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>My Bookings</h1>
            {customer && (
              <p className={styles.welcome}>
                Welcome, {customer.first_name} {customer.last_name}
              </p>
            )}
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

        {bookings.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No bookings found</p>
          </div>
        ) : (
          <div className={styles.bookingsList}>
            {bookings.map((booking) => (
              <Link
                key={booking.uuid}
                href={`/bookings/${booking.uuid}`}
                className={styles.bookingCard}
              >
                <div className={styles.bookingHeader}>
                  <h3 className={styles.bookingId}>{booking.generated_job_id}</h3>
                  <span
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className={styles.bookingDescription}>{booking.job_description}</p>
                <p className={styles.bookingAddress}>{booking.job_address}</p>
                <div className={styles.bookingFooter}>
                  <span className={styles.date}>
                    Created: {formatDate(booking.created_date)}
                  </span>
                  {booking.scheduled_date && (
                    <span className={styles.date}>
                      Scheduled: {formatDate(booking.scheduled_date)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

