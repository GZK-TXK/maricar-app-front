# MariCar App

Full-stack car rental application built with React + Express + MongoDB.

## Stack

**Frontend:** React 19, Vite 8, React Router 8, Sass, flatpickr, SweetAlert2  
**Backend:** Express 5, Mongoose 9, bcryptjs, JWT, multer, nodemailer (Ethereal)  
**Database:** MongoDB

## Features

- **Public:** Car catalog, car detail with availability calendar, contact form with email
- **Auth:** Register/login with JWT, role-based access (admin/user)
- **Admin:** CRUD cars + users, image upload, date range blocking
- **User:** Dashboard with personal info and reservation list (future: full reservation CRUD)

## Setup

```bash
# Backend
cd maricar-app-back
cp .env.example .env  # set MONGO_URI, JWT_SECRET
npm install
npm run dev

# Frontend
cd maricar-app-front
cp .env.example .env  # set VITE_API_URLBASE
npm install
npm run dev
```

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing tokens |
| `JWT_EXPIRES_IN` | Token expiry (default: `1d`) |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URLBASE` | Backend API URL (e.g. `http://localhost:3000/api/v1`) |

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register user |
| POST | `/api/v1/auth/login` | No | Login |
| GET | `/api/v1/cars` | No | List cars |
| GET | `/api/v1/cars/:id` | No | Get car detail |
| POST | `/api/v1/cars` | Admin | Create car (multipart) |
| PUT | `/api/v1/cars/:id` | Admin | Update car (multipart) |
| DELETE | `/api/v1/cars/:id` | Admin | Delete car |
| GET/POST/PUT/DELETE | `/api/v1/users/*` | Admin | User CRUD |
| POST | `/api/v1/contact` | No | Send contact email |
