import { config, isServiceM8Configured } from '../config/index.js';
import { Customer, Job, Attachment } from '../types/index.js';

class ServiceM8Service {
  private baseUrl: string;
  private authHeader: string;

  constructor() {
    this.baseUrl = config.servicem8.baseUrl;
    const credentials = Buffer.from(
      `${config.servicem8.apiKey}:${config.servicem8.apiSecret}`
    ).toString('base64');
    this.authHeader = `Basic ${credentials}`;
  }

  private async request<T>(endpoint: string): Promise<T> {
    if (!isServiceM8Configured()) {
      throw new Error('ServiceM8 API credentials not configured');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: this.authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ServiceM8 API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCustomerByEmailAndPhone(email: string, phone: string): Promise<Customer | null> {
    try {
      const customers = await this.request<Customer[]>('/company.json');
      
      const customer = customers.find(
        (c) => c.email.toLowerCase() === email.toLowerCase() && c.mobile === phone
      );

      return customer || null;
    } catch (error) {
      console.error('ServiceM8 API error:', error);
      return null;
    }
  }

  async getJobsByCustomer(customerUuid: string): Promise<Job[]> {
    try {
      const jobs = await this.request<Job[]>(`/job.json?%24filter=company_uuid%20eq%20%27${customerUuid}%27`);
      return jobs;
    } catch (error) {
      console.error('ServiceM8 API error:', error);
      return [];
    }
  }

  async getJobById(jobUuid: string): Promise<Job | null> {
    try {
      const job = await this.request<Job>(`/job.json/${jobUuid}`);
      return job;
    } catch (error) {
      console.error('ServiceM8 API error:', error);
      return null;
    }
  }

  async getAttachmentsByJob(jobUuid: string): Promise<Attachment[]> {
    try {
      const attachments = await this.request<Attachment[]>(
        `/attachment.json?%24filter=related_object_uuid%20eq%20%27${jobUuid}%27`
      );
      return attachments;
    } catch (error) {
      console.error('ServiceM8 API error:', error);
      return [];
    }
  }
}

export const servicem8Service = new ServiceM8Service();

