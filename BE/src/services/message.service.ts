import { Message } from '../types/index.js';
import { randomUUID } from 'crypto';

class MessageService {
  private messages: Message[] = [];

  getMessagesByBooking(bookingId: string): Message[] {
    return this.messages
      .filter((m) => m.bookingId === bookingId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  addMessage(bookingId: string, customerId: string, message: string): Message {
    const newMessage: Message = {
      id: randomUUID(),
      bookingId,
      customerId,
      message,
      timestamp: new Date().toISOString(),
      sender: 'customer',
    };

    this.messages.push(newMessage);
    return newMessage;
  }

  getAllMessages(): Message[] {
    return this.messages;
  }
}

export const messageService = new MessageService();

