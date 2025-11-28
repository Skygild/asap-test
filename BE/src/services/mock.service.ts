import { Customer, Job, Attachment } from '../types/index.js';

export const mockCustomers: Customer[] = [
  {
    uuid: 'cust-001',
    email: 'john.doe@example.com',
    mobile: '0412345678',
    first_name: 'John',
    last_name: 'Doe',
    company_name: 'Doe Enterprises',
  },
  {
    uuid: 'cust-002',
    email: 'jane.smith@example.com',
    mobile: '0423456789',
    first_name: 'Jane',
    last_name: 'Smith',
    company_name: 'Smith & Co',
  },
];

export const mockJobs: Job[] = [
  {
    uuid: 'job-001',
    job_address: '123 Main St, Sydney NSW 2000',
    status: 'Completed',
    generated_job_id: 'JOB-2024-001',
    job_description: 'Plumbing repair - Kitchen sink leak',
    created_date: '2024-01-15T10:00:00Z',
    scheduled_date: '2024-01-20T09:00:00Z',
    completed_date: '2024-01-20T11:30:00Z',
  },
  {
    uuid: 'job-002',
    job_address: '123 Main St, Sydney NSW 2000',
    status: 'In Progress',
    generated_job_id: 'JOB-2024-002',
    job_description: 'Electrical inspection - Annual safety check',
    created_date: '2024-02-01T14:00:00Z',
    scheduled_date: '2024-02-10T10:00:00Z',
  },
  {
    uuid: 'job-003',
    job_address: '456 Oak Ave, Melbourne VIC 3000',
    status: 'Scheduled',
    generated_job_id: 'JOB-2024-003',
    job_description: 'HVAC maintenance - Air conditioning service',
    created_date: '2024-02-15T09:00:00Z',
    scheduled_date: '2024-03-01T13:00:00Z',
  },
];

export const mockAttachments: Attachment[] = [
  {
    uuid: 'att-001',
    related_object: 'Job',
    related_object_uuid: 'job-001',
    file_name: 'before_repair.jpg',
    file_path: '/attachments/before_repair.jpg',
    file_size: 245678,
    upload_date: '2024-01-20T09:15:00Z',
  },
  {
    uuid: 'att-002',
    related_object: 'Job',
    related_object_uuid: 'job-001',
    file_name: 'after_repair.jpg',
    file_path: '/attachments/after_repair.jpg',
    file_size: 298456,
    upload_date: '2024-01-20T11:45:00Z',
  },
  {
    uuid: 'att-003',
    related_object: 'Job',
    related_object_uuid: 'job-002',
    file_name: 'electrical_report.pdf',
    file_path: '/attachments/electrical_report.pdf',
    file_size: 512340,
    upload_date: '2024-02-10T10:30:00Z',
  },
];

class MockService {
  async getCustomerByEmailAndPhone(email: string, phone: string): Promise<Customer | null> {
    const customer = mockCustomers.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.mobile === phone
    );
    return customer || null;
  }

  async getJobsByCustomer(customerUuid: string): Promise<Job[]> {
    if (customerUuid === 'cust-001') {
      return mockJobs.filter((j) => ['job-001', 'job-002'].includes(j.uuid));
    }
    return mockJobs.filter((j) => j.uuid === 'job-003');
  }

  async getJobById(jobUuid: string): Promise<Job | null> {
    return mockJobs.find((j) => j.uuid === jobUuid) || null;
  }

  async getAttachmentsByJob(jobUuid: string): Promise<Attachment[]> {
    return mockAttachments.filter((a) => a.related_object_uuid === jobUuid);
  }
}

export const mockService = new MockService();

