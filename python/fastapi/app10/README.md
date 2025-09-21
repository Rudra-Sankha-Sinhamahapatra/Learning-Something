# FastAPI Auth Example

This project is a FastAPI application with user authentication (signup & signin) using PostgreSQL, SQLAlchemy, Pydantic, and bcrypt.

## Tech Stack

- **FastAPI**: Web framework for building APIs
- **SQLAlchemy**: ORM for database models and queries
- **PostgreSQL**: Database
- **Pydantic**: Data validation and serialization
- **bcrypt**: Password hashing
- **Uvicorn**: ASGI server

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/postgres
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

## Folder Structure

- `app/main.py` - FastAPI app entry point
- `app/models/user.py` - SQLAlchemy user model
- `app/schemas/user.py` - Pydantic user schemas
- `app/routes/user.py` - API routes for user
- `app/controllers/auth.py` - Signup/signin logic
- `app/db/database.py` - Database setup
- `app/db/operations/user.py` - User DB operations

## Notes

- Passwords are hashed with bcrypt before storing in the database.
- All environment variables are loaded from `.env` using python-dotenv.
- You can test endpoints using Swagger UI at `/docs`.

---
**Author:** Rudra Sankha Sinhamahapatra
