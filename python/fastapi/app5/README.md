# FastAPI Website Crawler

A simple FastAPI server that loads and extracts content from any website URL using LangChain's document loader.

## Features
- Load website content via API endpoints
- Get full content info using `/loadinfo` endpoint
- Get metadata using `/metadata` endpoint
- Basic error handling for invalid URLs

## Setup
1. Install dependencies:
```bash
pip install fastapi uvicorn langchain-community requests
```

2. Run the server:
```bash
uvicorn main:app --reload
```

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

## Error Handling
The API returns 400 status code with error message if:
- URL is invalid
- Website is not accessible
- Content cannot be loaded

## Tech Stack
- FastAPI
- LangChain
- Python
