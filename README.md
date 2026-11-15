# PawSync 🐾

A full-stack pet rescue and adoption platform built with React 18 + Vite (frontend) and Express + MongoDB (backend).

## Stack

- **Frontend**: React 18, Vite, CSS Modules
- **Backend**: Node.js, Express 4, MongoDB + Mongoose
- **Auth**: JWT (admin-only)
- **Password hashing**: bcryptjs

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017 (or set `MONGODB_URI` in `server/.env`)

### 1. Install frontend dependencies
```bash
npm install
```

### 2. Install backend dependencies
```bash
cd server && npm install
```

### 3. Configure environment
Copy `server/.env.example` to `server/.env` and fill in values (defaults work for local dev).

### 4. Seed the database
```bash
cd server && node seed.js
```
This inserts the 6 gallery pets and creates the default admin account.

### 5. Run both servers

Terminal 1 — backend:
```bash
npm run dev:server
```

Terminal 2 — frontend:
```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/pets | — | List pets (optional ?breed= ?location=) |
| GET | /api/pets/:id | — | Get one pet |
| POST | /api/pets | Admin JWT | Create pet |
| PUT | /api/pets/:id | Admin JWT | Update pet |
| DELETE | /api/pets/:id | Admin JWT | Delete pet |
| POST | /api/applications | — | Submit adoption application |
| GET | /api/applications | Admin JWT | List all applications |
| PUT | /api/applications/:id | Admin JWT | Approve / reject application |
| POST | /api/contact | — | Submit contact/support message |
| POST | /api/ngo/register | — | Submit NGO partnership application |
| GET | /api/ngo | Admin JWT | List NGO applications |
| POST | /api/auth/login | — | Admin login → JWT |
| POST | /api/chat | — | Rule-based adoption pre-screening chatbot |

## Admin Access

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"pawsync2024"}'
```

Use the returned `token` as `Authorization: Bearer <token>` for protected endpoints.

## Chat Bot

The `/api/chat` endpoint is fully rule-based (no external API). It runs a 6-step pre-screening interview and returns `{ reply, nextState, qualified }`.
