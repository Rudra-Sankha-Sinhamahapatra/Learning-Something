# AI Ticket Resolver 

This project is a FastAPI application with user authentication and a ticketing system.
It integrates AI (via Groq API) to automatically answer user tickets in the background.

## Tech Stack

- **FastAPI**: Web framework for building APIs
- **SQLAlchemy**: ORM for database models and queries
- **PostgreSQL**: Database
- **Pydantic**: Data validation and serialization
- **bcrypt**: Password hashing
- **Uvicorn**: ASGI server
- **Alembic**: Database migrations
- **JWT**: Authentication middleware
- **Groq API**:  AI model integration (LLaMA, Qwen, etc.)

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/postgres
GROQ_API_KEY=your_groq_api_key_here
PORT=8000
```

## Installation

1. Create and activate a virtual environment:
	 ```bash
	 python -m venv .venv
	 source .venv/bin/activate
	 ```
2. Install dependencies:
	 ```bash
	 pip install -r requirements.txt
	 # Or, if requirements.txt is missing:
	 pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic "pydantic[email]" python-dotenv bcrypt
	 ```

## Database Setup

- Ensure PostgreSQL is running and accessible.

- Initialize Alembic:

```
alembic revision --autogenerate -m "init"
alembic upgrade head
```


This applies your models (Users, Tickets) to the database.

## How to Run

1. Make sure PostgreSQL is running and your `DATABASE_URL` is correct.
2. Run the server from the project root:
	 ```bash
	 uvicorn app.main:app --reload --port 8000
	 # Or use your PORT from .env:
	 export $(cat .env | xargs)
	 uvicorn app.main:app --reload --port $PORT
	 ```
3. Visit [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive API docs.

## API Endpoints

### Signup

**POST** `/api/v1/auth/signup`

Request body (JSON):
```json
{
	"name": "Rudra",
	"email": "rudra@gmail.com",
	"password": "Rudra123"
}
```

Response:
```json
{
	"id": 1,
	"name": "Rudra",
	"email": "rudra@gmail.com"
}
```

### Signin

**POST** `/api/v1/auth/signin`

Request body (JSON):
```json
{
	"email": "rudra@gmail.com",
	"password": "Rudra123"
}
```

Response:
```json
{
	"id": 1,
	"name": "Rudra",
	"email": "rudra@gmail.com"
}
```

## Ticket System

- Tickets are created with status = PENDING and answered by AI in the background.

Create Ticket

**POST** `/api/v1/tickets/create`
Headers: `Authorization: Bearer <JWT_TOKEN>`

Request:
```json
{
  "question": "How to upgrade to the pro plan?"
}
```

Immediate Response:

```json
{
  "id": "uuid",
  "question": "How to upgrade to the pro plan?",
  "answer": null,
  "status": "PENDING",
  "created_at": "...",
  "updated_at": "..."
}
```

Later, AI fills in the answer automatically.

### Get All Tickets

**GET**  `/api/v1/tickets/getall`

### Get Ticket By Id

**GET** `/api/v1/tickets/get/{ticket_id}`

### Update Ticket

**PUT** `/api/v1/tickets/update/{ticket_id}`

### Delete Ticket

**DELETE** `/api/v1/tickets/delete/{ticket_id}`


## AI Integration

* AI is powered by **Groq API** models.
* Current fallback models:

  * `groq/compound`
  * `moonshotai/kimi-k2-instruct-0905`
  * `meta-llama/llama-guard-4-12b`
  * `qwen/qwen3-32b`

The assistant runs with a **system instruction**:

> "You are an AI support assistant for our platform **w8w**, an automated workflow platform similar to n8n.
> Help users with integrations, automations, troubleshooting, and best practices. Be concise and professional."


## Folder Structure


```
app/
  main.py               # FastAPI entry point
  models/               # SQLAlchemy models (User, Ticket)
  schemas/              # Pydantic schemas
  routes/               # API routes
  controllers/          # Business logic
  db/
    database.py         # DB connection
    operations/         # Queries & operations
  core/
    ai.py               # Groq AI integration
    jwt.py              # Auth/JWT utils
  middleware/
    auth.py             # JWT-based auth middleware
alembic/                # Migrations
alembic.ini             # Alembic config
```

## Notes

- Passwords are hashed with bcrypt before storing in the database.
- All environment variables are loaded from `.env` using python-dotenv.
- You can test endpoints using Swagger UI at `/docs`.
-  AI answers tickets asynchronously using **BackgroundTasks**.
-  **Alembic** handles schema changes (`created_at`, `updated_at`, etc.).

---
**Author:** Rudra Sankha Sinhamahapatra
