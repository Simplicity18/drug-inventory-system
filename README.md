# Drug Inventory & Supply Chain Management System

Complete full-stack web application for medicine inventory, low-stock automation, supplier management, fake medicine detection, and reporting.

## Tech Stack
- **Frontend:** React + Vite + Axios + CSS
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB
- **Auth (optional):** JWT login/register APIs

## Project Structure
```
/backend
  /scripts
  /src
    /config
    /controllers
    /middleware
    /models
    /routes
    /services
    /utils
/frontend
  /src
    /components
    /styles
```

## Backend Setup
1. Go to backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Start MongoDB locally (or point `MONGO_URI` to cloud MongoDB).
5. Seed sample data:
   ```bash
   npm run seed
   ```
6. Start backend:
   ```bash
   npm run dev
   ```

Backend runs on `http://localhost:5000`.

## Frontend Setup
1. Open a new terminal and go to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure API URL:
   ```bash
   echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173`.

## Core API Endpoints
- `GET/POST/PUT/DELETE /api/medicines`
- `GET/POST/PUT/DELETE /api/suppliers`
- `GET/POST /api/orders`
- `PATCH /api/orders/:id/status`
- `POST /api/fake-detection/verify`
- `GET /api/fake-detection/reports`
- `GET /api/dashboard/summary`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Automation Implemented
- On medicine create/update:
  - Batch + manufacturer validation against trusted registry.
  - If invalid: marked `FAKE` and report added in `FakeReport`.
  - If stock below threshold: order auto-created with `PENDING` status.

## Sample Login
After seeding:
- Email: `admin@druginventory.com`
- Password: `admin123`

## Bonus Implemented
- Optional JWT authentication APIs.
- Low-stock reorder simulation logged on backend console.
