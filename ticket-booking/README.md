# Ticket Booking System

A secure and atomic ticket booking system built with Express.js, Prisma, Redis, and TypeScript. The system ensures thread-safe booking operations using distributed locks and database transactions.

## Features

- 🔐 User Authentication (JWT)
- 🎫 Event & Seat Management
- 🔒 Atomic Booking Operations
- 📝 Distributed Locking with Redis
- 🗄️ PostgreSQL Database with Prisma ORM

## Prerequisites

- Bun
- Express.js
- PostgreSQL
- Redis

## Setup

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ticket_db"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
```

3. Run Prisma migrations:
```bash
bunx prisma generate
bunx prisma db push
```

4. Start the server:
```bash
bun run dev
```

## API Endpoints

### Authentication

#### Sign Up
```bash
POST /signup
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign In
```bash
POST /signin
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Events

#### Create Event
```bash
POST /events
Authorization: Bearer <token>
{
  "name": "Concert A",
  "seats": ["A1", "A2", "A3"]
}
```

#### List Events
```bash
GET /events
```

### Bookings

#### Book a Seat
```bash
POST /book
Authorization: Bearer <token>
{
  "seatId": "seat-uuid"
}
```

#### List Bookings
```bash
GET /bookings
```

## Atomicity & Concurrency

The system implements a robust two-layer approach to prevent duplicate bookings and ensure thread-safe operations:

### 1. Distributed Locking with Redis

The first layer uses Redis for distributed locking:

```typescript
const lockKey = `lock:seat:${seatId}`;
const lockTTL = 5000; // 5 seconds

// Try to acquire lock
const lock = await redis.set(lockKey, "locked", "PX", lockTTL, "NX");
if (!lock) {
  return res.status(423).json({ 
    success: false, 
    message: "Seat is being booked, try again." 
  });
}
```

- **How it works:**
  - When a booking request comes in, we first try to acquire a Redis lock
  - `NX` flag ensures the key is set only if it doesn't exist
  - `PX` sets TTL in milliseconds to auto-release stale locks
  - If lock acquisition fails, another concurrent request is processing
  - Lock is always released in a `finally` block to prevent deadlocks

### 2. Database Transactions with Prisma

The second layer uses Prisma transactions for data consistency:

```typescript
const booking = await prisma.$transaction(async (tx) => {
  // 1. Check if seat exists and is available
  const seat = await tx.seat.findUnique({
    where: { id: seatId },
    include: { booking: true }
  });

  if (seat.booking) {
    throw new Error("Seat already booked");
  }

  // 2. Create booking atomically
  return await tx.booking.create({
    data: { userId, seatId }
  });
});
```

- **How it works:**
  - All database operations run in a transaction
  - Transaction ensures seat check and booking creation are atomic
  - If seat is booked between check and create, transaction rolls back
  - Prevents race conditions at database level

### Flow of a Booking Request

1. **Request Received**
   - User sends booking request with seatId
   - JWT authentication verifies user

2. **Redis Lock**
   - Attempt to acquire distributed lock
   - If locked, return 423 (Resource Locked)
   - If acquired, proceed to transaction

3. **Database Transaction**
   - Start transaction
   - Check seat availability
   - Create booking if available
   - Commit transaction
   - If any step fails, rollback

4. **Lock Release**
   - Redis lock is released in finally block
   - Other requests can now attempt booking

This dual-layer approach ensures:
- No duplicate bookings
- Thread-safe operations
- Automatic cleanup of stale locks
- Data consistency even under high concurrency

## Error Handling

- 401: Unauthorized (invalid/missing token)
- 400: Bad Request (validation errors)
- 423: Locked (concurrent booking attempt)

## Schema

### User
- id: UUID
- email: String (unique)
- password: String (hashed)
- bookings: Booking[]

### Event
- id: UUID
- name: String
- seats: Seat[]

### Seat
- id: UUID
- seatNo: String
- eventId: UUID
- booking: Booking?

### Booking
- id: UUID
- userId: UUID
- seatId: UUID
- createdAt: DateTime