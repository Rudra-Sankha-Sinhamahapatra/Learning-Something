# Website Uptime Monitoring API

A time-series database application for monitoring website uptime status using PostgreSQL and Prisma.

## Installation

To install dependencies:

```bash
bun install
```

## Setup

1. Configure your database connection in `.env`:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

2. Set up your database schema using Prisma:
```bash
npx prisma migrate dev
```

## Running the Application

To run the server:

```bash
bun run index.ts
# or
bun dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Insert Website Status

Add a new status record for a website.

**Endpoint:** `GET /insert`

**Parameters:**
- `website` (required): The website URL to monitor
- `status` (required): Website status (`up` or `down`)

**Examples:**

```bash
# Insert an "up" status
curl "http://localhost:3000/insert?website=https://example.com&status=up"

# Insert a "down" status  
curl "http://localhost:3000/insert?website=https://example.com&status=down"

# Insert status for multiple websites
curl "http://localhost:3000/insert?website=https://google.com&status=up"
curl "http://localhost:3000/insert?website=https://github.com&status=up"
curl "http://localhost:3000/insert?website=https://stackoverflow.com&status=down"
```

**Response:**
```
Inserted!
```

### 2. Get Website Statistics

Retrieve time-bucketed statistics for a website's uptime.

**Endpoint:** `GET /stats`

**Parameters:**
- `website` (required): The website URL to get statistics for

**Examples:**

```bash
# Get stats for a specific website
curl "http://localhost:3000/stats?website=https://example.com"

# Get stats for other websites
curl "http://localhost:3000/stats?website=https://google.com"
curl "http://localhost:3000/stats?website=https://github.com"
```

**Response:**
```json
[
  {
    "bucket": "2025-08-06T21:20:00.000Z",
    "total_count": "3",
    "up_count": "2",
    "down_count": "1",
    "statuses_found": "up, down"
  },
  {
    "bucket": "2025-08-06T21:25:00.000Z", 
    "total_count": "2",
    "up_count": "2",
    "down_count": "0",
    "statuses_found": "up"
  }
]
```

### 3. Delete Website Data

Remove all status records for a specific website.

**Endpoint:** `GET /delete`

**Parameters:**
- `website` (required): The website URL to delete all records for

**Examples:**

```bash
# Delete all records for a website
curl "http://localhost:3000/delete?website=https://example.com"

# Delete records for multiple websites
curl "http://localhost:3000/delete?website=https://old-site.com"
curl "http://localhost:3000/delete?website=https://test-site.com"
```

**Response:**
```json
{
  "deletedCount": 5,
  "website": "https://example.com"
}
```

### 4. Create User

Create a new user in the system.

**Endpoint:** `GET /user`

**Parameters:**
- `email` (required): User's email address
- `name` (required): User's name

**Examples:**

```bash
# Create a new user
curl "http://localhost:3000/user?email=john@example.com&name=John%20Doe"

# Create multiple users
curl "http://localhost:3000/user?email=alice@example.com&name=Alice%20Smith"
curl "http://localhost:3000/user?email=bob@example.com&name=Bob%20Johnson"
```

**Response:**
```json
{
  "id": "clm1234567890",
  "email": "john@example.com", 
  "name": "John Doe"
}
```

## Complete Workflow Example

Here's a complete workflow to test all functionality:

```bash
# 1. Start the server
bun run index.ts

# 2. Create some users
curl "http://localhost:3000/user?email=admin@example.com&name=Admin%20User"
curl "http://localhost:3000/user?email=monitor@example.com&name=Monitor%20User"

# 3. Insert website status data
curl "http://localhost:3000/insert?website=https://google.com&status=up"
curl "http://localhost:3000/insert?website=https://google.com&status=up" 
curl "http://localhost:3000/insert?website=https://google.com&status=down"
curl "http://localhost:3000/insert?website=https://github.com&status=up"
curl "http://localhost:3000/insert?website=https://github.com&status=up"

# 4. Check statistics
curl "http://localhost:3000/stats?website=https://google.com"
curl "http://localhost:3000/stats?website=https://github.com"

# 5. Clean up test data (optional)
curl "http://localhost:3000/delete?website=https://google.com"
curl "http://localhost:3000/delete?website=https://github.com"
```

## Data Format

The application stores data in 5-minute time buckets and provides:
- **bucket**: Time bucket (5-minute intervals)
- **total_count**: Total number of status checks in that bucket
- **up_count**: Number of "up" status checks
- **down_count**: Number of "down" status checks  
- **statuses_found**: Distinct status values found (for debugging)

## Technologies Used

- **Runtime**: Bun
- **Database**: PostgreSQL
- **ORM**: Prisma
- **HTTP Server**: Bun's built-in server

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
