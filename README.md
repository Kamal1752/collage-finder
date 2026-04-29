# 🎓 CollegeFinder India

A full-stack college discovery platform built for the Unstop Internship Task.

## Features
- ✅ College Listing + Search + Filters
- ✅ College Detail Page (Courses, Placements, Reviews)
- ✅ Compare Colleges (side-by-side)
- ✅ Auth (Login/Register) + Saved Colleges

## Tech Stack
- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Node.js + TypeScript + Express
- **Database**: PostgreSQL

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm run build
# Run DB migrations
npx ts-node src/migrate.ts
# Seed Indian college data
npx ts-node src/seed.ts
# Start backend
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health
