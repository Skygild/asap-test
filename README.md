# Customer Portal MVP

A full-stack Customer Portal proof-of-concept built with Next.js (frontend) and Express.js (backend) for ServiceM8 integration.

> **📚 New here?** Start with [QUICK_START.md](QUICK_START.md) to get running in 60 seconds, or see [INDEX.md](INDEX.md) for complete documentation guide.

## Project Structure

This is a monorepo containing:

- **FE/** - Next.js frontend application
- **BE/** - Express.js backend API server

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Setup Instructions

### 1. Install Dependencies

From the root directory, install all dependencies for both frontend and backend:

```bash
npm install
```

This will install dependencies for both workspaces automatically.

### 2. Configure Backend Environment

Copy the example environment file and configure your ServiceM8 API credentials:

```bash
cd BE
cp env.example .env
```

Edit `BE/.env` and add your ServiceM8 API credentials:

```
PORT=3001
SERVICEM8_API_KEY=your_api_key_here
SERVICEM8_API_SECRET=your_api_secret_here
SERVICEM8_BASE_URL=https://api.servicem8.com
```

### 3. Run the Application

#### Option A: Run Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend server on `http://localhost:3000`

#### Option B: Run Separately

**Backend only:**
```bash
npm run dev:be
```

**Frontend only:**
```bash
npm run dev:fe
```

## Development

- Frontend: Next.js 14 with TypeScript, App Router
- Backend: Express.js with TypeScript and ES modules
- API Integration: ServiceM8 REST API

## Build for Production

```bash
npm run build
```

## Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions and troubleshooting
- **TECH_NOTES.md** - Technical implementation details and architecture decisions
- **DELIVERABLES.md** - Complete summary of deliverables and features

## Demo Credentials

```
Email: john.doe@example.com
Phone: 0412345678
```

Or:

```
Email: jane.smith@example.com
Phone: 0423456789
```

## Features

✅ Customer authentication (email + phone)
✅ View list of bookings
✅ View booking details
✅ View file attachments
✅ Send and view messages

## Project Status

✅ **Complete** - All functional requirements implemented and tested.

See `TECH_NOTES.md` for implementation details, assumptions, and potential improvements.
