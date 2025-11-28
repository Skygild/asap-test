# 🚀 Quick Start Guide

## Get Running in 60 Seconds

```bash
# 1. Install dependencies (30 seconds)
npm install

# 2. Start the application (instant)
npm run dev

# 3. Open your browser
# http://localhost:3000
```

## 🔑 Login Credentials

```
Email: john.doe@example.com
Phone: 0412345678
```

## ✅ What You'll See

1. **Login Page** - Enter credentials above
2. **Dashboard** - See 2 bookings
3. **Click a Booking** - View full details
4. **Attachments** - See 2 files (for first booking)
5. **Messages** - Send a test message

## 📝 Test Flow

```
Login → Dashboard → Click "JOB-2024-001" → Scroll to Messages → Type "Test message" → Send
```

## 🌐 URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🛠️ Troubleshooting

**Port in use?**
```bash
# Kill the process or change port in BE/.env
PORT=3002
```

**Dependencies fail?**
```bash
# Install separately
cd BE && npm install
cd ../FE && npm install
```

**Need help?**
- See `SETUP_GUIDE.md` for detailed instructions
- See `TECH_NOTES.md` for technical details
- See `README.md` for overview

## 🎯 Key Files

- `BE/src/server.ts` - Backend entry point
- `FE/app/page.tsx` - Frontend entry point
- `BE/env.example` - Environment config
- `package.json` - Workspace config

## 📚 Full Documentation

1. **README.md** - Main overview
2. **SETUP_GUIDE.md** - Detailed setup
3. **TECH_NOTES.md** - Technical docs
4. **DELIVERABLES.md** - Features summary
5. **PROJECT_SUMMARY.md** - Complete summary

## 🎉 That's It!

Your Customer Portal MVP is ready to use. All features are functional and the app works with mock data out of the box.

To connect to real ServiceM8 API, just add credentials to `BE/.env`.

**Enjoy!** 🚀

