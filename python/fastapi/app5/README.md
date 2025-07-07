# FastAPI Website Crawler Agent

A simple FastAPI server that loads and extracts content from any website URL using LangChain's document loader and answers questions using LlamaIndex with Groq.

## Features
- Load website content via API endpoints
- Get full content info using `/loadinfo` endpoint
- Get metadata using `/metadata` endpoint
- Ask questions about any website using AI with `/ask` endpoint
- Basic error handling for invalid URLs

## Setup Guide

### 1. Python Virtual Environment

#### Windows
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate
```

#### macOS/Linux
```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install Dependencies

```bash
# Install required packages
pip install fastapi uvicorn langchain-community requests llama-index python-dotenv

# Freeze requirements (after installing packages)
pip freeze > requirements.txt

# Or install from requirements.txt
pip install -r requirements.txt
```

### 4. Run the Server

```bash
# Development server with auto-reload
uvicorn main:app --reload

# Production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

## API Endpoints

### GET `/`
Health check endpoint

### POST `/loadinfo`
Get website content
```json
{
    "url": "https://example.com"
}
```

### POST `/metadata`
Get website metadata
```json
{
    "url": "https://example.com"
}
```

### POST `/ask`
Ask questions about a website
```json
{
    "url": "https://example.com",
    "question": "What is this website about?"
}
```

## Error Handling
The API returns 400 status code with error message if:
- URL is invalid
- Website is not accessible
- Content cannot be loaded
- AI service is unavailable

## API Documentation
Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Tech Stack
- FastAPI
- LangChain
- LlamaIndex
- Groq LLM
- HuggingFace Embeddings
- Python
- Uvicorn (ASGI Server)

## Development Notes
- Python 3.13.5 required (Python3)
- Uses LangChain's WebBaseLoader for content extraction
- Uses LlamaIndex with Groq for AI question answering
- Uses HuggingFace BGE embeddings
- SSL verification is disabled for development purposes
