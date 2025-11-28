export interface Customer {
  uuid: string;
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  company_name?: string;
}

export interface Job {
  uuid: string;
  job_address: string;
  status: string;
  generated_job_id: string;
  job_description: string;
  created_date: string;
  scheduled_date?: string;
  completed_date?: string;
}

export interface Attachment {
  uuid: string;
  related_object: string;
  related_object_uuid: string;
  file_name: string;
  file_path: string;
  file_size: number;
  upload_date: string;
}

export interface Message {
  id: string;
  bookingId: string;
  customerId: string;
  message: string;
  timestamp: string;
  sender: 'customer' | 'system';
}

export interface LoginRequest {
  email: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  customer?: Customer;
  token?: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

