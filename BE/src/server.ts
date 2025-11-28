import express, { Request, Response } from 'express';
import cors from 'cors';
import { config, isServiceM8Configured } from './config/index.js';
import authRoutes from './routes/auth.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import attachmentsRoutes from './routes/attachments.routes.js';
import messagesRoutes from './routes/messages.routes.js';

const app = express();
const PORT: number = config.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running',
    servicem8Configured: isServiceM8Configured(),
    mode: isServiceM8Configured() ? 'ServiceM8 API' : 'Mock Data'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/attachments', attachmentsRoutes);
app.use('/api/messages', messagesRoutes);

app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    message: 'Customer Portal API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      bookings: '/api/bookings',
      attachments: '/api/attachments',
      messages: '/api/messages'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Mode: ${isServiceM8Configured() ? 'ServiceM8 API' : 'Mock Data'}`);
  if (!isServiceM8Configured()) {
    console.log('⚠️  ServiceM8 API not configured - using mock data');
    console.log('Test credentials: john.doe@example.com / 0412345678');
  }
});

