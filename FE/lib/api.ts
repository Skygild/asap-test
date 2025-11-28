import { 
  AuthResponse, 
  LoginRequest, 
  ApiResponse, 
  Booking, 
  Attachment, 
  Message 
} from './types';

const API_BASE_URL = '/api';

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('customer');
  }
};

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }

  return response.json();
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetchWithAuth<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      setAuthToken(response.token);
      if (response.customer) {
        localStorage.setItem('customer', JSON.stringify(response.customer));
      }
    }

    return response;
  },

  logout: (): void => {
    clearAuthToken();
  },

  getCustomer: () => {
    if (typeof window === 'undefined') return null;
    const customerStr = localStorage.getItem('customer');
    return customerStr ? JSON.parse(customerStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },
};

export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const response = await fetchWithAuth<ApiResponse<Booking[]>>('/bookings');
    return response.data || [];
  },

  getById: async (id: string): Promise<Booking | null> => {
    const response = await fetchWithAuth<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data || null;
  },
};

export const attachmentsApi = {
  getByBooking: async (bookingId: string): Promise<Attachment[]> => {
    const response = await fetchWithAuth<ApiResponse<Attachment[]>>(
      `/attachments/booking/${bookingId}`
    );
    return response.data || [];
  },
};

export const messagesApi = {
  getByBooking: async (bookingId: string): Promise<Message[]> => {
    const response = await fetchWithAuth<ApiResponse<Message[]>>(
      `/messages/booking/${bookingId}`
    );
    return response.data || [];
  },

  send: async (bookingId: string, message: string): Promise<Message> => {
    const response = await fetchWithAuth<ApiResponse<Message>>(
      `/messages/booking/${bookingId}`,
      {
        method: 'POST',
        body: JSON.stringify({ message }),
      }
    );

    if (!response.data) {
      throw new Error('Failed to send message');
    }

    return response.data;
  },
};

