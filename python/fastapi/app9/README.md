# FastAPI CRUD Application

A simple REST API built with FastAPI that demonstrates CRUD (Create, Read, Update, Delete) operations on Items using SQLAlchemy ORM and SQLite database.

## Features

- ✅ **FastAPI** - Modern, fast web framework for building APIs
- ✅ **SQLAlchemy** - Python SQL toolkit and ORM
- ✅ **Pydantic v2** - Data validation using Python type annotations
- ✅ **SQLite** - Lightweight database (default)
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete items
- ✅ **Interactive API Documentation** - Auto-generated with Swagger UI
- ✅ **Type Hints** - Full type safety throughout the application

## Project Structure

```
app9/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application and route definitions
│   ├── database.py      # Database configuration and session management
│   ├── models.py        # SQLAlchemy database models
│   ├── schemas.py       # Pydantic models for request/response validation
│   └── crud.py          # Database operations (Create, Read, Update, Delete)
├── requirements.txt     # Python dependencies
├── .gitignore          # Git ignore file
├── .venv/              # Virtual environment
└── README.md           # This file
```

## Prerequisites

- Python 3.7+
- pip (Python package installer)

## Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd python/fastapi/app9
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv .venv
   
   # On macOS/Linux:
   source .venv/bin/activate
   
   # On Windows:
   .venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Access the application:**
   - API: http://127.0.0.1:8000
   - Interactive Documentation: http://127.0.0.1:8000/docs
   - Alternative Documentation: http://127.0.0.1:8000/redoc

## API Endpoints

### Items CRUD Operations

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/` | Root endpoint | None | `{"msg": "Hello"}` |
| `GET` | `/items` | Get all items | None | `List[Item]` |
| `POST` | `/items` | Create new item | `ItemCreate` | `Item` |
| `PUT` | `/items/{item_id}` | Update existing item | `ItemCreate` | `Item` |
| `DELETE` | `/items/{item_id}` | Delete item | None | `Item` |

### Data Models

#### ItemCreate (Request)
```json
{
  "name": "string",
  "description": "string"
}
```

#### Item (Response)
```json
{
  "id": 1,
  "name": "string", 
  "description": "string"
}
```

## Usage Examples

### Using curl

1. **Create an item:**
   ```bash
   curl -X POST "http://127.0.0.1:8000/items" \
        -H "Content-Type: application/json" \
        -d '{"name": "Laptop", "description": "Gaming laptop"}'
   ```

2. **Get all items:**
   ```bash
   curl -X GET "http://127.0.0.1:8000/items"
   ```

3. **Update an item:**
   ```bash
   curl -X PUT "http://127.0.0.1:8000/items/1" \
        -H "Content-Type: application/json" \
        -d '{"name": "Updated Laptop", "description": "Updated description"}'
   ```

4. **Delete an item:**
   ```bash
   curl -X DELETE "http://127.0.0.1:8000/items/1"
   ```

### Using Python requests

```python
import requests

base_url = "http://127.0.0.1:8000"

# Create item
response = requests.post(f"{base_url}/items", 
                        json={"name": "Book", "description": "Python programming book"})
print(response.json())

# Get all items
response = requests.get(f"{base_url}/items")
print(response.json())
```

## Configuration

### Database Configuration

The application uses SQLite by default. The database file (`app.db`) will be created automatically in the project root.

To use a different database, set the `DATABASE_URL` environment variable:

```bash
# PostgreSQL example
export DATABASE_URL="postgresql://user:password@localhost/dbname"

# MySQL example  
export DATABASE_URL="mysql://user:password@localhost/dbname"
```

### Environment Variables

Create a `.env` file in the project root (optional):

```env
DATABASE_URL=sqlite:///./app.db
```

## Development

### Adding New Features

1. **Models**: Add new SQLAlchemy models in `app/models.py`
2. **Schemas**: Add Pydantic models in `app/schemas.py`  
3. **CRUD**: Add database operations in `app/crud.py`
4. **Routes**: Add API endpoints in `app/main.py`

### Running Tests

```bash
# Install test dependencies (if you add them)
pip install pytest pytest-asyncio httpx

# Run tests (when you create them)
pytest
```

## Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **sqlalchemy** - ORM
- **python-dotenv** - Environment variable management

See `requirements.txt` for complete list with versions.

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `404` - Item not found
- `422` - Validation error
- `500` - Internal server error

## License

This project is for educational purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

---

**Happy coding! 🚀** 