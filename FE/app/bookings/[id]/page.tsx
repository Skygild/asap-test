'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { authApi, bookingsApi, attachmentsApi, messagesApi } from '@/lib/api';
import { Booking, Attachment, Message } from '@/lib/types';
import { formatDate, formatFileSize, getStatusColor } from '@/lib/utils';
import styles from './booking.module.css';

export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadBookingData();
  }, [bookingId, router]);

  const loadBookingData = async () => {
    try {
      const [bookingData, attachmentsData, messagesData] = await Promise.all([
        bookingsApi.getById(bookingId),
        attachmentsApi.getByBooking(bookingId),
        messagesApi.getByBooking(bookingId),
      ]);

      setBooking(bookingData);
      setAttachments(attachmentsData);
      setMessages(messagesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const message = await messagesApi.send(bookingId, newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Booking not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/dashboard" className={styles.backButton}>
            ← Back to Bookings
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.bookingDetails}>
          <div className={styles.detailsHeader}>
            <div>
              <h1 className={styles.title}>{booking.generated_job_id}</h1>
              <p className={styles.description}>{booking.job_description}</p>
            </div>
            <span
              className={styles.status}
              style={{ backgroundColor: getStatusColor(booking.status) }}
            >
              {booking.status}
            </span>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Address</span>
              <span className={styles.detailValue}>{booking.job_address}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Created</span>
              <span className={styles.detailValue}>{formatDate(booking.created_date)}</span>
            </div>
            {booking.scheduled_date && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Scheduled</span>
                <span className={styles.detailValue}>{formatDate(booking.scheduled_date)}</span>
              </div>
            )}
            {booking.completed_date && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Completed</span>
                <span className={styles.detailValue}>{formatDate(booking.completed_date)}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Attachments</h2>
          {attachments.length === 0 ? (
            <p className={styles.emptyState}>No attachments available</p>
          ) : (
            <div className={styles.attachmentsList}>
              {attachments.map((attachment) => (
                <div key={attachment.uuid} className={styles.attachmentCard}>
                  <div className={styles.attachmentIcon}>📎</div>
                  <div className={styles.attachmentInfo}>
                    <p className={styles.attachmentName}>{attachment.file_name}</p>
                    <p className={styles.attachmentMeta}>
                      {formatFileSize(attachment.file_size)} • {formatDate(attachment.upload_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Messages</h2>
          <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
              <p className={styles.emptyState}>No messages yet. Start a conversation!</p>
            ) : (
              <div className={styles.messagesList}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.sender === 'customer' ? styles.messageCustomer : styles.messageSystem
                    }`}
                  >
                    <p className={styles.messageText}>{message.message}</p>
                    <span className={styles.messageTime}>{formatDate(message.timestamp)}</span>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className={styles.messageForm}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className={styles.messageInput}
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className={styles.sendButton}
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

