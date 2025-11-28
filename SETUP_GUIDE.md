# Customer Portal MVP - Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for both frontend and backend workspaces.

### 2. Configure Backend (Optional)

If you have ServiceM8 API credentials:

```bash
cd BE
cp env.example .env
```

Edit `BE/.env` and add your credentials. If you skip this step, the app will use mock data.

### 3. Run the Application

```bash
npm run dev
```

This starts both servers:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

### 4. Login

Open http://localhost:3000 and use these demo credentials:

```
Email: john.doe@example.com
Phone: 0412345678
```

## Features Available

✅ **Customer Login** - Email + phone authentication
✅ **View Bookings** - List of all customer bookings
✅ **Booking Details** - Complete job information
✅ **File Attachments** - View attached files with metadata
✅ **Messaging** - Send and view messages for each booking

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and phone

### Bookings
- `GET /api/bookings` - Get all bookings (requires auth)
- `GET /api/bookings/:id` - Get booking details (requires auth)

### Attachments
- `GET /api/attachments/booking/:bookingId` - Get attachments (requires auth)

### Messages
- `GET /api/messages/booking/:bookingId` - Get messages (requires auth)
- `POST /api/messages/booking/:bookingId` - Send message (requires auth)

### Health Check
- `GET /health` - Server health status

## Testing with Mock Data

The application includes comprehensive mock data:

**Customer 1:**
- Email: john.doe@example.com
- Phone: 0412345678
- Bookings: 2 jobs (1 completed, 1 in progress)

**Customer 2:**
- Email: jane.smith@example.com
- Phone: 0423456789
- Bookings: 1 scheduled job

## Project Structure

```
asap-test/
├── BE/                          # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── config/             # Configuration
│   │   ├── middleware/         # Auth middleware
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── types/              # TypeScript types
│   │   └── server.ts           # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── FE/                          # Frontend (Next.js + TypeScript)
│   ├── app/                    # Next.js App Router
│   │   ├── bookings/[id]/     # Booking details page
│   │   ├── dashboard/         # Bookings list page
│   │   ├── login/             # Login page
│   │   └── page.tsx           # Root redirect
│   ├── lib/                    # Utilities
│   │   ├── api.ts             # API client
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Helper functions
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                # Root workspace config
├── README.md                   # Main documentation
├── TECH_NOTES.md              # Technical details
└── SETUP_GUIDE.md             # This file
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**Backend:**
```bash
# Edit BE/.env
PORT=3002
```

**Frontend:**
```bash
# Run on different port
cd FE
PORT=3001 npm run dev
```

### Dependencies Not Installing

Try installing workspaces individually:

```bash
cd BE && npm install
cd ../FE && npm install
```

### TypeScript Errors

Ensure you're using Node.js 18+ and TypeScript 5+:

```bash
node --version  # Should be >= 18
npx tsc --version  # Should be >= 5
```

## Development Commands

```bash
# Run both servers
npm run dev

# Run backend only
npm run dev:be

# Run frontend only
npm run dev:fe

# Build for production
npm run build

# Type check backend
cd BE && npm run type-check
```

## Production Deployment

### Backend

```bash
cd BE
npm run build
npm start
```

### Frontend

```bash
cd FE
npm run build
npm start
```

## Next Steps

1. ✅ Test the login flow
2. ✅ Browse bookings on the dashboard
3. ✅ Click a booking to view details
4. ✅ View attachments
5. ✅ Send a message

## Support

For issues or questions, refer to:
- `README.md` - Overview and setup
- `TECH_NOTES.md` - Technical implementation details
- Backend logs in terminal
- Browser console for frontend errors

