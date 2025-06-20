# Chat App with Authentication

A real-time chat application with JWT-based authentication using Bun, PostgreSQL, and Drizzle ORM.

## Features

- 🔐 JWT Authentication (signup, signin, profile)
- 📝 User registration with email validation
- 🔒 Password hashing with bcryptjs
- 📊 PostgreSQL database with Drizzle ORM
- ⚡ Built with Bun for performance

## Setup

1. **Install dependencies:**
```bash
bun install
```

2. **Environment Variables:**
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/chatapp
JWT_SECRET=your_super_secret_jwt_key_here_please_change_in_production
PORT=3000
```

3. **Database Setup:**
```bash
# Generate migration files
bun run db:generate

# Run migrations
bun run db:migrate

# Optional: Open Drizzle Studio
bun run db:studio
```

4. **Run the server:**
```bash
bun run dev
```

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/signin`
Sign in an existing user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Signin successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Health Check

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing with curl

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get profile (replace TOKEN with actual JWT)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Database Schema

### Users Table
- `id` (integer, primary key, auto-increment)
- `name` (varchar, not null)
- `email` (varchar, unique, not null)
- `password` (varchar, hashed, not null)
- `createdAt` (timestamp, default now)

### Messages Table
- `id` (integer, primary key, auto-increment)
- `senderId` (integer, foreign key to users.id)
- `receiverId` (integer, foreign key to users.id)
- `content` (text, not null)
- `sentAt` (timestamp, default now)
- `isRead` (boolean, default false)

## Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT tokens with 24-hour expiration
- ✅ Email format validation
- ✅ Password length validation (minimum 6 characters)
- ✅ Proper error handling without information leakage
- ✅ CORS headers for frontend integration

## Next Steps

- Add real-time messaging with WebSockets
- Implement message CRUD operations
- Add conversation management
- Add user search functionality
- Implement message pagination
